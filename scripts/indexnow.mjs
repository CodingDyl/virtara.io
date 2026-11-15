import { readFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// Tell IndexNow engines (Bing and others) which URLs exist. Production builds
// only, and a failure here never fails the build.
const KEY = '11881540007e41b90637e2e7b850bf3e'
const HOST = 'virtara.co.za'

if (process.env.VERCEL_ENV !== 'production') {
  console.log('indexnow: skipped (not a production build)')
  process.exit(0)
}

try {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
  const sitemap = await readFile(join(root, 'dist', 'sitemap.xml'), 'utf8')
  const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
  })
  console.log(`indexnow: submitted ${urlList.length} urls, status ${res.status}`)
} catch (err) {
  console.warn(`indexnow: failed, ignoring: ${err.message}`)
}
process.exit(0)
