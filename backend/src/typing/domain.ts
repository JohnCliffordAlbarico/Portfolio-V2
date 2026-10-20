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
  // Keep alignment in sync with frontend/src/lib/typingEngine.js. Only the
  // server's original passage and submitted final text determine saved credit.
  const words = Array.from(passage.matchAll(/\S+/gu));
  let position = 0;
  let correctCharacters = 0;
  for (const match of text.matchAll(/(\S+)(\s*)/gu)) {
    const [, typedWord, separator] = match;
    if (position >= words.length) break;
    const committed = separator.length > 0;
    let target = position;
    if (typedWord !== words[position][0]) {
      const next = committed
        ? words.findIndex((word, index) => index > position && word[0] === typedWord)
        : words[position + 1]?.[0] === typedWord ? position + 1 : -1;
      if (next !== -1) target = next;
    }
    const word = words[target];
    const expected = Array.from(word[0]);
    correctCharacters += Array.from(typedWord).reduce((count, character, index) => count + Number(character === expected[index]), 0);
    if (committed && word.index + word[0].length < passage.length) correctCharacters++;
    position = target + Number(committed);
  }
  const typedCharacters = characters(text);
  return {
    correctCharacters, typedCharacters,
    wpm: Math.round((correctCharacters / 5) / (duration / 60) * 100) / 100,
    accuracy: typedCharacters ? Math.round(correctCharacters / typedCharacters * 10000) / 100 : 0,
  };
}

export class TypingError extends Error {
  constructor(public status: number, public code: string, message: string) { super(message); }
}
export const unavailable = () => new TypingError(503, 'UNAVAILABLE', 'Typing storage is currently unavailable.');
