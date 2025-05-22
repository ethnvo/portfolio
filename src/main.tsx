import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const container = document.getElementById('root')

// Make sure container is not null (TypeScript requires a check)
if (container) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
} else {
  throw new Error('Root element not found')
}
