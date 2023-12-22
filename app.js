// DOM Selectors
const numberButtons = document.querySelectorAll(".numbers");
const operationButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector("#clear");
const invertButton = document.querySelector("#invert");
const equalButton = document.querySelector("#equal");
const currentOperandTextElement = document.querySelector("#current-operand");
const previousOperandTextElement = document.querySelector("#previous-operand");

let currentOperand = "";
let previousOperand = "";
// Operator Variable not assigned a value;
let operator = undefined;

function appendNumber(number) {
  // If currentOperand already has a decimal already, return nothing
  if (number === "." && currentOperand.includes(".")) {
    return;
  }

  currentOperand = currentOperand.toString() + number.toString();

  console.log(currentOperand);
}

function chooseOperation(operation) {
  // if currentOperand is empty, return nothing
  if (currentOperand === "") {
    return;
  }

  // if currentOperand and previousOperand are not empty, do calculation if equal button is not clicked on.
  if (previousOperand !== "") {
    calculate();
  }

  operator = operation;
  previousOperand = currentOperand;
  currentOperand = "";
}

function calculate() {
  let calculation;
  // Converts strings into a floating point number that accepts decimal places
  const previousOP = parseFloat(previousOperand);
  const currentOP = parseFloat(currentOperand);

  if (isNaN(previousOP) || isNaN(currentOP)) {
    return;
  }

  if (operator === "+") {
    calculation = previousOP + currentOP;
  } else if (operator === "-") {
    calculation = previousOP - currentOP;
  } else if (operator === "*") {
    calculation = previousOP * currentOP;
  } else if (operator === "/") {
    calculation = previousOP / currentOP;
  } else {
    return;
  }

  // currentOperand becomes the output
  currentOperand = calculation.toString();
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

// Converts currentOperand to a positive or negative number
function invertOperandDisplay() {
  if (currentOperand === "") {
    return;
  }

  if (currentOperand > 0) {
    currentOperand = "-" + currentOperand;
  } else {
    currentOperand = currentOperand * -1;
  }
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
    // Number format in English
    integerDisplay = integerDigits.toLocaleString("en", {
      // The maximum number of digits after the decimal separator
      maximumFractionDigits: 0,
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
  currentOperandTextElement.innerText = getDisplayNumber(currentOperand);

  // If operator has a assigned value
  if (operator != null) {
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
    appendNumber(numberButtons[i].innerText);
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

// Computes the current and previous operands depending on the operator used and updates the display
equalButton.addEventListener("click", function () {
  calculate();
  updateDisplay();
});

// Clears everything on the display (Number input) on the Calculator and updates the display
clearButton.addEventListener("click", function () {
  clearDisplay();
  updateDisplay();
});

invertButton.addEventListener("click", function () {
  invertOperandDisplay();
  updateDisplay();
});
