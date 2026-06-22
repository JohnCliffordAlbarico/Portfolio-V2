import { Link } from 'react-router-dom'
import { ArrowRight, User } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="hero"
      className="flex min-h-[calc(100vh-4rem)] items-center px-6"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1fr_auto]">
        <div className="space-y-6">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Full Stack Developer
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            John Clifford M. Albarico
          </h1>
          <p className="max-w-lg text-lg text-muted">
            Building modern web and mobile applications using React, React
            Native, Express, and Supabase.
          </p>
          <div className="flex flex-wrap gap-4">
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
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="flex size-48 items-center justify-center rounded-2xl border border-white/10 bg-surface sm:size-56">
            <User size={80} className="text-muted/40" strokeWidth={1} />
          </div>
        </div>
      </div>
    </section>
  )
}
