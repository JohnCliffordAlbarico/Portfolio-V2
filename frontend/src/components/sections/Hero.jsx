import { Link } from 'react-router-dom'
import { ArrowRight, Download, FolderOpen, Award } from 'lucide-react'
import profileImage from '../../assets/profile.jpg'
import useTypewriter from '../../hooks/useTypewriter'

const skills = ['React', 'React Native', 'Electron', 'Express', 'Node.js']

const meta = [
  { icon: FolderOpen, label: 'projects', value: '4+' },
  { icon: Award, label: 'awards', value: '2' },
]

export default function Hero() {
  const { text } = useTypewriter({
    words: skills,
    typingSpeed: 90,
    deletingSpeed: 45,
    pauseDuration: 2200,
  })

  return (
    <section
      id="profile"
      className="relative grid min-h-[calc(100vh-4rem)] place-items-center px-6"
    >
      <div className="flex w-full max-w-6xl flex-col items-center gap-14 md:flex-row md:items-center md:gap-20">
        <div className="space-y-6 text-center md:flex-1 md:text-left">
          <p className="font-mono text-sm text-primary">
            <span className="text-muted">//</span> software developer
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            <span className="block">John Clifford M.</span>
            <span className="block">Albarico<span className="text-primary">.</span></span>
          </h1>
          <div className="space-y-3">
            <p className="text-lg text-foreground md:text-xl">
              Building modern apps with{' '}
              <span className="font-semibold text-primary">
                {text}
                <span className="animate-blink text-primary">|</span>
              </span>
            </p>
            <p className="mx-auto max-w-lg text-base text-muted md:mx-0">
              Web, mobile, and desktop applications — focused on scalable,
              efficient, and user-centered systems.
            </p>
          </div>

          <Link
            to="/projects"
            className="group mx-auto block w-full max-w-lg border-l-2 border-primary/60 pl-4 text-left transition-colors md:mx-0"
          >
            <p className="text-base font-semibold text-foreground transition-colors group-hover:text-primary">
              These are projects worth looking into.
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Real systems running real operations — clinic management,
              desktop controllers, live builds, each with a full case study.
            </p>
            <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors group-hover:text-accent">
              See the builds <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_24px_-8px_rgba(220,38,38,0.8)] transition-all hover:-translate-y-px hover:bg-accent"
            >
              View Projects
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              Contact Me
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2 py-2.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              Resume
              <Download size={14} />
            </a>
          </div>
        </div>

        <div className="w-72 shrink-0 sm:w-80">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-surface shadow-[0_0_40px_-12px_rgba(220,38,38,0.35)]">
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-primary/80" />
              <span className="size-2.5 rounded-full bg-primary/40" />
              <span className="size-2.5 rounded-full bg-primary/20" />
              <span className="ml-3 font-mono text-xs text-muted">
                ~/me
              </span>
            </div>
            <img
              src={profileImage}
              alt="John Clifford M. Albarico"
              className="h-80 w-full object-cover object-center sm:h-96"
            />
            <div className="flex gap-6 border-t border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-xs text-muted">
              {meta.map(({ icon: Icon, label, value }) => (
                <span key={label} className="flex items-center gap-1.5">
                  <Icon size={12} className="text-primary" />
                  {label}:<span className="text-foreground">{value}</span>
                </span>
              ))}
            </div>
            <div className="space-y-1.5 border-t border-white/10 px-4 py-3.5 font-mono text-sm leading-relaxed">
              <p className="w-full">
                <span className="text-primary">$</span>{' '}
                <span className="text-muted">whoami</span>
              </p>
              <p className="w-full pl-4 text-foreground">
                software developer
              </p>
              <p className="mt-1 w-full">
                <span className="text-primary">$</span>{' '}
                <span className="text-muted">cat stack.js</span>
              </p>
              <p className="w-full pl-4 text-muted">
                {'{ '}react, react-native, electron, express, node{' }'}
              </p>
              <p className="mt-1 w-full">
                <span className="text-primary">$</span>{' '}
                <span className="text-muted">status</span>
              </p>
              <p className="flex w-full items-center gap-2 pl-4 text-foreground">
                <span className="size-1.5 animate-pulse rounded-full bg-green-500" />
                available for work
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}