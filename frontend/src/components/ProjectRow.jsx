import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getProjectImages } from '../constants/projectMedia'
import ProjectLinks from './ProjectLinks'

export default function ProjectRow({ project, compact = false }) {
  const cover = getProjectImages(project)[0]
  const href = `/projects/${project.slug}`
  return (
    <article className="project-row">
      <Link className="project-thumbnail" to={href} tabIndex={-1} aria-hidden="true">
        {cover && <img src={cover.src} alt="" loading={compact ? 'eager' : 'lazy'} width="128" height="104" />}
      </Link>
      <div className="project-row-content">
        <h3><Link to={href}>{project.title}</Link></h3>
        {compact ? <>
          <p className="project-summary">{project.outcome}</p>
          <div className="metadata">{project.platform} · {project.tags.slice(0, 3).join(' · ')}</div>
        </> : <>
          <div className="metadata">{project.platform} · {project.tags.slice(0, 2).join(' · ')}</div>
          <p>{project.outcome}</p>
          <div className="project-tags" aria-label="Technologies">{project.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
          <ProjectLinks project={project} />
        </>}
      </div>
      <Link className="project-row-arrow" to={href} aria-label={`View project: ${project.title}`}>
        <span>View project</span><ArrowUpRight size={18} aria-hidden="true" />
      </Link>
    </article>
  )
}
