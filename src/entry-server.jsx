import { Writable } from 'node:stream'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'

// Pages are React.lazy, so renderToString would emit only the loading
// spinner. Waiting for onAllReady resolves every lazy page first.
export function render(url) {
  const helmetContext = {}
  return new Promise((resolve, reject) => {
    let html = ''
    const sink = new Writable({
      write(chunk, _enc, cb) {
        html += chunk.toString()
        cb()
      },
    })
    sink.on('finish', () => {
      const { helmet } = helmetContext
      const head = helmet
        ? [helmet.title, helmet.meta, helmet.link].map((h) => h.toString()).join('')
        : ''
      resolve({ html, head })
    })
    const stream = renderToPipeableStream(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>,
      {
        onAllReady() {
          stream.pipe(sink)
        },
        onShellError: reject,
        onError: reject,
      },
    )
  })
}
