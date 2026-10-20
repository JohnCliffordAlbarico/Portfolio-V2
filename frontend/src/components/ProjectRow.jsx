import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getProjectImages } from '../constants/projectMedia'
import ProjectLinks from './ProjectLinks'

export default function ProjectRow({ project, compact = false }) {
  const cover = getProjectImages(project)[0]
  const href = `/projects/${project.slug}`
  return (
    <article className="project-row">
      <div className="project-row-content">
        <p className="project-category">{project.category}</p>
        <h3><Link to={href}>{project.title}<ArrowUpRight size={16} aria-hidden="true" /></Link></h3>
        <p className="project-summary">{project.outcome}</p>
        {compact ? <>
          <div className="metadata">{project.tags.slice(0, 3).join(' · ')}</div>
        </> : <>
          <div className="metadata">{project.platform}</div>
          <div className="project-tags" aria-label="Technologies">{project.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
          <ProjectLinks project={project} />
        </>}
      </div>
      {cover && <Link className="project-thumbnail" to={href} tabIndex={-1} aria-hidden="true">
        <img src={cover.src} alt="" loading={compact ? 'eager' : 'lazy'} width="158" height="112" />
      </Link>}
    </article>
  )
}
