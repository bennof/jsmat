/* Tabular Rasa JS Math Statistics Random
** Copyright (c) 2018-2020 Benjamin Benno Falkner
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

/** 
* @module jsmat/stat/random
*/

const tau = 2.0 * Math.PI;

export function box_muller() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); 
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) 
        * Math.cos( tau * v );
}

export function normal(mu=0.0, sig=1.0) {
    return mu + sig * box_muller();
}

export function chi_squared(n) {
    return 2 * gamma( n/2, 1);
}

// http://160.16.109.33/github.com/atgJack/sampson/file/lib/distributions/gamma.js.html#lineNumber39
export function gamma(a, b) {
    if (a < 1) {
        let u = Math.random();
        return gamma(1 + a, b) * Math.pow(u, 1 / a);
    } else {
        let x, v, u;
        let d = a - 1 / 3;
        let c = 1 / Math.sqrt(9 * d);
        while(1) {
          do {
            x = box_muller();
            v = 1 + c * x;
          } while (v <= 0);
          v = v * v * v;
          while (!u) { u = Math.random(); };
          if (u < 1 - 0.0331 * x * x * x * x) break;
          if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) break;
        };
        return d * v / b;
    }
}