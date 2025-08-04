import React, { useState } from 'react'
import { soundManager } from '../utils/sounds'
import './Taskbar.css'

const Taskbar = ({ openWindows, activeWindow, onWindowClick, currentTime }) => {
  const [showStartMenu, setShowStartMenu] = useState(false)

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const handleStartClick = () => {
    soundManager.playClick()
    setShowStartMenu(!showStartMenu)
  }

  const startMenuItems = [
    { id: 'programs', label: 'Programs', icon: '📁', hasSubmenu: true },
    { id: 'documents', label: 'Documents', icon: '📄' },
    { id: 'settings', label: 'Settings', icon: '⚙️', hasSubmenu: true },
    { id: 'find', label: 'Find', icon: '🔍', hasSubmenu: true },
    { id: 'help', label: 'Help', icon: '❓' },
    { id: 'run', label: 'Run...', icon: '🏃' },
    { type: 'separator' },
    { id: 'shutdown', label: 'Shut Down...', icon: '🔌' }
  ]

  return (
    <div className="taskbar">
      <button 
        className={`start-button ${showStartMenu ? 'pressed' : ''}`}
        onClick={handleStartClick}
      >
        <span className="start-icon">🪟</span>
        Start
      </button>
      
      <div className="taskbar-separator"></div>
      
      <div className="taskbar-buttons">
        {openWindows.filter(w => !w.isMinimized).map(window => (
          <button
            key={window.id}
            className={`taskbar-button ${activeWindow === window.id ? 'active' : ''}`}
            onClick={() => onWindowClick(window.id)}
          >
            <span className="taskbar-button-icon">🌐</span>
            <span className="taskbar-button-text">{window.title}</span>
          </button>
        ))}
      </div>
      
      <div className="taskbar-tray">
        <div className="system-tray">
          <div className="tray-icon" title="Volume">🔊</div>
          <div className="tray-icon" title="Network">🌐</div>
        </div>
        <div className="taskbar-clock" title={currentTime.toLocaleDateString()}>
          {formatTime(currentTime)}
        </div>
      </div>

      {showStartMenu && (
        <>
          <div 
            className="start-menu-overlay" 
            onClick={() => setShowStartMenu(false)}
          ></div>
          <div className="start-menu">
            <div className="start-menu-banner">
              <span className="banner-text">Windows 95</span>
            </div>
            <div className="start-menu-items">
              {startMenuItems.map((item, index) => (
                item.type === 'separator' ? (
                  <div key={index} className="start-menu-separator"></div>
                ) : (
                  <div 
                    key={item.id} 
                    className="start-menu-item"
                    onClick={() => {
                      setShowStartMenu(false)
                      if (item.id === 'shutdown') {
                        if (confirm('Are you sure you want to shut down?')) {
                          window.close()
                        }
                      }
                    }}
                  >
                    <span className="menu-item-icon">{item.icon}</span>
                    <span className="menu-item-text">{item.label}</span>
                    {item.hasSubmenu && <span className="menu-item-arrow">▶</span>}
                  </div>
                )
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Taskbar
