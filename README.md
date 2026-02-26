# Virtara Website

## Setup
1. Install dependencies:
   `npm install`
2. Configure environment variables:
   `cp .env.example .env`
3. Set your GA4 Measurement ID in `.env`:
   `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
4. Start development:
   `npm run dev`
5. Build production:
   `npm run build`

## Google Analytics 4
- GA4 is initialized in `/src/lib/analytics.js`.
- SPA pageviews are tracked on route changes via `/src/components/AnalyticsTracker.jsx`.
- If `VITE_GA_MEASUREMENT_ID` is missing, analytics stays disabled.

## SEO/Indexing Files
- `public/robots.txt`
- `dist/sitemap.xml` (generated during `npm run build` via `vite-plugin-sitemap`)
