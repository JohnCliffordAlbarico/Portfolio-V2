import { useState, useEffect, useCallback, useMemo } from 'react'

const PHASE = {
  TYPING: 'typing',
  PAUSING: 'pausing',
  DELETING: 'deleting',
}

function getInitialText(words) {
  if (typeof window === 'undefined') return ''
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return prefersReduced ? words[0] : ''
}

export default function useTypewriter({
  words,
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseDuration = 2000,
}) {
  const [text, setText] = useState(() => getInitialText(words))
  const [phase, setPhase] = useState(PHASE.TYPING)
  const [wordIndex, setWordIndex] = useState(0)

  const currentWord = words[wordIndex]
  const prefersReduced = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )

  const tick = useCallback(() => {
    if (phase === PHASE.TYPING) {
      if (text.length < currentWord.length) {
        setText(currentWord.slice(0, text.length + 1))
      } else {
        setPhase(PHASE.PAUSING)
      }
    } else if (phase === PHASE.DELETING) {
      if (text.length > 0) {
        setText(text.slice(0, -1))
      } else {
        setWordIndex((prev) => (prev + 1) % words.length)
        setPhase(PHASE.TYPING)
      }
    }
  }, [text, phase, currentWord, words.length])

  useEffect(() => {
    if (prefersReduced) return

    let timeout

    if (phase === PHASE.PAUSING) {
      timeout = setTimeout(() => setPhase(PHASE.DELETING), pauseDuration)
    } else {
      const speed = phase === PHASE.TYPING ? typingSpeed : deletingSpeed
      timeout = setTimeout(tick, speed)
    }

    return () => clearTimeout(timeout)
  }, [phase, tick, pauseDuration, typingSpeed, deletingSpeed, prefersReduced])

  return { text }
}
