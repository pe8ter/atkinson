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

import { ditherAlgorithms, ALGORITHM_TYPE_DIFFUSION } from './ditherAlgorithms.js';
import { subtractVec3, lengthSquaredVec3 } from './vec3.js';

import {
    createImageFromPixels,
    createNormalizedPixels,
    extractPixelsFromImage,
    normalizePixels,
    denormalizePixels,
    writePixel,
} from './image.js';

/**
 * Dither grayscale values using the given algorithm.
 *
 * @param {HTMLImageElement} inputImage the image to dither
 * @param {string} algorithmName name of the dithering algorithm (see ditherAlgorithms.js)
 * @param {Array<Array<number>>} palette each palette color is an array of RGB color value arrays in the range [0, 1]
 * @returns
 */

export function ditherImage(inputImage, algorithmName, palette) {
    const ditherAlgorithm = ditherAlgorithms[algorithmName];

    if (!ditherAlgorithm) {
        throw new Error(`Did not recognize dither algorithm with name "${algorithmName}".`);
    }

    const inputPixels = extractPixelsFromImage(inputImage);
    const inputNormalizedPixels = normalizePixels(inputPixels);

    const width = inputImage.width;
    const height = inputImage.height;

    let outputNormalizedPixels;

    switch (ditherAlgorithm.type) {
        case ALGORITHM_TYPE_DIFFUSION:
            outputNormalizedPixels = diffusionDither(inputNormalizedPixels, width, height, ditherAlgorithm, palette);
            break;
        default:
            throw new Error(`Did not recognize dither algorithm type "${ditherAlgorithm.type}".`);
    }

    const outputPixels = denormalizePixels(outputNormalizedPixels);
    const outputImage = createImageFromPixels(outputPixels, width, height);

    return outputImage;
}

/**
 * Perform a diffusion dither on the image pixels using the specified dithering variant.
 *
 * @param {Array<number>} normalizedPixels a linear array of pixels
 * @param {number} width width in pixels of the image
 * @param {number} height height in pixels of the image
 * @param {object} ditherAlgorithm an object that contains options for a dithering algorithm variant (see ditherAlgorithms.js)
 * @param {Array<Array<number>>} palette each palette color is an array of RGB color value arrays in the range [0, 1]
 * @returns {Array<number>} image pixels whose colors are restricted to the input palette
 */

function diffusionDither(normalizedPixels, width, height, ditherAlgorithm, palette) {
    const outputNormalizedPixels = createNormalizedPixels(width, height);

    for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
            const pixelIndex = 4*(y*width + x);
            const pixelColor = [normalizedPixels[pixelIndex], normalizedPixels[pixelIndex+1], normalizedPixels[pixelIndex+2]];

            const newColor = findClosestPaletteColor(pixelColor, palette);
            const error = subtractVec3(pixelColor, newColor);

            writePixel(outputNormalizedPixels, x, y, width, newColor[0], newColor[1], newColor[2], 1);
            diffuseQuantizationError(normalizedPixels, x, y, width, height, ditherAlgorithm, error);
        }
    }

    return outputNormalizedPixels;
}

/**
 * Find the palette color that is closest to the input color.
 *
 * @param {Array<number>} color a color to match against the palette
 * @param {Array<Array<number>>} palette each palette color is an array of RGB color value arrays in the range [0, 1]
 * @returns {Array<number>} the closest palette color to the input color
 */

function findClosestPaletteColor(color, palette) {
    let closestPaletteColor;
    let minErrorLengthSquared = Number.MAX_VALUE;

    for (let i = 0; i < palette.length; ++i) {
        const error = subtractVec3(color, palette[i]);
        const errorLengthSquared = lengthSquaredVec3(error);

        if (errorLengthSquared < minErrorLengthSquared) {
            minErrorLengthSquared = errorLengthSquared;
            closestPaletteColor = palette[i];
        }
    }

    return closestPaletteColor;
}

/**
 * Diffuse the quantization error for the given pixel to its neighbors using the values in the diffusion kernel. Note
 * that due to error diffusion, the pixel values can extend beyond the standard range [0, 1]. This is okay and expected.
 *
 * @param {Array<number>} normalizedPixels a linear array of pixels
 * @param {number} x x-position of the current pixel
 * @param {number} y y-position of the current pixel
 * @param {number} width width of the image
 * @param {number} height height of the image
 * @param {object} ditherAlgorithm an object that contains options for a dithering algorithm variant (see ditherAlgorithms.js)
 * @param {Array<number>} error error between the current pixel and its closest palette color
 */

function diffuseQuantizationError(normalizedPixels, x, y, width, height, ditherAlgorithm, error) {
    // a and b are the width and height of the diffusion kernel.
    const a = ditherAlgorithm.options.multipliers[0].length;
    const b = ditherAlgorithm.options.multipliers.length;

    // i and j are the indexes of the diffusion kernel.
    for (let j = 0; j < b; ++j) {
        // r and s are the x and y pixel positions that receive the diffused error.
        const s = y + j;

        if (s >= height) {
            continue;
        }

        for (let i = 0; i < a; ++i) {
            const r = x - Math.floor(a / 2) + i;

            if (r < 0 || r >= width) {
                continue;
            }

            const targetNormalizedPixelIndex = 4*(s*width + r);

            const diffusionFactor = ditherAlgorithm.options.multipliers[j][i] / ditherAlgorithm.options.divisor;

            normalizedPixels[targetNormalizedPixelIndex] += diffusionFactor * error[0];
            normalizedPixels[targetNormalizedPixelIndex+1] += diffusionFactor * error[1];
            normalizedPixels[targetNormalizedPixelIndex+2] += diffusionFactor * error[2];
        }
    }
}
