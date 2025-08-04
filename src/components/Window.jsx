import React, { useState, useRef, useEffect } from 'react'
import './Window.css'

const Window = ({ 
  id, 
  title, 
  children, 
  position, 
  size, 
  isActive, 
  isMinimized, 
  isMaximized,
  zIndex,
  onClose, 
  onMinimize, 
  onMaximize, 
  onFocus 
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [currentPosition, setCurrentPosition] = useState(position)
  const [currentSize, setCurrentSize] = useState(size)
  const windowRef = useRef(null)

  useEffect(() => {
    setCurrentPosition(position)
    setCurrentSize(size)
  }, [position, size])

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-controls')) return
    
    onFocus()
    setIsDragging(true)
    const rect = windowRef.current.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const handleMouseMove = (e) => {
    if (!isDragging || isMaximized) return
    
    const newX = e.clientX - dragOffset.x
    const newY = Math.max(0, e.clientY - dragOffset.y)
    
    setCurrentPosition({ x: newX, y: newY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragOffset])

  if (isMinimized) {
    return null
  }

  const windowStyle = {
    position: 'absolute',
    left: isMaximized ? 0 : currentPosition.x,
    top: isMaximized ? 0 : currentPosition.y,
    width: isMaximized ? '100vw' : currentSize.width,
    height: isMaximized ? 'calc(100vh - 28px)' : currentSize.height,
    zIndex: zIndex,
    cursor: isDragging ? 'grabbing' : 'default'
  }

  return (
    <div
      ref={windowRef}
      className={`window ${isActive ? 'active' : ''}`}
      style={windowStyle}
      onClick={onFocus}
    >
      <div 
        className="window-header"
        onMouseDown={handleMouseDown}
      >
        <div className="window-title">
          <span className="window-icon">🌐</span>
          {title}
        </div>
        <div className="window-controls">
          <button 
            className="window-control minimize"
            onClick={(e) => {
              e.stopPropagation()
              onMinimize()
            }}
            onMouseDown={(e) => e.stopPropagation()}
            title="Minimize"
          >
            _
          </button>
          <button 
            className="window-control maximize"
            onClick={(e) => {
              e.stopPropagation()
              onMaximize()
            }}
            onMouseDown={(e) => e.stopPropagation()}
            title={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? '❐' : '□'}
          </button>
          <button 
            className="window-control close"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            onMouseDown={(e) => e.stopPropagation()}
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>
      <div className="window-content">
        {children}
      </div>
    </div>
  )
}

export default Window
