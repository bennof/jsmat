export class Func{
    constructor(Str, Func){
        this.str = Str;
        this.func = Func;
    }

    toString() {
        return this.str;
    }

    calc(args){
        this.func.apply(this,args)
    }

    seq(start,end,step=1,offset=0){
        if (end == undefined)
            end = start,start = 0;
        var a = new Array(end-start+offset);
        for(var i=0; i<offset; i++)
            a[i] = undefined;
        for(; i<end-start+offset; i++)
            a[i] = this.func(start + (i)*step);
        return a; 
    }
};

export function seq(start,end,step=1){
    if (end == undefined)
        end = start,start = 0;
    var a = new Array(end-start);
    for(var i=0; i<end-start; i++)
        a[i] = start + i*step;
    return a;
}