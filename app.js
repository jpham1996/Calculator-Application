const numberButtons = document.querySelectorAll(".numbers");
const operationButtons = document.querySelectorAll(".operator");
const clear = document.querySelector("#clear");
const equalButton = document.querySelector("#equal");
const del = document.querySelector("#delete");

const currentOperandTextElement = document.querySelector("#current-operand");
const previousOperandTextElement = document.querySelector("#previous-operand");
let currentOperand = "";
let previousOperand = "";
let operator = undefined; // declared without a value

// Deletes the last digit of the number, even if one digit is present. Ex. 1
function deleteOperand() {
  currentOperand = currentOperand.toString().slice(0, -1);
}

function appendNumber(number) {
  if (number === "." && currentOperand.includes(".")) {
    // Cannot add another decimal if there is already one in the Number input
    // Returns nothing
    return;
  }
  currentOperand = currentOperand.toString() + number.toString(); // Concatenates the strings (Ex. 5 + 5 = 55)
}

function chooseOperation(operation) {
  // if currentOperand is empty, return nothing
  if (currentOperand === "") {
    return;
  }

  // if previousOperand is not empty, do calculation via calculate function and keep doing the math, if equal button is not clicked on.
  if (previousOperand !== "") {
    calculate();
  }

  operator = operation; // Reset operator
  previousOperand = currentOperand;
  currentOperand = ""; // Make currentOperand empty
}

function calculate() {
  let calculation;
  const previousOP = parseFloat(previousOperand); // Converts strings into a floating point number that accepts decimal places
  const currentOP = parseFloat(currentOperand); // Converts strings into a floating point number that accepts decimal places

  if (isNaN(previousOP) || isNaN(currentOP)) {
    // If prevOP (previousOperand) and currentOP (currentOperand) are not a number, return nothing
    return;
  }

  // Switch case for operator chosen
  switch (operator) {
    case "+":
      calculation = previousOP + currentOP;
      break;
    case "-":
      calculation = previousOP - currentOP;
      break;
    case "*":
      calculation = previousOP * currentOP;
      break;
    case "/":
      calculation = previousOP / currentOP;
      break;
    default:
      return;
  }

  // currentOperand becomes the output
  currentOperand = calculation;

  // After calculation, operator is undefined and previousOperand is empty
  operator = undefined;
  previousOperand = "";
}

// Clears the calculator display
function clearDisplay() {
  currentOperand = "";
  previousOperand = "";
  operator = undefined;
}

// Number format
function getDisplayNumber(number) {
  const stringNumber = number.toString(); // Strings the number
  const integerDigits = parseFloat(stringNumber.split(".")[0]); // Gets the string number, and then converts it back to a float number
  const decimalDigits = stringNumber.split(".")[1]; // Gets the decimal piece of the string
  let integerDisplay;

  if (isNaN(integerDigits)) {
    // If integer number is not a number, return empty string
    integerDisplay = "";
  } else {
    integerDisplay = integerDigits.toLocaleString("en", {
      // Number format in English
      maximumFractionDigits: 0, // The maximum number of digits after the decimal separator
    });
  }

  // If decimal is found
  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`;
  } else {
    // Returns integer with no decimal
    return integerDisplay;
  }
}

function updateDisplay() {
  currentOperandTextElement.innerText = getDisplayNumber(currentOperand); // currentOperand  gets updated on the display

  if (operator != null) {
    // If operator is found
    previousOperandTextElement.innerText = `${getDisplayNumber(
      previousOperand
    )} ${operator}`;
  } else {
    // If no operator is found
    previousOperandTextElement.innerText = "";
  }
}

/* Event Listeners */

// Loop through the Number Buttons (0-9) including the Decimal (.) and updates the display
for (let i = 0; i < numberButtons.length; i++) {
  numberButtons[i].addEventListener("click", function () {
    appendNumber(numberButtons[i].innerText); // Strings and Concatenates a number string
    updateDisplay();
  });
}

// Loop through the Operation Buttons (+, -, *, /) and updates the display
for (let i = 0; i < operationButtons.length; i++) {
  operationButtons[i].addEventListener("click", function () {
    chooseOperation(operationButtons[i].innerText);
    updateDisplay();
  });
}

// Computes the operands depending on the operator used and updates the display
equalButton.addEventListener("click", function () {
  calculate();
  updateDisplay();
});

// Clears everything on the display (Number input) on the Calculator and updates the display
clear.addEventListener("click", function () {
  clearDisplay();
  updateDisplay();
});

// Deletes the last digit from the number string
del.addEventListener("click", function () {
  deleteOperand();
  updateDisplay();
});
