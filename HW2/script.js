let operator = prompt('Choose what will we do? (+-*/');
let firstNumber = prompt('Enter the first number');
let secondNumber = prompt('Enter the second number');
if (isNaN(firstNumber) || isNaN(secondNumber)) {
    alert('Oops! It is not a number!');
} else {
    switch (operator) {
        case '+':
            alert(`${firstNumber} + ${secondNumber} = ` + (firstNumber + secondNumber));
            break;
        case '-':
            alert(`${firstNumber} - ${secondNumber} = ` + (firstNumber - secondNumber));
            break;
        case '*':
            alert(`${firstNumber} * ${secondNumber} = ` + (firstNumber * secondNumber));
            break;
        case '/':
            alert(`${firstNumber} / ${secondNumber} = ` + (firstNumber / secondNumber));
            break;
        default:
            alert('Oops! We cannot perform such operations');
    }
}
