import React, { useState, useEffect } from 'react'
import './OregonTrail.css'

const OregonTrail = () => {
  const [gameState, setGameState] = useState('menu') // menu, playing, gameOver
  const [player, setPlayer] = useState({
    name: 'Ilias',
    health: 100,
    money: 200,
    food: 100,
    oxen: 2,
    wagon: { wheels: 4, axles: 2, tongues: 1 },
    distance: 0,
    day: 1
  })
  const [gameMessage, setGameMessage] = useState('Welcome to the Oregon Trail!')
  const [choices, setChoices] = useState([])

  const startGame = () => {
    setGameState('playing')
    setGameMessage('You are starting your journey on the Oregon Trail!')
    setChoices([
      { text: 'Continue on trail', action: continueTrail },
      { text: 'Check supplies', action: checkSupplies },
      { text: 'Hunt for food', action: huntFood }
    ])
  }

  const continueTrail = () => {
    const distanceTraveled = Math.floor(Math.random() * 20) + 10
    const foodConsumed = Math.floor(Math.random() * 5) + 2
    const healthLost = Math.floor(Math.random() * 10)
    
    setPlayer(prev => ({
      ...prev,
      distance: prev.distance + distanceTraveled,
      food: Math.max(0, prev.food - foodConsumed),
      health: Math.max(0, prev.health - healthLost),
      day: prev.day + 1
    }))
    
    if (player.health - healthLost <= 0) {
      setGameState('gameOver')
      setGameMessage('You have died on the trail. Game over!')
      setChoices([{ text: 'Play again', action: startGame }])
      return
    }
    
    if (player.food - foodConsumed <= 0) {
      setGameMessage(`You traveled ${distanceTraveled} miles. You're running out of food!`)
    } else {
      setGameMessage(`You traveled ${distanceTraveled} miles on day ${player.day + 1}.`)
    }
    
    // Random events
    if (Math.random() > 0.7) {
      const events = [
        'You found a river crossing!',
        'Bandits are approaching!',
        'A storm is coming!',
        'You discovered a trading post!',
        'Your wagon wheel broke!'
      ]
      
      const event = events[Math.floor(Math.random() * events.length)]
      setGameMessage(prev => prev + ` ${event}`)
    }
  }

  const checkSupplies = () => {
    setGameMessage(
      `Supplies:\n` +
      `Health: ${player.health}%\n` +
      `Money: $${player.money}\n` +
      `Food: ${player.food} lbs\n` +
      `Oxen: ${player.oxen}\n` +
      `Wagon parts: Wheels: ${player.wagon.wheels}, Axles: ${player.wagon.axles}, Tongues: ${player.wagon.tongues}`
    )
    
    setChoices([
      { text: 'Continue on trail', action: continueTrail },
      { text: 'Hunt for food', action: huntFood }
    ])
  }

  const huntFood = () => {
    const foodFound = Math.floor(Math.random() * 30) + 10
    const ammoUsed = Math.floor(Math.random() * 5) + 1
    
    setPlayer(prev => ({
      ...prev,
      food: prev.food + foodFound
    }))
    
    setGameMessage(`You went hunting and found ${foodFound} lbs of food!`)
    setChoices([
      { text: 'Continue on trail', action: continueTrail },
      { text: 'Check supplies', action: checkSupplies }
    ])
  }

  const resetGame = () => {
    setGameState('menu')
    setPlayer({
      name: 'Ilias',
      health: 100,
      money: 200,
      food: 100,
      oxen: 2,
      wagon: { wheels: 4, axles: 2, tongues: 1 },
      distance: 0,
      day: 1
    })
    setGameMessage('Welcome to the Oregon Trail!')
    setChoices([])
  }

  return (
    <div className="oregon-trail">
      <div className="game-toolbar">
        <div className="toolbar-section">
          <button className="toolbar-button" onClick={resetGame} title="Reset Game">🔄</button>
        </div>
        <div className="game-stats">
          <span>Day: {player.day}</span>
          <span>Distance: {player.distance} miles</span>
          <span>Health: {player.health}%</span>
        </div>
      </div>

      <div className="game-content">
        <div className="trail-map">
          <div className="map-background"></div>
          <div 
            className="player-position"
            style={{ left: `${Math.min(95, player.distance / 2)}%` }}
          >
            🐎
          </div>
        </div>
        
        <div className="game-message">
          <pre>{gameMessage}</pre>
        </div>
        
        <div className="game-choices">
          {choices.map((choice, index) => (
            <button 
              key={index}
              className="choice-button"
              onClick={choice.action}
            >
              {choice.text}
            </button>
          ))}
        </div>
      </div>

      <div className="game-statusbar">
        <div className="status-item">
          {gameState === 'menu' && 'Oregon Trail - Menu'}
          {gameState === 'playing' && 'Oregon Trail - Playing'}
          {gameState === 'gameOver' && 'Oregon Trail - Game Over'}
        </div>
      </div>
    </div>
  )
}

export default OregonTrail
