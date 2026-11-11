# Virtara Audit Fixes — Implementation Plan

> **For agentic workers:** work through this task by task, in the order given. Steps use checkbox (`- [ ]`) syntax for tracking. If you have the superpowers skills, use `superpowers:executing-plans`.

**Goal:** Implement the 10 ranked changes from the 2026-11-11 business audit, and nothing else.

**Architecture:** The site stays a Vite + React 18 SPA on Vercel. Public routes are prerendered to static HTML at build time by a small Node script. Prices move into one data file that every page reads. Lead forms keep their current transport but gain a phone field, a reply-to, an auto-reply and a Firestore copy.

**Tech stack:** Vite 7, React 18, react-router-dom 7, react-helmet-async, Tailwind 3, Firebase Firestore (project `virtec-crm`), Express backend in `virtara-backend/` (Resend, Sender.net), GA4.

**Spec:** `docs/audit/2026-11-11-audit-log.md` (Part 1). Read it first. File and line references below come from it; confirm each line number before editing, because they may have drifted.

## Global constraints

- **Scope is closed.** Only the changes listed here. Do not fix the items in Part 4 of the audit, do not refactor neighbouring code, do not add a test framework, do not redesign pages. If something looks wrong and is not in this plan, write it in your final report and leave it.
- Work on the current branch (`develop`). Never create a git worktree.
- Before editing any `.jsx`, `.css` or template file, invoke the `impeccable` and `ui-ux-pro-max` skills. Before writing or reviewing any code, invoke `karpathy-guidelines`.
- New UI must reuse existing components (`src/components/ui/Button`, existing form field markup) and the tokens in `DESIGN.md`. No new visual styles.
- Do not change route paths. Existing URLs must keep working.
- Do not push or deploy. Commit only if the owner has asked for commits; if so, one commit per task.
- Never invent business facts (prices, delivery weeks, client quotes, phone numbers, IDs). Each task lists the owner inputs it needs. If an input is missing, do the parts that do not need it, leave the rest, and report it.
- Gate for every code task: `npm run lint` and `npm run build` both exit 0.

## Owner inputs (collect before starting)

| ID | Needed for | Input | Default if the owner says "use your judgement" |
|---|---|---|---|
| I1 | Task 2 | GA4 measurement ID (`G-XXXXXXX`), set as `VITE_GA_MEASUREMENT_ID` in Vercel and `.env` | none, task cannot be verified live without it |
| I2 | Task 3 | Cal.com booking link for the audit call | none |
| I3 | Task 3 | Is the audit free or R299? | Free (the site says free everywhere except one page) |
| I4 | Task 3 | New answer bands for the quiz's revenue question (`Home.jsx:21`) | leave the bands unchanged |
| I5 | Task 4 | Per client: one confirmed figure and one named quote, with permission | none, do not ship placeholder quotes |
| I6 | Task 5 | WhatsApp number | +27 72 327 1040 (the number already in the footer) |
| I7 | Task 6 | Pro tier: what it gains (extra sites, WhatsApp handoff, no branding) or drop it | none |
| I8 | Task 7 | Canonical build tiers and prices | Launch R12,500 / Growth R28,000 / Commerce from R55,000 (`Services.jsx`) |
| I9 | Task 7 | Canonical care plan prices: R1,200 / R2,500 / R4,500 or R1,000 / R2,500 / R5,000 | none, the two pages disagree and only the owner knows |
| I10 | Task 8 | Weeks to launch and deposit split per build tier; instalment terms for Launch | none |
| I11 | Task 8 | Fold the SEO setup fee into the first three months? | No change |

## Review focus

Things the tasks' checks do not fully cover and that are most likely to bite:

1. A component that touches `window`, `document` or `localStorage` during render will crash the prerender. Task 1 Step 5 covers finding these.
2. Hydration mismatch warnings in the browser console after prerendering (Task 1 Step 8).
3. A visitor who declines cookies must load no Google script at all (Task 2 Step 5).
4. Firestore security rules live in the `virtec-crm` project, not this repo. A new `leads` collection will be rejected unless a create rule exists (Task 5 Step 6).
5. The auto-reply makes `/api/send-email` able to email any address. It must send fixed copy only, never caller-supplied text (Task 5 Step 2).

---

### Task 1: Make the site readable by Google (audit item 1)

