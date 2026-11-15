/**
 * Question-and-answer copy for the FAQ sections. Every price is read from
 * pricing.js; do not type a rand amount here.
 */
import { buildPlans, carePlans, seoPlans, aeoStarter, adsPlans, growthBundle } from './pricing';

const launch = buildPlans.find((p) => p.id === 'launch');
const growth = buildPlans.find((p) => p.id === 'growth');
const commerce = buildPlans.find((p) => p.id === 'commerce');
const care = carePlans;
const seo = seoPlans;
const ads = adsPlans;

// "From R25,000" -> "R25,000", for use inside a sentence.
const commerceFrom = commerce.planPrice.replace(/^From /, '');

const howLong = {
  q: 'How long does it take to build a website?',
  a: 'Our Launch and Growth sites go live in 3 to 6 working days once we have your content. Online stores and custom platforms take longer, and we quote the timeline before you pay anything.',
};

const payMonthly = {
  q: 'Do you have to pay monthly for a website?',
  a: `No. You can pay once and own the site. A monthly care plan, from ${care[0].priceLabel}, is optional: it covers hosting, updates, backups, security and support, and choosing one lowers the build price.`,
};

const howToPay = {
  q: 'How do I pay for a website?',
  a: '50% deposit to start and 50% on completion.',
};

export const homeFaqs = [
  {
    q: 'How much does a website cost in South Africa?',
    a: `A small business website from Virtara costs ${launch.planPrice} with a 12-month care plan, or ${launch.price} once-off. A larger site of 8 to 15 pages costs ${growth.planPrice} with a care plan, or ${growth.price} once-off. Online stores and custom platforms start at ${commerceFrom} with a care plan. Every price is on our services page.`,
  },
  howLong,
  payMonthly,
  {
    q: 'Do I need a website for my small business?',
    a: 'If people look for your kind of business on Google or ask an AI assistant, yes. A website is the one place online where you control what is said about your prices, services and contact details, and it is what Google and AI assistants read when they describe you.',
  },
  {
    q: 'What does Virtara do?',
    a: 'Virtara is a web design and development agency in Johannesburg. We build websites and online stores, then help them get found and bring in enquiries with SEO and AEO, Google Ads, monthly maintenance and an AI website assistant called Concierge.',
  },
  {
    q: 'Where is Virtara based?',
    a: 'At 16 Hume Road, Johannesburg. We work with businesses across South Africa, in person in Johannesburg and remotely everywhere else.',
  },
];

export const servicesFaqs = [
  {
    q: 'How much do web designers charge in South Africa?',
    a: `Virtara charges a fixed price per project, not an hourly rate: ${launch.planPrice} to ${launch.price} for a small business site, ${growth.planPrice} to ${growth.price} for a larger one, and from ${commerceFrom} for an online store. The lower figure applies when you take a 12-month care plan.`,
  },
  howToPay,
  {
    q: 'Can I get a pay-monthly website?',
    a: `Yes. Take a build at the care-plan price and pay from ${care[0].priceLabel} for hosting and care. The ${growthBundle.name} at ${growthBundle.priceLabel} adds SEO + AEO and the Concierge website assistant on one invoice, on a 12-month term.`,
  },
  {
    q: 'How much does SEO cost in South Africa?',
    a: `Our SEO + AEO retainers run from ${seo[0].priceLabel} with no setup fee to ${seo[3].priceLabel} for competitive markets.`,
  },
  {
    q: 'How much does Google Ads cost in South Africa?',
    a: `Management starts at ${ads[0].price} a month. Your ad budget is separate and is paid to Google or Meta; we suggest at least ${ads[0].adSpend.split(' - ')[0]} a month to get useful data.`,
  },
  {
    q: 'How much does an online store cost?',
    a: `From ${commerceFrom} with a care plan or from ${commerce.price} once-off, on Shopify, WooCommerce or a custom build, including payments and shipping setup.`,
  },
];

export const seoFaqs = [
  {
    q: 'What is AEO?',
    a: "Answer engine optimisation (AEO) is the work of getting your business named and linked when someone asks ChatGPT, Gemini, Perplexity or Google's AI Overviews a question. It builds on SEO: the page must be crawlable, answer the question plainly and be backed by trusted mentions elsewhere.",
  },
  {
    q: 'What is the difference between SEO and AEO?',
    a: 'SEO gets a page ranked in search results. AEO gets the business cited inside a generated answer. The foundations are the same, and Google says its AI features draw on the same search index, so we do both together.',
  },
  {
    q: 'Does SEO still work?',
    a: "Yes. Google's AI Overviews and AI Mode are built on Google Search, so a page that is indexed, helpful and trusted is still what gets shown and cited.",
  },
  {
    q: 'Can I do SEO myself?',
    a: 'You can do the basics yourself: a complete Google Business Profile, clear page titles, and pages that answer what customers ask. An agency helps when you need technical fixes, steady content and reporting.',
  },
  {
    q: 'How do I get my business to show up in ChatGPT?',
    a: 'Let its search crawler read your site, put clear answers in plain text on your pages, and earn genuine mentions on sites it already trusts, such as reviews and directories. Nobody can guarantee a mention.',
  },
  {
    q: 'How much does SEO cost?',
    a: `From ${seo[0].priceLabel} with no setup fee. A once-off ${aeoStarter.name} is ${aeoStarter.price}.`,
  },
];

/** Concierge prices live in the page's own plan array, so the page passes it in. */
export const conciergeFaqs = (plans) => [
  {
    q: 'How much does an AI chatbot cost for a website?',
    a: `Concierge costs ${plans[0].price} or ${plans[1].price} a month, with a 14-day free trial and no card needed.`,
  },
  {
    q: 'How does an AI chatbot learn about my business?',
    a: 'Concierge reads your website and drafts what it knows: services, prices, areas and hours. You check it before it goes live.',
  },
  {
    q: 'Can AI chatbots make mistakes?',
    a: 'Yes, any AI can. Concierge answers from the information you approved, and tells visitors to check anything important with you.',
  },
  {
    q: 'How do I add it to my website?',
    a: 'You paste one line of code into your site. It works on any website, not only ones we built.',
  },
  {
    q: 'What happens when the free trial ends?',
    a: 'The assistant switches off unless you subscribe. Nothing is charged automatically.',
  },
];

export const maintenanceFaqs = [
  {
    q: 'How much does website maintenance cost in South Africa?',
    a: `Virtara's care plans are ${care[0].priceLabel}, ${care[1].priceLabel} and ${care[2].priceLabel}.`,
  },
  { q: 'Is hosting included?', a: 'Yes, on every care plan.' },
  {
    q: 'What does website maintenance include?',
    a: 'Updates, backups, security scans, uptime monitoring and support. Higher plans add content updates, performance work and development hours.',
  },
];

export const packageFaqs = [howLong, payMonthly, howToPay];
