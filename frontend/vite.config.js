import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { getPageSeo, getPublicPaths, renderSeoHead } from './src/constants/seo.js'

export default defineConfig({
  server: { proxy: { '/api': 'http://localhost:3000' } },
  preview: { proxy: { '/api': 'http://localhost:3000' } },
  plugins: [react(), tailwindcss(), {
    name: 'portfolio-seo',
    transformIndexHtml(html) {
      return html.replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, () => `<!--seo:start-->\n    ${renderSeoHead(getPageSeo('/'))}\n    <!--seo:end-->`)
    },
    configurePreviewServer(server) {
      // Match the clean-URL rewrites configured for the Render static site.
      server.middlewares.use((request, response, next) => {
        const url = new URL(request.url, 'http://localhost')
        const pathname = url.pathname.replace(/\/+$/, '') || '/'
        if (pathname === '/api' || pathname.startsWith('/api/')) return next()
        if (getPublicPaths().includes(pathname)) {
          request.url = `${pathname === '/' ? '' : pathname}/index.html${url.search}`
        } else if (!pathname.includes('.') && request.headers.accept?.includes('text/html')) {
          readFile(resolve(server.config.root, server.config.build.outDir, '404.html'))
            .then(html => {
              response.statusCode = 404
              response.setHeader('Content-Type', 'text/html; charset=utf-8')
              response.end(html)
            })
            .catch(next)
          return
        }
        next()
      })
    },
  }],
})
