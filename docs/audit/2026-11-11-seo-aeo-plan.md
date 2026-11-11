# SEO + AEO Packages — Research and Implementation Plan

**Goal:** Advertise answer engine optimisation (AEO) as part of Virtara's SEO packages, priced on the model competitors use.

**Owner decision (2026-11-11):** bundle AEO into the three existing SEO tiers, keep the current prices and setup fees, and add one once-off "AEO Starter" at R7,500.

## Research: five SA competitors that publish SEO + AEO prices

Prices are from each agency's own site, read on 2026-11-11, excluding VAT where they say so.

| Agency | Model | SEO + AEO price | AEO on its own |
|---|---|---|---|
| Juicy Designs | SEO retainer described as "SEO and AI visibility"; AEO also sold separately | SEO from R5,500/mo, no setup fee | Starter R7,500 once-off; programme R9,500/mo; with content R15,000/mo. Month-to-month |
| SearchKings Africa | Bundled "SEO & AI Visibility" tiers | R8,999 / R17,999 / R24,999 per month; onboarding R8,999 / R12,999 / custom | not sold separately |
| Dezignit | Bundled "SEO + AI Search" tiers | R7,500 (local) / R12,500 (national) / R30,000 per month | not sold separately |
| Honey Whale | Separate AEO retainer, or combined | Combined SEO + AEO from R18,500/mo | Lite R9,500/mo (3-month minimum); Full R16,500/mo (6-month minimum) |
| SEO Packages SA | Separate product lines | Local R3,500–R11,000/mo; Organic R11,500–R50,000/mo | Audit R4,950 once-off; retainers from R7,500/mo |

For reference, MO Agency sits above this band: AEO/GEO from R22,500/mo on a 12-month contract.

**What this shows**
- Three of five bundle AEO into their SEO tiers. Bundled entry prices are R7,500–R8,999/mo; Virtara's entry tier is R4,500/mo and its top tier is R14,500/mo, so Virtara undercuts all three at every level.
- A once-off AEO starter or audit (R4,950–R7,500) is the common low-commitment entry. R7,500 matches Juicy Designs, the closest competitor on web prices.
- Onboarding fees are normal in the bundled model (SearchKings R8,999+), so Virtara's R3,500–R8,500 setup fees stay.

Sources: juicydesigns.co.za/services/aeo-optimisation-south-africa and /pricing; searchkingsafrica.com/seo-packages-demo; dezignit.co.za/seo; honeywhale.co.za/services/aeo and /blog/how-much-does-seo-cost-south-africa; seopackages.co.za; mo.agency/aeo-geo-agency-south-africa.

## Global constraints

- Scope is closed: only the changes below. No new pages, routes, components or styles. No changes to prices, setup fees, forms' transport, or any non-SEO plan.
- Work on `develop`, no worktrees. Before editing any `.jsx` invoke the `impeccable` and `ui-ux-pro-max` skills; before any code, `karpathy-guidelines`. Reuse existing components and `DESIGN.md` tokens.
- The site is prerendered at build: nothing may touch `window`/`document`/`localStorage` during render.
- Copy rules: use the wording given here verbatim. Never promise rankings, citations or results. Do not name or compare competitors on the site. Write "AEO" and expand it once per page as "answer engine optimisation (AEO)".
- Every rand amount lives in `src/data/pricing.js` only.
- One commit per task in pathspec form (`git commit -m "…" -- <files>`), message ending `Co-Authored-By: Claude <noreply@anthropic.com>`. Never `git add -A`, never push, never touch `.gitignore`.
- Gate: `npm run lint` and `npm run build` exit 0, and the build prints 17 "prerendered" lines.

---

### Task A: Plans, services page, menus, home tile

**Files:** `src/data/pricing.js`, `src/pages/Services.jsx`, `src/components/navigation/menus.js`, `src/components/home/ServicesRail.jsx`

- [ ] **Step 1: `pricing.js`, `seoPlans`.** Keep `id`, `price`, `priceLabel`, `setupFee`, `highlighted` and all existing feature lines. Change only:

  | id | new `name` | new `idealFor` | feature lines to append |
  |---|---|---|---|
  | `local` | `Local SEO + AEO Foundation` | `Local service businesses that want to be found on Google and in AI answers.` | `Answer-ready FAQ sections with FAQ schema on key pages`; `Baseline check of how AI assistants describe your business` |
  | `growth-engine` | `SEO + AEO Growth Engine` | `SMEs that need steady lead growth from search and AI assistants.` | `AEO structure on every page we optimise: direct answers, FAQs and schema`; `Monthly AI visibility check across ChatGPT, Gemini, Perplexity and Google AI Overviews` |
  | `competitive` | `Competitive SEO + AEO` | `High-competition niches or multi-location businesses.` | `AI visibility tracked against named competitors`; `Brand and entity consistency work across the sources AI assistants read` |

