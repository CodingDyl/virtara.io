import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Services from './pages/Services'
import Work from './pages/Work'
import Blog from './pages/Blog'
import BrandStrategy from './pages/BrandStrategy'

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Work />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/brand-strategy" element={<BrandStrategy />} />
        </Routes>
      </Router>
    </MantineProvider>
  )
}

export default App
