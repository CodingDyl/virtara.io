import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { IconCheck } from '@tabler/icons-react';
import { healthCheckPreview } from '../../../assets';
import { subscribeToNewsletter } from '../../../config/firebase';
import PageShell from '../../../components/layout/PageShell';
import PageHero from '../../../components/layout/PageHero';
import Button from '../../../components/ui/Button';

const Checklist = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // First, update Firestore through the subscribeToNewsletter function
      const subscriptionResult = await subscribeToNewsletter(formData.email, formData.name);
      
      if (!subscriptionResult.success) {
        throw new Error(subscriptionResult.message);
      }

      // Then call the existing subscribe API endpoint
      const response = await fetch('https://virtara-backend.vercel.app/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      
      // Show success state
      setIsSuccess(true);

      // Wait a moment to ensure the download starts
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Navigate to thank you page
      navigate('/thank-you');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      setIsSuccess(false);
      setError("We couldn't send the checklist just now. Please try again, or email info@virtara.co.za.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageShell>
      <Helmet>
        <title>Free Website Conversion Checklist | Virtara</title>
        <meta name="description" content="Download our free website conversion checklist to discover why your website isn't converting and how to fix it. Quick 5-minute assessment to boost your conversion rates." />
        <meta name="keywords" content="website conversion, conversion checklist, conversion optimization, website optimization" />
        <link rel="canonical" href="https://virtara.co.za/resources/health-check" />
      </Helmet>

      <PageHero
        announcement={{ label: 'Free download' }}
        title="Discover why your website isn't converting."
        lead="Takes 5 minutes. Spots leaks. Saves customers."
      />

      <section className="pb-24 md:pb-32" aria-label="Get the checklist">
        <div className="shell grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="rounded-card border border-edge bg-charcoal shadow-frame">
              <div className="border-b border-edge px-6 py-5 sm:px-8">
                <h2 className="text-title text-cloud">Get the checklist</h2>
                <p className="mt-1 text-nav font-normal text-mist">We'll email it straight to you.</p>
              </div>
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-8">
                  <div>
                    <label htmlFor="hc-name" className="field-label">Name</label>
                    <input
                      type="text"
                      id="hc-name"
                      autoComplete="name"
                      required
                      className="field-input"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="hc-email" className="field-label">Email</label>
                    <input
                      type="email"
                      id="hc-email"
                      autoComplete="email"
                      required
                      className="field-input"
                      placeholder="you@company.co.za"
                      aria-invalid={error ? 'true' : undefined}
                      aria-describedby={error ? 'hc-error' : undefined}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {error && <p id="hc-error" role="alert" className="field-error">{error}</p>}
                  </div>
                  <Button type="submit" size="lg" loading={isSubmitting} showArrow className="w-full font-semibold">
                    {isSubmitting ? 'Processing…' : 'Get my free checklist'}
                  </Button>
                </form>
              ) : (
                <div className="p-8 text-center" role="status">
                  <h3 className="text-title text-cloud">Thank you!</h3>
                  <p className="mt-2 text-body text-mist">Check your email for your free checklist.</p>
                </div>
              )}
            </div>

            <h2 className="mt-10 text-feature text-cloud">What you'll discover</h2>
            <ul className="mt-4 space-y-3">
              {['Common conversion killers', 'Quick-win optimisation tips', 'Expert conversion strategies'].map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-body text-frost">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal/15 text-signal">
                    <IconCheck size={12} stroke={2.6} aria-hidden="true" />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* The document itself, on a lit stage */}
          <div className="relative">
            <div aria-hidden="true" className="absolute inset-8 bg-signal/20 blur-3xl" />
            <div className="relative mx-auto max-w-md -rotate-1 rounded-card border border-edge bg-charcoal p-3 shadow-frame">
              <img
                src={healthCheckPreview}
                alt="Preview of the Virtara website health check checklist"
                width="900"
                height="1200"
                className="aspect-[3/4] w-full rounded-[10px] object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Checklist;
