const { loadEnvConfig } = require('@next/env');
loadEnvConfig(process.cwd(), false, { info() {}, error() {} });
const { neon } = require('@neondatabase/serverless');
const { randomUUID } = require('node:crypto');
(async () => {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const id = randomUUID(), second = randomUUID(), visitor = 'integration-test-' + randomUUID();
    const strokes = JSON.stringify([{ color: '#3ca9d2', size: 5, points: [[10, 10], [30, 30]] }]);
    const results = await sql.transaction([
      sql`SELECT submit_paint(${id}::uuid, ${strokes}::jsonb, ${visitor}) AS status`,
      sql`SELECT submit_paint(${id}::uuid, ${strokes}::jsonb, ${visitor}) AS status`,
      sql`SELECT count(*)::int AS count FROM paint_drawings WHERE id = ${id}::uuid AND status = 'approved'`,
      sql`SELECT submit_paint(${second}::uuid, ${strokes}::jsonb, ${visitor}) AS status`,
      sql`UPDATE paint_drawings SET status = 'approved' WHERE id = ${id}::uuid RETURNING status, strokes`,
      sql`DELETE FROM paint_drawings WHERE id IN (${id}::uuid, ${second}::uuid)`,
      sql`DELETE FROM paint_limits WHERE visitor_hash = ${visitor}`,
    ]);
    if (results[0][0].status !== 'pending' || results[1][0].status !== 'pending' || results[2][0].count !== 0 || results[3][0].status !== 'limited' || results[4][0].status !== 'approved' || results[4][0].strokes[0].color !== '#3ca9d2') throw new Error('Unexpected result');
    console.log('Database checks passed: custom color storage, pending-only submission, idempotent retry, rate limit, approval. Test records removed within the same transaction.');
  } catch { console.log('Database integration check failed; transaction rolled back if it failed, otherwise test records were removed. Details withheld.'); process.exitCode = 1; }
})();
