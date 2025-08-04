import React, { useState } from 'react'
import { soundManager } from '../utils/sounds'
import './FileManager.css'

const FileManager = () => {
  const [currentPath, setCurrentPath] = useState('C:\\Users\\Portfolio')
  const [selectedItem, setSelectedItem] = useState(null)
  const [viewMode, setViewMode] = useState('details') // 'icons', 'list', 'details'

  const fileSystem = {
    'C:\\Users\\Portfolio': {
      type: 'folder',
      items: [
        { name: 'Desktop', type: 'folder', size: '', modified: '04/08/2025 5:42 PM' },
        { name: 'Documents', type: 'folder', size: '', modified: '04/08/2025 3:15 PM' },
        { name: 'Projects', type: 'folder', size: '', modified: '04/08/2025 4:30 PM' },
        { name: 'Resume.pdf', type: 'file', size: '245 KB', modified: '04/08/2025 2:20 PM', icon: '📄' },
        { name: 'Portfolio.html', type: 'file', size: '15 KB', modified: '04/08/2025 5:40 PM', icon: '🌐' },
        { name: 'Skills.txt', type: 'file', size: '2 KB', modified: '04/08/2025 1:10 PM', icon: '📝' }
      ]
    },
    'C:\\Users\\Portfolio\\Projects': {
      type: 'folder',
      items: [
        { name: 'React-Dashboard', type: 'folder', size: '', modified: '04/08/2025 4:25 PM' },
        { name: 'E-Commerce-App', type: 'folder', size: '', modified: '04/08/2025 4:20 PM' },
        { name: 'API-Gateway', type: 'folder', size: '', modified: '04/08/2025 4:15 PM' },
        { name: 'Mobile-App', type: 'folder', size: '', modified: '04/08/2025 4:10 PM' },
        { name: 'project-screenshots.zip', type: 'file', size: '15.2 MB', modified: '04/08/2025 4:00 PM', icon: '📦' }
      ]
    },
    'C:\\Users\\Portfolio\\Documents': {
      type: 'folder',
      items: [
        { name: 'Certificates', type: 'folder', size: '', modified: '04/08/2025 3:10 PM' },
        { name: 'References.docx', type: 'file', size: '28 KB', modified: '04/08/2025 3:05 PM', icon: '📄' },
        { name: 'Cover-Letter.pdf', type: 'file', size: '180 KB', modified: '04/08/2025 3:00 PM', icon: '📄' },
        { name: 'Technical-Skills.xlsx', type: 'file', size: '45 KB', modified: '04/08/2025 2:55 PM', icon: '📊' }
      ]
    }
  }

  const currentFolder = fileSystem[currentPath] || { items: [] }
  const pathParts = currentPath.split('\\').filter(part => part)

  const navigateToFolder = (folderName) => {
    const newPath = `${currentPath}\\${folderName}`
    if (fileSystem[newPath]) {
      setCurrentPath(newPath)
      setSelectedItem(null)
      soundManager.playClick()
    }
  }

  const navigateUp = () => {
    const pathParts = currentPath.split('\\')
    if (pathParts.length > 1) {
      pathParts.pop()
      const newPath = pathParts.join('\\')
      setCurrentPath(newPath)
      setSelectedItem(null)
      soundManager.playClick()
    }
  }

  const navigateToPath = (index) => {
    const newPathParts = pathParts.slice(0, index + 1)
    const newPath = newPathParts.join('\\')
    setCurrentPath(newPath)
    setSelectedItem(null)
    soundManager.playClick()
  }

  const handleItemClick = (item) => {
    setSelectedItem(item.name)
    soundManager.playClick()
  }

  const handleItemDoubleClick = (item) => {
    if (item.type === 'folder') {
      navigateToFolder(item.name)
    } else {
      soundManager.playClick()
      // Handle file opening
      alert(`Opening ${item.name}...`)
    }
  }

  const getFileIcon = (item) => {
    if (item.type === 'folder') return '📁'
    return item.icon || '📄'
  }

  return (
    <div className="file-manager">
      <div className="file-manager-menubar">
        <span className="menu-item">File</span>
        <span className="menu-item">Edit</span>
        <span className="menu-item">View</span>
        <span className="menu-item">Tools</span>
        <span className="menu-item">Help</span>
      </div>

      <div className="file-manager-toolbar">
        <button 
          className="toolbar-button"
          onClick={navigateUp}
          disabled={pathParts.length <= 1}
          title="Up"
        >
          ⬆️
        </button>
        <button className="toolbar-button" title="Back">⬅️</button>
        <button className="toolbar-button" title="Forward">➡️</button>
        <div className="toolbar-separator"></div>
        <button 
          className={`toolbar-button ${viewMode === 'icons' ? 'active' : ''}`}
          onClick={() => setViewMode('icons')}
          title="Large Icons"
        >
          🔲
        </button>
        <button 
          className={`toolbar-button ${viewMode === 'list' ? 'active' : ''}`}
          onClick={() => setViewMode('list')}
          title="List"
        >
          📋
        </button>
        <button 
          className={`toolbar-button ${viewMode === 'details' ? 'active' : ''}`}
          onClick={() => setViewMode('details')}
          title="Details"
        >
          📊
        </button>
      </div>

      <div className="file-manager-addressbar">
        <span className="address-label">Address:</span>
        <div className="address-path">
          {pathParts.map((part, index) => (
            <React.Fragment key={index}>
              <span 
                className="path-part"
                onClick={() => navigateToPath(index)}
              >
                {part}
              </span>
              {index < pathParts.length - 1 && <span className="path-separator">\\</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className={`file-manager-content view-${viewMode}`}>
        {viewMode === 'details' && (
          <div className="details-header">
            <div className="column-header name-column">Name</div>
            <div className="column-header size-column">Size</div>
            <div className="column-header type-column">Type</div>
            <div className="column-header modified-column">Date Modified</div>
          </div>
        )}

        <div className="file-list">
          {currentFolder.items.map((item, index) => (
            <div
              key={index}
              className={`file-item ${selectedItem === item.name ? 'selected' : ''} ${item.type}`}
              onClick={() => handleItemClick(item)}
              onDoubleClick={() => handleItemDoubleClick(item)}
            >
              {viewMode === 'details' ? (
                <>
                  <div className="item-name">
                    <span className="item-icon">{getFileIcon(item)}</span>
                    <span className="item-text">{item.name}</span>
                  </div>
                  <div className="item-size">{item.size}</div>
                  <div className="item-type">
                    {item.type === 'folder' ? 'File Folder' : 'File'}
                  </div>
                  <div className="item-modified">{item.modified}</div>
                </>
              ) : (
                <>
                  <div className="item-icon-large">{getFileIcon(item)}</div>
                  <div className="item-name-large">{item.name}</div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="file-manager-statusbar">
        <div className="status-item">{currentFolder.items.length} object(s)</div>
        <div className="status-item">
          {selectedItem ? `${selectedItem} selected` : 'Ready'}
        </div>
      </div>
    </div>
  )
}

export default FileManager
