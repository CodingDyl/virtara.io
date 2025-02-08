import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import VitePluginSitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePluginSitemap({
      hostname: 'https://www.virtara.co.za', // Replace with your actual domain
      routes: [
        '/',
        '/contact',
        '/services',
        '/portfolio',
        '/blog',
        '/brand-strategy',
        '/starta-project',
        '/privacy-policy',
        '/terms-of-service',
        '/cookie-policy'
      ],
    })
  ],
})
