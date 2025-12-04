import React from 'react'

function Header({ onExport, onReset }) {
  return (
    <div className="header-bar">
      <div className="logo">
        🎨 SDUI Studio Pro
        <span className="version-badge">v3.2</span>
      </div>
      <div className="action-buttons">
        <button className="btn btn-secondary" onClick={onExport}>
          📥 Export
        </button>
        <button className="btn" onClick={onReset}>
          🔄 Reset
        </button>
      </div>
    </div>
  )
}

export default Header
