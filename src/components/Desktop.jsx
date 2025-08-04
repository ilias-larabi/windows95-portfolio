import React, { useState } from 'react'
import { soundManager } from '../utils/sounds'
import './Desktop.css'

const Desktop = ({ onOpenWindow }) => {
  const [selectedIcon, setSelectedIcon] = useState(null)

  const desktopIcons = [
    {
      id: 'portfolio',
      name: 'My Portfolio',
      icon: '🌐',
      action: () => onOpenWindow({
        id: 'portfolio',
        title: 'My Portfolio - Internet Explorer',
        component: 'portfolio',
        position: { x: 100, y: 50 },
        size: { width: 800, height: 600 }
      })
    },
    {
      id: 'about',
      name: 'About Me',
      icon: '👤',
      action: () => onOpenWindow({
        id: 'about',
        title: 'About Me - Notepad',
        component: 'about',
        position: { x: 150, y: 100 },
        size: { width: 600, height: 400 }
      })
    },
    {
      id: 'projects',
      name: 'My Projects',
      icon: '📁',
      action: () => onOpenWindow({
        id: 'projects',
        title: 'My Projects - File Explorer',
        component: 'projects',
        position: { x: 200, y: 150 },
        size: { width: 700, height: 500 }
      })
    },
    {
      id: 'contact',
      name: 'Contact',
      icon: '📧',
      action: () => onOpenWindow({
        id: 'contact',
        title: 'Contact - Address Book',
        component: 'contact',
        position: { x: 250, y: 200 },
        size: { width: 500, height: 400 }
      })
    },
    {
      id: 'calculator',
      name: 'Calculator',
      icon: '🔢',
      action: () => onOpenWindow({
        id: 'calculator',
        title: 'Calculator',
        component: 'calculator',
        position: { x: 300, y: 100 },
        size: { width: 250, height: 320 }
      })
    },
    {
      id: 'games',
      name: 'Games',
      icon: '🎮',
      action: () => onOpenWindow({
        id: 'games',
        title: 'Games - Minesweeper',
        component: 'games',
        position: { x: 350, y: 150 },
        size: { width: 400, height: 500 }
      })
    }
  ]

  const handleIconClick = (icon) => {
    setSelectedIcon(icon.id)
    soundManager.playClick()
  }

  const handleIconDoubleClick = (icon) => {
    setSelectedIcon(icon.id)
    soundManager.playNavigate()
    icon.action()
  }

  const handleDesktopClick = (e) => {
    if (e.target.className === 'desktop') {
      setSelectedIcon(null)
    }
  }

  return (
    <div className="desktop" onClick={handleDesktopClick}>
      <div className="desktop-icons">
        {desktopIcons.map(icon => (
          <div
            key={icon.id}
            className={`desktop-icon ${selectedIcon === icon.id ? 'selected' : ''}`}
            onClick={() => handleIconClick(icon)}
            onDoubleClick={() => handleIconDoubleClick(icon)}
          >
            <div className="icon-image">{icon.icon}</div>
            <span className="icon-label">{icon.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Desktop
