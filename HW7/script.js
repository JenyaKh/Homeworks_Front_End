function createCalculator(a) {
    
    return {
        sum:  function(...args) {
            a = args.reduce((acc, val) => acc + val, a);
            return this;
        },
        mult: function(...args) {
            a = args.reduce((acc, val) => acc * val, a);
            return this;
        },
        sub:  function(...args) {
            a = args.reduce((acc, val) => acc - val, a);
            return this;
        },
        div:  function(...args) {
            a = args.reduce((acc, val) => acc / val, a);
            return this;
        },
        set:  function(b) {
            a = b;
            return this;
        },
        get:   () => a,
    }
}

const calc = createCalculator(10);
alert(calc.sum(20,5,5,10).div(5,2).mult(6,3,2).sub(30,50).get())