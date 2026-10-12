import { Helmet } from "react-helmet-async";
import { IconCheck, IconCalendarEvent, IconFileText, IconChartLine, IconArrowUpRight } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import PageShell from "./PageShell";
import Button from "../ui/Button";

const stepIcons = [IconCalendarEvent, IconFileText, IconChartLine];

/**
 * Confirmation page after any form. A quiet check, what happens next as a
 * three-step sequence, and somewhere useful to go while they wait.
 */
const ThankYouPage = ({
  metaTitle,
  metaDescription,
  canonical,
  title = "Thank you for choosing us.",
  lead,
  steps,
  waitCopy,
  resources = [],
  children,
}) => (
  <PageShell>
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="robots" content="noindex, follow" />
      <link rel="canonical" href={canonical} />
    </Helmet>

    <section className="relative overflow-hidden pb-24 pt-32 md:pb-32 md:pt-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-glow" />
      <div className="shell relative max-w-3xl text-center">
        <span className="mx-auto flex h-14 w-14 animate-rise items-center justify-center rounded-pill border border-positive/30 bg-positive/10 text-positive">
          <IconCheck size={26} stroke={2.2} aria-hidden="true" />
        </span>
        <h1 className="mt-6 animate-rise text-display text-cloud [animation-delay:100ms]">{title}</h1>
        {lead && <p className="mx-auto mt-5 max-w-xl animate-rise text-lead text-frost [animation-delay:160ms]">{lead}</p>}
      </div>

      {steps?.length > 0 && (
        <div className="shell relative mt-14 max-w-4xl">
          <h2 className="sr-only">What happens next</h2>
          <ol className="grid overflow-hidden rounded-card border border-edge bg-ink md:grid-cols-3 md:divide-x md:divide-edge">
            {steps.map((step, i) => {
              const Icon = stepIcons[i % stepIcons.length];
              return (
                <li key={step.title} className="border-b border-edge p-6 last:border-b-0 md:border-b-0">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-edge bg-steel text-frost">
                      <Icon size={17} stroke={1.6} aria-hidden="true" />
                    </span>
                    <span className="figure text-[13px] text-quiet">Step {i + 1}</span>
                  </div>
                  <h3 className="mt-4 text-feature text-cloud">{step.title}</h3>
                  <p className="mt-1.5 text-nav font-normal leading-relaxed text-mist">{step.description}</p>
                </li>
              );
            })}
          </ol>
        </div>
      )}

      {children && <div className="shell relative mt-14 max-w-4xl">{children}</div>}

      {resources.length > 0 && (
        <div className="shell relative mt-4 max-w-4xl">
          <div className="flex flex-col gap-5 rounded-card border border-edge bg-ink p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-feature text-cloud">While you wait</h2>
              {waitCopy && <p className="mt-1 text-nav font-normal text-mist">{waitCopy}</p>}
            </div>
            <div className="flex flex-wrap gap-2">
              {resources.map((r) => (
                <Button key={r.to} to={r.to} variant="secondary" size="sm" icon={<IconArrowUpRight stroke={1.8} />}>
                  {r.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="relative mt-10 text-center">
        <Link to="/" className="text-nav text-mist transition-colors duration-fast hover:text-cloud">
          Return to the homepage
        </Link>
      </div>
    </section>
  </PageShell>
);

export default ThankYouPage;
