const INITIAL_VALUE = "0";
const ERROR_VALUE = "Error"
const MAX_LENGTH = 10;

const numberBtns = document.querySelectorAll(".num-btn");
const operationDescription = document.getElementById("operation-description");
const operationResult = document.getElementById("operation-result");
const addBtn = document.getElementById('add-btn');
const subtractBtn = document.getElementById('subtract-btn');
const multiplyBtn = document.getElementById('multiply-btn');
const divideBtn = document.getElementById('divide-btn');
const equalBtn = document.getElementById('equal-btn');
const clearBtn = document.getElementById('clear-btn');
const backspaceBtn = document.getElementById('backspace-btn');

let currentValue = INITIAL_VALUE;
let previousValue = "";
let currentOperator = "";


numberBtns.forEach(btn => {
    btn.addEventListener("click", (e) =>  {
        setCurrentValueHandler(e.target.textContent);
    })
})

function updateResultDisplay(value) {
    // Update the result while limiting the number of digits to 10
    operationResult.textContent = value.toString().slice(0, MAX_LENGTH + 1); 
}

function backspaceHandler() {
    if (currentValue === INITIAL_VALUE || currentValue === ERROR_VALUE) {
        currentValue = INITIAL_VALUE;
    } else {
        // Slice the last digit off
        currentValue = currentValue.toString().slice(0, -1); 
    }
    updateResultDisplay(currentValue);
}

function setCurrentValueHandler(value) {
    if (value !== ".") {
        if (currentValue === INITIAL_VALUE || currentValue === ERROR_VALUE) {
            currentValue = value;
        } else if (currentValue.length < MAX_LENGTH) {
            // Allow to select up to 10 digits
            currentValue = currentValue.concat(value); 
        } else {
            currentValue = currentValue;
        }
    } else {
        if (currentValue.includes(value)) {
            currentValue = currentValue;
        } else {
            currentValue = currentValue.concat(value);
        }
    }
    updateResultDisplay(currentValue);
}

function setOperatorHandler(operator) {
    currentOperator = operator;

    // Save the previously selected number and reset the current value
    previousValue = currentValue.toString().substring(0,11);
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
            if (b === 0) {
                currentValue = ERROR_VALUE;
            } else {
                currentValue = divide(a,b);
            }
            break;

    }
    updateResultDisplay(currentValue);
}

function clearScreenHandler() {
    currentValue = INITIAL_VALUE;
    previousValue = "";
    currentOperator = "";

    operationDescription.textContent = "";
    updateResultDisplay(currentValue);
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


addBtn.addEventListener("click", setOperatorHandler.bind(this, operator="+"));
subtractBtn.addEventListener("click", setOperatorHandler.bind(this,operator="-"));
multiplyBtn.addEventListener("click", setOperatorHandler.bind(this, operator="*"));
divideBtn.addEventListener("click", setOperatorHandler.bind(this, operator="/"));
equalBtn.addEventListener("click", operationHandler);
clearBtn.addEventListener("click", clearScreenHandler);
backspaceBtn.addEventListener("click", backspaceHandler);

updateResultDisplay(currentValue);