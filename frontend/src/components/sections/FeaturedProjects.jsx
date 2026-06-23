import { Link } from 'react-router-dom'
import { Stethoscope, LayoutDashboard, Clock } from 'lucide-react'
import ScrollReveal from '../ScrollReveal'

const projects = [
  {
    icon: Stethoscope,
    title: 'Bacaltos Clinic',
    description:
      'A full-stack clinic management platform with role-based access, patient records, appointment scheduling, and disease forecasting features built with React, Express, and Supabase.',
    url: 'https://bacaltosclinic.onrender.com/',
  },
  {
    icon: LayoutDashboard,
    title: 'Yuuko Workspace',
    description:
      'A personal workspace built during OJT weekends for task tracking with duration and analytics to review what I accomplished over time.',
    url: 'https://yuuko-workspace.onrender.com/',
  },
  {
    icon: Clock,
    title: 'More Projects',
    description:
      'Additional projects and experiments are on the way. Check the full list for updates.',
    url: null,
  },
]

export default function FeaturedProjects() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          Featured Projects
        </h2>
        <p className="mb-12 max-w-2xl text-muted leading-relaxed">
          Selected work. Full list available on the projects page.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map(({ icon: Icon, title, description, url }, i) => (
            <ScrollReveal key={title} delay={i * 120} distance={40}>
              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col rounded-xl border border-white/5 bg-background p-6 transition-colors hover:border-primary/20"
                >
                  <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-surface">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <h3 className="font-medium leading-snug">{title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted leading-relaxed">
                    {description}
                  </p>
                  <span className="mt-4 text-xs text-primary">Live Demo &rarr;</span>
                </a>
              ) : (
                <div className="flex flex-col rounded-xl border border-dashed border-white/10 bg-background p-6">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-surface">
                    <Icon size={22} className="text-muted/40" />
                  </div>
                  <h3 className="font-medium leading-snug text-muted">{title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted leading-relaxed">
                    {description}
                  </p>
                  <span className="mt-4 text-xs text-muted/60">Coming Soon</span>
                </div>
              )}
            </ScrollReveal>
          ))}
        </div>

        <Link
          to="/projects"
          className="mt-8 inline-block text-sm text-primary transition-colors hover:text-accent"
        >
          View all projects &rarr;
        </Link>
      </div>
    </section>
  )
}