**Files:**
- Modify: `index.html` (lines 10–13 region), `src/main.jsx`, `src/App.jsx` (only if the router lives there), `vite.config.js`, `package.json`
- Create: `scripts/public-routes.mjs`, `scripts/prerender.mjs`, `src/entry-server.jsx`

**Interfaces produced:**
- `scripts/public-routes.mjs` default-exports an array of path strings.
- `src/entry-server.jsx` exports `render(url: string): { html: string, head: string }`.

- [ ] **Step 1:** In `index.html`, delete the static `<meta name="description">` and `<link rel="canonical" href="https://virtara.co.za/">`. Each page already sets its own through react-helmet-async. Leave the `og:` and `twitter:` tags alone.
- [ ] **Step 2:** Create `scripts/public-routes.mjs` with exactly these routes: `/`, `/contact-us`, `/services`, `/our-work`, `/web-development-blog`, `/maintenance-support`, `/concierge`, `/start-your-project`, `/seo`, `/web-development/starter`, `/web-development/professional`, `/web-development/enterprise`, `/resources/health-check`, `/resources/audit`, `/legal/privacy-policy`, `/legal/terms-of-service`, `/legal/cookie-policy`.
- [ ] **Step 3:** In `vite.config.js`, import that list for the sitemap's `dynamicRoutes` (drop `/` from it, the plugin adds the root itself). This removes `/brand` from the sitemap and, as a side effect of using one list, adds `/concierge`.
- [ ] **Step 4:** Create `src/entry-server.jsx`. It renders the same route tree as the client with `renderToString`, wrapped in `StaticRouter` (from `react-router-dom`) and `HelmetProvider` with a context object. `head` is the concatenation of the helmet context's `title`, `meta` and `link` strings. If `BrowserRouter` is currently inside `App.jsx`, move it to `src/main.jsx` so `App` can be wrapped by either router; change nothing else in `App.jsx`.
- [ ] **Step 5:** Create `scripts/prerender.mjs`. It imports `render` from `dist-ssr/entry-server.js`, reads `dist/index.html` as the template, and for each route writes `dist/<route>/index.html` (root goes to `dist/index.html`, written last) with `html` injected inside `<div id="root">` and `head` injected before `</head>`. If `render` throws for a route, the script exits non-zero and names the route. Where a component crashes on `window`/`document`/`localStorage` during render, add the smallest guard (`typeof window !== "undefined"`) or move the access into `useEffect`; do not restructure the component.
- [ ] **Step 6:** In `package.json`, change `build` to: `vite build && vite build --ssr src/entry-server.jsx --outDir dist-ssr && node scripts/prerender.mjs`. Add `dist-ssr` to `.gitignore`.
- [ ] **Step 7:** In `src/main.jsx`, use `hydrateRoot` when `#root` has child nodes, otherwise `createRoot` as now.
- [ ] **Step 8: Verify.**
  - `npm run build` exits 0.
  - `grep -c 'rel="canonical"' dist/services/index.html` prints `1`, and that canonical ends in `/services`.
  - `grep -c 'R12,500' dist/services/index.html` prints 1 or more.
  - `grep -c 'name="description"' dist/concierge/index.html` prints `1`.
  - `grep -c brand dist/sitemap.xml` prints `0`.
  - `npm run preview`, open `/services` and `/`, and confirm the browser console shows no hydration errors.
  - Report to the owner: after deploy, `curl -s https://virtara.co.za/services | grep -c 'R12,500'` must be 1 or more. Vercel serves `dist/services/index.html` ahead of the catch-all rewrite in `vercel.json`; if it does not, stop and report, do not change `vercel.json` by guesswork.

**Known limits, intentionally out of scope:** blog posts (`/web-development-blog/:slug`) and the blog list's contents are fetched from Sanity in the browser, so they are not in the prerendered HTML. Unknown URLs still return 200. Thank-you pages, `/unsubscribe`, `/comeback` and `/brand` are not prerendered.

---

### Task 2: Turn analytics on and count leads (audit item 2)

**Needs:** I1.

**Files:**
- Modify: `src/lib/analytics.js`, `src/components/CookieConsent.jsx`, the file that calls `initializeGA()` (find with a search), every form's success handler (Task 5 lists the forms)
- Modify: `.env` (add `VITE_GA_MEASUREMENT_ID`); the owner sets the same variable in Vercel

