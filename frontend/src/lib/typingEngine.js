export function createTest(durationSeconds) {
  return { durationSeconds, text: '', startedAt: null, deadline: null, phase: 'ready', now: 0 }
}

export function advanceTest(state, now) {
  if (state.phase !== 'running') return state
  return { ...state, now, phase: now >= state.deadline ? 'finished' : 'running' }
}

export function enterText(state, text, now) {
  const current = advanceTest(state, now)
  if (current.phase === 'finished') return current
  const bounded = Array.from(text).slice(0, 3000).join('')
  if (current.startedAt === null && bounded.length) {
    return { ...current, text: bounded, startedAt: now, now, deadline: now + current.durationSeconds * 1000, phase: 'running' }
  }
  return { ...current, text: bounded, now }
}

export function measure(passage, text, seconds) {
  const expected = Array.from(passage)
  const typed = Array.from(text)
  const correctCharacters = typed.reduce((count, character, index) => count + Number(character === expected[index]), 0)
  const round = value => Math.round(value * 100) / 100
  return {
    wpm: seconds > 0 ? round((correctCharacters / 5) / (seconds / 60)) : 0,
    accuracy: typed.length ? round(correctCharacters / typed.length * 100) : 0,
    correctCharacters,
    typedCharacters: typed.length,
  }
}
