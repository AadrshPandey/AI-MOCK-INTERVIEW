import React from 'react'

export default function RadialScore({ score }) {
  const scoreVal = score || 0
  const color = (scoreVal >= 8) ? 'var(--success)' : (scoreVal >= 5) ? 'var(--warning)' : 'var(--danger)'
  
  return (
    <div className="score-chart-wrapper">
      <svg className="radial-progress-svg">
        <circle className="radial-bg" cx="75" cy="75" r="65"></circle>
        <circle 
          className="radial-bar" 
          cx="75" 
          cy="75" 
          r="65" 
          style={{
            strokeDasharray: 408,
            strokeDashoffset: 408 - (408 * scoreVal) / 10,
            stroke: color
          }}
        ></circle>
      </svg>
      <div className="score-text-overlay">
        <div className="score-number">{scoreVal}</div>
        <div className="score-total">/ 10</div>
      </div>
    </div>
  )
}
