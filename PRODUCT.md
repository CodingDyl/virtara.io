# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

South African businesses — founders, marketing leads and operators at small-to-mid companies — who need a website that produces leads, not just a brochure. They usually arrive with a concrete problem (outdated site, low-quality leads, no analytics) and are comparing agencies. *(Inferred from site copy and the lead-qualifier flow; confirm.)*

## Product Purpose

Virtara is a South African digital agency. It designs and builds conversion-focused websites, runs SEO, and maintains sites after launch. Success for a visitor is booking a strategy audit or starting a project brief.

## Positioning

Outcome-first: every engagement is framed around measurable results (conversion lift, qualified leads, Lighthouse performance) rather than deliverables. Tagline in use: "Digital assets that outperform your competition."

## Operating Context

- Primary actions: Book a strategy audit (`/contact-us`), Start a project (`/start-your-project`), tier-specific briefs (`/web-development/{starter,professional,enterprise}`, `/seo`).
- Lead magnets: Website health-check checklist (`/resources/health-check`), audit request (`/resources/audit`).
- Blog content from Sanity (`/web-development-blog`).
- Forms post via EmailJS / Firebase; GA4 analytics.

## Capabilities and Constraints

- Stack: Vite + React 18 + Tailwind 3, deployed on Vercel. Route-level code splitting is in place and must stay.
- Services: Web design & development, website maintenance & support, SEO, brand strategy / digital marketing.
- Pricing lives on `/services` (builds from R12,500 once-off; SEO from R4,500/mo; paid media from R6,500/mo; maintenance from R1,000/mo). Tier landing pages: Starter, Professional, Enterprise.
- Performance and accessibility thresholds were hit in VIRT-001 (see `docs/tickets/`); redesign must not regress them.

## Brand Commitments

- Name: Virtara. Logo: infinity mark (blue → violet → cyan), `src/assets/web_logo_bg.webp`, `public/web_logo_bg.svg`.
- Visual reference the owner made binding (2026-10-12): Featurebase (featurebase.app) — dark, quiet stage, restrained type, white filled CTAs, one narrowly deployed signal colour, mega-menu navbar with image cards. Keep Virtara unique: signal colour is Virtara electric blue (not Featurebase violet); Inter throughout, Chakra Petch kept as a small signature accent.
- Brand book single source of truth: `src/design/tokens.js` → Tailwind + `--v-*` CSS variables + live `/brand` page; rules in `DESIGN.md`.
- Domain: https://virtara.co.za (apex).

## Evidence on Hand

- Real client work: Vaja (vaja.co.za), MPower Ratings (mpowerratings.co.za), Virtec Marketing (virtec.vercel.app), Aureya, Clarity — screenshots in `src/assets/projects/`.
- KPI claims (Vaja +30% conversions, MPower 2.1x qualified inquiries, Virtec +41% demo requests, Aureya +45%, Clarity +38%, Lighthouse 97+) — owner-supplied, single source in `src/data/projects.js`; do not invent new ones. OPEN: the old Work page listed different figures for Vaja (+35%), MPower (+50%) and Virtec (+40%); unified on the Home figures pending owner confirmation.
- `src/constants/index.js` testimonials use Unsplash stock portraits and unverified quotes — do NOT surface them as real testimonials.

## Product Principles

1. Prove, don't claim — show real client work and real numbers.
2. Every page has one obvious next step (audit or project brief).
3. Speed is part of the product: an agency selling performance must be fast.
4. Quiet confidence over hype.

## Accessibility & Inclusion

WCAG 2.1 AA: 4.5:1 body contrast, visible focus, keyboard-operable menus, `prefers-reduced-motion` respected.
