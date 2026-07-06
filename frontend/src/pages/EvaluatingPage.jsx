import React from 'react'

export default function EvaluatingPage({ loadingStep }) {
  return (
    <div className="glass-card">
      <div className="loading-wrapper">
        <div className="loading-spinner-glow">
          <div className="pulse-ring-1"></div>
          <div className="pulse-ring-2"></div>
          <div className="spinner-core">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="spinning">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </div>
        </div>
        
        <h2 className="loading-title">AI Evaluation In Progress</h2>
        <p style={{ color: 'var(--text-muted)' }}>Gemini is analyzing your technical answers for accuracy, depth, and clarity.</p>

        <div className="loading-steps">
          <div className={`loading-step-item ${loadingStep === 0 ? 'active' : 'done'}`}>
            <span className="step-icon">{loadingStep > 0 ? '✓' : '1'}</span>
            <span>Structuring candidate responses...</span>
          </div>
          <div className={`loading-step-item ${loadingStep === 1 ? 'active' : loadingStep > 1 ? 'done' : ''}`}>
            <span className="step-icon">{loadingStep > 1 ? '✓' : '2'}</span>
            <span>Consulting developer evaluation model...</span>
          </div>
          <div className={`loading-step-item ${loadingStep === 2 ? 'active' : loadingStep > 2 ? 'done' : ''}`}>
            <span className="step-icon">{loadingStep > 2 ? '✓' : '3'}</span>
            <span>Calculating scores & formatting improvement tips...</span>
          </div>
          <div className={`loading-step-item ${loadingStep === 3 ? 'active' : ''}`}>
            <span className="step-icon">4</span>
            <span>Finalizing scorecard details...</span>
          </div>
        </div>
      </div>
    </div>
  )
}
