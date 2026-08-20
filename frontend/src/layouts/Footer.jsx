import { Mail } from 'lucide-react'
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-surface">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="font-mono text-sm text-muted">
          <span className="text-foreground">~/JCADev</span>
          <span className="mx-2 text-primary">&middot;</span>
          &copy; {year} John Clifford M. Albarico
        </p>

        <div className="flex items-center gap-4">
          <a
            href="mailto:cliffordalbarico20@gmail.com"
            className="text-muted transition-colors hover:text-primary"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
          <a
            href="https://github.com/JohnCliffordAlbarico"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-primary"
            aria-label="GitHub"
          >
            <FaGithub size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/clifford-albarico-1b3604369"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-primary"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={18} />
          </a>
          <a
            href="https://www.facebook.com/albarico.clifford"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-primary"
            aria-label="Facebook"
          >
            <FaFacebook size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
