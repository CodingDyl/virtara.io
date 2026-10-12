import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast, Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconMail } from '@tabler/icons-react';
import { unsubscribeFromNewsletter } from '../config/firebase';
import MinimalShell from '../components/layout/MinimalShell';
import Button from '../components/ui/Button';
import { toastOptions } from '../components/ui/toastOptions';

const Unsubscribe = () => {
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Get email from URL parameters if present
    const params = new URLSearchParams(location.search);
    const emailParam = params.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [location]);

  const handleUnsubscribe = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    try {
      
      const result = await unsubscribeFromNewsletter(email);
      
      if (result.success) {
        setIsUnsubscribed(true);
        toast.success(result.message);
        navigate('/comeback');
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error('Failed to unsubscribe. Please try again.');
    }
  };

  return (
    <MinimalShell>
      <Helmet>
        <title>Unsubscribe | Virtara Newsletter</title>
        <meta name="description" content="Unsubscribe from Virtara's newsletter" />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://virtara.co.za/unsubscribe" />
      </Helmet>
      <Toaster position="top-right" toastOptions={toastOptions} />

      {!isUnsubscribed ? (
        <>
          <h1 className="text-display text-cloud">We're sad to see you go.</h1>
          <p className="mt-5 text-lead text-frost">
            Before you unsubscribe, know that we've valued having you as part of our community. You'll be missed!
          </p>
          <form onSubmit={handleUnsubscribe} className="mx-auto mt-10 flex max-w-md flex-col gap-2 sm:flex-row">
            <label htmlFor="unsub-email" className="sr-only">Email address</label>
            <div className="relative flex-1">
              <IconMail size={16} stroke={1.6} aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-quiet" />
              <input
                id="unsub-email"
                type="email"
                autoComplete="email"
                placeholder="Confirm your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="field-input h-11 py-0 pl-10"
              />
            </div>
            <Button type="submit" variant="secondary">Unsubscribe</Button>
          </form>
        </>
      ) : (
        <div role="status">
          <h1 className="text-display text-cloud">You've been unsubscribed.</h1>
          <p className="mt-5 text-lead text-frost">
            We're sorry to see you go. You can always resubscribe if you change your mind.
          </p>
          <Button to="/" className="mt-8">Return home</Button>
        </div>
      )}
    </MinimalShell>
  );
};

export default Unsubscribe;
