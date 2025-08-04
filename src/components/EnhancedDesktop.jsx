import React, { useState, useRef, useEffect } from 'react'
import ContextMenu from './ContextMenu'
import { soundManager } from '../utils/sounds'
import './Desktop.css'

const EnhancedDesktop = ({ onOpenWindow }) => {
  const [contextMenu, setContextMenu] = useState(null)
  const [selectedIcon, setSelectedIcon] = useState(null)
  const [wallpaperPattern, setWallpaperPattern] = useState('default')
  const desktopRef = useRef(null)

  const desktopIcons = [
    {
      id: 'portfolio',
      name: 'My Portfolio',
      icon: '🌐',
      position: { x: 20, y: 20 },
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
      position: { x: 20, y: 120 },
      action: () => onOpenWindow({
        id: 'about',
        title: 'About Me - Notepad',
        component: 'about',
        position: { x: 150, y: 100 },
        size: { width: 600, height: 500 }
      })
    },
    {
      id: 'projects',
      name: 'My Projects',
      icon: '📁',
      position: { x: 20, y: 220 },
      action: () => onOpenWindow({
        id: 'projects',
        title: 'My Projects - Windows Explorer',
        component: 'projects',
        position: { x: 200, y: 150 },
        size: { width: 700, height: 550 }
      })
    },
    {
      id: 'contact',
      name: 'Contact',
      icon: '📧',
      position: { x: 20, y: 320 },
      action: () => onOpenWindow({
        id: 'contact',
        title: 'Contact - Address Book',
        component: 'contact',
        position: { x: 250, y: 200 },
        size: { width: 500, height: 450 }
      })
    },
    {
      id: 'calculator',
      name: 'Calculator',
      icon: '🔢',
      position: { x: 20, y: 420 },
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
      position: { x: 20, y: 520 },
      action: () => onOpenWindow({
        id: 'games',
        title: 'Games - Minesweeper',
        component: 'games',
        position: { x: 350, y: 150 },
        size: { width: 400, height: 500 }
      })
    },
    {
      id: 'filemanager',
      name: 'File Manager',
      icon: '📂',
      position: { x: 120, y: 20 },
      action: () => onOpenWindow({
        id: 'filemanager',
        title: 'File Manager - Windows Explorer',
        component: 'filemanager',
        position: { x: 180, y: 80 },
        size: { width: 650, height: 500 }
      })
    },
    {
      id: 'texteditor',
      name: 'Text Editor',
      icon: '📝',
      position: { x: 120, y: 120 },
      action: () => onOpenWindow({
        id: 'texteditor',
        title: 'Text Editor - Notepad++',
        component: 'texteditor',
        position: { x: 220, y: 120 },
        size: { width: 700, height: 500 }
      })
    },
    {
      id: 'imageviewer',
      name: 'Image Viewer',
      icon: '🖼️',
      position: { x: 120, y: 220 },
      action: () => onOpenWindow({
        id: 'imageviewer',
        title: 'Image Viewer',
        component: 'imageviewer',
        position: { x: 260, y: 160 },
        size: { width: 600, height: 450 }
      })
    },
    {
      id: 'paint',
      name: 'Paint',
      icon: '🎨',
      position: { x: 120, y: 320 },
      action: () => onOpenWindow({
        id: 'paint',
        title: 'Paint',
        component: 'paint',
        position: { x: 300, y: 200 },
        size: { width: 800, height: 600 }
      })
    },
    {
      id: 'systeminfo',
      name: 'System Info',
      icon: '💻',
      position: { x: 120, y: 420 },
      action: () => onOpenWindow({
        id: 'systeminfo',
        title: 'System Information',
        component: 'systeminfo',
        position: { x: 340, y: 240 },
        size: { width: 500, height: 400 }
      })
    },
    {
      id: 'recyclebin',
      name: 'Recycle Bin',
      icon: '🗑️',
      position: { x: 120, y: 520 },
      action: () => onOpenWindow({
        id: 'recyclebin',
        title: 'Recycle Bin',
        component: 'recyclebin',
        position: { x: 380, y: 280 },
        size: { width: 450, height: 350 }
      })
    }
  ]

  const contextMenuItems = [
    {
      label: 'Refresh',
      action: () => {
        soundManager.playClick()
        window.location.reload()
      }
    },
    { type: 'separator' },
    {
      label: 'Arrange Icons',
      submenu: [
        {
          label: 'By Name',
          action: () => {
            soundManager.playClick()
            // Sort icons by name
          }
        },
        {
          label: 'By Type',
          action: () => {
            soundManager.playClick()
            // Sort icons by type
          }
        }
      ]
    },
    { type: 'separator' },
    {
      label: 'Properties',
      action: () => {
        soundManager.playClick()
        onOpenWindow({
          id: 'desktop-properties',
          title: 'Desktop Properties',
          component: 'desktopproperties',
          position: { x: 400, y: 200 },
          size: { width: 400, height: 500 }
        })
      }
    }
  ]

  const handleDesktopClick = (e) => {
    if (e.target === desktopRef.current) {
      setSelectedIcon(null)
      setContextMenu(null)
      soundManager.playClick()
    }
  }

  const handleDesktopRightClick = (e) => {
    e.preventDefault()
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      items: contextMenuItems
    })
    soundManager.playClick()
  }

  const handleIconClick = (icon, e) => {
    e.stopPropagation()
    setSelectedIcon(icon.id)
    setContextMenu(null)
    soundManager.playClick()
  }

  const handleIconDoubleClick = (icon, e) => {
    e.stopPropagation()
    soundManager.playWindowOpen()
    icon.action()
  }

  const handleIconRightClick = (icon, e) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedIcon(icon.id)
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        {
          label: 'Open',
          action: () => {
            soundManager.playWindowOpen()
            icon.action()
          }
        },
        { type: 'separator' },
        {
          label: 'Properties',
          action: () => {
            soundManager.playClick()
            onOpenWindow({
              id: `${icon.id}-properties`,
              title: `${icon.name} Properties`,
              component: 'iconproperties',
              position: { x: 400, y: 200 },
              size: { width: 350, height: 400 }
            })
          }
        }
      ]
    })
    soundManager.playClick()
  }

  useEffect(() => {
    const handleClickOutside = () => {
      setContextMenu(null)
    }

    if (contextMenu) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [contextMenu])

  return (
    <div 
      ref={desktopRef}
      className={`desktop enhanced-desktop wallpaper-${wallpaperPattern}`}
      onClick={handleDesktopClick}
      onContextMenu={handleDesktopRightClick}
    >
      <div className="desktop-icons enhanced-icons">
        {desktopIcons.map(icon => (
          <div
            key={icon.id}
            className={`desktop-icon ${selectedIcon === icon.id ? 'selected' : ''}`}
            style={{
              position: 'absolute',
              left: icon.position.x,
              top: icon.position.y
            }}
            onClick={(e) => handleIconClick(icon, e)}
            onDoubleClick={(e) => handleIconDoubleClick(icon, e)}
            onContextMenu={(e) => handleIconRightClick(icon, e)}
          >
            <div className="icon-image">{icon.icon}</div>
            <span className="icon-label">{icon.name}</span>
          </div>
        ))}
      </div>

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextMenu.items}
          onClose={() => setContextMenu(null)}
        />
      )}

      <div className="desktop-wallpaper-overlay"></div>
    </div>
  )
}

export default EnhancedDesktop
