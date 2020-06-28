/** 
* @module jsmat/vector
*/


export class Vector extends Array{

    constructor(){
        super(...arguments);
        for(var i=0; i<this.length; i++)
            if(isNaN(this[i]))
                this[i] = 0.0;
    }

    get len() {
        var h, r = 0.0;
        for(var i=0; i<this.length; i++){
            h = this[i];
            r += h * h;
        }
        return Math.sqrt(r);
    }  
    
    get len2() {
        var h, r = 0.0;
        for(var i=0; i<this.length; i++){
            h = this[i];
            r += h * h;
        }
        return r;
    }  

    toString(){
        var r = "[";
        for(var i=0; i<this.length; i++)
            r += this[i].toString()+",";
        r = r.slice(0, -1);
        return r + "]T";
    }

    clone(){
        return this.slice(0);
    }

    zero(){
        for(var i=0; i<this.length; i++)
            this[i] = 0.0;
        return this;
    }

    static copy(vout,vin){
        for(var i=0; i<vout.length; i++)
            vout[i] = vin[i];
        return vout;
    }

    static apply(vout,vin,func){
        for(var i=0; i<vout.length; i++)
            vout[i] = func(vin[i]);
        return vout;
    }

    static add(vout,va,vb){
        for(var i=0; i<vout.length; i++)
            vout[i] = va[i]+vb[i];
        return vout;
    }

    static sub(vout,va,vb){
        for(var i=0; i<vout.length; i++)
            vout[i] = va[i]-vb[i];
        return vout;
    }

    static mult(vout,va,vb){
        for(var i=0; i<vout.length; i++)
            vout[i] = va[i]*vb[i];
        return vout;
    }

    static div(vout,va,vb){
        for(var i=0; i<vout.length; i++)
            vout[i] = va[i]/vb[i];
        return vout;
    }

    static scale(vout,va,a){
        for(var i=0; i<vout.length; i++)
            vout[i] = va[i] * a;
        return vout;
    }

    static scale_add(vout,va,a,vb){
        for(var i=0; i<vout.length; i++)
            vout[i] = va[i] * a + vb[i];
        return vout;
    }

    static ceil(vout,va){
        for(var i=0; i<vout.length; i++)
            vout[i] = Math.ceil(va[i]);
        return vout;
    }

    static floor(vout,va){
        for(var i=0; i<vout.length; i++)
            vout[i] = Math.floor(va[i]);
        return vout;
    }

    static min(vout,va,vb){
        for(var i=0; i<vout.length; i++)
            vout[i] = Math.min(va[i], vb[i]);
        return vout;
    }

    static max(vout,va,vb){
        for(var i=0; i<vout.length; i++)
            vout[i] = Math.max(va[i], vb[i]);
        return vout;
    }

    static dot(va,vb){
        var r = 0.0
        for(var i=0; i<va.length; i++)
            r += va[i]*vb[i];
        return r;
    }

    static distance(va,vb){
        var h, r = 0.0
        for(var i=0; i<va.length; i++)
            h = vb[i]-va[i];
            r += h * h;
        return Math.sqrt(r);
    }

    static sqdistance(va,vb){
        var h, r = 0.0
        for(var i=0; i<va.length; i++)
            h = va[i]-vb[i];
            r += h * h;
        return r;
    }

    static norm(vout,vin){
        var len = vin.len;
        if ( len > 0) {
            len = 1/len;
            for(var i=0; i<vout.length; i++)
                vout[i] = vin[i]*len;
        }
        return  vout;
    }

    static neg(vout,vin){
        for(var i=0; i<vout.length; i++)
            vout[i] = -vin[i];
        return  vout;
    }

    static inv(vout,vin){
        for(var i=0; i<vout.length; i++)
            vout[i] = 1/vin[i];
        return  vout;
    }

    static equals(va,vb) {
        var h = true;
        for(var i=0; i<va.length; i++)
            h = h && (
                Math.abs(va[i]-vb[i]) <= Number.EPSILON * 
                Math.max(1.0,Math.abs(va[i],Math.abs(vb[i])))
            );
        return h;
    }

};

export var Vec = Vector;

export class Vec2 extends Vector{
    constructor(x,y){
        super(2);
        this[0] = x || 0.0;
        this[1] = y || 0.0;
    }
};

export class Vec3 extends Vector{
    constructor(x,y,z){
        super(3);
        this[0] = x || 0.0;
        this[1] = y || 0.0;
        this[2] = z || 0.0;
    }

    static cross(vout, va, vb){
        vout[0] = va[1] * vb[2] - va[2] * vb[1];
        vout[1] = va[2] * vb[0] - va[0] * vb[2];
        vout[2] = va[0] * vb[1] - va[1] * vb[0];
        return vout;
    }
};

export class Vec4 extends Vector{
    constructor(x,y,z,w){
        super(4);
        this[0] = x || 0.0;
        this[1] = y || 0.0;
        this[2] = z || 0.0;
        this[3] = w || 0.0;
    }  
};


export class Matrix extends Array{
    constructor(r,c){
        var h = 0;
        super(r);
        for(var i=0; i<r; i++){
            this[i] = new Array(c)
            for(var j=0; j<c; j++){
                if(isNaN(arguments[h+2]))
                    this[i][j] = 0.0;
                else 
                    this[i][j] = arguments[h+2];
                h++;
            }
        }
    }

