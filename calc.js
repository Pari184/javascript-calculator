//calculator object properties
const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};
// Function to display the content
function updateDisplay() {
    // select the element with class of `calculator-screen`
    const display = document.querySelector('.calculator-screen');
    // update the value of the element with the contents of `displayValue`
    display.value = calculator.displayValue;
}
//To get the 1st and 2nd operands
function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;
    // It operates when the user enters second operand value
    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    }
    // It operates when the user enters first operand value(appending the digits, in case of more than one digit)
    else {

        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }

    console.log(calculator);
}

//when the user enters the decimal value
function inputDecimal(dot) {
    //Append zero with the display value, when user enters decimal value in the second operand
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = '0.'
        calculator.waitingForSecondOperand = false;
        return
    }
    // If the `displayValue` property does not contain a decimal point
    if (!calculator.displayValue.includes(dot)) {

        // Append the decimal point
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    //deconstuct calculator 
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);
    //when pressing multiple operators before entering second oprerand
    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }
    //set the inputValue to the first operand when user clicks on any operator
    if (firstOperand == null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;

    }
    //when user clicks on '=' key
    else if (operator) {

        const result = calculate(firstOperand, inputValue, operator);



        calculator.displayValue = String(result);

        calculator.firstOperand = result;

    }

    //When the user hits an operator after entering the second operand
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}

//Performing arithmatic operations
function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    }

    return secondOperand;
}
// resetting all the properties
function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
}


//updateDisplay();
const keys = document.querySelector('.calculator-keys');

keys.addEventListener('click', (event) => {
    // Access the clicked element
    const { target } = event;

    // Check if the clicked element is a button.
    // If not, exit from the function(when aspace)
    if (!target.matches('button')) {
        return;
    }
    //getting the opreator key and calling handle operator function
    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }
    //when user clicks on '.' valuecalling the inputDecimal function
    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();

        return;
    }
    //when reset button is clicked call the resetCalculator function
    if (target.classList.contains('all-clear')) {
        resetCalculator();
        updateDisplay();
        return;
    }

    inputDigit(target.value);
    updateDisplay();
});