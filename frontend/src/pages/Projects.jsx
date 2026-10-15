import { useEffect, useRef, useState } from 'react'
import { Search, X } from 'lucide-react'
import ProjectRow from '../components/ProjectRow'
import { PROJECTS } from '../constants/projects'

const categories = ['Client Projects', 'Personal Projects', 'Capstone Project']
const technologies = [...new Set(PROJECTS.flatMap(project => project.tags))]
const searchable = PROJECTS.map(project => [
  project.title, project.outcome, project.description, project.category,
  project.role, project.type, project.platform, project.focus, project.timeline,
  project.status, ...project.tags, ...project.architecture,
  ...project.modules.flatMap(module => [module.title, module.text]),
].filter(Boolean).join(' ').toLowerCase())

export default function Projects() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [techs, setTechs] = useState([])
  const searchRef = useRef(null)
  const normalizedQuery = query.trim().toLowerCase()
  const results = PROJECTS.filter((project, index) =>
    (category === 'All' || project.category === category) &&
    techs.every(tech => project.tags.includes(tech)) &&
    (!normalizedQuery || searchable[index].includes(normalizedQuery)),
  )
  const filtering = Boolean(normalizedQuery || techs.length || category !== 'All')

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== '/' || event.ctrlKey || event.metaKey || event.altKey) return
      if (event.target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)) return
      event.preventDefault()
      searchRef.current?.focus()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const clearFilters = () => { setQuery(''); setCategory('All'); setTechs([]) }
  const toggleTech = (tech) => setTechs(previous => previous.includes(tech) ? previous.filter(value => value !== tech) : [...previous, tech])

  return (
    <>
      <header className="page-heading"><h1>Things I've built.</h1><p>Client work, personal projects, and a capstone. Explore the product, my role, and the implementation.</p></header>
      <div className="search-field">
        <Search size={18} className="text-muted" aria-hidden="true" />
        <label className="sr-only" htmlFor="project-search">Search projects by name, description, or technology</label>
        <input id="project-search" ref={searchRef} type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search projects or technologies…" autoComplete="off" />
        {query && <button className="icon-button" type="button" onClick={() => setQuery('')} aria-label="Clear search"><X size={16} /></button>}
      </div>
      <div className="filter-group" role="group" aria-label="Project category">
        {['All', ...categories].map(value => <button key={value} className="filter-chip" type="button" data-category={value} aria-pressed={category === value} onClick={() => setCategory(value)}>{value === 'All' ? 'All projects' : value}</button>)}
      </div>
      <details className="filter-details">
        <summary>Filter by technology{techs.length ? ` (${techs.length} selected)` : ''}</summary>
        <div className="filter-group" role="group" aria-label="Technologies">{technologies.map(tech => <button key={tech} className="filter-chip" type="button" aria-pressed={techs.includes(tech)} onClick={() => toggleTech(tech)}>{tech}</button>)}</div>
      </details>
      <div className="results-status"><p role="status">{results.length} {filtering ? 'matching' : 'recent'} {results.length === 1 ? 'project' : 'projects'}</p>{filtering && <button className="text-link" data-clear-filters type="button" onClick={clearFilters}>Clear filters <X size={13} aria-hidden="true" /></button>}</div>
      {results.length ? <div className="project-list">{results.map(project => <ProjectRow key={project.slug} project={project} />)}</div> : <div className="empty-state"><h2>No matching projects</h2><p>Try a different name or technology, or clear the filters to explore all {PROJECTS.length} projects.</p><button className="button button-primary" type="button" data-clear-filters onClick={clearFilters}>Clear search and filters</button></div>}
    </>
  )
}
