export default function ChromeBar({ filename }) {
  return (
    <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-3.5 py-2.5">
      <span className="size-2.5 rounded-full bg-primary/80" />
      <span className="size-2.5 rounded-full bg-primary/40" />
      <span className="size-2.5 rounded-full bg-primary/20" />
      <span className="ml-3 font-mono text-xs text-muted">{filename}</span>
    </div>
  )
}