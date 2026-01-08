import React, { useState, useEffect } from 'react';
import './Calculator.css';
import ScientificCalculator from './ScientificCalculator';

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState([]);
  const [isScientific, setIsScientific] = useState(false);
  const [theme, setTheme] = useState('dark');

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

  const handlePercentage = () => {
    const value = parseFloat(display);
    if (!Number.isNaN(value)) {
      setDisplay(String(value / 100));
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
      const historyItem = `${previousValue} ${operation} ${inputValue} = ${result}`;

      setHistory(prev => [historyItem, ...prev].slice(0, 10)); // Keep last 10
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const playSound = () => {
    const audioPath = process.env.PUBLIC_URL + '/click.mp3';
    const audio = new Audio(audioPath);
    audio.play().catch(() => {
      // Fallback to Web Audio beep if audio file isn't available or autoplay is blocked
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.value = 600;
        g.gain.value = 0.02;
        o.connect(g);
        g.connect(ctx.destination);
        o.start();
        setTimeout(() => { o.stop(); ctx.close(); }, 80);
      } catch (e) {
        // ignore
      }
    });
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;

      if (key >= '0' && key <= '9') {
        handleNumber(parseInt(key, 10));
      } else if (key === '.') {
        handleDecimal();
      } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleOperation(key);
      } else if (key === 'Enter' || key === '=') {
        handleEquals();
      } else if (key === 'Escape') {
        handleClear();
      } else if (key === 'Backspace') {
        handleBackspace();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [display, previousValue, operation, waitingForOperand, handleNumber, handleDecimal, handleOperation, handleEquals, handleClear, handleBackspace]);

  return (
    <div className={`calculator-container ${theme}`}>
      <button onClick={() => { playSound(); toggleTheme(); }} className="theme-toggle">
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
      <div className="calculator">
        <div className="display">{display}</div>
        <div className="buttons">
<button onClick={() => { playSound(); handleClear(); }} className="btn clear">AC</button>
        <button onClick={() => { playSound(); handleBackspace(); }} className="btn">⌫</button>
        <button className="btn">+/-</button>
        <button onClick={() => { playSound(); handlePercentage(); }} className="btn">%</button>
        <button onClick={() => { playSound(); handleOperation('/'); }} className="btn operator">÷</button>
          
          {[7, 8, 9].map(num => (
            <button key={num} onClick={() => handleNumber(num)} className="btn">
              {num}
            </button>
          ))}
          <button onClick={() => { playSound(); handleOperation('*'); }} className="btn operator">×</button>
          
          {[4, 5, 6].map(num => (
            <button key={num} onClick={() => handleNumber(num)} className="btn">
              {num}
            </button>
          ))}
          <button onClick={() => { playSound(); handleOperation('-'); }} className="btn operator">-</button>
          
          {[1, 2, 3].map(num => (
            <button key={num} onClick={() => handleNumber(num)} className="btn">
              {num}
            </button>
          ))}
        <button onClick={() => { playSound(); handleOperation('+'); }} className="btn operator">+</button>
        
        <button onClick={() => { playSound(); handleNumber(0); }} className="btn zero">0</button>
        <button onClick={() => { playSound(); handleDecimal(); }} className="btn">.</button>
        <button onClick={() => { playSound(); handleEquals(); }} className="btn equals">=</button>
        <button onClick={() => { playSound(); setIsScientific(!isScientific); }} className="btn mode-toggle">
          {isScientific ? 'Basic' : 'Scientific'}
        </button>
        </div>
        {isScientific && <ScientificCalculator display={display} setDisplay={setDisplay} playSound={playSound} />}
      </div>
      {history.length > 0 && (
        <div className="history">
          <h3>History</h3>
          {history.map((item, index) => (
            <div key={index} className="history-item">{item}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Calculator;