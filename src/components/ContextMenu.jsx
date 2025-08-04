import React, { useEffect, useRef } from 'react'
import { soundManager } from '../utils/sounds'
import './ContextMenu.css'

const ContextMenu = ({ x, y, items, onClose, onItemClick }) => {
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose()
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  const handleItemClick = (item) => {
    if (!item.disabled) {
      soundManager.playClick()
      onItemClick(item)
      onClose()
    }
  }

  return (
    <div
      ref={menuRef}
      className="context-menu"
      style={{ left: x, top: y }}
    >
      {items.map((item, index) => (
        item.type === 'separator' ? (
          <div key={index} className="context-menu-separator" />
        ) : (
          <div
            key={item.id || index}
            className={`context-menu-item ${item.disabled ? 'disabled' : ''}`}
            onClick={() => handleItemClick(item)}
          >
            {item.icon && <span className="menu-item-icon">{item.icon}</span>}
            <span className="menu-item-text">{item.label}</span>
            {item.shortcut && <span className="menu-item-shortcut">{item.shortcut}</span>}
            {item.hasSubmenu && <span className="menu-item-arrow">▶</span>}
          </div>
        )
      ))}
    </div>
  )
}

export default ContextMenu
