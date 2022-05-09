function Calculator(value) {
    this.result = value;
}

Calculator.prototype.sum = function(operand) {
   this.result += operand; 
};

Calculator.prototype.sub = function(operand) {
    this.result -= operand; 
 };

 Calculator.prototype.mult = function(operand) {
    this.result *= operand; 
 };

 Calculator.prototype.div = function(operand) {
    this.result /= operand; 
 };

 Calculator.prototype.set = function(newValue) {
    this.result = newValue;
 };

const calc = new Calculator(10);

calc.sum(5); 
console.log(calc.result);
calc.mult(10);
console.log(calc.result); 
calc.sub(40); 
console.log(calc.result);
calc.div(10); 
console.log(calc.result);