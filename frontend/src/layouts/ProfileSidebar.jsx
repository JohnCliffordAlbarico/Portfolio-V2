import { ArrowUpRight } from 'lucide-react'
import profileImage from '../assets/profile.jpg'
import ThemeSelector from '../components/ThemeSelector'

export default function ProfileSidebar() {
  return (
    <aside className="profile-sidebar" aria-label="Profile">
      <div className="profile-identity">
        <img className="profile-photo" src={profileImage} alt="John Clifford M. Albarico" width="216" height="233" />
        <div>
          <p className="profile-name">John Clifford<br />Albarico</p>
          <p className="profile-role">Software Developer &amp; Technical Consultant</p>
          <div className="profile-theme"><ThemeSelector /></div>
        </div>
      </div>
      <div className="profile-facts">
        <p className="availability"><span className="status-dot" aria-hidden="true" />Available for work</p>
        <p className="text-muted">Based in Cebu, PH</p>
        <p className="profile-stack">React · Next.js · Node.js<br />Electron · React Native</p>
      </div>
      <a className="resume-link" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
        View résumé <ArrowUpRight size={15} aria-hidden="true" />
      </a>
    </aside>
  )
}
