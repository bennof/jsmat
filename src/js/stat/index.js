/** 
* @module jsmat/stat
*/

import * as random from "./random";
import * as model from "./model";

export {
    model,
    random,
}


export function mean(data, start=0, end){
    var n=0, r=0.;
    if(!end) end = data.length;
    for (var i=start; i<end; i++){
        if (data[i]){
            n++;
            r += data[i];
        }
    }
    return r / n;
}

export function geo_mean(data, start=0, end){
    var n=0, r=1.;
    if(!end) end = data.length;
    for (var i=start; i<end; i++){
        if (data[i]){
            n++;
            r *= data[i];
        }
    }
    return Math.pow(r,1/n);
}

export function harm_mean(data, start=0, end){
    var n=0, r=0.;
    if(!end) end = data.length;
    for (var i=start; i<end; i++){
        if (data[i]){
            n++;
            r += 1/data[i];
        }
    }
    return n / r;
}

function quantile_h(h, p){
    var q = Math.floor(h.length*p);

    if(h.length % 1/p)
        return h[q];
    else
        return (h[q-1] + h[q]) / 2.0;
}

export function median(data, start=0, end){
    var h 
    if (end)
        h = data.slice(start,end);
    else
        h = data.slice(start);

    h.sort(function(a,b) {return a - b;});
    
    return quantile_h(h,0.5);
}

export function quantile(data, p, start=0, end){
    var h 
    if (end)
        h = data.slice(start,end);
    else
        h = data.slice(start);

    h.sort(function(a,b) {return a - b;});
    
    return quantile_h(h,p);
}

export function mode(data, start=0, end){
    var count = [], i, val, max = 0;
 
    if(!end) end = data.length;
    for (var i=start; i<end; i++){
        val = data[i];
        count[val] = (count[val] || 0) + 1;
        if (count[val] > max) {
            max = count[val];
        }
    }

    var r = []; 
    for (i in count)
        if (count[i] === max) {
            r.push(Number(i));
        }
    return r;
}


export function range(data, start=0, end){
    var h 
    if (end)
        h = data.slice(start,end);
    else
        h = data.slice(start);
    h.sort(function(a,b) {return a - b;});
    
    return h[h.length-1]-h[0]
}

export function min(data, start=0, end){
    var h 
    if (end)
        h = data.slice(start,end);
    else
        h = data.slice(start);
    h.sort(function(a,b) {return a - b;});
    
    return h[0]
}

export function max(data, start=0, end){
    var h 
    if (end)
        h = data.slice(start,end);
    else
        h = data.slice(start);
    h.sort(function(a,b) {return a - b;});
    
    return h[h.length-1]
 }


export function variance(data, end, start=0){
    var n=0, r=0., v=0., h;
    if(!end) end = data.length;
    for (var i=start; i<end; i++){
        h = data[i];
        if (h){
            n++;
            v += h*h;
            r += h;
        }
    }

    return (v - r*r /n )/(n-1);
}

export function variance2(data, end, start=0){
    var n=0, r=0., v=0., h;
    if(!end) end = data.length;
    for (var i=start; i<end; i++){
        h = data[i];
        if (h){
            n++;
            v += h*h;
            r += h;
        }
    }
    return (v - r*r /n )/(n);
}

export function sd(data, end, start=0){
    var sd = variance(data, end, start);
    return Math.sqrt(sd);
}

export function cov(xdata, ydata, start = 0, end){
    var n=0, hx, hy, x=0., y=0., sxy=0.; // sx=0., sy=0.;
    if(!end) end = xdata.length;
    for (var i=start; i<end; i++){
        hx = xdata[i];
        hy = ydata[i];
        if (hx && hy){
            n++;
            x += hx;
            //sx += hx*hx;
            y += hy;
            //sy += hy*hy;
            sxy += hx*hy;
        }
    }

    return (sxy - x*y/n)/(n-1);
}

export function chi_square(xdata, ydata, start = 0, end){
    var hx, hy, x=0., h;
    if(!end) end = xdata.length;
    for (var i=start; i<end; i++){
        hx = xdata[i];
        hy = ydata[i];
        if (hx && hy){
            h = hx-hy;
            h = h*h;
            x = h / hy;
        }
    }

    return x;
}

export function c_person(xdata, ydata, start = 0, end){
    var n=0, hx, hy, x=0., h;
    if(!end) end = xdata.length;
    for (var i=start; i<end; i++){
        hx = xdata[i];
        hy = ydata[i];
        if (hx && hy){
            n++;
            h = hx-hy;
            h = h*h;
            x = h / hy;
        }
    }
    return Math.sqrt(x/(x+n));
}


export function corr(xdata, ydata, end, start=0){
    var n=0, hx, hy, x=0., y=0., sxy=0., sx=0., sy=0.;
    if(!end) end = xdata.length;
    for (var i=start; i<end; i++){
        hx = xdata[i];
        hy = ydata[i];
        if (hx && hy){
            n++;
            x += hx;
            sx += hx*hx;
            y += hy;
            sy += hy*hy;
            sxy += hx*hy;
        }
    }

    return (sxy - x*y/n)/Math.sqrt((sx - x*x/n)*(sy - y*y/n));
}

export function lin_reg(xdata, ydata, start=0, end){
    var hx, hy, x=0, y=0, sx=0, sx2, sy=0, sxy=0,  n=0;
    var r = {};
    if(!end) end = xdata.length;
    for (var i=start; i<end; i++){
        hx = xdata[i];
        hy = ydata[i];
        if (hx && hy){
            n++;
            x += hx;
            sx += hx*hx;
            y += hy;
            sy += hy*hy;
            sxy += hx*hy;
        }
    }

    x /= n;
    y /= n;

    sx2 = sx;
    sx = sx/n-x*x;
    sy = sy/n-y*y;
    sxy = sxy/n-x*y;

    var a,b;
    a = sxy / sx;
    b = y - a * x;

    r.b = [];
    r.b[0] = b;
    r.b[1] = a;


    var err = 0.0; // residuals
    for (var i=start; i<end; i++){
        hx = xdata[i];
        hy = ydata[i];
        if (hx && hy){
            y = b + hx * a;
            x = (hy - y);
            err += x*x;
        }
    }
    err = err/(n-2);
    r.err = Math.sqrt(err);
    r.err_b = [];
    r.err_b[0] = Math.sqrt(err*sx2/(n*n*sx));
    r.err_b[1] = Math.sqrt(err/(n*sx));

    var p = 1 // unabhängige variable im modell
    r.r_square = 1-(err/sy*(n-2)/n);
    r.r_square_adj = 1-(1-r.r_square) * (n-1)/(n-p-1);
    r.f_value = r.r_square/(1-r.r_square) * (n-p-1)/p;
    r.df = 2;
    r.p = p;
    return r;
}



