import { ArrowUpRight } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function ProjectLinks({ project, caseStudy = false }) {
  return (
    <div className="project-actions">
      {caseStudy && <Link className="button" to={`/projects/${project.slug}`}>Case study <ArrowUpRight size={14} aria-hidden="true" /></Link>}
      {project.links?.live && <a className="button button-primary" href={project.links.live} target="_blank" rel="noopener noreferrer">Visit live site <ArrowUpRight size={14} aria-hidden="true" /></a>}
      {project.links?.github && <a className="button" href={project.links.github} target="_blank" rel="noopener noreferrer">Source code <FaGithub size={14} aria-hidden="true" /></a>}
    </div>
  )
}
