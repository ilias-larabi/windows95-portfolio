import React, { useState } from 'react'
import './Projects.css'

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = [
    {
      id: 1,
      name: 'NutsTree E-commerce',
      type: 'folder',
      icon: '🛒',
      description: 'Clean and responsive e-commerce site for organic nut products in Morocco',
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      github: 'Available upon request',
      demo: 'https://nutstree.ma/c',
      details: 'A professional e-commerce website for NutsTree, featuring a clean and responsive design tailored for organic nut products in the Moroccan market. The site includes product showcase, shopping cart functionality, and an elegant user interface designed for local customers. Built with vanilla web technologies for optimal performance and SEO.'
    },
    {
      id: 2,
      name: 'Document Management System',
      type: 'folder',
      icon: '📄',
      description: 'Full-stack system for organizing and managing Word documents',
      technologies: ['Django', 'Django Ninja', 'React', 'TypeScript', 'PostgreSQL', 'Supabase'],
      github: 'Available upon request',
      demo: 'Under development',
      details: 'DocManager is a comprehensive document management system designed to organize, import, and export Word documents with advanced category management. Features include a modern React frontend with TypeScript, Django backend with API integration, admin panel for document control, and PostgreSQL database with Supabase hosting. Currently under active development with modern UI/UX design.'
    },
    {
      id: 3,
      name: 'Smart Parc Fleet Management',
      type: 'folder',
      icon: '🚗',
      description: 'Digital platform for company vehicle fleet management',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
      github: 'Available upon request',
      demo: 'Internal deployment',
      details: 'A comprehensive fleet management system designed to modernize vehicle fleet operations. Features include vehicle reservation and return system, maintenance tracking, user and admin role management, dashboard with real-time vehicle status, activity logs, and secure authentication. Successfully deployed and tested during internship, contributing to both UI/UX design and backend logic development.'
    },
    {
      id: 4,
      name: 'School Management System',
      type: 'folder',
      icon: '🏫',
      description: 'Student records and administration management system',
      technologies: ['C', 'JavaScript', 'HTML', 'CSS'],
      github: 'Available upon request',
      demo: 'Console/Web demo available',
      details: 'A versatile management system for handling student records, grades, and administrative tasks. Available in both console-based (C) and web-based (JavaScript) versions. Features include CRUD operations for student data, grade management, user-friendly interface, and modular architecture for easy maintenance and expansion.'
    },
    {
      id: 5,
      name: 'Hospital Management System',
      type: 'folder',
      icon: '🏥',
      description: 'Basic system for patient data and appointment management',
      technologies: ['C'],
      github: 'Available upon request',
      demo: 'Console demo available',
      details: 'A fundamental hospital management system built in C for handling essential healthcare operations. Features include patient and doctor registration, appointment scheduling and management, structured data organization, and efficient memory management. Demonstrates strong programming fundamentals and understanding of healthcare workflow requirements.'
    },
    {
      id: 6,
      name: 'Windows 95 Portfolio',
      type: 'folder',
      icon: '🖥️',
      description: 'Retro Windows 95-style interactive portfolio (this site!)',
      technologies: ['React', 'CSS3', 'Vite', 'JavaScript', 'Web Audio API'],
      github: 'https://github.com/ilias-larabi/windows95-portfolio',
      demo: 'https://ilias-larabi.github.io/windows95-portfolio/',
      details: 'A nostalgic and fully interactive Windows 95-inspired portfolio website featuring authentic desktop environment, working applications (Calculator, Minesweeper, File Manager), sound effects, and professional showcase. Built with modern React architecture while maintaining pixel-perfect retro aesthetics. Includes draggable windows, taskbar functionality, and responsive design.'
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
