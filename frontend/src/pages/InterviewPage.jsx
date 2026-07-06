import React from 'react'
import SpeechToText from '../components/SpeechToText.jsx'

export default function InterviewPage({
  questions,
  currentIdx,
  answers,
  setAnswers,
  role,
  difficulty,
  demoMode,
  isRecording,
  micStatus,
  onToggleRecording,
  onPrev,
  onNext,
  onSubmit
}) {
  const currentQuestion = questions[currentIdx] || {}
  const currentAnswer = answers[currentQuestion.id] || ''

  return (
    <div className="glass-card wide">
      <div className="interview-meta">
        <div>
          <span className="role-tag">{role}</span>
          <span style={{ color: 'var(--text-muted)', margin: '0 0.5rem' }}>•</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>{difficulty}</span>
          {demoMode && (
            <span style={{ 
              marginLeft: '0.75rem', 
              fontSize: '0.75rem', 
              padding: '0.1rem 0.5rem', 
              borderRadius: '4px', 
              background: 'rgba(6, 182, 212, 0.15)', 
              color: 'var(--accent-secondary)' 
            }}>
              Demo Mode
            </span>
          )}
        </div>
        <span className="progress-counter">Question {currentIdx + 1} of {questions.length}</span>
      </div>

      <div className="progress-container">
        <div 
          className="progress-bar" 
          style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="question-text">
        {currentQuestion.question}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="answer-area">Your Response</label>
        <div className="answer-box-wrapper">
          <textarea
            id="answer-area"
            className="input-field answer-textarea"
            placeholder="Type your response here or click the microphone button below to dictate your answer..."
            value={currentAnswer}
            onChange={(e) => setAnswers(prev => ({ ...prev, [currentQuestion.id]: e.target.value }))}
          />
        </div>
      </div>

      {/* Web Speech Panel */}
      <SpeechToText 
        isRecording={isRecording}
        micStatus={micStatus}
        onToggleRecording={onToggleRecording}
      />

      {/* Nav buttons */}
      <div className="action-controls">
        <button 
          type="button" 
          className="btn-secondary" 
          onClick={onPrev}
          disabled={currentIdx === 0}
        >
          Previous
        </button>

        <div className="action-right">
          {currentIdx < questions.length - 1 ? (
            <button 
              type="button" 
              className="btn-primary" 
              style={{ marginTop: 0 }}
              onClick={onNext}
            >
              Next Question
            </button>
          ) : (
            <button 
              type="button" 
              className="btn-primary" 
              style={{ marginTop: 0, background: 'linear-gradient(135deg, var(--success), var(--accent-primary))' }}
              onClick={onSubmit}
            >
              Submit & Evaluate
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
