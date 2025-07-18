import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

const Badge = ({ 
  children, 
  variant = "default", 
  size = "md",
  animated = true,
  className = "",
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300";
  
  const variants = {
    default: "bg-white/10 text-white border border-white/20",
    primary: "bg-gradient-to-r from-[#00f2fe]/20 to-[#00f2fe]/10 text-[#00f2fe] border border-[#00f2fe]/30",
    secondary: "bg-gradient-to-r from-[#ff00e5]/20 to-[#ff00e5]/10 text-[#ff00e5] border border-[#ff00e5]/30",
    gradient: "bg-gradient-to-r from-[#00f2fe] to-[#ff00e5] text-white",
    success: "bg-green-500/20 text-green-400 border border-green-500/30",
    warning: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
    error: "bg-red-500/20 text-red-400 border border-red-500/30",
    outline: "bg-transparent text-white border border-white/30 hover:bg-white/10",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const BadgeComponent = animated ? motion.span : "span";

  return (
    <BadgeComponent
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      whileHover={animated ? { scale: 1.05 } : undefined}
      whileTap={animated ? { scale: 0.95 } : undefined}
      {...props}
    >
      {children}
    </BadgeComponent>
  );
};

export default Badge; 