    get dim(){
        return {
            rows: this.length, 
            cols: this[0].length
        }
    }

    get cols(){ return this[0].length; }

    get rows(){ return this.length; }

    get(r, c){
        return this[r][c];
    }

    set(r, c, value){
        this[r][c] = value;
        return value;
    }

    clone() {
        var m = this.slice(0)
        for (var i=0; i<this.length; i++)
            m[i] = this[i].slice(0);
        return m;
    }

    static copy(out, m1) {
        var r = m1.length, c = m1[0].length;
        for(var i=0; i<r; i++) {
            for(var j=0; j<c; j++)
                out[j][i] = m1[j][i];
        }
        return out;
    }

    det() {
        var r = this.length, c = this[0].length;
        if (r !== c) throw("ERROR: SIZE NxN");
        if (t == 1) return this[0][0];
        var sign = 1, c = new Array(c*r);



    }

    transpose(out) {
        var r = this.length, c = this[0].length;
        for(var i=0; i<r; i++) {
            for(var j=0; j<c; j++)
                out[i][j] = this[j][i];
        }
        return out;
    }

    gaussJordanTransform(out){
        var r = this.length, c = this[0].length;
        out = Matrix.copy(out,this);

        // Gauss Jordan
        for(var i=0; i<r; i++) {
            if(h[i][i] == 0.0)
                throw "ERROR: zero on diagonal";
            for(var j=0; j<c; j++){
                if(i!=j) {
                    hh = h[j][i]/h[i][i];
                    for(var k=0;k<c;k++) {
                        out[j][k] = out[j][k] - hh*out[i][k];
					}
                }
            }
        }
        
        return out;
    }

    invert (out){ // gauss jordan
        var r = this.length, c = this[0].length;
        if (r !== c) throw("ERROR: SIZE NxN");
        var hh, h = this.clone();
        console.log(h.toString());
        if (out){
            for(var i=0; i<r; i++) {
                for(var j=0; j<c; j++)
                    out[i][j] = (i==j) ? 1.0: 0.0;
            }
        } else 
            out = Matrix.new_id(r);
        
        console.log(out.toString());

        // Gauss Jordan
        for(var i=0; i<r; i++) {
            if(h[i][i] == 0.0)
                throw "ERROR: zero on diagonal";
            for(var j=0; j<c; j++){
                if(i!=j) {
                    hh = h[j][i]/h[i][i];
                    for(var k=0;k<c;k++) {
                        h[j][k] = h[j][k] - hh*h[i][k];
                        out[j][k] = out[j][k] - hh*out[i][k];
					}
                }
            }
        }

        // handle principal diagonal 
        for(var i=0; i<r; i++){
			for( var j=0; j<c; j++){
			    out[i][j] = out[i][j]/h[i][i];
			}
        }
        
        return out;
    }

    toString(){
        var h = "";
        var r = this.length, c = this[0].length;
        for(var i=0; i<r; i++) {
            h += "[";
            for(var j=0; j<c; j++)
                h += this[i][j].toString()+",";
            h = h.slice(0, -1);
            h += "]\n";
        }
        return h ;
    }

    static new_id(r, c){
        if (!c) c = r;
        var m = new Matrix(r, c);
        var i_max = Math.min(r,c)
        for(var i = 0; i < i_max; i ++)
            m[i][i] = 1.;
        return m;
    }

    static add(out, m1, m2){
        var r = out.length, c = out.length;
        for(var i=0; i<r; i++) {
            for(var j=0; j<c; j++)
                out[i][j] = m1[i][j]+m2[i][j];
        }
        return out;
    }

    static sub(out, m1, m2){
        var r = out.length, c = out.length;
        for(var i=0; i<r; i++) {
            for(var j=0; j<c; j++)
                out[i][j] = m1[i][j]-m2[i][j];
        }
        return out;
    }

    static pmult(out, m1, m2){
        var r = out.length, c = out.length;
        for(var i=0; i<r; i++) {
            for(var j=0; j<c; j++)
                out[i][j] = m1[i][j]*m2[i][j];
        }
        return out;
    }

    static pdiv(out, m1, m2){
        var r = out.length, c = out.length;
        for(var i=0; i<r; i++) {
            for(var j=0; j<c; j++)
                out[i][j] = m1[i][j]/m2[i][j];
        }
        return out;
    }

    static mult(out, m1, m2){
        var r = out.length, c = out.length, x = m2.length, h;
        if (x !== m1[0].length) throw("ERROR: Size does not match!");
        for(var i=0; i<r; i++) {
            for(var j=0; j<c; j++){
                h = 0.0;
                for(var k=0; k<x; k++)
                    h += m1[i][k] * m2[k][j];
                out[i][j] = h;
            }
        }
        return out;
    }

    static vmultr(out, m, v){
        var r = out.length, c = v.length, h;
        if (c !== m[0].length) throw("ERROR: Size does not match!");
        for(var i=0; i<r; i++) {
            h = 0.0;
            for(var j=0; j<c; j++){
                h += m[i][j] * v[j];
            }
            out[i] = h;
        }
        return out;
    }

    static vmultl(out, v, m){
        var r = out.length, c = m.length, h;
        if (c !== m.length) throw("ERROR: Size does not match!");
        for(var i=0; i<r; i++) {
            h = 0.0;
            for(var j=0; j<c; j++){
                h += v[j] * m[j][i];
            }
            out[i] = h;
        }
        return out;
    }
}

