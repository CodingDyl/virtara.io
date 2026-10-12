import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { subscribeToNewsletter } from '../../../config/firebase';
import ThankYouPage from '../../../components/layout/ThankYouPage';
import Button from '../../../components/ui/Button';

const ThankYou = () => {
  const [formData, setFormData] = useState({ email: '', name: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleHealthCheckSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      await subscribeToNewsletter(formData.email, formData.name);
      const response = await fetch('https://virtara-backend.vercel.app/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Subscription failed');
      setIsSuccess(true);
      navigate('/thank-you');
    } catch (err) {
      console.error('Error:', err);
      setError("We couldn't send the checklist just now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThankYouPage
      metaTitle="Thank You | Virtara"
      metaDescription="Thank you for reaching out. While you wait, discover how to optimize your website's conversion rate with our free checklist."
      canonical="https://virtara.co.za/resources/start-a-project/thank-you"
      lead="We'll be in touch within 24 hours to discuss your project."
    >
      <div className="rounded-card border border-edge bg-charcoal shadow-frame">
        <div className="border-b border-edge px-6 py-5 sm:px-8">
          <h2 className="text-title text-cloud">While you wait, optimise your current website</h2>
          <p className="mt-1 text-nav font-normal text-mist">
            Get our free Website Conversion Checklist and discover quick wins to improve your website's performance immediately.
          </p>
        </div>
        {!isSuccess ? (
          <form onSubmit={handleHealthCheckSubmit} className="p-6 sm:p-8">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="ty-name" className="field-label">Name</label>
                <input id="ty-name" type="text" autoComplete="name" placeholder="Your name" className="field-input" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div>
                <label htmlFor="ty-email" className="field-label">Email</label>
                <input id="ty-email" type="email" required autoComplete="email" placeholder="you@company.co.za" className="field-input" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
            </div>
            {error && <p role="alert" className="field-error">{error}</p>}
            <Button type="submit" size="lg" loading={isSubmitting} showArrow className="mt-6 font-semibold">
              {isSubmitting ? 'Sending…' : 'Get free checklist'}
            </Button>
          </form>
        ) : (
          <p className="p-8 text-center text-body text-frost" role="status">Check your email for your free checklist!</p>
        )}
      </div>
      <p className="mt-8 text-center text-nav font-normal text-mist">
        Have questions? Email us at{' '}
        <a href="mailto:info@virtara.co.za" className="text-link">info@virtara.co.za</a>
      </p>
    </ThankYouPage>
  );
};

export default ThankYou;
