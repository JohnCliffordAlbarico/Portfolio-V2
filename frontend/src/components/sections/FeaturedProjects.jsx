import { Link } from 'react-router-dom'
import { FolderKanban } from 'lucide-react'

export default function FeaturedProjects() {
  return (
    <section id="projects" className="bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight sm:text-3xl">
          Featured Projects
        </h2>
        <p className="mb-10 max-w-2xl text-muted">
          Selected work. Full list available on the projects page.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="flex flex-col rounded-xl border border-white/5 bg-background p-6 transition-colors hover:border-primary/20"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-surface">
                <FolderKanban size={22} className="text-primary" />
              </div>
              <h3 className="font-medium">Project {n}</h3>
              <p className="mt-2 flex-1 text-sm text-muted">
                Description coming soon.
              </p>
            </div>
          ))}
        </div>

        <Link
          to="/projects"
          className="mt-8 inline-block text-sm text-primary hover:text-accent"
        >
          View all projects &rarr;
        </Link>
      </div>
    </section>
  )
}
