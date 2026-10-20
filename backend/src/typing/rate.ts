import { createHmac } from 'node:crypto';
import { isIP, SocketAddress } from 'node:net';
import { rateLimit, ipKeyGenerator, type Store } from 'express-rate-limit';
import type { TypingStore } from './store.js';
import { unavailable } from './domain.js';

export function networkKey(ip: string, secret: string): string {
  // SocketAddress canonicalizes alternate IPv6 spellings and mapped IPv4.
  let normalized = SocketAddress.parse(isIP(ip) === 6 ? `[${ip}]:0` : `${ip}:0`)?.address;
  if (!normalized) throw unavailable();
  if (normalized.startsWith('::ffff:')) {
    // SocketAddress may render the IPv4 tail as hexadecimal, so decode both forms.
    const tail = normalized.slice(7);
    if (tail.includes('.')) normalized = tail;
    else {
      const words = tail.split(':').map(value => parseInt(value, 16));
      normalized = `${words[0] >> 8}.${words[0] & 255}.${words[1] >> 8}.${words[1] & 255}`;
    }
  }
  return createHmac('sha256', secret).update(ipKeyGenerator(normalized, 56)).digest('hex');
}

export class DurableRateStore implements Store {
  localKeys = false;
  constructor(private store: TypingStore, private namespace: string, private windowMs: number) {}
  private async call(action: 'increment' | 'decrement' | 'reset', key: string) {
    try { return await this.store.rate(action, `${this.namespace}:${key}`, this.windowMs); }
    catch { throw unavailable(); }
  }
  increment(key: string) { return this.call('increment', key); }
  async decrement(key: string) { await this.call('decrement', key); }
  async resetKey(key: string) { await this.call('reset', key); }
}

export function typingLimiter(store: TypingStore, namespace: 'read' | 'session' | 'save', secret: string, limit: number) {
  const windowMs = namespace === 'read' ? 60000 : 600000;
  return rateLimit({
    windowMs, limit, store: new DurableRateStore(store, namespace, windowMs),
    keyGenerator: req => networkKey(req.ip ?? '', secret),
    standardHeaders: 'draft-7', legacyHeaders: false, passOnStoreError: false,
    // Ignoring forwarding headers locally is intentional, not a proxy misconfiguration.
    // The helper's source-code heuristic cannot see ipKeyGenerator inside networkKey.
    validate: { xForwardedForHeader: false, forwardedHeader: false, keyGeneratorIpFallback: false },
    handler: (_req, res) => { res.status(429).json({ error: { code: 'RATE_LIMITED', message: 'Too many requests. Please try again later.' } }); },
  });
}
