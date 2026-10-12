const sizes = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-10 h-10",
  xl: "w-14 h-14"
};

const variants = {
  default: "border-edge-strong border-t-cloud",
  brand: "border-edge-strong border-t-signal",
  gradient: "border-edge-strong border-t-signal"
};

/**
 * Deliberately CSS-only. This renders as the Suspense fallback for every
 * route, so pulling framer-motion in here would put the whole animation
 * library on the critical path. `animate-spin` slows to a crawl for
 * prefers-reduced-motion via index.css.
 */
const LoadingSpinner = ({ size = "md", variant = "default", className = "" }) => (
  <div className={`flex items-center justify-center ${className}`} role="status">
    <div
      className={`${sizes[size]} ${variants[variant]} border-2 rounded-full animate-spin`}
    />
  </div>
);

export default LoadingSpinner;
