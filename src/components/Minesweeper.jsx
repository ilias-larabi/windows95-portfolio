import React, { useState, useEffect } from 'react'
import './Minesweeper.css'
import { soundManager } from '../utils/sounds'

const Minesweeper = () => {
  const [board, setBoard] = useState([])
  const [gameStatus, setGameStatus] = useState('ready') // ready, playing, won, lost
  const [mineCount, setMineCount] = useState(10)
  const [flagCount, setFlagCount] = useState(0)
  const [time, setTime] = useState(0)
  
  const BOARD_SIZE = 9
  const TOTAL_MINES = 10

  useEffect(() => {
    initializeBoard()
  }, [])

  useEffect(() => {
    let timer
    if (gameStatus === 'playing') {
      timer = setInterval(() => {
        setTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [gameStatus])

  const initializeBoard = () => {
    const newBoard = []
    
    // Create empty board
    for (let i = 0; i < BOARD_SIZE; i++) {
      newBoard[i] = []
      for (let j = 0; j < BOARD_SIZE; j++) {
        newBoard[i][j] = {
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborCount: 0
        }
      }
    }

    // Place mines randomly
    let minesPlaced = 0
    while (minesPlaced < TOTAL_MINES) {
      const row = Math.floor(Math.random() * BOARD_SIZE)
      const col = Math.floor(Math.random() * BOARD_SIZE)
      
      if (!newBoard[row][col].isMine) {
        newBoard[row][col].isMine = true
        minesPlaced++
      }
    }

    // Calculate neighbor counts
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (!newBoard[i][j].isMine) {
          let count = 0
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              const ni = i + di
              const nj = j + dj
              if (ni >= 0 && ni < BOARD_SIZE && nj >= 0 && nj < BOARD_SIZE) {
                if (newBoard[ni][nj].isMine) count++
              }
            }
          }
          newBoard[i][j].neighborCount = count
        }
      }
    }

    setBoard(newBoard)
    setGameStatus('ready')
    setFlagCount(0)
    setTime(0)
  }

  const revealCell = (row, col) => {
    if (gameStatus === 'won' || gameStatus === 'lost') return
    if (board[row][col].isRevealed || board[row][col].isFlagged) return

    soundManager.playClick()
    
    const newBoard = [...board]
    
    if (newBoard[row][col].isMine) {
      // Game over
      setGameStatus('lost')
      soundManager.playError()
      // Reveal all mines
      for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
          if (newBoard[i][j].isMine) {
            newBoard[i][j].isRevealed = true
          }
        }
      }
    } else {
      // Reveal cell and neighbors if count is 0
      const toReveal = [[row, col]]
      
      while (toReveal.length > 0) {
        const [r, c] = toReveal.pop()
        
        if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE) continue
        if (newBoard[r][c].isRevealed || newBoard[r][c].isMine) continue
        
        newBoard[r][c].isRevealed = true
        
        if (newBoard[r][c].neighborCount === 0) {
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              toReveal.push([r + di, c + dj])
            }
          }
        }
      }
      
      setGameStatus('playing')
    }

    setBoard(newBoard)
    
    // Check for win condition
    let revealedCount = 0
    let flaggedCorrectly = 0
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (newBoard[i][j].isRevealed && !newBoard[i][j].isMine) {
          revealedCount++
        }
        if (newBoard[i][j].isFlagged && newBoard[i][j].isMine) {
          flaggedCorrectly++
        }
      }
    }
    
    setFlagCount(flaggedCorrectly)
    
    if (revealedCount === BOARD_SIZE * BOARD_SIZE - TOTAL_MINES) {
      setGameStatus('won')
      soundManager.playNavigate()
    }
  }

  const toggleFlag = (e, row, col) => {
    e.preventDefault()
    if (gameStatus === 'won' || gameStatus === 'lost') return
    if (board[row][col].isRevealed) return

    soundManager.playClick()
    
    const newBoard = [...board]
    newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged
    setBoard(newBoard)
    
    // Update flag count
    let newFlagCount = 0
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (newBoard[i][j].isFlagged) newFlagCount++
      }
    }
    setFlagCount(newFlagCount)
  }

  const getCellContent = (cell) => {
    if (cell.isFlagged) return '🚩'
    if (!cell.isRevealed) return ''
    if (cell.isMine) return '💣'
    if (cell.neighborCount > 0) return cell.neighborCount
    return ''
  }

  const getCellClass = (cell) => {
    let className = 'mine-cell'
    if (cell.isRevealed) {
      className += ' revealed'
      if (cell.isMine) className += ' mine'
      else if (cell.neighborCount > 0) className += ` number-${cell.neighborCount}`
    } else {
      className += ' hidden'
    }
    if (cell.isFlagged) className += ' flagged'
    return className
  }

  return (
    <div className="minesweeper">
      <div className="minesweeper-header">
        <div className="mine-counter">💣 {TOTAL_MINES - flagCount}</div>
        <button 
          className="reset-button"
          onClick={initializeBoard}
        >
          {gameStatus === 'won' ? '😎' : gameStatus === 'lost' ? '😵' : '🙂'}
        </button>
        <div className="timer">⏱️ {time}</div>
      </div>
      
      <div className="minesweeper-board">
        {board.map((row, i) => (
          <div key={i} className="mine-row">
            {row.map((cell, j) => (
              <button
                key={`${i}-${j}`}
                className={getCellClass(cell)}
                onClick={() => revealCell(i, j)}
                onContextMenu={(e) => toggleFlag(e, i, j)}
              >
                {getCellContent(cell)}
              </button>
            ))}
          </div>
        ))}
      </div>
      
      <div className="minesweeper-instructions">
        <p>Left-click to reveal a cell</p>
        <p>Right-click to place/remove a flag</p>
        <p>Find all mines without detonating any to win!</p>
      </div>
    </div>
  )
}

export default Minesweeper
