import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProjectRow from '../components/ProjectRow'
import { PROJECTS } from '../constants/projects'

const selected = ['tanon-strait-resort', 'bacaltos-healthcare-system', 'flowiq']
  .map(slug => PROJECTS.find(project => project.slug === slug))
  .filter(Boolean)

export default function Home() {
  return (
    <>
      <header className="overview-heading">
        <h1>Overview</h1>
      </header>
      <section className="intro" aria-labelledby="intro-title">
        <h2 id="intro-title">I build websites and apps for web, mobile, and desktop.</h2>
        <p className="intro-lead">I'm Clifford, a software developer and technical consultant based in Cebu.</p>
        <div className="intro-actions">
          <Link className="button button-primary" to="/projects">Explore my work <ArrowUpRight size={15} aria-hidden="true" /></Link>
          <Link className="text-link" to="/about">More about me <ArrowUpRight size={15} aria-hidden="true" /></Link>
        </div>
      </section>
      <section aria-labelledby="featured-work-title">
        <div className="section-heading">
          <h2 id="featured-work-title">Featured work</h2>
          <Link className="text-link" to="/projects">All projects <ArrowUpRight size={14} aria-hidden="true" /></Link>
        </div>
        <div className="project-list">{selected.map(project => <ProjectRow key={project.slug} project={project} compact />)}</div>
      </section>
      <p className="home-utility"><Link className="text-link" to="/playground">Take a short typing warm-up <ArrowUpRight size={14} aria-hidden="true" /></Link></p>
    </>
  )
}
