import { useEffect, useRef, useState } from 'react'

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  immediate = false,
  distance = 48,
  duration = 700,
}) {
  const ref = useRef(null)
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches
  const [visible, setVisible] = useState(reducedMotion || false)
  const [settled, setSettled] = useState(reducedMotion || false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (reducedMotion) return

    if (immediate) {
      const timer = setTimeout(() => setVisible(true), 80)
      return () => clearTimeout(timer)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -60px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [immediate, reducedMotion])

  useEffect(() => {
    if (!visible || settled) return
    const timer = setTimeout(() => setSettled(true), duration + delay + 50)
    return () => clearTimeout(timer)
  }, [visible, settled, duration, delay])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? 'translateY(0px) scale(1)'
          : `translateY(${distance}px) scale(0.94)`,
        transition: visible
          ? `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`
          : 'none',
        willChange: settled ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
