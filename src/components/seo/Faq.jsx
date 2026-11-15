import SectionHeading from '../layout/SectionHeading'
import Button from '../ui/Button'
import JsonLd from './JsonLd'

// Index tabs sit at three stations along a card's top edge, as a filing clerk
// staggers them. The last station hangs from the right so a long label fits.
const STATIONS = [{ '--tab-l': '4%' }, { '--tab-l': '37%' }, { '--tab-r': '4%' }]

const cardNumber = (i) => String(i + 1).padStart(2, '0')

/**
 * Question-and-answer section, drawn as a card-index drawer: each question is
 * typed along the top edge of a card with its topic on a tab; opening a card
 * lifts it out of the tray to show the answer.
 *
 * The cards are native <details> sharing a `name`, so one opens at a time with
 * no script, and every answer is in the prerendered HTML whether its card is
 * open or not. The FAQPage JSON-LD is built from the same `items`, so the
 * markup cannot differ from the visible text. Styles: `.faq-*` in index.css.
 */
const Faq = ({ id, title, lead = 'Straight answers, filed in one drawer. Pull a card to read it.', items }) => (
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
      <SectionHeading id={id} title={title} lead={lead} className="lg:sticky lg:top-28 lg:self-start" />
      <div>
        <div className="faq-drawer">
          <div className="faq-tray">
            {items.map(({ q, a, tab }, i) => (
              <details
                key={q}
                name={id}
                open={i === 0}
                className="faq-card"
                style={{
                  // 1 at the back of the drawer, 0 at the front.
                  '--depth': items.length > 1 ? (items.length - 1 - i) / (items.length - 1) : 0,
                  ...STATIONS[i % STATIONS.length],
                }}
              >
                <summary className="faq-edge">
                  <span className="faq-tab" aria-hidden="true">
                    {tab}
                  </span>
                  <span className="figure hidden text-caption text-quiet sm:inline" aria-hidden="true">
                    {cardNumber(i)}
                  </span>
                  <h3 className="text-body font-medium text-cloud [text-wrap:pretty] md:text-[17px]">{q}</h3>
                  <span className="faq-mark" aria-hidden="true" />
                </summary>
                <div className="faq-face">
                  <p className="max-w-prose text-body text-frost">{a}</p>
                  <p className="figure mt-5 text-right text-caption text-quiet" aria-hidden="true">
                    Filed under {tab} · {cardNumber(i)}
                  </p>
                </div>
              </details>
            ))}
          </div>
          <div className="faq-front" aria-hidden="true">
            <span className="figure rounded-[6px] border border-edge-strong bg-ink px-3 py-1 text-[11px] uppercase leading-4 tracking-[0.08em] text-mist">
              Virtara · FAQ
            </span>
            <span className="faq-pull" />
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-4 px-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-nav font-normal text-mist">Question not in the drawer? Ask us and a person will answer.</p>
          <Button to="/contact-us" variant="secondary" showArrow className="shrink-0">
            Ask us
          </Button>
        </div>
      </div>
    </div>
  </section>
)

export default Faq
