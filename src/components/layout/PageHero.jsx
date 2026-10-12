import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";

/**
 * The opening of every page: a centred display heading on a quiet stage, a
 * lead, and up to two actions. A soft signal-blue light falls from above —
 * the only colour in the first viewport besides the logo.
 *
 * `announcement` renders the small low-contrast pill above the heading
 * ({ label, to }). `children` sits below the actions — usually a product frame
 * rising out of the hero.
 */
export const Announcement = ({ to, children }) => {
  const inner = (
    <>
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_10px_rgb(var(--v-signal))]" />
      <span>{children}</span>
      {to && (
        <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3 w-3 text-quiet transition-transform duration-base group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 4l4 4-4 4" />
        </svg>
      )}
    </>
  );
  const cls =
    "group inline-flex items-center gap-2 rounded-pill border border-edge bg-ink py-1.5 pl-3 pr-3.5 text-nav text-mist transition-colors duration-base hover:border-edge-strong hover:text-frost";
  return to ? (
    <Link to={to} className={cls}>
      {inner}
    </Link>
  ) : (
    <span className={cls}>{inner}</span>
  );
};

const PageHero = ({
  title,
  lead,
  announcement,
  actions,
  children,
  align = "center",
  className,
  as: Heading = "h1",
}) => {
  const centered = align === "center";
  return (
    <section className={cn("relative overflow-hidden pt-32 md:pt-40", children ? "pb-0" : "pb-16 md:pb-24", className)}>
      {/* Light from above. Purely decorative. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-glow" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/30 to-transparent" />

      <div className={cn("shell relative", centered && "text-center")}>
        <div className={cn("max-w-3xl", centered && "mx-auto")}>
          {announcement && (
            <div className="mb-6 animate-rise">
              <Announcement to={announcement.to}>{announcement.label}</Announcement>
            </div>
          )}
          <Heading className="animate-rise text-display text-cloud [animation-delay:60ms]">{title}</Heading>
          {lead && (
            <p className={cn("mt-5 max-w-2xl animate-rise text-lead text-frost [animation-delay:120ms]", centered && "mx-auto")}>
              {lead}
            </p>
          )}
          {actions && (
            <div className={cn("mt-8 flex animate-rise flex-col gap-3 [animation-delay:180ms] sm:flex-row sm:flex-wrap [&>*]:w-full sm:[&>*]:w-auto", centered && "sm:justify-center")}>
              {actions}
            </div>
          )}
        </div>
      </div>

      {children && <div className="relative mt-14 animate-rise [animation-delay:260ms] md:mt-20">{children}</div>}
    </section>
  );
};

export default PageHero;
