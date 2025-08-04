import React, { useState } from 'react'
import Minesweeper from './Minesweeper'
import Solitaire from './Solitaire'
import Doom from './Doom'
import OregonTrail from './OregonTrail'
import Scrabble from './Scrabble'
import Henordle from './Henordle'
import './Games.css'

const Games = () => {
  const [selectedGame, setSelectedGame] = useState('minesweeper')
  const [minesweeperBoard, setMinesweeperBoard] = useState([])
  const [gameStatus, setGameStatus] = useState('ready') // ready, playing, won, lost
  const [mineCount, setMineCount] = useState(10)
  const [flagCount, setFlagCount] = useState(0)

  const BOARD_SIZE = 9
  const MINE_COUNT = 10

  useEffect(() => {
    initializeMinesweeper()
  }, [])

  const initializeMinesweeper = () => {
    const board = []
    
    // Create empty board
    for (let i = 0; i < BOARD_SIZE; i++) {
      board[i] = []
      for (let j = 0; j < BOARD_SIZE; j++) {
        board[i][j] = {
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborCount: 0
        }
      }
    }

    // Place mines randomly
    let minesPlaced = 0
    while (minesPlaced < MINE_COUNT) {
      const row = Math.floor(Math.random() * BOARD_SIZE)
      const col = Math.floor(Math.random() * BOARD_SIZE)
      
      if (!board[row][col].isMine) {
        board[row][col].isMine = true
        minesPlaced++
      }
    }

    // Calculate neighbor counts
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (!board[i][j].isMine) {
          let count = 0
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              const ni = i + di
              const nj = j + dj
              if (ni >= 0 && ni < BOARD_SIZE && nj >= 0 && nj < BOARD_SIZE) {
                if (board[ni][nj].isMine) count++
              }
            }
          }
          board[i][j].neighborCount = count
        }
      }
    }

    setMinesweeperBoard(board)
    setGameStatus('ready')
    setFlagCount(0)
  }

  const revealCell = (row, col) => {
    if (gameStatus === 'won' || gameStatus === 'lost') return
    if (minesweeperBoard[row][col].isRevealed || minesweeperBoard[row][col].isFlagged) return

    soundManager.playClick()
    
    const newBoard = [...minesweeperBoard]
    
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

    setMinesweeperBoard(newBoard)
    
    // Check for win condition
    let revealedCount = 0
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (newBoard[i][j].isRevealed && !newBoard[i][j].isMine) {
          revealedCount++
        }
      }
    }
    
    if (revealedCount === BOARD_SIZE * BOARD_SIZE - MINE_COUNT) {
      setGameStatus('won')
      soundManager.playNavigate()
    }
  }

  const toggleFlag = (e, row, col) => {
    e.preventDefault()
    if (gameStatus === 'won' || gameStatus === 'lost') return
    if (minesweeperBoard[row][col].isRevealed) return

    soundManager.playClick()
    
    const newBoard = [...minesweeperBoard]
    newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged
    
    setFlagCount(prev => newBoard[row][col].isFlagged ? prev + 1 : prev - 1)
    setMinesweeperBoard(newBoard)
  }

  const getCellContent = (cell) => {
    if (cell.isFlagged) return '🚩'
    if (!cell.isRevealed) return ''
    if (cell.isMine) return '💣'
    if (cell.neighborCount === 0) return ''
    return cell.neighborCount
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
    <div className="games">
      <div className="games-menubar">
        <span className="menu-item">Game</span>
        <span className="menu-item">Help</span>
      </div>
      
      <div className="games-toolbar">
        <button 
          className={`game-tab ${selectedGame === 'minesweeper' ? 'active' : ''}`}
          onClick={() => setSelectedGame('minesweeper')}
        >
          💣 Minesweeper
        </button>
        <button 
          className={`game-tab ${selectedGame === 'solitaire' ? 'active' : ''}`}
          onClick={() => setSelectedGame('solitaire')}
        >
          🃏 Solitaire
        </button>
        <button 
          className={`game-tab ${selectedGame === 'doom' ? 'active' : ''}`}
          onClick={() => setSelectedGame('doom')}
        >
          👹 Doom
        </button>
        <button 
          className={`game-tab ${selectedGame === 'oregontrail' ? 'active' : ''}`}
          onClick={() => setSelectedGame('oregontrail')}
        >
          🐎 Oregon Trail
        </button>
        <button 
          className={`game-tab ${selectedGame === 'scrabble' ? 'active' : ''}`}
          onClick={() => setSelectedGame('scrabble')}
        >
          🆎 Scrabble
        </button>
        <button 
          className={`game-tab ${selectedGame === 'henordle' ? 'active' : ''}`}
          onClick={() => setSelectedGame('henordle')}
        >
          🟩 Henordle
        </button>
      </div>

      <div className="games-content">
        {selectedGame === 'minesweeper' && (
          <div className="minesweeper">
            <div className="minesweeper-header">
              <div className="mine-counter">💣 {MINE_COUNT - flagCount}</div>
              <button 
                className="reset-button"
                onClick={initializeMinesweeper}
              >
                {gameStatus === 'won' ? '😎' : gameStatus === 'lost' ? '😵' : '🙂'}
              </button>
              <div className="status-display">
                {gameStatus === 'won' && 'You Won! 🎉'}
                {gameStatus === 'lost' && 'Game Over 💥'}
                {gameStatus === 'playing' && 'Playing...'}
                {gameStatus === 'ready' && 'Ready'}
              </div>
            </div>
            
            <div className="minesweeper-board">
              {minesweeperBoard.map((row, i) => (
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
          </div>
        )}

        {selectedGame === 'solitaire' && (
          <Solitaire />
        )}
        
        {selectedGame === 'doom' && (
          <Doom />
        )}
        
        {selectedGame === 'oregontrail' && (
          <OregonTrail />
        )}
        
        {selectedGame === 'scrabble' && (
          <Scrabble />
        )}
        
        {selectedGame === 'henordle' && (
          <Henordle />
        )}
      </div>

      <div className="games-statusbar">
        <div className="status-item">
          {selectedGame === 'minesweeper' ? 'Minesweeper' : 
           selectedGame === 'solitaire' ? 'Solitaire' : 
           selectedGame === 'doom' ? 'Doom' : 
           selectedGame === 'oregontrail' ? 'Oregon Trail' : 
           selectedGame === 'scrabble' ? 'Scrabble' : 
           'Henordle'}
        </div>
        <div className="status-item">Ready</div>
      </div>
    </div>
  )
}

export default Games
