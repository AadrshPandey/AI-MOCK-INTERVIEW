import React from 'react'

const SUGGESTED_ROLES = [
  "Frontend Engineer",
  "Backend Engineer",
  "Fullstack Developer",
  "React Developer",
  "Data Scientist",
  "Product Manager",
  "DevOps Engineer"
]

export default function SetupPage({
  role,
  setRole,
  difficulty,
  setDifficulty,
  count,
  setCount,
  demoMode,
  setDemoMode,
  setupError,
  isGenerating,
  onSubmit
}) {
  return (
    <div className="glass-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', margin: 0 }}>Configure Your Session</h2>
        <label style={{ display: 'inline-flex', alignItems: 'center', fontSize: '0.85rem', cursor: 'pointer', color: 'var(--accent-secondary)' }}>
          <input
            type="checkbox"
            style={{ marginRight: '0.5rem', accentColor: 'var(--accent-secondary)' }}
            checked={demoMode}
            onChange={(e) => setDemoMode(e.target.checked)}
          />
          Demo Mode (Simulated AI)
        </label>
      </div>
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="role">Target Job Role</label>
          <input
            id="role"
            type="text"
            className="input-field"
            placeholder="e.g. Frontend Developer, Python Engineer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <span className="suggestion-label">Popular Suggestions:</span>
          <div className="chips-container">
            {SUGGESTED_ROLES.map((r, i) => (
              <button
                key={i}
                type="button"
                className="suggestion-chip"
                onClick={() => setRole(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.75rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="difficulty">Difficulty Level</label>
            <select
              id="difficulty"
              className="input-field"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="Entry Level">Entry Level</option>
              <option value="Mid Level">Mid Level</option>
              <option value="Senior">Senior</option>
              <option value="Lead">Lead</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="count">Number of Questions</label>
            <select
              id="count"
              className="input-field"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
            >
              <option value={3}>3 Questions</option>
              <option value={5}>5 Questions</option>
              <option value={8}>8 Questions</option>
              <option value={10}>10 Questions</option>
            </select>
          </div>
        </div>

        {setupError && (
          <div style={{ color: 'var(--danger)', fontSize: '0.9rem', marginBottom: '1.5rem', fontWeight: 500, lineHeight: 1.4 }}>
            ⚠️ {setupError}
          </div>
        )}

        <button type="submit" className="btn-primary" disabled={isGenerating}>
          {isGenerating ? (
            <>
              <span style={{ marginRight: '0.5rem' }}>Generating Interview Questions...</span>
              <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>({demoMode ? 'Simulating' : 'Invoking Gemini model'})</span>
            </>
          ) : "Start Mock Interview"}
        </button>
      </form>
    </div>
  )
}
