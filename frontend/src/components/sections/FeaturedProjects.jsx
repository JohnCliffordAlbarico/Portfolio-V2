import { Link } from 'react-router-dom'
import { ExternalLink, Briefcase, User, GraduationCap } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import ScrollReveal from '../ScrollReveal'
import SectionHeading from '../SectionHeading'
import bacaltosImg from '../../assets/bacaltosproject.jpg'
import workspaceImg from '../../assets/yuukoworkspace.jpg'

const categories = [
  {
    title: 'Client Projects',
    icon: Briefcase,
    project: {
      image: '/bacaltosproject/MAIN UI.png',
      offline: true,
      title: 'Bacaltos Healthcare System',
      description:
        'A desktop-first clinic management system with an Electron controller, React dashboard for patient care, and cloud database backup via Turso.',
      tags: ['React', 'Express', 'Electron', 'SQLite', 'Turso', 'Cloudflare R2'],
      features: ['Electron desktop controller', 'Multi-branch clinic management', 'Cloud sync with Turso'],
    },
  },
  {
    title: 'Personal Projects',
    icon: User,
    project: {
      image: workspaceImg,
      url: 'https://yuuko-workspace.onrender.com/',
      github: 'https://github.com/JohnCliffordAlbarico/Workspace',
      title: 'Yuuko Workspace',
      description:
        'A personal workspace built during OJT weekends for task tracking with duration and analytics to review what I accomplished over time.',
      tags: ['React', 'Node.js', 'Supabase'],
      features: ['Task tracking with timers', 'Productivity analytics', 'Duration breakdowns'],
    },
  },
  {
    title: 'Capstone Project',
    icon: GraduationCap,
    project: {
      image: bacaltosImg,
      url: 'https://bacaltosclinic.onrender.com/',
      title: 'Bacaltos Clinic',
      description:
        'A full-stack clinic management platform with role-based access, patient records, appointment scheduling, and disease forecasting features.',
      tags: ['React', 'Express', 'Supabase', 'Node.js'],
      features: ['Role-based access control', 'Patient records & appointments', 'Disease forecasting'],
    },
  },
]

export default function FeaturedProjects() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="projects"
          title="Featured Projects"
          description="Selected work organized by type. Full list available on the projects page."
        />

        <div className="space-y-12">
          {categories.map(({ title, icon: Icon, project }) => (
            <div key={title}>
              <div className="mb-4 flex items-center gap-2">
                <Icon size={16} className="text-primary" />
                <h3 className="text-sm font-medium uppercase tracking-wider text-primary">
                  {title}
                </h3>
              </div>

              <ScrollReveal distance={40}>
                <div className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_24px_-4px_rgba(220,38,38,0.25)] sm:flex-row">
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative aspect-video overflow-hidden sm:w-1/2"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
                    </a>
                  ) : (
                    <div className="relative aspect-video overflow-hidden sm:w-1/2">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
                      {!project.offline && (
                        <>
                          <span className="size-2.5 rounded-full bg-primary/80" />
                          <span className="size-2.5 rounded-full bg-primary/40" />
                          <span className="size-2.5 rounded-full bg-primary/20" />
                        </>
                      )}
                      <span className={project.offline ? 'flex items-center gap-2 truncate font-mono text-xs text-muted' : 'ml-3 flex items-center gap-2 truncate font-mono text-xs text-muted'}>
                        {project.url && (
                          <span className="size-2 rounded-full bg-primary/80" />
                        )}
                        {project.offline && (
                          <>
                            <span className="size-2 rounded-full bg-amber-400/80" />
                            <span className="size-2 rounded-full bg-muted/60" />
                            <span className="size-2 rounded-full bg-green-400/80" />
                          </>
                        )}
                        {project.url
                          ? project.url.replace(/^https?:\/\//, '').replace(/\/$/, '')
                          : 'desktop-app · offline · cloudsync'}
                      </span>
                    </div>
                    <div className="flex flex-col p-5">
                      <h4 className="font-medium leading-snug">{project.title}</h4>
                      <p className="mt-2 flex-1 text-sm text-muted leading-relaxed">
                        {project.description}
                      </p>

                      <ul className="mt-3 space-y-1">
                        {project.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-xs text-muted">
                            <span className="size-1 shrink-0 rounded-full bg-primary" />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.tags.map((t) => (
                          <span key={t} className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-muted">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 flex items-center gap-3">
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary transition-colors hover:text-accent"
                          >
                            Live Demo <ExternalLink size={12} />
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
                          >
                            Source <SiGithub size={12} />
                          </a>
                        )}
                        {project.offline && (
                          <>
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
                              <span className="size-1.5 rounded-full bg-amber-400/80" />
                              Desktop App
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
                              <span className="size-1.5 rounded-full bg-muted/60" />
                              Offline
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
                              <span className="size-1.5 rounded-full bg-green-400/80" />
                              CloudSync
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
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