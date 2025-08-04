import React, { useState, useRef } from 'react'
import { soundManager } from '../utils/sounds'
import './TextEditor.css'

const TextEditor = () => {
  const [content, setContent] = useState(`// Welcome to Advanced Text Editor
// This is a sample JavaScript file

function greetVisitor(name) {
    console.log(\`Hello, \${name}! Welcome to my portfolio.\`);
    
    const skills = [
        'React.js',
        'Node.js', 
        'TypeScript',
        'Python',
        'AWS',
        'Docker'
    ];
    
    return {
        message: 'Thanks for visiting!',
        skills: skills,
        contact: 'Available for opportunities'
    };
}

// Call the function
greetVisitor('Visitor');

/* 
   Multi-line comment example
   This editor supports syntax highlighting
   and multiple programming languages
*/

const portfolioData = {
    name: "Your Name",
    role: "Full Stack Developer",
    experience: "5+ years",
    location: "Available Worldwide"
};

export default portfolioData;`)

  const [fileName, setFileName] = useState('portfolio-sample.js')
  const [isModified, setIsModified] = useState(false)
  const [language, setLanguage] = useState('javascript')
  const [lineNumbers, setLineNumbers] = useState(true)
  const [wordWrap, setWordWrap] = useState(false)
  const textareaRef = useRef(null)

  const handleContentChange = (e) => {
    setContent(e.target.value)
    setIsModified(true)
  }

  const handleSave = () => {
    soundManager.playClick()
    setIsModified(false)
    // Simulate saving
    alert(`File "${fileName}" saved successfully!`)
  }

  const handleNew = () => {
    if (isModified) {
      const confirm = window.confirm('Do you want to save changes?')
      if (confirm) {
        handleSave()
      }
    }
    setContent('')
    setFileName('untitled.txt')
    setIsModified(false)
    soundManager.playClick()
  }

  const handleOpen = () => {
    soundManager.playClick()
    // Simulate file opening
    const sampleFiles = [
      { name: 'README.md', content: '# My Portfolio\n\nWelcome to my professional portfolio website.\n\n## Features\n- Retro Windows 95 interface\n- Interactive desktop environment\n- Professional project showcase\n- Contact information' },
      { name: 'skills.json', content: '{\n  "frontend": ["React", "Vue.js", "Angular"],\n  "backend": ["Node.js", "Python", "Java"],\n  "database": ["MongoDB", "PostgreSQL", "Redis"],\n  "cloud": ["AWS", "Azure", "GCP"],\n  "tools": ["Docker", "Kubernetes", "Git"]\n}' },
      { name: 'experience.txt', content: 'PROFESSIONAL EXPERIENCE\n\nSenior Full Stack Developer (2020-Present)\n- Led development of enterprise web applications\n- Implemented microservices architecture\n- Mentored junior developers\n\nFull Stack Developer (2018-2020)\n- Built responsive web applications\n- Integrated third-party APIs\n- Optimized application performance' }
    ]
    
    const randomFile = sampleFiles[Math.floor(Math.random() * sampleFiles.length)]
    setFileName(randomFile.name)
    setContent(randomFile.content)
    setIsModified(false)
    
    // Set language based on file extension
    const ext = randomFile.name.split('.').pop()
    const langMap = {
      'js': 'javascript',
      'json': 'json',
      'md': 'markdown',
      'txt': 'text',
      'html': 'html',
      'css': 'css'
    }
    setLanguage(langMap[ext] || 'text')
  }

  const handleFind = () => {
    soundManager.playClick()
    const searchTerm = prompt('Find:')
    if (searchTerm && textareaRef.current) {
      const textarea = textareaRef.current
      const text = textarea.value
      const index = text.toLowerCase().indexOf(searchTerm.toLowerCase())
      
      if (index !== -1) {
        textarea.focus()
        textarea.setSelectionRange(index, index + searchTerm.length)
      } else {
        alert('Text not found')
      }
    }
  }

  const getLineCount = () => {
    return content.split('\n').length
  }

  const getLineNumbersDisplay = () => {
    const lines = content.split('\n')
    return lines.map((_, index) => (
      <div key={index} className="line-number">
        {index + 1}
      </div>
    ))
  }

  return (
    <div className="text-editor">
      <div className="text-editor-menubar">
        <span className="menu-item" onClick={handleNew}>File</span>
        <span className="menu-item">Edit</span>
        <span className="menu-item">View</span>
        <span className="menu-item">Search</span>
        <span className="menu-item">Tools</span>
        <span className="menu-item">Help</span>
      </div>

      <div className="text-editor-toolbar">
        <button className="toolbar-button" onClick={handleNew} title="New">📄</button>
        <button className="toolbar-button" onClick={handleOpen} title="Open">📂</button>
        <button className="toolbar-button" onClick={handleSave} title="Save">💾</button>
        <div className="toolbar-separator"></div>
        <button className="toolbar-button" title="Cut">✂️</button>
        <button className="toolbar-button" title="Copy">📋</button>
        <button className="toolbar-button" title="Paste">📌</button>
        <div className="toolbar-separator"></div>
        <button className="toolbar-button" onClick={handleFind} title="Find">🔍</button>
        <button className="toolbar-button" title="Replace">🔄</button>
        <div className="toolbar-separator"></div>
        <select 
          className="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="text">Plain Text</option>
          <option value="javascript">JavaScript</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="json">JSON</option>
          <option value="markdown">Markdown</option>
          <option value="python">Python</option>
        </select>
      </div>

      <div className="text-editor-options">
        <label className="option-checkbox">
          <input 
            type="checkbox" 
            checked={lineNumbers}
            onChange={(e) => setLineNumbers(e.target.checked)}
          />
          Line Numbers
        </label>
        <label className="option-checkbox">
          <input 
            type="checkbox" 
            checked={wordWrap}
            onChange={(e) => setWordWrap(e.target.checked)}
          />
          Word Wrap
        </label>
        <span className="file-info">
          Language: {language} | Lines: {getLineCount()}
        </span>
      </div>

      <div className="text-editor-content">
        {lineNumbers && (
          <div className="line-numbers">
            {getLineNumbersDisplay()}
          </div>
        )}
        <textarea
          ref={textareaRef}
          className={`editor-textarea ${language} ${wordWrap ? 'word-wrap' : ''}`}
          value={content}
          onChange={handleContentChange}
          placeholder="Start typing..."
          spellCheck={false}
        />
      </div>

      <div className="text-editor-statusbar">
        <div className="status-item">
          {fileName}{isModified ? ' *' : ''} - {language}
        </div>
        <div className="status-item">
          Lines: {getLineCount()} | Characters: {content.length}
        </div>
        <div className="status-item">
          {isModified ? 'Modified' : 'Saved'}
        </div>
      </div>
    </div>
  )
}

export default TextEditor
