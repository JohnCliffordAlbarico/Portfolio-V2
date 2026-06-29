import { Link } from 'react-router-dom'
import { ArrowRight, Download, FolderOpen, Mail, Award } from 'lucide-react'
import profileImage from '../../assets/profile.jpg'

const stats = [
  { icon: FolderOpen, label: 'Projects', value: '4+' },
  { icon: Award, label: 'Awards', value: '2' },
  { icon: Mail, label: 'Status', value: 'Available for Work', highlight: true },
]

export default function Hero() {
  return (
    <section
      id="profile"
      className="grid min-h-[calc(100vh-4rem)] place-items-center px-6"
    >
      <div className="flex w-full max-w-6xl flex-col items-center gap-12 md:flex-row md:items-center md:gap-16">
        <div className="shrink-0">
          <div className="size-48 overflow-hidden rounded-2xl border-2 border-primary/40 bg-surface shadow-[0_0_30px_-5px_rgba(220,38,38,0.35)] sm:size-56">
            <img
              src={profileImage}
              alt="John Clifford M. Albarico"
              className="size-full object-cover object-center"
            />
          </div>
        </div>

        <div className="space-y-6 text-center md:text-left">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Aspiring Full Stack Developer
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            John Clifford M. Albarico
          </h1>
          <p className="mx-auto max-w-lg text-lg text-muted md:mx-0">
            Passionate about building modern web applications using Reactjs,
            React Native, Node.js, and Supabase. Currently focused on developing
            scalable, efficient, and user-centered systems while continuously
            improving my skills in full-stack development.
          </p>

          <div className="flex flex-wrap justify-center gap-6 md:justify-start">
            {stats.map(({ icon: Icon, label, value, highlight }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-muted">
                {highlight ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                    <span className="size-1.5 rounded-full bg-blue-400 animate-pulse" />
                    {value}
                  </span>
                ) : (
                  <>
                    <Icon size={16} className="text-primary" />
                    <span className="font-semibold text-foreground">{value}</span>
                    <span>{label}</span>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent"
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
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              Resume
              <Download size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
