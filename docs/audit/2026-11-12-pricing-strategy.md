# Pricing strategy: cheap builds, recurring revenue

## Why change

Building a website is getting cheaper every month, and South African buyers can already get one for R2,500–R3,000 upfront (WebX, Lamus) or R499 a month (Web Partner). Virtara's R12,500 entry build is priced like Juicy Designs (R12,000), which has 214 reviews behind it; Virtara has none yet. The money that lasts is in what happens after launch: hosting, care, being found (SEO + AEO) and answering enquiries (Concierge).

So the build becomes the way in, and the monthly plan becomes the business.

## Where competitors sit (from the 11 November audit and AEO research)

| | Upfront | Monthly |
|---|---|---|
| WebX Design | R2,500 | R195 |
| Lamus Design | R3,000 | hosting included year 1 |
| Web Partner | R0 or R10,000 | R499 |
| Online By Digital | R7,800 | not stated |
| Juicy Designs | R12,000 | SEO from R5,500; "SEO and AI visibility" retainer from R1,800 |
| **Virtara today** | **R12,500** | care from R1,000; SEO + AEO from R4,500 |

## The new model

1. **Two prices for every build.** A low price when the client takes a 12-month care plan, and today's price as the once-off option. Today's prices stay on the page as the anchor, and existing quotes remain valid.
2. **The care plan includes hosting.** One monthly line, no separate hosting invoice.
3. **A low first rung for visibility.** SEO + AEO currently starts at R4,500 a month, which is too big a first step for a R4,900 website buyer. A new entry tier at R1,950 with no setup fee matches the cheapest credible retainer in the market.
4. **One bundle that puts it together**, so the owner hears one monthly number.

### Prices

| Build | With a 12-month care plan | Once-off, no plan (unchanged) |
|---|---|---|
| Launch Site | **R4,900** | R12,500 |
| Growth Site | **R12,500** | R28,000 |
| Commerce / Custom Platform | **from R25,000** | from R55,000 |

Care plans keep their prices (R1,000 / R2,500 / R5,000 a month) and now state that hosting is included.

| SEO + AEO | Monthly | Setup |
|---|---|---|
| **Visibility Starter (new)** | **R1,950** | none |
| Local SEO + AEO Foundation | R4,500 | R3,500 |
| SEO + AEO Growth Engine | R8,500 | R5,500 |
| Competitive SEO + AEO | R14,500 | R8,500 |

**Growth Bundle: R2,950 a month** (12-month term) = Essential care with hosting (R1,000) + Visibility Starter (R1,950) + Concierge Starter (R599). Separately R3,549, so the bundle saves R599 a month, which is Concierge free.

### What this does to revenue per client

- Launch buyer today: R12,500 once.
- Launch buyer on the new model with Essential care: R4,900 + 12 × R1,000 = **R16,900 in year one**, then R12,000 a year.
- Launch buyer on the Growth Bundle: R4,900 + 12 × R2,950 = **R40,300 in year one**.

Ten bundle clients is R29,500 a month recurring.

## Risks to watch

- **Delivery load.** Visibility Starter and the bundle are monthly promises. The deliverables below are deliberately small.
- **12-month term.** The Terms page must say what happens if a client cancels early. The spec below adds one sentence.
- **Concierge in the bundle** is not billed through PayFast. Mark those clients "managed by Virtara" in the Concierge Billing tab.

---

## Implementation spec (for the coding agent)

Scope is closed: only what is listed. All rand amounts live in `src/data/pricing.js`. No new pages, routes or components. Reuse `PlanCard` and existing text styles. Use the wording below verbatim.

1. **`src/data/pricing.js`**
   - Each `buildPlans` entry: keep `price`/`priceLabel` as the once-off price and add `planPrice` and `planPriceLabel`: launch `R4,900` / `R4,900 with a care plan`; growth `R12,500` / `R12,500 with a care plan`; commerce `From R25,000` / `From R25,000 with a care plan`. Add `onceOffNote`: `or R12,500 once-off without a plan` (growth: `R28,000`; commerce: `from R55,000`).
   - `carePlans`: prepend the feature `Hosting included` to all three. Prices unchanged.
   - `seoPlans`: insert as the first entry `{ id: 'visibility-starter', name: 'Visibility Starter', price: 'R1,950', priceLabel: 'R1,950/mo', setupFee: null, idealFor: 'New and small sites that want to be found on Google and in AI answers without a big retainer.', features: ['Google Business Profile kept up to date', '1 page optimised for search and AI answers each month', 'FAQ schema on key pages', 'Quarterly AI visibility check', 'Short monthly report'] }`.
   - New export `growthBundle = { id: 'growth-bundle', name: 'Growth Bundle', price: 'R2,950', priceLabel: 'R2,950/mo', term: '12-month term', includes: ['Essential care with hosting', 'Visibility Starter (SEO + AEO)', 'Concierge Starter website assistant'], saving: 'Saves R599 a month against buying each separately' }`.
2. **`src/pages/Services.jsx`**
   - Build cards show `planPriceLabel` as the price and `onceOffNote` as the small note line (replacing the "Optional care plan" note). Add the feature line `12-month care plan from R1,000/mo, hosting included` (take R1,000 from `carePlans[0]`).
   - Section subtitle for Web & Commerce → `Low upfront cost with a monthly care plan, or pay once. Your choice.`
   - SEO tab: four cards now. Where `setupFee` is null show `No setup fee`. The grid must still look right with four cards at desktop width (use the grid classes the page already uses elsewhere for four items, or 2 × 2); check at 390px and 1440px.
   - Under the Web & Commerce card grid only, one line in the existing muted note style: `Growth Bundle, R2,950/mo: Essential care with hosting, Visibility Starter and the Concierge website assistant on one monthly invoice. 12-month term.` with a text link `Ask about the bundle` to `/contact-us`.
3. **`WebDevForm.jsx`** (package pages): show `planPriceLabel` and `onceOffNote` in place of the once-off price.
4. **`src/pages/StartaProject.jsx`**: budget options read `planPriceLabel` (for example `Launch Site, R4,900 with a care plan`).
5. **`src/pages/MaintenanceSupport.jsx`**: no code change expected beyond the new feature flowing through; confirm it renders.
6. **`src/components/home/ServicesRail.jsx`**: replace the hard-coded "From R…" strings with values from `pricing.js` (web: `From R4,900 with a care plan`; SEO: `From R1,950 / month`; ads and care unchanged values, read from data).
7. **`src/pages/TailoredRoutes/Seo/Seo.jsx`**: its meta description reads `seoPlans[0].price`; confirm it now says R1,950 and reads naturally.
8. **`src/pages/Legal/TermsOfService.jsx`** section 4, add after the deposit sentence: `Build prices offered with a care plan require a 12-month care plan; if the plan is cancelled early, the difference between the plan price and the once-off price of the build becomes payable.`
9. Verify: eslint on changed files; scratch compile; a search of `src/pages` and `src/components` (excluding `Concierge.jsx`, `Brand.jsx`, `Home.jsx` quiz bands) finds no hard-coded plan rand amount; view `/services` (both tabs), `/web-development/starter`, `/start-your-project` and the home services strip at 390px and 1440px.
