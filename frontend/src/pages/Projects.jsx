import { ExternalLink, Briefcase, User, GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SiGithub } from 'react-icons/si'
import ScrollReveal from '../components/ScrollReveal'
import bacaltosImg from '../assets/bacaltosproject.jpg'
import workspaceImg from '../assets/yuukoworkspace.jpg'
import PrintingManagementSystem from '../components/projects/printingmanagementsystem/PrintingManagementSystem'
import BacaltosHealthcareSystem from '../components/projects/bacaltoshealthcaresystem/BacaltosHealthcareSystem'

const categories = [
  {
    title: 'Client Projects',
    icon: Briefcase,
    description: 'Work built for clients and businesses.',
    custom: true,
  },
  {
    title: 'Personal Projects',
    icon: User,
    custom: true,
    projects: [
      {
        image: workspaceImg,
        title: 'Yuuko Workspace',
        description:
          'A personal workspace for task tracking with duration and analytics to review productivity over time.',
        tags: ['React', 'Node.js', 'Supabase'],
        url: 'https://yuuko-workspace.onrender.com/',
        github: 'https://github.com/yourusername/yuuko-workspace',
      },
    ],
  },
  {
    title: 'Capstone Project',
    icon: GraduationCap,
    projects: [
      {
        image: bacaltosImg,
        title: 'Bacaltos Clinic',
        description:
          'A full-stack clinic management platform with role-based access, patient records, appointment scheduling, and disease forecasting features.',
        tags: ['React', 'Express', 'Supabase', 'Node.js'],
        url: 'https://bacaltosclinic.onrender.com/',
        github: 'https://github.com/yourusername/bacaltos-clinic',
      },
    ],
  },
]

function ProjectCard({ image, title, description, tags, url, github }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_24px_-4px_rgba(220,38,38,0.25)]">
      <a href={url} target="_blank" rel="noopener noreferrer" className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
      </a>
      <div className="flex flex-col p-5">
        <h3 className="font-medium leading-snug">{title}</h3>
        <p className="mt-2 flex-1 text-sm text-muted leading-relaxed">
          {description}
        </p>
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
  )
}

function EmptyCard({ message }) {
  return (
    <div className="flex flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/10 bg-background p-8">
      <Briefcase size={32} className="mb-3 text-muted/40" />
      <p className="text-sm text-muted/60">{message}</p>
    </div>
  )
}

export default function Projects() {
  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-4 text-3xl font-bold tracking-tight">Projects</h1>
        <p className="mb-12 max-w-2xl text-muted">
          A collection of my work organized by type.
        </p>

        <div className="space-y-16">
          {categories.map(({ title, icon: Icon, description, projects, empty, emptyMessage, custom }) => (
            <section key={title}>
              <div className="mb-6 flex items-center gap-3">
                <Icon size={20} className="text-primary" />
                <div>
                  <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
                  {description && (
                    <p className="text-sm text-muted">{description}</p>
                  )}
                </div>
              </div>

              {empty ? (
                <EmptyCard message={emptyMessage} />
              ) : custom ? (
                <div className="grid gap-6 sm:grid-cols-2">
                  {title === 'Client Projects' && (
                    <ScrollReveal distance={36}>
                      <BacaltosHealthcareSystem />
                    </ScrollReveal>
                  )}
                  {title === 'Personal Projects' && (
                    <>
                      {projects?.map((project) => (
                        <ScrollReveal key={project.title} distance={36}>
                          <ProjectCard {...project} />
                        </ScrollReveal>
                      ))}
                      <ScrollReveal distance={36}>
                        <PrintingManagementSystem />
                      </ScrollReveal>
                    </>
                  )}
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2">
                  {projects.map((project) => (
                    <ScrollReveal key={project.title} distance={36}>
                      <ProjectCard {...project} />
                    </ScrollReveal>
                  ))}
                </div>
              )}
            </section>
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
