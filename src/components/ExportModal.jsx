import React from 'react'

function ExportModal({ onClose, onExportJSON, onExportKotlin }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">📥 Export Layout</div>
        <div style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--text-muted)' }}>
          Choose export format:
        </div>
        <div className="modal-buttons">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn" onClick={onExportJSON}>
            JSON
          </button>
          <button className="btn" onClick={onExportKotlin}>
            Kotlin
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExportModal
