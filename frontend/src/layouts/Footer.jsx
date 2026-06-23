import { Mail } from 'lucide-react'
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-muted">
          &copy; {year} John Clifford M. Albarico. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-muted transition-colors hover:text-primary"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
          <a
            href="#"
            className="text-muted transition-colors hover:text-primary"
            aria-label="GitHub"
          >
            <FaGithub size={18} />
          </a>
          <a
            href="#"
            className="text-muted transition-colors hover:text-primary"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={18} />
          </a>
          <a
            href="#"
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
