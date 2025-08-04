import React from 'react'
import './Portfolio.css'

const Portfolio = ({ onNavigate }) => {
  const handleNavigation = (section) => {
    const windowConfigs = {
      about: {
        id: 'about',
        title: 'About Me - Notepad',
        component: 'about',
        position: { x: 150, y: 100 },
        size: { width: 600, height: 400 }
      },
      projects: {
        id: 'projects',
        title: 'My Projects - File Explorer',
        component: 'projects',
        position: { x: 200, y: 150 },
        size: { width: 700, height: 500 }
      },
      contact: {
        id: 'contact',
        title: 'Contact - Address Book',
        component: 'contact',
        position: { x: 250, y: 200 },
        size: { width: 500, height: 400 }
      }
    }
    
    if (windowConfigs[section]) {
      onNavigate(windowConfigs[section])
    }
  }

  return (
    <div className="portfolio">
      <div className="browser-toolbar">
        <div className="toolbar-section">
          <button className="toolbar-button" title="Back">◀</button>
          <button className="toolbar-button" title="Forward">▶</button>
          <button className="toolbar-button" title="Stop">⏹</button>
          <button className="toolbar-button" title="Refresh">🔄</button>
          <button className="toolbar-button" title="Home">🏠</button>
        </div>
        <div className="address-bar">
          <span className="address-label">Address:</span>
          <input 
            type="text" 
            className="address-input" 
            value="http://localhost:3000/portfolio" 
            readOnly 
          />
          <button className="go-button">Go</button>
        </div>
      </div>

      <div className="portfolio-content">
        <div className="hero-section">
          <div className="hero-text">
            <h1 className="main-title">Welcome to My Portfolio</h1>
            <h2 className="subtitle">Full Stack Developer</h2>
            <p className="description">
              Building modern web applications with passion and precision
            </p>
          </div>
        </div>

        <div className="navigation-section">
          <div className="nav-grid">
            <div 
              className="nav-card" 
              onClick={() => handleNavigation('about')}
            >
              <div className="nav-icon">👤</div>
              <h3>About Me</h3>
              <p>Learn about my background, skills, and experience</p>
            </div>
            
            <div 
              className="nav-card" 
              onClick={() => handleNavigation('projects')}
            >
              <div className="nav-icon">💼</div>
              <h3>My Projects</h3>
              <p>Explore my latest work and technical achievements</p>
            </div>
            
            <div 
              className="nav-card" 
              onClick={() => handleNavigation('contact')}
            >
              <div className="nav-icon">📧</div>
              <h3>Contact</h3>
              <p>Get in touch for opportunities and collaborations</p>
            </div>
          </div>
        </div>

        <div className="quick-info">
          <div className="info-box">
            <h4>🚀 Current Focus</h4>
            <p>React, Node.js, TypeScript</p>
          </div>
          <div className="info-box">
            <h4>📍 Location</h4>
            <p>Available Worldwide</p>
          </div>
          <div className="info-box">
            <h4>💡 Interests</h4>
            <p>AI, Web3, Mobile Development</p>
          </div>
        </div>
      </div>

      <div className="browser-statusbar">
        <div className="status-section">Done</div>
        <div className="status-section">Internet Zone</div>
      </div>
    </div>
  )
}

export default Portfolio
