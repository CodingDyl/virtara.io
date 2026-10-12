import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";

/**
 * Virtara's buttons. Filled public actions are always near-white — the signal
 * blue never fills a button. Renders a router <Link> when given `to`, an <a>
 * when given `href`, otherwise a <button>.
 */
const variants = {
  // Conversion: near-white fill, charcoal label.
  primary:
    "bg-white/[0.92] text-charcoal border border-white/[0.92] hover:bg-white hover:border-white shadow-raised",
  // Secondary: transparent with a hairline.
  secondary:
    "bg-transparent text-cloud border border-edge-strong hover:bg-white/[0.04] hover:border-quiet/60",
  // Quiet: a dark filled control for use on charcoal surfaces.
  quiet: "bg-steel text-frost border border-edge hover:text-cloud hover:border-edge-strong",
  // Text-only.
  ghost: "bg-transparent text-mist border border-transparent hover:text-cloud hover:bg-white/[0.04]",
};

// Older call sites still pass these names.
const aliases = { gradient: "primary", outline: "secondary" };

const sizes = {
  sm: "h-9 px-4 text-nav gap-1.5",
  md: "h-11 px-5 text-nav gap-2",
  lg: "h-12 px-6 text-body font-medium gap-2",
};

const Arrow = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    className="h-3.5 w-3.5 shrink-0 transition-transform duration-base ease-out group-hover:translate-x-0.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

const Button = forwardRef(function Button(
  {
    children,
    variant = "primary",
    size = "md",
    className,
    icon,
    showArrow = false,
    loading = false,
    to,
    href,
    // eslint-disable-next-line no-unused-vars
    animated,
    ...props
  },
  ref
) {
  const resolved = variants[aliases[variant] ?? variant] ?? variants.primary;
  const classes = cn(
    "group inline-flex select-none items-center justify-center whitespace-nowrap rounded-control font-medium",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-base ease-out",
    "active:translate-y-px disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
    resolved,
    sizes[size] ?? sizes.md,
    className
  );

  const content = (
    <>
      {loading ? (
        <span
          aria-hidden="true"
          className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : (
        icon && <span className="shrink-0 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>
      )}
      <span>{children}</span>
      {showArrow && !loading && <Arrow />}
    </>
  );

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={props.type ?? "button"}
      className={classes}
      aria-busy={loading || undefined}
      disabled={props.disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
});

export default Button;
