import { useEffect, useEffectEvent, useRef, useState } from 'react'

export default function TypingInput({ inputRef, word, expectedWord, input, startTimer, disabled, finished, complete, onCaretChange }) {
  const composing = useRef(false)
  const [draft, setDraft] = useState(null)
  const [feedback, setFeedback] = useState('')
  const invalid = Boolean(word) && !expectedWord.startsWith(word)

  function updateSelection(field) {
    if (composing.current) return
    onCaretChange(Array.from(field.value.slice(0, field.selectionStart)).length)
  }

  function applyInput(field, options) {
    const position = field.selectionStart
    const attempted = field.value
    const accepted = input(attempted, options)
    // Restore rejected edits even when the engine's state did not change.
    if (attempted !== accepted) {
      field.value = accepted
      setFeedback('Type the word directly. Bulk and multi-word input are disabled.')
    } else setFeedback('')
    const caret = Math.min(position, accepted.length)
    field.setSelectionRange(caret, caret)
    updateSelection(field)
  }

  function commitWord(field) {
    if (!word || finished || complete) {
      field.value = word
      return
    }
    if (word !== expectedWord) {
      field.value = word
      setFeedback('Finish or correct the highlighted word before pressing Space.')
      return
    }
    field.value = input(word, { commit: true })
    field.setSelectionRange(field.value.length, field.value.length)
    setFeedback('')
    updateSelection(field)
  }

  const handleBeforeInput = useEffectEvent(event => {
    const type = event.inputType || ''
    if (type.startsWith('history') || type.startsWith('insertFromPaste') || type === 'insertFromDrop') {
      event.preventDefault()
      setFeedback('Type the word directly. Pasting and drag-and-drop are disabled.')
    } else if (type === 'insertText' && event.data === ' ' && !composing.current && !event.isComposing) {
      // Soft keyboards need not emit keydown. Commit accepted state, not the
      // resulting DOM value, which depends on the caret/selection location.
      event.preventDefault()
      commitWord(event.target)
    }
  })

  useEffect(() => {
    const field = inputRef.current
    function beforeInput(event) {
      handleBeforeInput(event)
    }
    // React's beforeinput abstraction does not consistently expose inputType.
    field.addEventListener('beforeinput', beforeInput)
    return () => field.removeEventListener('beforeinput', beforeInput)
  }, [inputRef])

  function keyDown(event) {
    // Candidate acceptance and editing belong to the IME until composition ends.
    if (composing.current || event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229) return
    const undo = (event.ctrlKey || event.metaKey) && ['z', 'y'].includes(event.key.toLowerCase())
    if (event.key === ' ') {
      event.preventDefault()
      commitWord(event.currentTarget)
    } else if (undo || event.key === 'Enter') event.preventDefault()
  }

  return <>
    <input
      ref={inputRef}
      id="typing-input"
      type="text"
      value={finished || complete ? word : draft ?? word}
      onChange={event => {
        if (composing.current) {
          if (event.target.value.length) startTimer()
          setDraft(event.target.value)
        }
        else if (event.target.value === `${word} `) commitWord(event.currentTarget)
        else applyInput(event.currentTarget)
      }}
      onSelect={event => updateSelection(event.currentTarget)}
      onKeyDown={keyDown}
      onPaste={event => {
        event.preventDefault()
        setFeedback('Type the word directly. Pasting is disabled.')
      }}
      onDrop={event => {
        event.preventDefault()
        setFeedback('Type the word directly. Drag-and-drop is disabled.')
      }}
      onCompositionStart={() => { composing.current = true }}
      onCompositionEnd={event => {
        composing.current = false
        setDraft(null)
        applyInput(event.currentTarget, { composing: true })
      }}
      disabled={disabled}
      readOnly={finished || complete}
      spellCheck={false}
      autoCorrect="off"
      autoCapitalize="off"
      autoComplete="off"
      aria-invalid={invalid || undefined}
      aria-describedby="typing-help typing-word-feedback typing-status"
    />
    <p id="typing-word-feedback" className="typing-word-feedback" role="status">{finished || complete ? '' : feedback || (invalid ? 'This word does not match. Use Backspace or select letters to correct it.' : '')}</p>
  </>
}
