import { Link } from 'react-router-dom'
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa'

const socials = [
  { icon: FaGithub, label: 'GitHub', href: 'https://github.com/JohnCliffordAlbarico' },
  { icon: FaLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/clifford-albarico-1b3604369' },
  { icon: FaFacebook, label: 'Facebook', href: 'https://www.facebook.com/albarico.clifford' },
]

export default function ContactSection() {
  return (
    <section id="contact" className="min-h-[80vh] flex items-center px-6 py-24">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          Contact
        </h2>
        <p className="mb-10 text-muted">Let&apos;s build something together.</p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {socials.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-white/5 bg-surface px-5 py-3 text-sm text-muted transition-colors hover:border-primary/30 hover:text-foreground"
            >
              <Icon size={18} />
              {label}
            </a>
          ))}
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-accent"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </section>
  )
}