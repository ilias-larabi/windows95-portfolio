import React, { useState, useEffect } from 'react'
import './Scrabble.css'

const Scrabble = () => {
  const [gameState, setGameState] = useState('menu') // menu, playing, gameOver
  const [playerScore, setPlayerScore] = useState(0)
  const [computerScore, setComputerScore] = useState(0)
  const [playerTiles, setPlayerTiles] = useState([])
  const [board, setBoard] = useState([])
  const [selectedTile, setSelectedTile] = useState(null)
  const [gameMessage, setGameMessage] = useState('Welcome to Scrabble!')

  // Initialize game board
  useEffect(() => {
    initializeBoard()
    drawTiles()
  }, [])

  const initializeBoard = () => {
    const newBoard = []
    for (let i = 0; i < 15; i++) {
      newBoard[i] = []
      for (let j = 0; j < 15; j++) {
        newBoard[i][j] = { letter: '', multiplier: getMultiplier(i, j) }
      }
    }
    setBoard(newBoard)
  }

  const getMultiplier = (row, col) => {
    // Classic Scrabble board multipliers
    const tripleWord = [[0,0], [0,7], [0,14], [7,0], [7,14], [14,0], [14,7], [14,14]]
    const doubleWord = [[1,1], [2,2], [3,3], [4,4], [1,13], [2,12], [3,11], [4,10], 
                        [10,4], [11,3], [12,2], [13,1], [10,10], [11,11], [12,12], [13,13]]
    const tripleLetter = [[1,5], [1,9], [5,1], [5,5], [5,9], [5,13], [9,1], [9,5], 
                         [9,9], [9,13], [13,5], [13,9]]
    const doubleLetter = [[0,3], [0,11], [2,6], [2,8], [3,0], [3,7], [3,14], [6,2], 
                         [6,6], [6,8], [6,12], [7,3], [7,11], [8,2], [8,6], [8,8], 
                         [8,12], [11,0], [11,7], [11,14], [12,6], [12,8], [14,3], [14,11]]

    if (tripleWord.some(pos => pos[0] === row && pos[1] === col)) return '3W'
    if (doubleWord.some(pos => pos[0] === row && pos[1] === col)) return '2W'
    if (tripleLetter.some(pos => pos[0] === row && pos[1] === col)) return '3L'
    if (doubleLetter.some(pos => pos[0] === row && pos[1] === col)) return '2L'
    return ''
  }

  const drawTiles = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const vowels = 'AEIOU'
    const newTiles = []
    
    // Draw 7 tiles with a mix of vowels and consonants
    for (let i = 0; i < 7; i++) {
      if (i < 2) {
        // Ensure at least 2 vowels
        const vowel = vowels[Math.floor(Math.random() * vowels.length)]
        newTiles.push({ letter: vowel, id: Math.random() })
      } else {
        const letter = letters[Math.floor(Math.random() * letters.length)]
        newTiles.push({ letter, id: Math.random() })
      }
    }
    
    setPlayerTiles(newTiles)
  }

  const placeTile = (row, col) => {
    if (selectedTile === null || board[row][col].letter !== '') return
    
    const newBoard = [...board]
    newBoard[row][col] = { ...newBoard[row][col], letter: playerTiles[selectedTile].letter }
    setBoard(newBoard)
    
    // Remove the placed tile
    const newTiles = [...playerTiles]
    newTiles.splice(selectedTile, 1)
    setPlayerTiles(newTiles)
    
    setSelectedTile(null)
    setGameMessage(`Placed ${playerTiles[selectedTile].letter} at position (${row}, ${col})`)
    
    // Add points
    const points = getLetterPoints(playerTiles[selectedTile].letter)
    setPlayerScore(prev => prev + points)
  }

  const getLetterPoints = (letter) => {
    const points = {
      'A': 1, 'B': 3, 'C': 3, 'D': 2, 'E': 1, 'F': 4, 'G': 2, 'H': 4, 'I': 1,
      'J': 8, 'K': 5, 'L': 1, 'M': 3, 'N': 1, 'O': 1, 'P': 3, 'Q': 10, 'R': 1,
      'S': 1, 'T': 1, 'U': 1, 'V': 4, 'W': 4, 'X': 8, 'Y': 4, 'Z': 10
    }
    return points[letter] || 0
  }

  const resetGame = () => {
    setGameState('menu')
    setPlayerScore(0)
    setComputerScore(0)
    setGameMessage('Welcome to Scrabble!')
    setSelectedTile(null)
    initializeBoard()
    drawTiles()
  }

  const startGame = () => {
    setGameState('playing')
    setGameMessage('Game started! Place your tiles on the board.')
  }

  return (
    <div className="scrabble">
      <div className="game-toolbar">
        <div className="toolbar-section">
          <button className="toolbar-button" onClick={resetGame} title="New Game">🔄</button>
        </div>
        <div className="game-stats">
          <span>Player: {playerScore}</span>
          <span>Computer: {computerScore}</span>
        </div>
      </div>

      <div className="game-content">
        {gameState === 'menu' && (
          <div className="menu-screen">
            <h2>Scrabble</h2>
            <p>A classic word game for your portfolio</p>
            <button className="start-button" onClick={startGame}>Start Game</button>
          </div>
        )}

        {gameState === 'playing' && (
          <>
            <div className="scrabble-board">
              {board.map((row, rowIndex) => (
                <div key={rowIndex} className="board-row">
                  {row.map((cell, colIndex) => (
                    <div
                      key={colIndex}
                      className={`board-cell ${cell.multiplier} ${cell.letter ? 'filled' : ''}`}
                      onClick={() => placeTile(rowIndex, colIndex)}
                    >
                      {cell.letter || cell.multiplier}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="player-rack">
              <h3>Your Tiles</h3>
              <div className="tiles-container">
                {playerTiles.map((tile, index) => (
                  <div
                    key={tile.id}
                    className={`tile ${selectedTile === index ? 'selected' : ''}`}
                    onClick={() => setSelectedTile(index)}
                  >
                    {tile.letter}
                  </div>
                ))}
              </div>
            </div>

            <div className="game-message">
              <p>{gameMessage}</p>
            </div>
          </>
        )}
      </div>

      <div className="game-statusbar">
        <div className="status-item">
          {gameState === 'menu' ? 'Scrabble - Menu' : 'Scrabble - Playing'}
        </div>
      </div>
    </div>
  )
}

export default Scrabble
