/**
 * Every plan name, price and feature list on the site lives here.
 * Pages read from these tables; do not type a plan price anywhere else.
 */

export const buildPlans = [
  {
    id: 'launch',
    weeks: '2–3 weeks',
    deposit: '50% to start, 50% at launch',
    name: 'Launch Site',
    price: 'R12,500',
    priceLabel: 'R12,500 once-off',
    idealFor: 'Startups and service businesses that need a conversion-ready web presence.',
    carePlanId: 'essential',
    features: [
      'Up to 5 pages, mobile-first design',
      'CMS setup + lead capture forms',
      'Core technical SEO + analytics setup',
      '2 rounds of revisions',
      'Launch training + handover docs'
    ]
  },
  {
    id: 'growth',
    weeks: '4–6 weeks',
    deposit: '50% to start, 50% at launch',
    name: 'Growth Site',
    price: 'R28,000',
    priceLabel: 'R28,000 once-off',
    idealFor: 'SMEs that need multi-service funnels and stronger conversion architecture.',
    carePlanId: 'pro',
    highlighted: true,
    features: [
      '8-15 pages + conversion-focused information architecture',
      'Advanced CMS, blog and gated resources',
      'Speed/performance optimization + event tracking',
      'Booking/calendar or CRM form integrations',
      'Copy framework and CRO recommendations'
    ]
  },
  {
    id: 'commerce',
    weeks: '8–12 weeks',
    deposit: '50% to start, 50% at launch',
    name: 'Commerce / Custom Platform',
    price: 'R55,000',
    priceLabel: 'From R55,000 once-off',
    idealFor: 'Brands needing e-commerce, portals, memberships or custom workflows.',
    carePlanId: 'premium',
    features: [
      'Shopify/WooCommerce or custom build',
      'Payments, shipping, product and offer architecture',
      'Automation hooks (email, CRM, remarketing)',
      'Staging + QA + launch checklist',
      'Technical documentation and team onboarding'
    ]
  }
];

