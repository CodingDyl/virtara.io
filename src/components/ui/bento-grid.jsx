import { cn } from "../../utils/cn";
import { motion } from "framer-motion";

export const BentoGrid = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[320px] grid-cols-1 md:grid-cols-3 gap-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  image,
}) => {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "row-span-1 rounded-2xl group/bento hover:shadow-2xl transition-all duration-500 shadow-input dark:shadow-none p-6 dark:bg-black/40 dark:border-white/[0.2] bg-white/5 border border-white/10 backdrop-blur-sm z-0 flex flex-col relative overflow-hidden",
        className
      )}
    >
      {/* Gradient overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#00f2fe]/10 via-transparent to-[#ff00e5]/10 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500"
        initial={false}
      />
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 group-hover/bento:opacity-10 transition-opacity duration-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      </div>

      {image && (
        <motion.div 
          className="relative h-48 mb-6 overflow-hidden rounded-xl"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500"
            initial={false}
          />
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover/bento:scale-110"
          />
        </motion.div>
      )}
      
      <div className="relative z-10 flex flex-col h-full">
        <motion.div 
          className="group-hover/bento:translate-x-2 transition-all duration-500 mt-auto"
          initial={false}
        >
          <motion.div 
            className="font-bold text-neutral-200 mb-3 text-xl group-hover/bento:text-white transition-colors duration-300"
            whileHover={{ x: 5 }}
          >
            {title}
          </motion.div>
          <motion.div 
            className="font-normal text-neutral-400 dark:text-neutral-300 text-sm leading-relaxed group-hover/bento:text-neutral-200 transition-colors duration-300"
            initial={false}
          >
            {description}
          </motion.div>
          
          {/* Hover indicator */}
          <motion.div
            className="mt-4 flex items-center gap-2 text-[#00f2fe] opacity-0 group-hover/bento:opacity-100 transition-all duration-500"
            initial={false}
          >
            <span className="text-sm font-medium">Learn more</span>
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="transition-transform duration-300 group-hover/bento:translate-x-1"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};