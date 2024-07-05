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
import { palettes } from './palettes.js';
import { ditherAlgorithms } from './ditherAlgorithms.js';

const DEFAULT_ALGORITHM_NAME = 'atkinson';
const DEFAULT_PALETTE_NAME = 'blackAndWhite';

let currenAlgorithmName = DEFAULT_ALGORITHM_NAME;
let currentPaletteName = DEFAULT_PALETTE_NAME;

/**
 * Main entry point for all JavaScript functionality.
 *
 * @returns {Promise<void>}
 */

export async function main() {
    const inputImage = await loadImage('./images/rabbit.jpg');
    const inputImageContainer = document.querySelector('.image.input');

    inputImageContainer.appendChild(inputImage);

    renderQuantizedImage();
    renderDitheredImage();

    initAlgorithmSelect();
    initPaletteSelect();
}

/**
 * Set up the algorithm select input.
 */

function initAlgorithmSelect() {
    const selectElem = document.querySelector('#algorithm-select');
    const algorithmNames = Object.keys(ditherAlgorithms);

    for (const algorithmName of algorithmNames) {
        const optionElem = document.createElement('option');
        const displayName = ditherAlgorithms[algorithmName].displayName;

        optionElem.value = algorithmName;
        optionElem.innerHTML = displayName;

        selectElem.appendChild(optionElem);
    }

    selectElem.addEventListener('change', (_event) => {
        currenAlgorithmName = selectElem.value;
        renderDitheredImage();
    });

    // Set the default value.
    const defaultOptionElem = selectElem.querySelector(`[value=${DEFAULT_ALGORITHM_NAME}]`);
    defaultOptionElem.selected = true;
}

/**
 * Set up the palette select input.
 */

function initPaletteSelect() {
    const selectElem = document.querySelector('#palette-select');
    const paletteNames = Object.keys(palettes);

    for (const paletteName of paletteNames) {
        const optionElem = document.createElement('option');
        const displayName = palettes[paletteName].displayName;

        optionElem.value = paletteName;
        optionElem.innerHTML = displayName;

        selectElem.appendChild(optionElem);
    }

    selectElem.addEventListener('change', (_event) => {
        currentPaletteName = selectElem.value;
        renderQuantizedImage();
        renderDitheredImage();
    });

    // Set the default value.
    const defaultOptionElem = selectElem.querySelector(`[value=${DEFAULT_PALETTE_NAME}]`);
    defaultOptionElem.selected = true;
}

/**
 * Render the quantized image and insert it into the DOM.
 */

function renderQuantizedImage() {
    const outputImageContainer = document.querySelector('.image.output.quantized');
    const oldOutputImage = outputImageContainer.querySelector('img');

    if (oldOutputImage) {
        oldOutputImage.remove();
    }

    const outputImage = quantizeImage(getInputImage(), palettes[currentPaletteName].palette);

    outputImageContainer.appendChild(outputImage);
}

/**
 * Render the dithered image using the specified algorithm and insert it into the DOM.
 */

function renderDitheredImage() {
    const outputImageContainer = document.querySelector('.image.output.dithered');
    const oldOutputImage = outputImageContainer.querySelector('img');

    if (oldOutputImage) {
        oldOutputImage.remove();
    }

    const outputImage = ditherImage(getInputImage(), currenAlgorithmName, palettes[currentPaletteName].palette);

    outputImageContainer.appendChild(outputImage);
}

/**
 * Get the input image from the DOM.
 *
 * @returns {HTMLImageElement} the input image
 */

function getInputImage() {
    const inputImage = document.querySelector('.image.input img');
    return inputImage;
}
