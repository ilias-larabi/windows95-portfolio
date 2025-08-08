import React, { useState, useEffect } from 'react'
import Desktop from './components/Desktop'
import Taskbar from './components/Taskbar'
import Window from './components/Window'
import Portfolio from './components/Portfolio'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Calculator from './components/Calculator'
import Games from './components/Games'
import Paint from './components/Paint'
import SystemInfo from './components/SystemInfo'
import Blender from './components/Blender'
import NavigationHeader from './components/NavigationHeader'
import { soundManager } from './utils/sounds'
import './App.css'

function App() {
  const [openWindows, setOpenWindows] = useState([
    {
      id: 'portfolio',
      title: 'My Portfolio - Internet Explorer',
      component: 'portfolio',
      isMaximized: false,
      position: { x: 100, y: 50 },
      size: { width: 800, height: 600 },
      zIndex: 100
    }
  ])
  
  const [activeWindow, setActiveWindow] = useState('portfolio')
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const openWindow = (windowConfig) => {
    const existingWindow = openWindows.find(w => w.id === windowConfig.id)
    if (existingWindow) {
      // If window is minimized, restore it
      if (existingWindow.isMinimized) {
        restoreWindow(windowConfig.id)
      } else {
        setActiveWindow(windowConfig.id)
        focusWindow(windowConfig.id)
      }
      return
    }

    const newWindow = {
      ...windowConfig,
      zIndex: Math.max(...openWindows.map(w => w.zIndex), 100) + 1,
      isMinimized: false,
      isMaximized: false
    }
    
    setOpenWindows([...openWindows, newWindow])
    setActiveWindow(windowConfig.id)
    soundManager.playWindowOpen()
  }

  const closeWindow = (windowId) => {
    soundManager.playWindowClose()
    setOpenWindows(openWindows.filter(w => w.id !== windowId))
    if (activeWindow === windowId) {
      const remainingWindows = openWindows.filter(w => w.id !== windowId)
      setActiveWindow(remainingWindows.length > 0 ? remainingWindows[remainingWindows.length - 1].id : null)
    }
  }

  const minimizeWindow = (windowId) => {
    soundManager.playMinimize()
    setOpenWindows(openWindows.map(w => 
      w.id === windowId ? { ...w, isMinimized: true } : w
    ))
  }

  const restoreWindow = (windowId) => {
    setOpenWindows(openWindows.map(w => 
      w.id === windowId ? { ...w, isMinimized: false } : w
    ))
    setActiveWindow(windowId)
  }

  const maximizeWindow = (windowId) => {
    soundManager.playMaximize()
    setOpenWindows(openWindows.map(w => 
      w.id === windowId ? { 
        ...w, 
        isMaximized: !w.isMaximized,
        ...(w.isMaximized ? {} : {
          position: { x: 0, y: 0 },
          size: { width: window.innerWidth, height: window.innerHeight - 28 }
        })
      } : w
    ))
  }

  const focusWindow = (windowId) => {
    const maxZ = Math.max(...openWindows.map(w => w.zIndex))
    setOpenWindows(openWindows.map(w => 
      w.id === windowId ? { ...w, zIndex: maxZ + 1 } : w
    ))
    setActiveWindow(windowId)
  }

  const renderWindowContent = (component) => {
    switch (component) {
      case 'portfolio':
        return <Portfolio onNavigate={openWindow} />
      case 'about':
        return <About />
      case 'projects':
        return <Projects />
      case 'contact':
        return <Contact />
      case 'calculator':
        return <Calculator />
      case 'games':
        return <Games />
      case 'paint':
        return <Paint />
      case 'systeminfo':
        return <SystemInfo />
      case 'blender':
        return <Blender />
      default:
        return <div>Unknown component</div>
    }
  }

  return (
    <div className="app">
      <NavigationHeader />
      <Desktop onOpenWindow={openWindow} />
      
      {openWindows.map(window => (
        <Window
          key={window.id}
          {...window}
          isActive={activeWindow === window.id}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onMaximize={() => maximizeWindow(window.id)}
          onFocus={() => focusWindow(window.id)}
        >
          {renderWindowContent(window.component)}
        </Window>
      ))}
      
      <Taskbar 
        openWindows={openWindows}
        activeWindow={activeWindow}
        onWindowClick={restoreWindow}
        currentTime={currentTime}
      />
    </div>
  )
}

export default App
