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
  const baseClasses = "relative overflow-hidden rounded-[30px] transition-all duration-500";
  
  const variants = {
    default: "bg-[linear-gradient(155deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] border border-white/10 backdrop-blur-sm",
    elevated: "bg-[linear-gradient(155deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03))] border border-white/20 backdrop-blur-md shadow-[0_18px_55px_rgba(2,22,55,0.5)]",
    gradient: "bg-[linear-gradient(145deg,rgba(255,255,255,0.1),rgba(255,255,255,0.02))] border border-white/10 backdrop-blur-sm",
    glass: "bg-[linear-gradient(155deg,rgba(255,255,255,0.09),rgba(255,255,255,0.02))] border border-white/20 backdrop-blur-xl",
    dark: "bg-[#0c1628]/80 border border-white/5 backdrop-blur-sm"
  };

  const hoverEffects = hover ? {
    y: -6,
    scale: 1.01,
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
          className="absolute inset-0 bg-gradient-to-br from-[#8df6ff]/10 via-transparent to-[#4ea4ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={false}
        />
      )}
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      </div>
      <div className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full bg-[#4ea4ff]/10 blur-3xl" />

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
