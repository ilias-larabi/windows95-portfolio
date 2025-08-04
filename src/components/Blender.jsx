import React, { useState, useEffect, useRef } from 'react'
import './Blender.css'

const Blender = () => {
  const canvasRef = useRef(null)
  const [isRendering, setIsRendering] = useState(false)
  const [renderProgress, setRenderProgress] = useState(0)
  const [selectedTool, setSelectedTool] = useState('select')
  const [objects, setObjects] = useState([
    { id: 1, name: 'Cube', type: 'mesh', position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
    { id: 2, name: 'Sphere', type: 'mesh', position: { x: 2, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
    { id: 3, name: 'Plane', type: 'mesh', position: { x: 0, y: -1, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 2, y: 2, z: 2 } }
  ])
  const [selectedObject, setSelectedObject] = useState(null)

  // Simulate rendering process
  const startRender = () => {
    if (isRendering) return
    setIsRendering(true)
    setRenderProgress(0)
    
    const interval = setInterval(() => {
      setRenderProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsRendering(false)
          return 100
        }
        return prev + 1
      })
    }, 50)
  }

  // Reset the scene
  const resetScene = () => {
    setObjects([
      { id: 1, name: 'Cube', type: 'mesh', position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
      { id: 2, name: 'Sphere', type: 'mesh', position: { x: 2, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
      { id: 3, name: 'Plane', type: 'mesh', position: { x: 0, y: -1, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 2, y: 2, z: 2 } }
    ])
    setSelectedObject(null)
    setIsRendering(false)
    setRenderProgress(0)
  }

  // Add a new object to the scene
  const addObject = (type) => {
    const newObject = {
      id: objects.length + 1,
      name: type.charAt(0).toUpperCase() + type.slice(1) + ' ' + (objects.length + 1),
      type: type,
      position: { x: Math.random() * 4 - 2, y: Math.random() * 2, z: Math.random() * 4 - 2 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 }
    }
    setObjects(prev => [...prev, newObject])
  }

  // Delete selected object
  const deleteObject = () => {
    if (!selectedObject) return
    setObjects(prev => prev.filter(obj => obj.id !== selectedObject.id))
    setSelectedObject(null)
  }

  // Update object properties
  const updateObjectProperty = (property, axis, value) => {
    if (!selectedObject) return
    setObjects(prev => prev.map(obj => {
      if (obj.id === selectedObject.id) {
        return {
          ...obj,
          [property]: {
            ...obj[property],
            [axis]: parseFloat(value) || 0
          }
        }
      }
      return obj
    }))
    
    // Update selected object state
    setSelectedObject(prev => ({
      ...prev,
      [property]: {
        ...prev[property],
        [axis]: parseFloat(value) || 0
      }
    }))
  }

  return (
    <div className="blender">
      <div className="blender-toolbar">
        <div className="toolbar-section">
          <button className="toolbar-button" onClick={resetScene} title="New Scene">🔄</button>
          <button className="toolbar-button" onClick={() => addObject('cube')} title="Add Cube">🟦</button>
          <button className="toolbar-button" onClick={() => addObject('sphere')} title="Add Sphere">⚽</button>
          <button className="toolbar-button" onClick={() => addObject('cylinder')} title="Add Cylinder">🛢️</button>
          <button className="toolbar-button" onClick={deleteObject} title="Delete Object" disabled={!selectedObject}>🗑️</button>
        </div>
        
        <div className="toolbar-section">
          <button 
            className={`toolbar-button ${selectedTool === 'select' ? 'active' : ''}`}
            onClick={() => setSelectedTool('select')}
            title="Select Tool"
          >
            🔍
          </button>
          <button 
            className={`toolbar-button ${selectedTool === 'move' ? 'active' : ''}`}
            onClick={() => setSelectedTool('move')}
            title="Move Tool"
          >
            🖱️
          </button>
          <button 
            className={`toolbar-button ${selectedTool === 'rotate' ? 'active' : ''}`}
            onClick={() => setSelectedTool('rotate')}
            title="Rotate Tool"
          >
            🔄
          </button>
          <button 
            className={`toolbar-button ${selectedTool === 'scale' ? 'active' : ''}`}
            onClick={() => setSelectedTool('scale')}
            title="Scale Tool"
          >
            📏
          </button>
        </div>
        
        <div className="toolbar-section">
          <button 
            className="toolbar-button render-button"
            onClick={startRender}
            disabled={isRendering}
          >
            {isRendering ? 'Rendering...' : 'Render Image'}
          </button>
        </div>
      </div>

      <div className="blender-content">
        <div className="viewport-container">
          <canvas 
            ref={canvasRef} 
            className="viewport-canvas"
            width="800" 
            height="500"
          />
          <div className="viewport-overlay">
            <div className="grid"></div>
            <div className="axis-indicator">
              <div className="axis x-axis"></div>
              <div className="axis y-axis"></div>
              <div className="axis z-axis"></div>
            </div>
          </div>
        </div>
        
        <div className="properties-panel">
          <h3>Object Properties</h3>
          {selectedObject ? (
            <div className="properties-content">
              <div className="property-group">
                <h4>Transform</h4>
                <div className="transform-properties">
                  <div className="property-row">
                    <label>Position X:</label>
                    <input 
                      type="number" 
                      step="0.1"
                      value={selectedObject.position.x}
                      onChange={(e) => updateObjectProperty('position', 'x', e.target.value)}
                    />
                  </div>
                  <div className="property-row">
                    <label>Position Y:</label>
                    <input 
                      type="number" 
                      step="0.1"
                      value={selectedObject.position.y}
                      onChange={(e) => updateObjectProperty('position', 'y', e.target.value)}
                    />
                  </div>
                  <div className="property-row">
                    <label>Position Z:</label>
                    <input 
                      type="number" 
                      step="0.1"
                      value={selectedObject.position.z}
                      onChange={(e) => updateObjectProperty('position', 'z', e.target.value)}
                    />
                  </div>
                  
                  <div className="property-row">
                    <label>Rotation X:</label>
                    <input 
                      type="number" 
                      step="1"
                      value={selectedObject.rotation.x}
                      onChange={(e) => updateObjectProperty('rotation', 'x', e.target.value)}
                    />
                  </div>
                  <div className="property-row">
                    <label>Rotation Y:</label>
                    <input 
                      type="number" 
                      step="1"
                      value={selectedObject.rotation.y}
                      onChange={(e) => updateObjectProperty('rotation', 'y', e.target.value)}
                    />
                  </div>
                  <div className="property-row">
                    <label>Rotation Z:</label>
                    <input 
                      type="number" 
                      step="1"
                      value={selectedObject.rotation.z}
                      onChange={(e) => updateObjectProperty('rotation', 'z', e.target.value)}
                    />
                  </div>
                  
                  <div className="property-row">
                    <label>Scale X:</label>
                    <input 
                      type="number" 
                      step="0.1"
                      min="0.1"
                      value={selectedObject.scale.x}
                      onChange={(e) => updateObjectProperty('scale', 'x', e.target.value)}
                    />
                  </div>
                  <div className="property-row">
                    <label>Scale Y:</label>
                    <input 
                      type="number" 
                      step="0.1"
                      min="0.1"
                      value={selectedObject.scale.y}
                      onChange={(e) => updateObjectProperty('scale', 'y', e.target.value)}
                    />
                  </div>
                  <div className="property-row">
                    <label>Scale Z:</label>
                    <input 
                      type="number" 
                      step="0.1"
                      min="0.1"
                      value={selectedObject.scale.z}
                      onChange={(e) => updateObjectProperty('scale', 'z', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="property-group">
                <h4>Object Info</h4>
                <div className="object-info">
                  <p><strong>Name:</strong> {selectedObject.name}</p>
                  <p><strong>Type:</strong> {selectedObject.type}</p>
                  <p><strong>ID:</strong> {selectedObject.id}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="no-selection">No object selected</p>
          )}
        </div>
      </div>

      <div className="blender-statusbar">
        <div className="status-item">
          {isRendering ? `Rendering: ${renderProgress}%` : 'Blender - Ready'}
        </div>
        <div className="status-item">
          Objects: {objects.length}
        </div>
      </div>
      
      {/* Render progress bar */}
      {isRendering && (
        <div className="render-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${renderProgress}%` }}
            ></div>
          </div>
          <p>Rendering scene...</p>
        </div>
      )}
    </div>
  )
}

export default Blender
