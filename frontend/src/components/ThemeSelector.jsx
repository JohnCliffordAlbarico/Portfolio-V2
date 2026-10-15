import { Moon, Sun } from 'lucide-react'
import useTheme from '../hooks/useTheme'

export default function ThemeSelector() {
  const { toggleTheme } = useTheme()

  // Both theme labels render together and CSS reveals the active one from the
  // root's data-theme, so the pre-paint theme and the rendered card always agree.
  return (
    <button className="theme-toggle" data-theme-toggle type="button" onClick={toggleTheme} aria-label="Toggle light and dark theme">
      <Sun className="theme-light" size={15} aria-hidden="true" />
      <Moon className="theme-dark" size={15} aria-hidden="true" />
      <span className="theme-light">Light</span>
      <span className="theme-dark">Dark</span>
    </button>
  )
}
