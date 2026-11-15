import { Helmet } from 'react-helmet-async'
import { buildPlans } from '../../data/pricing'

const SITE = 'https://virtara.co.za'
const launch = buildPlans.find((p) => p.id === 'launch')
const commerce = buildPlans.find((p) => p.id === 'commerce')

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': `${SITE}/#organization`,
      name: 'Virtara',
      url: `${SITE}/`,
      logo: `${SITE}/web_logo_bg.svg`,
      email: 'info@virtara.co.za',
      telephone: '+27723271040',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '16 Hume Road',
        addressLocality: 'Johannesburg',
        postalCode: '2092',
        addressCountry: 'ZA',
      },
      areaServed: 'South Africa',
      sameAs: [
        'https://x.com/Virtara_SA',
        'https://www.linkedin.com/company/virtara',
        'https://www.instagram.com/virtara.io/',
      ],
      priceRange: `${launch.planPrice} – ${commerce.price}`,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      url: `${SITE}/`,
      name: 'Virtara',
      publisher: { '@id': `${SITE}/#organization` },
    },
  ],
}

// "<" is escaped so the JSON can never close the script tag.
const json = JSON.stringify(graph).replace(/</g, '\\u003c')

const SiteSchema = () => (
  <Helmet>
    <script type="application/ld+json">{json}</script>
  </Helmet>
)

export default SiteSchema
