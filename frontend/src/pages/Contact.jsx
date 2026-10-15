import { useEffect, useRef, useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const requestRef = useRef(null)

  useEffect(() => () => requestRef.current?.abort(), [])

  const handleChange = (event) => setFormData(previous => ({ ...previous, [event.target.name]: event.target.value }))

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (requestRef.current || new FormData(event.currentTarget).get('botcheck')) return
    const controller = new AbortController()
    requestRef.current = controller
    setStatus('sending')
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'd7fcfd68-db84-4f8a-950a-271c9de13a54',
          subject: `New message from ${formData.name.trim()}`,
          from_name: formData.name.trim(),
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      })
      const data = await response.json()
      if (controller.signal.aborted) return
      if (!response.ok || !data.success) throw new Error('Message was not accepted')
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch {
      if (!controller.signal.aborted) setStatus('error')
    } finally {
      if (requestRef.current === controller) requestRef.current = null
    }
  }

  return (
    <>
      <header className="page-heading"><h1>Have something in mind?</h1><p>A question, a project, or an opportunity—I'd love to hear about it.</p></header>
      {status === 'success' ? <section className="form-success" role="status"><CheckCircle size={32} aria-hidden="true" /><h2>Message sent.</h2><p>Thanks for reaching out. I'll get back to you using the email you provided.</p><button className="button" type="button" onClick={() => setStatus('idle')}>Send another message</button></section> :
        <form className="contact-form" method="post" onSubmit={handleSubmit} aria-busy={status === 'sending'}>
          <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} aria-hidden="true" autoComplete="off" />
          <div className="form-row">
            <div className="form-field"><label htmlFor="name">Name</label><input id="name" name="name" required maxLength={100} autoComplete="name" placeholder="Your name" value={formData.name} onChange={handleChange} disabled={status === 'sending'} /></div>
            <div className="form-field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required maxLength={254} autoComplete="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} disabled={status === 'sending'} /></div>
          </div>
          <div className="form-field"><label htmlFor="message">Message</label><textarea id="message" name="message" required maxLength={5000} rows={6} placeholder="Tell me a little about what you have in mind…" value={formData.message} onChange={handleChange} disabled={status === 'sending'} /></div>
          {status === 'error' && <p className="form-message" role="alert"><AlertCircle size={18} aria-hidden="true" />Your message couldn't be sent. Please try again, or reach me by email below.</p>}
          <div><button className="button button-primary" type="submit" disabled={status === 'sending'}><Send size={15} aria-hidden="true" />{status === 'sending' ? 'Sending…' : 'Send message'}</button></div>
          <span className="sr-only" role="status">{status === 'sending' ? 'Sending your message.' : ''}</span>
        </form>}
      <p className="contact-alternative">Prefer email? <a href="mailto:cliffordalbarico20@gmail.com">cliffordalbarico20@gmail.com</a></p>
    </>
  )
}
