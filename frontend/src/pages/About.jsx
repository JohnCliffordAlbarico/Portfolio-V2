import { useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ProfileAbout from '../components/sections/About'
import Skills from '../components/sections/Skills'
import Timeline from '../components/sections/Timeline'
import Education from '../components/sections/Education'
import Awards from '../components/sections/Awards'

const sections = [
  { id: 'profile', label: 'About', component: ProfileAbout },
  { id: 'skills', label: 'Skills', component: Skills },
  { id: 'timeline', label: 'Timeline', component: Timeline },
  { id: 'education', label: 'Education', component: Education },
  { id: 'awards', label: 'Awards', component: Awards },
]

export default function About() {
  const [params] = useSearchParams()
  const section = sections.find(value => value.id === params.get('section')) || sections[0]
  const Section = section.component
  const contentRef = useRef(null)

  return (
    <>
      <header className="page-heading"><h1>A little about me.</h1><p>My background, the tools I use, and the milestones along the way.</p></header>
      <nav className="section-tabs" aria-label="About sections">{sections.map(({ id, label }) => <Link key={id} to={id === 'profile' ? '/about' : `/about?section=${id}`} aria-current={section.id === id ? 'page' : undefined} preventScrollReset onClick={() => requestAnimationFrame(() => contentRef.current?.focus({ preventScroll: true }))}>{label}</Link>)}</nav>
      <div ref={contentRef} tabIndex={-1} className="about-content"><Section key={section.id} /></div>
    </>
  )
}
