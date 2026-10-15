import { useEffect, useRef, useState } from 'react'
import { ThemeContext } from './ThemeContext'

function storedTheme() {
  try {
    const value = localStorage.getItem('portfolio-theme')
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => typeof document === 'undefined' ? 'light' : document.documentElement.dataset.theme || 'light')
  const preference = useRef(storedTheme())

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
  }, [theme])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onSystemChange = () => {
      if (!preference.current) setTheme(media.matches ? 'dark' : 'light')
    }
    const onStorage = (event) => {
      if (event.key !== 'portfolio-theme' && event.key !== null) return
      preference.current = storedTheme()
      setTheme(preference.current || (media.matches ? 'dark' : 'light'))
    }
    media.addEventListener('change', onSystemChange)
    window.addEventListener('storage', onStorage)
    return () => {
      media.removeEventListener('change', onSystemChange)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  const selectTheme = (next) => {
    if (next !== 'light' && next !== 'dark') return
    preference.current = next
    setTheme(next)
    try {
      localStorage.setItem('portfolio-theme', next)
    } catch {
      // The theme still works when browser storage is unavailable.
    }
  }

  const toggleTheme = () => selectTheme(theme === 'light' ? 'dark' : 'light')

  return <ThemeContext.Provider value={{ theme, setTheme: selectTheme, toggleTheme }}>{children}</ThemeContext.Provider>
}
