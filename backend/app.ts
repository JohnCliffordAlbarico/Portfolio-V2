import 'dotenv/config';
import express, { type ErrorRequestHandler } from 'express';
import cors from 'cors';
import { sessionInput, scoreInput, listInput, scoreText, TypingError, unavailable } from './src/typing/domain.js';
import { SupabaseTypingStore, type TypingStore } from './src/typing/store.js';
import { typingLimiter } from './src/typing/rate.js';

export interface AppOptions {
  store?: TypingStore;
  clock?: () => Date;
  env?: NodeJS.ProcessEnv;
  frontendUrl?: string;
  rateLimitSecret?: string;
  rateLimits?: Partial<Record<'read' | 'session' | 'save', number>>;
  vercel?: boolean;
}
const positive = (value: string | undefined, fallback: number) => value && /^\d+$/.test(value) && Number.isSafeInteger(Number(value)) && Number(value) > 0 ? Number(value) : fallback;

export function createApp(options: AppOptions = {}) {
  const env = options.env ?? process.env;
  const clock = options.clock ?? (() => new Date());
  const secret = options.rateLimitSecret ?? env.TYPING_RATE_LIMIT_SECRET ?? '';
  let store = options.store;
  if (!store && env.SUPABASE_URL && (env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY)) {
    // Invalid/missing config must never prevent the root/health app from loading.
    try { store = new SupabaseTypingStore(env.SUPABASE_URL, (env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY)!); } catch { /* fail closed below */ }
  }
  const app = express();
  app.disable('x-powered-by');
  // Vercel's ingress rewrites X-Forwarded-For. Only the nearest platform hop is
  // trusted; locally, arbitrary client forwarding headers are ignored.
  app.set('trust proxy', (options.vercel ?? env.VERCEL === '1') ? 1 : false);
  app.use(cors({ origin: options.frontendUrl ?? env.FRONTEND_URL ?? 'http://localhost:5173' }));
  app.get('/', (_req, res) => { res.send('backend is running.'); });
  app.get('/health', (_req, res) => { res.json({ status: 'ok' }); });

  const router = express.Router();
  router.use((_req, res, next) => { res.set('Cache-Control', 'no-store'); next(); });
  if (!store || secret.length < 32) {
    router.use((_req, _res, next) => next(unavailable()));
  } else {
    const typingStore = store;
    const limits = {
      read: options.rateLimits?.read ?? positive(env.TYPING_READ_LIMIT, 120),
      session: options.rateLimits?.session ?? positive(env.TYPING_SESSION_LIMIT, 20),
      save: options.rateLimits?.save ?? positive(env.TYPING_SAVE_LIMIT, 30),
    };
    // Throttle before body parsing/validation, including malformed JSON/honeypots.
    router.post('/sessions', typingLimiter(store, 'session', secret, limits.session));
    router.post('/scores', typingLimiter(store, 'save', secret, limits.save));
    router.get('/scores', typingLimiter(store, 'read', secret, limits.read));
    router.use(express.json({ limit: '24kb' }));
    router.post('/sessions', async (req, res) => {
      const input = sessionInput.safeParse(req.body);
      if (!input.success) throw new TypingError(400, 'INVALID_REQUEST', 'Provide a 30 or 60 second duration and at most five valid recent passage IDs, with no extra fields.');
      res.status(201).json(await typingStore.createSession(input.data.durationSeconds, clock(), input.data.excludePassageIds ?? []));
    });
    router.post('/scores', async (req, res) => {
      const input = scoreInput.safeParse(req.body);
      if (!input.success) throw new TypingError(400, 'INVALID_REQUEST', 'Provide a valid session, nickname and nonempty final text, with no extra fields.');
      const session = await typingStore.getSession(input.data.sessionId);
      if (!session) throw new TypingError(404, 'SESSION_NOT_FOUND', 'This typing session was not found.');
      const now = clock().getTime();
      if (now >= Date.parse(session.expiresAt)) throw new TypingError(410, 'SESSION_EXPIRED', 'This typing session has expired. Start another attempt.');
      // Issuance time is a lower bound, not proof of continuous human typing.
      if (now < Date.parse(session.startedAt) + session.durationSeconds * 1000 - 1500) throw new TypingError(422, 'TOO_EARLY', 'Please finish the full typing duration before saving.');
      const stats = scoreText(session.passage.content, input.data.typedText, session.durationSeconds);
      const score = await typingStore.saveScore({ sessionId: session.sessionId, nickname: input.data.nickname, visitorId: input.data.visitorId, typedCharacters: stats.typedCharacters, correctCharacters: stats.correctCharacters });
      res.status(201).json({ score });
    });
    router.get('/scores', async (req, res) => {
      const input = listInput.safeParse(req.query);
      if (!input.success) throw new TypingError(400, 'INVALID_QUERY', 'Use duration 30 or 60, recent or top, limit 1–20 and offset 0–1000.');
      const scores = await typingStore.listScores(input.data);
      res.json({ scores: scores.slice(0, input.data.limit), pagination: { limit: input.data.limit, offset: input.data.offset, hasMore: scores.length > input.data.limit } });
    });
  }
  app.use('/api/typing', router);
  app.use((_req, res) => { res.status(404).json({ error: { code: 'NOT_FOUND', message: 'This endpoint was not found.' } }); });
  const errors: ErrorRequestHandler = (error, _req, res, _next) => {
    if (res.headersSent) return;
    let safe: TypingError;
    if (error instanceof TypingError) safe = error;
    else if (error?.type === 'entity.too.large') safe = new TypingError(413, 'PAYLOAD_TOO_LARGE', 'JSON requests must be at most 24kb.');
    else if (error?.type === 'entity.parse.failed') safe = new TypingError(400, 'INVALID_JSON', 'Provide valid JSON.');
    else safe = unavailable();
    res.status(safe.status).json({ error: { code: safe.code, message: safe.message } });
  };
  app.use(errors);
  return app;
}

export default createApp();
