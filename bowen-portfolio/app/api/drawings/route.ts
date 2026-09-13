import { neon } from '@neondatabase/serverless';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { validStrokes } from '../../_lib/paint';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const reply = (data: unknown, status = 200) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
const configured = () => Boolean(process.env.DATABASE_URL && process.env.PAINT_ADMIN_SECRET?.length && process.env.PAINT_ADMIN_SECRET.length >= 32);
function isAdmin(request: Request) {
  const expected = process.env.PAINT_ADMIN_SECRET;
  const supplied = request.headers.get('authorization')?.replace(/^Bearer /, '');
  return Boolean(expected && supplied && Buffer.byteLength(expected) === Buffer.byteLength(supplied) && timingSafeEqual(Buffer.from(expected), Buffer.from(supplied)));
}

export async function GET(request: Request) {
  if (!configured()) return reply({ error: 'The guestbook is not connected yet. You can still draw and download your picture.' }, 503);
  const url = new URL(request.url);
  const admin = url.searchParams.get('review') === '1';
  if (admin && !isAdmin(request)) return reply({ error: 'Incorrect review key.' }, 401);
  const before = url.searchParams.get('before') || new Date().toISOString();
  if (!Number.isFinite(Date.parse(before))) return reply({ error: 'Invalid page.' }, 400);
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const drawings = await sql`SELECT id, strokes, created_at, status FROM paint_drawings WHERE status = ${admin ? 'pending' : 'approved'} AND created_at < ${before}::timestamptz ORDER BY created_at DESC LIMIT 12`;
    return reply({ drawings });
  } catch {
    return reply({ error: 'The gallery is unavailable right now. Please try again.' }, 503);
  }
}

export async function POST(request: Request) {
  if (!configured()) return reply({ error: 'The guestbook is not connected yet. Download your drawing to keep it.' }, 503);
  if (request.headers.get('origin') !== new URL(request.url).origin) return reply({ error: 'Please submit from this website.' }, 403);
  if (!request.headers.get('content-type')?.startsWith('application/json')) return reply({ error: 'Invalid drawing.' }, 415);
  // Bound the streamed body as well as declared length; never trust Content-Length alone.
  let text = '';
  const reader = request.body?.getReader();
  if (!reader) return reply({ error: 'Missing drawing.' }, 400);
  const decoder = new TextDecoder();
  let bytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 250000) { await reader.cancel(); return reply({ error: 'This drawing is too large. Try fewer strokes.' }, 413); }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
    const body = JSON.parse(text);
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.id) || !validStrokes(body.strokes)) return reply({ error: 'Add a drawing before submitting (up to 250 strokes).' }, 400);
    const address = process.env.VERCEL ? request.headers.get('x-vercel-forwarded-for') || 'unknown' : 'local-preview';
    const visitor = createHmac('sha256', process.env.PAINT_ADMIN_SECRET!).update(address).digest('hex');
    const sql = neon(process.env.DATABASE_URL!);
    const result = await sql`SELECT submit_paint(${body.id}::uuid, ${JSON.stringify(body.strokes)}::jsonb, ${visitor}) AS status`;
    if (result[0].status === 'limited') return reply({ error: 'The guestbook is taking a breather. Keep your drawing and try again later.' }, 429);
    return reply({ status: 'pending' }, 201);
  } catch (error) {
    if (error instanceof SyntaxError) return reply({ error: 'Invalid drawing.' }, 400);
    return reply({ error: 'Your drawing could not be saved. It is still here—please try again.' }, 503);
  }
}

export async function PATCH(request: Request) {
  if (!configured()) return reply({ error: 'Guestbook not configured.' }, 503);
  if (!isAdmin(request)) return reply({ error: 'Incorrect review key.' }, 401);
  try {
    const body = await request.json();
    if (typeof body.id !== 'string' || !/^[0-9a-f-]{36}$/i.test(body.id) || !['approve', 'delete'].includes(body.action)) return reply({ error: 'Invalid action.' }, 400);
    const sql = neon(process.env.DATABASE_URL!);
    if (body.action === 'approve') await sql`UPDATE paint_drawings SET status = 'approved' WHERE id = ${body.id}::uuid`;
    else await sql`DELETE FROM paint_drawings WHERE id = ${body.id}::uuid`;
    return reply({ ok: true });
  } catch {
    return reply({ error: 'Could not update drawing. Please retry.' }, 503);
  }
}
