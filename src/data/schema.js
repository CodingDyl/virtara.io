export const SITE = 'https://virtara.co.za'
const ORG = { '@id': `${SITE}/#organization` }

// "R4,900" or "From R25,000" -> 4900 / 25000
const amount = (label) => Number(label.replace(/[^\d]/g, ''))

/** An Offer built from a visible price label. monthly marks a per-month fee. */
export const offer = (name, priceLabel, { monthly = false } = {}) => ({
  '@type': 'Offer',
  name,
  priceCurrency: 'ZAR',
  ...(monthly
    ? { priceSpecification: { '@type': 'UnitPriceSpecification', price: amount(priceLabel), priceCurrency: 'ZAR', unitCode: 'MON' } }
    : { price: amount(priceLabel) }),
})

export const serviceNode = ({ name, description, url, offers }) => ({
  '@type': 'Service',
  name,
  description,
  url,
  provider: ORG,
  areaServed: { '@type': 'Country', name: 'ZA' },
  offers,
})

export const breadcrumbNode = (trail) => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map(([name, url], i) => ({ '@type': 'ListItem', position: i + 1, name, item: url })),
})
