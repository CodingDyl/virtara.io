import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

const Card = ({ 
  children, 
  variant = "default", 
  className, 
  animated = true,
  hover = true,
  ...props 
}) => {
  const baseClasses = "relative overflow-hidden transition-all duration-500";
  
  const variants = {
    default: "bg-black/40 border border-white/10 backdrop-blur-sm",
    elevated: "bg-black/60 border border-white/20 backdrop-blur-md shadow-2xl",
    gradient: "bg-gradient-to-br from-white/5 to-white/10 border border-white/10 backdrop-blur-sm",
    glass: "bg-white/5 border border-white/20 backdrop-blur-xl",
    dark: "bg-[#1C1C1C]/80 border border-white/5 backdrop-blur-sm"
  };

  const hoverEffects = hover ? {
    scale: 1.02,
    transition: { duration: 0.3, ease: "easeOut" }
  } : {};

  const CardComponent = animated ? motion.div : "div";

  return (
    <CardComponent
      className={cn(
        baseClasses,
        variants[variant],
        className
      )}
      whileHover={animated && hover ? hoverEffects : undefined}
      whileTap={animated ? { scale: 0.98 } : undefined}
      {...props}
    >
      {/* Gradient overlay on hover */}
      {hover && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#00f2fe]/10 via-transparent to-[#ff00e5]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={false}
        />
      )}
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </CardComponent>
  );
};

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