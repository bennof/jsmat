/* Tabular Rasa JS Math Filter
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
* @module jsmat/filter
*/


export function filter(x, f, sides = 1, cyclic = false){
	var h, l = x.length, l1 = f.length, l2, y = new Array(l);
	
	if( sides == 1 ){
		for(var i=0; i<l; i++){
			h = 0.0;
			l2 = ( l1 > i ) ? i: l1;
			for(var j=0; j<l2; j++)
				h += f[j]*x[i-j]; //f[0]*x[i-j]+...+f[p]*x[i+o-p];
			y[i] = h;
		}
	} else { // both sides
		for(var i=0; i<l; i++){
			h = 0.0;
			for(var j=0; j<l1; j++)
				h += f[j]*x[(i-j)%l]//f[j]*x[i+o]+...+f[p]*x[i+o-p];
			y[i] = h;
		}
	}
	return y;
}
