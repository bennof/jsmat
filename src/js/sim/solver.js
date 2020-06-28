
export class Solver {
    constructor(df){
        this.df = df;
    }

    set_param(name,value){
        this[name] = value;
    }

    get_param(name){
        return this[name];
    }

    run(){
        return "ERROR: no solver defined";
    }
};


export class EulerSolver extends Solver{
    constructor(df) {
        super(df);
    }

    run(t0,X0,n,h=1) {
        var len = X0.length,
            data = new Array();
        data[0]=X0;

        if (len != this.df.length)
            return "ERROR: dimensions do not match";

        for(var i=1; i<n; i++){
            var d = new Array(len);
            for(var j=0; j<len; j++){
                d[j] = data[i-1][j]+this.df[j].call(this,t0+(i-1)*h,data[i-1]);
            }
            data.push(d);
        }
        return data;
    }
}

export class HeunSolver extends Solver{
    run(t0,X0,n,h=1) {
        var len = X0.length,
            data = new Array();
        data[0]=X0;

        if (len != this.df.length)
            return "ERROR: dimensions do not match";

        var u = new Array(len);
        for(var i=1; i<n; i++){
            var d = new Array(len);
            for(var j=0; j<len; j++){
                u[j] = data[i-1][j]+this.df[j].call(this,t0+(i-1)*h,data[i-1]);
                d[j] = data[i-1][j]+0.5*h * 
                    ( this.df[j].call(this,t0+(i-1)*h,data[i-1])
                    + this.df[j].call(this,t0+i*h,u));
            }
            data.push(d);
        }
        return data;
    }
}

export class RungeKuttaSolver extends Solver{
    run(t0,X0,n, h=1) {
        var len = X0.length,
            data = new Array();
        data[0]=X0;

        if (len != this.df.length)
            return "ERROR: dimensions do not match";

        var u = new Array(len);
        var k1 = new Array(len);
        var k2 = new Array(len);
        var k3 = new Array(len);
        var k4 = new Array(len);
        for(var i=1; i<n; i++){
            var d = new Array(len);
            // k1
            for(var j=0; j<len; j++){
                k1[j] = this.df[j].call(this,t0+(i-1)*h,data[i-1]);
                u[j] = data[i-1][j] + h/2*k1[j];
            }

            // k2
            for(var j=0; j<len; j++){
                k2[j] = this.df[j].call(this,t0+(i-0.5)*h,u);
                u[j] = data[i-1][j] + h/2*k2[j];
            }

            // k3
            for(var j=0; j<len; j++){
                k3[j] = this.df[j].call(this,t0+(i-0.5)*h,u);
                u[j] = data[i-1][j] + h*k3[j];
            }

            // k4
            for(var j=0; j<len; j++){
                k4[j] = this.df[j].call(this,t0+i*h,u);
            }

            //sum all
            for(var j=0; j<len; j++){
                d[j] = data[i-1][j] + h * 
                    (k1[j] + 2*k2[j] + 2*k3[j] + k4[j]) / 6;
            }
            data.push(d);
        }
        return data;
    }
}