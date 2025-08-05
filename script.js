const display = document.getElementById('current-expression');
const historyDiv = document.getElementById('history');
const buttons = document.querySelectorAll('button');

let currentInput = "";
let currentExpression = "";

// Update the main display
function updateDisplay(value) {
  display.textContent = value;
}

// Add to calculation history
function addToHistory(expression, result) {
  const entry = document.createElement("div");
  entry.className = "history-entry";
  entry.textContent = `${expression} = ${result}`;
  historyDiv.prepend(entry);
}

// Main button press logic
function pressButton(value) {
  if (!isNaN(value) || value === ".") {
    currentInput += value;
    updateDisplay(currentExpression + currentInput);
  } 
  else if (["+", "-", "*", "/"].includes(value)) {
    if (currentInput === "" && currentExpression !== "") {
      // Replace last operator if no new number
      currentExpression = currentExpression.slice(0, -1) + value;
    } else {
      currentExpression += currentInput + value;
      currentInput = "";
    }
    updateDisplay(currentExpression);
  } 
  else if (value === "=") {
    currentExpression += currentInput;
    try {
      const result = eval(currentExpression);
      addToHistory(currentExpression, result);
      updateDisplay(result);
      currentInput = result.toString();
      currentExpression = "";
    } catch {
      updateDisplay("Error");
      currentExpression = "";
      currentInput = "";
    }
  } 
  else if (value === "C") {
    currentExpression = "";
    currentInput = "";
    updateDisplay("0");
  } 
  else if (value === "←") {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentExpression + currentInput || "0");
  }
}

// Add event listeners for clicks
buttons.forEach(button => {
  button.addEventListener('click', () => pressButton(button.textContent));
});

// Add keyboard support
document.addEventListener('keydown', function(event) {
  const key = event.key;
  if (!isNaN(key) || key === '.') {
    pressButton(key);
  } else if (['+', '-', '*', '/'].includes(key)) {
    pressButton(key);
  } else if (key === 'Backspace') {
    pressButton('←');
  } else if (key === 'Enter' || key === '=') {
    pressButton('=');
  } else if (key === 'Escape') {
    pressButton('C');
  }
});

// Start with zero
updateDisplay("0");
