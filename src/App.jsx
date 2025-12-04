import React, { useState, useEffect, useMemo } from 'react';

// --- Icons ---
const Icons = {
  Col: () => <svg viewBox="0 0 24 24" className="icon"><path d="M4 4h16v16H4V4zm2 2v12h12V6H6z"/></svg>,
  Row: () => <svg viewBox="0 0 24 24" className="icon"><path d="M3 13h18v-2H3v2z"/></svg>,
  Card: () => <svg viewBox="0 0 24 24" className="icon"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"/></svg>,
  Text: () => <svg viewBox="0 0 24 24" className="icon"><path d="M5 17h14v-2H5v2zm0-4h14v-2H5v2zm0-4h14V7H5v2z"/></svg>,
  Image: () => <svg viewBox="0 0 24 24" className="icon"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>,
  List: () => <svg viewBox="0 0 24 24" className="icon"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>,
  Grid: () => <svg viewBox="0 0 24 24" className="icon"><path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"/></svg>,
  Btn: () => <svg viewBox="0 0 24 24" className="icon"><path d="M19 6h-2c0-2.76-2.24-5-5-5s-5 2.24-5 5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>,
  Icon: () => <svg viewBox="0 0 24 24" className="icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>,
  Chip: () => <svg viewBox="0 0 24 24" className="icon"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>,
  Trash: () => <svg viewBox="0 0 24 24" className="icon"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>,
  Copy: () => <svg viewBox="0 0 24 24" className="icon"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2z"/></svg>,
  Upload: () => <svg viewBox="0 0 24 24" className="icon"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/></svg>
};

// --- CSS ---
const STYLES = `
  :root {
    --bg-app: #0f172a; --bg-panel: #1e293b; --bg-input: #020617;
    --border: #334155; --primary: #3b82f6; --primary-dim: rgba(59, 130, 246, 0.15);
    --text-main: #f1f5f9; --text-muted: #94a3b8; --accent: #8b5cf6;
    --success: #10b981; --danger: #ef4444; --warning: #f59e0b;
  }
  * { box-sizing: border-box; user-select: none; scrollbar-width: thin; scrollbar-color: var(--border) transparent; }
  body { margin: 0; background: var(--bg-app); color: var(--text-main); font-family: 'Inter', sans-serif; height: 100vh; overflow: hidden; font-size: 13px; }

  .app-shell { display: flex; width: 100vw; height: 100vh; overflow: hidden; background: var(--bg-app); color: var(--text-main); font-family: 'Inter', sans-serif; font-size: 13px; }
  
  .sidebar { width: 340px; background: var(--bg-panel); border-right: 1px solid var(--border); display: flex; flex-direction: column; height: 100%; overflow: hidden; z-index: 20; flex-shrink: 0; }
  .sidebar.right { width: 360px; border-left: 1px solid var(--border); border-right: none; }
  
  .panel-header { padding: 14px 16px; font-weight: 700; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: var(--text-muted); border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; }
  .scroll-area { flex: 1; overflow-y: auto; padding: 12px; min-height: 0; }

  /* Tools & Tree */
  .tool-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 20px; }
  .tool-item { background: linear-gradient(145deg, var(--bg-input), #1a2333); border: 1px solid var(--border); border-radius: 8px; padding: 10px; cursor: grab; display: flex; flex-direction: column; align-items: center; gap: 6px; transition: all 0.2s; color: var(--text-muted); }
  .tool-item:hover { border-color: var(--primary); background: var(--primary-dim); color: #fff; transform: translateY(-2px); }
  .tool-item svg { width: 20px; height: 20px; opacity: 0.8; fill: currentColor; }
  
  .tree-node { padding: 6px 8px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 8px; color: var(--text-muted); margin-bottom: 2px; border: 1px solid transparent; }
  .tree-node:hover { background: rgba(255,255,255,0.05); color: var(--text-main); }
  .tree-node.selected { background: var(--primary); color: white; font-weight: 600; }
  .tree-node.drag-over { background: var(--primary-dim); border: 1px dashed var(--primary); }
  .tree-indent { border-left: 1px solid var(--border); margin-left: 8px; padding-left: 8px; }
  .tree-badge { font-size: 9px; padding: 1px 5px; border-radius: 4px; background: var(--success); color: #000; margin-left: auto; font-weight: bold; }

  /* Canvas */
  .canvas { flex: 1; background-color: #020617; background-image: radial-gradient(#1e293b 1px, transparent 1px); background-size: 24px 24px; display: flex; justify-content: center; align-items: center; overflow: hidden; position: relative; }
  .phone-mockup { width: 380px; height: 820px; background: #fff; border: 12px solid #000; border-radius: 48px; position: relative; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 0 0 2px #334155, 0 50px 100px -20px rgba(0,0,0,0.6); margin: auto; }
  .notch { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 140px; height: 28px; background: #000; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; z-index: 50; }
  .screen-content { flex: 1; overflow-y: auto; background: #f8fafc; color: #0f172a; display: flex; flex-direction: column; }

  /* Component Rendering */
  .comp { position: relative; transition: all 0.1s; min-height: 10px; }
  .comp:hover { outline: 1px solid var(--primary); }
  .comp.selected { outline: 2px solid var(--primary); z-index: 5; }
  .comp-tag { position: absolute; top: 0; right: 0; background: var(--primary); color: white; font-size: 9px; padding: 2px 6px; display: none; z-index: 10; pointer-events: none; }
  .comp.selected .comp-tag { display: block; }
  .drop-zone { padding: 20px; border: 2px dashed #94a3b8; border-radius: 8px; margin: 5px; display: flex; align-items: center; justify-content: center; color: #64748b; font-size: 10px; font-weight: 600; background: rgba(255,255,255,0.5); }
  .drag-over-zone { background: rgba(59, 130, 246, 0.1); border-color: var(--primary); color: var(--primary); }

  /* Properties Panel */
  .props-form { display: flex; flex-direction: column; gap: 16px; padding-bottom: 40px; }
  .prop-section { background: rgba(0,0,0,0.2); padding: 12px; border-radius: 8px; border: 1px solid var(--border); }
  .section-title { font-size: 10px; font-weight: 700; color: var(--primary); text-transform: uppercase; margin-bottom: 10px; letter-spacing: 0.5px; }
  
  .prop-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 8px; }
  .prop-label { font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; }
  .prop-input, .prop-select { background: var(--bg-input); border: 1px solid var(--border); color: var(--text-main); padding: 6px 8px; border-radius: 6px; font-family: 'JetBrains Mono', monospace; font-size: 11px; width: 100%; transition: 0.2s; }
  .prop-input:focus, .prop-select:focus { border-color: var(--primary); outline: none; }
  
  .prop-row { display: flex; gap: 8px; }
  .prop-grid-4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 4px; }
  
  .btn-action { padding: 8px; border-radius: 6px; font-weight: 600; cursor: pointer; border: none; display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
  .btn-primary { background: var(--primary-dim); color: var(--primary); border: 1px solid var(--primary); }
  .btn-delete { background: rgba(239, 68, 68, 0.1); color: var(--danger); border: 1px solid rgba(239, 68, 68, 0.2); }
  
  .tabs { display: flex; border-bottom: 1px solid var(--border); margin-bottom: 10px; flex-shrink: 0; }
  .tab { flex: 1; background: transparent; border: none; color: var(--text-muted); padding: 10px; cursor: pointer; border-bottom: 2px solid transparent; font-weight: 600; font-size: 11px; }
  .tab.active { color: #fff; border-bottom-color: var(--primary); background: rgba(255,255,255,0.02); }
  
  .json-editor { width: 100%; height: 100%; background: var(--bg-input); color: #a5d6a7; border: 1px solid var(--border); padding: 15px; font-family: 'JetBrains Mono', monospace; font-size: 11px; resize: none; outline: none; }
  .data-pills { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px; }
  .data-pill { background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); color: var(--success); font-size: 9px; padding: 2px 8px; border-radius: 10px; cursor: pointer; }

  /* Utilities */
  .icon { width: 14px; height: 14px; fill: currentColor; }
`;

