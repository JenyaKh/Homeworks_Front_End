const firstOpEl = document.getElementById("firstOp");
const secondOpEl = document.getElementById("secondOp");
const buttonCalcEl = document.getElementById("calcResult");
const operatorEl = document.getElementById("operator");
const resultEl = document.getElementById("result");
const errorEl = document.getElementById("error");

buttonCalcEl.addEventListener("click", onBtnCalcClick);
firstOpEl.addEventListener("input", onOperandInput);
secondOpEl.addEventListener("input", onOperandInput);

function onBtnCalcClick() {
    const result = Calculate(operatorEl.value, firstOpEl.value, secondOpEl.value);
    resultEl.textContent = result;
}

function Calculate(operator, a, b) {
    switch (operator) {
        case "+":
            return Number(a) + Number(b);
        case "-":
            return Number(a) - Number(b);
        case "*":
            return Number(a) * Number(b);
        case "/":
            return Number(a) / Number(b);  
        default:
            return 'select operator';
    }

}

function onOperandInput() { 
    checkOperand();
    validation();
}

function checkOperand() {
    errorEl.textContent = "";
    const value = document.activeElement.value;
    if (isNaN(value)) errorEl.textContent = `"${value}" is not a number`;  
}

function validation() {
    if (isNaN(firstOpEl.value) || firstOpEl.value == "" || isNaN(secondOpEl.value) || secondOpEl.value == "") {
        buttonCalcEl.disabled = true;
    } else {
        buttonCalcEl.disabled = false;
    }
}