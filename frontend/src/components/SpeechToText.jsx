import React from 'react'

export default function SpeechToText({ isRecording, micStatus, onToggleRecording }) {
  return (
    <div className="audio-panel">
      <button 
        type="button" 
        className={`mic-button ${isRecording ? 'recording' : ''}`}
        onClick={onToggleRecording}
        title={isRecording ? 'Click to stop recording' : 'Click to dictate answer'}
      >
        {isRecording ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
            <line x1="12" x2="12" y1="19" y2="22" />
          </svg>
        )}
      </button>
      <div className="mic-status">
        <div className="mic-status-title">{isRecording ? 'Speech to Text Active' : 'Dictate Your Answer'}</div>
        <div className="mic-status-desc">{micStatus}</div>
      </div>
    </div>
  )
}
