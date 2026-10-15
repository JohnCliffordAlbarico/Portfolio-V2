import test from 'node:test'
import assert from 'node:assert/strict'
import { getPageSeo, getPublicPaths, renderSeoHead, SITE_URL } from '../src/constants/seo.js'
import { PROJECTS } from '../src/constants/projects.js'

test('homepage identifies the owner and the canonical HTTPS domain', () => {
  const seo = getPageSeo('/')
  assert.equal(SITE_URL, 'https://johncliffordalbarico.site')
  assert.equal(seo.canonical, `${SITE_URL}/`)
  assert.match(seo.title, /John Clifford.*Albarico/)
  assert.match(seo.description, /software developer/i)
  assert.match(seo.description, /Cebu/)
  assert.equal(seo.robots, 'index, follow')
  const person = seo.structuredData['@graph'].find(node => node['@type'] === 'Person')
  assert.equal(person.name, 'John Clifford M. Albarico')
  assert.ok(person.sameAs.includes('https://github.com/JohnCliffordAlbarico'))
})

test('all six actual projects get unique crawlable canonical pages', () => {
  const paths = getPublicPaths()
  assert.equal(paths.length, 4 + PROJECTS.length)
  assert.equal(new Set(paths).size, paths.length)
  for (const project of PROJECTS) {
    const pathname = `/projects/${project.slug}`
    assert.ok(paths.includes(pathname))
    const seo = getPageSeo(pathname)
    assert.equal(seo.canonical, `${SITE_URL}${pathname}`)
    assert.ok(seo.title.includes(project.title))
    assert.ok(seo.description.length > 30)
  }
})

test('About query parameters and trailing slashes resolve to one canonical', () => {
  assert.equal(getPageSeo('/about?section=skills').canonical, `${SITE_URL}/about`)
  assert.equal(getPageSeo('/about/').canonical, `${SITE_URL}/about`)
  assert.match(getPageSeo('/about').title, /About John Clifford/)
})

test('unknown pages and project slugs are noindex and excluded from the sitemap', () => {
  for (const route of ['/404', '/404.html', '/missing', '/projects/missing']) {
    const seo = getPageSeo(route)
    assert.equal(seo.robots, 'noindex, follow')
    assert.equal(seo.canonical, null)
    assert.ok(!getPublicPaths().includes(route))
  }
})

test('head output contains one canonical, social metadata, and parseable safe JSON-LD', () => {
  const head = renderSeoHead(getPageSeo('/about'))
  assert.equal((head.match(/rel="canonical"/g) || []).length, 1)
  assert.match(head, /property="og:title"/)
  assert.match(head, /name="twitter:card"/)
  const json = head.match(/<script id="structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]
  assert.equal(JSON.parse(json)['@context'], 'https://schema.org')
  const unsafe = getPageSeo('/')
  unsafe.title = '<script>" & title'
  unsafe.description = 'A "quoted" description <tag>'
  unsafe.structuredData.extra = '</script><script>alert(1)</script>'
  const escaped = renderSeoHead(unsafe)
  assert.ok(escaped.includes('&lt;script&gt;&quot; &amp; title'))
  assert.ok(!escaped.includes('</script><script>alert'))
})
