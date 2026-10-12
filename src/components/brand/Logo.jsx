import { smallLogo } from "../../assets";
import { cn } from "../../utils/cn";

/**
 * The Virtara lockup: infinity mark + wordmark. The wordmark is set in Inter
 * 600 with tight tracking; the mark carries all the colour.
 */
const sizes = {
  sm: { mark: "h-5 w-5", word: "text-[15px]" },
  md: { mark: "h-6 w-6", word: "text-[17px]" },
  lg: { mark: "h-10 w-10", word: "text-[28px]" },
};

export const LogoMark = ({ className }) => (
  <img
    src={smallLogo}
    alt=""
    aria-hidden="true"
    width="500"
    height="500"
    decoding="async"
    className={cn("shrink-0 object-contain", className)}
  />
);

const Logo = ({ size = "md", className, wordmark = true }) => (
  <span className={cn("inline-flex items-center gap-2", className)}>
    <LogoMark className={sizes[size].mark} />
    {wordmark && (
      <span className={cn("font-semibold tracking-[-0.02em] text-cloud", sizes[size].word)}>Virtara</span>
    )}
  </span>
);

export default Logo;
