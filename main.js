const INITIAL_VALUE = "0";

let currentValue = INITIAL_VALUE;
let previousValue = ""
let currentOperator = "";

const numberBtns = document.querySelectorAll(".num-btn");
const operationDescription = document.getElementById("operation-description");
const operationResult = document.getElementById("operation-result");
const addBtn = document.getElementById('add-btn');
const subtractBtn = document.getElementById('subtract-btn');
const multiplyBtn = document.getElementById('multiply-btn');
const divideBtn = document.getElementById('divide-btn');
const equalBtn = document.getElementById('equal-btn');
const clearBtn = document.getElementById('clear-btn');

operationResult.textContent = currentValue;

numberBtns.forEach(btn => {
    btn.addEventListener("click", (e) =>  {
        setCurrentValueHandler(e.target.textContent);
    })
})

function setCurrentValueHandler(value) {
    if (currentValue === INITIAL_VALUE) {
        currentValue = value;
    } else {
        currentValue = currentValue.concat(value); // Allows to select multiple digits
    }
    operationResult.textContent = currentValue;
}

function setOperatorHandler(operator) {
    currentOperator = operator;

    // Save the previously selected number and reset the current value
    previousValue = currentValue;
    currentValue = INITIAL_VALUE;
    
    operationDescription.textContent = `${previousValue} ${operator}`;
}

function operationHandler() {
    let a = +previousValue;
    let b = +currentValue;
    let operator = currentOperator;

    operationDescription.textContent = `${previousValue} ${operator} ${currentValue} =`;

    switch (operator) {
        case '+':
            currentValue = add(a,b);
            break;
        case '-':
            currentValue = subtract(a,b);
            break;
        case '*':
            currentValue = multiply(a,b);
            break;
        case '/':
            currentValue = divide(a,b);
            break;
    }
    operationResult.textContent = currentValue;
}

function clearScreenHandler() {
    currentValue = INITIAL_VALUE;
    previousValue = "";
    currentOperator = "";

    operationDescription.textContent = "";
    operationResult.textContent = currentValue;
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function divide(a, b) {
    return a / b;
}

function multiply(a, b) {
    return a * b;
}


addBtn.addEventListener("click", setOperatorHandler.bind(this, operator="+"))
subtractBtn.addEventListener("click", setOperatorHandler.bind(this,operator="-"))
multiplyBtn.addEventListener("click", setOperatorHandler.bind(this, operator="*"))
divideBtn.addEventListener("click", setOperatorHandler.bind(this, operator="/"))
equalBtn.addEventListener("click", operationHandler);
clearBtn.addEventListener("click", clearScreenHandler);