import { useEffect, useState, useCallback } from 'react'

export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '')

  const findActive = useCallback(() => {
    const scrollY = window.scrollY
    const viewportHeight = window.innerHeight

    // At the very top — always first section
    if (scrollY < 80) {
      setActiveId(sectionIds[0] ?? '')
      return
    }

    // Find which section is most visible in the center of the viewport
    const centerY = scrollY + viewportHeight * 0.5

    let bestMatch = sectionIds[0]
    let smallestDistance = Infinity

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (!el) continue
      
      const rect = el.getBoundingClientRect()
      const sectionTop = scrollY + rect.top
      const sectionBottom = sectionTop + rect.height
      const sectionCenter = sectionTop + rect.height / 2

      // If the section is visible in viewport
      if (sectionBottom > scrollY && sectionTop < scrollY + viewportHeight) {
        const distanceFromCenter = Math.abs(sectionCenter - centerY)
        if (distanceFromCenter < smallestDistance) {
          smallestDistance = distanceFromCenter
          bestMatch = id
        }
      }
    }

    setActiveId(bestMatch)
  }, [sectionIds])

  useEffect(() => {
    findActive()
    
    // Use requestAnimationFrame to avoid triggering during smooth scroll animations
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          findActive()
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', findActive, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', findActive)
    }
  }, [findActive])

  return activeId
}