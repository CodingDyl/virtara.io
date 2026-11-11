import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'
import { initializeGA } from './lib/analytics';

initializeGA();

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)

// Hydrate only the route this HTML was prerendered for. Vercel's catch-all
// rewrite serves the home page's HTML for every other URL; discard it there.
const path = window.location.pathname.replace(/\/+$/, '') || '/'
if (container.hasChildNodes() && container.dataset.prerendered === path) {
  hydrateRoot(container, app)
} else {
  container.replaceChildren()
  createRoot(container).render(app)
}
