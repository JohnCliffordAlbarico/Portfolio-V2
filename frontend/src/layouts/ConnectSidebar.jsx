import { ArrowUpRight, Mail } from 'lucide-react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ThemeSelector from '../components/ThemeSelector'

export default function ConnectSidebar() {
  return (
    <aside className="connect-sidebar" aria-label="Connect with Clifford">
      <div className="connection-theme"><ThemeSelector /></div>
      <h2>Connect</h2>
      <div className="connect-links">
        <a href="mailto:cliffordalbarico20@gmail.com"><Mail size={16} aria-hidden="true" />Email</a>
        <a href="https://github.com/JohnCliffordAlbarico" target="_blank" rel="noopener noreferrer"><FaGithub size={16} aria-hidden="true" />GitHub</a>
        <a href="https://www.linkedin.com/in/clifford-albarico-1b3604369" target="_blank" rel="noopener noreferrer"><FaLinkedinIn size={16} aria-hidden="true" />LinkedIn</a>
      </div>
      <div className="connect-cta">
        <h3>Have a project in mind?</h3>
        <p>Let's build something.</p>
        <Link className="button button-primary" to="/contact">Get in touch <ArrowUpRight size={15} aria-hidden="true" /></Link>
      </div>
    </aside>
  )
}
