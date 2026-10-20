import { useEffect, useRef, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import useTypingTest from '../hooks/useTypingTest'
import Passage from '../components/typing/Passage'
import SaveResult from '../components/typing/SaveResult'
import ResultModal from '../components/typing/ResultModal'
import Records from '../components/typing/Records'
import TypingInput from '../components/typing/TypingInput'
import '../styles/typing.css'

function TypingAttempt({ duration, restart, onSaved, focusOnReady }) {
  const { state, challenge, input, startTimer, expectedWord, complete, remaining, stats } = useTypingTest(duration)
  const [savedScore, setSavedScore] = useState(null)
  const [resultDismissed, setResultDismissed] = useState(false)
  const [caretPosition, setCaretPosition] = useState(null)
  const inputRef = useRef(null)
  const finished = state.phase === 'finished'
  const displayed = savedScore || stats
  useEffect(() => {
    if (challenge && focusOnReady) inputRef.current?.focus({ preventScroll: true })
  }, [challenge, focusOnReady])
  function saved(score) {
    setSavedScore(score)
    onSaved()
  }
  return <>
    <p className="typing-mode" role="status">{!challenge ? 'Preparing a passage…' : challenge.sessionId ? 'Session ready · saving is optional after completion.' : 'Local practice · service unavailable. This attempt cannot be saved.'}</p>
    <dl className="typing-measurements" aria-label={finished ? 'Final result' : 'Live measurements'}>
      <div><dt>Time left</dt><dd>{remaining}s</dd></div>
      <div><dt>{finished ? 'Final WPM' : 'Live WPM'}</dt><dd>{displayed.wpm}</dd></div>
      <div><dt>Character accuracy</dt><dd>{displayed.accuracy}%</dd></div>
    </dl>
    {challenge && <>
      <div className="sr-only"><h2>Passage to type</h2><p>{challenge.passage.content}</p></div>
      <Passage content={challenge.passage.content} text={state.text} caretPosition={caretPosition} complete={complete} />
    </>}
    <div className="form-field typing-entry">
      <label htmlFor="typing-input">Type the highlighted word</label>
      <TypingInput inputRef={inputRef} word={state.word} expectedWord={expectedWord} input={input} startTimer={startTimer} disabled={!challenge} finished={finished} complete={complete} onCaretChange={setCaretPosition} />
    </div>
    <p id="typing-help" className="typing-note">The {duration}-second timer starts with your first character. Type the underlined word, then press Space. The field clears only when the word matches, including case and punctuation. Use Backspace to correct it. Completed words stay saved in your attempt; paste and drop are disabled.</p>
    <p id="typing-status" className="typing-note" role="status">{!challenge ? 'Waiting for a passage.' : finished ? `Warm-up complete. ${displayed.correctCharacters} correct characters in ${duration} seconds.` : complete ? 'Passage complete. Waiting for the timer to finish.' : state.phase === 'running' ? 'Timer running. Keep typing until time ends.' : 'Ready when you are.'}</p>
    <div className="typing-attempt-actions">
      <button type="button" className="button" onClick={restart}><RotateCcw size={15} aria-hidden="true" />{finished ? 'Try again' : 'Restart'}</button>
      {finished && <button type="button" className="button typing-view-result" onClick={() => setResultDismissed(false)}>View result</button>}
    </div>
    {finished && <ResultModal open={!resultDismissed} score={displayed} duration={duration} onClose={() => setResultDismissed(true)} onRetry={restart}>
      {challenge.sessionId && state.text ? <SaveResult sessionId={challenge.sessionId} text={state.text} onSaved={saved} /> : <p>{challenge.sessionId ? 'There is no final text to save. Try another warm-up.' : 'This local practice result cannot be saved. Try again to request a saveable session.'}</p>}
    </ResultModal>}
  </>
}

export default function Playground() {
  const [duration, setDuration] = useState(30)
  const [attempt, setAttempt] = useState(0)
  const [revision, setRevision] = useState(0)
  return <div className="typing-playground">
    <header className="page-heading"><h1>Typing warm-up</h1><p>A casual 30- or 60-second pause to practice typing. Start without a name; saving a result is optional.</p></header>
    <div className="typing-toolbar">
      <div className="typing-duration" role="group" aria-label="Warm-up duration">{[30, 60].map(value => <button key={value} type="button" className={`button${duration === value ? ' button-primary' : ''}`} aria-pressed={duration === value} onClick={() => setDuration(value)}>{value} seconds</button>)}</div>
    </div>
    <TypingAttempt key={`${duration}-${attempt}`} duration={duration} focusOnReady={attempt > 0} restart={() => setAttempt(value => value + 1)} onSaved={() => setRevision(value => value + 1)} />
    <Records key={`recent-${duration}-${revision}`} duration={duration} sort="recent" />
    <Records key={`top-${duration}-${revision}`} duration={duration} sort="top" />
    <p className="typing-note typing-timing-note">Saved scores are calculated by the server. Session timing checks minimum elapsed time since passage issuance; it does not verify human typing.</p>
  </div>
}
