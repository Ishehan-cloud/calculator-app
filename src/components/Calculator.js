import React, { useState } from 'react';
import './Calculator.css';

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(num.toString());
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num.toString() : display + num);
    }
  };

  const handleOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const result = calculate(previousValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const handleDecimal = () => {
    // If we're waiting for the next operand, start fresh with "0."
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }

    // Prevent multiple decimals in the current number
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const result = calculate(previousValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        <button className="btn clear">AC</button>
        <button className="btn">+/-</button>
        <button className="btn">%</button>
        <button onClick={() => handleOperation('/')} className="btn operator">÷</button>
        
        {[7, 8, 9].map(num => (
          <button key={num} onClick={() => handleNumber(num)} className="btn">
            {num}
          </button>
        ))}
        <button onClick={() => handleOperation('*')} className="btn operator">×</button>
        
        {[4, 5, 6].map(num => (
          <button key={num} onClick={() => handleNumber(num)} className="btn">
            {num}
          </button>
        ))}
        <button onClick={() => handleOperation('-')} className="btn operator">-</button>
        
        {[1, 2, 3].map(num => (
          <button key={num} onClick={() => handleNumber(num)} className="btn">
            {num}
          </button>
        ))}
        <button onClick={() => handleOperation('+')} className="btn operator">+</button>
        
        <button onClick={() => handleNumber(0)} className="btn zero">0</button>
        <button onClick={handleDecimal} className="btn">.</button>
        <button onClick={handleEquals} className="btn equals">=</button>
      </div>
    </div>
  );
}

export default Calculator;