import React from 'react'
import RadialScore from '../components/RadialScore.jsx'
import FeedbackCard from '../components/FeedbackCard.jsx'

export default function ResultsPage({
  evaluationResults,
  expandedResults,
  onToggleAccordion,
  onRestart
}) {
  return (
    <div className="glass-card wide">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1.25rem' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', margin: 0 }}>Interview Scorecard</h2>
        <button 
          type="button" 
          className="btn-secondary" 
          onClick={onRestart}
        >
          Start New Interview
        </button>
      </div>

      <div className="results-grid">
        {/* Overall summary card */}
        <div className="results-summary-card">
          <RadialScore score={evaluationResults.overallScore} />

          <div className="summary-details">
            <h3 className="summary-heading">Overall Performance Assessment</h3>
            <p className="summary-text">{evaluationResults.summary}</p>
          </div>
        </div>

        {/* Individual QA Breakdown */}
        <div>
          <h3 className="qa-breakdown-heading">Detailed Question Evaluation</h3>
          
          {evaluationResults.results && evaluationResults.results.map((item, idx) => (
            <FeedbackCard 
              key={idx}
              item={item}
              idx={idx}
              isExpanded={!!expandedResults[idx]}
              onToggle={() => onToggleAccordion(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
