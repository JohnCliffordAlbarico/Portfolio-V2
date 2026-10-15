import { useEffect } from 'react'
import { getPageSeo, SITE_NAME, SITE_URL } from '../constants/seo'

export default function usePageSeo(pathname) {
  useEffect(() => {
    const seo = getPageSeo(pathname)
    document.title = seo.title
    const setMeta = (name, content, attribute = 'name') => {
      let element = document.head.querySelector(`meta[${attribute}="${name}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.appendChild(element)
      }
      element.content = content
    }
    for (const [name, value] of Object.entries({ description: seo.description, robots: seo.robots, 'twitter:card': 'summary_large_image', 'twitter:title': seo.title, 'twitter:description': seo.description, 'twitter:image': seo.image, 'twitter:image:alt': seo.imageAlt })) setMeta(name, value)
    for (const [name, value] of Object.entries({ 'og:type': 'website', 'og:site_name': SITE_NAME, 'og:title': seo.title, 'og:description': seo.description, 'og:url': seo.canonical || SITE_URL + seo.pathname, 'og:image': seo.image, 'og:image:alt': seo.imageAlt })) setMeta(name, value, 'property')
    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (seo.canonical) {
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.appendChild(canonical)
      }
      canonical.href = seo.canonical
    } else canonical?.remove()
    let structured = document.getElementById('structured-data')
    if (!structured) {
      structured = document.createElement('script')
      structured.id = 'structured-data'
      structured.type = 'application/ld+json'
      document.head.appendChild(structured)
    }
    structured.textContent = JSON.stringify(seo.structuredData)
  }, [pathname])
}
