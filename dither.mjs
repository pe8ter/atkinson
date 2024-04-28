/*
    MIT No Attribution

    Copyright 2024 Peter Safranek

    Permission is hereby granted, free of charge, to any person obtaining a copy of this
    software and associated documentation files (the "Software"), to deal in the Software
    without restriction, including without limitation the rights to use, copy, modify,
    merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
    INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
    PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
    HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
    SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import { ditherAlgorithms, ALGORITHM_TYPE_FUNCTIONAL, ALGORITHM_TYPE_DIFFUSION } from './ditherAlgorithms.mjs';
import { createImageFromPixels, createPixels, writePixel } from './image.mjs';
import { BLACK_VALUE, WHITE_VALUE } from './constants.mjs';

/**
 * Dither grayscale values using the given algorithm. The width and height are necessary to unpack the input array and
 * create an output image.
 *
 * @param {Array<number>} grayscaleValues array of grayscale values
 * @param {string} algorithmName name of the grayscale algorithm (see grayccaleAlgorithms.mjs)
 * @param {number} width width of the image
 * @param {number} height height of the image
 * @returns {HTMLImageElement} result image
 */

export function ditherGrayscaleValues(grayscaleValues, algorithmName, width, height) {
    const ditherAlgorithm = ditherAlgorithms[algorithmName] || {};

    let pixels;

    switch (ditherAlgorithm.type) {
        case ALGORITHM_TYPE_FUNCTIONAL:
            pixels = functionalDither(ditherAlgorithm, grayscaleValues, width, height);
            break;
        case ALGORITHM_TYPE_DIFFUSION:
            pixels = diffusionDither(ditherAlgorithm, grayscaleValues, width, height);
            break;
        default:
            throw new Error(`Did not recognize dither algorithm with name "${algorithmName}".`);
    }

    const image = createImageFromPixels(pixels, width, height);

    return image;
}

/**
 * Dither grayscale values where the algorithm options contains a function to perform the dither. Typically, these
 * dither algorithms do not rely on reading or modifying neighboring pixels.
 *
 * @param {object} ditherAlgorithm object that contains the dither information (see ditherAlgorithms.mjs)
 * @param {Array<number>} grayscaleValues array of grayscale values
 * @param {number} width width of the image
 * @param {number} height height of the image
 * @returns {Uint8ClampedArray} array of pixels
 */

function functionalDither(ditherAlgorithm, grayscaleValues, width, height) {
    const pixels = createPixels(width, height);

    const handler = ditherAlgorithm.options.handler;
    const threshold = ditherAlgorithm.options.threshold;

    for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
            const grayscaleIndex = y*width + x;
            const grayscaleValue = grayscaleValues[grayscaleIndex];
            const blackOrWhite = handler(grayscaleValue, threshold);
            writePixel(pixels, x, y, width, blackOrWhite, blackOrWhite, blackOrWhite, WHITE_VALUE);
        }
    }

    return pixels;
}

/**
 * Dither grayscale values using a diffusion algorithm. These algorithms work by distributing or "diffusing"
 * quantization error for each pixel onto its neighboring pixels.
 *
 * @param {object} ditherAlgorithm object that contains the dither information (see ditherAlgorithms.mjs)
 * @param {Array<number>} grayscaleValues array of grayscale values
 * @param {number} width width of the image
 * @param {number} height height of the image
 * @returns {Uint8ClampedArray} array of dithered pixels
 */

function diffusionDither(ditherAlgorithm, grayscaleValues, width, height) {
    const pixels = createPixels(width, height);

    for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
            const grayscaleIndex = y*width + x;
            const grayscaleValue = grayscaleValues[grayscaleIndex];
            const blackOrWhite = (grayscaleValue < ditherAlgorithm.options.threshold) ? BLACK_VALUE : WHITE_VALUE;
            const grayscaleError = grayscaleValue - blackOrWhite;
            diffuseQuantizationError(ditherAlgorithm, grayscaleValues, x, y, width, height, grayscaleError);
            writePixel(pixels, x, y, width, blackOrWhite, blackOrWhite, blackOrWhite, WHITE_VALUE);
        }
    }

    return pixels;
}

/**
 * Distribute the error in rounding a grayscale value to black or white onto its neighboring pixels. The amount error
 * that is distributed is documented in the algorithm's options (multipliers and divisor).
 *
 * @param {object} ditherAlgorithm object that contains the dither information (see ditherAlgorithms.mjs)
 * @param {Array<number>} grayscaleValues array of grayscale values
 * @param {number} x x position of the current pixel
 * @param {number} y y position of the current pixel
 * @param {number} width width of the image
 * @param {number} height height of the image
 * @param {number} grayscaleError error in rounding the grayscale value to black or white
 */

function diffuseQuantizationError(ditherAlgorithm, grayscaleValues, x, y, width, height, grayscaleError) {
    const a = ditherAlgorithm.options.multipliers[0].length;
    const b = ditherAlgorithm.options.multipliers.length;
    for (let j = 0; j < b; ++j) {
        const s = y + j;

        if (s >= height) {
            continue;
        }

        for (let i = 0; i < a; ++i) {
            const r = x - Math.floor(a / 2) + i;

            if (r < 0 || r >= width) {
                continue;
            }

            const grayscaleIndex = s*width + r;
            const diffusionFactor = grayscaleError * ditherAlgorithm.options.multipliers[j][i] / ditherAlgorithm.options.divisor;

            grayscaleValues[grayscaleIndex] += diffusionFactor;
        }
    }
}
