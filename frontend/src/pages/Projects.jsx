import { FolderOpen } from 'lucide-react'

export default function Projects() {
  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-4 text-3xl font-bold tracking-tight">Projects</h1>
        <p className="mb-12 max-w-2xl text-muted">
          Full project listing. Content coming soon.
        </p>

        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 py-24">
          <FolderOpen size={40} className="mb-4 text-muted/40" />
          <p className="text-sm text-muted">Projects will appear here.</p>
        </div>
      </div>
    </div>
  )
}
