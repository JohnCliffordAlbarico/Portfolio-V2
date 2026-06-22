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
      <ul className="flex flex-col items-end gap-4">
        {HOME_SECTIONS.map(({ id, label }) => {
          const active = activeId === id
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => scrollTo(id)}
                className="group flex items-center gap-3"
                aria-label={`Go to ${label}`}
                aria-current={active ? 'true' : undefined}
              >
                <span
                  className={`text-xs transition-colors ${
                    active
                      ? 'text-foreground'
                      : 'text-muted opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {label}
                </span>
                <span
                  className={`block rounded-full transition-all ${
                    active
                      ? 'size-2.5 bg-primary shadow-[0_0_8px_rgba(220,38,38,0.6)]'
                      : 'size-2 border border-muted/50 bg-transparent group-hover:border-primary/50'
                  }`}
                />
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
