import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import PageShell from "./PageShell";
import { cn } from "../../utils/cn";

const docs = [
  { label: "Privacy policy", to: "/legal/privacy-policy" },
  { label: "Terms of service", to: "/legal/terms-of-service" },
  { label: "Cookie policy", to: "/legal/cookie-policy" },
];

/**
 * Read-mode layout for legal documents: a left index of the three policies,
 * and the document set in the brand prose style at a 68ch measure.
 */
const LegalPage = ({ metaTitle, metaDescription, canonical, path, title, lead, footer, children }) => (
  <PageShell>
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonical} />
    </Helmet>

    <div className="relative">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-glow" />
      <div className="shell relative grid gap-10 pb-24 pt-32 md:pb-32 md:pt-40 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16">
        <nav aria-label="Legal documents" className="lg:pt-3">
          <ul className="flex gap-1 overflow-x-auto lg:sticky lg:top-24 lg:flex-col lg:border-l lg:border-edge">
            {docs.map((d) => {
              const on = d.to === path;
              return (
                <li key={d.to} className="shrink-0">
                  <Link
                    to={d.to}
                    aria-current={on ? "page" : undefined}
                    className={cn(
                      "block rounded-control px-3 py-1.5 text-nav transition-colors duration-fast lg:-ml-px lg:rounded-none lg:border-l lg:pl-4",
                      on ? "bg-white/[0.04] text-cloud lg:border-signal lg:bg-transparent" : "text-mist hover:text-cloud lg:border-transparent"
                    )}
                  >
                    {d.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <article className="min-w-0 max-w-prose">
          <h1 className="text-display text-cloud">{title}</h1>
          {lead && <p className="mt-5 text-lead text-frost">{lead}</p>}
          <div className="prose prose-virtara mt-10 max-w-none border-t border-edge pt-2 prose-h2:mt-12 prose-h2:text-title prose-h3:text-feature prose-li:my-1">
            {children}
          </div>
          {footer && <div className="mt-12 border-t border-edge pt-6 text-nav font-normal text-mist">{footer}</div>}
        </article>
      </div>
    </div>
  </PageShell>
);

export default LegalPage;
