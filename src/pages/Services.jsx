import { useEffect, useMemo, useState } from 'react';
import {
  IconTarget,
  IconPalette,
  IconCode,
  IconShoppingCart,
  IconSearch,
  IconChartLine,
  IconUsers,
  IconMailOpened,
  IconStack2,
  IconShieldCheck,
} from '@tabler/icons-react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageShell from '../components/layout/PageShell';
import PageHero from '../components/layout/PageHero';
import SectionHeading from '../components/layout/SectionHeading';
import ClosingBand from '../components/layout/ClosingBand';
import Button from '../components/ui/Button';
import PlanCard from '../components/ui/PlanCard';
import { cn } from '../utils/cn';
import { buildPlans, seoPlans, adsPlans, retainerPlans, careNote } from '../data/pricing';

const serviceCatalog = [
  { icon: IconTarget, title: 'Strategy & Positioning' },
  { icon: IconPalette, title: 'Brand Identity & Messaging' },
  { icon: IconCode, title: 'Web Design & Development' },
  { icon: IconShoppingCart, title: 'E-commerce Builds' },
  { icon: IconSearch, title: 'Technical + Content SEO' },
  { icon: IconChartLine, title: 'Google Ads / Performance Media' },
  { icon: IconUsers, title: 'Social Media Content Systems' },
  { icon: IconMailOpened, title: 'Email & CRM Automation' },
  { icon: IconStack2, title: 'Conversion Rate Optimization' },
  { icon: IconShieldCheck, title: 'Maintenance, Security & Hosting Ops' }
];

const tabs = [
  { id: 'development', label: 'Web & Commerce' },
  { id: 'seo', label: 'SEO & Content' },
  { id: 'growth', label: 'Paid Media & Growth' },
  { id: 'retainer', label: 'Brand & Retainer' }
];

const pricingByTab = {
  development: {
    title: 'Web & Commerce Builds',
    subtitle: 'Once-off implementation with clear scope and timeline.',
    packages: buildPlans.map((plan) => ({
      name: plan.name,
      price: plan.priceLabel,
      support: careNote(plan),
      idealFor: plan.idealFor,
      features: [...plan.features, `Live in ${plan.weeks}`, plan.deposit],
      highlighted: plan.highlighted,
      to: `/start-your-project?plan=${plan.id}`,
      cta: "Start this project"
    }))
  },
  seo: {
    title: 'SEO & Content Systems',
    subtitle: 'Month-to-month retainers. No lock-in contracts.',
    packages: seoPlans.map((plan) => ({
      name: plan.name,
      price: plan.priceLabel,
      support: `Setup fee: ${plan.setupFee} once-off`,
      idealFor: plan.idealFor,
      features: plan.features,
      highlighted: plan.highlighted
    }))
  },
  growth: {
    title: 'Paid Media & Funnel Growth',
    subtitle: 'Management fee shown below. Ad spend billed directly to ad platforms.',
    packages: adsPlans.map((plan) => ({
      name: plan.name,
      price: plan.priceLabel,
      support: `Recommended ad spend: ${plan.adSpend}`,
      idealFor: plan.idealFor,
      features: plan.features,
      highlighted: plan.highlighted
    }))
  },
  retainer: {
    title: 'Brand, Content & Revenue Retainers',
    subtitle: 'Ongoing growth support across design, content and conversion systems.',
    packages: retainerPlans.map((plan) => ({
      name: plan.name,
      price: plan.priceLabel,
      support: plan.note,
      idealFor: plan.idealFor,
      features: plan.features,
      highlighted: plan.highlighted
    }))
  }
};

