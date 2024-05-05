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

/**
 * Load an image from a URL.
 *
 * @param {string} url URL for an image
 * @returns {Promise<HTMLImageElement>} a Promise that reolves to an image
 */

export async function loadImage(url) {
    const { promise, resolve, reject } = Promise.withResolvers();
    const image = new Image();
    image.onload = () => resolve(image);
    image.onabort = (event) => reject(event);
    image.onerror = (event) => reject(event);
    image.src = url;
    return promise;
}

/**
 * Extract the pixels of an image. The result is a one-dimensional array, arranged from the image row by row, beginning
 * with the top left corner. Each color channel gets its own index in the array and always includes the alpha channel
 * regardless of the input image. Each color channel value ranges from 0 to 255.
 *
 * Example: An m x n input JPEG image results in an array with 4*m*n values.
 *
 * @param {HTMLImageElement} image an image from which to extract pixels
 * @returns {Uint8ClampedArray} an array of RGBA values
 */

export function extractPixelsFromImage(image) {
    const canvas = document.createElement('canvas');

    canvas.width = image.width;
    canvas.height = image.height;

    const ctx = canvas.getContext('2d');

    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(0, 0, image.width, image.height);
    const pixels = imageData.data;

    return pixels;
}

/**
 * Convert an array of RGBA values into an image. There should be 4*width*height values in the input pixels array.
 *
 * @param {Uint8ClampedArray} pixels array of pixels
 * @param {number} width width of the result image
 * @param {number} height height of the result image
 * @returns {HTMLImageElement} image built from the input pixels
 */

export function createImageFromPixels(pixels, width, height) {
    const canvas = document.createElement('canvas');

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, width, height);
    const destPixels = imageData.data;

    for (let i = 0; i < pixels.length; ++i) {
        destPixels[i] = pixels[i];
    }

    ctx.putImageData(imageData, 0, 0);

    const image = createImageFromCanvas(canvas);

    return image;
}

/**
 * Copy the pixels from a canvas into a Base64-encoded image.
 *
 * @param {HTMLCanvasElement} canvas canvas whose pixels will become an image
 * @returns {HTMLImageElement} Base64-encoded image element
 */

function createImageFromCanvas(canvas) {
    const image = document.createElement('img');
    image.src = canvas.toDataURL('img/png');
    return image;
}

/**
 * Create an array to contain normalized pixels for an image of the given width and height.
 *
 * @param {number} width width of the image
 * @param {number} height height of the image
 * @returns {Array<number>} linear array of pixels
 */

export function createNormalizedPixels(width, height) {
    const normalizedPixels = new Array(4 * width * height);
    return normalizedPixels;
}

/**
 * Write the given RGBA values into a pixel array.
 *
 * @param {Array<number>|Uint8ClampedArray} pixels array of pixels
 * @param {number} x x-position of the pixel within the image
 * @param {number} y y-position of the pixel within the image
 * @param {number} width width of the image, necessary for indexing the array
 * @param {number} r red value
 * @param {number} g green value
 * @param {number} b blue value
 * @param {number} a alpha value
 */

export function writePixel(pixels, x, y, width, r, g, b, a) {
    const i = 4*(y*width + x);

    pixels[i] = r;
    pixels[i+1] = g;
    pixels[i+2] = b;
    pixels[i+3] = a;
}

/**
 * Convert color values from the integer range [0, 255] to float range [0, 1].
 *
 * @param {Uint8ClampedArray} pixels array of pixels whose color values are in the integer range [0, 255]
 * @returns {Array<number>} array of pixels whose color values are in the float range [0, 1]
 */

export function normalizePixels(pixels) {
    const normalizedPixels = new Array(pixels.length);

    for (let i = 0; i < pixels.length; ++i) {
        normalizedPixels[i] = pixels[i] / 255;
    }

    return normalizedPixels;
}

/**
 * Convert color values from the float range [0, 1] to integer range [0, 255].
 *
 * @param {number} normalizedPixels array of pixels whose color values are in the float range [0, 1]
 * @returns {Array<Uint8ClampedArray>} array of pixels whose color values are in the integer range [0, 255]
 */

export function denormalizePixels(normalizedPixels) {
    const pixels = new Uint8ClampedArray(normalizedPixels.length);

    for (let i = 0; i < normalizedPixels.length; ++i) {
        pixels[i] = Math.round(255 * normalizedPixels[i]);
    }

    return pixels;
}
