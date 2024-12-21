import { cn } from "../../utils/cn";

export const BentoGrid = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[320px] grid-cols-1 md:grid-cols-3 gap-4",
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
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent z-0 flex flex-col",
        className
      )}
    >
      {image && (
        <div className="relative h-48 mb-4">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      )}
      <div className="group-hover/bento:translate-x-2 transition duration-200 mt-auto">
        <div className="font-bold text-neutral-600 dark:text-neutral-200 mb-2">
          {title}
        </div>
        <div className="font-normal text-neutral-600 dark:text-neutral-300 text-sm">
          {description}
        </div>
      </div>
    </div>
  );
};