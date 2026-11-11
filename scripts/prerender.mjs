import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import routes from './public-routes.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const { render } = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href)
const template = await readFile(join(dist, 'index.html'), 'utf8')

// Root last so the template is never overwritten while others are rendered.
const ordered = [...routes.filter((r) => r !== '/'), '/']

for (const route of ordered) {
  let result
  try {
    result = await render(route)
  } catch (err) {
    console.error(`Prerender failed for route ${route}:`, err)
    process.exit(1)
  }
  const page = template
    .replace('<div id="root"></div>', () => `<div id="root" data-prerendered="${route}">${result.html}</div>`)
    .replace('</head>', () => `${result.head}</head>`)
  const out = route === '/' ? join(dist, 'index.html') : join(dist, route, 'index.html')
  await mkdir(dirname(out), { recursive: true })
  await writeFile(out, page)
  console.log(`prerendered ${route}`)
}
