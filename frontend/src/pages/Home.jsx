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
        <h1 id="intro-title">Building digital experiences that work.</h1>
        <p>I build websites and web applications that solve real problems, alongside mobile and desktop software.</p>
      </section>
      <section aria-labelledby="selected-work-title">
        <div className="section-heading">
          <h2 id="selected-work-title">Selected work</h2>
          <Link className="text-link" to="/projects">All projects <ArrowUpRight size={14} aria-hidden="true" /></Link>
        </div>
        <div className="project-list">{selected.map(project => <ProjectRow key={project.slug} project={project} compact />)}</div>
      </section>
      <p className="overview-note">From a first interface to a working system. <Link to="/about">More about what I do.</Link></p>
    </>
  )
}
