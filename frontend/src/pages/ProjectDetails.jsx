import { useState } from 'react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { PROJECTS, getProject } from '../constants/projects'
import { getProjectImages } from '../constants/projectMedia'
import ProjectLinks from '../components/ProjectLinks'
import ImageModal from '../components/DevModal'

export default function ProjectDetails() {
  const { slug } = useParams()
  const project = getProject(slug)
  const [modalIndex, setModalIndex] = useState(null)
  const [activeShot, setActiveShot] = useState(0)

  if (!project) return <div className="page-heading"><h1>Project not found</h1><p>That address doesn't match a case study.</p><Link className="button" to="/projects">Back to projects <ArrowLeft size={15} aria-hidden="true" /></Link></div>

  const images = getProjectImages(project)
  const active = images[activeShot] || images[0]
  const index = PROJECTS.findIndex(value => value.slug === slug)
  const previous = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length]
  const next = PROJECTS[(index + 1) % PROJECTS.length]
  const facts = [['Role', project.role], ['Type', project.type || project.timeline], ['Runs on', project.platform], ['Focus', project.focus], ['Status', project.status]].filter(([, value]) => value)

  return (
    <>
      <Link className="text-link mb-6" to="/projects"><ArrowLeft size={15} aria-hidden="true" />Back to projects</Link>
      <header className="page-heading"><h1>{project.title}</h1><p>{project.outcome}</p><div className="project-tags"><span className="tag">{project.category}</span><span className="tag">{project.timeline}</span>{project.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div><ProjectLinks project={project} /></header>

      {active && <section aria-label="Project screenshots">
        <button className="screenshot-frame" type="button" onClick={() => setModalIndex(activeShot)} aria-label={`Enlarge ${active.title}`}><img src={active.src} alt={active.title} /></button>
        <div className="screenshot-caption"><strong>{active.title}</strong><p>{active.description}</p><span className="metadata">{activeShot + 1} / {images.length} · Select the screenshot to enlarge</span></div>
        {images.length > 1 && <div className="screenshot-thumbnails" role="group" aria-label="Choose screenshot">{images.map((image, shotIndex) => <button type="button" key={image.src} aria-pressed={shotIndex === activeShot} aria-label={`Show ${image.title}`} onClick={() => setActiveShot(shotIndex)}><img src={image.src} alt="" loading="lazy" /><span>{image.title}</span></button>)}</div>}
      </section>}

      <dl className="project-facts">{facts.map(([name, value]) => <div key={name}><dt>{name}</dt><dd>{value}</dd></div>)}</dl>
      {project.client && <div className="client-note"><p>Built for {project.client.name}. {project.client.note}</p><div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">{project.client.email && <a href={`mailto:${project.client.email}`}>{project.client.email}</a>}{project.client.phone && <a href={`tel:${project.client.phone.replace(/\s/g, '')}`}>{project.client.phone}</a>}{project.client.facebook && <a href={project.client.facebook} target="_blank" rel="noopener noreferrer">Facebook <ArrowUpRight size={13} className="inline" aria-hidden="true" /></a>}</div></div>}

      <section className="content-section"><h2>What I built</h2><p>{project.description}</p></section>
      {project.brief && <section className="content-section"><h2>The problem & approach</h2><div className="module-list"><div><h3>The problem</h3><p>{project.brief.problem}</p></div><div><h3>The approach</h3><p>{project.brief.approach}</p></div></div></section>}
      <section className="content-section"><h2>What the system does</h2><div className="module-list">{project.modules.map(module => <div key={module.title}><h3>{module.title}</h3><p>{module.text}</p></div>)}</div></section>
      <section className="content-section"><h2>How it runs</h2><ol className="architecture-list">{project.architecture.map(node => <li key={node}>{node}</li>)}</ol></section>
      <section className="content-section"><h2>The technology</h2><div className="stack-groups">{project.stackGroups.map(group => <div key={group.label}><h3>{group.label}</h3><ul>{group.chips.map(chip => <li key={chip.label}>{chip.label}{chip.hot && <span className="metadata">Core</span>}</li>)}</ul></div>)}</div></section>
      {project.results?.length > 0 && <section className="content-section"><h2>The result</h2><dl className="result-list">{project.results.map(result => <div key={result.label}><dt>{result.value}</dt><dd>{result.label}</dd></div>)}</dl></section>}
      <div className="project-actions"><Link className="button" to="/contact">Ask about this build <ArrowUpRight size={15} aria-hidden="true" /></Link></div>
      <nav className="project-pagination" aria-label="More projects"><Link to={`/projects/${previous.slug}`}><span className="metadata">← Previous</span><strong>{previous.title}</strong></Link><Link to={`/projects/${next.slug}`}><span className="metadata">Next →</span><strong>{next.title}</strong></Link></nav>
      {modalIndex !== null && <ImageModal images={images} currentIndex={modalIndex} onClose={() => setModalIndex(null)} onNavigate={setModalIndex} />}
    </>
  )
}
