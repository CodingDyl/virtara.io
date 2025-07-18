import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { cn } from "../../utils/cn";

const Button = ({ 
  children, 
  variant = "primary", 
  size = "md", 
  className, 
  icon, 
  showArrow = false,
  animated = true,
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent";
  
  const variants = {
    primary: "bg-gradient-to-r from-white to-white/90 text-black hover:shadow-xl hover:shadow-white/20 focus:ring-white/50",
    secondary: "bg-transparent text-white border-2 border-white/20 hover:bg-white/10 hover:border-white/30 focus:ring-white/50",
    gradient: "bg-gradient-to-r from-[#00f2fe] to-[#ff00e5] text-white hover:shadow-xl hover:shadow-[#00f2fe]/20 focus:ring-[#00f2fe]/50",
    outline: "bg-transparent text-white border-2 border-white/10 hover:bg-white/5 hover:border-white/20 focus:ring-white/50",
    ghost: "bg-white/10 text-white hover:bg-white/20 focus:ring-white/50"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const ButtonComponent = animated ? motion.button : "button";

  return (
    <ButtonComponent
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      whileHover={animated ? { 
        scale: 1.02,
        boxShadow: variant === "primary" 
          ? "0 0 30px rgba(255, 255, 255, 0.3)"
          : variant === "gradient"
          ? "0 0 30px rgba(0, 242, 254, 0.3)"
          : "0 0 20px rgba(255, 255, 255, 0.1)"
      } : undefined}
      whileTap={animated ? { scale: 0.98 } : undefined}
      {...props}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span>{children}</span>
      {showArrow && (
        <motion.div
          animate={animated ? { x: [0, 5, 0] } : undefined}
          transition={animated ? { duration: 1.5, repeat: Infinity } : undefined}
        >
          <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
        </motion.div>
      )}
    </ButtonComponent>
  );
};

export default Button; 