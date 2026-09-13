const fs = require('node:fs');
const { randomBytes } = require('node:crypto');
const { loadEnvConfig } = require('@next/env');
loadEnvConfig(process.cwd(), false, { info() {}, error() {} });
const { neon } = require('@neondatabase/serverless');
(async () => {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const [existing] = await sql`SELECT to_regclass('public.paint_drawings') IS NOT NULL AS drawings, to_regclass('public.paint_limits') IS NOT NULL AS limits, to_regprocedure('public.submit_paint(uuid,jsonb,text)') IS NOT NULL AS submit`;
    if (!existing.drawings && !existing.limits && !existing.submit) {
      const schema = fs.readFileSync('db/paint.sql', 'utf8');
      const functionStart = schema.indexOf('CREATE FUNCTION');
      const statements = schema.slice(0, functionStart).split(';').map(s => s.trim()).filter(s => s && !s.startsWith('-- A transaction'));
      statements.push(schema.slice(functionStart));
      await sql.transaction(statements.map(statement => sql.query(statement)));
      console.log('Guestbook schema created.');
    } else if (existing.drawings && existing.limits && existing.submit) console.log('Guestbook schema already exists; preserved.');
    else throw new Error('Partial schema');
    if (!process.env.PAINT_ADMIN_SECRET) {
      fs.appendFileSync('.env.local', '\nPAINT_ADMIN_SECRET=' + randomBytes(32).toString('hex') + '\n');
      console.log('Review key generated in ignored .env.local; value withheld.');
    } else console.log('Existing review key preserved.');
  } catch { console.log('Setup did not complete. Credentials and database details withheld.'); process.exitCode = 1; }
})();
