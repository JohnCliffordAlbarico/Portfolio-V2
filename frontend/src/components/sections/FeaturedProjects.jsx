import { Link } from 'react-router-dom'
import { FolderKanban, Stethoscope, LayoutDashboard, Timer } from 'lucide-react'
import ScrollReveal from '../ScrollReveal'

const projects = [
  {
    icon: Stethoscope,
    title: 'Medical Clinic Management System',
    description:
      'A full-stack clinic management platform with role-based access, patient records, appointment scheduling, and disease forecasting features built with React, Express, and Supabase.',
  },
  {
    icon: LayoutDashboard,
    title: 'Workspace Productivity System',
    description:
      'A productivity platform featuring task management, analytics dashboard, and collaborative tools designed to streamline team workflows and track project progress.',
  },
  {
    icon: Timer,
    title: 'Pomodoro App',
    description:
      'A React Native mobile application with Supabase authentication, Google login integration, and customizable focus session tracking for productivity management.',
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
          {projects.map(({ icon: Icon, title, description }, i) => (
            <ScrollReveal key={title} delay={i * 120} distance={40}>
              <div className="flex flex-col rounded-xl border border-white/5 bg-background p-6 transition-colors hover:border-primary/20">
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-surface">
                  <Icon size={22} className="text-primary" />
                </div>
                <h3 className="font-medium leading-snug">{title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted leading-relaxed">
                  {description}
                </p>
              </div>
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
