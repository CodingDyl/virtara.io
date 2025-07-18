import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Services from './pages/Services'
import Work from './pages/Work'
import Blog from './pages/Blog'
import StartaProject from './pages/StartaProject'
import PrivacyPolicy from './pages/Legal/PrivacyPolicy'
import TermsOfService from './pages/Legal/TermsOfService'
import CookiePolicy from './pages/Legal/CookiePolicy'
import ScrollToTop from './components/ScrollToTop'
import { useEffect } from 'react';
import BlogPost from './pages/BlogPost';
import { HelmetProvider } from 'react-helmet-async'
import HealthCheck from './pages/Resources/HealthCheck/HealthCheck'
import HealthThankYou from './pages/Resources/HealthCheck/HealthThankYou'
import MaintenanceSupport from './pages/MaintenanceSupport'
import Starter from './pages/TailoredRoutes/WebDevelopment/Starter/Starter'
import Professional from './pages/TailoredRoutes/WebDevelopment/Professional/Professional'
import Enterprise from './pages/TailoredRoutes/WebDevelopment/Enterprise/Enterprise'
import Unsubscribe from './pages/Unsubscribe'
import ComeBack from './pages/ComeBack'
import AuditPage from './pages/Resources/Audit/AuditPage'
import AuditThankYou from './pages/Resources/Audit/AuditThankYou'
import ThankYou from './pages/Resources/StartaProject/ThankYou'
import StarterThankYou from './pages/TailoredRoutes/WebDevelopment/Starter/StarterThankYou'
import ProfThankYou from './pages/TailoredRoutes/WebDevelopment/Professional/ProfThankYou'
import EntThankYou from './pages/TailoredRoutes/WebDevelopment/Enterprise/EntThankYou'
import Seo from './pages/TailoredRoutes/Seo/Seo'
import SeoThankYou from './pages/TailoredRoutes/Seo/SeoThankYou'
import CookieConsent from './components/CookieConsent'

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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/our-work" element={<Work />} />
          <Route path="/web-development-blog" element={<Blog />} />
          <Route path="/web-development-blog/:slug" element={<BlogPost />} />
          <Route path="/maintenance-support" element={<MaintenanceSupport />} />
          <Route path="/start-your-project" element={<StartaProject />} />

          <Route path="/resources/start-a-project/thank-you" element={<ThankYou />} />

          <Route path="/resources/health-check" element={<HealthCheck />} />
          <Route path="/resources/health-check/thank-you" element={<HealthThankYou />} />
          <Route path="/resources/audit" element={<AuditPage />} />
          <Route path="/resources/audit/thank-you" element={<AuditThankYou />} />
          <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/legal/terms-of-service" element={<TermsOfService />} />
          <Route path="/legal/cookie-policy" element={<CookiePolicy />} />  

          <Route path="/web-development/starter" element={<Starter />} />
          <Route path="/starter/thank-you" element={<StarterThankYou />} />
          <Route path="/web-development/professional" element={<Professional />} />
          <Route path="/professional/thank-you" element={<ProfThankYou />} />
          <Route path="/web-development/enterprise" element={<Enterprise />} />
          <Route path="/enterprise/thank-you" element={<EntThankYou />} />

          <Route path="/seo" element={<Seo />} />
          <Route path="/seo/thank-you" element={<SeoThankYou />} />

          <Route path="/unsubscribe" element={<Unsubscribe />} />
          <Route path="/comeback" element={<ComeBack />} />
        </Routes>
        <ScrollToTop />
        <CookieConsent />
      </Router>
    </MantineProvider>
    </HelmetProvider>
  )
}

export default App
