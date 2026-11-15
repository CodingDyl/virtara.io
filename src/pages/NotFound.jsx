import { Helmet } from 'react-helmet-async'
import PageShell from '../components/layout/PageShell'
import Button from '../components/ui/Button'

const NotFound = () => (
  <PageShell>
    <Helmet>
      <title>Page not found | Virtara</title>
      <meta name="description" content="This page does not exist. Go back to the Virtara home page or see our services." />
      <meta name="robots" content="noindex, follow" />
    </Helmet>
    <section className="relative overflow-hidden pb-24 pt-40 md:pb-32 md:pt-48">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-glow" />
      <div className="shell relative max-w-xl text-center">
        <h1 className="text-display text-cloud">Page not found</h1>
        <p className="mt-5 text-lead text-frost">The page you are looking for does not exist or has moved.</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button to="/" size="lg" className="font-semibold">Back to home</Button>
          <Button to="/services" variant="secondary" size="lg">See our services</Button>
        </div>
      </div>
    </section>
  </PageShell>
)

export default NotFound
