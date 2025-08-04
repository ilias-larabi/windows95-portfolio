import React, { useState, useEffect } from 'react'
import './Solitaire.css'

const Solitaire = () => {
  const [gameState, setGameState] = useState({
    stock: [],
    waste: [],
    foundations: [[], [], [], []],
    tableau: [[], [], [], [], [], [], []]
  })
  const [selectedCard, setSelectedCard] = useState(null)
  const [gameStats, setGameStats] = useState({ moves: 0, score: 0 })

  // Initialize game
  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    // Create a deck of cards
    const suits = ['♠', '♥', '♦', '♣']
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
    let deck = []
    
    for (let suit of suits) {
      for (let rank of ranks) {
        deck.push({
          id: `${rank}-${suit}`,
          rank,
          suit,
          color: (suit === '♥' || suit === '♦') ? 'red' : 'black',
          faceUp: false
        })
      }
    }
    
    // Shuffle deck
    deck = shuffleDeck(deck)
    
    // Deal cards to tableau
    const tableau = [[], [], [], [], [], [], []]
    let cardIndex = 0
    
    for (let i = 0; i < 7; i++) {
      for (let j = i; j < 7; j++) {
        const card = deck[cardIndex]
        if (i === j) {
          card.faceUp = true
        }
        tableau[j].push(card)
        cardIndex++
      }
    }
    
    // Remaining cards go to stock
    const stock = deck.slice(cardIndex)
    
    setGameState({
      stock,
      waste: [],
      foundations: [[], [], [], []],
      tableau
    })
    
    setGameStats({ moves: 0, score: 0 })
  }

  const shuffleDeck = (deck) => {
    const shuffled = [...deck]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const drawCard = () => {
    if (gameState.stock.length === 0) {
      // Reset stock from waste if empty
      const newWaste = [...gameState.waste]
      const newStock = newWaste.reverse().map(card => ({ ...card, faceUp: false }))
      
      setGameState(prev => ({
        ...prev,
        stock: newStock,
        waste: []
      }))
    } else {
      // Draw card from stock
      const newStock = [...gameState.stock]
      const newWaste = [...gameState.waste]
      const card = newStock.pop()
      card.faceUp = true
      newWaste.push(card)
      
      setGameState(prev => ({
        ...prev,
        stock: newStock,
        waste: newWaste
      }))
      
      setGameStats(prev => ({ ...prev, moves: prev.moves + 1 }))
    }
  }

  const moveCard = (source, sourceIndex, target, targetIndex) => {
    // Implement card moving logic
    setGameStats(prev => ({ ...prev, moves: prev.moves + 1 }))
  }

  const getCardDisplay = (card) => {
    if (!card.faceUp) {
      return '🂠'
    }
    
    const cardSymbols = {
      'A-♠': '🂡', '2-♠': '🂢', '3-♠': '🂣', '4-♠': '🂤', '5-♠': '🂥', '6-♠': '🂦', '7-♠': '🂧', '8-♠': '🂨', '9-♠': '🂩', '10-♠': '🂪', 'J-♠': '🂫', 'Q-♠': '🂭', 'K-♠': '🂮',
      'A-♥': '🂱', '2-♥': '🂲', '3-♥': '🂳', '4-♥': '🂴', '5-♥': '🂵', '6-♥': '🂶', '7-♥': '🂷', '8-♥': '🂸', '9-♥': '🂹', '10-♥': '🂺', 'J-♥': '🂻', 'Q-♥': '🂽', 'K-♥': '🂾',
      'A-♦': '🃁', '2-♦': '🃂', '3-♦': '🃃', '4-♦': '🃄', '5-♦': '🃅', '6-♦': '🃆', '7-♦': '🃇', '8-♦': '🃈', '9-♦': '🃉', '10-♦': '🃊', 'J-♦': '🃋', 'Q-♦': '🃍', 'K-♦': '🃎',
      'A-♣': '🃑', '2-♣': '🃒', '3-♣': '🃓', '4-♣': '🃔', '5-♣': '🃕', '6-♣': '🃖', '7-♣': '🃗', '8-♣': '🃘', '9-♣': '🃙', '10-♣': '🃚', 'J-♣': '🃛', 'Q-♣': '🃝', 'K-♣': '🃞'
    }
    
    return cardSymbols[card.id] || '🂠'
  }

  return (
    <div className="solitaire">
      <div className="game-toolbar">
        <div className="toolbar-section">
          <button className="toolbar-button" onClick={initializeGame} title="New Game">🔄</button>
          <button className="toolbar-button" onClick={drawCard} title="Draw Card">🃏</button>
        </div>
        <div className="game-stats">
          <span>Moves: {gameStats.moves}</span>
          <span>Score: {gameStats.score}</span>
        </div>
      </div>

      <div className="game-area">
        {/* Foundations */}
        <div className="foundations">
          {gameState.foundations.map((foundation, index) => (
            <div key={index} className="foundation-pile">
              {foundation.length > 0 ? (
                <div className="card">
                  {getCardDisplay(foundation[foundation.length - 1])}
                </div>
              ) : (
                <div className="empty-pile"> foundation</div>
              )}
            </div>
          ))}
        </div>

        {/* Stock and Waste */}
        <div className="stock-waste">
          <div className="stock-pile" onClick={drawCard}>
            {gameState.stock.length > 0 ? (
              <div className="card card-back">🂠</div>
            ) : (
              <div className="empty-pile"> stock</div>
            )}
          </div>
          <div className="waste-pile">
            {gameState.waste.length > 0 ? (
              <div className="card">
                {getCardDisplay(gameState.waste[gameState.waste.length - 1])}
              </div>
            ) : (
              <div className="empty-pile"> waste</div>
            )}
          </div>
        </div>

        {/* Tableau */}
        <div className="tableau">
          {gameState.tableau.map((pile, index) => (
            <div key={index} className="tableau-pile">
              {pile.map((card, cardIndex) => (
                <div 
                  key={card.id} 
                  className={`card ${card.faceUp ? 'face-up' : 'face-down'} ${selectedCard === card.id ? 'selected' : ''}`}
                  onClick={() => setSelectedCard(card.id)}
                >
                  {getCardDisplay(card)}
                </div>
              ))}
              {pile.length === 0 && (
                <div className="empty-pile"> tableau</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="game-statusbar">
        <div className="status-item">Solitaire - Classic Klondike</div>
      </div>
    </div>
  )
}

export default Solitaire
