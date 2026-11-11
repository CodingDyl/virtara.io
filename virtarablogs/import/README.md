# Publish the two November 2026 blog posts

`2026-11-posts.ndjson` holds two `post` documents (ids `post-website-cost-south-africa` and `post-web-design-johannesburg`), built from `docs/audit/2026-11-11-blog-drafts.md`.

## Publish

```sh
cd virtarablogs
npm install            # first time only
npx sanity login
npx sanity dataset import import/old-project-posts.ndjson production --replace
npx sanity dataset import import/2026-11-posts.ndjson production --replace
```

`--replace` overwrites documents with the same `_id`, so re-running is safe. The posts go live immediately (no draft step).

## Check

- `https://virtara.co.za/web-development-blog` lists both posts, newest first.
- `https://virtara.co.za/web-development-blog/website-cost-south-africa`
- `https://virtara.co.za/web-development-blog/web-design-johannesburg`
- Raw data: `https://h9swrh5t.api.sanity.io/v2024-03-20/data/query/production?query=*[_type=="post"&&_id match "post-web*"]{_id,title}` (the site reads through the CDN, so allow a minute).

The posts have no main image: cards show an empty dark box, and the article page omits the image block. Add one in Studio (`npx sanity dev`, open the post, set Main image) if wanted.

## Remove

```sh
cd virtarablogs
npx sanity documents delete post-website-cost-south-africa post-web-design-johannesburg
```
