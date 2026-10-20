# Portfolio typing warm-up

An anonymous 30/60-second typing utility at `/playground`, integrated with the React portfolio. Anyone can practice without a name. Saving a completed attempt is optional and uses a public display name, not an account. Different visitors may use the same nickname.

The frontend remains JavaScript. The backend uses Express/TypeScript, Supabase PostgreSQL, and server-side scoring. Supabase Realtime Presence is optional and independent of saved scores.

When a test ends, a results modal opens automatically with final WPM, accuracy, correct characters, duration, and the optional save form when a saveable session exists. Close it using the close button, Escape, or the backdrop; **View result** reopens it with nickname and save status preserved. **Try again** starts a new attempt and returns focus to the typing field once the passage is ready. On smaller screens the modal body scrolls while its header and actions stay available.

Practice uses natural English prose, not generated word lists. Twenty distinct authored passages are available locally, with the same bank added to Supabase by the natural-passages migration. The browser remembers its last five passage IDs in tab-scoped session storage (memory fallback when storage is blocked), and both server and local selection avoid them when the active pool is large enough. Restarting or changing duration does not reset this history. Small custom pools prefer a passage other than the most recent; a one-passage pool remains usable.

## 1. Run locally

Use **Node.js 24**. In separate terminals, from the indicated directories:

```sh
# backend/
npm ci
npm run dev
```

```sh
# frontend/
npm ci
npm run dev
```

Open `http://localhost:5173/playground`. Vite forwards `/api` to the backend at `http://localhost:3000`; its production preview has the same local proxy. `/health` returns `{ "status": "ok" }`.

The backend can start without Supabase credentials. In that case typing API requests return JSON `503`, the page offers clearly labeled local practice, saving is unavailable, and public records show an unavailable state. No demo scores or visitor counts are fabricated.

For a compiled standalone backend, stop the development process, run `npm run build`, then `npm start` from `backend/`. The output entry is `dist/server.js`. The existing Socket.IO listener is preserved for standalone use; the typing feature itself uses REST, and its optional Presence uses Supabase.

## 2. Set up Supabase

Create a Supabase project. Open the SQL Editor and apply these files **in order**:

1. `backend/supabase/migrations/202610190001_typing.sql`
2. `backend/supabase/migrations/202610190002_passages.sql`
3. `backend/supabase/migrations/202610190003_passage_rotation.sql`
4. `backend/supabase/migrations/202610190004_natural_passages.sql`

On a fresh database these create the three public typing tables, constraints/indexes, service-only RPCs, private rate buckets, and 23 long natural-English passages. No scores are seeded. The migrations are for a new schema; if you already created similarly named tables manually, reconcile their schema before applying instead of dropping existing data.

**If the first two migrations were already applied, apply only 003 and 004 for the natural-paragraph update, then restart/redeploy the backend.** The rotation migration replaces only the session-creation function, keeps its original two-argument call supported through a defaulted exclusion list, and preserves service-only execution. The new seed inserts 20 passages by stable ID with `ON CONFLICT DO NOTHING`; it never rewrites an existing used passage or removes a session/score. Your entire `backend/supabase/` folder remains Git-ignored as requested, including these new migration files.

All three public tables have RLS enabled and no anonymous/authenticated read/write grants. The browser cannot insert scores directly, even when configured with a publishable key for Presence. Server-only functions have restricted execution grants and a fixed search path. The private rate-limit table is not a visitor table and stores HMAC network keys, counts, and expiration times, not raw addresses.

If new RPCs are not immediately discovered by the API, run `NOTIFY pgrst, 'reload schema';` in the SQL Editor.

### Backend environment

Use `backend/.env.example` as the template for local `backend/.env`, or set the same values in the hosting dashboard:

```dotenv
PORT=3000
FRONTEND_URL=http://localhost:5173
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SECRET_KEY=YOUR_SERVER_SECRET_KEY
TYPING_RATE_LIMIT_SECRET=YOUR_RANDOM_SECRET_AT_LEAST_32_CHARACTERS
TYPING_READ_LIMIT=120
TYPING_SESSION_LIMIT=20
TYPING_SAVE_LIMIT=30
```

Prefer Supabase's new **secret** key. The legacy `SUPABASE_SERVICE_ROLE_KEY` is also supported. These keys and the HMAC secret stay on the backend; never prefix them with `VITE_`. Generate a random HMAC secret locally, for example with `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`.

Changing the HMAC secret changes effective network buckets. Keep the same secret across backend instances. Missing/invalid storage configuration fails closed for typing APIs while keeping health usable. Restart the backend after changing environment values.

