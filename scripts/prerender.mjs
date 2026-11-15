import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import routes from './public-routes.mjs'

const SITE = 'https://virtara.co.za'
const BLOG = '/web-development-blog'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const { render } = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href)
const template = await readFile(join(dist, 'index.html'), 'utf8')

// Blog posts live in Sanity. If it cannot be reached the site still builds,
// just without post pages (they then load in the browser as before).
let posts = []
try {
  const { client, POSTS_QUERY, POST_QUERY } = await import(pathToFileURL(join(root, 'src', 'lib', 'sanity.js')).href)
  const list = await client.fetch(POSTS_QUERY)
  const full = await Promise.all(list.filter((p) => p.slug).map((p) => client.fetch(POST_QUERY, { slug: p.slug })))
  posts = full.filter(Boolean)
  console.log(`fetched ${posts.length} blog posts from Sanity`)
} catch (err) {
  console.warn(`WARNING: could not fetch blog posts from Sanity, building without post pages: ${err.message}`)
}

// Embedded in the page as JSON; "<" is escaped so it cannot close the script tag.
const embed = (data) => JSON.stringify(data).replace(/</g, '\\u003c')

const attr = (head, re) => head.match(re)?.[1]

// Put one page's title, description and canonical into the template: the
// template's own copies are replaced, never duplicated.
function buildPage(route, result, data) {
  const { head } = result
  let page = template
  const title = attr(head, /<title[^>]*>([\s\S]*?)<\/title>/)
  const description = attr(head, /<meta[^>]*name="description"[^>]*content="([^"]*)"/)
  const canonical = attr(head, /<link[^>]*rel="canonical"[^>]*href="([^"]*)"/)

  if (title !== undefined) page = page.replace(/<title>[\s\S]*?<\/title>\s*/, '')
  if (description !== undefined) page = page.replace(/<meta\s+name="description"[^>]*>\s*/, '')

  const set = (key, value) => {
    if (value === undefined) return
    const re = new RegExp(`(<meta\\s+(?:property|name)="${key}"\\s+content=")[^"]*(")`)
    if (!re.test(page)) throw new Error(`template has no ${key} tag`)
    page = page.replace(re, (_m, a, b) => `${a}${value}${b}`)
  }
  set('og:title', title)
  set('og:description', description)
  set('og:url', canonical)
  set('twitter:title', title)
  set('twitter:description', description)

  const dataScript = data ? `<script id="prerender-data" type="application/json">${embed(data)}</script>` : ''
  return page
    .replace('<div id="root"></div>', () => `<div id="root" data-prerendered="${route}">${result.html}</div>${dataScript}`)
    .replace('</head>', () => `${head}</head>`)
}

const pages = []
for (const route of routes) {
  pages.push({
    route,
    data: route === BLOG ? { posts } : null,
    out: route === '/' ? join(dist, 'index.html') : join(dist, route, 'index.html'),
  })
}
for (const post of posts) {
  pages.push({ route: `${BLOG}/${post.slug}`, data: { post }, out: join(dist, BLOG, post.slug, 'index.html') })
}
// A URL no route matches renders the NotFound page. Vercel serves 404.html for unknown paths.
pages.push({ route: '/404', render: '/404-not-found', data: null, out: join(dist, '404.html'), skipSitemap: true })

// Root last so the template is never overwritten while others are rendered.
const ordered = [...pages.filter((p) => p.route !== '/'), ...pages.filter((p) => p.route === '/')]

for (const p of ordered) {
  let result
  try {
    result = await render(p.render ?? p.route, p.data)
  } catch (err) {
    console.error(`Prerender failed for route ${p.route}:`, err)
    process.exit(1)
  }
  await mkdir(dirname(p.out), { recursive: true })
  await writeFile(p.out, buildPage(p.route, result, p.data))
  console.log(`prerendered ${p.route}`)
}

// Sitemap: static pages carry the build date, posts their own last edit.
const buildDate = new Date().toISOString()
const entries = ordered
  .filter((p) => !p.skipSitemap)
  .map((p) => ({ loc: p.route === '/' ? `${SITE}/` : `${SITE}${p.route}`, lastmod: p.data?.post?._updatedAt ?? buildDate }))
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((e) => `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n  </url>`).join('\n')}
</urlset>
`
await writeFile(join(dist, 'sitemap.xml'), sitemap)
console.log(`sitemap: ${entries.length} urls`)
