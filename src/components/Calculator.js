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

  const normalizeOp = (op) => {
    if (op === '×' || op === 'x' || op === 'X') return '*';
    if (op === '÷') return '/';
    if (op === '−' || op === '—' || op === '–') return '-';
    return op;
  };

  const handleOperation = (nextOperation) => {
    const op = normalizeOp(nextOperation);
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const result = calculate(previousValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);
    setOperation(op);
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }

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

  const handleToggleSign = () => {
    const value = parseFloat(display);
    if (!Number.isNaN(value)) {
      setDisplay(String(value * -1));
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

      setHistory(prev => [historyItem, ...prev].slice(0, 10));
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
      } else if (
        key === '+' || key === '-' || key === '*' || key === '/' || key === 'x' || key === 'X' || key === '×' || key === '−'
      ) {
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
  }, [display, previousValue, operation, waitingForOperand]);

  return (
    <div className={`calculator-container ${theme}`}>
      <button onClick={() => { playSound(); toggleTheme(); }} className="theme-toggle">
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
      
      <div className="calculator">
        <div className="display-section">
          <div className="expression">
            {previousValue !== null && operation ? `${previousValue} ${operation === '*' ? '×' : operation === '/' ? '÷' : operation === '-' ? '−' : operation}` : ''}
          </div>
          <div className="display">{display}</div>
        </div>

        <div className="buttons">
          <button onClick={() => { playSound(); handleClear(); }} className="btn function">AC</button>
          <button onClick={() => { playSound(); handleBackspace(); }} className="btn function">⌫</button>
          <button onClick={() => { playSound(); handleToggleSign(); }} className="btn function">+/-</button>
          <button onClick={() => { playSound(); handleOperation('/'); }} className="btn operator">÷</button>
          
          <button onClick={() => { playSound(); handleNumber(7); }} className="btn number">7</button>
          <button onClick={() => { playSound(); handleNumber(8); }} className="btn number">8</button>
          <button onClick={() => { playSound(); handleNumber(9); }} className="btn number">9</button>
          <button onClick={() => { playSound(); handleOperation('*'); }} className="btn operator">×</button>
          
          <button onClick={() => { playSound(); handleNumber(4); }} className="btn number">4</button>
          <button onClick={() => { playSound(); handleNumber(5); }} className="btn number">5</button>
          <button onClick={() => { playSound(); handleNumber(6); }} className="btn number">6</button>
          <button onClick={() => { playSound(); handleOperation('-'); }} className="btn operator">−</button>
          
          <button onClick={() => { playSound(); handleNumber(1); }} className="btn number">1</button>
          <button onClick={() => { playSound(); handleNumber(2); }} className="btn number">2</button>
          <button onClick={() => { playSound(); handleNumber(3); }} className="btn number">3</button>
          <button onClick={() => { playSound(); handleOperation('+'); }} className="btn operator">+</button>
          
          <button onClick={() => { playSound(); handlePercentage(); }} className="btn function">%</button>
          <button onClick={() => { playSound(); handleNumber(0); }} className="btn number">0</button>
          <button onClick={() => { playSound(); handleDecimal(); }} className="btn number">.</button>
          <button onClick={() => { playSound(); handleEquals(); }} className="btn equals">=</button>
        </div>

        <button onClick={() => { playSound(); setIsScientific(!isScientific); }} className="mode-toggle">
          <span className="mode-icon">{isScientific ? '📐' : '🔬'}</span>
          {isScientific ? 'Basic Mode' : 'Scientific Mode'}
        </button>

        {isScientific && <ScientificCalculator display={display} setDisplay={setDisplay} playSound={playSound} />}
      </div>

      {history.length > 0 && (
        <div className="history">
          <div className="history-header">
            <h3>History</h3>
            <button onClick={() => setHistory([])} className="clear-history">Clear</button>
          </div>
          <div className="history-list">
            {history.map((item, index) => (
              <div key={index} className="history-item">
                <span className="history-number">{index + 1}</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Calculator;