import React from 'react'
import './SystemInfo.css'

const SystemInfo = () => {
  const systemData = {
    system: {
      name: 'Windows 95 Portfolio',
      version: '1.0.0',
      build: 'Professional Developer Edition'
    },
    developer: {
      name: 'Ilias Larabi',
      title: 'Full Stack Developer & Software Engineering Student',
      experience: '2+ years of practical and academic programming experience',
      education: 'Bachelor\'s in Software Engineering (3IIR program) - EMSI, Casablanca'
    },
    technical: {
      languages: ['JavaScript', 'Python', 'Java', 'C', 'C++', 'PHP', 'SQL', 'PL/SQL', 'HTML', 'CSS'],
      frameworks: ['React', 'Django', 'Symfony', 'Node.js (beginner)'],
      databases: ['MySQL', 'PostgreSQL', 'SQLite', 'Oracle'],
      tools: ['Git', 'GitHub', 'VS Code', 'XAMPP', 'Docker (beginner)', 'Supabase'],
      cloud: ['Supabase', 'Vercel', 'Firebase (basic)']
    },
    applications: [
      { name: 'Portfolio Explorer', version: '1.0', description: 'Main portfolio application' },
      { name: 'About Me Viewer', version: '1.0', description: 'Personal and professional information' },
      { name: 'Project Manager', version: '1.0', description: 'Showcase of technical projects' },
      { name: 'Contact Center', version: '1.0', description: 'Professional contact information' },
      { name: 'Calculator Pro', version: '1.0', description: 'Fully functional calculator' },
      { name: 'Games Collection', version: '1.0', description: 'Classic Minesweeper and Solitaire' },
      { name: 'File Manager', version: '1.0', description: 'Browse portfolio files and projects' },
      { name: 'Text Editor', version: '1.0', description: 'Document editing with syntax highlighting' },
      { name: 'Paint', version: '1.0', description: 'Creative drawing application' }
    ]
  }

  return (
    <div className="system-info">
      <div className="sysinfo-toolbar">
        <div className="toolbar-section">
          <button className="toolbar-button" title="Refresh">🔄</button>
          <button className="toolbar-button" title="Print">🖨️</button>
          <button className="toolbar-button" title="Properties">📋</button>
        </div>
      </div>

      <div className="sysinfo-content">
        <div className="sysinfo-panel">
          <div className="panel-section">
            <h3>🖥️ System Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>System Name:</label>
                <span>{systemData.system.name}</span>
              </div>
              <div className="info-item">
                <label>Version:</label>
                <span>{systemData.system.version}</span>
              </div>
              <div className="info-item">
                <label>Build:</label>
                <span>{systemData.system.build}</span>
              </div>
            </div>
          </div>

          <div className="panel-section">
            <h3>👨‍💻 Developer Profile</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Name:</label>
                <span>{systemData.developer.name}</span>
              </div>
              <div className="info-item">
                <label>Title:</label>
                <span>{systemData.developer.title}</span>
              </div>
              <div className="info-item">
                <label>Experience:</label>
                <span>{systemData.developer.experience}</span>
              </div>
              <div className="info-item">
                <label>Education:</label>
                <span>{systemData.developer.education}</span>
              </div>
            </div>
          </div>

          <div className="panel-section">
            <h3>🔧 Technical Skills</h3>
            <div className="skills-grid">
              <div className="skill-category">
                <h4>Languages</h4>
                <ul>
                  {systemData.technical.languages.map((lang, index) => (
                    <li key={index}>{lang}</li>
                  ))}
                </ul>
              </div>
              <div className="skill-category">
                <h4>Frameworks</h4>
                <ul>
                  {systemData.technical.frameworks.map((framework, index) => (
                    <li key={index}>{framework}</li>
                  ))}
                </ul>
              </div>
              <div className="skill-category">
                <h4>Databases</h4>
                <ul>
                  {systemData.technical.databases.map((db, index) => (
                    <li key={index}>{db}</li>
                  ))}
                </ul>
              </div>
              <div className="skill-category">
                <h4>Tools</h4>
                <ul>
                  {systemData.technical.tools.map((tool, index) => (
                    <li key={index}>{tool}</li>
                  ))}
                </ul>
              </div>
              <div className="skill-category">
                <h4>Cloud Services</h4>
                <ul>
                  {systemData.technical.cloud.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="panel-section">
            <h3>📦 Applications</h3>
            <div className="applications-list">
              {systemData.applications.map((app, index) => (
                <div className="app-item" key={index}>
                  <div className="app-icon">📁</div>
                  <div className="app-details">
                    <h4>{app.name} {app.version}</h4>
                    <p>{app.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="sysinfo-statusbar">
        <div className="status-item">System Information Ready</div>
      </div>
    </div>
  )
}

export default SystemInfo
