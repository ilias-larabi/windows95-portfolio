import React, { useState, useEffect, useRef } from 'react'
import './Doom.css'

const Doom = () => {
  const canvasRef = useRef(null)
  const [gameState, setGameState] = useState('menu') // menu, playing, paused
  const [score, setScore] = useState(0)
  const [health, setHealth] = useState(100)
  const [ammo, setAmmo] = useState(50)
  const [keys, setKeys] = useState({})

  // Initialize game
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Set canvas size
    canvas.width = 800
    canvas.height = 500
    
    // Draw initial screen
    drawMenu(ctx, canvas.width, canvas.height)
    
    // Handle keyboard input
    const handleKeyDown = (e) => {
      setKeys(prev => ({ ...prev, [e.key]: true }))
    }
    
    const handleKeyUp = (e) => {
      setKeys(prev => ({ ...prev, [e.key]: false }))
    }
    
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [gameState])

  const drawMenu = (ctx, width, height) => {
    // Clear canvas
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, width, height)
    
    // Draw title
    ctx.fillStyle = '#c00'
    ctx.font = 'bold 48px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('DOOM', width/2, height/2 - 50)
    
    // Draw subtitle
    ctx.fillStyle = '#fff'
    ctx.font = '24px Arial'
    ctx.fillText('Press SPACE to start', width/2, height/2 + 20)
    
    // Draw credits
    ctx.font = '16px Arial'
    ctx.fillText('Retro Portfolio Edition', width/2, height - 40)
  }

  const drawGame = (ctx, width, height) => {
    // Clear canvas
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, width, height)
    
    // Draw sky
    ctx.fillStyle = '#444'
    ctx.fillRect(0, 0, width, height/2)
    
    // Draw ground
    ctx.fillStyle = '#888'
    ctx.fillRect(0, height/2, width, height/2)
    
    // Draw some walls/obstacles
    ctx.fillStyle = '#c44'
    ctx.fillRect(100, 100, 50, 200)
    ctx.fillRect(300, 150, 50, 150)
    ctx.fillRect(500, 80, 50, 220)
    
    // Draw enemies
    ctx.fillStyle = '#4c4'
    ctx.fillRect(200, 300, 30, 30)
    ctx.fillRect(400, 250, 30, 30)
    ctx.fillRect(600, 320, 30, 30)
    
    // Draw player
    ctx.fillStyle = '#44c'
    ctx.fillRect(width/2 - 15, height/2 - 15, 30, 30)
    
    // Draw HUD
    ctx.fillStyle = '#000'
    ctx.fillRect(0, height - 60, width, 60)
    
    ctx.fillStyle = '#fff'
    ctx.font = '16px Arial'
    ctx.textAlign = 'left'
    ctx.fillText(`Score: ${score}`, 20, height - 40)
    ctx.fillText(`Health: ${health}%`, 150, height - 40)
    ctx.fillText(`Ammo: ${ammo}`, 300, height - 40)
  }

  const startGame = () => {
    setGameState('playing')
    setScore(0)
    setHealth(100)
    setAmmo(50)
  }

  const pauseGame = () => {
    setGameState(gameState === 'paused' ? 'playing' : 'paused')
  }

  const handleCanvasClick = () => {
    if (gameState === 'menu') {
      startGame()
    } else if (gameState === 'playing') {
      // Shoot
      setAmmo(prev => Math.max(0, prev - 1))
      setScore(prev => prev + 10)
      
      // Random chance to hit enemy
      if (Math.random() > 0.7) {
        setScore(prev => prev + 100)
      }
      
      // Random chance to take damage
      if (Math.random() > 0.9) {
        setHealth(prev => Math.max(0, prev - 10))
      }
      
      // Check for game over
      if (health <= 0) {
        setGameState('menu')
      }
    }
  }

  return (
    <div className="doom">
      <div className="game-toolbar">
        <div className="toolbar-section">
          <button className="toolbar-button" onClick={startGame} title="New Game">🔄</button>
          <button className="toolbar-button" onClick={pauseGame} title="Pause">⏸</button>
        </div>
        <div className="game-stats">
          <span>Score: {score}</span>
          <span>Health: {health}%</span>
          <span>Ammo: {ammo}</span>
        </div>
      </div>

      <div className="game-content">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="doom-canvas"
        />
      </div>

      <div className="game-statusbar">
        <div className="status-item">
          {gameState === 'menu' && 'DOOM - Menu'}
          {gameState === 'playing' && 'DOOM - Playing'}
          {gameState === 'paused' && 'DOOM - Paused'}
        </div>
      </div>
    </div>
  )
}

export default Doom
