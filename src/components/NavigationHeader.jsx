import React, { useState, useEffect } from 'react'
import './NavigationHeader.css'

const NavigationHeader = () => {
  const [showBackButton, setShowBackButton] = useState(false)
  const [referrerInfo, setReferrerInfo] = useState(null)

  useEffect(() => {
    // Check if user came from external site or has history
    const referrer = document.referrer
    const hasHistory = window.history.length > 1
    
    if (referrer && (referrer.includes('nutstree.ma') || referrer.includes('3d-portfolio-website'))) {
      setShowBackButton(true)
      if (referrer.includes('nutstree.ma')) {
        setReferrerInfo('NutsTree')
      } else if (referrer.includes('3d-portfolio-website')) {
        setReferrerInfo('Portfolio 3D')
      }
    } else if (hasHistory) {
      setShowBackButton(true)
    }
  }, [])

  const handleBackNavigation = () => {
    // Try to go back in history first
    if (window.history.length > 1) {
      window.history.back()
    } else {
      // Fallback to main portfolio
      window.location.href = 'https://ilias-larabi.github.io/3d-portfolio-website/'
    }
  }

  const handleBackToMainPortfolio = () => {
    // Always go to main 3D portfolio
    window.location.href = 'https://ilias-larabi.github.io/3d-portfolio-website/'
  }

  return (
    <div className="navigation-header">
      <div className="nav-buttons">
        {showBackButton && (
          <button 
            className="back-button"
            onClick={handleBackNavigation}
            title={referrerInfo ? `Retour à ${referrerInfo}` : "Retour"}
          >
            <span className="back-icon">←</span>
            <span className="back-text">
              {referrerInfo ? `← ${referrerInfo}` : "← Retour"}
            </span>
          </button>
        )}
        <button 
          className="home-button"
          onClick={handleBackToMainPortfolio}
          title="Portfolio Principal 3D"
        >
          <span className="home-icon">🏠</span>
          <span className="home-text">Portfolio 3D</span>
        </button>
      </div>
      <div className="portfolio-title">
        <span className="title-icon">🖥️</span>
        <span>Windows 95 Portfolio</span>
      </div>
    </div>
  )
}

export default NavigationHeader
