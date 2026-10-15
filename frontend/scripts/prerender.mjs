import { build } from 'vite'
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'
import { getPageSeo, getPublicPaths, renderSeoHead, SITE_URL } from '../src/constants/seo.js'

const root = fileURLToPath(new URL('..', import.meta.url))
const serverOutput = resolve(root, 'dist-ssr')
const output = resolve(root, 'dist')

try {
  await build({ root, build: { ssr: 'src/entry-server.jsx', outDir: serverOutput, emptyOutDir: true, copyPublicDir: false, rollupOptions: { output: { entryFileNames: 'entry-server.mjs' } } } })
  const { render } = await import(pathToFileURL(resolve(serverOutput, 'entry-server.mjs')).href)
  const template = await readFile(resolve(output, 'index.html'), 'utf8')
  if (!template.includes('<!--seo:start-->') || !template.includes('<div id="root"></div>')) throw new Error('The prerender HTML template markers are missing')
  for (const pathname of [...getPublicPaths(), '/404']) {
    const seo = getPageSeo(pathname)
    const html = template
      .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, () => `<!--seo:start-->\n    ${renderSeoHead(seo)}\n    <!--seo:end-->`)
      .replace('<div id="root"></div>', () => `<div id="root" data-prerendered="${pathname !== '/404'}">${render(pathname)}</div>`)
    const target = pathname === '/404' ? resolve(output, '404.html') : resolve(output, pathname.slice(1), 'index.html')
    await mkdir(dirname(target), { recursive: true })
    await writeFile(target, html)
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${getPublicPaths().map(pathname => `  <url><loc>${SITE_URL}${pathname === '/' ? '/' : pathname}</loc></url>`).join('\n')}\n</urlset>\n`
  await writeFile(resolve(output, 'sitemap.xml'), sitemap)
  console.log(`Prerendered ${getPublicPaths().length} public pages, a noindex 404 page, and sitemap.xml.`)
} finally {
  await rm(serverOutput, { recursive: true, force: true })
}
