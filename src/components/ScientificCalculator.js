import React from 'react';
import './Calculator.css';

function ScientificCalculator({ display, setDisplay, playSound }) {
  const handleScientific = (func) => {
    const value = parseFloat(display);
    let result;

    switch (func) {
      case 'sin':
        result = Math.sin((value * Math.PI) / 180);
        break;
      case 'cos':
        result = Math.cos((value * Math.PI) / 180);
        break;
      case 'tan':
        result = Math.tan((value * Math.PI) / 180);
        break;
      case 'sqrt':
        result = Math.sqrt(value);
        break;
      case 'square':
        result = value * value;
        break;
      case 'log':
        result = Math.log10(value);
        break;
      case 'ln':
        result = Math.log(value);
        break;
      default:
        result = value;
    }

    setDisplay(String(result));
  };

  return (
    <div className="scientific-buttons">
      <button onClick={() => { playSound?.(); handleScientific('sin'); }} className="btn sci">sin</button>
      <button onClick={() => { playSound?.(); handleScientific('cos'); }} className="btn sci">cos</button>
      <button onClick={() => { playSound?.(); handleScientific('tan'); }} className="btn sci">tan</button>
      <button onClick={() => { playSound?.(); handleScientific('sqrt'); }} className="btn sci">√</button>
      <button onClick={() => { playSound?.(); handleScientific('square'); }} className="btn sci">x²</button>
      <button onClick={() => { playSound?.(); handleScientific('log'); }} className="btn sci">log</button>
      <button onClick={() => { playSound?.(); handleScientific('ln'); }} className="btn sci">ln</button>
      <button onClick={() => { playSound?.(); setDisplay(String(Math.PI)); }} className="btn sci">π</button>
    </div>
  );
}

export default ScientificCalculator;
