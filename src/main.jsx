import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'
import { initializeGA } from './lib/analytics';
import { PrerenderDataProvider } from './lib/prerenderData';

initializeGA();

const container = document.getElementById('root')
// Hydrate only the route this HTML was prerendered for. Vercel's rewrites
// serve the home page's HTML for client-rendered routes; discard it there.
const path = window.location.pathname.replace(/\/+$/, '') || '/'
const hydrating = container.hasChildNodes() && container.dataset.prerendered === path

// Sanity data the prerender embedded for this page; only valid when hydrating it.
let data = null
if (hydrating) {
  try {
    data = JSON.parse(document.getElementById('prerender-data')?.textContent || 'null')
  } catch {
    data = null
  }
}

const app = (
  <StrictMode>
    <HelmetProvider>
      <PrerenderDataProvider value={data}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PrerenderDataProvider>
    </HelmetProvider>
  </StrictMode>
)

if (hydrating) {
  hydrateRoot(container, app)
} else {
  container.replaceChildren()
  createRoot(container).render(app)
}
