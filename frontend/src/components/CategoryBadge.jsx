import { categoryColor } from '../constants/projects'

export default function CategoryBadge({ category, className = '' }) {
  const color = categoryColor(category)
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[11px] ${className}`}
      style={{
        color,
        borderColor: `${color}55`,
        backgroundColor: `${color}14`,
      }}
    >
      <span
        aria-hidden="true"
        className="size-1.5 shrink-0 rounded-full"
        style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}88` }}
      />
      {category}
    </span>
  )
}