export const carePlans = [
  {
    id: 'essential',
    name: 'Essential Maintenance',
    price: 'R1,000',
    priceLabel: 'R1,000/month',
    features: [
      'Monthly CMS & Plugin Updates',
      'Weekly Secure Backups',
      'Basic Malware Scans',
      'Uptime Monitoring',
      '48-hour Email Support'
    ]
  },
  {
    id: 'pro',
    name: 'Pro Maintenance',
    price: 'R2,500',
    priceLabel: 'R2,500/month',
    highlighted: true,
    features: [
      'All Essential Features',
      'Performance Optimization',
      '2 Hours Content Updates',
      'Advanced Security Scans',
      '24-hour Priority Support',
      'Monthly Analytics Review'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Maintenance',
    price: 'R5,000',
    priceLabel: 'R5,000/month',
    features: [
      'All Pro Features',
      '5 Hours Custom Development',
      'E-Commerce Support',
      'Proactive Improvements',
      '2-Hour Downtime Response',
      'Dedicated Account Manager'
    ]
  }
];

export const seoPlans = [
  {
    id: 'local',
    name: 'Local SEO + AEO Foundation',
    price: 'R4,500',
    priceLabel: 'R4,500/mo',
    setupFee: 'R3,500',
    idealFor: 'Local service businesses that want to be found on Google and in AI answers.',
    features: [
      'Technical baseline + indexing fixes',
      'Google Business Profile optimization',
      'Keyword map for 10 priority terms',
      '2 optimized pages per month',
      'Monthly ranking + lead report',
      'Answer-ready FAQ sections with FAQ schema on key pages',
      'Baseline check of how AI assistants describe your business'
    ]
  },
  {
    id: 'growth-engine',
    name: 'SEO + AEO Growth Engine',
    price: 'R8,500',
    priceLabel: 'R8,500/mo',
    setupFee: 'R5,500',
    idealFor: 'SMEs that need steady lead growth from search and AI assistants.',
    highlighted: true,
    features: [
      'Everything in Foundation',
      'Technical sprint + schema optimization',
      '4 pages/posts optimized per month',
      'Internal linking + content refresh system',
      'Quarterly competitor gap analysis',
      'AEO structure on every page we optimise: direct answers, FAQs and schema',
      'Monthly AI visibility check across ChatGPT, Gemini, Perplexity and Google AI Overviews'
    ]
  },
  {
    id: 'competitive',
    name: 'Competitive SEO + AEO',
    price: 'R14,500',
    priceLabel: 'R14,500/mo',
    setupFee: 'R8,500',
    idealFor: 'High-competition niches or multi-location businesses.',
    features: [
      'Advanced technical + crawl budget management',
      'Content roadmap and editorial planning',
      'Authority/link outreach execution',
      'Programmatic landing page support',
      'Executive growth reporting + strategy calls',
      'AI visibility tracked against named competitors',
      'Brand and entity consistency work across the sources AI assistants read'
    ]
  }
];

export const aeoStarter = {
  id: 'aeo-starter',
  name: 'AEO Starter',
  price: 'R7,500',
  priceLabel: 'R7,500 once-off',
  idealFor: 'Businesses that want to be AI-ready before committing to a monthly retainer.',
  features: [
    'Answer-ready rewrite of up to 10 priority pages',
    'FAQ and Q&A schema on those pages',
    'AI visibility baseline: how ChatGPT, Gemini, Perplexity and Google AI Overviews describe you today',
    'One round of revisions'
  ]
};

export const adsPlans = [
  {
    id: 'ads-starter',
    name: 'Ads Starter',
    price: 'R6,500',
    priceLabel: 'R6,500/mo management',
    adSpend: 'R7,500 - R20,000/mo',
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
    id: 'performance-sprint',
    name: 'Performance Sprint',
    price: 'R9,800',
    priceLabel: 'R9,800/mo management',
    adSpend: 'R20,000 - R60,000/mo',
    idealFor: 'Businesses scaling lead volume with clear CAC targets.',
    highlighted: true,
    features: [
      'Multi-campaign funnel (cold, warm, remarketing)',
      'Landing page CRO feedback each month',
      'Creative testing framework',
      'Lead quality scoring loop',
      'Bi-weekly growth calls'
    ]
  },
  {
    id: 'full-funnel',
    name: 'Full Funnel Performance',
    price: 'R15,500',
    priceLabel: 'R15,500/mo management',
    adSpend: 'R60,000+/mo',
    idealFor: 'High-ticket offers or established sales teams.',
    features: [
      'Google + Meta + remarketing orchestration',
      'Advanced attribution and funnel reporting',
      'Offer and creative iteration sprints',
      'Email nurture journey alignment',
      'Weekly executive updates'
    ]
  }
];

/** Brand and retainer packages, shown on the /services "Brand & Retainer" tab. */
export const retainerPlans = [
  {
    id: 'brand-sprint',
    name: 'Brand Foundation Sprint',
    price: 'R9,500',
    priceLabel: 'R9,500 once-off',
    note: 'Timeline: 2-3 weeks',
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
    id: 'content-social',
    name: 'Content + Social Engine',
    price: 'R5,500',
    priceLabel: 'R5,500/mo',
    note: 'Includes 1-2 social platforms',
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
    id: 'fractional',
    name: 'Fractional Growth Team',
    price: 'R18,000',
    priceLabel: 'From R18,000/mo',
    note: 'Custom scope by revenue goals',
    idealFor: 'Companies wanting one team across web, SEO, ads and conversion.',
    highlighted: true,
    features: [
      'Monthly growth roadmap and priority sprints',
      'Cross-channel campaign orchestration',
      'Conversion and analytics ownership',
      'Design/dev implementation bandwidth',
      'Dedicated strategist and execution pod'
    ]
  }
];

export const careNote = (plan) => {
  const care = carePlans.find((c) => c.id === plan.carePlanId);
  return care ? `Optional care plan: ${care.name}, ${care.price}/mo` : undefined;
};
