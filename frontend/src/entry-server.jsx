import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import PortfolioRoutes from './routes'
import ThemeProvider from './context/ThemeProvider'

export function render(pathname) {
  return renderToString(
    <ThemeProvider>
      <StaticRouter location={pathname}>
        <PortfolioRoutes />
      </StaticRouter>
    </ThemeProvider>,
  )
}
