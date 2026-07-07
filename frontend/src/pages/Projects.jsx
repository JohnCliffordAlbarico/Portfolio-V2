import { Wrench, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import bacaltosImg from '../assets/bacaltosproject.jpg'
import workspaceImg from '../assets/yuukoworkspace.jpg'
import PrintingManagementSystem from '../components/projects/printingmanagementsystem/PrintingManagementSystem'

const projects = [
  {
    image: bacaltosImg,
    title: 'Bacaltos Clinic',
    description:
      'A full-stack clinic management platform with role-based access, patient records, appointment scheduling, and disease forecasting features.',
    tech: ['React', 'Express', 'Supabase', 'Render', 'Cloudflare'],
    url: 'https://bacaltosclinic.onrender.com/',
  },
  {
    image: workspaceImg,
    title: 'Yuuko Workspace',
    description:
      'A personal workspace for task tracking with duration and analytics to review productivity over time.',
    tech: ['React', 'Express', 'Supabase', 'Render', 'Cloudflare'],
    url: 'https://yuuko-workspace.onrender.com/',
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
          {projects.map(({ image, title, description, tech, url }) => (
            <div
              key={title}
              className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="size-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-medium leading-snug">{title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted leading-relaxed">
                  {description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-background px-2 py-0.5 text-xs text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary transition-colors hover:text-accent"
                >
                  Live Demo <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}

          <PrintingManagementSystem />

          <div className="flex flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/10 bg-background p-6">
            <Wrench size={32} className="mb-3 text-muted/40" />
            <h3 className="font-medium text-muted">More Projects</h3>
            <p className="mt-2 text-center text-sm text-muted/60">
              Currently building new projects. Stay tuned for updates.
            </p>
            <span className="mt-3 rounded-full bg-surface px-2.5 py-0.5 text-xs text-muted/60">
              Coming Soon
            </span>
          </div>
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
