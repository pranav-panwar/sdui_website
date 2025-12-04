import React from 'react'

function ToolGrid({ tools, Icons, onAddComponent }) {
  return (
    <div className="tool-grid">
      {tools.map((tool) => {
        const IconComponent = Icons[tool.icon]
        return (
          <div
            key={tool.id}
            className="tool-item"
            draggable
            onClick={() => onAddComponent(tool.id)}
            title={`Add ${tool.name}`}
          >
            {IconComponent && <IconComponent />}
            <div className="tool-item-label">{tool.name}</div>
          </div>
        )
      })}
    </div>
  )
}

export default ToolGrid
