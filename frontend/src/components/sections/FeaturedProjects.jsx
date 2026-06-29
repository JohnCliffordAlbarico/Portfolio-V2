import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import ScrollReveal from '../ScrollReveal'
import bacaltosImg from '../../assets/bacaltosproject.jpg'
import workspaceImg from '../../assets/yuukoworkspace.jpg'

const projects = [
  {
    image: bacaltosImg,
    title: 'Bacaltos Clinic',
    description:
      'A full-stack clinic management platform with role-based access, patient records, appointment scheduling, and disease forecasting features.',
    tags: ['React', 'Express', 'Supabase', 'Node.js'],
    features: ['Role-based access control', 'Patient records & appointments', 'Disease forecasting'],
    url: 'https://bacaltosclinic.onrender.com/',
    github: 'https://github.com/yourusername/bacaltos-clinic',
    tag: 'Capstone Project',
  },
  {
    image: workspaceImg,
    title: 'Yuuko Workspace',
    description:
      'A personal workspace built during OJT weekends for task tracking with duration and analytics to review what I accomplished over time.',
    tags: ['React', 'Node.js', 'Supabase'],
    features: ['Task tracking with timers', 'Productivity analytics', 'Duration breakdowns'],
    url: 'https://yuuko-workspace.onrender.com/',
    github: 'https://github.com/yourusername/yuuko-workspace',
    tag: 'Side Project',
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

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map(({ image, title, description, tags, features, url, github, tag }, i) => (
            <ScrollReveal key={title} delay={i * 120} distance={40}>
              <div className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_24px_-4px_rgba(220,38,38,0.25)]">
                <a href={url} target="_blank" rel="noopener noreferrer" className="relative aspect-video overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
                  {tag && (
                    <span className="absolute right-3 top-3 rounded-full bg-primary/90 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                      {tag}
                    </span>
                  )}
                </a>
                <div className="flex flex-col p-5">
                  <h3 className="font-medium leading-snug">{title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted leading-relaxed">
                    {description}
                  </p>

                  <ul className="mt-3 space-y-1">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-muted">
                        <span className="size-1 shrink-0 rounded-full bg-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {tags.map((t) => (
                      <span key={t} className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-muted">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-primary transition-colors hover:text-accent"
                    >
                      Live Demo <ExternalLink size={12} />
                    </a>
                    <a
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
                    >
                      Source <SiGithub size={12} />
                    </a>
                  </div>
                </div>
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
