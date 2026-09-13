-- Run once in your connected Neon database's SQL editor.
CREATE TABLE paint_drawings (
  id uuid PRIMARY KEY,
  strokes jsonb NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved')),
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (octet_length(strokes::text) <= 300000)
);
CREATE INDEX paint_gallery_idx ON paint_drawings (status, created_at DESC);
CREATE TABLE paint_limits (
  visitor_hash text PRIMARY KEY,
  submitted_at timestamptz NOT NULL
);

-- A transaction-level lock makes the limits apply across concurrent Vercel functions.
CREATE FUNCTION submit_paint(drawing_id uuid, drawing_strokes jsonb, visitor text)
RETURNS text LANGUAGE plpgsql AS $$
BEGIN
  PERFORM pg_advisory_xact_lock(732901);
  IF EXISTS (SELECT 1 FROM paint_drawings WHERE id = drawing_id) THEN RETURN 'pending'; END IF;
  DELETE FROM paint_limits WHERE submitted_at < now() - interval '1 day';
  IF EXISTS (SELECT 1 FROM paint_limits WHERE visitor_hash = visitor AND submitted_at > now() - interval '5 minutes')
    OR (SELECT count(*) FROM paint_drawings WHERE created_at > now() - interval '1 day') >= 100
    OR (SELECT count(*) FROM paint_drawings WHERE status = 'pending') >= 500 THEN
    RETURN 'limited';
  END IF;
  INSERT INTO paint_drawings (id, strokes) VALUES (drawing_id, drawing_strokes);
  INSERT INTO paint_limits VALUES (visitor, now())
    ON CONFLICT (visitor_hash) DO UPDATE SET submitted_at = now();
  RETURN 'pending';
END;
$$;
