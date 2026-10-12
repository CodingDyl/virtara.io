import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { colorMap, typeScale, radii, shadows } from "../design/tokens";

// tailwind-merge only knows Tailwind's default scale. Without this it reads
// `text-nav` as a colour and drops `text-charcoal` from the same element.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: Object.keys(colorMap),
      text: typeScale.map((t) => t.token),
      radius: radii.map((r) => r.token),
      shadow: shadows.map((s) => s.token),
    },
  },
});

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
