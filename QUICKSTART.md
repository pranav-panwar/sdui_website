# ⚡ Quick Start Guide - 5 Minutes

## The Fastest Way to Get Running

### Step 1: Copy This Command
```bash
npm create vite@latest sdui-studio -- --template react && cd sdui-studio && npm install
```

### Step 2: Replace Files
Copy these files into your `sdui-studio` project:

**Root level files:**
- `index.html` → Replace existing
- `vite.config.js` → Replace existing  
- `package.json` → Replace existing (then run `npm install`)

**src/ folder:**
- `src/index.jsx` → Replace `src/main.jsx` or `src/index.jsx`
- `src/App.jsx` → Replace existing
- `src/App.css` → Replace existing

**src/components/ folder (create it first):**
```bash
mkdir src/components
```

Then add these files:
- `src/components/Icons.jsx`
- `src/components/Header.jsx`
- `src/components/ToolGrid.jsx`
- `src/components/TreeView.jsx`
- `src/components/Canvas.jsx`
- `src/components/PropertiesPanel.jsx`
- `src/components/ExportModal.jsx`
- `src/components/Toast.jsx`

### Step 3: Start Dev Server
```bash
npm run dev
```

It will open at `http://localhost:5173` automatically! 🎉

## What You Get

✅ Fully working SDUI Studio
✅ All 8 components ready to use
✅ Real-time property editing
✅ Export to JSON & Kotlin
✅ Beautiful dark theme UI
✅ No additional dependencies needed

## File Organization Checklist

```
sdui-studio/
├── ✓ index.html
├── ✓ vite.config.js
├── ✓ package.json
├── ✓ .gitignore
├── ✓ src/
│   ├── ✓ index.jsx
│   ├── ✓ App.jsx
│   ✓ App.css
│   └── ✓ components/
│       ├── ✓ Icons.jsx
│       ├── ✓ Header.jsx
│       ├── ✓ ToolGrid.jsx
│       ├── ✓ TreeView.jsx
│       ├── ✓ Canvas.jsx
│       ├── ✓ PropertiesPanel.jsx
│       ├── ✓ ExportModal.jsx
│       └── ✓ Toast.jsx
```

## Common Issues & Fixes

### "Module not found"
✓ Ensure all component files are in `src/components/`
✓ Check file names match exactly (case-sensitive)
✓ Try deleting `node_modules` and running `npm install` again

### "Port 5173 already in use"
```bash
npm run dev -- --port 3000
```

### "Styles not loading"
✓ Verify `App.css` is imported in `src/index.jsx`
✓ Check CSS file path is correct

### "React is not defined"
✓ Ensure `import React from 'react'` is at top of component files

## Deploy in 2 Minutes

### Vercel (Easiest)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag dist/ folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Push to GitHub, enable Pages in settings, select dist folder
```

## Next Steps

1. ✅ Install & run locally
2. ✅ Add some components
3. ✅ Edit their properties
4. ✅ Export as JSON/Kotlin
5. ✅ Deploy to production

## Pro Tips

💡 **Save your layouts** - Export JSON regularly
💡 **Edit colors** - Modify CSS variables in App.css
💡 **Extend components** - Add new types to tools array
💡 **Mobile first** - Test on tablet for responsive design

---

**That's it! You're ready to go! 🚀**

Questions? Check README.md for detailed docs.
