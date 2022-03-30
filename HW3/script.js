let operator;
let firstNumber; 
let secondNumber; 

function checkOperator (operator) {
    const operators = ['+', '-', '*', '/'];
    let isOperator = operators.includes(operator) ? true: false;
    return isOperator;
};

function calcResult (operator, firstNumber, secondNumber) {
    let result;
    switch (operator) {
        case '+':
           result = firstNumber + secondNumber;
           break;
        case '-':
           result = firstNumber - secondNumber;
           break;
        case '*':
           result = firstNumber * secondNumber;   
           break; 
        case '/':
           result = firstNumber / secondNumber;
    };
    return result;
};

function getNumber (index) {
    let number;
    do {
        number = +prompt(`Enter the ${index} number`);
    } while (isNaN(number));
    return number;
};

do {
    operator = prompt('Choose what will we do? (+-*/');
} while (!checkOperator(operator));

firstNumber = getNumber('first');
secondNumber = getNumber('second');

alert(`result: ${firstNumber} ${operator} ${secondNumber} = ${calcResult(operator, firstNumber, secondNumber)}`);
