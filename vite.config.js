import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import VitePluginSitemap from 'vite-plugin-sitemap'
import publicRoutes from './scripts/public-routes.mjs'

// https://vite.dev/config/
export default defineConfig({
  // react-helmet-async ships CJS that Node cannot named-import; bundle it for the prerender.
  ssr: { noExternal: ['react-helmet-async'] },
  plugins: [
    react(),
    VitePluginSitemap({
      hostname: 'https://virtara.co.za',
      dynamicRoutes: publicRoutes.filter((r) => r !== '/'),
    })
  ],
})
