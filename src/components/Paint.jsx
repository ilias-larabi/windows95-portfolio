import React, { useState, useRef, useEffect } from 'react'
import './Paint.css'

const Paint = () => {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#000000')
  const [brushSize, setBrushSize] = useState(5)
  const [tool, setTool] = useState('pencil')
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  const startDrawing = (e) => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setIsDrawing(true)
    setLastPosition({ x, y })

    if (tool === 'pencil') {
      ctx.beginPath()
      ctx.moveTo(x, y)
    }
  }

  const draw = (e) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.lineWidth = brushSize
    ctx.lineCap = 'round'
    ctx.strokeStyle = color

    if (tool === 'pencil') {
      ctx.lineTo(x, y)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x, y)
    } else if (tool === 'eraser') {
      ctx.strokeStyle = '#ffffff'
      ctx.lineTo(x, y)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x, y)
    }

    setLastPosition({ x, y })
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.beginPath()
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <div className="paint">
      <div className="paint-toolbar">
        <div className="toolbar-section">
          <button className="toolbar-button" title="New">📄</button>
          <button className="toolbar-button" title="Open">📂</button>
          <button className="toolbar-button" title="Save">💾</button>
        </div>
        <div className="toolbar-separator"></div>
        <div className="toolbar-section">
          <button 
            className={`toolbar-button ${tool === 'pencil' ? 'active' : ''}`} 
            title="Pencil"
            onClick={() => setTool('pencil')}
          >
            ✏️
          </button>
          <button 
            className={`toolbar-button ${tool === 'eraser' ? 'active' : ''}`} 
            title="Eraser"
            onClick={() => setTool('eraser')}
          >
            🧹
          </button>
        </div>
        <div className="toolbar-separator"></div>
        <div className="toolbar-section">
          <input 
            type="color" 
            value={color} 
            onChange={(e) => setColor(e.target.value)}
            className="color-picker"
          />
          <div className="brush-size-control">
            <label>Size:</label>
            <input 
              type="range" 
              min="1" 
              max="50" 
              value={brushSize} 
              onChange={(e) => setBrushSize(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="paint-content">
        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="paint-canvas"
        />
      </div>

      <div className="paint-statusbar">
        <div className="status-item">Tool: {tool}</div>
        <div className="status-item">Size: {brushSize}px</div>
        <div className="status-item">Color: {color}</div>
      </div>
    </div>
  )
}

export default Paint
