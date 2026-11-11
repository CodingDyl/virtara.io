# Website Health Check: three-email follow-up sequence

Copy for the owner to load into Sender as an automation.

**Trigger:** subscriber gets the tag `website-health-check` (the site's `/api/subscribe` already applies it).
**Timing:** email 1 immediately, email 2 three days later, email 3 seven days after sign-up (four days after email 2).
**From:** Virtara, info@virtara.co.za. **Reply-to:** info@virtara.co.za, so replies reach a person.
**Merge field:** `{$firstname}` is Sender's first-name field. Check the exact merge tag in your Sender template editor.
**Before loading:** replace `[CHECKLIST LINK]` with the public URL of `website-health-check.pdf` (the file lives in `virtara-backend/public/`). Confirm it opens in a private browser window.

Notes on facts: the audit is free and about 30 minutes (the checklist PDF itself still says "R299" and "virtara.co.za/audit", see the owner note at the end). The three failures in email 2 are items 1, 3 and 4 on the checklist. No statistics are quoted, on purpose: the PDF contains figures ("20% per second", "over 60% mobile", "doubles conversions") that the audit did not confirm, so they are left out here.

---

## Email 1: day 0 (delivers the checklist)

**Subject:** Your 5-Minute Website Health Check
**Preview text:** Open it on your phone, it takes five minutes.

Hi {$firstname},

Thanks for asking for the checklist. Here it is:

**[Download the 5-Minute Website Health Check]([CHECKLIST LINK])**

How to use it:

1. Have your own website open, on both your laptop and your phone.
2. Go through the five questions and tick each one honestly.
3. Add up your score at the end.

If you land on 3 or lower, that's not a verdict on your business. It usually means a handful of fixable things are sitting between your website and your next enquiry.

In a few days I'll send you a short note on the three checks people most often get stuck on, and how to fix them.

If you get stuck anywhere, reply to this email. It comes straight to me.

Regards,
Dylan
Virtara, Johannesburg

---

## Email 2: day 3 (three failures from the checklist)

**Subject:** Three checks on the list that cost you enquiries
**Preview text:** Speed, Google and one clear button.

Hi {$firstname},

Did you get through the checklist? If you haven't yet, it's still five minutes: [CHECKLIST LINK]

Three of the five checks are the ones we'd look at first on any site, because they sit directly between a visitor and an enquiry.

**1. Your site is slow to load (check 1)**
If a page takes a long time to show up, many people leave before they see anything. Test yours on Google's PageSpeed Insights, on your phone's connection, not your office wifi. The usual causes are heavy images and cheap hosting. Compressing the biggest images is often the quickest win.

**2. People can't find you on Google (check 3)**
Search for your business type plus your city, the way a customer would, for example "plumber Durban". If you're nowhere on the first page, you're invisible to people who were ready to buy. Start with the basics: a Google Business Profile that is complete, your town or suburb named on the page, and a page for each service you offer.

**3. There's no obvious next step (check 4)**
Open your homepage and ask: if I had ten seconds, what would I click? If the answer isn't one clear button such as "Request a quote" or "Call us", visitors have to work out what to do, and many won't. One main action, repeated in the right places, beats five options.

If any of these came up on your checklist, you don't have to fix them alone. In a few days I'll tell you how we can look at your site with you, at no cost.

Regards,
Dylan
Virtara

---

## Email 3: day 7 (offers the free audit)

**Subject:** A free 30-minute look at your website
**Preview text:** We'll show you what's worth fixing first.

Hi {$firstname},

A week ago you ran our health check on your website. Whatever score you got, the next question is usually "what do I fix first?"

That's what our website audit is for. It's a 30-minute session, and it's free. We go through your site with you, find the issues that are costing you enquiries, and give you a short plan in order of priority.

**[Book your free website audit](https://virtara.co.za/resources/audit)**

What happens:

- You pick a date and time that suits you.
- We look at your site beforehand, so the call isn't spent on basics.
- You leave with a plan you can act on yourself, or with us. There's no obligation either way.

If now isn't the right time, that's fine. The checklist is yours to keep and reuse whenever you update the site.

Regards,
Dylan
Virtara
16 Hume Road, Johannesburg

*(Sender requires an unsubscribe link in the footer of every email. Keep the default one.)*

---

## Owner notes

- `HealthThankYou.jsx` and the checklist PDF both still mention the audit price (R299, "was R499") and an old audit URL. Task 3 of the plan removes the page text; the PDF needs re-exporting by hand with "free" and `virtara.co.za/resources/audit`.
- Email 2 says "at no cost" and email 3 says "free", consistent with the I3 decision.
- Sign-off name and role are placeholders from the footer's details. Change to whoever should be replying.