**Interfaces produced:**
- `trackEvent(name: string, params?: object): void` exported from `src/lib/analytics.js`. No-op when GA is not initialised.
- `hasAnalyticsConsent(): boolean` exported from `src/lib/analytics.js`. True only when `localStorage.cookieConsent === "true"`; false if storage throws.

- [ ] **Step 1:** Add `hasAnalyticsConsent` and `trackEvent` to `analytics.js`. `initializeGA` returns early when `hasAnalyticsConsent()` is false.
- [ ] **Step 2:** In `CookieConsent.jsx`, after storing `"true"`, call `initializeGA()` and `trackPageView(window.location.pathname)` so the current page is counted.
- [ ] **Step 3:** In each lead form's success path, call `trackEvent("generate_lead", { form: "<id>" })`. Form ids: `contact`, `project_brief`, `package_starter`, `package_professional`, `package_enterprise`, `seo`, `health_check`, `audit_booking`, `concierge_waitlist`. Fire only after the submit has succeeded.
- [ ] **Step 4:** Add `VITE_GA_MEASUREMENT_ID` to `.env` using I1.
- [ ] **Step 5: Verify** with `npm run build && npm run preview`:
  - `grep -c "googletagmanager" dist/assets/*.js` prints 1 or more.
  - Fresh browser profile: before choosing, and after clicking Decline, the Network tab shows no request to `googletagmanager.com`.
  - After clicking Accept: `typeof window.gtag` is `"function"` and a `page_view` is pushed to `window.dataLayer`.
- [ ] **Step 6:** Report to the owner: in GA4, mark `generate_lead` as a key event.

---

### Task 3: One audit page with a real booking (audit item 3)

**Needs:** I2, I3, I4. Do Task 2 first (uses `trackEvent`).

**Files:**
- Modify: `src/pages/Resources/Audit/AuditPage.jsx`, `AuditThankYou.jsx`, `src/pages/Home.jsx` (~lines 21, 131, 184), `src/components/navigation/menus.js` (~line 109), `PlanCard.jsx` (~lines 14–15), `HealthThankYou.jsx` (~lines 15–16), `src/config/firebase.js`

