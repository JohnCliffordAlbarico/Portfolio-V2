import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ProfileSidebar from './ProfileSidebar'
import ConnectSidebar from './ConnectSidebar'
import usePageSeo from '../hooks/usePageSeo'
import useSitePresence from '../hooks/useSitePresence'

export default function MainLayout() {
  const { pathname } = useLocation()
  usePageSeo(pathname)
  const mainRef = useRef(null)
  const previousPath = useRef(pathname)
  const presence = useSitePresence()

  useEffect(() => {
    if (previousPath.current !== pathname) {
      window.scrollTo({ top: 0 })
      mainRef.current?.focus({ preventScroll: true })
      previousPath.current = pathname
    }
  }, [pathname])

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="portfolio-workspace">
        <ProfileSidebar presence={presence} />
        <div className="center-column">
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
