import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaBullseye,
  FaChartLine,
  FaCheck,
  FaCode,
  FaEnvelopeOpenText,
  FaLayerGroup,
  FaPaintBrush,
  FaSearch,
  FaShieldAlt,
  FaShoppingCart,
  FaUsers
} from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const serviceCatalog = [
  { icon: <FaBullseye className="w-5 h-5" />, title: 'Strategy & Positioning' },
  { icon: <FaPaintBrush className="w-5 h-5" />, title: 'Brand Identity & Messaging' },
  { icon: <FaCode className="w-5 h-5" />, title: 'Web Design & Development' },
  { icon: <FaShoppingCart className="w-5 h-5" />, title: 'E-commerce Builds' },
  { icon: <FaSearch className="w-5 h-5" />, title: 'Technical + Content SEO' },
  { icon: <FaChartLine className="w-5 h-5" />, title: 'Google Ads / Performance Media' },
  { icon: <FaUsers className="w-5 h-5" />, title: 'Social Media Content Systems' },
  { icon: <FaEnvelopeOpenText className="w-5 h-5" />, title: 'Email & CRM Automation' },
  { icon: <FaLayerGroup className="w-5 h-5" />, title: 'Conversion Rate Optimization' },
  { icon: <FaShieldAlt className="w-5 h-5" />, title: 'Maintenance, Security & Hosting Ops' }
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
  const navigate = useNavigate();

  useEffect(() => {
    if (location.hash === '#seo') {
      setActiveTab('seo');
      return;
    }
    if (location.hash === '#development') {
      setActiveTab('development');
      return;
    }
    if (location.hash === '#growth') {
      setActiveTab('growth');
      return;
    }
    if (location.hash === '#retainer') {
      setActiveTab('retainer');
    }
  }, [location.hash]);

  const activeData = useMemo(() => pricingByTab[activeTab], [activeTab]);

  return (
    <>
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

      <main className="bg-[#050910] min-h-screen text-white virtara-body">
        <Navbar />

        <section className="pt-32 md:pt-36 pb-14 md:pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(20,99,255,0.28),transparent_38%),radial-gradient(circle_at_78%_5%,rgba(96,219,255,0.2),transparent_34%)]" />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="max-w-5xl mx-auto text-center"
            >
              <Badge variant="primary" size="lg" className="mb-5">Services + Transparent SA Pricing</Badge>
              <h1 className="virtara-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.96] tracking-tight mb-6">
                Full-Stack Digital Growth Services
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8df6ff] to-[#4ea4ff]"> Built for the South African Market</span>
              </h1>
              <p className="text-lg md:text-xl text-[#c2d4ff] max-w-3xl mx-auto leading-relaxed">
                No hidden fees. Clear scope. Real deliverables. Choose once-off builds or monthly growth retainers aligned to your stage.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="pb-8">
          <div className="container mx-auto px-6">
            <Card className="max-w-6xl mx-auto border border-[#74a7ff]/30 bg-[linear-gradient(120deg,rgba(8,16,33,0.85),rgba(8,16,33,0.5))]">
              <Card.Content>
                <div className="grid md:grid-cols-3 gap-6 text-sm md:text-base text-[#c5d8ff]">
                  <div>
                    <p className="font-semibold text-white mb-2">Pricing includes</p>
                    <p>Planning, implementation, QA and reporting for the chosen scope.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-2">Pricing excludes</p>
                    <p>Media spend, premium plugins/licenses, and third-party platform fees.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-2">Commitment model</p>
                    <p>Builds are once-off. Retainers are month-to-month unless otherwise specified.</p>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>
        </section>

        <section className="pb-16 md:pb-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="max-w-6xl mx-auto"
            >
              <h2 className="virtara-display text-3xl md:text-4xl mb-6">Everything You Need Under One Team</h2>
              <div className="flex flex-wrap gap-3">
                {serviceCatalog.map((service) => (
                  <div
                    key={service.title}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 flex items-center gap-3"
                  >
                    <span className="text-[#84dcff]">{service.icon}</span>
                    <span className="text-[#d7e5ff] text-sm md:text-base">{service.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="pb-20 md:pb-24" id={activeTab}>
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-wrap gap-3 mb-10">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      window.history.replaceState({}, '', `#${tab.id}`);
                    }}
                    className={`rounded-full px-5 py-3 text-sm md:text-base transition-all duration-300 border ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-[#8df6ff] to-[#4ea4ff] text-[#04142d] border-transparent font-semibold'
                        : 'bg-white/[0.03] text-[#bfd2fb] border-white/15 hover:bg-white/[0.08]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="mb-10">
                  <h3 className="virtara-display text-3xl md:text-5xl mb-3">{activeData.title}</h3>
                  <p className="text-[#b7cbfa] text-lg">{activeData.subtitle}</p>
                </div>

                <div className="space-y-5">
                  {activeData.packages.map((pkg) => (
                    <Card
                      key={pkg.name}
                      className={`border ${pkg.highlighted ? 'border-[#79deff]/70' : 'border-white/10'} bg-[linear-gradient(160deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))]`}
                      hover
                    >
                      <Card.Content className="md:p-7">
                        <div className="grid md:grid-cols-[1.15fr_1fr] gap-6 md:gap-8 items-start">
                          <div>
                            {pkg.highlighted && (
                              <Badge variant="gradient" className="mb-4">Most Selected</Badge>
                            )}
                            <h4 className="text-2xl font-semibold text-white mb-2">{pkg.name}</h4>
                            <p className="text-3xl font-bold text-[#8df6ff] mb-2">{pkg.price}</p>
                            <p className="text-sm text-[#9dc0ff] mb-4">{pkg.support}</p>
                            <p className="text-sm text-[#d0dcff] leading-relaxed">{pkg.idealFor}</p>
                          </div>

                          <div>
                            <ul className="space-y-3 mb-7">
                              {pkg.features.map((feature) => (
                                <li key={feature} className="text-sm text-[#cfddff] flex items-start gap-2">
                                  <FaCheck className="mt-1 w-3.5 h-3.5 text-[#7de2ff] flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                            <Button
                              variant="gradient"
                              size="md"
                              className="w-full md:w-auto"
                              onClick={() => navigate('/start-your-project')}
                              showArrow
                            >
                              Book a Strategy Audit
                            </Button>
                          </div>
                        </div>
                      </Card.Content>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container mx-auto px-6">
            <Card className="max-w-5xl mx-auto border border-[#74a7ff]/35 bg-[linear-gradient(130deg,rgba(7,17,35,0.9),rgba(8,16,33,0.55))] text-center">
              <Card.Content>
                <h3 className="virtara-display text-3xl md:text-5xl mb-5">Need a Custom Scope?</h3>
                <p className="text-[#c7d9ff] max-w-3xl mx-auto mb-8 text-lg leading-relaxed">
                  If your goals need a blended stack across SEO, paid media, automation and website optimization, we can build a custom monthly roadmap with fixed deliverables.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button variant="gradient" size="lg" onClick={() => navigate('/start-your-project')}>
                    Book a Strategy Audit
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => navigate('/contact-us')}>
                    Talk to the Team
                  </Button>
                </div>
              </Card.Content>
            </Card>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

export default Services;
