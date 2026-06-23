import { useState } from 'react'
import { Send, Mail, CheckCircle, AlertCircle } from 'lucide-react'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'd7fcfd68-db84-4f8a-950a-271c9de13a54',
          subject: `New message from ${formData.name}`,
          from_name: formData.name,
          ...formData,
        }),
      })

      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-4 text-3xl font-bold tracking-tight">Contact</h1>
        <p className="mb-12 text-muted">
          Have a question or want to work together? Fill out the form below.
        </p>

        {status === 'success' ? (
          <div className="flex flex-col items-center gap-4 rounded-xl border border-white/10 bg-surface p-10 text-center">
            <CheckCircle size={40} className="text-green-500" />
            <p className="text-sm text-foreground">Message sent successfully!</p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="mt-2 text-sm text-primary transition-colors hover:text-accent"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 rounded-xl border border-white/10 bg-surface p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm text-muted">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm text-muted">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary/50"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm text-muted">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full resize-none rounded-lg border border-white/10 bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary/50"
                placeholder="Your message..."
              />
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 text-sm text-red-400">
                <AlertCircle size={16} />
                Something went wrong. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === 'sending' ? (
                'Sending...'
              ) : (
                <>
                  <Mail size={16} />
                  Send Message
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
