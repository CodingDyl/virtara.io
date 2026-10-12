---
name: Virtara
description: Blue-hour console — a quiet near-black stage where real client work sits in lit frames and one electric blue marks what matters.
colors:
  canvas: "#050608"
  ink: "#0a0c10"
  charcoal: "#0f1219"
  steel: "#151a24"
  edge: "#1e2330"
  edge-strong: "#2a3142"
  cloud: "#ffffff"
  frost: "#dee3ec"
  mist: "#aeb6c9"
  quiet: "#8a92a6"
  signal: "#4ea4ff"
  signal-soft: "#8fc5ff"
  signal-deep: "#1f5fd1"
  positive: "#5fd49a"
  caution: "#f2c46d"
  critical: "#f2777f"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.375rem, 1.6rem + 2.9vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  section:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 1.4rem + 1.6vw, 2.5rem)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 1.2rem + 0.6vw, 1.625rem)"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  lead:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1rem + 0.55vw, 1.4375rem)"
    fontWeight: 400
    lineHeight: 1.5
  feature:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.56
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  nav:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.43
  caption:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.5
  figure:
    fontFamily: "Chakra Petch, Inter, sans-serif"
    fontWeight: 500
    letterSpacing: "-0.025em"
rounded:
  control: "12px"
  card: "16px"
  media: "24px"
  pill: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  2xl: "80px"
  section: "112px"
components:
  button-primary:
    backgroundColor: "rgba(255,255,255,0.92)"
    textColor: "{colors.charcoal}"
    typography: "{typography.nav}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.cloud}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.cloud}"
    typography: "{typography.nav}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "44px"
  card:
    backgroundColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "24px"
  card-raised:
    backgroundColor: "{colors.charcoal}"
    rounded: "{rounded.card}"
  input:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.cloud}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
  badge:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.mist}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: "0 12px"
    height: "28px"
  launcher:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.cloud}"
    rounded: "{rounded.pill}"
    size: "48px"
---

# Design System: Virtara

> **Single source of truth.** Token values live in `src/design/tokens.js`. Tailwind (`tailwind.config.js`), the `--v-*` CSS variables, and the live brand book at `/brand` are all generated from it. This document describes the rules for using those tokens; if a value here and `tokens.js` ever disagree, `tokens.js` wins — fix this file.

## Overview

**Creative North Star: the blue-hour console.** Virtara's site is a near-black stage at the moment after sunset: almost everything is dark and still, the type is white and composed, and the only colour is a cool electric blue that marks where to look. The reference is Featurebase (and its cousins Linear and Raycast) — flat charcoal layers, hairline borders, white filled actions, product UI as the main visual — kept Virtara's own through three choices: the signal is the blue of the infinity mark, not violet; numbers are set in Chakra Petch as a signature; and atmosphere comes from South African places at night (Cape Town, the Karoo array, Johannesburg, the Drakensberg).

The "product" in every frame is the client's work: real sites in browser chrome, real outcome numbers, before-and-after. Example data (ranking reports, campaign tables, care logs) is labelled **Example report** wherever it appears.

Anti-references: the previous Virtara look (cyan→blue gradient pills, gradient text, glass cards, the Silk WebGL hero), stock "person at a monitor" illustrations, neon multi-accent palettes.

## Colors

Restrained strategy: neutrals plus one signal.

