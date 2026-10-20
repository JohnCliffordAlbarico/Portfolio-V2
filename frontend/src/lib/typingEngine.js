export function createTest(durationSeconds) {
  return { durationSeconds, text: '', word: '', wordIndex: 0, startedAt: null, deadline: null, phase: 'ready', now: 0 }
}

export function advanceTest(state, now) {
  if (state.phase !== 'running') return state
  return { ...state, now, phase: now >= state.deadline ? 'finished' : 'running' }
}

export function startTest(state, now) {
  const current = advanceTest(state, now)
  if (current.phase !== 'ready') return current
  return { ...current, startedAt: now, now, deadline: now + current.durationSeconds * 1000, phase: 'running' }
}

export function enterText(state, word, now, passage, { commit = false, composing = false } = {}) {
  const current = advanceTest(state, now)
  if (current.phase === 'finished') return current
  const words = passage.match(/\S+/gu) || []
  const expected = words[current.wordIndex]
  if (!expected) return current
  const prefix = current.text.slice(0, current.text.length - current.word.length)
  if (commit) {
    // Commit only text already accepted by the engine, never an incoming paste.
    if (word !== current.word || current.word !== expected) return current
    const separator = current.wordIndex < words.length - 1 ? ' ' : ''
    return { ...current, text: prefix + expected + separator, word: '', wordIndex: current.wordIndex + 1, now }
  }
  if (/\s/u.test(word) || Array.from(prefix + word).length > 3000) return current
  const before = Array.from(current.word)
  const after = Array.from(word)
  let start = 0
  while (start < before.length && start < after.length && before[start] === after[start]) start++
  let end = 0
  while (end < before.length - start && end < after.length - start && before[before.length - 1 - end] === after[after.length - 1 - end]) end++
  // Deletion and one-character replacement are valid; bulk insertion is not.
  // An IME may confirm several characters, but only inside this one word.
  if (!composing && after.length - start - end > 1) return current
  const timed = word.length ? startTest(current, now) : current
  return { ...timed, text: prefix + word, word, now }
}

export function analyzeWords(passage, text) {
  const words = Array.from(passage.matchAll(/\S+/gu), match => ({
    text: match[0], start: match.index, end: match.index + match[0].length,
    status: 'pending', typed: '',
  }))
  let position = 0
  let correctCharacters = 0
  for (const match of text.matchAll(/(\S+)(\s*)/gu)) {
    const [, typedWord, separator] = match
    if (position >= words.length) break
    const committed = separator.length > 0
    let target = position
    if (typedWord !== words[position].text) {
      // Retain alignment for already committed text, but never preview a skip:
      // the single-word field must stay on the required word until it matches.
      const next = committed
        ? words.findIndex((word, index) => index > position && word.text === typedWord)
        : -1
      if (next !== -1) target = next
    }
    for (let index = position; index < target; index++) words[index].status = 'skipped'
    const word = words[target]
    const expected = Array.from(word.text)
    const typed = Array.from(typedWord)
    correctCharacters += typed.reduce((count, character, index) => count + Number(character === expected[index]), 0)
    // One actual source separator can earn credit, never repeated input spaces.
    if (committed && word.end < passage.length) correctCharacters++
    word.typed = typedWord
    word.status = committed ? typedWord === word.text && target - position <= 1 ? 'correct' : 'incorrect' : 'active'
    position = target + Number(committed)
  }
  if (position < words.length) words[position].status = 'active'
  return { words, activeWordIndex: position, correctCharacters, typedCharacters: Array.from(text).length }
}

export function measure(passage, text, seconds) {
  const { correctCharacters, typedCharacters } = analyzeWords(passage, text)
  const round = value => Math.round(value * 100) / 100
  return {
    wpm: seconds > 0 ? round((correctCharacters / 5) / (seconds / 60)) : 0,
    accuracy: typedCharacters ? round(correctCharacters / typedCharacters * 100) : 0,
    correctCharacters,
    typedCharacters,
  }
}