// --- Helpers ---
const uid = () => Math.random().toString(36).substr(2, 6);

const INITIAL = { id: uid(), type: 'column', paddingAll: 16, enableScroll: false, children: [{ id: uid(), type: 'text', content: 'SDUI Studio Pro v3.2', size: 18, color: '#000000', weight: 'bold' }] };

const DATA = { 
    posts: [{ title: 'Product A', image: 'https://via.placeholder.com/150/0000FF/808080' }, { title: 'Product B', image: 'https://via.placeholder.com/150/FF0000/FFFFFF' }],
    chips: [{ title: 'Tech' }, { title: 'News' }, { title: 'Music' }]
};

// --- Main App ---
export default function App() {
    const [tree, setTree] = useState(INITIAL);
    const [sel, setSel] = useState(tree.id);
    const [dataStr, setDataStr] = useState(JSON.stringify(DATA, null, 2));
    const [data, setData] = useState(DATA);
    const [activeTab, setActiveTab] = useState('props');
    const [dragType, setDragType] = useState(null);
    const [dragNode, setDragNode] = useState(null);
    const [jsonInput, setJsonInput] = useState('');

    useEffect(() => { 
        try { setData(JSON.parse(dataStr)); } catch (e) {} 
    }, [dataStr]);

    useEffect(() => {
        if(activeTab !== 'json') {
            setJsonInput(JSON.stringify({version: '1.0.0', uiData: [gen(tree)]}, null, 2));
        }
    }, [tree, activeTab]);

    const availableKeys = useMemo(() => {
        let path = [];
        const findPath = (n, p = []) => {
            if (n.id === sel) return p;
            if (n.children) for (let c of n.children) { const r = findPath(c, [...p, n]); if (r) return r; }
            if (n.template) { const r = findPath(n.template, [...p, n]); if (r) return r; }
            return null;
        };
        path = findPath(tree);
        if (path) {
            for (let i = path.length - 1; i >= 0; i--) {
                if (path[i].dataBinding) {
                    const k = path[i].dataBinding.replace('@', '');
                    if (data[k] && data[k][0]) return Object.keys(data[k][0]);
                }
            }
        }
        return [];
    }, [sel, tree, data]);

    // CRUD
    const addNode = (targetId, type) => {
        let newNode = { id: uid(), type };
        if (['column', 'row'].includes(type)) { newNode.children = []; newNode.spacing = 8; newNode.align = 'start'; newNode.justify = 'top'; newNode.enableScroll = false; }
        if (type === 'card') { newNode.children = []; newNode.cardColor = '#ffffff'; newNode.cardShape = 8; newNode.cardPaddingAll = 0; }
        if (type === 'text') { newNode.content = 'Text'; newNode.size = 14; newNode.color = '#000000'; }
        if (type === 'image') { newNode.imageUrl = 'https://via.placeholder.com/150'; newNode.height = 100; newNode.scale = 'cover'; }
        if (type === 'button') { 
            newNode.text = 'Button'; 
            newNode.bgColor = '#3b82f6'; 
            newNode.btnTextColor = '#ffffff'; 
            newNode.btnShape = 'DEFAULT';
            newNode.btnTextSize = 12;
        }
        if (type === 'icon_button') { newNode.iconName = 'favorite_border'; newNode.tint = '#000000'; }
        if (type === 'chip_group') { newNode.dataBinding = '@chips'; newNode.chipLabelBinding = '{{item.title}}'; newNode.chipBg = '#E0E0E0'; newNode.chipRadius = 20; }
        if (type.includes('lazy') || type === 'grid' || type === 'lazy_vertical_staggered_grid') { newNode.dataBinding = '@posts'; newNode.template = null; newNode.spacing = 8; newNode.columns = 2; }

        const traverse = (node) => {
            if (node.id === targetId) {
                if (['lazy_column', 'grid', 'lazy_vertical_staggered_grid', 'chip_group'].includes(node.type)) {
                    if (!node.template && !['chip_group'].includes(node.type)) return { ...node, template: newNode };
                    return node;
                }
                return { ...node, children: [...(node.children || []), newNode] };
            }
            if (node.children) return { ...node, children: node.children.map(traverse) };
            if (node.template) return { ...node, template: traverse(node.template) };
            return node;
        };
        setTree(traverse(tree));
    };

    const deleteNode = (id) => {
        if (id === tree.id) return;
        const traverse = (n) => {
            if (n.children) return { ...n, children: n.children.filter(c => c.id !== id).map(traverse) };
            if (n.template) return n.template.id === id ? { ...n, template: null } : { ...n, template: traverse(n.template) };
            return n;
        };
        setTree(traverse(tree));
        setSel(tree.id);
    };

    const update = (id, p) => {
        const traverse = (n) => {
            if (n.id === id) return { ...n, ...p };
            if (n.children) return { ...n, children: n.children.map(traverse) };
            if (n.template) return { ...n, template: traverse(n.template) };
            return n;
        };
        setTree(traverse(tree));
    };

    const moveNode = (dragId, dropId) => {
        if (dragId === dropId || dragId === tree.id) return;
        let moved = null;
        const remove = (n) => {
            if (n.children) {
                const c = n.children.find(k => k.id === dragId);
                if (c) { moved = c; return { ...n, children: n.children.filter(k => k.id !== dragId) }; }
                return { ...n, children: n.children.map(remove) };
            }
            if (n.template) {
                if (n.template.id === dragId) { moved = n.template; return { ...n, template: null }; }
                return { ...n, template: remove(n.template) };
            }
            return n;
        };
        const newTree = remove(tree);
        if (!moved) return;
        const insert = (n) => {
            if (n.id === dropId) {
                if (['lazy_column', 'grid', 'lazy_vertical_staggered_grid'].includes(n.type)) return n.template ? n : { ...n, template: moved };
                return { ...n, children: [...(n.children || []), moved] };
            }
            if (n.children) return { ...n, children: n.children.map(insert) };
            if (n.template) return { ...n, template: insert(n.template) };
            return n;
        };
        setTree(insert(newTree));
    };

    const find = (n, id) => {
        if (n.id === id) return n;
        if (n.children) { for (let c of n.children) { const f = find(c, id); if (f) return f; } }
        if (n.template) return find(n.template, id);
        return null;
    };
    const node = find(tree, sel);

    const applyJson = () => {
        try {
            const parsed = JSON.parse(jsonInput);
            if(parsed.uiData && parsed.uiData.length > 0) {
                const newTree = ingest(parsed.uiData[0]);
                setTree(newTree);
                setSel(newTree.id);
                alert("JSON Applied Successfully!");
            } else {
                alert("Invalid JSON format: Missing uiData");
            }
        } catch(e) {
            alert("Error parsing JSON: " + e.message);
        }
    };

    return (
        <div className="app-shell">
            <style>{STYLES}</style>
            <div className="sidebar">
                <div className="panel-header">Components</div>
                <div className="scroll-area">
                    <div className="tool-grid">
                        <Draggable type="column" label="Column" icon={Icons.Col} setDrag={setDragType} />
                        <Draggable type="row" label="Row" icon={Icons.Row} setDrag={setDragType} />
                        <Draggable type="card" label="Card" icon={Icons.Card} setDrag={setDragType} />
                        <Draggable type="text" label="Text" icon={Icons.Text} setDrag={setDragType} />
                        <Draggable type="image" label="Image" icon={Icons.Image} setDrag={setDragType} />
                        <Draggable type="button" label="Button" icon={Icons.Btn} setDrag={setDragType} />
                        <Draggable type="icon_button" label="Icon" icon={Icons.Icon} setDrag={setDragType} />
                        <Draggable type="chip_group" label="Chips" icon={Icons.Chip} setDrag={setDragType} />
                        <Draggable type="lazy_column" label="List" icon={Icons.List} setDrag={setDragType} />
                        <Draggable type="grid" label="Grid" icon={Icons.Grid} setDrag={setDragType} />
                        <Draggable type="lazy_vertical_staggered_grid" label="Staggered" icon={Icons.Grid} setDrag={setDragType} />
                    </div>
                    <div className="panel-header" style={{borderTop:'1px solid var(--border)', marginTop:16}}>Layers</div>
                    <Tree n={tree} sel={sel} setSel={setSel} onDrop={addNode} onMove={moveNode} dragType={dragType} dragNode={dragNode} setDragNode={setDragNode} />
                </div>
            </div>

            <div className="canvas">
                <div className="phone-mockup">
                    <div className="notch"></div>
                    <div className="screen-content">
                        <Renderer n={tree} sel={sel} setSel={setSel} onDrop={addNode} dragType={dragType} ctx={data} all={data} />
                    </div>
                </div>
            </div>

            <div className="sidebar right">
                <div className="tabs">
                    <button className={`tab ${activeTab==='props'?'active':''}`} onClick={()=>setActiveTab('props')}>PROPS</button>
                    <button className={`tab ${activeTab==='data'?'active':''}`} onClick={()=>setActiveTab('data')}>DATA</button>
                    <button className={`tab ${activeTab==='json'?'active':''}`} onClick={()=>setActiveTab('json')}>JSON</button>
                </div>

                {activeTab==='props' && node && (
                    <div className="scroll-area props-form">
                            <div className="prop-section" style={{borderColor: 'var(--accent)', borderWidth: 1}}>
                            <div className="section-title" style={{color: 'var(--accent)'}}>Selected Component</div>
                            <div className="prop-group">
                                <label className="prop-label">Type</label>
                                <select className="prop-select" value={node.type} onChange={e=>update(sel, {type: e.target.value})}>
                                    <option value="column">Column</option>
                                    <option value="row">Row</option>
                                    <option value="card">Card</option>
                                    <option value="text">Text</option>
                                    <option value="image">Image</option>
                                    <option value="button">Button</option>
                                    <option value="icon_button">Icon Button</option>
                                    <option value="chip_group">Chip Group</option>
                                    <option value="lazy_column">Lazy List</option>
                                    <option value="grid">Grid</option>
                                    <option value="lazy_vertical_staggered_grid">Staggered Grid</option>
                                </select>
                            </div>
                                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop: 8}}>
                                <button className="btn-action btn-primary" onClick={()=>navigator.clipboard.writeText(JSON.stringify(gen(node),null,2))}><Icons.Copy/> JSON</button>
                                <button className="btn-action btn-delete" onClick={()=>deleteNode(sel)}><Icons.Trash/> Delete</button>
                                </div>
                        </div>

                        <div className="prop-section">
                            <div className="section-title">Layout & Size</div>
                            <div className="prop-row">
                                <Input label="W (dp)" val={node.width} set={v=>update(sel,{width:v})} type="number"/>
                                <Input label="H (dp)" val={node.height} set={v=>update(sel,{height:v})} type="number"/>
                            </div>
                            <div className="prop-row">
                                <Input label="W %" val={node.widthPercent} set={v=>update(sel,{widthPercent:v})} type="number"/>
                                <Input label="H %" val={node.heightPercent} set={v=>update(sel,{heightPercent:v})} type="number"/>
                            </div>
                        </div>

                        <div className="prop-section">
                            <div className="section-title">Style & Modifier</div>
                            <Input label="Background" val={node.bgColor} set={v=>update(sel,{bgColor:v})} type="color"/>
                            
                            <div className="section-title" style={{marginTop:12, color:'#94a3b8'}}>Padding (Internal)</div>
                            <div className="prop-row">
                                <Input label="All" val={node.paddingAll} set={v=>update(sel,{paddingAll:v})} type="number"/>
                                <div style={{flex:1}}></div>
                            </div>
                            <div className="prop-grid-4">
                                <Input label="Top" val={node.paddingTop} set={v=>update(sel,{paddingTop:v})} type="number"/>
                                <Input label="Bot" val={node.paddingBottom} set={v=>update(sel,{paddingBottom:v})} type="number"/>
                                <Input label="Left" val={node.paddingLeft} set={v=>update(sel,{paddingLeft:v})} type="number"/>
                                <Input label="Rgt" val={node.paddingRight} set={v=>update(sel,{paddingRight:v})} type="number"/>
                            </div>

                            <div className="section-title" style={{marginTop:12, color:'#94a3b8'}}>Clip / Shape</div>
                            <div className="prop-row">
                                <div style={{flex:1}}>
                                    <label className="prop-label">Shape</label>
                                    <select className="prop-select" value={node.clipShape} onChange={e=>update(sel,{clipShape:e.target.value})}>
                                        <option value="rounded">Rounded</option>
                                        <option value="circle">Circle</option>
                                    </select>
                                </div>
                                <Input label="Radius" val={node.clipRadius} set={v=>update(sel,{clipRadius:v})} type="number"/>
                            </div>
                        </div>

                        {node.type === 'card' && (
                            <div className="prop-section">
                                <div className="section-title">Card Style</div>
                                <Input label="Card Color" val={node.cardColor} set={v=>update(sel,{cardColor:v})} type="color"/>
                                <div className="prop-row">
                                    <Input label="Corner Radius" val={node.cardShape} set={v=>update(sel,{cardShape:v})} type="number"/>
                                    <Input label="Content Pad" val={node.cardPaddingAll} set={v=>update(sel,{cardPaddingAll:v})} type="number"/>
                                </div>
                            </div>
                        )}

                        {['column', 'row'].includes(node.type) && (
                            <div className="prop-section">
                                <div className="section-title">Flex Layout</div>
                                <Input label="Spacing" val={node.spacing} set={v=>update(sel,{spacing:v})} type="number"/>
                                <div className="prop-row">
                                    <div style={{flex:1}}>
                                        <label className="prop-label">Align (Cross)</label>
                                        <select className="prop-select" value={node.align} onChange={e=>update(sel,{align:e.target.value})}>
                                            <option value="start">Start</option><option value="center">Center</option><option value="end">End</option>
                                        </select>
                                    </div>
                                    <div style={{flex:1}}>
                                        <label className="prop-label">Justify (Main)</label>
                                        <select className="prop-select" value={node.justify} onChange={e=>update(sel,{justify:e.target.value})}>
                                            <option value="top">Start</option><option value="center">Center</option><option value="bottom">End</option><option value="spacebetween">Space Between</option>
                                        </select>
                                    </div>
                                </div>
                                {node.type === 'column' && (
                                    <div className="prop-group" style={{marginTop: 8, borderTop: '1px solid var(--border)', paddingTop: 8}}>
                                        <label className="prop-label">Enable Scroll</label>
                                        <select className="prop-select" value={node.enableScroll?.toString() || 'false'} onChange={e=>update(sel,{enableScroll: e.target.value === 'true'})}>
                                            <option value="false">False</option>
                                            <option value="true">True</option>
                                        </select>
                                    </div>
                                )}
                            </div>
                        )}

                        {node.type === 'text' && (
                            <div className="prop-section">
                                <div className="section-title">Text Style</div>
                                <Input label="Content" val={node.content} set={v=>update(sel,{content:v})}/>
                                {availableKeys.length>0 && <div className="data-pills">{availableKeys.map(k=><span key={k} className="data-pill" onClick={()=>update(sel,{content:`{{item.${k}}`})}>{k}</span>)}</div>}
                                <div className="prop-row">
                                    <Input label="Size" val={node.size} set={v=>update(sel,{size:v})} type="number"/>
                                    <Input label="Color" val={node.color} set={v=>update(sel,{color:v})} type="color"/>
                                </div>
                                <div className="prop-group">
                                    <label className="prop-label">Weight</label>
                                    <select className="prop-select" value={node.weight} onChange={e=>update(sel,{weight:e.target.value})}>
                                        <option value="normal">Normal</option><option value="medium">Medium</option><option value="bold">Bold</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {node.type === 'button' && (
                            <div className="prop-section">
                                <div className="section-title">Button Style</div>
                                <Input label="Text" val={node.text} set={v=>update(sel,{text:v})}/>
                                <Input label="Bg Color" val={node.bgColor} set={v=>update(sel,{bgColor:v})} type="color"/>
                                <div className="prop-row">
                                    <Input label="Text Color" val={node.btnTextColor} set={v=>update(sel,{btnTextColor:v})} type="color"/>
                                    <Input label="Text Size" val={node.btnTextSize} set={v=>update(sel,{btnTextSize:v})} type="number"/>
                                </div>
                                <div className="prop-row">
                                    <div style={{flex:1}}>
                                        <label className="prop-label">Shape</label>
                                        <select className="prop-select" value={node.btnShape || 'DEFAULT'} onChange={e=>update(sel,{btnShape:e.target.value})}>
                                            <option value="DEFAULT">Default</option><option value="ROUNDED">Rounded</option><option value="CIRCLE">Circle</option>
                                        </select>
                                    </div>
                                    {node.btnShape === 'ROUNDED' && <Input label="Radius" val={node.btnRounded} set={v=>update(sel,{btnRounded:v})} type="number"/>}
                                </div>
                                <Input label="Action ID" val={node.actionPerform} set={v=>update(sel,{actionPerform:v})}/>
                            </div>
                        )}
                        
                        {node.type === 'icon_button' && (
                            <div className="prop-section">
                                <div className="section-title">Icon Settings</div>
                                <Input label="Name" val={node.iconName} set={v=>update(sel,{iconName:v})}/>
                                <Input label="Tint" val={node.tint} set={v=>update(sel,{tint:v})} type="color"/>
                                <Input label="State Key" val={node.stateKey} set={v=>update(sel,{stateKey:v})}/>
                                <Input label="Toggle From (@)" val={node.toggleStateFrom} set={v=>update(sel,{toggleStateFrom:v})}/>
                                <div className="prop-row">
                                    <Input label="Toggled Name" val={node.toggledIconName} set={v=>update(sel,{toggledIconName:v})}/>
                                    <Input label="Toggled Tint" val={node.toggledTint} set={v=>update(sel,{toggledTint:v})} type="color"/>
                                </div>
                            </div>
                        )}

                        {node.type.includes('lazy') || node.type === 'grid' || node.type.includes('staggered') ? (
                            <div className="prop-section" style={{borderColor: 'var(--primary)', borderWidth: 1}}>
                                <div className="section-title" style={{color: 'var(--primary)'}}>Data List Config</div>
                                <Input label="Data Source (@)" val={node.dataBinding} set={v=>update(sel,{dataBinding:v})}/>
                                {node.type === 'lazy_vertical_staggered_grid' ? (
                                    <>
                                        <Input label="Cols" val={node.columns} set={v=>update(sel,{columns:v})} type="number"/>
                                        <div className="prop-row">
                                            <Input label="V. Spacing" val={node.verticalSpacing} set={v=>update(sel,{verticalSpacing:v})} type="number"/>
                                            <Input label="H. Spacing" val={node.horizontalSpacing} set={v=>update(sel,{horizontalSpacing:v})} type="number"/>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Input label="Spacing" val={node.spacing} set={v=>update(sel,{spacing:v})} type="number"/>
                                        {(node.type === 'grid') && <Input label="Columns" val={node.columns} set={v=>update(sel,{columns:v})} type="number"/>}
                                    </>
                                )}
                            </div>
                        ) : null}
                    </div>
                )}
                {activeTab==='data' && <textarea className="json-editor" value={dataStr} onChange={e=>setDataStr(e.target.value)} />}
                {activeTab==='json' && (
                    <div style={{flex:1, display:'flex', flexDirection:'column', overflow:'hidden'}}>
                        <textarea className="json-editor" style={{flex:1, marginBottom:10}} value={jsonInput} onChange={e=>setJsonInput(e.target.value)} />
                        <div style={{display:'flex', gap:10, padding:10, borderTop:'1px solid var(--border)'}}>
                            <button className="btn-action btn-primary" style={{flex:1}} onClick={applyJson}><Icons.Upload/> Apply to Canvas</button>
                            <button className="btn-action btn-primary" onClick={()=>navigator.clipboard.writeText(jsonInput)}><Icons.Copy/></button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// --- Sub-Components & Logic ---

const Draggable = ({ type, label, icon: Icon, setDrag }) => (
    <div className="tool-item" draggable onDragStart={()=>setDrag(type)}><Icon/><span style={{fontSize:10}}>{label}</span></div>
);

const Input = ({ label, val, set, type='text' }) => (
    <div className="prop-group"><label className="prop-label">{label}</label>{type==='color'?<div style={{display:'flex',gap:10,alignItems:'center'}}><input type="color" value={val||'#000000'} onChange={e=>set(e.target.value)} style={{width:30,height:28,border:'none',background:'none',cursor:'pointer'}}/><input className="prop-input" value={val||''} onChange={e=>set(e.target.value)}/></div>:<input className="prop-input" type={type} value={val||''} onChange={e=>set(e.target.value)}/>}</div>
);

const Tree = ({ n, sel, setSel, onDrop, onMove, dragType, dragNode, setDragNode, depth=0 }) => {
    const [over, setOver] = useState(false);
    const isContainer = ['column','row','card'].includes(n.type) || n.type.includes('lazy') || n.type==='grid' || n.type==='chip_group';
    const drop = (e) => { e.stopPropagation(); setOver(false); if(dragType && isContainer) onDrop(n.id, dragType); else if(dragNode && dragNode.id!==n.id && isContainer) onMove(dragNode.id, n.id); setDragNode(null); };

    return (
        <div>
            <div className={`tree-node ${n.id===sel?'selected':''} ${over?'drag-over':''}`} onClick={()=>setSel(n.id)} draggable onDragStart={e=>{e.stopPropagation();setDragNode(n)}} onDragOver={e=>{if(isContainer){e.preventDefault();setOver(true)}}} onDragLeave={()=>setOver(false)} onDrop={drop}>
                <div className="tree-indent" style={{marginLeft:depth*12}}></div>
                <span style={{fontSize:14, marginRight:4}}>☰</span><span style={{fontSize:11}}>{n.type}</span>
                {(n.type.includes('lazy') || n.type === 'grid') && <span className="tree-badge">DATA</span>}
            </div>
            {n.children && n.children.map(c=><Tree key={c.id} n={c} sel={sel} setSel={setSel} onDrop={onDrop} onMove={onMove} dragType={dragType} dragNode={dragNode} setDragNode={setDragNode} depth={depth+1}/>)}
            {n.template && <div style={{opacity:0.8}}><Tree n={n.template} sel={sel} setSel={setSel} onDrop={onDrop} onMove={onMove} dragType={dragType} dragNode={dragNode} setDragNode={setDragNode} depth={depth+1}/></div>}
        </div>
    );
};

const Renderer = ({ n, sel, setSel, onDrop, dragType, ctx, all }) => {
    const [over, setOver] = useState(false);
    
    const wrapperStyle = {
        width: '100%', display: 'flex', flexDirection: 'column'
    };

    if(n.width) wrapperStyle.width = n.width+'px';
    else if(n.widthPercent) wrapperStyle.width = n.widthPercent+'%';
    if(n.height) wrapperStyle.height = n.height+'px';
    else if(n.heightPercent) wrapperStyle.height = n.heightPercent+'%';

    const innerStyle = {
        paddingTop: (n.paddingTop || n.paddingAll || 0)+'px',
        paddingBottom: (n.paddingBottom || n.paddingAll || 0)+'px',
        paddingLeft: (n.paddingLeft || n.paddingAll || 0)+'px',
        paddingRight: (n.paddingRight || n.paddingAll || 0)+'px',
        backgroundColor: n.bgColor || 'transparent',
        flex: 1, display: 'flex', flexDirection: 'column', position: 'relative'
    };

    if(n.clipShape === 'circle') innerStyle.borderRadius = '50%';
    else if(n.clipRadius) { innerStyle.borderRadius = n.clipRadius+'px'; innerStyle.overflow = 'hidden'; }

    const drop = e => { e.stopPropagation(); setOver(false); if(dragType) onDrop(n.id, dragType); };
    const parse = t => (!t||!ctx)?t:t.replace(/\{\{item\.(\w+)\}\}/g, (_,k)=>ctx[k]!==undefined?ctx[k]:`{{${k}}}`);

    if(n.type.includes('lazy') || n.type === 'grid') {
        const k = n.dataBinding?n.dataBinding.replace('@',''):null;
        const items = (k&&all[k])?all[k]:[{},{},{}];
        if(!n.template) return <div style={wrapperStyle} onClick={e=>{e.stopPropagation();setSel(n.id)}}><div className={`comp ${n.id===sel?'selected':''}`} style={{...innerStyle, minHeight:100, border:'1px dashed #444', alignItems:'center', justifyContent:'center'}} onDragOver={e=>{e.preventDefault();setOver(true)}} onDrop={drop}><div className="drop-zone">Drop Template</div></div></div>;
        
        const isGrid = n.type==='grid' || n.type==='lazy_vertical_staggered_grid';
        const listStyle = { ...innerStyle, display: isGrid?'grid':'flex', flexDirection: isGrid?undefined:'column', 
            gridTemplateColumns: isGrid?`repeat(${n.columns||2}, 1fr)`:undefined, 
            gap: (n.spacing||0)+'px', rowGap: (n.verticalSpacing||n.spacing||0)+'px', columnGap: (n.horizontalSpacing||n.spacing||0)+'px' 
        };
        return <div style={wrapperStyle} onClick={e=>{e.stopPropagation();setSel(n.id)}}><div className={`comp ${n.id===sel?'selected':''}`} style={listStyle}><div className="comp-tag">{n.type}</div>{items.map((it,i)=><Renderer key={i} n={n.template} sel={sel} setSel={setSel} onDrop={onDrop} dragType={dragType} ctx={it} all={all}/>)}</div></div>;
    }

    if(n.type==='text') return <div style={wrapperStyle} onClick={e=>{e.stopPropagation();setSel(n.id)}}><div className={`comp ${n.id===sel?'selected':''}`} style={{...innerStyle, color:n.color, fontSize:n.size, fontWeight:n.weight}}><div className="comp-tag">Text</div>{parse(n.content)}</div></div>;
    
    if(n.type==='button') {
        const btnStyle = { ...innerStyle, backgroundColor:n.bgColor, color: n.btnTextColor||'#fff', fontSize: n.btnTextSize||12, alignItems:'center', justifyContent:'center' };
        if(n.btnShape === 'CIRCLE') btnStyle.borderRadius = '50%';
        else if(n.btnShape === 'ROUNDED') btnStyle.borderRadius = (n.btnRounded||0)+'px';
        else btnStyle.borderRadius = '4px'; 
        
        return <div style={wrapperStyle} onClick={e=>{e.stopPropagation();setSel(n.id)}}><div className={`comp ${n.id===sel?'selected':''}`} style={btnStyle}><div className="comp-tag">Btn</div>{parse(n.text)}</div></div>;
    }

    if(n.type==='image') return <div style={wrapperStyle} onClick={e=>{e.stopPropagation();setSel(n.id)}}><img className={`comp ${n.id===sel?'selected':''}`} src={parse(n.imageUrl)} style={{...innerStyle, objectFit:n.scale, backgroundColor:'#eee'}} /><div className="comp-tag">Img</div></div>;

    if(n.type==='card') {
        return (
            <div style={wrapperStyle} onClick={e=>{e.stopPropagation();setSel(n.id)}}>
                <div className={`comp ${n.id===sel?'selected':''}`} style={{...innerStyle, backgroundColor:n.cardColor, borderRadius:n.cardShape, padding:0, boxShadow:'0 2px 4px rgba(0,0,0,0.1)', overflow:'hidden'}} onDragOver={e=>{e.preventDefault();setOver(true)}} onDrop={drop}>
                    <div className="comp-tag">Card</div>
                    <div style={{padding:(n.cardPaddingAll||0)+'px', width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
                        {n.children && n.children.map(c=><Renderer key={c.id} n={c} sel={sel} setSel={setSel} onDrop={onDrop} dragType={dragType} ctx={ctx} all={all}/>)}
                        {(!n.children||n.children.length===0) && <div className="drop-zone">Drop</div>}
                    </div>
                </div>
            </div>
        );
    }

    if(['column','row'].includes(n.type)) {
        const layoutStyle = { ...innerStyle, flexDirection: n.type==='column'?'column':'row', gap:(n.spacing||0)+'px', 
            alignItems: n.type==='column'?(n.align==='center'?'center':(n.align==='end'?'flex-end':'flex-start')):(n.align==='center'?'center':(n.align==='bottom'?'flex-end':'flex-start')),
            justifyContent: n.type==='column'?(n.justify==='center'?'center':(n.justify==='bottom'?'flex-end':'flex-start')):(n.justify==='center'?'center':(n.justify==='end'?'flex-end':(n.justify==='spacebetween'?'space-between':'flex-start')))
        };
        if(over) layoutStyle.backgroundColor = 'rgba(59, 130, 246, 0.1)';
        return (
            <div style={wrapperStyle} onClick={e=>{e.stopPropagation();setSel(n.id)}}>
                <div className={`comp ${n.id===sel?'selected':''}`} style={layoutStyle} onDragOver={e=>{e.preventDefault();setOver(true)}} onDrop={drop}>
                    <div className="comp-tag">{n.type}</div>
                    {n.children && n.children.map(c=><Renderer key={c.id} n={c} sel={sel} setSel={setSel} onDrop={onDrop} dragType={dragType} ctx={ctx} all={all}/>)}
                    {(!n.children||n.children.length===0) && <div className="drop-zone" style={{width:'100%'}}>Drop</div>}
                </div>
            </div>
        );
    }
    return null;
};

// --- JSON Gen/Ingest ---

const gen = (n) => {
    const j = { type: n.type };
    const itemSize = {};
    if (n.width) itemSize.width = parseInt(n.width);
    if (n.height) itemSize.height = parseInt(n.height);
    if (n.widthPercent) itemSize.widthPercent = parseFloat(n.widthPercent)/100.0;
    if (n.heightPercent) itemSize.heightPercent = parseFloat(n.heightPercent)/100.0;
    if (Object.keys(itemSize).length > 0) j.itemSize = itemSize;

    const modifier = {};
    const padding = {};
    if (n.paddingAll) padding.all = parseInt(n.paddingAll);
    if (n.paddingTop) padding.top = parseInt(n.paddingTop);
    if (n.paddingBottom) padding.bottom = parseInt(n.paddingBottom);
    if (n.paddingLeft) padding.left = parseInt(n.paddingLeft);
    if (n.paddingRight) padding.right = parseInt(n.paddingRight);
    if (Object.keys(padding).length > 0) modifier.padding = padding;

    if (n.bgColor && n.type !== 'button') modifier.backgroundColor = n.bgColor;
    
    if (n.clipShape || n.clipRadius) {
        modifier.clip = { shape: n.clipShape || 'rounded', radius: parseInt(n.clipRadius) || 0 };
    }
    if (n.type === 'button') modifier.onClick = { action: { perform: 'button_click' } };

    j.style = { modifier };

    switch(n.type) {
        case 'column':
            j.spacing = parseInt(n.spacing)||0;
            j.style.columnStyle = { horizontalAlignment: n.align||'start', verticalArrangement: n.justify||'top', enableScroll: n.enableScroll === true };
            break;
        case 'row':
            j.style.rowStyle = { spaceBy: parseInt(n.spacing)||0, verticalAlignment: n.align||'center', horizontalArrangement: n.justify||'start' };
            break;
        case 'card':
            const cardPad = {};
            if(n.cardPaddingAll) cardPad.all = parseInt(n.cardPaddingAll);
            j.style.cardStyle = { cardContainerColor: n.cardColor, cardShape: parseInt(n.cardShape)||8, cardPadding: Object.keys(cardPad).length > 0 ? cardPad : null };
            break;
        case 'text':
            j.content = [{ text: n.content }];
            j.style.textStyle = { fontSize: parseInt(n.size), textColor: n.color, fontWeight: n.weight };
            if(n.dataBinding) j.dataBinding = n.dataBinding;
            break;
        case 'button':
            j.text = n.text;
            j.style.buttonStyle = {
                buttonColor: n.bgColor || '#ffffff',
                buttonShape: n.btnShape || 'DEFAULT',
                buttonRounded: parseInt(n.btnRounded) || 0,
                buttonTextColor: n.btnTextColor || '#ffffff',
                buttonTextSize: parseInt(n.btnTextSize) || 12
            };
            j.action = { perform: n.actionPerform || 'button_click' };
            break;
        case 'icon_button':
            j.style.iconButtonStyle = { 
                iconName: n.iconName, tint: n.tint, 
                toggledIconName: n.toggledIconName, toggledTint: n.toggledTint, 
                iconSize: parseInt(n.iconSize)||24,
                toggleStateFrom: n.toggleStateFrom
            };
            if(n.stateKey) j.stateKey = n.stateKey;
            break;
        case 'image':
            j.imageUrl = n.imageUrl;
            if(n.dataBinding) j.dataBinding = n.dataBinding;
            break;
        case 'chip_group':
            j.dataBinding = n.dataBinding;
            j.selectedStateKey = n.selectedStateKey || 'selectedIndex';
            j.chipTemplate = {
                labelBinding: n.chipLabelBinding,
                style: { backgroundColor: n.chipBg, selectedBackgroundColor: n.chipBgSelected, textColor: n.chipText, selectedTextColor: n.chipTextSelected, borderRadius: parseInt(n.chipRadius)||20 }
            };
            break;
        case 'grid':
        case 'lazy_vertical_staggered_grid':
            j.columns = parseInt(n.columns)||2;
            if(n.type === 'lazy_vertical_staggered_grid') {
                    j.verticalSpacing = parseInt(n.verticalSpacing)||0;
                    j.horizontalSpacing = parseInt(n.horizontalSpacing)||0;
            } else {
                j.spacing = parseInt(n.spacing)||8;
            }
            j.dataBinding = n.dataBinding;
            break;
        case 'lazy_column':
            j.dataBinding = n.dataBinding;
            j.spacing = parseInt(n.spacing)||8;
            break;
    }

    if (n.children) j.children = n.children.map(gen);
    if (n.itemTemplate) j.itemTemplate = gen(n.itemTemplate);
    if (n.template) j.itemTemplate = gen(n.template);

    return j;
};

const ingest = (j) => {
    if(!j) return null;
    const n = { id: uid(), type: j.type };

    if(j.itemSize) {
        if(j.itemSize.width) n.width = j.itemSize.width;
        if(j.itemSize.height) n.height = j.itemSize.height;
        if(j.itemSize.widthPercent) n.widthPercent = j.itemSize.widthPercent * 100;
        if(j.itemSize.heightPercent) n.heightPercent = j.itemSize.heightPercent * 100;
    }

    if(j.style) {
        const m = j.style.modifier;
        if(m) {
            if(m.padding) {
                if(m.padding.all !== undefined) n.paddingAll = m.padding.all;
                if(m.padding.top !== undefined) n.paddingTop = m.padding.top;
                if(m.padding.bottom !== undefined) n.paddingBottom = m.padding.bottom;
                if(m.padding.left !== undefined) n.paddingLeft = m.padding.left;
                if(m.padding.right !== undefined) n.paddingRight = m.padding.right;
            }
            if(m.backgroundColor) n.bgColor = m.backgroundColor;
            if(m.clip) { n.clipShape = m.clip.shape; n.clipRadius = m.clip.radius; }
        }
        if(j.style.columnStyle) { n.align = j.style.columnStyle.horizontalAlignment; n.justify = j.style.columnStyle.verticalArrangement; n.enableScroll = j.style.columnStyle.enableScroll; }
        if(j.style.rowStyle) { n.justify = j.style.rowStyle.horizontalArrangement; n.align = j.style.rowStyle.verticalAlignment; }
        if(j.style.cardStyle) {
            n.cardColor = j.style.cardStyle.cardContainerColor;
            n.cardShape = j.style.cardStyle.cardShape;
            if(j.style.cardStyle.cardPadding) n.cardPaddingAll = j.style.cardStyle.cardPadding.all;
        }
        if(j.style.textStyle) { n.size = j.style.textStyle.fontSize; n.color = j.style.textStyle.textColor; n.weight = j.style.textStyle.fontWeight; }
        
        if(j.style.buttonStyle) {
            n.bgColor = j.style.buttonStyle.buttonColor;
            n.btnShape = j.style.buttonStyle.buttonShape;
            n.btnRounded = j.style.buttonStyle.buttonRounded;
            n.btnTextColor = j.style.buttonStyle.buttonTextColor;
            n.btnTextSize = j.style.buttonStyle.buttonTextSize;
        }

        if(j.style.iconButtonStyle) {
            n.iconName = j.style.iconButtonStyle.iconName;
            n.tint = j.style.iconButtonStyle.tint;
            n.iconSize = j.style.iconButtonStyle.iconSize;
            n.toggledIconName = j.style.iconButtonStyle.toggledIconName;
            n.toggledTint = j.style.iconButtonStyle.toggledTint;
            n.toggleStateFrom = j.style.iconButtonStyle.toggleStateFrom;
        }
    }

    if(j.spacing) n.spacing = j.spacing;
    if(j.verticalSpacing) n.verticalSpacing = j.verticalSpacing;
    if(j.horizontalSpacing) n.horizontalSpacing = j.horizontalSpacing;
    if(j.columns) n.columns = j.columns;
    if(j.text) n.text = j.text;
    if(j.content && j.content[0]) n.content = j.content[0].text;
    if(j.imageUrl) n.imageUrl = j.imageUrl;
    if(j.dataBinding) n.dataBinding = j.dataBinding;
    if(j.action) n.actionPerform = j.action.perform;
    if(j.stateKey) n.stateKey = j.stateKey;

    if(j.chipTemplate) {
        n.chipLabelBinding = j.chipTemplate.labelBinding;
        if(j.chipTemplate.style) {
            n.chipBg = j.chipTemplate.style.backgroundColor;
            n.chipBgSelected = j.chipTemplate.style.selectedBackgroundColor;
            n.chipText = j.chipTemplate.style.textColor;
            n.chipTextSelected = j.chipTemplate.style.selectedTextColor;
            n.chipRadius = j.chipTemplate.style.borderRadius;
        }
    }

    if(j.children) n.children = j.children.map(ingest);
    if(j.itemTemplate) n.template = ingest(j.itemTemplate);

    return n;
};