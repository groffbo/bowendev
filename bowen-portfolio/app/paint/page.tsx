import PaintWindow from '../_components/PaintWindow';
export default function PaintPage() {
  return <main style={{ height: '100vh', overflow: 'auto', background: '#c0c0c0', color: '#000' }}><a href="/" style={{ display: 'block', padding: '8px' }}>← Desktop</a><PaintWindow /></main>;
}