### Frontend environment

`frontend/.env.example` contains public browser configuration:

```dotenv
# Blank locally uses the Vite proxy.
VITE_API_BASE_URL=
# Optional Presence, not database write credentials.
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

Use the publishable key for Presence; `VITE_SUPABASE_ANON_KEY` is a supported legacy fallback. Keep the existing optional contact-form key if used. Vite variables are embedded at build time, so rebuild/redeploy after changing them.

## 3. REST contract

All routes are below `/api/typing`. Bodies must be JSON. Safe errors use `{ "error": { "code": "CODE", "message": "Explanation" } }`.

### `POST /sessions`

```json
{ "durationSeconds": 30 }
```

Returns HTTP `201` with `{ sessionId, passage: { id, content }, durationSeconds, startedAt, expiresAt }`. The backend chooses a random active passage, creates a UUID, and records server issuance time. Expiry is issuance plus the duration plus ten minutes.

An optional `excludePassageIds` array accepts at most five UUIDs, ordered newest first, to avoid recently displayed passages. The browser supplies its recent history automatically. Exclusions only influence passage selection: clients cannot supply the passage text, timing, WPM, or accuracy. The server still records and scores against its own selected original passage. Duration-only clients remain supported.

The local timer starts when the visitor first enters a character, after the passage is ready. Restart/duration changes request a new challenge. Save eligibility requires a real server-issued session; fallback passages are local practice only, even though their stable passage IDs match the new seed bank. Only passage IDs are remembered locally, not typed text, nicknames, or scores. Cancellation does not remember an abandoned challenge.

### `POST /scores`

```json
{
  "sessionId": "SERVER_ISSUED_UUID",
  "nickname": "Clifford",
  "typedText": "The final text left in the input",
  "visitorId": "OPTIONAL_BROWSER_UUID"
}
```

Returns HTTP `201` with `{ "score": PublicScore }`. Omit `visitorId` when unavailable; it is not a login or secure identity. A random browser-local ID may be stored with a score, but is not exposed in public results or used as authorization or a duplicate constraint.

The server loads the original passage, checks timing/expiry, computes character counts, and saves authoritative statistics. The SQL save function locks the session and rechecks timing/uniqueness before insert. Unknown/client-supplied statistics are rejected. Saved results have no public edit/delete endpoint.

Nickname rules: NFKC normalization, trimmed/collapsed spaces, 1–30 Unicode letters/numbers/spaces/periods/underscores/hyphens. Markup/control/zero-width input is rejected. Final text is limited to 3,000 Unicode characters; request bodies are capped at 24kb. An optional `website` honeypot must be empty if supplied.

Relevant statuses: `400` invalid input/query/JSON, `404` unknown session, `409` session already saved, `410` expired, `413` oversized body, `422` submitted too early, `429` limited, `503` storage/configuration unavailable. A failed save leaves the local completion visible.

### `GET /scores`

Example: `/api/typing/scores?durationSeconds=30&sort=top&limit=5&offset=0`.

- `durationSeconds`: 30 or 60, default 30; every list filters one duration.
- `sort`: `recent` or `top`, default recent. Top uses WPM, accuracy, date, then ID for deterministic ties.
- `limit`: 1–20, default 10; `offset`: 0–1000, default 0.
- Response: `{ scores: PublicScore[], pagination: { limit, offset, hasMore } }`.
- `PublicScore`: `id`, `nickname`, `wpm`, `accuracy`, `durationSeconds`, `correctCharacters`, `typedCharacters`, `createdAt`.

Public results never include final typed text, visitor/session IDs, network identifiers, or secrets. The page requests five recent and five top records for its selected duration. Nicknames are rendered as React text, not HTML.

## 4. Scoring and abuse model

Compare the final Unicode characters against the passage at the same positions, case-sensitively:

```text
WPM = (correct characters / 5) / (configured duration seconds / 60)
Accuracy = (correct characters / total final typed characters) × 100
```

Round to two decimals. Corrected Backspace errors do not count: this is **final-text accuracy**, not a keystroke error history. Final WPM always uses the configured 30 or 60 seconds. Temporary live estimates use elapsed local time; late input is rejected at the monotonic deadline, even after delayed/background callbacks.

Saving requires at least the full duration since server challenge issuance, with 1,500ms tolerance. This is not proof of continuous typing or human input: a scripted client can wait, paste, or automate. The feature is a casual utility, not a verified competition.

Protections include strict validation/body limits, an empty honeypot, durable network throttles, server-scored statistics, session expiry, unique session saves, and row locking. Each attempt can be saved only once; concurrent saves have one winner. Different valid attempts can share a nickname, browser ID, network, WPM, or accuracy.

Rate limits apply before parsing/validation, including malformed/spam requests. Defaults are 120 reads/minute, 20 new sessions/ten minutes, and 30 submission attempts/ten minutes per network. Keys normalize IPv4/mapped IPv6, group IPv6 `/56` subnets, and are HMAC-hashed. PostgreSQL atomic counters work across Vercel instances. Responses include standard rate headers and `Retry-After` on a blocked request. A storage outage does not silently disable limits.

Only Vercel mode (`VERCEL=1`, set by the platform) trusts one forwarding hop. Locally, arbitrary client forwarding headers are ignored. If deploying behind a different reverse proxy, explicitly review its trusted ingress configuration before enabling proxy trust. Browser CORS is an origin control, not authentication or a bot detector.

Used passage text should not be edited in place: add a new passage row and deactivate the old one with `is_active = false`. Issued sessions retain their original passage reference. Rate buckets are swept in bounded batches. For longer-running installations, an owner-run scheduled cleanup may delete expired **unsaved** sessions; keep sessions referenced by saved scores to preserve the foreign key.

## 5. Optional site Presence

Configure the frontend's Supabase URL and publishable key and permit the public Realtime Presence channel `portfolio-presence` in the project. No table publication or visitor database table is needed for Presence. Do not loosen the typing tables' RLS or grants.

The optional browser SDK is loaded dynamically by the persistent portfolio layout. Each connection gets a random Presence key, tracks a minimal empty payload, syncs actual connected browser clients across all portfolio routes, and untracks/removes the channel on cleanup. A muted `N browsing now` line appears below the profile location only after a confirmed connection; it counts browser connections, not unique people, and multiple tabs count separately. Missing configuration or a disconnect hides the line rather than inventing zero.

## 6. Deployment

### Vercel: two projects from this repository

| Project | Root directory | Framework | Build | Output |
| --- | --- | --- | --- | --- |
| Portfolio | `frontend` | Vite | `npm run build` | `dist` |
| Typing API | `backend` | Express | `npm run build` | Express function |

Use Node24. `frontend/vercel.json` preserves clean prerendered URLs and favicon headers. `backend/vercel.json` selects the native Express integration. Vercel recognizes `backend/app.ts`'s default Express export; it does not need to start the standalone `server.ts` Socket.IO listener. Long-lived Socket.IO hosting is separate from Vercel Functions and is not used for this typing feature.

Backend deployment environment: Supabase URL/server secret, stable HMAC secret, limit values, and `FRONTEND_URL=https://YOUR_PORTFOLIO_DOMAIN` with no trailing slash. Frontend build environment: `VITE_API_BASE_URL=https://YOUR_BACKEND_DOMAIN` and optional public Presence configuration. Configure production and preview environment values appropriately; a changing preview frontend origin needs a corresponding allowed backend origin.

