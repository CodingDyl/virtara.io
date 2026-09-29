# Lead magnets

Each lead magnet is one JSON file here, exported from AgentOS
(Traction > Lead magnets > Download for the site). Its cover image, if any,
goes in `public/lead-magnets/`.

A file here is live once deployed:

- `/guides/<slug>`: the landing page with the signup form
- `/guides/<slug>/read`: the resource itself, after signing up
- `/guides`: every guide

Signups go to Virtec as source `magnet-<slug>` through `/api/lead` on
virtara-backend. Files for the Jurivo site (`"track": "jurivo"`) are ignored.
Edit content in AgentOS and export again rather than editing here, so the two
never drift apart.
