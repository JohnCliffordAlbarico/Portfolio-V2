import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { type Duration, type ListQuery, TypingError, unavailable } from './domain.js';

export interface Session {
  sessionId: string;
  passage: { id: string; content: string };
  durationSeconds: Duration;
  startedAt: string;
  expiresAt: string;
}
export interface PublicScore {
  id: string; nickname: string; wpm: number; accuracy: number;
  durationSeconds: Duration; correctCharacters: number; typedCharacters: number; createdAt: string;
}
// Optional browser-local convenience UUID, never identity/auth or deduplication.
export interface ScoreDraft { sessionId: string; nickname: string; visitorId?: string; typedCharacters: number; correctCharacters: number }
export type RateAction = 'increment' | 'decrement' | 'reset';
export interface TypingStore {
  createSession(duration: Duration, now: Date, excludePassageIds?: string[]): Promise<Session>;
  getSession(id: string): Promise<Session | null>;
  saveScore(input: ScoreDraft): Promise<PublicScore>;
  /** Return up to limit+1 rows so pagination never needs an unbounded count. */
  listScores(input: ListQuery): Promise<PublicScore[]>;
  rate(action: RateAction, key: string, windowMs: number): Promise<{totalHits: number; resetTime: Date}>;
}

type Row = Record<string, any>;
const iso = (value: string | Date) => new Date(value).toISOString();
// Explicit allowlists keep visitor/session/network/internal fields out of public APIs.
export function publicScore(row: Row): PublicScore {
  return { id: row.id, nickname: row.nickname, wpm: Number(row.wpm), accuracy: Number(row.accuracy),
    durationSeconds: Number(row.duration_seconds) as Duration, correctCharacters: Number(row.correct_characters),
    typedCharacters: Number(row.typed_characters), createdAt: iso(row.created_at) };
}
export function sessionFromRow(row: Row): Session {
  return { sessionId: row.id, passage: { id: row.passage_id, content: row.content ?? row.typing_passages.content },
    durationSeconds: Number(row.duration_seconds) as Duration, startedAt: iso(row.started_at), expiresAt: iso(row.expires_at) };
}
export function databaseError(error: unknown): TypingError {
  const detail = error as { code?: string; constraint?: string; details?: string } | null;
  const code = detail?.code;
  if (code === 'PT404') return new TypingError(404, 'SESSION_NOT_FOUND', 'This typing session was not found.');
  if (code === 'PT409' || (code === '23505' && (detail?.constraint === 'typing_scores_session_id_key' || detail?.details?.startsWith('Key (session_id)=') === true))) return new TypingError(409, 'ALREADY_SAVED', 'This typing session has already been saved.');
  if (code === 'PT410') return new TypingError(410, 'SESSION_EXPIRED', 'This typing session has expired. Start another attempt.');
  if (code === 'PT422') return new TypingError(422, 'TOO_EARLY', 'Please finish the full typing duration before saving.');
  return unavailable();
}

export class SupabaseTypingStore implements TypingStore {
  private client: SupabaseClient;
  constructor(url: string, secret: string) {
    this.client = createClient(url, secret, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
  }
  private async rpc(name: string, params: Row): Promise<Row[]> {
    const { data, error } = await this.client.rpc(name, params);
    if (error) throw databaseError(error);
    if (!Array.isArray(data)) throw unavailable();
    return data;
  }
  async createSession(duration: Duration, now: Date, excludePassageIds: string[] = []) {
    const [row] = await this.rpc('create_typing_session', { p_duration: duration, p_started_at: now.toISOString(), p_exclude_passage_ids: excludePassageIds });
    if (!row) throw unavailable();
    return sessionFromRow(row);
  }
  async getSession(id: string) {
    const { data, error } = await this.client.from('typing_sessions').select('id,passage_id,duration_seconds,started_at,expires_at,typing_passages(content)').eq('id', id).maybeSingle();
    if (error) throw databaseError(error);
    return data ? sessionFromRow(data) : null;
  }
  async saveScore(input: ScoreDraft) {
    const [row] = await this.rpc('save_typing_score', { p_session_id: input.sessionId, p_nickname: input.nickname, p_typed: input.typedCharacters, p_correct: input.correctCharacters, p_visitor_id: input.visitorId ?? null });
    if (!row) throw unavailable();
    return publicScore(row);
  }
  async listScores(input: ListQuery) {
    let query = this.client.from('typing_scores').select('id,nickname,wpm,accuracy,duration_seconds,correct_characters,typed_characters,created_at').eq('duration_seconds', input.durationSeconds);
    if (input.sort === 'top') query = query.order('wpm', { ascending: false }).order('accuracy', { ascending: false });
    const { data, error } = await query.order('created_at', { ascending: false }).order('id', { ascending: false }).range(input.offset, input.offset + input.limit);
    if (error) throw databaseError(error);
    return (data ?? []).map(publicScore);
  }
  async rate(action: RateAction, key: string, windowMs: number) {
    const [row] = await this.rpc('typing_rate_limit', { p_key: key, p_window_ms: windowMs, p_action: action });
    if (!row || !Number.isInteger(row.total_hits) || row.total_hits < 0 || !Number.isFinite(Date.parse(row.reset_at))) throw unavailable();
    return { totalHits: row.total_hits, resetTime: new Date(row.reset_at) };
  }
}
