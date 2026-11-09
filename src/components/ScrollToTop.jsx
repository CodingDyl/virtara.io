import { useEffect, useState } from "react";
import { IconArrowUp } from "@tabler/icons-react";
import { cn } from "../utils/cn";

/**
 * Back-to-top button. Appears once the visitor is well into a page.
 * Sits just above the Concierge chat button (60px, 20px from the corner),
 * which is now the lower-right launcher in Signal Blue, so this one is steel.
 */
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed bottom-[92px] right-[26px] z-40 flex h-12 w-12 items-center justify-center rounded-pill border border-edge bg-steel text-frost",
        "shadow-float transition-[opacity,transform,background-color,color] duration-base ease-out hover:bg-edge hover:text-cloud",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      )}
    >
      <IconArrowUp size={20} stroke={2} aria-hidden="true" />
    </button>
  );
};

export default ScrollToTop;
