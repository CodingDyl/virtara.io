import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initializeGA } from './lib/analytics';
import { rememberUtm } from './server/submitLead';

initializeGA();
rememberUtm();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
