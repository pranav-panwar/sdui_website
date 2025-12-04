# Jetpack SDUI Studio Pro - React Project Setup

## Quick Start

### Option 1: Using Vite (Recommended - Fastest)

```bash
# Create project
npm create vite@latest sdui-studio -- --template react
cd sdui-studio

# Install dependencies
npm install

# Copy files
# Replace src folder contents with provided files

# Run dev server
npm run dev
```

### Option 2: Using Create React App

```bash
# Create project
npx create-react-app sdui-studio
cd sdui-studio

# Install dependencies (already included)

# Copy files
# Replace src folder contents with provided files

# Run dev server
npm start
```

## Project Structure

```
sdui-studio/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Icons.jsx
│   │   ├── ToolGrid.jsx
│   │   ├── TreeView.jsx
│   │   ├── Canvas.jsx
│   │   ├── PropertiesPanel.jsx
│   │   ├── Header.jsx
│   │   └── ExportModal.jsx
│   ├── App.jsx
│   ├── App.css
│   └── index.jsx
├── package.json
└── README.md
```

## Features

✅ Add/Remove Components
✅ Edit Properties in Real-time
✅ Export to JSON & Kotlin
✅ Tree View Component Hierarchy
✅ Live Canvas Preview
✅ Toast Notifications
✅ Dark Theme UI
✅ Fully Responsive

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Production Build

```bash
npm run build
# Output: dist/ folder (ready to deploy)
```

Deploy to Vercel, Netlify, GitHub Pages, or any static host.
