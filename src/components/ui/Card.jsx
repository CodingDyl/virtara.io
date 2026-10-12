import { cn } from "../../utils/cn";

/**
 * Dark surface card. One elevation per card: a hairline border on Ink, or the
 * floating shadow on Charcoal — never both a heavy border and a wide shadow.
 * `interactive` adds the hover hairline for cards that are links.
 */
const variants = {
  default: "bg-ink border border-edge",
  raised: "bg-charcoal border border-edge",
  float: "bg-charcoal shadow-float",
  // Section-sized editorial card (Featurebase "dark feature section").
  feature: "bg-[rgba(11,12,17,0.8)] border border-edge shadow-inset",
};

// Older call sites still pass these names.
const aliases = { elevated: "raised", gradient: "default", glass: "raised", dark: "default" };

const Card = ({
  children,
  variant = "default",
  className,
  interactive = false,
  as: Tag = "div",
  // eslint-disable-next-line no-unused-vars
  animated,
  // eslint-disable-next-line no-unused-vars
  hover,
  ...props
}) => (
  <Tag
    className={cn(
      "relative overflow-hidden rounded-card",
      variants[aliases[variant] ?? variant] ?? variants.default,
      interactive &&
        "transition-[border-color,background-color] duration-base ease-out hover:border-edge-strong hover:bg-charcoal",
      className
    )}
    {...props}
  >
    {children}
  </Tag>
);

const CardHeader = ({ children, className, ...props }) => (
  <div className={cn("p-6 pb-0", className)} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className, ...props }) => (
  <div className={cn("p-6", className)} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className, ...props }) => (
  <div className={cn("p-6 pt-0", className)} {...props}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