After deployment, verify health, create a challenge, wait for the actual test duration, save once, confirm a repeated save is409, and check both duration-filtered result lists. Check direct `/playground` HTML/metadata, unknown404 URLs, and real Presence connect/disconnect if enabled. Vercel account linking, DNS, live credentials, and applying hosted migrations are owner/account-side steps and have not been performed by local tests.

### Existing Render portfolio

The existing static deployment remains supported. Its blueprint includes the exact `/playground → /playground/index.html` rewrite. Apply that rewrite in the dashboard if the site is dashboard-managed. Set `VITE_API_BASE_URL` to the hosted backend before rebuilding. Retain route-specific prerendered pages; do not use a catch-all rewrite to the homepage.

## 7. Verification commands

From `backend/`:

```sh
npm test
npm run build
```

From `frontend/`:

```sh
npm test
npm run lint
npm run build
```

The focused backend passage-selection tests use PGlite to execute actual PostgreSQL migrations/RPCs and HTTP requests on ephemeral ports without cloud credentials. They cover bounded recent exclusions, small active pools, new content, original-passage integrity, service-only execution/backward compatibility, authoritative scoring, and duplicate saves. PGlite's single local connection is not a multi-connection production load test. Frontend tests cover passage history/storage failure, non-repeating local selection, the timer/scoring state machine, API cancellation/error handling, and Presence lifecycle. Live Supabase/PostgREST/Presence and deployed Vercel must still be checked against the configured project.
