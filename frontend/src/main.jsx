import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import ThemeProvider from './context/ThemeProvider.jsx'
import './styles/tailwind.css'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
)

// Query-based About sections differ from their canonical prerendered page.
if (root.dataset.prerendered === 'true' && !window.location.search) hydrateRoot(root, app)
else createRoot(root).render(app)
