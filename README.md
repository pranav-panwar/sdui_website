# Jetpack SDUI Studio Pro v3.2 - React Full Website

A complete, production-ready React website for designing server-driven UI layouts with live preview, property editing, and export functionality.

## 🚀 Features

✅ **Component Palette** - 8 layout components (Column, Row, Card, Text, Image, List, Grid, Button)
✅ **Tree View** - Visual hierarchy with component selection and deletion
✅ **Live Canvas** - Real-time preview of added components
✅ **Properties Editor** - Edit width, height, background, padding, and corner radius
✅ **Export Options** - JSON format for SDUIs, Kotlin format for Jetpack Compose
✅ **Toast Notifications** - User feedback on all actions
✅ **Dark Theme UI** - Professional design optimized for UI building
✅ **Fully Responsive** - Works on desktop and tablet
✅ **No Dependencies** - React & React-DOM only

## 📁 Project Structure

```
sdui-studio/
├── index.html              # Main HTML entry
├── vite.config.js         # Vite configuration
├── package.json           # Dependencies
├── src/
│   ├── index.jsx          # React entry point
│   ├── App.jsx            # Main app component
│   ├── App.css            # Global styles
│   └── components/
│       ├── Icons.jsx              # SVG Icons
│       ├── Header.jsx             # Top header bar
│       ├── ToolGrid.jsx           # Component tools grid
│       ├── TreeView.jsx           # Component tree
│       ├── Canvas.jsx             # Preview canvas
│       ├── PropertiesPanel.jsx    # Property editor
│       ├── ExportModal.jsx        # Export dialog
│       └── Toast.jsx              # Notification
```

## 🔧 Installation & Setup

### Option 1: Vite (Recommended - Fastest)

```bash
# 1. Create new Vite project
npm create vite@latest sdui-studio -- --template react
cd sdui-studio

# 2. Install dependencies
npm install

# 3. Copy all files from the project into src/
# - Replace src/App.jsx with App.jsx
# - Replace src/App.css with App.css
# - Replace src/index.jsx with index.jsx
# - Replace index.html with index.html
# - Create src/components/ folder
# - Add all component files

# 4. Run development server
npm run dev
# Opens at http://localhost:5173
```

### Option 2: Create React App

```bash
# 1. Create project
npx create-react-app sdui-studio
cd sdui-studio

# 2. Dependencies (already installed)

# 3. Copy all files into src/
# Follow same file structure as above

# 4. Start development server
npm start
# Opens at http://localhost:3000
```

## 📦 File Setup Instructions

### 1. Create src/components/ folder
```bash
mkdir src/components
```

### 2. Create these files in src/components/:
- Icons.jsx
- Header.jsx
- ToolGrid.jsx
- TreeView.jsx
- Canvas.jsx
- PropertiesPanel.jsx
- ExportModal.jsx
- Toast.jsx

### 3. Replace root files:
- src/index.jsx (or index.js)
- src/App.jsx (or App.js)
- src/App.css
- index.html

### 4. Install & run:
```bash
npm install
npm run dev  # Vite
# OR
npm start   # Create React App
```

## 🎯 How to Use

1. **Add Components**: Click any component in the left panel to add it
2. **Select Component**: Click in the tree view or canvas to select
3. **Edit Properties**: Modify width, height, background, padding, radius in right panel
4. **Delete**: Click trash icon next to component name
5. **Export**: Click "Export" button, choose JSON or Kotlin format
6. **Reset**: Clear all components and start fresh

## 🏗️ Component Architecture

### App.jsx (Main Component)
- State management for components and properties
- Event handlers for add/delete/update operations
- Layout orchestration

### Header.jsx
- Logo and version badge
- Export and Reset buttons

### ToolGrid.jsx
- Grid of available components
- Click to add new component

### TreeView.jsx
- Hierarchical view of added components
- Delete buttons for each component

### Canvas.jsx
- Live preview area
- Shows all added components
- Click to select

### PropertiesPanel.jsx
- Input fields for component properties
- Real-time update on change

### ExportModal.jsx
- Modal dialog for export options
- JSON and Kotlin export buttons

### Toast.jsx
- Notification component
- Auto-hides after 3 seconds

## 📤 Export Formats

### JSON Export
```json
{
  "components": [
    {
      "id": 1,
      "name": "Column 1",
      "type": "col",
      "children": []
    }
  ],
  "properties": {
    "1": {
      "width": "100%",
      "height": "wrap",
      "bg": "#FF5722",
      "padding": "16dp"
    }
  }
}
```

### Kotlin Export
```kotlin
// Jetpack Compose SDUI Layout

@Composable
fun SDUIScreen() {
    col() {
        // Configure component here
        .width("100%")
        .height("wrap")
        .padding(16dp)
    }
}
```

## 🎨 Customization

### Colors
Edit variables in `src/App.css`:
```css
:root {
  --bg-app: #0f172a;
  --primary: #3b82f6;
  --success: #10b981;
  /* ... more colors */
}
```

### Add New Components
1. Update `tools` array in `App.jsx`
2. Add icon to `Icons.jsx`
3. Handle new type in export functions

### Styling
- All styles in `src/App.css`
- CSS variables for theming
- Responsive design with flexbox

## 🚢 Production Build

### Vite
```bash
npm run build
# Output: dist/ folder

# Preview production build
npm run preview
```

### Create React App
```bash
npm run build
# Output: build/ folder
```

## 🌐 Deployment

### Deploy to Vercel (Fastest)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag & drop dist/ folder to Netlify
```

### Deploy to GitHub Pages
```bash
# Update package.json: "homepage": "https://username.github.io/sdui-studio"
npm run build
npm install --save-dev gh-pages
# Add to package.json scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d build"
npm run deploy
```

### Self-Host
```bash
# Build production
npm run build

# Serve dist folder with any static server
python -m http.server 8000
# Open http://localhost:8000
```

## 🔥 Technologies

- **React 18** - UI library
- **Vite** - Build tool (or CRA)
- **CSS3** - Styling with CSS variables
- **JavaScript ES6+** - Modern JS features

## 📝 Key Features Explained

### Real-time State Management
Uses React hooks (useState) for:
- Selected component tracking
- Properties storage
- Component list management
- Modal and notification states

### Component Hierarchy
Each component has:
- Unique ID
- Name
- Type (col, row, card, text, etc.)
- Children array (for nesting)

### Property Editing
Support for:
- Width (%, dp, px)
- Height (wrap, dp, px)
- Background color
- Padding values
- Corner radius

### Export Functionality
- JSON: Complete layout structure for SDUI frameworks
- Kotlin: Ready-to-use Jetpack Compose code

## 🐛 Troubleshooting

### Port already in use
```bash
# Vite
npm run dev -- --port 3001

# CRA
PORT=3001 npm start
```

### Module not found
Ensure all files are in correct locations:
- Components in `src/components/`
- App.jsx in `src/`
- index.jsx in `src/`

### Styles not loading
Check that `App.css` is imported in `index.jsx`:
```javascript
import './App.css'
```

## 📚 Learning Resources

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Jetpack Compose](https://developer.android.com/jetpack/compose)

## 💡 Next Steps

1. Run the development server
2. Experiment with adding components
3. Edit properties in real-time
4. Export to JSON/Kotlin
5. Deploy to production

## 📄 License

MIT License - Use freely

## 🤝 Support

For issues or questions:
1. Check troubleshooting section
2. Review component documentation
3. Check console for errors
4. Verify file structure matches

---

**Ready to use!** 🎉 Follow the installation steps above and start building!
