import { useState } from 'react'
import './App.css'

// Process environment variable via Vite
const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_KEY
// Используем проверенный рабочий голос George
const ROGER_VOICE_ID = 'JBFqnCBsd6RMkjVDRZzb'

function App() {
  const [text, setText] = useState<string>('')
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false)

  const handleSpeak = async () => {
    if (!text.trim() || isSpeaking) return

    try {
      setIsSpeaking(true)

      // Send text to ElevenLabs API
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ROGER_VOICE_ID}`, {
        method: 'POST',
        headers: {
          'accept': 'audio/mpeg',
          'content-type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('ElevenLabs detailed error:', errorData)
        throw new Error('API Error')
      }

      // Process and play the audio response
      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)
      const audio = new Audio(audioUrl)
      
      audio.onended = () => setIsSpeaking(false)
      await audio.play()

    } catch (error) {
      console.error(error)
      setIsSpeaking(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSpeak()
    }
  }

  return (
    <div className="card-container">
      <h2>AI Voice Deck 🎙️</h2>
      <p className="subtitle">ElevenLabs Neural Engine</p>

      {/* Плашка отцентрирована и находится строго НАД полем ввода */}
      <div className="voice-info">
        <span className="badge">Voice:</span> <strong>George (Official Default)</strong>
      </div>

      <textarea
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button 
        onClick={handleSpeak} 
        disabled={isSpeaking || !text.trim()}
        className={isSpeaking ? 'speaking' : ''}
      >
        {isSpeaking ? 'Generating...' : 'Generate'}
      </button>
    </div>
  )
}

export default App