- [ ] **Step 1:** Every button labelled "Book a strategy audit" or "Book an audit" links to `/resources/audit`: the nav `cta` in `menus.js`, the home hero button, and the quiz's result button. In `PlanCard.jsx`, only change the default if its label is an audit label; plan buttons are handled in Task 7.
- [ ] **Step 2:** The quiz result button passes the three answers to `/resources/audit` as query parameters (`?goal=…&revenue=…&timeline=…`, using the quiz's own keys). If I4 was supplied, replace the revenue bands at `Home.jsx:21` with it; otherwise leave them.
- [ ] **Step 3:** In `AuditPage.jsx`, replace the custom date and time form with the Cal.com inline embed for the I2 link. Use Cal's documented embed snippet (check current Cal.com embed docs; do not write it from memory). Pass the quiz answers, when present, into the booking notes. On Cal's booking-success event, call `trackEvent("generate_lead", { form: "audit_booking" })` and navigate to `/resources/audit/thank-you`.
- [ ] **Step 4:** Remove `submitAuditBooking` from `firebase.js` and its imports, since the form that used it is gone. Remove nothing else from that file.
- [ ] **Step 5:** Apply I3. If free: in `HealthThankYou.jsx` remove "R299" and "was R499" and describe the audit as free. If R299: state R299 on `AuditPage.jsx` and every audit button's surrounding copy, and remove "was R499".
- [ ] **Step 6:** `AuditThankYou.jsx`: keep "You'll receive a confirmation email shortly" (Cal.com sends it now).
- [ ] **Step 7: Verify.** Search `src` for `strategy audit` and `Book an audit`: every hit links to `/resources/audit`. Search for `R299` and `R499`: results match the I3 decision. In `npm run preview`, complete the quiz, land on the audit page with the answers in the URL, and see the Cal.com calendar render. Make one test booking and confirm the redirect and the confirmation email, then cancel it.

---

### Task 4: Public reviews and named client proof (audit item 4)

**Needs:** I5. Mostly owner work; the code part is small.

**Owner actions (not for the coding agent):**
- Create the Google Business Profile for 16 Hume Road.
- Ask the five listed clients and KB Legal for a Google review each.

**Files:**
- Modify: `src/data/projects.js` and the component that renders the five KPI tiles (find the tiles by the figures `PRODUCT.md` marks as unconfirmed)

- [ ] **Step 1:** For each client where I5 supplies a confirmed figure and a named quote, replace that client's KPI tile content with the one figure and the quote (name, role, company). Keep the existing tile layout.
- [ ] **Step 2:** For clients with no I5 data, remove the unconfirmed figure and show the client name and project type only.
- [ ] **Step 3: Verify.** No figure that `PRODUCT.md` marks as unconfirmed remains in `src`. `src/constants/index.js` testimonials stay unused and untouched.

---

### Task 5: Answer leads faster (audit item 5)

**Needs:** I6.

**Files:**
- Modify: `virtara-backend/index.js` (`/api/send-email`), `src/config/firebase.js`, the header component, `WebDevForm.jsx`, `Starter.jsx` and its Professional and Enterprise siblings, `src/pages/StartaProject.jsx`, the SEO form, `src/pages/Contact.jsx`

**Interfaces produced:**
- `POST /api/send-email` body: `{ subject, message, replyTo?, name? }`. Unchanged behaviour when `replyTo` is absent.
- `saveLead(lead: { form: string, name: string, email: string, phone?: string, details?: object }): Promise<{ success: boolean }>` exported from `src/config/firebase.js`. Writes to the `leads` collection with `submittedAt: serverTimestamp()`, following the pattern of the existing functions there.

- [ ] **Step 1:** Backend: when `replyTo` passes a basic email-shape check, add `reply_to: replyTo` to the Resend payload for the email to info@.
- [ ] **Step 2:** Backend: after that email succeeds and `replyTo` is valid, send a second Resend email to `replyTo`, from `Virtara <info@virtara.co.za>`, subject `We've got your message`, with this fixed body and nothing from the request except `name`, HTML-escaped: "Hi {name}, thanks for getting in touch with Virtara. We've received your enquiry and will reply within one business day. If it's urgent, call or WhatsApp +27 72 327 1040." A failure of this second email is logged and does not change the 200 response.
- [ ] **Step 3:** Frontend: add `saveLead` to `firebase.js`.
- [ ] **Step 4:** Every form that posts to `/api/send-email` sends `replyTo` (the visitor's email) and `name`, and calls `saveLead` with the same data. The submit succeeds if the email succeeds; a `saveLead` failure is logged only.
- [ ] **Step 5:** Render a phone field (`type="tel"`, optional, label "Phone or WhatsApp number") on the three package forms (state already has `phone` in `WebDevForm.jsx:87-103`), the project brief, the SEO form and the contact form. Include it in the email body and in `saveLead`. `Contact.jsx` uses EmailJS: add `phone` to the template parameters and call `saveLead`; leave the EmailJS transport as is.
- [ ] **Step 6:** Header: add the phone number as a `tel:` link and a WhatsApp link to `https://wa.me/27723271040` (digits from I6), on desktop and in the mobile menu, using existing header link styles. No floating button; the Concierge chat button already occupies the lower-right corner.
- [ ] **Step 7: Verify.**
  - Run the backend locally (`node virtara-backend/index.js`) and POST with and without `replyTo`; both return 200. Use an address you control and label the subject `[TEST]`.
  - In `npm run preview`, submit one package form with a test address: a `leads` document appears in Firestore. If Firestore rejects the write, stop and report that the `virtec-crm` rules need a create rule for `leads`; do not change rules from here.
  - Search `src` for `wa.me`: present in the header.
- [ ] **Step 8:** Report to the owner: (a) the backend must be redeployed for Steps 1–2 to go live; (b) in the EmailJS dashboard, set the contact template's Reply-To to the visitor's email and add the phone parameter; (c) create a Gmail filter so mail from `leads@virtara.co.za` is never sent to Promotions.

---

### Task 6: Let people start Concierge now (audit item 6)

**Needs:** I7.

**Files:**
- Modify: `src/pages/Concierge.jsx` (tiers at ~lines 36–42, and the waitlist section)

- [ ] **Step 1:** Replace the waitlist call to action with the offer "We set it up for you, free for 14 days". Its button links to `/contact-us?topic=concierge-trial`. Remove the waitlist form and any code only it used.
- [ ] **Step 2:** In `Contact.jsx`, when `topic=concierge-trial` is in the URL, prefill the message field with "I'd like the 14-day Concierge trial for my website: " and send `form: "concierge_trial"` to `trackEvent` and `saveLead` in place of `contact`.
- [ ] **Step 3:** Apply I7 to the Pro tier: either list the features the owner named, or delete the tier and let the two remaining cards use the existing grid.
- [ ] **Step 4: Verify.** Search `Concierge.jsx` for `waitlist`: no hits. In `npm run preview`, the trial button opens the contact form with the message prefilled.

**Out of scope:** self-serve sign-up, annual discounts and WhatsApp for Concierge. Those belong to the Concierge app, which is a separate project.

---

### Task 7: One set of prices everywhere (audit item 7)

**Needs:** I8, I9.

**Files:**
- Create: `src/data/pricing.js`
- Modify: `src/pages/Services.jsx` (~lines 50–78), `WebDevForm.jsx` (~lines 7–25), `Starter.jsx` and siblings, `src/pages/StartaProject.jsx` (~lines 157–162), `src/pages/MaintenanceSupport.jsx` (~lines 22–45), `PlanCard.jsx`, `menus.js` (Pricing menu labels)

**Interfaces produced** by `src/data/pricing.js`:
- `buildPlans`: array of `{ id: "launch" | "growth" | "commerce", name, price, priceLabel, features: string[] }`
- `carePlans`, `seoPlans`, `adsPlans`: arrays of `{ id, name, price, priceLabel, features, setupFee? }`
- Values are moved verbatim from `Services.jsx`, with I8 and I9 applied. This file is the only place a rand amount for a plan may appear.

- [ ] **Step 1:** Create `pricing.js` and make `Services.jsx` read all four tables from it. The rendered page must be unchanged.
- [ ] **Step 2:** `MaintenanceSupport.jsx` reads `carePlans`. Its prices now match `/services`.
- [ ] **Step 3:** The three package pages keep their URLs but take name, price and features from `buildPlans` (`/web-development/starter` → `launch`, `/professional` → `growth`, `/enterprise` → `commerce`). Show the price on each page. Rename the Pricing menu entries in `menus.js` to the `buildPlans` names.
- [ ] **Step 4:** `StartaProject.jsx`: replace the budget bands with one option per build plan, labelled from `buildPlans` (for example "Launch Site, R12,500"), plus "Not sure yet". Preselect the option whose id matches a `?plan=` query parameter.
- [ ] **Step 5:** Each build plan button on `/services` links to `/start-your-project?plan=<id>`.
- [ ] **Step 6: Verify.** Outside `src/data/pricing.js` and `src/pages/Concierge.jsx`, a search of `src/pages` and `src/components` for `R\d` finds no plan price. In `npm run preview`, clicking "Growth" on `/services` opens the brief with Growth selected. `src/constants/index.js` (old, unused `pricingTiers`) is left untouched.

---

### Task 8: Low-risk start and printed delivery times (audit item 8)

**Needs:** I10, I11. Do Task 7 first.

**Files:**
- Modify: `src/data/pricing.js`, `src/pages/Services.jsx`, the three package pages, `src/pages/Legal/TermsOfService.jsx` (section 4)

- [ ] **Step 1:** Add `weeks` (string, e.g. "2–3 weeks") and `deposit` (string, e.g. "50% to start, 50% at launch") to each entry in `buildPlans`, from I10. Add `instalments` (string) to `launch` only.
- [ ] **Step 2:** Show `weeks` and `deposit` on each build plan card on `/services` and on each package page, as two lines in the card's existing feature-list style. Show `instalments` on the Launch card only.
- [ ] **Step 3:** In `TermsOfService.jsx` section 4, replace the sentence saying payment terms vary with the deposit terms from I10.
- [ ] **Step 4:** Only if I11 is "yes": remove `setupFee` from `seoPlans` and state the new monthly price the owner gives for the first three months. Otherwise change nothing.
- [ ] **Step 5: Verify.** `grep -c 'weeks' dist/services/index.html` prints 3 or more after `npm run build`.

---

### Task 9: Recurring plans for existing clients (audit item 9)

No code. The audit rated this evidence as thin, so the owner decides whether to send anything.

**Files:**
- Create: `docs/audit/2026-11-11-client-offer-email.md`

- [ ] **Step 1:** Draft one email the owner can adapt per client: a single monthly bundle of hosting, a care plan and Concierge, paid by debit order. Take plan names and prices from `src/data/pricing.js` and `Concierge.jsx`. Leave the bundle price and the client's name as clearly marked blanks; do not propose a discount figure.
- [ ] **Step 2:** Do not send anything and do not add anything to the site.

---

### Task 10: Checklist follow-up and blog revival (audit item 10)

**Files:**
- Modify: `src/config/firebase.js` (`subscribeToNewsletter`, ~lines 42–47) or `HealthCheck.jsx`, whichever is the smaller change
- Create: `docs/audit/2026-11-11-checklist-email-sequence.md`, `docs/audit/2026-11-11-blog-drafts.md`

- [ ] **Step 1:** A visitor whose email is already stored must still get the checklist. In `HealthCheck.jsx`, treat the "already subscribed" result as success and continue to the thank-you page. Other failures keep the current error message. Do not change `subscribeToNewsletter`'s return shape, because other callers may use it.
- [ ] **Step 2:** Write the three-email follow-up sequence as copy for the owner to load into Sender (trigger: tag `website-health-check`): day 0 delivers the checklist link, day 3 explains the three most common failures on it, day 7 offers the audit and links to `/resources/audit`. State the audit price as decided in I3.
- [ ] **Step 3:** Draft two blog posts for the owner to publish in Sanity: "How much does a website cost in South Africa?" and "Web design in Johannesburg: what to look for". Use only Virtara's own prices from `pricing.js`. Do not quote competitor prices or names.
- [ ] **Step 4: Verify.** In `npm run preview`, submit the checklist form twice with the same test address: both attempts reach the thank-you page.
- [ ] **Step 5:** Report to the owner: the Sender automation and the Sanity publishing are manual steps, and blog posts will not appear in prerendered HTML (see Task 1 known limits).

---

## Final report (what the agent hands back)

1. Per task: done, partly done (and which owner input was missing), or not started.
2. Output of `npm run lint` and `npm run build`.
3. The owner follow-ups collected from Tasks 1, 2, 4, 5 and 10.
4. Anything noticed and deliberately left alone.

---

## Owner decisions (2026-11-11) — these override the task text above

- **I1 GA ID:** not supplied. Task 2 ships the code only. Do not touch `.env`.
- **I2 Cal.com link:** not supplied. **Task 3 Steps 3, 4 and 6 are replaced:** keep the existing date/time form and `submitAuditBooking`. Add the quiz answers (from the query string, when present) to the booking data. After `submitAuditBooking` succeeds, POST to `/api/send-email` with `subject`, `message` (the booking details), `replyTo` and `name`, the same way the other forms do after Task 5, so the owner is notified and the visitor gets the auto-reply. Then fire `trackEvent("generate_lead", { form: "audit_booking" })`. In `AuditThankYou.jsx` keep the confirmation-email sentence.
- **I3:** the audit is **free**.
- **I4:** not supplied. Leave the quiz bands unchanged.
- **I5:** not supplied. Task 4 does Step 2 for every client (remove unconfirmed figures); Step 1 is skipped.
- **I6:** WhatsApp number is +27 72 327 1040.
- **I7:** **drop the Pro tier.**
- **I8:** Launch R12,500 / Growth R28,000 / Commerce from R55,000.
- **I9:** care plans are **R1,000 / R2,500 / R5,000** (the `/maintenance-support` values). Where the two pages' plan names or features differ, use the `/maintenance-support` ones.
- **I10:** Launch 2–3 weeks, Growth 4–6 weeks, Commerce 8–12 weeks. Deposit for all three: "50% to start, 50% at launch". **No instalment offer:** skip the `instalments` field.
- **I11:** no change to SEO setup fees. Skip Task 8 Step 4.

## Rules for agents working in parallel

- Other agents are editing other files in this same working tree at the same time. Edit and commit **only** the files your task lists. If you believe you must touch another file, stop and say so in your report instead.
- Do not run `npm run build` (it writes to the shared `dist/`). Check your work with `npx eslint <your files>` and `npx vite build --outDir <your scratch dir>`; the coordinator runs the full build. If the compile fails in a file you did not touch, wait a minute and retry once, then report it.
- Commit your task as one commit on `develop`: `git add <your new files>` then `git commit -m "<message>" -- <your files>` (the pathspec form, so nobody else's changes are included). If git reports an index lock, wait and retry. Never use `git add -A`, `git add .`, `git stash`, `git reset`, `git checkout` on files, or `git push`. Never touch `.gitignore`.
- End the commit message with: `Co-Authored-By: Claude <noreply@anthropic.com>`
