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
    packages: [
      {
        name: 'Launch Site',
        price: 'R12,500 once-off',
        support: 'Optional care plan: from R1,200/mo',
        idealFor: 'Startups and service businesses that need a conversion-ready web presence.',
        features: [
          'Up to 5 pages, mobile-first design',
          'CMS setup + lead capture forms',
          'Core technical SEO + analytics setup',
          '2 rounds of revisions',
          'Launch training + handover docs'
        ]
      },
      {
        name: 'Growth Site',
        price: 'R28,000 once-off',
        support: 'Optional care plan: from R2,500/mo',
        idealFor: 'SMEs that need multi-service funnels and stronger conversion architecture.',
        features: [
          '8-15 pages + conversion-focused information architecture',
          'Advanced CMS, blog and gated resources',
          'Speed/performance optimization + event tracking',
          'Booking/calendar or CRM form integrations',
          'Copy framework and CRO recommendations'
        ],
        highlighted: true
      },
      {
        name: 'Commerce / Custom Platform',
        price: 'From R55,000 once-off',
        support: 'Optional care plan: from R4,500/mo',
        idealFor: 'Brands needing e-commerce, portals, memberships or custom workflows.',
        features: [
          'Shopify/WooCommerce or custom build',
          'Payments, shipping, product and offer architecture',
          'Automation hooks (email, CRM, remarketing)',
          'Staging + QA + launch checklist',
          'Technical documentation and team onboarding'
        ]
      }
    ]
  },
  seo: {
    title: 'SEO & Content Systems',
    subtitle: 'Month-to-month retainers. No lock-in contracts.',
    packages: [
      {
        name: 'Local SEO Foundation',
        price: 'R4,500/mo',
        support: 'Setup fee: R3,500 once-off',
        idealFor: 'Local service businesses targeting a city/region.',
        features: [
          'Technical baseline + indexing fixes',
          'Google Business Profile optimization',
          'Keyword map for 10 priority terms',
          '2 optimized pages per month',
          'Monthly ranking + lead report'
        ]
      },
      {
        name: 'SEO Growth Engine',
        price: 'R8,500/mo',
        support: 'Setup fee: R5,500 once-off',
        idealFor: 'SMEs that need consistent lead growth from organic search.',
        features: [
          'Everything in Foundation',
          'Technical sprint + schema optimization',
          '4 pages/posts optimized per month',
          'Internal linking + content refresh system',
          'Quarterly competitor gap analysis'
        ],
        highlighted: true
      },
      {
        name: 'Competitive SEO',
        price: 'R14,500/mo',
        support: 'Setup fee: R8,500 once-off',
        idealFor: 'High-competition niches or multi-location businesses.',
        features: [
          'Advanced technical + crawl budget management',
          'Content roadmap and editorial planning',
          'Authority/link outreach execution',
          'Programmatic landing page support',
          'Executive growth reporting + strategy calls'
        ]
      }
    ]
  },
  growth: {
    title: 'Paid Media & Funnel Growth',
    subtitle: 'Management fee shown below. Ad spend billed directly to ad platforms.',
    packages: [
      {
        name: 'Ads Starter',
        price: 'R6,500/mo management',
        support: 'Recommended ad spend: R7,500 - R20,000/mo',
        idealFor: 'Testing paid acquisition with controlled budgets.',
        features: [
          'Single-channel setup (Google or Meta)',
          'Conversion tracking + dashboard setup',
          'Weekly optimization and budget pacing',
          '2 campaign structures with ad variants',
          'Monthly strategy report'
        ]
      },
      {
        name: 'Performance Sprint',
        price: 'R9,800/mo management',
        support: 'Recommended ad spend: R20,000 - R60,000/mo',
        idealFor: 'Businesses scaling lead volume with clear CAC targets.',
        features: [
          'Multi-campaign funnel (cold, warm, remarketing)',
          'Landing page CRO feedback each month',
          'Creative testing framework',
          'Lead quality scoring loop',
          'Bi-weekly growth calls'
        ],
        highlighted: true
      },
      {
        name: 'Full Funnel Performance',
        price: 'R15,500/mo management',
        support: 'Recommended ad spend: R60,000+/mo',
        idealFor: 'High-ticket offers or established sales teams.',
        features: [
          'Google + Meta + remarketing orchestration',
          'Advanced attribution and funnel reporting',
          'Offer and creative iteration sprints',
          'Email nurture journey alignment',
          'Weekly executive updates'
        ]
      }
    ]
  },
  retainer: {
    title: 'Brand, Content & Revenue Retainers',
    subtitle: 'Ongoing growth support across design, content and conversion systems.',
    packages: [
      {
        name: 'Brand Foundation Sprint',
        price: 'R9,500 once-off',
        support: 'Timeline: 2-3 weeks',
        idealFor: 'New brands needing clear identity, offer framing and messaging.',
        features: [
          'Brand positioning workshop',
          'Visual direction and key brand assets',
          'Offer and messaging framework',
          'Landing page wireframe + CTA strategy',
          'Brand usage guide'
        ]
      },
      {
        name: 'Content + Social Engine',
        price: 'R5,500/mo',
        support: 'Includes 1-2 social platforms',
        idealFor: 'Businesses that need consistent publishing and authority content.',
        features: [
          'Monthly content calendar',
          '8-12 branded content pieces',
          'Copywriting + design production',
          'Community and DM response support',
          'Performance summary and next-step plan'
        ]
      },
      {
        name: 'Fractional Growth Team',
        price: 'From R18,000/mo',
        support: 'Custom scope by revenue goals',
        idealFor: 'Companies wanting one team across web, SEO, ads and conversion.',
        features: [
          'Monthly growth roadmap and priority sprints',
          'Cross-channel campaign orchestration',
          'Conversion and analytics ownership',
          'Design/dev implementation bandwidth',
          'Dedicated strategist and execution pod'
        ],
        highlighted: true
      }
    ]
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
            <Button to="/start-your-project" variant="secondary" size="lg">Book a strategy audit</Button>
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
            <Button to="/start-your-project" size="lg" className="font-semibold">Book a strategy audit</Button>
            <Button to="/contact-us" variant="secondary" size="lg">Talk to the team</Button>
          </>
        }
      />
    </PageShell>
  );
}

export default Services;
