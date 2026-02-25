import { motion } from "framer-motion";

const LoadingSpinner = ({ 
  size = "md", 
  variant = "default",
  className = "" 
}) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const variants = {
    default: "border-white/20 border-t-white",
    brand: "border-white/20 border-t-[#8df6ff]",
    gradient: "border-white/20 border-t-transparent"
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`${sizes[size]} ${variants[variant]} border-2 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      {variant === "gradient" && (
        <motion.div
          className={`${sizes[size]} absolute border-2 border-transparent border-t-[#4ea4ff] rounded-full`}
          animate={{ rotate: -360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}
    </div>
  );
};

export default LoadingSpinner; 