import { IconCheck } from "@tabler/icons-react";
import Button from "./Button";
import { cn } from "../../utils/cn";

/**
 * A pricing column. The recommended plan sits on Charcoal with the signal
 * glow and a filled action; the others are Ink with a hairline action.
 */
const PlanCard = ({
  name,
  price,
  suffix,
  note,
  description,
  features = [],
  highlighted = false,
  badge = "Most selected",
  cta = "Book a strategy audit",
  to = "/start-your-project",
  onClick,
  className,
}) => (
  <article
    className={cn(
      "relative flex flex-col rounded-card border p-6 md:p-7",
      highlighted ? "border-signal/40 bg-charcoal shadow-frame" : "border-edge bg-ink",
      className
    )}
  >
    <div className="flex items-center justify-between gap-3">
      <h3 className="text-feature text-cloud">{name}</h3>
      {highlighted && badge && (
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-pill border border-signal/30 bg-signal/10 px-2.5 py-0.5 text-caption text-frost">
          <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
          {badge}
        </span>
      )}
    </div>
    <p className="mt-5 flex items-baseline gap-1">
      <span className="figure text-[28px] leading-tight text-cloud">{price}</span>
      {suffix && <span className="text-nav font-normal text-quiet">{suffix}</span>}
    </p>
    {note && <p className="mt-1.5 text-nav font-normal text-quiet">{note}</p>}
    {description && <p className="mt-5 text-nav font-normal leading-relaxed text-mist">{description}</p>}
    <ul className="mt-6 flex-1 space-y-3 border-t border-edge pt-6">
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-2.5 text-nav font-normal text-frost">
          <IconCheck size={16} stroke={2} aria-hidden="true" className="mt-0.5 shrink-0 text-signal" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    {cta && (
      <Button
        to={onClick ? undefined : to}
        onClick={onClick}
        variant={highlighted ? "primary" : "secondary"}
        className={cn("mt-8 w-full", highlighted && "font-semibold")}
        showArrow
      >
        {cta}
      </Button>
    )}
  </article>
);

export default PlanCard;
