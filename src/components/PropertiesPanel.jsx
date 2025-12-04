import React from 'react'

function PropertiesPanel({ selectedNode, properties, onUpdateProperty }) {
  if (selectedNode === null) {
    return <div className="no-selection">Select a component to edit</div>
  }

  const props = properties[selectedNode] || {}

  return (
    <div className="properties-panel">
      <div className="prop-group">
        <label className="prop-label">Width</label>
        <input
          type="text"
          className="prop-input"
          placeholder="e.g., 100%, 200dp"
          value={props.width || ''}
          onChange={(e) => onUpdateProperty('width', e.target.value)}
        />
      </div>

      <div className="prop-group">
        <label className="prop-label">Height</label>
        <input
          type="text"
          className="prop-input"
          placeholder="e.g., wrap, 100dp"
          value={props.height || ''}
          onChange={(e) => onUpdateProperty('height', e.target.value)}
        />
      </div>

      <div className="prop-group">
        <label className="prop-label">Background</label>
        <input
          type="text"
          className="prop-input"
          placeholder="e.g., #FF5722"
          value={props.bg || ''}
          onChange={(e) => onUpdateProperty('bg', e.target.value)}
        />
      </div>

      <div className="prop-group">
        <label className="prop-label">Padding</label>
        <input
          type="text"
          className="prop-input"
          placeholder="e.g., 16dp"
          value={props.padding || ''}
          onChange={(e) => onUpdateProperty('padding', e.target.value)}
        />
      </div>

      <div className="prop-group">
        <label className="prop-label">Corner Radius</label>
        <input
          type="text"
          className="prop-input"
          placeholder="e.g., 8dp"
          value={props.radius || ''}
          onChange={(e) => onUpdateProperty('radius', e.target.value)}
        />
      </div>
    </div>
  )
}

export default PropertiesPanel
