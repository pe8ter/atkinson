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

import { WHITE_VALUE } from './constants.mjs';

/**
 * Manifest of the all the different ways to convert an RGBA image to grayscale.
 */

export const grayscaleAlgorithms = Object.freeze({
    average: {
        displayName: 'Average',
        rgbaToGrayscale: (r, g, b, a) => {
            return (a / WHITE_VALUE) * (r + g + b) / 3;
        },
    },
    weightedAverage: {
        displayName: 'Weighted Average',
        rgbaToGrayscale: function (r, g, b, a) {
            return (a / WHITE_VALUE) * (0.3*r + 0.59*g + 0.11*b);
        },
    },
    luminance: {
        displayName: 'Luminance',
        rgbaToGrayscale: function (r, g, b, a) {
            return (a / WHITE_VALUE) * (0.2126*r + 0.7152*g + 0.0722*b);
        },
    },
    quickDesaturation: {
        displayName: 'Quick Desaturation',
        rgbaToGrayscale: function (r, g, b, a) {
            return (a / WHITE_VALUE) * (Math.max(r, g, b) + Math.min(r, g, b)) / 2;
        },
    },
    minDecomposition: {
        displayName: 'Minimum Decomposition',
        rgbaToGrayscale: function (r, g, b, a) {
            return (a / WHITE_VALUE) * Math.min(r, g, b);
        },
    },
    maxDecomposition: {
        displayName: 'Maximum Decomposition',
        rgbaToGrayscale: function (r, g, b, a) {
            return (a / WHITE_VALUE) * Math.max(r, g, b);
        },
    },
    redChannel: {
        displayName: 'Red Channel',
        rgbaToGrayscale: function (r, _g, _b, a) {
            return (a / WHITE_VALUE) * r;
        },
    },
    greenChannel: {
        displayName: 'Green Channel',
        rgbaToGrayscale: function (_r, g, _b, a) {
            return (a / WHITE_VALUE) * g;
        },
    },
    blueChannel: {
        displayName: 'Blue Channel',
        rgbaToGrayscale: function (_r, _g, b, a) {
            return (a / WHITE_VALUE) * b;
        },
    },
    redAndGreenChannels: {
        displayName: 'Red/Green Channels',
        rgbaToGrayscale: function (r, g, _b, a) {
            return (a / WHITE_VALUE) * (r + g) / 2;
        },
    },
    redAndBlueChannels: {
        displayName: 'Red/Blue Channels',
        rgbaToGrayscale: function (r, _g, b, a) {
            return (a / WHITE_VALUE) * (r + b) / 2;
        },
    },
    greenAndBlueChannels: {
        displayName: 'Green/Blue Channels',
        rgbaToGrayscale: function (_r, g, b, a) {
            return (a / WHITE_VALUE) * (g + b) / 2;
        },
    },
});
