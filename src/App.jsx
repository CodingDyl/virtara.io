import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import AnalyticsTracker from './components/AnalyticsTracker'
import LoadingSpinner from './components/ui/LoadingSpinner'

// Below-the-fold chrome. Both use framer-motion; deferring them keeps the
// animation library off the entry chunk.
const ScrollToTop = lazy(() => import('./components/ScrollToTop'))
const CookieConsent = lazy(() => import('./components/CookieConsent'))

// Every page is code-split so a visitor only downloads the route they land on.
const Home = lazy(() => import('./pages/Home'))
const Contact = lazy(() => import('./pages/Contact'))
const Services = lazy(() => import('./pages/Services'))
const Work = lazy(() => import('./pages/Work'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const StartaProject = lazy(() => import('./pages/StartaProject'))
const MaintenanceSupport = lazy(() => import('./pages/MaintenanceSupport'))
const Unsubscribe = lazy(() => import('./pages/Unsubscribe'))
const ComeBack = lazy(() => import('./pages/ComeBack'))

const PrivacyPolicy = lazy(() => import('./pages/Legal/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./pages/Legal/TermsOfService'))
const CookiePolicy = lazy(() => import('./pages/Legal/CookiePolicy'))

const HealthCheck = lazy(() => import('./pages/Resources/HealthCheck/HealthCheck'))
const HealthThankYou = lazy(() => import('./pages/Resources/HealthCheck/HealthThankYou'))
const AuditPage = lazy(() => import('./pages/Resources/Audit/AuditPage'))
const AuditThankYou = lazy(() => import('./pages/Resources/Audit/AuditThankYou'))
const ThankYou = lazy(() => import('./pages/Resources/StartaProject/ThankYou'))

const Starter = lazy(() => import('./pages/TailoredRoutes/WebDevelopment/Starter/Starter'))
const StarterThankYou = lazy(() => import('./pages/TailoredRoutes/WebDevelopment/Starter/StarterThankYou'))
const Professional = lazy(() => import('./pages/TailoredRoutes/WebDevelopment/Professional/Professional'))
const ProfThankYou = lazy(() => import('./pages/TailoredRoutes/WebDevelopment/Professional/ProfThankYou'))
const Enterprise = lazy(() => import('./pages/TailoredRoutes/WebDevelopment/Enterprise/Enterprise'))
const EntThankYou = lazy(() => import('./pages/TailoredRoutes/WebDevelopment/Enterprise/EntThankYou'))
const Seo = lazy(() => import('./pages/TailoredRoutes/Seo/Seo'))
const SeoThankYou = lazy(() => import('./pages/TailoredRoutes/Seo/SeoThankYou'))

// Matches the site's dark background so a route swap never flashes white.
function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0F0F0F]">
      <LoadingSpinner size="lg" variant="brand" />
      <span className="sr-only">Loading page</span>
    </div>
  )
}

function App() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/our-work" element={<Work />} />
            <Route path="/web-development-blog" element={<Blog />} />
            <Route path="/web-development-blog/:slug" element={<BlogPost />} />
            <Route path="/maintenance-support" element={<MaintenanceSupport />} />
            <Route path="/starta-project" element={<StartaProject />} />
            <Route path="/start-your-project" element={<StartaProject />} />

            <Route path="/resources/start-a-project/thank-you" element={<ThankYou />} />

            <Route path="/checklist" element={<HealthCheck />} />
            <Route path="/resources/health-check" element={<HealthCheck />} />
            <Route path="/thank-you" element={<HealthThankYou />} />
            <Route path="/checklist/thank-you" element={<HealthThankYou />} />
            <Route path="/resources/health-check/thank-you" element={<HealthThankYou />} />
            <Route path="/resources/audit" element={<AuditPage />} />
            <Route path="/resources/audit/thank-you" element={<AuditThankYou />} />
            <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/legal/terms-of-service" element={<TermsOfService />} />
            <Route path="/legal/cookie-policy" element={<CookiePolicy />} />

            <Route path="/web-development/starter" element={<Starter />} />
            <Route path="/web-development/starter/thank-you" element={<StarterThankYou />} />
            <Route path="/starter/thank-you" element={<StarterThankYou />} />
            <Route path="/web-development/professional" element={<Professional />} />
            <Route path="/web-development/professional/thank-you" element={<ProfThankYou />} />
            <Route path="/professional/thank-you" element={<ProfThankYou />} />
            <Route path="/web-development/enterprise" element={<Enterprise />} />
            <Route path="/web-development/enterprise/thank-you" element={<EntThankYou />} />
            <Route path="/enterprise/thank-you" element={<EntThankYou />} />

            <Route path="/seo" element={<Seo />} />
            <Route path="/seo/thank-you" element={<SeoThankYou />} />

            <Route path="/unsubscribe" element={<Unsubscribe />} />
            <Route path="/comeback" element={<ComeBack />} />
          </Routes>
        </Suspense>
        <AnalyticsTracker />
        <Suspense fallback={null}>
          <ScrollToTop />
          <CookieConsent />
        </Suspense>
      </Router>
    </HelmetProvider>
  )
}

export default App
