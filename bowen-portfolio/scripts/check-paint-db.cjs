const { loadEnvConfig } = require('@next/env');
loadEnvConfig(process.cwd(), false, { info() {}, error() {} });
const { neon } = require('@neondatabase/serverless');
(async () => {
  if (!process.env.DATABASE_URL) { console.log('DATABASE_URL missing'); process.exitCode=1; return; }
  try {
    const sql=neon(process.env.DATABASE_URL);
    const rows=await sql`SELECT to_regclass('public.paint_drawings') IS NOT NULL AS drawings, to_regclass('public.paint_limits') IS NOT NULL AS limits, to_regprocedure('public.submit_paint(uuid,jsonb,text)') IS NOT NULL AS submit`;
    console.log(JSON.stringify({connected:true,schema:rows[0],reviewKeyConfigured: (process.env.PAINT_ADMIN_SECRET || '').length>=32}));
  } catch { console.log('Database check failed; connection or network unavailable. Credentials withheld.'); process.exitCode=1; }
})();
