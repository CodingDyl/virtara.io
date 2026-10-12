import { cn } from "../../utils/cn";

/**
 * Low-contrast pill. Badges label things; they never act as buttons.
 * `signal` adds the blue marker dot for a selected or live state.
 */
const variants = {
  default: "bg-ink text-mist border-edge",
  signal: "bg-ink text-frost border-edge",
  positive: "bg-positive/10 text-positive border-positive/25",
  caution: "bg-caution/10 text-caution border-caution/25",
  critical: "bg-critical/10 text-critical border-critical/25",
};

// Older call sites still pass these names.
const aliases = {
  primary: "signal",
  secondary: "default",
  gradient: "signal",
  outline: "default",
  success: "positive",
  warning: "caution",
  error: "critical",
};

const sizes = {
  sm: "h-6 px-2.5 text-caption gap-1.5",
  md: "h-7 px-3 text-caption gap-2",
  lg: "h-8 px-3.5 text-nav gap-2",
};

const Badge = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  // eslint-disable-next-line no-unused-vars
  animated,
  ...props
}) => {
  const key = aliases[variant] ?? variant;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border font-medium",
        variants[key] ?? variants.default,
        sizes[size] ?? sizes.md,
        className
      )}
      {...props}
    >
      {key === "signal" && (
        <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal shadow-[0_0_8px_rgb(var(--v-signal))]" />
      )}
      {children}
    </span>
  );
};

export default Badge;
