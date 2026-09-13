import { DrawingGallery } from '../../_components/PaintWindow';

export default function ReviewDrawings() {
  return <main style={{ height: '100vh', overflow: 'auto', background: '#c0c0c0', color: '#000', padding: '16px' }}>
    <a href="/">← Desktop</a><h1>Review guest drawings</h1>
    <p>Approve a drawing to show it in the gallery, or delete it. Your review key is kept only in this open page.</p>
    <DrawingGallery review />
  </main>;
}
