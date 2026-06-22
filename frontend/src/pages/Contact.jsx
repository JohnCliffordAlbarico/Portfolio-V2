import { Mail, Send } from 'lucide-react'

export default function Contact() {
  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight">Contact</h1>
        <p className="mb-12 text-muted">
          Let&apos;s build something together.
        </p>

        <div className="mx-auto flex max-w-sm flex-col items-center gap-4 rounded-xl border border-white/5 bg-surface p-10">
          <Mail size={36} className="text-primary" />
          <p className="text-sm text-muted">Contact form coming soon.</p>
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 rounded-lg bg-primary/50 px-5 py-2.5 text-sm font-medium text-white/70"
          >
            <Send size={16} />
            Send Message
          </button>
        </div>
      </div>
    </div>
  )
}
