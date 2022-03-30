let operator;
let firstNumber; 
let secondNumber; 

function checkOperator (operator) {
    const operators = ['+', '-', '*', '/'];
    return operators.includes(operator);
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

function getOperator () {
    do {
        operator = prompt('Choose what will we do? (+-*/');
    } while (!checkOperator(operator));
    return operator;
}

operator = getOperator();
firstNumber = getNumber('first');
secondNumber = getNumber('second');

alert(`result: ${firstNumber} ${operator} ${secondNumber} = ${calcResult(operator, firstNumber, secondNumber)}`);
