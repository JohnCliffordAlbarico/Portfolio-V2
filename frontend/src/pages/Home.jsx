import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProjectRow from '../components/ProjectRow'
import { PROJECTS } from '../constants/projects'

const selected = ['tanon-strait-resort', 'bacaltos-healthcare-system']
  .map(slug => PROJECTS.find(project => project.slug === slug))
  .filter(Boolean)

export default function Home() {
  return (
    <>
      <section className="intro" aria-labelledby="intro-title">
        <h1 id="intro-title">I build websites, web apps, and desktop software.</h1>
        <p className="intro-lead">I'm Clifford, a software developer based in Cebu. My work includes a resort website, a clinic management system, and applications I build for my own use.</p>
        <div className="intro-actions">
          <Link className="button button-primary" to="/projects">Explore my work <ArrowUpRight size={15} aria-hidden="true" /></Link>
          <Link className="button" to="/about">More about me</Link>
        </div>
      </section>
      <section aria-labelledby="selected-work-title">
        <div className="section-heading">
          <h2 id="selected-work-title">Selected work</h2>
          <Link className="text-link" to="/projects">All projects <ArrowUpRight size={14} aria-hidden="true" /></Link>
        </div>
        <div className="project-list">{selected.map(project => <ProjectRow key={project.slug} project={project} compact />)}</div>
      </section>
    </>
  )
}
