"use client";

import { useEffect, useRef, useState } from 'react';
import { COLORS, Drawing, HEIGHT, renderDrawing, Stroke, validStrokes, WIDTH } from '../_lib/paint';

function DrawingPreview({ drawing }: { drawing: Drawing }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => { if (canvas.current) renderDrawing(canvas.current, drawing.strokes); }, [drawing]);
  return <canvas ref={canvas} width={WIDTH} height={HEIGHT} role="img" aria-label={`Anonymous drawing from ${new Date(drawing.created_at).toLocaleDateString()}`} style={{ width: '100%', display: 'block', background: '#fff', border: '2px inset #eee' }} />;
}

export function DrawingGallery({ review = false }: { review?: boolean }) {
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [key, setKey] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [more, setMore] = useState(false);
  async function load(older = false) {
    setBusy(true); setMessage('');
    try {
      const params = new URLSearchParams();
      if (review) params.set('review', '1');
      if (older && drawings.length) params.set('before', drawings[drawings.length - 1].created_at);
      const response = await fetch(`/api/drawings?${params}`, { headers: review ? { Authorization: `Bearer ${key}` } : {} });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setDrawings(previous => older ? [...previous, ...data.drawings] : data.drawings);
      setMore(data.drawings.length === 12);
      if (!data.drawings.length && !older) setMessage(review ? 'No drawings waiting for review.' : 'No drawings yet. Leave the first one!');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Could not load drawings. Please retry.'); }
    finally { setBusy(false); }
  }
  useEffect(() => { if (!review) void load(); }, [review]); // Review waits for the owner to enter a key.
  async function moderate(id: string, action: 'approve' | 'delete') {
    setBusy(true); setMessage('');
    try {
      const response = await fetch('/api/drawings', { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` }, body: JSON.stringify({ id, action }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setDrawings(previous => previous.filter(drawing => drawing.id !== id));
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Could not update drawing.'); }
    finally { setBusy(false); }
  }
  return <section style={{ padding: '10px' }} aria-label={review ? 'Review drawings' : 'Anonymous drawing gallery'}>
    {review && <label>Review key <input type="password" value={key} autoComplete="off" onChange={event => setKey(event.target.value)} style={{ color: '#000', background: '#fff' }} /></label>}
    <button className="convex" disabled={busy} onClick={() => load()} style={{ padding: '5px 10px', marginBottom: '10px' }}>{busy ? 'Loading…' : review ? 'Load pending drawings' : 'Refresh gallery'}</button>
    <p role="status">{message}</p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
      {drawings.map(drawing => <article key={drawing.id}>
        <DrawingPreview drawing={drawing} />
        <p style={{ fontSize: '0.875rem', margin: '4px 0' }}>Anonymous · {new Date(drawing.created_at).toLocaleDateString()}</p>
        {review && <div style={{ display: 'flex', gap: '8px' }}><button className="convex" disabled={busy} onClick={() => moderate(drawing.id, 'approve')}>Approve</button><button className="convex" disabled={busy} onClick={() => moderate(drawing.id, 'delete')}>Delete</button></div>}
      </article>)}
    </div>
    {more && <button className="convex" disabled={busy} onClick={() => load(true)} style={{ marginTop: '12px' }}>Older drawings</button>}
  </section>;
}

export default function PaintWindow() {
  const clearDialog = useRef<HTMLDialogElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const canvasSpace = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: WIDTH, height: HEIGHT });
  const current = useRef<Stroke | null>(null);
  const pointer = useRef<number | null>(null);
  const requestId = useRef<string | null>(null);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [redo, setRedo] = useState<Stroke[]>([]);
  const [color, setColor] = useState('#000000');
  const [size, setSize] = useState(5);
  const [eraser, setEraser] = useState(false);
  const [tab, setTab] = useState<'paint' | 'gallery'>('paint');
  const [message, setMessage] = useState("")
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { const saved = JSON.parse(localStorage.getItem('paint-draft') || '[]'); if (validStrokes(saved)) setStrokes(saved); } catch { /* Draft storage is optional. */ }
    setReady(true);
  }, []);
  useEffect(() => {
    if (canvas.current) renderDrawing(canvas.current, strokes);
    if (ready) try { localStorage.setItem('paint-draft', JSON.stringify(strokes)); } catch { /* Drawing and download still work. */ }
  }, [strokes, ready]);
  useEffect(() => {
    const space = canvasSpace.current;
    if (!space) return;
    const observer = new ResizeObserver(([entry]) => {
      const scale = Math.max(0, Math.min(entry.contentRect.width / WIDTH, entry.contentRect.height / HEIGHT));
      setCanvasSize({ width: WIDTH * scale, height: HEIGHT * scale });
    });
    observer.observe(space);
    return () => observer.disconnect();
  }, []);
  const point = (event: React.PointerEvent<HTMLCanvasElement>): [number, number] => {
    const rect = event.currentTarget.getBoundingClientRect();
    return [Math.round(Math.max(0, Math.min(WIDTH, (event.clientX - rect.left) * WIDTH / rect.width))), Math.round(Math.max(0, Math.min(HEIGHT, (event.clientY - rect.top) * HEIGHT / rect.height)))];
  };
  function start(event: React.PointerEvent<HTMLCanvasElement>) {
    if (busy || pointer.current !== null || event.button !== 0) return;
    event.currentTarget.focus({ preventScroll: true });
    if (strokes.length >= 250 || strokes.reduce((count, stroke) => count + stroke.points.length, 0) >= 12000) { setMessage('Canvas is full. Undo a stroke or download your drawing.'); return; }
    event.currentTarget.setPointerCapture(event.pointerId);
    pointer.current = event.pointerId;
    current.current = { color: eraser ? '#ffffff' : color, size, points: [point(event)] };
    renderDrawing(event.currentTarget, [...strokes, current.current]);
  }
  function move(event: React.PointerEvent<HTMLCanvasElement>) {
    if (pointer.current !== event.pointerId || !current.current) return;
    if (strokes.reduce((count, stroke) => count + stroke.points.length, 0) + current.current.points.length >= 12000) return;
    const next = point(event);
    const previous = current.current.points[current.current.points.length - 1];
    if (next[0] === previous[0] && next[1] === previous[1]) return;
    current.current.points.push(next);
    renderDrawing(event.currentTarget, [...strokes, current.current]);
  }
  function finish(event: React.PointerEvent<HTMLCanvasElement>) {
    if (event.pointerId !== pointer.current || !current.current) return;
    const stroke = current.current;
    current.current = null; pointer.current = null; requestId.current = null;
    setStrokes(previous => [...previous, stroke]); setRedo([]);
  }
  async function submit() {
    if (!validStrokes(strokes)) { setMessage('Draw something first!'); return; }
    setBusy(true); setMessage('Saving your drawing…');
    try {
      requestId.current ||= crypto.randomUUID();
      const response = await fetch('/api/drawings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: requestId.current, strokes }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setMessage('Your drawing is off to be approved. WOOHOO! Hopefully its nothing bad :).');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Could not save. Your drawing is still here—try again.'); }
    finally { setBusy(false); }
  }
  function download() {
    if (!canvas.current) return;
    const link = document.createElement('a'); link.download = 'my-doodle.png'; link.href = canvas.current.toDataURL('image/png'); link.click();
  }
  function undo() {
    if (busy || current.current || !strokes.length) return;
    setRedo(previous => [...previous, strokes[strokes.length - 1]]);
    setStrokes(strokes.slice(0, -1));
    requestId.current = null;
  }
  return <div className="paint-app" onKeyDown={event => {
    const target = event.target as HTMLElement;
    if (tab !== 'paint' || clearDialog.current?.open || target.closest('input, textarea, select, [contenteditable="true"]')) return;
    if ((event.ctrlKey || event.metaKey) && !event.altKey && !event.shiftKey && event.key.toLowerCase() === 'z') {
      event.preventDefault();
      event.stopPropagation();
      undo();
    }
  }}>
    <style>{`
      .paint-app { color:#000; background:#c0c0c0; height:100%; min-height:0; display:flex; flex-direction:column; overflow:hidden; font-size:1rem; }
      .paint-editor { flex:1; min-height:0; display:flex; flex-direction:column; }
      .paint-editor[hidden] { display:none; }
      .paint-tools, .paint-palette, .paint-editor > p { flex-shrink:0; }
      .paint-editor > p { margin:0; }
      .paint-app button, .paint-app select { font-family:inherit; color:#000; background:#c0c0c0; cursor:pointer; font-size:0.875rem; }
      .paint-app button { padding:5px 9px; min-height:32px; }
      .paint-app button:disabled { color:#666; cursor:default; }
      .paint-app button:focus-visible, .paint-app select:focus-visible { outline:2px dashed #000080; outline-offset:2px; }
      .paint-tools { display:flex; gap:6px; flex-wrap:wrap; align-items:center; padding:8px; }
      .paint-app button[aria-pressed=true] { border:2px inset #fff; background:#ffffe1; }
      .paint-palette { display:flex; flex-wrap:wrap; align-items:center; gap:6px; padding:10px; border-top:2px solid #fff; border-bottom:2px solid #808080; }
      .paint-palette button { width:30px; height:30px; min-height:30px; padding:0; }
      .paint-palette button[aria-pressed=true] { outline:2px solid #000080; outline-offset:1px; }
      .paint-confirm { position:fixed; inset:0; margin:auto; width:340px; max-width:calc(100vw - 24px); height:fit-content; padding:3px; background:#c0c0c0; color:#000; border:2px outset #fff; box-shadow:3px 3px #000; font-family:inherit; }
      .paint-confirm::backdrop { background:rgba(0,0,0,0.3); }
      .paint-confirm header { display:flex; align-items:center; justify-content:space-between; background:#000080; color:#fff; padding:3px 5px; }
      .paint-confirm header button { min-height:22px; padding:0 5px; }
    `}</style>
    <nav className="paint-tools" aria-label="Paint tabs"><button className="convex" aria-pressed={tab === 'paint'} onClick={() => setTab('paint')}>Paint</button><button className="convex" aria-pressed={tab === 'gallery'} onClick={() => setTab('gallery')}>Guest gallery</button></nav>
    <div className="paint-editor" hidden={tab !== 'paint'}>
      <div className="paint-tools">
        <button className="convex" disabled={busy} aria-pressed={!eraser} onClick={() => setEraser(false)}>✎ Pencil</button>
        <button className="convex" disabled={busy} aria-pressed={eraser} onClick={() => setEraser(true)}>Eraser</button>
        <label>Size <select disabled={busy} value={size} onChange={event => setSize(Number(event.target.value))}>{[2, 5, 10, 20].map(value => <option key={value} value={value}>{value}px</option>)}</select></label>
        <button className="convex" disabled={busy || !strokes.length} title="Undo (Ctrl+Z)" aria-keyshortcuts="Control+Z Meta+Z" onClick={undo}>Undo</button>
        <button className="convex" disabled={busy || !redo.length} onClick={() => { setStrokes([...strokes, redo[redo.length - 1]]); setRedo(redo.slice(0, -1)); requestId.current = null; }}>Redo</button>
        <button className="convex" disabled={busy || !strokes.length} onClick={() => clearDialog.current?.showModal()}>Clear</button>
      </div>
      <div className="paint-palette" aria-label="Colors"><strong style={{ fontSize: "0.875rem" }}>Colors</strong>{COLORS.map(value => <button key={value} disabled={busy} title={value} aria-label={`Color ${value}`} aria-pressed={color === value && !eraser} className="convex" style={{ background: value }} onClick={() => { setColor(value); setEraser(false); }} />)}<label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem' }}>Custom <input type="color" aria-label="Choose a custom drawing color" disabled={busy} value={color} onChange={event => { setColor(event.target.value); setEraser(false); }} style={{ width: '40px', height: '32px', cursor: 'pointer' }} /></label><span style={{ fontSize: '0.875rem' }}>{eraser ? 'Eraser (white)' : color.toUpperCase()}</span></div>
      <div ref={canvasSpace} style={{ flex: 1, minHeight: 0, margin: '0 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><canvas ref={canvas} tabIndex={0} width={WIDTH} height={HEIGHT} aria-label="Drawing canvas. Draw using a mouse, pen, or touch." onPointerDown={start} onPointerMove={move} onPointerUp={finish} onPointerCancel={finish} onLostPointerCapture={finish} style={{ display: 'block', width: canvasSize.width, height: canvasSize.height, flexShrink: 0, background: '#fff', touchAction: 'none', cursor: 'crosshair', border: '2px inset #eee' }} /></div>

      <div className="paint-tools"><button className="convex" disabled={busy || !strokes.length} onClick={submit}>{busy ? 'Saving…' : 'Submit'}</button><button className="convex" onClick={download}>Download PNG</button></div>
      <p style={{ padding: '0 10px', fontSize: '0.875rem' }}>Submit an anonymous drawing and wait for approval :D.</p>
      <p role="status" style={{ padding: '8px 10px', borderTop: '2px inset #eee', fontSize: '0.875rem' }}>{message}</p>
    </div>
    {tab === 'gallery' && <div style={{ flex: 1, minHeight: 0, overflow: 'auto' }}><DrawingGallery /></div>}
    <dialog ref={clearDialog} className="paint-confirm" aria-labelledby="clear-drawing-title" aria-describedby="clear-drawing-description">
      <header><strong id="clear-drawing-title">Paint — Clear drawing</strong><button className="convex" aria-label="Cancel clearing" onClick={() => clearDialog.current?.close()}>×</button></header>
      <p id="clear-drawing-description" style={{ padding: '16px 12px', margin: 0 }}>Clear your drawing and start fresh? This will erase the whole canvas.</p>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', padding: '0 12px 12px' }}>
        <button className="convex" autoFocus onClick={() => clearDialog.current?.close()}>Keep drawing</button>
        <button className="convex" onClick={() => { setStrokes([]); setRedo([]); requestId.current = null; setMessage('Fresh canvas. What will you draw next?'); clearDialog.current?.close(); }}>Clear drawing</button>
      </div>
    </dialog>
  </div>;
}
