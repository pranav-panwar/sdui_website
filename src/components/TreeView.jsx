import React from 'react'
import Icons from './Icons'

function TreeView({ components, selectedNode, onSelectNode, onDeleteComponent }) {
  return (
    <div className="tree-section">
      <div className="panel-header">🌳 Tree</div>
      {components.map((comp) => (
        <div
          key={comp.id}
          className={`tree-node ${selectedNode === comp.id ? 'selected' : ''}`}
          onClick={() => onSelectNode(comp.id)}
        >
          <span>{comp.name}</span>
          <button
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation()
              onDeleteComponent(comp.id)
            }}
          >
            <Icons.Trash />
          </button>
        </div>
      ))}
    </div>
  )
}

export default TreeView
