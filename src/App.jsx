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
import BlogPost from './pages/BlogPost';
import { HelmetProvider } from 'react-helmet-async'

function App() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <HelmetProvider>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/our-work" element={<Work />} />
          <Route path="/web-development-blog" element={<Blog />} />
          <Route path="/web-development-blog/:slug" element={<BlogPost />} />
          <Route path="/brand-strategy-services" element={<BrandStrategy />} />
          <Route path="/start-your-project" element={<StartaProject />} />

          <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/legal/terms-of-service" element={<TermsOfService />} />
          <Route path="/legal/cookie-policy" element={<CookiePolicy />} />  
        </Routes>
      </Router>
    </MantineProvider>
    </HelmetProvider>
  )
}

export default App
