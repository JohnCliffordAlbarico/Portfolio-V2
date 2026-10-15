import { BrowserRouter } from 'react-router-dom'
import PortfolioRoutes from './routes'

export default function App() {
  return (
    <BrowserRouter>
      <PortfolioRoutes />
    </BrowserRouter>
  )
}
