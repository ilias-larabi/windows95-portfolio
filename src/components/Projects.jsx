import React, { useState } from 'react'
import './Projects.css'

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = [
    {
      id: 1,
      name: 'Enterprise SaaS Platform',
      type: 'folder',
      icon: '📁',
      description: 'Scalable multi-tenant SaaS application with advanced analytics',
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'AWS'],
      github: 'https://github.com/professional-dev/saas-platform',
      demo: 'https://saas-platform-demo.pro',
      details: 'A comprehensive SaaS platform serving 10,000+ users with real-time analytics, multi-tenant architecture, advanced user management, subscription billing, and enterprise-grade security. Features include role-based access control, API rate limiting, automated backups, and 99.9% uptime SLA.'
    },
    {
      id: 2,
      name: 'AI-Powered Analytics Dashboard',
      type: 'folder',
      icon: '📁',
      description: 'Machine learning analytics platform with predictive insights',
      technologies: ['React', 'Python', 'TensorFlow', 'FastAPI', 'Docker'],
      github: 'https://github.com/professional-dev/ai-analytics',
      demo: 'https://ai-analytics-demo.pro',
      details: 'Advanced analytics platform processing 1M+ data points daily with machine learning models for predictive analytics, automated reporting, and real-time data visualization. Includes custom ML pipelines, A/B testing framework, and automated anomaly detection.'
    },
    {
      id: 3,
      name: 'Microservices E-Commerce',
      type: 'folder',
      icon: '📁',
      description: 'High-performance e-commerce with microservices architecture',
      technologies: ['Node.js', 'Kubernetes', 'MongoDB', 'RabbitMQ', 'Stripe'],
      github: 'https://github.com/professional-dev/microservices-ecommerce',
      demo: 'https://ecommerce-demo.pro',
      details: 'Scalable e-commerce platform handling 50,000+ daily transactions with microservices architecture, event-driven design, automated scaling, payment processing, inventory management, and comprehensive order tracking system.'
    },
    {
      id: 4,
      name: 'Real-Time Collaboration Suite',
      type: 'folder',
      icon: '📁',
      description: 'Enterprise collaboration platform with real-time features',
      technologies: ['Vue.js', 'Socket.io', 'Redis', 'PostgreSQL', 'WebRTC'],
      github: 'https://github.com/professional-dev/collaboration-suite',
      demo: 'https://collaboration-demo.pro',
      details: 'Enterprise-grade collaboration platform with real-time document editing, video conferencing, team chat, file sharing, and project management. Supports 1000+ concurrent users with end-to-end encryption and enterprise SSO integration.'
    },
    {
      id: 5,
      name: 'Portfolio Website',
      type: 'folder',
      icon: '📁',
      description: 'Retro Windows 95-style portfolio (this site!)',
      technologies: ['React', 'CSS3', 'Vite', 'JavaScript'],
      github: 'https://github.com/yourusername/retro-portfolio',
      demo: 'https://your-portfolio-demo.com',
      details: 'A nostalgic Windows 95-inspired portfolio website with authentic UI elements and interactive desktop environment.'
    }
  ]

  const handleProjectClick = (project) => {
    setSelectedProject(project)
  }

  const handleBackClick = () => {
    setSelectedProject(null)
  }

  return (
    <div className="projects">
      <div className="explorer-toolbar">
        <div className="toolbar-section">
          <button 
            className="toolbar-button" 
            onClick={handleBackClick}
            disabled={!selectedProject}
            title="Back"
          >
            ◀
          </button>
          <button className="toolbar-button" title="Forward">▶</button>
          <button className="toolbar-button" title="Up">🔼</button>
        </div>
        <div className="toolbar-separator"></div>
        <div className="toolbar-section">
          <button className="toolbar-button" title="Cut">✂️</button>
          <button className="toolbar-button" title="Copy">📋</button>
          <button className="toolbar-button" title="Paste">📄</button>
        </div>
        <div className="toolbar-separator"></div>
        <div className="toolbar-section">
          <button className="toolbar-button" title="Delete">🗑️</button>
          <button className="toolbar-button" title="Properties">📋</button>
        </div>
        <div className="toolbar-separator"></div>
        <div className="view-buttons">
          <button className="toolbar-button active" title="Large Icons">🔲</button>
          <button className="toolbar-button" title="Small Icons">▫️</button>
          <button className="toolbar-button" title="List">📄</button>
          <button className="toolbar-button" title="Details">📊</button>
        </div>
      </div>

      <div className="explorer-address">
        <span className="address-label">Address:</span>
        <div className="address-path">
          <span className="path-segment">My Computer</span>
          <span className="path-separator">\</span>
          <span className="path-segment">Projects</span>
          {selectedProject && (
            <>
              <span className="path-separator">\</span>
              <span className="path-segment">{selectedProject.name}</span>
            </>
          )}
        </div>
      </div>

      <div className="explorer-content">
        {!selectedProject ? (
          <div className="projects-grid">
            {projects.map(project => (
              <div
                key={project.id}
                className="project-item"
                onDoubleClick={() => handleProjectClick(project)}
              >
                <div className="project-icon">{project.icon}</div>
                <div className="project-name">{project.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="project-details">
            <div className="project-header">
              <div className="project-large-icon">{selectedProject.icon}</div>
              <div className="project-info">
                <h2>{selectedProject.name}</h2>
                <p className="project-description">{selectedProject.description}</p>
              </div>
            </div>

            <div className="project-content">
              <div className="details-section">
                <h3>📋 Project Details</h3>
                <p>{selectedProject.details}</p>
              </div>

              <div className="tech-section">
                <h3>🛠️ Technologies Used</h3>
                <div className="tech-tags">
                  {selectedProject.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="links-section">
                <h3>🔗 Links</h3>
                <div className="project-links">
                  <a 
                    href={selectedProject.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <span className="link-icon">📂</span>
                    View Source Code
                  </a>
                  {selectedProject.demo && (
                    <a 
                      href={selectedProject.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <span className="link-icon">🌐</span>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="explorer-statusbar">
        <div className="status-item">
          {!selectedProject ? `${projects.length} object(s)` : 'Project Details'}
        </div>
        <div className="status-item">My Computer</div>
      </div>
    </div>
  )
}

export default Projects
