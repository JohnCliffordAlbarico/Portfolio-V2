import { HOME_SECTIONS } from '../constants/navigation'
import { useActiveSection } from '../hooks/useActiveSection'

export default function SectionNav() {
  const sectionIds = HOME_SECTIONS.map(({ id }) => id)
  const activeId = useActiveSection(sectionIds)

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <div className="flex flex-col items-end gap-4">
        <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
          sections
        </p>
        <ul className="flex flex-col items-end gap-2.5 border-r border-white/10 pr-4">
          {HOME_SECTIONS.map(({ id, label }) => {
            const active = activeId === id
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => scrollTo(id)}
                  className="group flex items-center gap-2 font-mono text-xs"
                  aria-label={`Go to ${label}`}
                  aria-current={active ? 'true' : undefined}
                >
                  <span
                    className={`transition-colors ${
                      active
                        ? 'text-primary'
                        : 'text-muted/60 opacity-90 group-hover:text-foreground'
                    }`}
                  >
                    {active ? '*' : '·'}
                  </span>
                  <span
                    className={`transition-colors ${
                      active
                        ? 'text-primary'
                        : 'text-muted/60 opacity-90 group-hover:text-foreground'
                    }`}
                  >
                    {label}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}