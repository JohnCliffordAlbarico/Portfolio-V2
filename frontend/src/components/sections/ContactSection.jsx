import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa'
import SectionHeading from '../SectionHeading'
import ChromeBar from '../ChromeBar'

const socials = [
  { icon: FaGithub, label: 'GitHub', href: 'https://github.com/JohnCliffordAlbarico' },
  { icon: FaLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/clifford-albarico-1b3604369' },
  { icon: FaFacebook, label: 'Facebook', href: 'https://www.facebook.com/albarico.clifford' },
]

export default function ContactSection() {
  return (
    <section id="contact" className="min-h-[80vh] flex items-center px-6 py-24">
      <div className="mx-auto w-full max-w-2xl">
        <SectionHeading
          eyebrow="contact"
          title="Let's build something together"
          description="Open to new opportunities, collaborations, and projects."
        />

        <div className="overflow-hidden rounded-xl border border-white/10 bg-surface">
          <ChromeBar filename="contact.md" />

          <div className="space-y-3 px-5 py-5 font-mono text-sm">
            <p className="text-muted">
              <span className="text-primary">$</span> cat contact.md
            </p>
            <p className="pl-4 text-foreground">
              # John Clifford M. Albarico
            </p>
            <p className="pl-4 text-muted">software developer · open to work</p>

            <p className="pt-2 text-muted">
              <span className="text-primary">$</span> git remote -v
            </p>
            <ul className="space-y-1.5 pl-4">
              {socials.map(({ label, href }) => (
                <li key={label} className="flex items-center gap-2 text-muted hover:text-foreground">
                  <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <p className="pt-2 text-muted">
              <span className="text-primary">$</span> npm run contact
            </p>
            <div className="pt-1">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent"
              >
                Contact Me
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}