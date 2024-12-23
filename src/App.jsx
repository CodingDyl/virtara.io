import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Services from './pages/Services'
import Work from './pages/Work'
import Blog from './pages/Blog'
import BrandStrategy from './pages/BrandStrategy'
import StartaProject from './pages/StartaProject'
import PrivacyPolicy from './pages/Legal/PrivacyPolicy'
import TermsOfService from './pages/Legal/TermsOfService'
import CookiePolicy from './pages/Legal/CookiePolicy'
import ScrollToTop from './components/ScrollToTop'
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Work />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/brand-strategy" element={<BrandStrategy />} />
          <Route path="/starta-project" element={<StartaProject />} />

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />  
        </Routes>
      </Router>
    </MantineProvider>
  )
}

export default App
