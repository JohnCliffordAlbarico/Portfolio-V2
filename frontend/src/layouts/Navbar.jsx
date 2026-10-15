import { House, BriefcaseBusiness, UserRound, Mail } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { NAV_LINKS } from '../constants/navigation'

const icons = { Home: House, Projects: BriefcaseBusiness, About: UserRound, Contact: Mail }

export default function Navbar() {
  return (
    <nav className="dock" aria-label="Main navigation">
      {NAV_LINKS.map(({ label, href }) => {
        const Icon = icons[label]
        return (
          <NavLink key={href} to={href} end={href === '/'}>
            <Icon size={17} aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        )
      })}
    </nav>
  )
}
