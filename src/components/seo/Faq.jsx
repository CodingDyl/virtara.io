import SectionHeading from '../layout/SectionHeading'
import JsonLd from './JsonLd'

/**
 * Question-and-answer section. The visible list and the FAQPage JSON-LD are
 * both built from the same `items`, so the markup cannot differ from the text.
 * Answers are always rendered open so they are in the prerendered HTML.
 */
const Faq = ({ id, title, items }) => (
  <section className="section" aria-labelledby={id}>
    <JsonLd
      nodes={[
        {
          '@type': 'FAQPage',
          mainEntity: items.map(({ q, a }) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: { '@type': 'Answer', text: a },
          })),
        },
      ]}
    />
    <div className="shell grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
      <SectionHeading id={id} title={title} />
      <div className="divide-y divide-edge border-y border-edge">
        {items.map(({ q, a }) => (
          <div key={q} className="py-6">
            <h3 className="text-feature text-cloud">{q}</h3>
            <p className="mt-2 max-w-prose text-body text-frost">{a}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default Faq
