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

import { randomInt } from './utils.mjs';
import { BLACK_VALUE, WHITE_VALUE, DEFAULT_THRESHOLD } from './constants.mjs';

/**
 * Type for "functional" algorithms. These algorithms use an actual function in their options to dither a pixel. Such
 * algorithms do not read or modify neighboring pixels.
 */

export const ALGORITHM_TYPE_FUNCTIONAL = 'functional';

/**
 * Type for "diffusion" algorithms. These algorithms work by distributing or "diffusing" quantization error for each
 * pixel onto its neighboring pixels.
 */

export const ALGORITHM_TYPE_DIFFUSION = 'diffusion';

/**
 * Manifest of the all the different ways to dither an image.
 */

export const ditherAlgorithms = Object.freeze({
    threshold: {
        displayName: 'Threshold',
        type: ALGORITHM_TYPE_FUNCTIONAL,
        options: {
            handler: (gray, threshold) => (gray < threshold) ? BLACK_VALUE : WHITE_VALUE,
            threshold: DEFAULT_THRESHOLD,
        },
    },
    random: {
        displayName: 'Random',
        type: ALGORITHM_TYPE_FUNCTIONAL,
        options: {
            handler: (gray, _threshold) => (randomInt(BLACK_VALUE, WHITE_VALUE) > gray) ? BLACK_VALUE : WHITE_VALUE,
        },
    },
    simple: {
        displayName: 'Simple',
        type: ALGORITHM_TYPE_DIFFUSION,
        options: {
            multipliers: [
                [0, 0, 1],
            ],
            divisor: 1,
            threshold: DEFAULT_THRESHOLD,
        },
    },
    atkinson: {
        displayName: 'Atkinson',
        type: ALGORITHM_TYPE_DIFFUSION,
        options: {
            multipliers: [
                [0, 0, 0, 1, 1],
                [0, 1, 1, 1, 0],
                [0, 0, 1, 0, 0],
            ],
            divisor: 8,
            threshold: DEFAULT_THRESHOLD,
        },
    },
    floydSteinberg: {
        displayName: 'Floyd-Steinberg',
        type: ALGORITHM_TYPE_DIFFUSION,
        options: {
            multipliers: [
                [0, 0, 7],
                [3, 5, 1],
            ],
            divisor: 16,
            threshold: DEFAULT_THRESHOLD,
        },
    },
    falseFloydSteinberg: {
        displayName: '"False" Floyd-Steinberg',
        type: ALGORITHM_TYPE_DIFFUSION,
        options: {
            multipliers: [
                [0, 0, 3],
                [0, 3, 2],
            ],
            divisor: 8,
            threshold: DEFAULT_THRESHOLD,
        },
    },
    sierra: {
        displayName: 'Sierra',
        type: ALGORITHM_TYPE_DIFFUSION,
        options: {
            multipliers: [
                [0, 0, 0, 5, 3],
                [2, 4, 5, 4, 2],
                [0, 2, 3, 2, 0],
            ],
            divisor: 32,
            threshold: DEFAULT_THRESHOLD,
        },
    },
    sierraTwoRow: {
        displayName: 'Two-Row Sierra',
        type: ALGORITHM_TYPE_DIFFUSION,
        options: {
            multipliers: [
                [0, 0, 0, 4, 3],
                [1, 2, 3, 2, 1],
            ],
            divisor: 16,
            threshold: DEFAULT_THRESHOLD,
        },
    },
    sierraLite: {
        displayName: 'Sierra Lite',
        type: ALGORITHM_TYPE_DIFFUSION,
        options: {
            multipliers: [
                [0, 0, 2],
                [1, 1, 0],
            ],
            divisor: 4,
            threshold: DEFAULT_THRESHOLD,
        },
    },
    jarvisJudiceNinke: {
        displayName: 'Jarvis, Judice, and Ninke',
        type: ALGORITHM_TYPE_DIFFUSION,
        options: {
            multipliers: [
                [0, 0, 0, 7, 5],
                [3, 5, 7, 5, 3],
                [1, 3, 5, 3, 1],
            ],
            divisor: 48,
            threshold: DEFAULT_THRESHOLD,
        },
    },
    stucki: {
        displayName: 'Stucki',
        type: ALGORITHM_TYPE_DIFFUSION,
        options: {
            multipliers: [
                [0, 0, 0, 8, 4],
                [2, 4, 8, 4, 2],
                [1, 2, 4, 2, 1],
            ],
            divisor: 42,
            threshold: DEFAULT_THRESHOLD,
        },
    },
    burkes: {
        displayName: 'Burkes',
        type: ALGORITHM_TYPE_DIFFUSION,
        options: {
            multipliers: [
                [0, 0, 0, 8, 4],
                [2, 4, 8, 4, 2],
            ],
            divisor: 32,
            threshold: DEFAULT_THRESHOLD,
        },
    },
});
