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

import { loadImage } from './image.js';
import { quantizeImage, ditherImage } from './dither.js';
import { createMacOS8BitPalette } from './palettes.js';
import { ditherAlgorithms } from './ditherAlgorithms.js';

const DEFAULT_ALGORITHM_NAME = 'atkinson';
const PALETTE = createMacOS8BitPalette();

/**
 * Main entry point for all JavaScript functionality.
 *
 * @returns {Promise<void>}
 */

export async function main() {
    const inputImage = await loadImage('./images/rabbit.jpg');
    const inputImageContainer = document.querySelector('.image.input');

    inputImageContainer.appendChild(inputImage);

    initAlgorithmSelect();
}

/**
 * Set up the algorithm select input and perform the first dither.
 */

function initAlgorithmSelect() {
    const selectElem = document.querySelector('.controls select');
    const algorithmNames = Object.keys(ditherAlgorithms);

    for (const algorithmName of algorithmNames) {
        const optionElem = document.createElement('option');
        const displayName = ditherAlgorithms[algorithmName].displayName;

        optionElem.value = algorithmName;
        optionElem.innerHTML = displayName;

        selectElem.appendChild(optionElem);
    }

    selectElem.addEventListener('change', (_event) => {
        onAlgorithmSelect(selectElem.value);
    });

    // Set the default value.
    const defaultOptionElem = selectElem.querySelector(`[value=${DEFAULT_ALGORITHM_NAME}]`);
    defaultOptionElem.selected = true;
    onAlgorithmSelect(DEFAULT_ALGORITHM_NAME);
}

/**
 * Event handler for the algorithm select input. Renders the image using the selected algorithm.
 *
 * @param {string} algorithmName name of the selected algorithm
 */

function onAlgorithmSelect(algorithmName) {
    const inputImage = document.querySelector('.image.input img');

    // Regenerate the quantized image.
    const quantizedOutputImageContainer = document.querySelector('.image.output.quantized');
    const oldQuantizedOutputImage = quantizedOutputImageContainer.querySelector('img');

    if (oldQuantizedOutputImage) {
        oldQuantizedOutputImage.remove();
    }

    const quantizedOutputImage = quantizeImage(inputImage, PALETTE);

    quantizedOutputImageContainer.appendChild(quantizedOutputImage);

    // Regenerate the dithered image.
    const ditheredOutputImageContainer = document.querySelector('.image.output.dithered');
    const oldDitheredOutputImage = ditheredOutputImageContainer.querySelector('img');

    if (oldDitheredOutputImage) {
        oldDitheredOutputImage.remove();
    }

    const ditheredOutputImage = ditherImage(inputImage, algorithmName, PALETTE);

    ditheredOutputImageContainer.appendChild(ditheredOutputImage);
}
