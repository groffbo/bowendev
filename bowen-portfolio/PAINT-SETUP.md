# Paint guestbook on Vercel

The Paint icon opens an anonymous drawing guestbook. The drawing tools and PNG downloads work without a database. Public submissions and the gallery require the setup below. This change does not deploy the site or create paid resources.

## Connect storage

1. In the Vercel project's Storage / Marketplace section, connect a **Neon Postgres** database. Choose a plan yourself and connect the environments you intend to use.
2. Confirm the integration supplies a server-only `DATABASE_URL`. Use a separate database or branch for previews if you do not want preview submissions in production.
3. Run [db/paint.sql](db/paint.sql) once in that database's Neon SQL editor. The file creates the tables, indexes, and submission function; it is not run automatically on requests.
4. Generate a random review secret, for example with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`. Save it privately and add it to Vercel as `PAINT_ADMIN_SECRET`. At least 32 characters are required. Never prefix either variable with `NEXT_PUBLIC_`, commit values, or paste them into a chat.
5. Redeploy the Vercel project so the environment variables take effect. For local development, add the same variable names to an ignored `.env.local` file.

## Review password

Set server-only `PAINT_REVIEW_PASSWORD` in `.env.local` and in Vercel Production, then redeploy. The review page uses this password when set; otherwise it falls back to `PAINT_ADMIN_SECRET`. Keep `PAINT_ADMIN_SECRET` configured for submission rate-limit hashing.

## Review drawings

Open `/paint/review` and enter `PAINT_REVIEW_PASSWORD` (or `PAINT_ADMIN_SECRET` if no separate password is set). The key stays in memory in the open page and is sent as a bearer credential over HTTPS; closing the page clears it. Approve publishes a drawing; Delete removes it. Public API requests only return approved drawings. Nothing publishes automatically.

To remove an already-approved drawing, use Neon's table editor to delete its `paint_drawings` row. This also removes its stored brush strokes; there are no orphan image files.

## Storage and limits

- Drawings are bounded brush-stroke JSON, rendered into a 480×320 canvas. No uploaded image files, names, emails, or accounts are needed. A PNG is generated locally only when a visitor downloads it.
- Each drawing permits 250 strokes, 12,000 points, allowed colors/sizes, and a 250 KB request body. Gallery pages contain 12 drawings.
- Submissions default to pending review. A database transaction enforces one submission per visitor-address hash per five minutes, 100 total submissions per day, and a queue cap of 500 pending drawings. Repeat requests with the same drawing UUID do not duplicate a submission.
- The server hashes Vercel's forwarded visitor address using the secret; it does not save the raw address. Rate-limit hashes older than one day are removed on the next successful invocation of the submission function. Hosting-provider access logs are independent of application storage.
- The unfinished draft lives only in the visitor's browser. It is not shared storage. A failed submission retains the drawing and offers retry/download.
- Limits are basic abuse protection, not a bot-detection service. Vercel firewall rules can provide additional controls if the guestbook attracts abuse.

## Verify after connecting

1. Open Paint; draw with mouse and touch, undo/redo, and download the PNG.
2. Submit and confirm the success message says it is pending. Refresh: the public gallery must not show it yet.
3. Check `/paint/review` rejects an incorrect key, then approve with the correct key.
4. Refresh the gallery in a different browser and confirm the drawing appears.
5. Try a second submission within five minutes and confirm it is limited without losing the draft.

Database-backed integration checks require a connected database; they cannot be verified from the unconfigured checkout.

References: [Vercel Postgres integrations](https://vercel.com/docs/postgres), [Neon serverless driver](https://neon.com/docs/serverless/serverless-driver).
