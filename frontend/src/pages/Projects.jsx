import { Stethoscope, LayoutDashboard, Timer, Wrench, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

const projects = [
  {
    icon: Stethoscope,
    title: 'Bacaltos Clinic',
    description:
      'A full-stack clinic management platform with role-based access, patient records, appointment scheduling, and disease forecasting features.',
    tech: ['React', 'Express', 'Supabase'],
    url: 'https://bacaltosclinic.onrender.com/',
    status: 'live',
  },
  {
    icon: LayoutDashboard,
    title: 'Yuuko Workspace',
    description:
      'A personal workspace for task tracking with duration and analytics to review productivity over time.',
    tech: ['React', 'Supabase'],
    url: 'https://yuuko-workspace.onrender.com/',
    status: 'live',
  },
  {
    icon: Timer,
    title: 'Pomodoro App',
    description:
      'A React Native mobile application with Supabase authentication, Google login integration, and customizable focus session tracking.',
    tech: ['React Native', 'Supabase'],
    url: null,
    status: 'coming-soon',
  },
  {
    icon: Wrench,
    title: 'More Projects',
    description:
      'Currently building new projects. Stay tuned for updates.',
    tech: [],
    url: null,
    status: 'coming-soon',
  },
]

export default function Projects() {
  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-4 text-3xl font-bold tracking-tight">Projects</h1>
        <p className="mb-12 max-w-2xl text-muted">
          A collection of my work. Some are live, others are coming soon.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map(({ icon: Icon, title, description, tech, url, status }) => (
            <div
              key={title}
              className={`flex flex-col rounded-xl border p-6 transition-colors ${
                status === 'live'
                  ? 'border-white/5 bg-background hover:border-primary/20'
                  : 'border-dashed border-white/10 bg-background'
              }`}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-surface">
                  <Icon
                    size={20}
                    className={status === 'live' ? 'text-primary' : 'text-muted/40'}
                  />
                </div>
                {status === 'coming-soon' && (
                  <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs text-muted/60">
                    Coming Soon
                  </span>
                )}
              </div>
              <h3
                className={`font-medium leading-snug ${
                  status === 'coming-soon' ? 'text-muted' : ''
                }`}
              >
                {title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-muted leading-relaxed">
                {description}
              </p>
              {tech.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-surface px-2 py-0.5 text-xs text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs text-primary transition-colors hover:text-accent"
                >
                  Live Demo <ExternalLink size={12} />
                </a>
              )}
            </div>
          ))}
        </div>

        <Link
          to="/"
          className="mt-8 inline-block text-sm text-primary transition-colors hover:text-accent"
        >
          &larr; Back to home
        </Link>
      </div>
    </div>
  )
}
