import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import VitePluginSitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePluginSitemap({
      hostname: 'https://virtara.co.za',
      dynamicRoutes: [
        '/contact-us',
        '/services',
        '/our-work',
        '/web-development-blog',
        '/maintenance-support',
        '/start-your-project',
        '/seo',
        '/web-development/starter',
        '/web-development/professional',
        '/web-development/enterprise',
        '/resources/health-check',
        '/resources/audit',
        '/legal/privacy-policy',
        '/legal/terms-of-service',
        '/legal/cookie-policy'
      ],
    })
  ],
})
