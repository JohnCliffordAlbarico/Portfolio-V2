import { useEffect, useState } from 'react'
import { typingRequest } from '../../lib/typingApi'

export default function Records({ duration, sort }) {
  const [result, setResult] = useState({ status: 'loading', scores: [] })
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    const controller = new AbortController()
    async function load() {
      try {
        const data = await typingRequest(`/scores?durationSeconds=${duration}&sort=${sort}&limit=5&offset=0`, { signal: controller.signal })
        if (!Array.isArray(data.scores) || !data.pagination) throw new Error('Invalid records')
        if (!controller.signal.aborted) setResult({ status: 'ready', scores: data.scores })
      } catch {
        if (!controller.signal.aborted) setResult({ status: 'error', scores: [] })
      }
    }
    load()
    return () => controller.abort()
  }, [duration, sort, attempt])
  function retry() {
    setResult({ status: 'loading', scores: [] })
    setAttempt(value => value + 1)
  }
  return (
    <section className="content-section typing-records" aria-labelledby={`records-${sort}`}>
      <h2 id={`records-${sort}`}>{sort === 'recent' ? 'Recent results' : 'Top results'} · {duration}s</h2>
      {result.status === 'loading' && <p role="status">Loading public results…</p>}
      {result.status === 'error' && <><p role="status">Public results are unavailable right now. You can still practice.</p><button type="button" className="button" onClick={retry}>Retry results</button></>}
      {result.status === 'ready' && (result.scores.length ? <ul className="typing-score-list">{result.scores.map(score => <li key={score.id}>
        <div><strong>{score.nickname}</strong><time dateTime={score.createdAt}>{new Date(score.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</time></div>
        <p>{score.wpm} WPM · {score.accuracy}% accuracy · {score.durationSeconds}s</p>
      </li>)}</ul> : <p>No saved {duration}-second results yet.</p>)}
    </section>
  )
}
