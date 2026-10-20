import { useEffect, useRef } from 'react'

export default function Passage({ content, text }) {
  const typed = Array.from(text)
  const expected = Array.from(content)
  const caret = useRef(null)
  const viewport = useRef(null)
  useEffect(() => {
    if (!caret.current || !viewport.current) return
    const top = caret.current.offsetTop
    viewport.current.scrollTop = Math.max(0, top - viewport.current.clientHeight / 2)
  }, [text])
  return (
    <div className="typing-passage" ref={viewport} aria-hidden="true">
      {expected.map((character, index) => {
        const status = index < typed.length ? typed[index] === character ? 'correct' : 'incorrect' : 'pending'
        return <span key={index} ref={index === typed.length ? caret : undefined} className={`typing-character ${status}${index === typed.length ? ' caret' : ''}`}>{character}</span>
      })}
      {typed.slice(expected.length).map((character, index) => <span key={`extra-${index}`} className="typing-character incorrect">{character}</span>)}
      {typed.length >= expected.length && <span ref={caret} className="typing-character caret"> </span>}
    </div>
  )
}
