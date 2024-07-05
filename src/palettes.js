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

export const palettes = Object.freeze({
    blackAndWhite: {
        displayName: 'Black and White',
        palette: [[0, 0, 0], [1, 1, 1]],
    },
    apple2HighRes: {
        displayName: 'Apple II High-Res',
        palette: [
            [0, 0, 0],
            [254, 67, 255],
            [54, 156, 255],
            [252, 110, 0],
            [58, 236, 0],
            [255, 255, 255],
        ].map(x => x.map(y => y / 255)),
    },
    apple2LoRes: {
        displayName: 'Apple II Lo-Res',
        palette: [
            [0, 0, 0],
            [191, 26, 61],
            [69, 45, 255],
            [254, 67, 255],
            [0, 129, 61],
            [128, 128, 128],
            [54, 156, 255],
            [195, 158, 255],
            [62, 106, 0],
            [252, 110, 0],
            [255, 134, 193],
            [58, 236, 0],
            [194, 235, 0],
            [87, 255, 192],
            [255, 255, 255],
        ].map(x => x.map(y => y / 255)),
    },
    macos8bit: {
        displayName: 'Mac OS 8-bit',
        palette: createMacOS8BitPalette(),
    },
    windows8bit: {
        displayName: 'Windows 8-bit',
        palette: [
            [0, 0, 0],
            [128, 0, 0],
            [0, 128, 0],
            [128, 128, 0],
            [0, 0, 128],
            [128, 0, 128],
            [0, 128, 128],
            [192, 192, 192],
            [192, 220, 192],
            [166, 202, 240],
            [42, 63, 170],
            [42, 63, 255],
            [42, 95, 0],
            [42, 95, 85],
            [42, 95, 170],
            [42, 95, 255],
            [42, 127, 0],
            [42, 127, 85],
            [42, 127, 170],
            [42, 127, 255],
            [42, 159, 0],
            [42, 159, 85],
            [42, 159, 170],
            [42, 159, 255],
            [42, 191, 0],
            [42, 191, 85],
            [42, 191, 170],
            [42, 191, 255],
            [42, 223, 0],
            [42, 223, 85],
            [42, 223, 170],
            [42, 223, 255],
            [42, 255, 0],
            [42, 255, 85],
            [42, 255, 170],
            [42, 255, 255],
            [85, 0, 0],
            [85, 0, 85],
            [85, 0, 170],
            [85, 0, 255],
            [85, 31, 0],
            [85, 31, 85],
            [85, 31, 170],
            [85, 31, 255],
            [85, 63, 0],
            [85, 63, 85],
            [85, 63, 170],
            [85, 63, 255],
            [85, 95, 0],
            [85, 95, 85],
            [85, 95, 170],
            [85, 95, 255],
            [85, 127, 0],
            [85, 127, 85],
            [85, 127, 170],
            [85, 127, 255],
            [85, 159, 0],
            [85, 159, 85],
            [85, 159, 170],
            [85, 159, 255],
            [85, 191, 0],
            [85, 191, 85],
            [85, 191, 170],
            [85, 191, 255],
            [85, 223, 0],
            [85, 223, 85],
            [85, 223, 170],
            [85, 223, 255],
            [85, 255, 0],
            [85, 255, 85],
            [85, 255, 170],
            [85, 255, 255],
            [127, 0, 0],
            [127, 0, 85],
            [127, 0, 170],
            [127, 0, 255],
            [127, 31, 0],
            [127, 31, 85],
            [127, 31, 170],
            [127, 31, 255],
            [127, 63, 0],
            [127, 63, 85],
            [127, 63, 170],
            [127, 63, 255],
            [127, 95, 0],
            [127, 95, 85],
            [127, 95, 170],
            [127, 95, 255],
            [127, 127, 0],
            [127, 127, 85],
            [127, 127, 170],
            [127, 127, 255],
            [127, 159, 0],
            [127, 159, 85],
            [127, 159, 170],
            [127, 159, 255],
            [127, 191, 0],
            [127, 191, 85],
            [127, 191, 170],
            [127, 191, 255],
            [127, 223, 0],
            [127, 223, 85],
            [127, 223, 170],
            [127, 223, 255],
            [127, 255, 0],
            [127, 255, 85],
            [127, 255, 170],
            [127, 255, 255],
            [170, 0, 0],
            [170, 0, 85],
            [170, 0, 170],
            [170, 0, 255],
            [170, 31, 0],
            [170, 31, 85],
            [170, 31, 170],
            [170, 31, 255],
            [170, 63, 0],
            [170, 63, 85],
            [170, 63, 170],
            [170, 63, 255],
            [170, 95, 0],
            [170, 95, 85],
            [170, 95, 170],
            [170, 95, 255],
            [170, 127, 0],
            [170, 127, 85],
            [170, 127, 170],
            [170, 127, 255],
            [170, 159, 0],
            [170, 159, 85],
            [170, 159, 170],
            [170, 159, 255],
            [170, 191, 0],
            [170, 191, 85],
            [170, 191, 170],
            [170, 191, 255],
            [170, 223, 0],
            [170, 223, 85],
            [170, 223, 170],
            [170, 223, 255],
            [170, 255, 0],
            [170, 255, 85],
            [170, 255, 170],
            [170, 255, 255],
            [212, 0, 0],
            [212, 0, 85],
            [212, 0, 170],
            [212, 0, 255],
            [212, 31, 0],
            [212, 31, 85],
            [212, 31, 170],
            [212, 31, 255],
            [212, 63, 0],
            [212, 63, 85],
            [212, 63, 170],
            [212, 63, 255],
            [212, 95, 0],
            [212, 95, 85],
            [212, 95, 170],
            [212, 95, 255],
            [212, 127, 0],
            [212, 127, 85],
            [212, 127, 170],
            [212, 127, 255],
            [212, 159, 0],
            [212, 159, 85],
            [212, 159, 170],
            [212, 159, 255],
            [212, 191, 0],
            [212, 191, 85],
            [212, 191, 170],
            [212, 191, 255],
            [212, 223, 0],
            [212, 223, 85],
            [212, 223, 170],
            [212, 223, 255],
            [212, 255, 0],
            [212, 255, 85],
            [212, 255, 170],
            [212, 255, 255],
            [255, 0, 85],
            [255, 0, 170],
            [255, 31, 0],
            [255, 31, 85],
            [255, 31, 170],
            [255, 31, 255],
            [255, 63, 0],
            [255, 63, 85],
            [255, 63, 170],
            [255, 63, 255],
            [255, 95, 0],
            [255, 95, 85],
            [255, 95, 170],
            [255, 95, 255],
            [255, 127, 0],
            [255, 127, 85],
            [255, 127, 170],
            [255, 127, 255],
            [255, 159, 0],
            [255, 159, 85],
            [255, 159, 170],
            [255, 159, 255],
            [255, 191, 0],
            [255, 191, 85],
            [255, 191, 170],
            [255, 191, 255],
            [255, 223, 0],
            [255, 223, 85],
            [255, 223, 170],
            [255, 223, 255],
            [255, 255, 85],
            [255, 255, 170],
            [204, 204, 255],
            [255, 204, 255],
            [51, 255, 255],
            [102, 255, 255],
            [153, 255, 255],
            [204, 255, 255],
            [0, 127, 0],
            [0, 127, 85],
            [0, 127, 170],
            [0, 127, 255],
            [0, 159, 0],
            [0, 159, 85],
            [0, 159, 170],
            [0, 159, 255],
            [0, 191, 0],
            [0, 191, 85],
            [0, 191, 170],
            [0, 191, 255],
            [0, 223, 0],
            [0, 223, 85],
            [0, 223, 170],
            [0, 223, 255],
            [0, 255, 85],
            [0, 255, 170],
            [42, 0, 0],
            [42, 0, 85],
            [42, 0, 170],
            [42, 0, 255],
            [42, 31, 0],
            [42, 31, 85],
            [42, 31, 170],
            [42, 31, 255],
            [42, 63, 0],
            [42, 63, 85],
            [255, 251, 240],
            [160, 160, 164],
            [128, 128, 128],
            [255, 0, 0],
            [0, 255, 0],
            [255, 255, 0],
            [0, 0, 255],
            [255, 0, 255],
            [0, 255, 255],
            [255, 255, 255],
        ].map(x => x.map(y => y / 255)),
    },
});

/**
 * Create the 1990s Mac OS 8 bit color palette.
 *
 * @returns {Array<Array<number>>} color palette
 */

function createMacOS8BitPalette() {
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
