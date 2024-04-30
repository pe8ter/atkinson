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
 * Subtract two 3D vectors.
 *
 * @param {Array<number>} a the first 3D vector in the expression a - b
 * @param {Array<number>} b the second 3D vector in the expression a - b
 * @returns {Array<number>} the result of subtracting two 3D vectors
 */

export function subtractVec3(a, b) {
    const result = [
        a[0] - b[0],
        a[1] - b[1],
        a[2] - b[2],
    ];
    return result;
}

/**
 * Calculate the squared length of a 3D vector.
 *
 * @param {Array<number>} a a 3D vector
 * @returns {number} squared length of the 3D vector
 */

export function lengthSquaredVec3(a) {
    const result = a[0]*a[0] + a[1]*a[1] + a[2]*a[2];
    return result;
}
