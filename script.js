const buttons = document.querySelectorAll('button');

const calculator = {
  displayNumber: '0',
  secondNumber: null,
  operator: null,
  bool: false,
};

function inputNumber(number) {
  const { displayNumber, bool } = calculator;
  if (bool === true) {
    calculator.displayNumber = number;
    calculator.bool = false;
  } else {
    if (displayNumber === '0') {
      calculator.displayNumber = number;
    } else calculator.displayNumber = displayNumber + number;
  }
}

function display() {
  const info = document.querySelector('.info');
  info.textContent = calculator.displayNumber;
}

function inputDecimal(dot) {
  if (!calculator.displayNumber.includes(dot)) {
    calculator.displayNumber += dot;
  }
}

function clear(button) {
  if (button.getAttribute('value') === 'C') {
    calculator.displayNumber = '';
    calculator.secondNumber = null;
    calculator.operator = null;
    calculator.bool = false;
    display();
  } else {
    calculator.displayNumber = calculator.displayNumber.slice(
      '0',
      calculator.displayNumber.length - 1
    );
    display();
  }
}

function inputOperator(oper) {
  const { displayNumber, secondNumber, operator } = calculator;

  const input = parseFloat(displayNumber);

  if (secondNumber === null) {
    calculator.secondNumber = input;
  } else {
    const result = calculate(secondNumber, input, operator);
    calculator.displayNumber = String(result);
    calculator.secondNumber = result;
  }

  calculator.bool = true;
  calculator.operator = oper;
}

function calculate(firstNumber, secondNumber, operator) {
  if (operator === '+') {
    return firstNumber + secondNumber;
  } else if (operator === '-') {
    return firstNumber - secondNumber;
  } else if (operator === '*') {
    return firstNumber * secondNumber;
  } else if (operator === '/') {
    return firstNumber / secondNumber;
  }
  return secondNumber;
}

buttons.forEach((button) => {
  if (button.classList.contains('operator')) {
    button.addEventListener('click', function () {
      if (calculator.displayNumber === '0' || calculator.displayNumber === '') {
        display();
      } else {
        inputOperator(button.value);
        display();
      }
    });
  } else if (button.classList.contains('clear')) {
    button.addEventListener('click', function () {
      clear(button);
    });
  } else if (button.classList.contains('decimal')) {
    button.addEventListener('click', function () {
      inputDecimal(button.value);
      display();
    });
  } else {
    button.addEventListener('click', function () {
      inputNumber(button.value);
      display();
    });
  }
});
