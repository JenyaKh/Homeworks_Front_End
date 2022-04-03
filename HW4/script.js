let operator = getOperator();
let operands = getOperands();
let result = culcResult(operands, operator);
showResult(operands, operator, result);

function getOperator () {
    let operator;
    do {
        operator = prompt('Choose what will we do? (+-*/');
    } while (!checkOperator(operator));
    return operator;
};

function checkOperator (operator) {
    const operators = ['+', '-', '*', '/'];
    return operators.includes(operator);
};

function getOperands () {
    let operands;
    do {
        operands = prompt('Enter numbers separated by commas');
    } while (!operands);
    return getNumbers(operands)   
};

function getNumbers (operands) {
    let numbers = [];
    let op = operands.split(',');
    for (let i = 0; i < op.length; i++) {
        if (isNaN(op[i])) continue;
        numbers.push(+op[i]);        
    };
    return numbers;
}

function culcResult (operands, operator) {
    let result = operands[0];
    switch (operator) {
        case '+':
            for (let i = 1; i < operands.length; i++) {
                result = result + operands[i];
            }
            break;
        case '-':
            for (let i = 1; i < operands.length; i++) {
                result = result - operands[i];
            }
            break;
        case '*':
            for (let i = 1; i < operands.length; i++) {
                result = result * operands[i];
            }
            break;
        case '/':
            for (let i = 1; i < operands.length; i++) {
                result = result / operands[i];
            }
            break;
        default:
            alert('Oops! We cannot perform such operations');
        }
    
    return result;
};

function showResult (operands, operator, result) {
    alert(`Operands: ${operands}, operation: ${operator}, result: ${result}`);
};