import plugin from 'tailwindcss/plugin'
import typography from '@tailwindcss/typography'
import {
  colorMap,
  fonts,
  typeScale,
  radii,
  shadows,
  gradients,
  motion,
  layout,
} from './src/design/tokens.js'

/**
 * Every theme value comes from src/design/tokens.js — edit tokens there, not
 * here. This file only maps them onto Tailwind utilities.
 */

// Colours resolve through CSS variables so opacity modifiers still work
// (bg-signal/10) and the brand book can read the live values.
const hexToRgb = (hex) => {
  const n = parseInt(hex.slice(1), 16)
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`
}

const colors = Object.fromEntries(
  Object.keys(colorMap).map((token) => [token, `rgb(var(--v-${token}) / <alpha-value>)`]),
)

const fontSize = Object.fromEntries(
  typeScale.map(({ token, size, lineHeight, tracking, weight }) => [
    token,
    [size, { lineHeight, letterSpacing: tracking, fontWeight: weight }],
  ]),
)

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // The brand book renders the type scale by token name.
  safelist: typeScale.map(({ token }) => `text-${token}`),
  theme: {
    extend: {
      colors,
      fontFamily: {
        sans: fonts.sans,
        signature: fonts.signature,
      },
      fontSize,
      borderRadius: Object.fromEntries(radii.map(({ token, value }) => [token, value])),
      boxShadow: Object.fromEntries(shadows.map(({ token, value }) => [token, value])),
      backgroundImage: {
        atmosphere: gradients.atmosphere,
        lift: gradients.lift,
        glow: gradients.glow,
      },
      maxWidth: {
        shell: layout.shell,
        prose: layout.prose,
      },
      transitionTimingFunction: {
        out: motion.ease,
      },
      transitionDuration: {
        fast: motion.fast,
        base: motion.base,
        slow: motion.slow,
      },
      keyframes: {
        'menu-in': {
          from: { opacity: '0', transform: 'translateY(-6px) scale(0.99)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        rise: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'menu-in': `menu-in 220ms ${motion.ease}`,
        'fade-in': `fade-in 220ms ${motion.ease}`,
        rise: `rise 700ms ${motion.ease} both`,
      },
      typography: () => ({
        virtara: {
          css: {
            '--tw-prose-body': `rgb(var(--v-mist))`,
            '--tw-prose-headings': `rgb(var(--v-cloud))`,
            '--tw-prose-lead': `rgb(var(--v-frost))`,
            '--tw-prose-links': `rgb(var(--v-signal-soft))`,
            '--tw-prose-bold': `rgb(var(--v-cloud))`,
            '--tw-prose-counters': `rgb(var(--v-quiet))`,
            '--tw-prose-bullets': `rgb(var(--v-edge-strong))`,
            '--tw-prose-hr': `rgb(var(--v-edge))`,
            '--tw-prose-quotes': `rgb(var(--v-frost))`,
            '--tw-prose-quote-borders': `rgb(var(--v-signal))`,
            '--tw-prose-captions': `rgb(var(--v-quiet))`,
            '--tw-prose-code': `rgb(var(--v-frost))`,
            '--tw-prose-pre-code': `rgb(var(--v-frost))`,
            '--tw-prose-pre-bg': `rgb(var(--v-charcoal))`,
            '--tw-prose-th-borders': `rgb(var(--v-edge))`,
            '--tw-prose-td-borders': `rgb(var(--v-edge))`,
            'h1, h2, h3, h4': { fontWeight: '500', letterSpacing: '-0.015em' },
          },
        },
      }),
    },
  },
  plugins: [
    typography,
    // Write every colour token to :root as an RGB triplet.
    plugin(({ addBase }) => {
      addBase({
        ':root': Object.fromEntries(
          Object.entries(colorMap).map(([token, hex]) => [`--v-${token}`, hexToRgb(hex)]),
        ),
      })
    }),
  ],
}
