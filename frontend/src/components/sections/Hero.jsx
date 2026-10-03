import { Link } from 'react-router-dom'
import { ArrowRight, Download, FolderOpen, Award } from 'lucide-react'
import {
  SiReact,
  SiElectron,
  SiExpress,
  SiNodedotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiSupabase,
  SiPostgresql,
  SiTurso,
  SiSqlite,
  SiDocker,
} from 'react-icons/si'
import profileImage from '../../assets/profile.jpg'

const techs = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'React Native', icon: SiReact, color: '#61DAFB' },
  { name: 'Electron', icon: SiElectron, color: '#4DC6E8' },
  { name: 'Express', icon: SiExpress, color: '#F5F5F5' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38BDF8' },
  { name: 'Supabase', icon: SiSupabase, color: '#3ECF8E' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#6398C4' },
  { name: 'Turso', icon: SiTurso, color: '#4FF8D2' },
  { name: 'SQLite', icon: SiSqlite, color: '#4AA3DF' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
]

const meta = [
  { icon: FolderOpen, label: 'projects', value: '4+' },
  { icon: Award, label: 'awards', value: '2' },
]

export default function Hero() {
  return (
    <section
      id="profile"
      className="relative flex min-h-[calc(100vh-4rem)] overflow-x-clip px-4 py-12 sm:px-6 md:py-8"
    >
      <div className="m-auto flex w-full max-w-6xl flex-col items-center gap-10 md:flex-row md:items-center md:gap-12 lg:gap-20">
        <div className="space-y-6 text-center md:flex-1 md:text-left">
          <p className="font-mono text-sm text-primary">
            <span className="text-muted">//</span> software developer
          </p>
          <h1 className="break-words text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            <span className="block">John Clifford M.</span>
            <span className="block">Albarico<span className="text-primary">.</span></span>
          </h1>
          <div className="space-y-3">
            <p className="text-lg text-foreground md:text-xl">
              I mostly build websites and web apps,
            </p>
            <p className="mx-auto max-w-lg text-base text-muted md:mx-0">
              but I also take on mobile and desktop builds — focused on
              scalable, efficient, and easy-to-use systems.
            </p>
            <div
              aria-hidden="true"
              className="group relative mx-auto max-w-lg overflow-hidden md:mx-0 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
            >
              <div className="flex w-max animate-marquee gap-2 pr-2 group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap">
                {[...techs, ...techs].map(({ name, icon: Icon, color }, i) => (
                  <span
                    key={`${name}-${i}`}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-muted"
                  >
                    <Icon size={13} aria-hidden="true" style={{ color }} />
                    {name}
                  </span>
                ))}
              </div>
            </div>
            <p className="sr-only">Tech stack: {techs.map((t) => t.name).join(', ')}</p>
          </div>

          <Link
            to="/projects"
            className="group mx-auto block w-full max-w-lg border-l-2 border-primary/60 pl-4 text-left transition-colors md:mx-0"
          >
            <p className="text-base font-semibold text-foreground transition-colors group-hover:text-primary">
              Want to see what I can build?
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Take a look at my projects — real work, real results, each
              with the full story behind it.
            </p>
            <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors group-hover:text-accent">
              Browse the projects <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
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

        <div className="w-full max-w-[20rem] shrink-0 sm:w-80">
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
              className="h-56 w-full object-cover object-center sm:h-64 lg:h-72"
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
              <p className="w-full pl-4 text-muted">
                active clients: <span className="text-foreground">1</span>
              </p>
              <p className="w-full pl-4 text-muted">
                total clients: <span className="text-foreground">2</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}