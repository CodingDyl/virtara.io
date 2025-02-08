import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TagManager from 'react-gtm-module';

const tagManagerArgs = {
  gtmId: 'GTM-M95T9PRH'
}

TagManager.initialize(tagManagerArgs);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
