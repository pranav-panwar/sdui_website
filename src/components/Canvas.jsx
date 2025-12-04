import React from 'react'

function Canvas({ components, selectedNode, onSelectComponent }) {
  return (
    <div className="main-canvas">
      <div className="canvas-content">
        <div className="canvas-placeholder">
          {components.length === 0
            ? '🎯 Add components to get started'
            : `📐 Preview: ${components.length} component${components.length !== 1 ? 's' : ''} added`}
        </div>
        {components.map((comp) => (
          <div
            key={comp.id}
            className={`component-preview ${selectedNode === comp.id ? 'selected' : ''}`}
            onClick={() => onSelectComponent(comp.id)}
          >
            [{comp.type.toUpperCase()}] {comp.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Canvas
