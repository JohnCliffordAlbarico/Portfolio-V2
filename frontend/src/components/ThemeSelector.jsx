import { useSyncExternalStore } from 'react'
import { Moon, Sun } from 'lucide-react'
import useTheme from '../hooks/useTheme'

const subscribe = () => () => {}
const clientSnapshot = () => true
const serverSnapshot = () => false

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  // Match the prerendered attributes during hydration; CSS reflects the theme
  // selected by the pre-paint script immediately, including a saved dark theme.
  const hydrated = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot)
  const selected = hydrated ? theme : 'light'

  return (
    <div className="theme-selector" role="group" aria-label="Color theme">
      <button className="theme-choice" type="button" data-color-theme="light" aria-pressed={selected === 'light'} onClick={() => setTheme('light')}>
        <Sun size={14} aria-hidden="true" />Light
      </button>
      <button className="theme-choice" type="button" data-color-theme="dark" aria-pressed={selected === 'dark'} onClick={() => setTheme('dark')}>
        <Moon size={14} aria-hidden="true" />Dark
      </button>
    </div>
  )
}
