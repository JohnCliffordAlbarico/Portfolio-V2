import { PROJECTS } from './projects.js'

export const SITE_URL = 'https://johncliffordalbarico.site'
export const SITE_NAME = 'John Clifford Albarico — Software Developer'
const PERSON_ID = `${SITE_URL}/#person`
const WEBSITE_ID = `${SITE_URL}/#website`
const DEFAULT_IMAGE = `${SITE_URL}/social-preview.jpg`

const pages = {
  '/': {
    title: 'John Clifford Albarico | Software Developer in Cebu',
    description: 'John Clifford Albarico is a software developer based in Cebu who creates websites, web applications, mobile apps, and desktop software.',
    type: 'ProfilePage',
  },
  '/about': {
    title: 'About John Clifford Albarico | Software Developer',
    description: 'John Clifford Albarico is a BSIT graduate from CTU Naga in Cebu. Read about his internship, development skills, education, and awards.',
    type: 'AboutPage',
  },
  '/projects': {
    title: 'Software Development Projects | John Clifford Albarico',
    description: 'Client websites, clinic software, a print-shop practice project, and personal applications built by John Clifford Albarico.',
    type: 'CollectionPage',
  },
  '/contact': {
    title: 'Contact John Clifford Albarico | Software Developer',
    description: 'Get in touch with John Clifford Albarico, a software developer in Cebu, about a project or job opportunity.',
    type: 'ContactPage',
  },
}

const person = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'John Clifford M. Albarico',
  alternateName: ['John Clifford Albarico', 'Clifford Albarico'],
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/icon2.jpg`,
  jobTitle: 'Software Developer',
  description: pages['/'].description,
  homeLocation: { '@type': 'Place', name: 'Cebu, Philippines' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Cebu Technological University – Naga Extension Campus' },
  knowsAbout: ['Web development', 'Mobile application development', 'Desktop application development', 'React', 'React Native', 'Node.js', 'Electron'],
  sameAs: [
    'https://github.com/JohnCliffordAlbarico',
    'https://www.linkedin.com/in/clifford-albarico-1b3604369',
    'https://www.facebook.com/albarico.clifford',
  ],
}

export function getPublicPaths() {
  return [...Object.keys(pages), ...PROJECTS.map(project => `/projects/${project.slug}`)]
}

function summary(text) {
  const value = text.replace(/\s+/g, ' ').trim()
  if (value.length <= 160) return value
  return `${value.slice(0, 157).replace(/\s+\S*$/, '')}…`
}

export function getPageSeo(input) {
  const pathname = input.split(/[?#]/)[0].replace(/\/+$/, '') || '/'
  const project = PROJECTS.find(value => pathname === `/projects/${value.slug}`)
  const page = pages[pathname] || (project && {
    title: `${project.title} | John Clifford Albarico`,
    description: summary(project.outcome),
    type: 'WebPage',
  })
  const canonical = page ? `${SITE_URL}${pathname === '/' ? '/' : pathname}` : null
  const title = page?.title || 'Page Not Found | John Clifford Albarico'
  const description = page?.description || 'This portfolio page could not be found. Explore the projects and background of software developer John Clifford Albarico.'
  const webPage = {
    '@type': page?.type || 'WebPage',
    '@id': `${canonical || SITE_URL + pathname}#webpage`,
    url: canonical || SITE_URL + pathname,
    name: title,
    description,
    inLanguage: 'en',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': PERSON_ID },
  }
  if (pathname === '/' || pathname === '/about') webPage.mainEntity = { '@id': PERSON_ID }
  if (pathname === '/projects') {
    webPage.mainEntity = {
      '@type': 'ItemList',
      itemListElement: PROJECTS.map((value, index) => ({ '@type': 'ListItem', position: index + 1, name: value.title, url: `${SITE_URL}/projects/${value.slug}` })),
    }
  }
  if (project) {
    webPage.mainEntity = {
      '@type': 'CreativeWork', name: project.title, description: project.description,
      url: canonical, creator: { '@id': PERSON_ID }, keywords: project.tags.join(', '),
      ...(project.images?.[0] && { image: `${SITE_URL}${project.images[0].src}` }),
    }
  }
  return {
    pathname, title, description, canonical,
    robots: page ? 'index, follow' : 'noindex, follow',
    image: DEFAULT_IMAGE,
    imageAlt: 'John Clifford M. Albarico, software developer based in Cebu, Philippines',
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [person, { '@type': 'WebSite', '@id': WEBSITE_ID, url: `${SITE_URL}/`, name: SITE_NAME, publisher: { '@id': PERSON_ID }, inLanguage: 'en' }, webPage],
    },
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]))
}

export function renderSeoHead(seo) {
  const meta = (key, value, attribute = 'name') => `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`
  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    meta('description', seo.description), meta('author', person.name), meta('robots', seo.robots),
    ...(seo.canonical ? [`<link rel="canonical" href="${escapeHtml(seo.canonical)}" />`] : []),
    meta('og:type', 'website', 'property'), meta('og:site_name', SITE_NAME, 'property'),
    meta('og:title', seo.title, 'property'), meta('og:description', seo.description, 'property'),
    meta('og:url', seo.canonical || SITE_URL + seo.pathname, 'property'),
    meta('og:locale', 'en_PH', 'property'), meta('og:image', seo.image, 'property'),
    meta('og:image:width', '1200', 'property'), meta('og:image:height', '630', 'property'),
    meta('og:image:alt', seo.imageAlt, 'property'),
    meta('twitter:card', 'summary_large_image'), meta('twitter:title', seo.title),
    meta('twitter:description', seo.description), meta('twitter:image', seo.image), meta('twitter:image:alt', seo.imageAlt),
    `<script id="structured-data" type="application/ld+json">${JSON.stringify(seo.structuredData).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')
}
