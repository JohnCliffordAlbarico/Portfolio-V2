import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getProjectImages } from '../constants/projectMedia'
import ProjectLinks from './ProjectLinks'

export default function ProjectRow({ project, compact = false }) {
  const cover = getProjectImages(project)[0]
  const href = `/projects/${project.slug}`
  return (
    <article className={`project-row${compact ? ' project-row-compact' : ''}`}>
      <Link className="project-thumbnail" to={href} tabIndex={-1} aria-hidden="true">
        {cover && <img src={cover.src} alt="" loading={compact ? 'eager' : 'lazy'} width="80" height="67" />}
      </Link>
      <div className="project-row-content">
        <h3><Link to={href}>{project.title}</Link></h3>
        <div className="metadata">{project.platform} · {project.tags.slice(0, 2).join(' · ')}</div>
        {!compact && <>
          <p>{project.outcome}</p>
          <div className="project-tags" aria-label="Technologies">{project.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
          <ProjectLinks project={project} />
        </>}
      </div>
      <Link className="project-row-arrow" to={href} aria-label={`Read ${project.title} case study`}><ArrowUpRight size={17} aria-hidden="true" /></Link>
    </article>
  )
}
