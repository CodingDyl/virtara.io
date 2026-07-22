const sizes = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16"
};

const variants = {
  default: "border-white/20 border-t-white",
  brand: "border-white/20 border-t-[#8df6ff]",
  gradient: "border-white/20 border-t-[#4ea4ff]"
};

/**
 * Deliberately CSS-only. This renders as the Suspense fallback for every
 * route, so pulling framer-motion in here would put the whole animation
 * library on the critical path. `animate-spin` also stops for
 * prefers-reduced-motion via the utility defined in index.css.
 */
const LoadingSpinner = ({ size = "md", variant = "default", className = "" }) => (
  <div className={`flex items-center justify-center ${className}`} role="status">
    <div
      className={`${sizes[size]} ${variants[variant]} border-2 rounded-full animate-spin`}
    />
  </div>
);

export default LoadingSpinner;
