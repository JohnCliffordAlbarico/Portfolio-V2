import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetails from './pages/ProjectDetails'
import Contact from './pages/Contact'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Playground from './pages/Playground'

export default function PortfolioRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
