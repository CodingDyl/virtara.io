import { Helmet } from 'react-helmet-async';
import MinimalShell from '../components/layout/MinimalShell';
import Button from '../components/ui/Button';

const ComeBack = () => (
  <MinimalShell>
    <Helmet>
      <title>See You Soon | Virtara Newsletter</title>
      <meta name="description" content="Thank you for being part of Virtara's newsletter community" />
      <meta name="robots" content="noindex, follow" />
      <link rel="canonical" href="https://virtara.co.za/comeback" />
    </Helmet>
    <h1 className="text-display text-cloud">Until we meet again.</h1>
    <p className="mt-5 text-lead text-frost">
      You've been successfully unsubscribed from our newsletter. We appreciate the time you spent with us — our door is always
      open if you'd like to return.
    </p>
    <Button to="/" size="lg" className="mt-8 font-semibold">Return to homepage</Button>
  </MinimalShell>
);

export default ComeBack;
