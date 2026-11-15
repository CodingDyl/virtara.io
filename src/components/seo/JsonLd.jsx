import { Helmet } from 'react-helmet-async'

/** Page-level JSON-LD through Helmet; "<" is escaped so it can never close the script tag. */
const JsonLd = ({ nodes }) => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }).replace(/</g, '\\u003c')}
    </script>
  </Helmet>
)

export default JsonLd
