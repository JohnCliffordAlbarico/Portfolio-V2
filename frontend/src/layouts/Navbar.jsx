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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
        >
          John Clifford M. Albarico
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
    </header>
  )
}
