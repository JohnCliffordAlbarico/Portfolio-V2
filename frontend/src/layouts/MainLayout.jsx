import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import SectionNav from './SectionNav'

export default function MainLayout() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="noise-overlay dot-pattern flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      {isHome && <SectionNav />}

      <Footer />
    </div>
  )
}
