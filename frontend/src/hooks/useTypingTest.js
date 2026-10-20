import { useEffect, useRef, useState } from 'react'
import { advanceTest, createTest, enterText, measure, startTest } from '../lib/typingEngine'
import { typingRequest } from '../lib/typingApi'
import { PRACTICE_PASSAGES } from '../constants/typingPassages'
import { passageHistory, pickPracticePassage } from '../lib/typingPassageHistory'

export default function useTypingTest(durationSeconds) {
  const [challenge, setChallenge] = useState(null)
  const [state, setState] = useState(() => createTest(durationSeconds))
  const current = useRef(createTest(durationSeconds))

  useEffect(() => {
    const controller = new AbortController()
    async function prepare() {
      try {
        const recentIds = passageHistory.get()
        const data = await typingRequest('/sessions', { body: { durationSeconds, ...(recentIds.length && { excludePassageIds: recentIds }) }, signal: controller.signal })
        if (!data.sessionId || typeof data.passage?.content !== 'string' || data.durationSeconds !== durationSeconds || !data.startedAt || !data.expiresAt) throw new Error('Invalid challenge')
        if (!controller.signal.aborted) {
          passageHistory.remember(data.passage.id)
          setChallenge(data)
        }
      } catch {
        if (!controller.signal.aborted) {
          const passage = pickPracticePassage(PRACTICE_PASSAGES, passageHistory.get())
          passageHistory.remember(passage.id)
          setChallenge({ passage })
        }
      }
    }
    prepare()
    return () => controller.abort()
  }, [durationSeconds])

  useEffect(() => {
    if (state.phase !== 'running') return
    const tick = () => {
      current.current = advanceTest(current.current, performance.now())
      setState(current.current)
    }
    const timer = setInterval(tick, 100)
    document.addEventListener('visibilitychange', tick)
    return () => {
      clearInterval(timer)
      document.removeEventListener('visibilitychange', tick)
    }
  }, [state.phase])

  function startTimer() {
    if (!challenge) return
    current.current = startTest(current.current, performance.now())
    setState(current.current)
  }

  function input(word, options) {
    if (!challenge) return current.current.word
    current.current = enterText(current.current, word, performance.now(), challenge.passage.content, options)
    setState(current.current)
    return current.current.word
  }

  const elapsed = state.phase === 'finished' ? durationSeconds : state.startedAt === null ? 0 : Math.min(durationSeconds, (state.now - state.startedAt) / 1000)
  const words = challenge?.passage.content.match(/\S+/gu) || []
  const expectedWord = words[state.wordIndex] || ''
  const complete = Boolean(challenge) && state.wordIndex >= words.length
  return { state, challenge, input, startTimer, expectedWord, complete, remaining: Math.max(0, Math.ceil(durationSeconds - elapsed)), stats: measure(challenge?.passage.content || '', state.text, elapsed) }
}