function Services() {
  const [activeTab, setActiveTab] = useState('development');
  const location = useLocation();

  useEffect(() => {
    const id = location.hash.slice(1);
    if (pricingByTab[id]) setActiveTab(id);
  }, [location.hash]);

  const activeData = useMemo(() => pricingByTab[activeTab], [activeTab]);

  const selectTab = (id) => {
    setActiveTab(id);
    window.history.replaceState({}, '', `#${id}`);
  };

  // Arrow keys move between tabs (WAI-ARIA tabs pattern).
  const onTabKey = (e, index) => {
    const delta = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = tabs[(index + delta + tabs.length) % tabs.length].id;
    selectTab(next);
    document.getElementById(`tab-${next}`)?.focus();
  };

  return (
    <PageShell>
      <Helmet>
        <title>Digital Agency Services & Pricing (South Africa) | Virtara</title>
        <meta
          name="description"
          content="Transparent South African digital agency pricing for web development, SEO, paid media, branding, content and growth retainers."
        />
        <meta
          name="keywords"
          content="digital agency pricing South Africa, web design pricing, SEO pricing, Google ads management South Africa"
        />
        <link rel="canonical" href="https://virtara.co.za/services" />
      </Helmet>

      <PageHero
        announcement={{ label: 'Services + transparent SA pricing' }}
        title="Full-stack digital growth, built for the South African market."
        lead="No hidden fees. Clear scope. Real deliverables. Choose once-off builds or monthly growth retainers aligned to your stage."
        actions={
          <>
            <Button href="#packages" size="lg" className="font-semibold">See packages</Button>
            <Button to="/resources/audit" variant="secondary" size="lg">Book a strategy audit</Button>
          </>
        }
      />

      {/* Terms */}
      <section aria-label="What pricing covers">
        <div className="shell">
          <dl className="grid divide-y divide-edge border-y border-edge md:grid-cols-3 md:divide-x md:divide-y-0">
            {[
              ['Pricing includes', 'Planning, implementation, QA and reporting for the chosen scope.'],
              ['Pricing excludes', 'Media spend, premium plugins/licenses, and third-party platform fees.'],
              ['Commitment model', 'Builds are once-off. Retainers are month-to-month unless otherwise specified.'],
            ].map(([t, d]) => (
              <div key={t} className="py-6 md:px-8 md:first:pl-0 md:last:pr-0">
                <dt className="text-nav font-medium text-cloud">{t}</dt>
                <dd className="mt-1.5 text-nav font-normal leading-relaxed text-mist">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Catalogue */}
      <section className="section pb-0 md:pb-0" aria-labelledby="catalog-heading">
        <div className="shell">
          <SectionHeading id="catalog-heading" title="Everything you need under one team." />
          <ul className="mt-8 flex flex-wrap gap-2">
            {serviceCatalog.map(({ icon: Icon, title }) => (
              <li key={title} className="flex items-center gap-2.5 rounded-pill border border-edge bg-ink py-2 pl-3 pr-4 text-nav text-frost">
                <Icon size={16} stroke={1.6} aria-hidden="true" className="text-mist" />
                {title}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="section scroll-mt-20" aria-labelledby="packages-heading">
        <div className="shell">
          <span id={activeTab} className="block -translate-y-24" aria-hidden="true" />
          <h2 id="packages-heading" className="sr-only">Packages and pricing</h2>
          <div
            role="tablist"
            aria-label="Service categories"
            className="-mx-4 flex gap-1 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {tabs.map((tab, i) => {
              const on = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  aria-controls="packages-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => selectTab(tab.id)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className={cn(
                    'flex shrink-0 items-center gap-2 rounded-control px-4 py-2.5 text-body font-medium transition-colors duration-fast',
                    on ? 'bg-white/[0.04] text-cloud' : 'text-mist hover:text-frost'
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn('h-1.5 w-1.5 rotate-45 rounded-[1px]', on ? 'bg-signal shadow-[0_0_8px_rgb(var(--v-signal))]' : 'bg-edge-strong')}
                  />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div id="packages-panel" role="tabpanel" aria-labelledby={`tab-${activeTab}`} key={activeTab} className="mt-8 animate-fade-in">
            <div className="max-w-2xl">
              <h3 className="text-section text-cloud">{activeData.title}</h3>
              <p className="mt-3 text-body text-frost">{activeData.subtitle}</p>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {activeData.packages.map((pkg) => (
                <PlanCard
                  key={pkg.name}
                  name={pkg.name}
                  price={pkg.price}
                  note={pkg.support}
                  description={pkg.idealFor}
                  features={pkg.features}
                  highlighted={pkg.highlighted}
                  to={pkg.to}
                  cta={pkg.cta}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <ClosingBand
        title="Need a custom scope?"
        lead="If your goals need a blended stack across SEO, paid media, automation and website optimisation, we can build a custom monthly roadmap with fixed deliverables."
        actions={
          <>
            <Button to="/resources/audit" size="lg" className="font-semibold">Book a strategy audit</Button>
            <Button to="/contact-us" variant="secondary" size="lg">Talk to the team</Button>
          </>
        }
      />
    </PageShell>
  );
}

export default Services;
