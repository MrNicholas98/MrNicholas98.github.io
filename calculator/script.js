// Get references to the display and all buttons
const display = document.querySelector('.calculator-display');
const buttons = document.querySelectorAll('.button');

// Variables to store calculator state
let displayValue = '0'; // What's currently on the screen (string)
let firstOperand = null; // Stores the first number for an operation (number or null)
let operator = null; // Stores the current operator (+, -, *, /) (string or null)
let waitingForSecondOperand = false; // True if the next digit input should start a new number

// Function to update the display element
function updateDisplay() {
    display.value = displayValue;
    console.log('Display Updated:', displayValue); // For debugging
}

// Handles digit button clicks (0-9)
function inputDigit(digit) {
    console.log('Input Digit:', digit); // For debugging
    if (waitingForSecondOperand === true) {
        // If waiting for a new number, replace displayValue
        displayValue = digit;
        waitingForSecondOperand = false;
    } else {
        // If display is '0', replace it with the digit. Otherwise, append the digit.
        displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    updateDisplay();
}

// Handles decimal point button click
function inputDecimal(dot) {
    console.log('Input Decimal:', dot); // For debugging
    // If an operator was just clicked, start a new number with "0."
    if (waitingForSecondOperand === true) {
        displayValue = '0.';
        waitingForSecondOperand = false;
        updateDisplay();
        return;
    }
    // Only add a decimal if one doesn't already exist in the current number
    if (!displayValue.includes(dot)) {
        displayValue += dot;
    }
    updateDisplay();
}

// Performs the actual arithmetic calculation
function calculate(first, second, op) {
    console.log('Performing Calculation:', first, op, second); // For debugging
    if (op === '+') return first + second;
    if (op === '-') return first - second;
    if (op === '×') return first * second; // Note: using '×' from HTML
    if (op === '÷') { // Note: using '÷' from HTML
        if (second === 0) { // Handle division by zero
            return 'Error'; // Return 'Error' string for display
        }
        return first / second;
    }
    return second; // If no operator, return the second operand (e.g., after initial number entry)
}

// Handles operator button clicks (+, -, ×, ÷)
function handleOperator(nextOperator) {
    console.log('Handling Operator:', nextOperator); // For debugging
    const inputValue = parseFloat(displayValue); // Convert current display value to a number

    // If an operator was already pressed and we are waiting for the second operand,
    // it means the user clicked another operator (e.g., "5 + *"). In this case,
    // we just update the operator, no calculation needed yet.
    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        console.log('Operator changed to:', operator); // For debugging
        return;
    }

    // If firstOperand is null, set the current input as the first operand
    if (firstOperand === null && !isNaN(inputValue)) {
        firstOperand = inputValue;
        console.log('First Operand set:', firstOperand); // For debugging
    } else if (operator) {
        // If there's an existing operator and firstOperand, perform the calculation
        if (!isNaN(inputValue)) {
            const result = calculate(firstOperand, inputValue, operator);
            if (result === 'Error') { // Check for division by zero error
                displayValue = 'Error';
                resetCalculator(); // Reset calculator state after an error
                updateDisplay();
                return;
            }
            displayValue = String(result); // Update display with result
            firstOperand = result; // The result becomes the new firstOperand for chained operations
            console.log('Chained calculation result:', displayValue); // For debugging
        }
    }

    waitingForSecondOperand = true; // Set flag: next digit input will start a new number
    operator = nextOperator; // Store the new operator
    updateDisplay(); // Refresh display
}

// Resets the calculator to its initial state
function resetCalculator() {
    console.log('Calculator Reset!'); // For debugging
    displayValue = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

// Main Event Listener: Attaches a click listener to all buttons
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const { target } = event; // Get the specific button element that was clicked
        const buttonText = target.textContent; // Get the text content of the button

        console.log('Button Clicked:', buttonText, 'ClassList:', target.classList); // For debugging

        // Check if it's a "Clear" button
        if (target.classList.contains('clear')) {
            resetCalculator();
            return; // Stop further processing
        }

        // Check if it's a "Decimal" button
        if (target.classList.contains('decimal')) {
            inputDecimal(buttonText);
            return; // Stop further processing
        }

        // Check if it's an "Operator" button (+, -, ×, ÷)
        if (target.classList.contains('operator')) {
            handleOperator(buttonText);
            return; // Stop further processing
        }

        // Check if it's the "Equals" button (=)
        if (target.classList.contains('equals')) {
            // Only calculate if there's a first operand, an operator, and we're not waiting for a second operand (meaning second operand is already entered)
            if (firstOperand === null || operator === null || waitingForSecondOperand) {
                console.log('Equals: Not enough operands/operator to calculate or waiting for second.'); // For debugging
                updateDisplay(); // Just ensure display is current
                return; // Stop further processing
            }

            const inputValue = parseFloat(displayValue);
            if (isNaN(inputValue)) { // Check if the current display value is a valid number
                console.log('Equals: Invalid second operand.'); // For debugging
                return;
            }

            // Perform the final calculation
            const result = calculate(firstOperand, inputValue, operator);
            if (result === 'Error') { // Check for division by zero error
                displayValue = 'Error';
                resetCalculator(); // Reset calculator state after an error
                updateDisplay();
                return;
            }

            displayValue = String(result); // Set display to the result
            firstOperand = null; // Reset for a new calculation chain
            operator = null; // Reset operator
            waitingForSecondOperand = false; // Not waiting for a second operand
            updateDisplay();
            console.log('Equals calculation result:', displayValue); // For debugging
            return; // Stop further processing
        }

        // If it's none of the above, it must be a digit button (0-9)
        inputDigit(buttonText);
    });
});

// Initial display update when the script first loads
updateDisplay();