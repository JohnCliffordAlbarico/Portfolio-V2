import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { getPublicPaths, getPageSeo, SITE_URL } from '../src/constants/seo.js'
import { PROJECTS } from '../src/constants/projects.js'

const readOutput = path => readFile(new URL(`../dist/${path}`, import.meta.url), 'utf8')

test('every public page contains its real React-rendered content and page-specific head', async () => {
  for (const path of getPublicPaths()) {
    const html = await readOutput(`${path === '/' ? '' : path.slice(1) + '/'}index.html`)
    const seo = getPageSeo(path)
    assert.match(html, /data-prerendered="true"/)
    assert.match(html, /<h1[\s>]/)
    assert.ok(html.includes(`href="${seo.canonical}"`), path)
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1, path)
    assert.equal((html.match(/<title>/g) || []).length, 1, path)
    assert.match(html, /name="robots" content="index, follow"/)
    const body = html.split('<div id="root"')[1]
    assert.ok(body.includes('John Clifford'), path)
    const data = JSON.parse(html.match(/id="structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])
    assert.ok(data['@graph'].some(node => node['@type'] === 'Person'))
    for (const asset of html.matchAll(/(?:src|href)="(\/assets\/[^"?]+)"/g)) await access(new URL(`../dist${decodeURIComponent(asset[1])}`, import.meta.url))
  }
})

test('the introduction, About biography, and all case studies exist without JavaScript', async () => {
  assert.match(await readOutput('index.html'), /Building digital experiences that work\./)
  const about = await readOutput('about/index.html')
  assert.match(about, /BSIT graduate/)
  assert.match(about, /Open Space Technology/)
  assert.match(await readOutput('contact/index.html'), /<form[^>]*method="post"/, 'A non-JavaScript form submission must not put contact details in the URL')
  for (const project of PROJECTS) {
    const html = await readOutput(`projects/${project.slug}/index.html`)
    assert.ok(html.includes(project.title.replaceAll('&', '&amp;')), project.slug)
    assert.ok(html.includes(project.modules[0].title.replaceAll('&', '&amp;')), project.slug)
  }
})

test('sitemap and robots point at only canonical public URLs', async () => {
  const sitemap = await readOutput('sitemap.xml')
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1])
  assert.deepEqual(urls, getPublicPaths().map(path => getPageSeo(path).canonical))
  assert.ok(!sitemap.includes('<lastmod>'), 'Do not publish build time as a fake content modification date')
  assert.match(await readOutput('robots.txt'), /User-agent: \*\s+Allow: \//)
  assert.ok((await readOutput('robots.txt')).includes(`Sitemap: ${SITE_URL}/sitemap.xml`))
  assert.match(await readOutput('404.html'), /name="robots" content="noindex, follow"/)
  assert.ok(!(await readOutput('404.html')).includes('rel="canonical"'))
  assert.match(await readOutput('404.html'), /data-prerendered="false"/, 'A generic 404 document must not hydrate against an arbitrary requested route')
})

test('favicon assets are square and social previews use the declared dimensions', async () => {
  for (const [file, size] of [['favicon.png', 192], ['apple-touch-icon.png', 180]]) {
    const png = await readFile(new URL(`../dist/${file}`, import.meta.url))
    assert.equal(png.readUInt32BE(16), size)
    assert.equal(png.readUInt32BE(20), size)
  }
  const ico = await readFile(new URL('../dist/favicon.ico', import.meta.url))
  assert.equal(ico.readUInt16LE(2), 1)
  assert.equal(ico[6], 48)
  assert.equal(ico[7], 48)
  const html = await readOutput('index.html')
  assert.match(html, /href="\/favicon.png" sizes="192x192"/)
  await access(new URL('../dist/social-preview.jpg', import.meta.url))
})

test('Render serves every generated route and configures 24-hour favicon revalidation', async () => {
  const config = await readFile(new URL('../render.yaml', import.meta.url), 'utf8')
  assert.match(config, /runtime: static/)
  assert.match(config, /rootDir: frontend/)
  assert.match(config, /staticPublishPath: \.\/dist/)
  assert.ok(config.includes('johncliffordalbarico.site'))
  for (const path of getPublicPaths().filter(path => path !== '/')) {
    assert.ok(config.includes(`source: ${path}\n`), `Missing Render route: ${path}`)
    assert.ok(config.includes(`destination: ${path}/index.html`))
  }
  assert.ok(!/source: ['"]?\/\*/.test(config), 'Unknown paths must not rewrite to an indexable homepage')
  for (const icon of ['/favicon.ico', '/favicon.png', '/apple-touch-icon.png']) assert.ok(config.includes(`path: ${icon}\n        name: Cache-Control\n        value: public, max-age=86400, must-revalidate`))
})
