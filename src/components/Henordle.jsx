import React, { useState, useEffect } from 'react'
import './Henordle.css'

const Henordle = () => {
  // Word list for the game
  const wordList = [
    'REACT', 'VUEJS', 'ANGULAR', 'NODEJS', 'PYTHON', 
    'DJANGO', 'FLASK', 'JAVA', 'JAVASCRIPT', 'HTML',
    'CSS', 'MYSQL', 'POSTGRESQL', 'MONGODB', 'FIREBASE',
    'DOCKER', 'GITHUB', 'WEBPACK', 'BABEL', 'TYPESCRIPT',
    'LARABI', 'WINDOW', 'PORTFOLIO', 'DEVELOPER', 'CODING',
    'SOFTWARE', 'ENGINEER', 'FULLSTACK', 'FRONTEND', 'BACKEND'
  ]

  const [targetWord, setTargetWord] = useState('')
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([])
  const [gameStatus, setGameStatus] = useState('playing') // playing, won, lost
  const [message, setMessage] = useState('Guess the 5-letter word!')
  const [attempts, setAttempts] = useState(0)

  // Initialize game
  useEffect(() => {
    startNewGame()
  }, [])

  const startNewGame = () => {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)]
    setTargetWord(randomWord)
    setCurrentGuess('')
    setGuesses([])
    setGameStatus('playing')
    setMessage('Guess the 5-letter word!')
    setAttempts(0)
  }

  const handleKeyPress = (key) => {
    if (gameStatus !== 'playing') return
    
    if (key === 'ENTER') {
      submitGuess()
    } else if (key === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1))
    } else if (currentGuess.length < 5 && /^[A-Z]$/.test(key)) {
      setCurrentGuess(prev => prev + key)
    }
  }

  const submitGuess = () => {
    if (currentGuess.length !== 5) {
      setMessage('Word must be 5 letters long!')
      return
    }

    const newAttempts = attempts + 1
    setAttempts(newAttempts)

    // Check if guess is correct
    if (currentGuess === targetWord) {
      setGameStatus('won')
      setMessage(`Congratulations! You guessed "${targetWord}" in ${newAttempts} attempts!`)
      return
    }

    // Check if max attempts reached
    if (newAttempts >= 6) {
      setGameStatus('lost')
      setMessage(`Game over! The word was "${targetWord}".`)
      return
    }

    // Add guess to history
    const guessResult = checkGuess(currentGuess)
    setGuesses(prev => [...prev, { word: currentGuess, result: guessResult }])
    setCurrentGuess('')
    setMessage('Keep guessing!')
  }

  const checkGuess = (guess) => {
    const result = []
    const targetLetters = targetWord.split('')
    const guessLetters = guess.split('')

    // First pass: check for correct positions
    for (let i = 0; i < 5; i++) {
      if (guessLetters[i] === targetLetters[i]) {
        result.push('correct')
        targetLetters[i] = null // Mark as used
      } else {
        result.push(null)
      }
    }

    // Second pass: check for present letters
    for (let i = 0; i < 5; i++) {
      if (result[i] !== 'correct') {
        const index = targetLetters.indexOf(guessLetters[i])
        if (index !== -1) {
          result[i] = 'present'
          targetLetters[index] = null // Mark as used
        } else {
          result[i] = 'absent'
        }
      }
    }

    return result
  }

  // Handle physical keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameStatus !== 'playing') return
      
      if (e.key === 'Enter') {
        submitGuess()
      } else if (e.key === 'Backspace') {
        setCurrentGuess(prev => prev.slice(0, -1))
      } else if (/^[a-zA-Z]$/.test(e.key) && currentGuess.length < 5) {
        setCurrentGuess(prev => prev + e.key.toUpperCase())
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentGuess, gameStatus, targetWord, attempts])

  return (
    <div className="henordle">
      <div className="game-toolbar">
        <div className="toolbar-section">
          <button className="toolbar-button" onClick={startNewGame} title="New Game">🔄</button>
        </div>
        <div className="game-stats">
          <span>Attempts: {attempts}/6</span>
        </div>
      </div>

      <div className="game-content">
        <div className="game-message">
          <p>{message}</p>
        </div>

        <div className="game-board">
          {/* Display previous guesses */}
          {guesses.map((guess, rowIndex) => (
            <div key={rowIndex} className="word-row">
              {guess.word.split('').map((letter, letterIndex) => (
                <div 
                  key={letterIndex} 
                  className={`letter-cell ${guess.result[letterIndex]}`}
                >
                  {letter}
                </div>
              ))}
            </div>
          ))}

          {/* Display current guess */}
          {gameStatus === 'playing' && (
            <div className="word-row">
              {currentGuess.split('').map((letter, index) => (
                <div key={index} className="letter-cell filled">
                  {letter}
                </div>
              ))}
              {/* Fill empty cells */}
              {Array.from({ length: 5 - currentGuess.length }).map((_, index) => (
                <div key={currentGuess.length + index} className="letter-cell"></div>
              ))}
            </div>
          )}

          {/* Display empty rows */}
          {Array.from({ length: 6 - guesses.length - (gameStatus === 'playing' ? 1 : 0) }).map((_, index) => (
            <div key={guesses.length + (gameStatus === 'playing' ? 1 : 0) + index} className="word-row">
              {Array.from({ length: 5 }).map((_, letterIndex) => (
                <div key={letterIndex} className="letter-cell"></div>
              ))}
            </div>
          ))}
        </div>

        {/* Virtual keyboard */}
        <div className="virtual-keyboard">
          <div className="keyboard-row">
            {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(letter => (
              <button 
                key={letter}
                className="keyboard-button"
                onClick={() => handleKeyPress(letter)}
              >
                {letter}
              </button>
            ))}
          </div>
          <div className="keyboard-row">
            {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(letter => (
              <button 
                key={letter}
                className="keyboard-button"
                onClick={() => handleKeyPress(letter)}
              >
                {letter}
              </button>
            ))}
          </div>
          <div className="keyboard-row">
            <button 
              className="keyboard-button wide"
              onClick={() => handleKeyPress('ENTER')}
            >
              ENTER
            </button>
            {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map(letter => (
              <button 
                key={letter}
                className="keyboard-button"
                onClick={() => handleKeyPress(letter)}
              >
                {letter}
              </button>
            ))}
            <button 
              className="keyboard-button wide"
              onClick={() => handleKeyPress('BACKSPACE')}
            >
              ⌫
            </button>
          </div>
        </div>
      </div>

      <div className="game-statusbar">
        <div className="status-item">
          {gameStatus === 'playing' ? 'Henordle - Playing' : 
           gameStatus === 'won' ? 'Henordle - You Won!' : 
           'Henordle - Game Over'}
        </div>
      </div>
    </div>
  )
}

export default Henordle
