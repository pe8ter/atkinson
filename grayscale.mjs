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

import { grayscaleAlgorithms } from './grayscaleAlgorithms.mjs';
import { extractPixelsFromImage } from './image.mjs';

/**
 * Convert an image to grayscale using a particular algorithm.
 *
 * @param {HTMLImageElement} image an image to convert to grayscale
 * @param {string} algorithmName name of the grayscale conversion algorithm (see grayscaleAlgorithms.mjs)
 * @returns {Array<number>} array of grayscale values
 */

export function convertImageToGrayscale(image, algorithmName) {
    const rgbaToGrayscale = grayscaleAlgorithms[algorithmName].rgbaToGrayscale;
    const pixels = extractPixelsFromImage(image);
    const numPixels = image.width * image.height;
    const grayscaleValues = new Array(numPixels);    // Do not use special integer array types like Uint8ClampedArray.

    for (let i = 0; i < numPixels; ++i) {
        const r = pixels[4*i];
        const g = pixels[4*i + 1];
        const b = pixels[4*i + 2];
        const a = pixels[4*i + 3];
        const gray = rgbaToGrayscale(r, g, b, a);
        grayscaleValues[i] = gray;
    }

    return grayscaleValues;
}
