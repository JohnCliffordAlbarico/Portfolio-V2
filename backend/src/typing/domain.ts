import { z } from 'zod';

export type Duration = 30 | 60;
const duration = z.union([z.literal(30), z.literal(60)]);
const website = z.literal('').optional();
const characters = (value: string) => Array.from(value).length;
const nickname = z.string()
  // Reject controls before normalization can turn them into permitted spaces.
  .refine(value => !/[\p{Cc}\p{Cf}]/u.test(value))
  .transform(value => value.normalize('NFKC').trim().replace(/ +/g, ' '))
  .refine(value => characters(value) >= 1 && characters(value) <= 30 && /^[\p{L}\p{N} ._-]+$/u.test(value));

export const sessionInput = z.strictObject({ durationSeconds: duration, excludePassageIds: z.array(z.uuid()).max(5).optional(), website });
export const scoreInput = z.strictObject({
  sessionId: z.uuid(), nickname,
  typedText: z.string().refine(value => characters(value) >= 1 && characters(value) <= 3000),
  visitorId: z.uuid().optional(), website,
});
const integerQuery = (fallback: number, min: number, max: number) => z.string().regex(/^\d+$/).transform(Number).pipe(z.number().int().min(min).max(max)).optional().transform(value => value ?? fallback);
export const listInput = z.strictObject({
  durationSeconds: z.enum(['30', '60']).optional().transform(value => Number(value ?? '30') as Duration),
  sort: z.enum(['recent', 'top']).default('recent'),
  limit: integerQuery(10, 1, 20), offset: integerQuery(0, 0, 1000),
});
export type ListQuery = z.infer<typeof listInput>;

export function scoreText(passage: string, text: string, duration: Duration) {
  const expected = Array.from(passage);
  const typed = Array.from(text);
  const correctCharacters = typed.reduce((count, character, index) => count + Number(character === expected[index]), 0);
  return {
    correctCharacters, typedCharacters: typed.length,
    wpm: Math.round((correctCharacters / 5) / (duration / 60) * 100) / 100,
    accuracy: typed.length ? Math.round(correctCharacters / typed.length * 10000) / 100 : 0,
  };
}

export class TypingError extends Error {
  constructor(public status: number, public code: string, message: string) { super(message); }
}
export const unavailable = () => new TypingError(503, 'UNAVAILABLE', 'Typing storage is currently unavailable.');
