import ThankYouPage from '../../../components/layout/ThankYouPage';

const AuditThankYou = () => (
  <ThankYouPage
    metaTitle="Thank You | Website Audit Booking | Virtara"
    metaDescription="Thank you for booking your website audit session with Virtara. We'll be in touch shortly to confirm your appointment."
    canonical="https://virtara.co.za/resources/audit/thank-you"
    title="Thank you for booking."
    lead="We've received your audit booking request and we'll be in touch shortly to confirm your appointment."
    steps={[
      { title: "Confirmation", description: "You'll receive a confirmation email shortly." },
      { title: "Site review", description: "We'll review your website details before the session." },
      { title: "Your session", description: "We'll meet at your scheduled time to discuss your website." },
    ]}
    waitCopy="Questions before your session?"
    resources={[{ label: "Contact support", to: "/contact-us" }]}
  />
);

export default AuditThankYou;
