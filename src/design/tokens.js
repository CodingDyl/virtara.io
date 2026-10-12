/**
 * Virtara design tokens — the single source of truth for the brand.
 *
 * Everything visual flows from this file:
 *   - tailwind.config.js reads it to build the theme (bg-canvas, text-mist,
 *     rounded-card, text-display, shadow-float …)
 *   - the same plugin writes each value to a CSS custom property on :root
 *     (--v-canvas, --v-signal …) for the rare spot Tailwind can't reach
 *   - the /brand page renders the brand book straight from these objects,
 *     so the published guidelines can never drift from the shipped site.
 *
 * Change a value here and the site, the CSS variables and the brand book all
 * move together. DESIGN.md documents the rules for using them.
 */

/** Surfaces, darkest to lightest. Every page is built as layers of these. */
export const surfaces = [
  { token: 'canvas', value: '#050608', name: 'Void Canvas', use: 'Page background and full-bleed section bands.' },
  { token: 'ink', value: '#0a0c10', name: 'Ink', use: 'Inset regions, low cards, dark filled controls.' },
  { token: 'charcoal', value: '#0f1219', name: 'Charcoal', use: 'Product frames, prominent cards, menus.' },
  { token: 'steel', value: '#151a24', name: 'Steel', use: 'Raised controls and nested panels.' },
  { token: 'edge', value: '#1e2330', name: 'Edge', use: 'The 1px hairline that separates every dark surface.' },
  { token: 'edge-strong', value: '#2a3142', name: 'Edge Strong', use: 'Hover and focus state of a hairline.' },
];

/** Text, highest to lowest emphasis. */
export const text = [
  { token: 'cloud', value: '#ffffff', name: 'Cloud', use: 'Headings, icons, high-emphasis text.' },
  { token: 'frost', value: '#dee3ec', name: 'Frost', use: 'Lead paragraphs and navigation.' },
  { token: 'mist', value: '#aeb6c9', name: 'Mist', use: 'Body copy, inactive tabs, secondary links.' },
  { token: 'quiet', value: '#8a92a6', name: 'Quiet', use: 'Metadata and tertiary labels. Never body copy.' },
];

/**
 * Signal — Virtara electric blue, lifted from the infinity mark.
 * Deployed narrowly: the logo, selected states, focus, and soft light around
 * product frames. Never body text, never a full background, never every control.
 */
export const signal = [
  { token: 'signal', value: '#4ea4ff', name: 'Signal Blue', use: 'Selected states, focus rings, markers, the support launcher.' },
  { token: 'signal-soft', value: '#8fc5ff', name: 'Signal Soft', use: 'Signal used as text on dark (links inside prose).' },
  { token: 'signal-deep', value: '#1f5fd1', name: 'Signal Deep', use: 'The core of a glow; never a fill.' },
];

/** Status colours. Muted so they sit inside the dark stage. */
export const status = [
  { token: 'positive', value: '#5fd49a', name: 'Positive', use: 'Success, "after" states.' },
  { token: 'caution', value: '#f2c46d', name: 'Caution', use: 'Warnings.' },
  { token: 'critical', value: '#f2777f', name: 'Critical', use: 'Errors, "before" states.' },
];

export const gradients = {
  atmosphere:
    'linear-gradient(to right, rgba(78,164,255,0.10), rgba(143,197,255,0.10), rgba(78,164,255,0.10))',
  lift: 'linear-gradient(to top, rgba(78,104,150,0.15), rgba(78,104,150,0.08), rgba(0,0,0,0))',
  glow: 'radial-gradient(60% 60% at 50% 0%, rgba(78,164,255,0.22) 0%, rgba(31,95,209,0.08) 45%, rgba(5,6,8,0) 75%)',
};

export const fonts = {
  sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  // The Virtara signature: numbers, prices, KPIs, product-frame labels.
  // Never headings, never paragraphs.
  signature: ['"Chakra Petch"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
};

/**
 * Type scale. [size, { lineHeight, letterSpacing, fontWeight }].
 * Display and section sizes are fluid: they reach their Featurebase-calibrated
 * maximum at desktop and step down on phones.
 */
export const typeScale = [
  { token: 'caption', size: '0.8125rem', lineHeight: '1.5', tracking: '0', weight: '500', name: 'Caption', px: '13' },
  { token: 'nav', size: '0.875rem', lineHeight: '1.43', tracking: '0', weight: '500', name: 'Nav / control', px: '14' },
  { token: 'body', size: '1rem', lineHeight: '1.6', tracking: '0', weight: '400', name: 'Body', px: '16' },
  { token: 'feature', size: '1.125rem', lineHeight: '1.56', tracking: '-0.005em', weight: '600', name: 'Feature title', px: '18' },
  { token: 'lead', size: 'clamp(1.125rem, 1rem + 0.55vw, 1.4375rem)', lineHeight: '1.5', tracking: '0', weight: '400', name: 'Lead', px: '18→23' },
  { token: 'title', size: 'clamp(1.375rem, 1.2rem + 0.6vw, 1.625rem)', lineHeight: '1.25', tracking: '-0.015em', weight: '500', name: 'Title', px: '22→26' },
  { token: 'section', size: 'clamp(1.875rem, 1.4rem + 1.6vw, 2.5rem)', lineHeight: '1.12', tracking: '-0.02em', weight: '500', name: 'Section heading', px: '30→40' },
  { token: 'display', size: 'clamp(2.375rem, 1.6rem + 2.9vw, 3.5rem)', lineHeight: '1.1', tracking: '-0.025em', weight: '500', name: 'Display', px: '38→56' },
];

export const radii = [
  { token: 'control', value: '12px', name: 'Control', use: 'Buttons, inputs, links with a surface, tabs.' },
  { token: 'card', value: '16px', name: 'Card', use: 'Cards, menus, product frames.' },
  { token: 'media', value: '24px', name: 'Media', use: 'Large images and the closing band.' },
  { token: 'pill', value: '9999px', name: 'Pill', use: 'Badges, announcement pills, the launcher.' },
];

export const shadows = [
  { token: 'inset', value: '0 1px 3px 0 rgba(0,0,0,0.10), 0 1px 2px -1px rgba(0,0,0,0.10)', name: 'Inset card' },
  { token: 'raised', value: '0 20px 25px -5px rgba(0,0,0,0.10), 0 8px 10px -6px rgba(0,0,0,0.10)', name: 'Raised link' },
  {
    token: 'float',
    value: '0 0 0 1px rgba(0,0,0,0.40), 0 20px 25px -5px rgba(0,0,0,0.30), 0 8px 10px -6px rgba(0,0,0,0.30)',
    name: 'Floating panel',
  },
  {
    token: 'frame',
    value: '0 0 0 1px rgba(78,164,255,0.10), 0 -12px 80px -20px rgba(78,164,255,0.35), 0 30px 60px -20px rgba(0,0,0,0.6)',
    name: 'Product frame glow',
  },
];

/** 8px base. */
export const spacing = [8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 128];

export const motion = {
  ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
  fast: '150ms',
  base: '220ms',
  slow: '420ms',
};

export const layout = {
  shell: '1200px',
  prose: '68ch',
  navHeight: '64px',
};

/** Flat { token: value } map of every colour, used by Tailwind and the CSS variables. */
export const colorMap = Object.fromEntries(
  [...surfaces, ...text, ...signal, ...status].map(({ token, value }) => [token, value]),
);
