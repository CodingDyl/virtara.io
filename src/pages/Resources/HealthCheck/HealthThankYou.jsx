import { IconCheck } from '@tabler/icons-react';
import ThankYouPage from '../../../components/layout/ThankYouPage';
import Button from '../../../components/ui/Button';

const HealthThankYou = () => (
  <ThankYouPage
    metaTitle="Thank You - Website Health Check | Virtara"
    metaDescription="Thank you for downloading our website health check. Upgrade to a personalized website audit for expert insights."
    canonical="https://virtara.co.za/resources/health-check/thank-you"
    title="Thanks! Your checklist is on its way."
    lead="Check your inbox for the 5-Minute Website Health Check."
  >
    <div className="grid overflow-hidden rounded-card border border-signal/40 bg-charcoal shadow-frame md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      <div className="p-6 sm:p-8">
        <h2 className="text-title text-cloud">Want us to do the heavy lifting?</h2>
        <p className="mt-3 text-body text-mist">
          Grab a 30-minute website audit and get a custom fix-it plan from our experts. We'll analyse your site and show you exactly
          what needs to change to boost conversions.
        </p>
        <p className="mt-6 flex items-baseline gap-3">
          <span className="figure text-[36px] leading-none text-cloud">R299</span>
          <span className="figure text-[18px] text-quiet line-through">R499</span>
        </p>
        <Button to="/resources/audit" size="lg" showArrow className="mt-6 font-semibold">
          Claim my audit now
        </Button>
      </div>
      <div className="border-t border-edge bg-ink/60 p-6 sm:p-8 md:border-l md:border-t-0">
        <h3 className="text-nav font-medium text-frost">What's included</h3>
        <ul className="mt-4 space-y-3">
          {['30-minute expert analysis', 'Custom action plan', 'Priority support'].map((b) => (
            <li key={b} className="flex items-center gap-3 text-body text-frost">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal/15 text-signal">
                <IconCheck size={12} stroke={2.6} aria-hidden="true" />
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </ThankYouPage>
);

export default HealthThankYou;
