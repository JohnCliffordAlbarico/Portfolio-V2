import { Mail } from 'lucide-react'
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa'

const links = [
  { icon: Mail, label: 'Email' },
  { icon: FaGithub, label: 'GitHub' },
  { icon: FaLinkedin, label: 'LinkedIn' },
  { icon: FaFacebook, label: 'Facebook' },
]

export default function ContactSection() {
  return (
    <section id="contact" className="min-h-[80vh] flex items-center px-6 py-24">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          Contact
        </h2>
        <p className="mb-10 text-muted">Let&apos;s build something together.</p>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {links.map(({ icon: Icon, label }) => (
            <a
              key={label}
              href="#"
              className="flex items-center gap-2 rounded-lg border border-white/5 bg-surface px-5 py-3 text-sm text-muted transition-colors hover:border-primary/30 hover:text-foreground"
            >
              <Icon size={18} />
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
