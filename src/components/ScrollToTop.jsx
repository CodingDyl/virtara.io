import { useEffect, useState } from "react";
import { IconArrowUp } from "@tabler/icons-react";
import { cn } from "../utils/cn";

/**
 * The floating launcher (Featurebase's lower-right circle), in Signal Blue.
 * Appears once the visitor is well into a page.
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
        "fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-pill bg-signal text-cloud",
        "shadow-[0_0_0_1px_rgba(0,0,0,0.5),0_10px_30px_-6px_rgba(78,164,255,0.55)] transition-[opacity,transform,background-color] duration-base ease-out hover:bg-[#62b0ff] md:bottom-6 md:right-6",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      )}
    >
      <IconArrowUp size={20} stroke={2} aria-hidden="true" />
    </button>
  );
};

export default ScrollToTop;
