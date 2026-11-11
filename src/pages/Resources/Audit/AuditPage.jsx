import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageShell from '../../../components/layout/PageShell';
import PageHero from '../../../components/layout/PageHero';
import { trackEvent } from '../../../lib/analytics';

const CAL_LINK = 'dylan-petzer-zfzvl2/30min';
const CAL_URL = `https://cal.com/${CAL_LINK}`;
// Cal ignores a second inline embed in a namespace, so each mount gets its own.
let embedCount = 0;

// Cal's dark theme mapped onto the site tokens (see DESIGN.md).
const CAL_DARK_VARS = {
  'cal-brand': '#4ea4ff',
  'cal-brand-emphasis': '#8fc5ff',
  'cal-brand-text': '#050608',
  'cal-text': '#dee3ec',
  'cal-text-emphasis': '#ffffff',
  'cal-text-subtle': '#aeb6c9',
  'cal-text-muted': '#8a92a6',
  'cal-bg': '#0f1219',
  'cal-bg-emphasis': '#1e2330',
  'cal-bg-subtle': '#151a24',
  'cal-bg-muted': '#0f1219',
  'cal-border': '#1e2330',
  'cal-border-emphasis': '#2a3142',
  'cal-border-subtle': '#1e2330',
  'cal-border-booker': '#1e2330',
};

const QUIZ_FIELDS = [
  { key: 'revenueGoal', label: 'Revenue goal' },
  { key: 'leadVolume', label: 'Lead requirement' },
  { key: 'primaryConstraint', label: 'Main blocker' },
];

const AuditPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const embedRef = useRef(null);
  const navigateRef = useRef(navigate);
  navigateRef.current = navigate;

  // Quiz answers arrive as query params; hand them to the booking's notes field.
  const notes = QUIZ_FIELDS.filter(({ key }) => searchParams.get(key))
    .map(({ key, label }) => `${label}: ${searchParams.get(key)}`)
    .join('\n');

  // Cal.com's vanilla inline embed. Runs in an effect only: the page is prerendered.
  useEffect(() => {
    const container = embedRef.current;
    if (!container) return undefined;
    let active = true;

    (function (C, A, L) {
      const p = (a, ar) => { a.q.push(ar); };
      const d = C.document;
      C.Cal = C.Cal || function () {
        const cal = C.Cal;
        const ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement('script')).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === 'string') {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ['initNamespace', namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, 'https://app.cal.com/embed/embed.js', 'init');

    const namespace = `audit-${++embedCount}`;
    window.Cal('init', namespace, { origin: 'https://app.cal.com' });
    const cal = window.Cal.ns[namespace];

    cal('inline', {
      elementOrSelector: container,
      calLink: CAL_LINK,
      layout: 'month_view',
      config: { layout: 'month_view', theme: 'dark', ...(notes && { notes }) },
    });
    cal('ui', {
      theme: 'dark',
      layout: 'month_view',
      hideEventTypeDetails: false,
      cssVarsPerTheme: { light: CAL_DARK_VARS, dark: CAL_DARK_VARS },
    });
    // bookingSuccessfulV2 is the current event; bookingSuccessful is deprecated.
    cal('on', {
      action: 'bookingSuccessfulV2',
      callback: () => {
        if (!active) return;
        active = false;
        trackEvent('generate_lead', { form: 'audit_booking' });
        navigateRef.current('/resources/audit/thank-you');
      },
    });

    return () => {
      active = false;
      container.innerHTML = '';
    };
  }, [notes]);

  return (
    <PageShell>
      <Helmet>
        <title>Website Audit Booking | Virtara</title>
        <meta name="description" content="Book your personalized website audit session with our experts and get detailed insights to improve your website's performance." />
        <link rel="canonical" href="https://virtara.co.za/resources/audit" />
      </Helmet>

      <PageHero
        announcement={{ label: '30-minute expert session' }}
        title="Book your website audit session."
        lead="Let's analyse your website and create a custom plan to boost your conversions."
      />

      <section className="pb-24 md:pb-32" aria-label="Book a time">
        <div className="shell max-w-4xl">
          <div className="overflow-hidden rounded-card border border-edge bg-charcoal shadow-frame">
            <div ref={embedRef} className="min-h-[720px] w-full md:min-h-[540px]" />
          </div>
          <p className="mt-5 text-center text-nav font-normal text-quiet">
            Calendar not loading?{' '}
            <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="text-signal-soft underline-offset-4 hover:underline">
              Open the booking page
            </a>
          </p>
        </div>
      </section>
    </PageShell>
  );
};

export default AuditPage;
