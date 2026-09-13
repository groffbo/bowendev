export const WIDTH = 480;
export const HEIGHT = 320;
export const COLORS = ['#000000', '#808080', '#ffffff', '#800000', '#ff0000', '#ff8000', '#ffff00', '#008000', '#00ff00', '#008080', '#00ffff', '#000080', '#0000ff', '#800080', '#ff00ff', '#804000'];
export type Stroke = { color: string; size: number; points: [number, number][] };
export type Drawing = { id: string; strokes: Stroke[]; created_at: string; status?: string };

export function validStrokes(value: unknown): value is Stroke[] {
  if (!Array.isArray(value) || value.length < 1 || value.length > 250) return false;
  let total = 0;
  return value.every(stroke => {
    if (!stroke || (typeof stroke.color !== 'string' || !/^#[0-9a-f]{6}$/i.test(stroke.color)) || ![2, 5, 10, 20].includes(stroke.size) || !Array.isArray(stroke.points) || !stroke.points.length) return false;
    total += stroke.points.length;
    return total <= 12000 && stroke.points.every((p: unknown) => Array.isArray(p) && p.length === 2 && p.every(Number.isFinite) && p[0] >= 0 && p[0] <= WIDTH && p[1] >= 0 && p[1] <= HEIGHT);
  }) && value.some(stroke => stroke.color.toLowerCase() !== '#ffffff');
}

export function renderDrawing(canvas: HTMLCanvasElement, strokes: Stroke[]) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  for (const stroke of strokes) {
    if (!stroke.points.length) continue;
    ctx.strokeStyle = ctx.fillStyle = stroke.color;
    ctx.lineWidth = stroke.size;
    ctx.beginPath();
    ctx.arc(stroke.points[0][0], stroke.points[0][1], stroke.size / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(...stroke.points[0]);
    for (const point of stroke.points.slice(1)) ctx.lineTo(...point);
    ctx.stroke();
  }
}
