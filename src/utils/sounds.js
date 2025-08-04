// Windows 95 Sound Effects using Web Audio API
class SoundManager {
  constructor() {
    this.audioContext = null
    this.sounds = {}
    this.enabled = true
    this.initAudioContext()
  }

  initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    } catch (e) {
      console.warn('Web Audio API not supported')
      this.enabled = false
    }
  }

  // Generate Windows 95-style beep sounds
  generateBeep(frequency = 800, duration = 100, type = 'sine') {
    if (!this.enabled || !this.audioContext) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime)
    oscillator.type = type

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000)

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + duration / 1000)
  }

  // Windows 95 startup sound (simplified)
  playStartup() {
    if (!this.enabled) return
    
    const notes = [
      { freq: 523, duration: 200 }, // C5
      { freq: 659, duration: 200 }, // E5
      { freq: 784, duration: 200 }, // G5
      { freq: 1047, duration: 400 } // C6
    ]

    notes.forEach((note, index) => {
      setTimeout(() => {
        this.generateBeep(note.freq, note.duration, 'sine')
      }, index * 150)
    })
  }

  // Button click sound
  playClick() {
    this.generateBeep(1000, 50, 'square')
  }

  // Window open sound
  playWindowOpen() {
    this.generateBeep(800, 100, 'sine')
    setTimeout(() => this.generateBeep(1200, 80, 'sine'), 50)
  }

  // Window close sound
  playWindowClose() {
    this.generateBeep(1200, 80, 'sine')
    setTimeout(() => this.generateBeep(800, 100, 'sine'), 40)
  }

  // Error sound
  playError() {
    this.generateBeep(300, 300, 'sawtooth')
  }

  // Minimize sound
  playMinimize() {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        this.generateBeep(1000 - (i * 200), 60, 'triangle')
      }, i * 30)
    }
  }

  // Maximize sound
  playMaximize() {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        this.generateBeep(600 + (i * 200), 60, 'triangle')
      }, i * 30)
    }
  }

  // Navigation sound
  playNavigate() {
    this.generateBeep(880, 80, 'sine')
  }

  // Toggle sound on/off
  toggle() {
    this.enabled = !this.enabled
    if (this.enabled && !this.audioContext) {
      this.initAudioContext()
    }
  }
}

export const soundManager = new SoundManager()