- **Surfaces, darkest → lightest:** Void Canvas `canvas` (#050608) is every page; Ink `ink` (#0a0c10) for inset cards and fields; Charcoal `charcoal` (#0f1219) for product frames, menus and forms; Steel `steel` (#151a24) for raised controls and icon tiles. Depth is built by stacking these, never by lightening with white overlays beyond `white/[0.04]` hover washes.
- **Edge** (#1e2330) is the 1px hairline between every dark surface; **Edge Strong** (#2a3142) is its hover/outlined-control state. Never use light grey or white dividers.
- **Text:** Cloud (#fff) headings; Frost (#dee3ec) leads and navigation; Mist (#aeb6c9) body; Quiet (#8a92a6) metadata only — it passes AA on canvas but is never used for paragraphs.
- **Signal Blue** (#4ea4ff): selected states (tab diamonds, rail selection, radio chips), focus rings, check marks, the marker dot in pills, the floating launcher, and the soft light around product frames. **Signal Soft** (#8fc5ff) is the only blue used as text (inline links). **Signal Deep** is a glow core, never a fill.
- **Status** (positive / caution / critical) are muted and appear as dots, icon tints and 10%-alpha washes — "before" is critical, "after" is positive.
- **Gradients** are light, not decoration: `bg-glow` (blue light falling from the top of a hero), `bg-atmosphere` (blur behind a product frame), `bg-lift` (upward haze inside a pane).

## Typography

Inter carries everything, at medium weight: headings are composed, not shouted. Display 38→56px/500 at -0.025em; section 30→40px/500; title 22→26px/500; lead 18→23px Frost; body 16px/1.6 Mist; nav and controls 14px/500; caption 13px. Feature titles (card and menu headings) are the only 600-weight text.

**Chakra Petch is the signature** (`.figure` / `font-signature`): KPIs (+30%, 2.1×), prices (R12,500), counters and step numbers. Never headings, never paragraphs.

Sentence case everywhere, including buttons. No eyebrow/kicker labels above headings — the heading carries its own weight. Long-form reading (blog, legal) uses `prose prose-virtara` at a 68ch measure.

## Layout

One container: `.shell` — 1200px max, 16/24/32px gutters. One section rhythm: `.section` (80px mobile, 112px desktop). 8px base grid.

The page pattern, top to bottom: a centred hero (`PageHero`) on the glow, optionally with a product frame rising out of it; left-aligned section headings (`SectionHeading`) paired with a wide frame below or beside; unboxed social proof on open canvas; one `ClosingBand` (Drakensberg image) as the last thing before the footer. Pricing uses three `PlanCard` columns; terms and feature lists use hairline-divided rows (`divide-x` / `divide-y` on `edge`) instead of card grids.

## Elevation & Depth

Flat and layered. Elevation is declared once per element — a hairline border *or* a shadow, never a heavy border under a wide shadow.

- `shadow-inset` — barely-there lift for section-sized feature cards.
- `shadow-float` — menus, toasts, the cookie panel, floating product panels.
- `shadow-frame` — the signature: a 1px blue-tinted ring with blue light bleeding upward. Product frames, the recommended plan, primary forms.
- `shadow-raised` — the white primary button.

Backdrop blur is functional only: the scrolled nav bar, the open mega-menu panel, and the dimmed page behind it.

## Shapes

12px (`rounded-control`) for buttons, inputs, tabs and menu rows; 16px (`rounded-card`) for cards, menus and frames; 24px (`rounded-media`) for large images and the closing band; pill for badges, announcement pills, choice chips and the launcher. Nothing between, nothing larger.

## Components

All in `src/components`:

- **Navbar** (`Navbar.jsx`, content in `navigation/menus.js`) — transparent over the hero, solid `canvas/80` + blur once scrolled. Centre links open a Featurebase-style mega panel: icon-tile list on the left, one or two tall image cards on the right ("scene" = night photograph with copy at the foot; "screen" = a real screenshot in a mini browser). Hover-intent open/close, click and keyboard operable, Esc closes, the page dims behind. Mobile is a full-screen sheet with accordion groups and a full-width white CTA.
- **Button** (`ui/Button.jsx`) — `primary` (near-white, charcoal label), `secondary` (hairline), `quiet` (steel fill on charcoal), `ghost`. `to`/`href` render links. `loading` shows a spinner and disables. Blue never fills a button.
- **Badge** (`ui/Badge.jsx`) and **Announcement** (`layout/PageHero.jsx`) — low-contrast pills; `signal` adds the blue marker dot.
- **Card** (`ui/Card.jsx`) — `default` (ink), `raised` (charcoal), `float`, `feature`; `interactive` adds the hover hairline.
- **PlanCard** (`ui/PlanCard.jsx`) — pricing column; `highlighted` moves to charcoal + `shadow-frame` + a filled button.
- **Fields** (`index.css` `.field-*`, `ui/Field.jsx`) — ink fields, edge border, signal focus ring; `IconInput`, `SelectField`, `CheckboxCard`; choice chips as `role="radio"` pills.
- **Product frames** — `home/ClientWorkspace.jsx` (rail · live site · outcome), `home/ServicesRail.jsx` (service list · deliverable pane). Tabs carry a small rotated-square marker that turns signal blue when selected.
- **Page shells** — `PageShell`, `PageHero`, `SectionHeading`, `ClosingBand`, `ThankYouPage`, `LegalPage`, `MinimalShell` (email-reached pages).
- **Launcher** (`ScrollToTop.jsx`) — the one filled-blue circle, lower right.

## Do's and Don'ts

**Do**
- Start from `tokens.js` utilities (`bg-canvas`, `text-mist`, `border-edge`, `rounded-card`, `text-section`, `shadow-frame`). Never hard-code a hex in a component.
- Show the real thing: client screenshots in browser chrome, owner-supplied numbers. Label any illustrative data "Example report".
- Keep Signal Blue to selection, focus, markers and light.
- Use hairline-divided rows for lists of facts; reserve cards for things you click or compare.
- Use Tabler icons at stroke 1.6–2, sized 14–20px.

**Don't**
- Fill buttons with blue, put gradients on text, or add a second accent colour.
- Set headings in 600/700 or in Chakra Petch; put a kicker label above a heading.
- Use radii under 12px on controls or over 16px on cards; nest cards in cards.
- Box client logos — names sit unboxed on the canvas.
- Add glass/blur as decoration, stock illustrations of people, or emoji as icons.
- Invent testimonials, KPIs or pricing. `src/constants/index.js` testimonials use stock portraits and are not to be shown as real.
