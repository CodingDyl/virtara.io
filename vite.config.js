import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The sitemap is written by scripts/prerender.mjs, which knows the blog posts.
// https://vite.dev/config/
export default defineConfig({
  // react-helmet-async ships CJS that Node cannot named-import; bundle it for the prerender.
  ssr: { noExternal: ['react-helmet-async'] },
  plugins: [
    react(),
  ],
})