- [ ] **Step 2: `pricing.js`, new export `aeoStarter`:**

  ```js
  export const aeoStarter = {
    id: 'aeo-starter',
    name: 'AEO Starter',
    price: 'R7,500',
    priceLabel: 'R7,500 once-off',
    idealFor: 'Businesses that want to be AI-ready before committing to a monthly retainer.',
    features: [
      'Answer-ready rewrite of up to 10 priority pages',
      'FAQ and Q&A schema on those pages',
      'AI visibility baseline: how ChatGPT, Gemini, Perplexity and Google AI Overviews describe you today',
      'One round of revisions'
    ]
  };
  ```

- [ ] **Step 3: `Services.jsx`.**
  - `serviceCatalog`: `'Technical + Content SEO'` → `'SEO + AEO (AI search)'`.
  - Tab label `'SEO & Content'` → `'SEO + AEO'`; section title `'SEO & Content Systems'` → `'SEO + AEO Systems'`; subtitle → `'Rank on Google and get named in AI answers. Month-to-month retainers, no lock-in contracts.'`
  - Under the SEO tab's card grid only, add one line of body text in the page's existing muted note style: `Not ready for a retainer? {aeoStarter.name}, {aeoStarter.priceLabel}: an answer-ready rewrite of up to 10 pages, schema and an AI visibility baseline.` followed by a text link `See SEO + AEO` to `/seo`. It must not appear under the other tabs.
  - Meta description: `web development, SEO, paid media` → `web development, SEO and AEO, paid media`. Meta keywords: append `, AEO pricing South Africa, answer engine optimisation`.
- [ ] **Step 4: `menus.js`.** Line ~32: desc → `Technical, local and content SEO with AEO built in`. Line ~62: title `SEO packages` → `SEO + AEO packages`, desc → `Rank on Google and get named by AI assistants`. Change nothing else.
- [ ] **Step 5: `ServicesRail.jsx`.** In the SEO tile only (title `"SEO & content"`, ~line 152): title → `"SEO + AEO"`, and append this sentence to its description: `AEO is built in, so AI assistants can find and quote you too.` Leave prices and everything else.
- [ ] **Step 6: Verify.** Gate passes. `grep -c 'AEO' dist/services/index.html` ≥ 1 and `grep -c 'AEO' dist/index.html` ≥ 1. `grep -o 'R4,500/mo\|R8,500/mo\|R14,500/mo' dist/services/index.html` still shows all three (the SEO tab may not be the prerendered tab; if so, confirm the prices by reading `pricing.js` and say so). Check the SEO tab at 390px and 1440px in a browser if you have one.

### Task B: The `/seo` page (after Task A)

**Files:** `src/pages/TailoredRoutes/Seo/Seo.jsx` only. Consumes `seoPlans` and `aeoStarter` from `src/data/pricing.js`.

- [ ] **Step 1: Head.** Title → `SEO + AEO Services | Get Found on Google and in AI Answers | Virtara`. Description → `SEO and answer engine optimisation (AEO) for South African businesses. Rank on Google and get named when people ask ChatGPT, Gemini or Perplexity. From R4,500 a month.` (take the R4,500 from `seoPlans[0].price`, not a literal). Keywords: append `, AEO, answer engine optimisation, AI search optimisation South Africa`. Canonical unchanged.
- [ ] **Step 2: Hero.** Label `SEO + AEO services`. Title `Get found on Google and in AI answers.` Lead `SEO gets you ranked. Answer engine optimisation (AEO) gets you named when people ask ChatGPT, Gemini, Perplexity or Google's AI Overviews. Every Virtara SEO package now includes both.` Buttons: `Get your free SEO + AEO analysis` (same anchor) and `See SEO + AEO packages` (same link).
- [ ] **Step 3: Benefits.** Keep the four existing cards. Replace the fourth card's copy (`Build Authority`) with title `Show up in AI answers` and description `Clear answers, FAQs and schema make it easier for AI assistants to find, trust and quote your business`. Same icon.
- [ ] **Step 4: AEO Starter.** Directly after the benefits grid, add one block using the page's existing card style (border, radius and background tokens already used on this page): heading `{aeoStarter.name}`, price `{aeoStarter.priceLabel}`, the `idealFor` line, the four features as the page's existing checklist style, and a button `Ask about AEO Starter` linking to the same form anchor as the hero button. One block, no new component file.
- [ ] **Step 5: Form.** Add one `CheckboxCard` to the additional services group: name `aeo`, label `AEO (AI search visibility)`, default `false`. Add `- AEO: Yes/No` to the email body after Link Building. Change nothing else in the form, `saveLead` or `trackEvent`.
- [ ] **Step 6: Verify.** Gate passes. `grep -c 'AEO Starter' dist/seo/index.html` ≥ 1, `grep -c 'R7,500' dist/seo/index.html` ≥ 1, and `grep -c 'rel="canonical"' dist/seo/index.html` is 1. A search of `Seo.jsx` for `R\d` finds no literal rand amount. Do not submit the form. Check the page at 390px and 1440px in a browser if you have one.

## Out of scope

`SeoThankYou.jsx`, the blog drafts, the Footer blurb, FAQ structured data on Virtara's own pages, and any AEO tooling. The docs in `docs/audit/` are not updated.
