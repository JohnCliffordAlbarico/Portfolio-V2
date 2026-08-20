import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NAV_LINKS } from '../constants/navigation'

export default function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const isNavActive = (href) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="dot-pattern pointer-events-none absolute inset-0 opacity-[0.15]" aria-hidden="true" />
      <nav className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          to="/"
          className="flex items-center gap-1 font-mono text-sm font-bold tracking-tight transition-opacity hover:opacity-80"
          aria-label="JCADev home"
        >
          <span className="text-muted">~/</span>
          <span className="text-foreground">JCADev</span>
          <span
            aria-hidden="true"
            className="ml-0.5 inline-block h-[1.1em] w-[0.55em] animate-blink bg-primary"
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ label, href }) => {
            const active = isNavActive(href)
            return (
              <li key={href}>
                <Link
                  to={href}
                  className={`text-sm transition-colors ${
                    active
                      ? 'text-primary'
                      : 'text-muted hover:text-foreground'
                  }`}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          className="text-foreground md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/5 bg-surface px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map(({ label, href }) => {
              const active = isNavActive(href)
              return (
                <li key={href}>
                  <Link
                    to={href}
                    onClick={() => setOpen(false)}
                    className={`text-sm transition-colors ${
                      active
                        ? 'text-primary'
                        : 'text-muted hover:text-foreground'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </header>
  )
}
