import React, { useState } from 'react'
import { soundManager } from '../utils/sounds'
import './Calculator.css'

const Calculator = () => {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num) => {
    soundManager.playClick()
    
    if (waitingForOperand) {
      setDisplay(String(num))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const inputDecimal = () => {
    soundManager.playClick()
    
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    soundManager.playClick()
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const performOperation = (nextOperation) => {
    soundManager.playClick()
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '*':
        return firstValue * secondValue
      case '/':
        return firstValue / secondValue
      case '=':
        return secondValue
      default:
        return secondValue
    }
  }

  const handleEquals = () => {
    soundManager.playClick()
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const buttons = [
    { label: 'C', action: clear, className: 'function' },
    { label: '±', action: () => {}, className: 'function', disabled: true },
    { label: '%', action: () => {}, className: 'function', disabled: true },
    { label: '/', action: () => performOperation('/'), className: 'operator' },
    
    { label: '7', action: () => inputNumber(7), className: 'number' },
    { label: '8', action: () => inputNumber(8), className: 'number' },
    { label: '9', action: () => inputNumber(9), className: 'number' },
    { label: '*', action: () => performOperation('*'), className: 'operator' },
    
    { label: '4', action: () => inputNumber(4), className: 'number' },
    { label: '5', action: () => inputNumber(5), className: 'number' },
    { label: '6', action: () => inputNumber(6), className: 'number' },
    { label: '-', action: () => performOperation('-'), className: 'operator' },
    
    { label: '1', action: () => inputNumber(1), className: 'number' },
    { label: '2', action: () => inputNumber(2), className: 'number' },
    { label: '3', action: () => inputNumber(3), className: 'number' },
    { label: '+', action: () => performOperation('+'), className: 'operator' },
    
    { label: '0', action: () => inputNumber(0), className: 'number zero' },
    { label: '.', action: inputDecimal, className: 'number' },
    { label: '=', action: handleEquals, className: 'operator equals' }
  ]

  return (
    <div className="calculator">
      <div className="calculator-menubar">
        <span className="menu-item">Edit</span>
        <span className="menu-item">View</span>
        <span className="menu-item">Help</span>
      </div>
      
      <div className="calculator-display">
        <input 
          type="text" 
          value={display} 
          readOnly 
          className="display-input"
        />
      </div>
      
      <div className="calculator-buttons">
        {buttons.map((button, index) => (
          <button
            key={index}
            className={`calc-button ${button.className} ${button.disabled ? 'disabled' : ''}`}
            onClick={button.action}
            disabled={button.disabled}
          >
            {button.label}
          </button>
        ))}
      </div>
      
      <div className="calculator-statusbar">
        <div className="status-item">Ready</div>
      </div>
    </div>
  )
}

export default Calculator
