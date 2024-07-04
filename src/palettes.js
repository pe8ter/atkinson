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
 * Create the 1990s Mac OS 8 bit color palette.
 *
 * @returns {Array<Array<number>>} color palette
 */

export function createMacOS8BitPalette() {
    const palette = new Array(256);

    for (let i = 0; i < palette.length; ++i) {
        palette[i] = createMacOS8BitColor(i);
    }

    return palette;
}

/**
 * Create a single Mac OS 8 bit color using an index in the range [0, 255].
 *
 * Credit: https://belkadan.com/blog/2018/01/Color-Palette-8/
 *
 * @param {number} index integer in the range [0, 255]
 * @returns {Array<number>} a single color from the Mac OS 8 bit color palette
 */

function createMacOS8BitColor(index) {
    if (!Number.isInteger(index) || index < 0 || index > 255) {
        throw new Error('Mac color index must be an integer in the range [0, 255].');
    }

    let r;
    let g;
    let b;

    if (index < 215) {
        r = (5 - Math.floor(index / 36)) / 5;
        g = (5 - (Math.floor(index / 6) % 6)) / 5;
        b = (5 - (index % 6)) / 5;
    } else if (index < 255) {
        const values = [14/15, 13/15, 11/15, 10/15, 8/15, 7/15, 5/15, 4/15, 2/15, 1/15];
        const which = (index - 215) % 10;

        switch (Math.floor((index - 215) / 10)) {
            case 0:
                r = values[which];
                g = 0;
                b = 0;
                break;
            case 1:
                r = 0;
                g = values[which];
                b = 0;
                break;
            case 2:
                r = 0;
                g = 0;
                b = values[which];
                break;
            case 3:
                r = values[which];
                g = values[which];
                b = values[which];
                break;
        }
    } else {
        r = 0;
        g = 0;
        b = 0;
    }

    const result = [r, g, b];

    return result;
}
