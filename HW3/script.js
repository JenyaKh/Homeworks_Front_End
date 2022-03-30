let operator;
let firstNumber; 
let secondNumber; 

function checkOperator (operator) {
    const operators = ['+', '-', '*', '/']
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
}

do {
    operator = prompt('Choose what will we do? (+-*/');
} while (checkOperator(operator) == false);

do {
   firstNumber = +prompt('Enter the first number');
} while (isNaN(firstNumber));

do {
    secondNumber = +prompt('Enter the second number');
 } while (isNaN(secondNumber));

 alert(`result: ${firstNumber} ${operator} ${secondNumber} = ${calcResult(operator, firstNumber, secondNumber)}`)
 