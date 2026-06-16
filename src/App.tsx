import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [text, setText] = useState<string>('')
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoice, setSelectedVoice] = useState<string>('')

  // get voices from browser
  useEffect(() => {
    const initVoices = () => {
      const list = window.speechSynthesis.getVoices()
      setVoices(list)
      
      // default to english or first available
      const defaultVoice = list.find(v => v.lang.includes('en')) || list[0]
      if (defaultVoice) setSelectedVoice(defaultVoice.name)
    }

    initVoices()
    window.speechSynthesis.onvoiceschanged = initVoices
  }, [])

  // main speak function
  const handleSpeak = () => {
    if (!text.trim() || isSpeaking) return

    const utterance = new SpeechSynthesisUtterance(text)
    const activeVoice = voices.find(v => v.name === selectedVoice)
    
    if (activeVoice) utterance.voice = activeVoice

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }

  // handle enter key press inside textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // send on enter, shift+enter for new line
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault() // stop creating new line in textarea
      handleSpeak()
    }
  }

  return (
    <div className="card-container">
      <h2>AI Voice Deck 🎙️</h2>
      <p className="subtitle">Convert your text into realistic speech instantly</p>

      <div className="select-container">
        <label>Choose Voice:</label>
        <select
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
        >
          {voices.map((v) => (
            <option key={v.name} value={v.name}>
              {v.name} ({v.lang})
            </option>
          ))}
        </select>
      </div>

      <textarea
        placeholder="Type something here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button 
        onClick={handleSpeak} 
        disabled={isSpeaking || !text.trim()}
        className={isSpeaking ? 'speaking' : ''}
      >
        {isSpeaking ? 'Speaking...' : 'Generate Voice'}
      </button>
    </div>
  )
}

export default App