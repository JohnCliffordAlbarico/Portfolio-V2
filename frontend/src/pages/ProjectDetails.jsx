import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Layers } from 'lucide-react'

export default function ProjectDetails() {
  const { slug } = useParams()

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to projects
        </Link>

        <h1 className="mb-4 text-3xl font-bold capitalize tracking-tight">
          {slug?.replace(/-/g, ' ') ?? 'Project'}
        </h1>
        <p className="mb-12 text-muted">
          Case study and architecture details coming soon.
        </p>

        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 py-24">
          <Layers size={40} className="mb-4 text-muted/40" />
          <p className="text-sm text-muted">Architecture showcase placeholder</p>
        </div>
      </div>
    </div>
  )
}
