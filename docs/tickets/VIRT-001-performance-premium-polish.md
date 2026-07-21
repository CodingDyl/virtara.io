# VIRT-001 — Performance, Trust & Premium Polish Pass

**Priority:** High · **Estimate:** 3–5 days · **Assignee:** Junior Developer
**Branch:** create `feature/virt-001-performance-polish` off `develop`

## Why this ticket exists

The Virtara site looks good but has measurable issues that hurt conversion, SEO, and credibility: multi-megabyte hero images, no route code-splitting (every visitor downloads all ~35 pages of JS), placeholder Google sample videos on the case-study cards, and hardcoded config. This ticket fixes all of them. Each task below is independent — commit after each one so the work is easy to review.

---

## Task 1 — Compress and convert all images to WebP

**Problem:** `src/assets/bg_hero.png` is **3.9 MB**. Seven other PNGs are 1.5–2.2 MB each. On a South African mobile connection this alone can add 10+ seconds to first load.

**Steps:**
1. Install the converter as a one-off tool: `npx @squoosh/cli --version` won't work on newer Node — instead use `sharp`:
   ```bash
   npm i -D sharp
   ```
2. Create `scripts/optimize-images.mjs`:
   ```js
   import sharp from "sharp";
   import { readdirSync } from "fs";
   import path from "path";

   const dir = "src/assets";
   for (const file of readdirSync(dir, { recursive: true })) {
     if (!file.endsWith(".png")) continue;
     const input = path.join(dir, file);
     const output = input.replace(/\.png$/, ".webp");
     await sharp(input).resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 80 }).toFile(output);
     console.log("wrote", output);
   }
   ```
3. Run it: `node scripts/optimize-images.mjs`
4. Update `src/assets/index.js` to export the `.webp` files instead of `.png`.
5. Delete the old `.png` files once every import resolves (`npm run build` must pass).
6. **Acceptance:** no image asset over 300 KB; `npm run build` succeeds; every page still shows its images.

## Task 2 — Route-based code splitting

**Problem:** `src/App.jsx` imports every page eagerly, so the homepage bundle includes all legal pages, thank-you pages, and tailored routes.

**Steps:**
1. In `src/App.jsx`, replace the static page imports with `React.lazy`:
   ```jsx
   import { lazy, Suspense } from "react";
   const Home = lazy(() => import("./pages/Home"));
   const Contact = lazy(() => import("./pages/Contact"));
   // ...repeat for every page import
   ```
2. Wrap `<Routes>` in `<Suspense fallback={<LoadingSpinner />}>` — the spinner already exists at `src/components/ui/LoadingSpinner.jsx`.
3. Keep `Navbar`, `Footer`, `ScrollToTop`, `AnalyticsTracker`, `CookieConsent` as normal imports (they're on every page).
4. **Acceptance:** `npm run build` output shows one chunk per page; homepage JS chunk is significantly smaller than before (note before/after sizes in the PR description).

## Task 3 — Replace placeholder case-study videos

**Problem:** `src/pages/Home.jsx` (`proofCards`, ~lines 14–48) plays Google sample videos (`gtv-videos-bucket/.../BigBuckBunny.mp4` etc.). A prospect clicking a case study sees a cartoon rabbit — this destroys trust.

**Steps:**
1. Ask Dylan for real screen-recording clips of Vaja, MPower Ratings, and Virtec (or record 5–8s scrolls of the live sites yourself at 1280×720, export as `.mp4` H.264 under 2 MB each).
2. Put them in `public/videos/` and update the `video` fields in `proofCards`.
3. Add `preload="none"` and `poster={image}` to the `<video>` elements so they don't download until clicked.
4. **Acceptance:** clicking each proof card plays the real client site video; no network request to `storage.googleapis.com` remains.

## Task 4 — Move Firebase config to environment variables

**Problem:** `src/config/firebase.js` hardcodes the full Firebase config. Firebase web keys aren't secret per se, but hardcoding blocks per-environment config and violates the pattern already started in `src/config/env.ts`.

**Steps:**
1. Add to `.env` (create it; confirm `.env` is in `.gitignore` — add it if missing):
   ```
   VITE_FIREBASE_API_KEY=AIza...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```
2. In `firebase.js` read them via `import.meta.env.VITE_FIREBASE_API_KEY` etc.
3. Add the same variables in the Vercel dashboard (Settings → Environment Variables) — ask Dylan for access.
4. Commit a `.env.example` with the keys but empty values.
5. **Acceptance:** `npm run build && npm run preview` works locally with `.env`; no literal `AIza` string in `src/`.

## Task 5 — Fix `index.html` fundamentals

**Problem:** `index.html` has title "Virtara" only, a broken favicon path (`./public/web_logo_bg.svg` — files in `public/` are served from `/`), and no meta description / OG tags for the pre-hydration state.

**Steps:**
1. Change favicon href to `/web_logo_bg.svg`.
2. Set `<title>Virtara | Digital Agency South Africa</title>` and add `<meta name="description">`, `og:title`, `og:description`, `og:image` (use `/web_logo.png` or a dedicated 1200×630 image), `og:url`, `twitter:card`.
3. Add `<link rel="preconnect">` for any external origins used at load (check Network tab: Sanity CDN, Google Fonts if present).
4. **Acceptance:** sharing `virtara.co.za` into WhatsApp/Slack shows a proper preview card (test with https://www.opengraph.xyz).

## Task 6 — Accessibility & hygiene sweep

1. Add meaningful `alt` text to the 6 `<img>` tags missing it (`grep -rn "<img" src | grep -v alt=` to find them).
2. Add `loading="lazy"` to every below-the-fold `<img>` (only 6 currently have it).
3. Remove `console.log` calls from `src/pages/Resources/HealthCheck/HealthCheck.jsx`.
4. Run `npm run lint` and fix any errors you introduced.
5. **Acceptance:** lint passes; Lighthouse accessibility score ≥ 95 on the homepage.

## Task 7 — Canonical domain consistency check

`Home.jsx` sets canonical to `https://www.virtara.co.za`. Verify what the production domain actually is (virtara.io vs virtara.co.za, www vs apex) and make every canonical URL, sitemap entry (`vite-plugin-sitemap` config in `vite.config.js`), and schema.org `url` field use the exact same one. Ask Dylan which is the primary domain before changing anything.

---

## Definition of done

- [ ] All 7 tasks committed separately on the feature branch
- [ ] `npm run build` and `npm run lint` pass
- [ ] Lighthouse (mobile, homepage): Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95 — attach before/after screenshots to the PR
- [ ] PR opened against `develop` with before/after bundle sizes and Lighthouse scores in the description
