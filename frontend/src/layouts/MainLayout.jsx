import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import Navbar from './Navbar'
import Footer from './Footer'
import ProfileSidebar from './ProfileSidebar'
import ConnectSidebar from './ConnectSidebar'
import useTheme from '../hooks/useTheme'
import usePageSeo from '../hooks/usePageSeo'

export default function MainLayout() {
  const { pathname } = useLocation()
  const { toggleTheme } = useTheme()
  usePageSeo(pathname)
  const centerRef = useRef(null)
  const mainRef = useRef(null)
  const previousPath = useRef(pathname)
  const pagePath = pathname.replace(/\/+$/, '') || '/'
  const label = pagePath === '/' ? 'Overview' : pagePath.startsWith('/projects/') ? 'Project detail' : pagePath === '/projects' ? 'Projects' : pagePath === '/about' ? 'About' : pagePath === '/contact' ? 'Contact' : 'Page not found'

  useEffect(() => {
    if (previousPath.current !== pathname) {
      centerRef.current?.scrollTo({ top: 0 })
      window.scrollTo({ top: 0 })
      mainRef.current?.focus({ preventScroll: true })
      previousPath.current = pathname
    }
  }, [pathname])

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="portfolio-workspace">
        <ProfileSidebar />
        <div className="center-column" ref={centerRef}>
          <header className="workspace-toolbar">
            <span className="metadata">{label}</span>
            <button className="theme-toggle" data-theme-toggle type="button" onClick={toggleTheme} aria-label="Toggle light and dark theme">
              <Sun className="theme-light" size={14} aria-hidden="true" /><Moon className="theme-dark" size={14} aria-hidden="true" /><span className="theme-light">Light</span><span className="theme-dark">Dark</span>
            </button>
          </header>
          <main id="main-content" ref={mainRef} tabIndex={-1}>
            <Outlet key={pathname} />
          </main>
          <Footer />
        </div>
        <ConnectSidebar />
      </div>
      <Navbar />
    </>
  )
}
