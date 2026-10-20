import { useEffect, useRef, useState } from 'react'
import { typingRequest, visitorId } from '../../lib/typingApi'

export default function SaveResult({ sessionId, text, onSaved }) {
  const [nickname, setNickname] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const pending = useRef(null)
  useEffect(() => () => pending.current?.abort(), [])

  async function save(event) {
    event.preventDefault()
    if (pending.current || ['saved', 'duplicate', 'expired'].includes(status)) return
    const normalized = nickname.normalize('NFKC').trim().replace(/\s+/g, ' ')
    if (!/^[\p{L}\p{N} ._-]+$/u.test(normalized) || Array.from(normalized).length > 30) {
      setMessage('Use 1–30 letters, numbers, spaces, periods, underscores, or hyphens.')
      return
    }
    const controller = new AbortController()
    pending.current = controller
    setStatus('saving')
    setMessage('')
    try {
      const id = visitorId()
      const data = await typingRequest('/scores', { signal: controller.signal, body: { sessionId, nickname: normalized, typedText: text, ...(id && { visitorId: id }) } })
      if (!data.score || typeof data.score.wpm !== 'number' || typeof data.score.accuracy !== 'number') throw new Error('Invalid saved score')
      if (controller.signal.aborted) return
      setStatus('saved')
      setMessage('Saved. The result above is the score returned by the server.')
      onSaved(data.score)
    } catch (error) {
      if (controller.signal.aborted) return
      const messages = {
        409: 'This attempt has already been saved. Start another warm-up for a new result.',
        410: 'This session has expired. Your result stays here; try again for a saveable session.',
        429: 'Too many requests. Wait a little before trying to save again. Your result stays here.',
        422: 'The server is not ready to accept this result yet. Wait a moment and retry.',
      }
      setStatus(error.status === 409 ? 'duplicate' : error.status === 410 ? 'expired' : 'error')
      setMessage(messages[error.status] || 'Your result could not be saved. Check your connection and retry; your result stays here.')
    } finally {
      if (pending.current === controller) pending.current = null
    }
  }

  const locked = ['saving', 'saved', 'duplicate', 'expired'].includes(status)
  return <form className="typing-save" onSubmit={save} aria-busy={status === 'saving'}>
    <h3>Save this result, optionally</h3>
    <p>No account needed. Your display name, score, and date will be public. Leave this form blank to keep practicing privately.</p>
    <div className="form-field"><label htmlFor="typing-nickname">Display name</label><input id="typing-nickname" value={nickname} onChange={event => setNickname(event.target.value)} autoComplete="off" required disabled={locked} aria-describedby="nickname-help" /></div>
    <p id="nickname-help" className="typing-note">1–30 letters, numbers, spaces, periods, underscores, or hyphens.</p>
    <button className="button button-primary" type="submit" disabled={locked || !text}>{status === 'saving' ? 'Saving…' : status === 'saved' ? 'Result saved' : 'Save result'}</button>
    {message && <p role="status">{message}</p>}
  </form>
}
