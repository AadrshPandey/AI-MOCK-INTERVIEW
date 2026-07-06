import React from 'react'

export default function FeedbackCard({ item, idx, isExpanded, onToggle }) {
  const getScoreBadgeClass = (score) => {
    if (score >= 8) return 'score-badge high'
    if (score >= 5) return 'score-badge mid'
    return 'score-badge low'
  }

  return (
    <div className="qa-card">
      <div className="qa-header" onClick={onToggle}>
        <div className="qa-question-title">
          <span style={{ color: 'var(--accent-primary)', marginRight: '0.5rem', fontWeight: 'bold' }}>Q{idx + 1}.</span>
          {item.question}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className={getScoreBadgeClass(item.score)}>
            Score: {item.score}/10
          </span>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            style={{ 
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease'
            }}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>

      {isExpanded && (
        <div className="qa-body">
          <div className="qa-section">
            <div className="qa-section-label">Your Response</div>
            <div className="qa-text user-answer">
              {item.answer ? item.answer : <span style={{ color: 'var(--text-muted)' }}>No answer provided.</span>}
            </div>
          </div>

          <div className="qa-section">
            <div className="qa-section-label">AI Feedback</div>
            <div className="qa-text feedback">{item.feedback}</div>
          </div>

          <div className="qa-section">
            <div className="qa-section-label">Actionable Improvement</div>
            <div className="qa-text improvement">💡 {item.improvement}</div>
          </div>
        </div>
      )}
    </div>
  )
}
