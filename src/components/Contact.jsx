import React, { useState } from 'react'
import './Contact.css'

const Contact = () => {
  const [selectedContact, setSelectedContact] = useState('personal')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const contacts = {
    personal: {
      name: 'Professional Developer',
      title: 'Senior Full Stack Developer',
      email: 'contact@developer.pro',
      phone: '+1 (555) 123-4567',
      location: 'Available Worldwide (Remote)',
      linkedin: 'https://linkedin.com/in/professional-developer',
      github: 'https://github.com/professional-dev',
      website: 'https://developer-portfolio.pro',
      twitter: 'https://twitter.com/dev_professional',
      availability: 'Available for new projects'
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real application, you would send this data to a server
    alert('Thank you for your message! I\'ll get back to you soon.')
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  return (
    <div className="contact">
      <div className="addressbook-toolbar">
        <div className="toolbar-section">
          <button className="toolbar-button" title="New Contact">👤</button>
          <button className="toolbar-button" title="New Group">👥</button>
        </div>
        <div className="toolbar-separator"></div>
        <div className="toolbar-section">
          <button className="toolbar-button" title="Properties">📋</button>
          <button className="toolbar-button" title="Delete">🗑️</button>
        </div>
        <div className="toolbar-separator"></div>
        <div className="toolbar-section">
          <button className="toolbar-button" title="Send Mail">📧</button>
          <button className="toolbar-button" title="Dial">📞</button>
        </div>
      </div>

      <div className="addressbook-content">
        <div className="contacts-sidebar">
          <div className="contacts-header">
            <h3>📇 Address Book</h3>
          </div>
          <div className="contacts-list">
            <div 
              className={`contact-item ${selectedContact === 'personal' ? 'selected' : ''}`}
              onClick={() => setSelectedContact('personal')}
            >
              <span className="contact-icon">👤</span>
              <span className="contact-name">{contacts.personal.name}</span>
            </div>
          </div>
        </div>

        <div className="contact-details">
          <div className="contact-card">
            <div className="contact-header">
              <div className="contact-avatar">👤</div>
              <div className="contact-info">
                <h2>{contacts.personal.name}</h2>
                <p className="contact-title">{contacts.personal.title}</p>
              </div>
            </div>

            <div className="contact-fields">
              <div className="field-group">
                <h4>📧 Contact Information</h4>
                <div className="field">
                  <label>Email:</label>
                  <span>{contacts.personal.email}</span>
                </div>
                <div className="field">
                  <label>Phone:</label>
                  <span>{contacts.personal.phone}</span>
                </div>
                <div className="field">
                  <label>Location:</label>
                  <span>{contacts.personal.location}</span>
                </div>
                <div className="field">
                  <label>Status:</label>
                  <span style={{color: '#008000', fontWeight: 'bold'}}>{contacts.personal.availability}</span>
                </div>
              </div>

              <div className="field-group">
                <h4>🌐 Online Presence</h4>
                <div className="field">
                  <label>LinkedIn:</label>
                  <a href={contacts.personal.linkedin} target="_blank" rel="noopener noreferrer">
                    Professional Profile
                  </a>
                </div>
                <div className="field">
                  <label>GitHub:</label>
                  <a href={contacts.personal.github} target="_blank" rel="noopener noreferrer">
                    Code Repositories
                  </a>
                </div>
                <div className="field">
                  <label>Website:</label>
                  <a href={contacts.personal.website} target="_blank" rel="noopener noreferrer">
                    Portfolio Website
                  </a>
                </div>
                <div className="field">
                  <label>Twitter:</label>
                  <a href={contacts.personal.twitter} target="_blank" rel="noopener noreferrer">
                    Tech Updates
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <h3>📝 Send Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-field">
                <label htmlFor="subject">Subject:</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-field">
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              
              <div className="form-buttons">
                <button type="submit" className="send-button">
                  📧 Send Message
                </button>
                <button 
                  type="button" 
                  className="clear-button"
                  onClick={() => setFormData({ name: '', email: '', subject: '', message: '' })}
                >
                  🗑️ Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="addressbook-statusbar">
        <div className="status-item">1 contact(s)</div>
        <div className="status-item">Ready</div>
      </div>
    </div>
  )
}

export default Contact
