import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return <div className="page-heading"><h1>Page not found</h1><p>This page doesn't exist. You can explore my projects or head back to the overview.</p><div className="project-actions"><Link className="button button-primary" to="/">Back home <ArrowLeft size={15} aria-hidden="true" /></Link><Link className="button" to="/projects">Explore projects</Link></div></div>
}
