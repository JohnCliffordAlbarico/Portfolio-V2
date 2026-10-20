import { Fragment, useEffect, useRef } from 'react'
import { analyzeWords } from '../../lib/typingEngine'

export default function Passage({ content, text, caretPosition, complete }) {
  const { words } = analyzeWords(content, text)
  const caret = useRef(null)
  const viewport = useRef(null)
  useEffect(() => {
    if (!caret.current || !viewport.current) return
    const top = caret.current.offsetTop
    viewport.current.scrollTop = Math.max(0, top - viewport.current.clientHeight / 2)
  }, [text, caretPosition])
  return (
    <div className="typing-passage" ref={viewport} aria-hidden="true">
      {content.slice(0, words[0]?.start ?? content.length)}
      {words.map((word, wordIndex) => {
        const status = complete && word.status === 'active' ? 'correct' : word.status
        const active = status === 'active'
        const expected = Array.from(word.text)
        const typed = Array.from(word.typed)
        const characters = [...expected, ...typed.slice(expected.length)]
        const offset = Math.min(caretPosition ?? typed.length, characters.length)
        return <Fragment key={word.start}>
          <span className={`typing-word ${status}`}>
            {active ? <>
              {characters.map((character, index) => {
                const status = index < typed.length ? typed[index] === expected[index] ? 'correct' : 'incorrect' : 'pending'
                return <span key={index} ref={index === offset ? caret : undefined} className={`typing-character ${status}${index === offset ? ' caret' : ''}`}>{character}</span>
              })}
              {offset === characters.length && <span ref={caret} className="typing-character caret" />}
            </> : word.text}
          </span>
          {content.slice(word.end, words[wordIndex + 1]?.start ?? content.length)}
        </Fragment>
      })}
    </div>
  )
}
