import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { RotateCcw, X } from 'lucide-react'

export default function ResultModal({ open, score, duration, onClose, onRetry, children }) {
  const dialogRef = useRef(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    if (!open) return
    const dialog = dialogRef.current
    const previouslyFocused = document.activeElement
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (previouslyFocused?.isConnected) previouslyFocused.focus({ preventScroll: true })
    }
  }, [open])

  return createPortal(
    <dialog ref={dialogRef} className="image-dialog typing-result-dialog" aria-labelledby={titleId} aria-describedby={descriptionId} onCancel={event => { event.preventDefault(); onClose() }} onClick={event => { if (event.target === event.currentTarget) onClose() }}>
      <header className="image-dialog-header">
        <h2 id={titleId}>Warm-up complete</h2>
        <button className="icon-button" type="button" aria-label="Close typing results" onClick={onClose} autoFocus><X size={20} aria-hidden="true" /></button>
      </header>
      <div className="typing-result-body">
        <dl className="typing-result-stats" aria-label="Final typing result">
          <div><dt>Words per minute</dt><dd>{score.wpm}</dd></div>
          <div><dt>Accuracy</dt><dd>{score.accuracy}%</dd></div>
          <div><dt>Correct characters</dt><dd>{score.correctCharacters}</dd></div>
          <div><dt>Test duration</dt><dd>{duration}s</dd></div>
        </dl>
        <p id={descriptionId} className="typing-note">Accuracy measures your final text; errors corrected with Backspace do not count. Final WPM uses the full selected duration.</p>
        {children}
      </div>
      <footer className="typing-result-actions">
        <button className="button" type="button" onClick={onClose}>Close</button>
        <button className="button button-primary" type="button" onClick={onRetry}><RotateCcw size={15} aria-hidden="true" />Try again</button>
      </footer>
    </dialog>, document.body,
  )
}
