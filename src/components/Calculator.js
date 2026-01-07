import React, { useState } from 'react';
import './Calculator.css';

function Calculator() {
  const [display, setDisplay] = useState('0');

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        <button className="btn">Test</button>
      </div>
    </div>
  );
}

export default Calculator;  // ✅ MAKE SURE THIS LINE EXISTS!