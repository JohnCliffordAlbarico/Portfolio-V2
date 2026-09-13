import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, ExternalLink, Search, X } from 'lucide-react'
import {
  SiGithub,
  SiReact,
  SiExpress,
  SiNodedotjs,
  SiElectron,
  SiSupabase,
  SiSqlite,
  SiTurso,
  SiCloudflare,
} from 'react-icons/si'
import ScrollReveal from '../components/ScrollReveal'
import ImageModal from '../components/DevModal'
import { PROJECTS } from '../constants/projects'
import bacaltosImg from '../assets/bacaltosproject.jpg'
import workspaceImg from '../assets/yuukoworkspace.jpg'

const FALLBACK_COVER = { workspace: workspaceImg, bacaltos: bacaltosImg }
const FEATURED_SLUG = 'bacaltos-healthcare-system'

const TECH_FILTERS = [
  { label: 'React', icon: SiReact, color: '#61DAFB' },
  { label: 'Express', icon: SiExpress, color: '#F5F5F5' },
  { label: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
  { label: 'Electron', icon: SiElectron, color: '#4DC6E8' },
  { label: 'Supabase', icon: SiSupabase, color: '#3ECF8E' },
  { label: 'SQLite', icon: SiSqlite, color: '#4AA3DF' },
  { label: 'Turso', icon: SiTurso, color: '#4FF8D2' },
  { label: 'Cloudflare R2', icon: SiCloudflare, color: '#F6821F' },
]

function coverFor(project) {
  if (project.images?.length) return project.images[0].src
  if (project.assetImage && FALLBACK_COVER[project.assetImage]) {
    return FALLBACK_COVER[project.assetImage]
  }
  return null
}

function zoomImagesFor(project) {
  if (project.images?.length) return project.images
  const src = coverFor(project)
  if (!src) return []
  return [
    {
      src,
      title: project.title,
      description: project.outcome,
      tags: project.tags.slice(0, 3),
      status: project.status,
    },
  ]
}

function haystack(project) {
  return [
    project.title,
    project.outcome,
    project.description,
    project.category,
    project.role,
    project.type,
    project.platform,
    project.focus,
    project.timeline,
    project.status,
    project.tags.join(' '),
    project.modules.map((m) => `${m.title} ${m.text}`).join(' '),
    project.architecture.join(' '),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

function Hi({ text, query }) {
  const q = query.trim()
  if (!q) return <>{text}</>
  const i = text.toLowerCase().indexOf(q.toLowerCase())
  if (i === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded-sm bg-primary/30 px-0.5 text-inherit">
        {text.slice(i, i + q.length)}
      </mark>
      {text.slice(i + q.length)}
    </>
  )
}

function StatusDot({ live }) {
  return (
    <span
      aria-hidden="true"
      className={`size-1.5 shrink-0 rounded-full ${live ? 'bg-green-400' : 'bg-amber-400'}`}
    />
  )
}

function ProjectLinks({ project, compact }) {
  const cls = compact ? 'text-xs' : 'text-sm'
  const caseCls = compact ? 'px-3 py-1.5' : 'px-4 py-2'
  const sideCls = compact ? 'px-3 py-1.5' : 'px-4 py-2'
  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${cls}`}>
      <Link
        to={`/projects/${project.slug}`}
        className={`inline-flex items-center gap-1.5 rounded-md bg-primary font-semibold text-white shadow-[0_0_20px_-6px_rgba(220,38,38,0.7)] transition-all hover:-translate-y-px hover:bg-accent ${caseCls}`}
      >
        Case study <ArrowRight size={14} />
      </Link>
      {project.links?.live && (
        <a
          href={project.links.live}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 rounded-md border border-primary/40 bg-primary/10 font-medium text-primary transition-colors hover:border-primary/70 hover:bg-primary/20 ${sideCls}`}
        >
          Live <ExternalLink size={13} />
        </a>
      )}
      {project.links?.github && (
        <a
          href={project.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 rounded-md border border-white/15 font-medium text-muted transition-colors hover:border-white/40 hover:text-foreground ${sideCls}`}
        >
          Source <SiGithub size={13} />
        </a>
      )}
    </div>
  )
}

function IndexRow({ project, query, activeTechs, onZoom }) {
  const cover = coverFor(project)
  const shots = project.images?.length ?? 1
  return (
    <article className="group grid gap-4 border-b border-white/10 py-6 transition-colors last:border-b-0 hover:bg-white/[0.015] sm:grid-cols-[168px_1fr] sm:gap-5">
      {cover ? (
        <button
          type="button"
          onClick={onZoom}
          aria-label={`Enlarge ${project.title} preview`}
          className="block overflow-hidden rounded-md border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <img
            src={cover}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </button>
      ) : (
        <span className="hidden aspect-video rounded-md border border-dashed border-white/15 sm:block" aria-hidden="true" />
      )}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <Link
            to={`/projects/${project.slug}`}
            className="text-lg font-semibold tracking-tight transition-colors group-hover:text-primary"
          >
            <Hi text={project.title} query={query} />
          </Link>
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted">
            <StatusDot live={Boolean(project.links?.live)} />
            {project.category}
          </span>
        </div>
        <p className="mt-1.5 line-clamp-2 max-w-2xl text-sm leading-relaxed text-muted">
          <Hi text={project.outcome} query={query} />
        </p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className={`rounded border px-1.5 py-0.5 font-mono text-[11px] ${
                activeTechs.includes(t)
                  ? 'border-primary/60 bg-primary/10 text-foreground'
                  : 'border-white/10 bg-white/[0.03] text-muted'
              }`}
            >
              {t}
            </span>
          ))}
          <span className="px-1 py-0.5 font-mono text-[11px] text-muted/70">
            {shots} {shots === 1 ? 'frame' : 'frames'} · {project.modules.length} modules
          </span>
        </div>
        <div className="mt-3">
          <ProjectLinks project={project} compact />
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const [query, setQuery] = useState('')
  const [techs, setTechs] = useState([])
  const [zoom, setZoom] = useState(null)
  const searchRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== '/') return
      const tag = document.activeElement?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      e.preventDefault()
      searchRef.current?.focus()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const searchStacks = useMemo(() => PROJECTS.map(haystack), [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PROJECTS.filter((p, i) => {
      if (techs.length && !techs.every((t) => p.tags.includes(t))) return false
      if (q && !searchStacks[i].includes(q)) return false
      return true
    })
  }, [query, techs, searchStacks])

  const filtering = query.trim() !== '' || techs.length > 0
  const featured = PROJECTS.find((p) => p.slug === FEATURED_SLUG) ?? PROJECTS[0]
  const indexList = results.filter((p) => p.slug !== featured.slug)

  const toggleTech = (t) =>
    setTechs((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))
  const clearAll = () => {
    setQuery('')
    setTechs([])
  }

  const featuredCover = coverFor(featured)

  return (
    <main id="top" className="px-6 pb-16 pt-14 sm:pt-20">
      <div className="mx-auto max-w-6xl">
        {/* featured project — always showcased, never filtered */}
        <ScrollReveal distance={32}>
            <article className="grid gap-8 border-b-2 border-foreground/80 pb-8 pt-2 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
              <div className="min-w-0">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
                  Featured — {featured.type}
                </p>
                <Link
                  to={`/projects/${featured.slug}`}
                  className="mt-2 block text-3xl font-bold leading-[1.02] tracking-tight transition-colors hover:text-primary sm:text-4xl"
                >
                  {featured.title}
                </Link>
                <p className="mt-3 max-w-lg leading-relaxed text-muted">{featured.outcome}</p>
                <dl className="mt-6 border-t border-white/10">
                  {[
                    ['Role', featured.role],
                    ['Runs on', featured.platform],
                    ['State', featured.status],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-baseline justify-between gap-6 border-b border-white/10 py-2 text-sm"
                    >
                      <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">{k}</dt>
                      <dd className="text-right text-foreground/90">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-5">
                  <ProjectLinks project={featured} />
                </div>
                {featured.client && (
                  <p className="mt-4 text-xs leading-relaxed text-muted">
                    Built for {featured.client.name} ·{' '}
                    <a href={`mailto:${featured.client.email}`} className="text-primary hover:underline">
                      {featured.client.email}
                    </a>
                  </p>
                )}
              </div>
              <div className="min-w-0">
                {featuredCover && (
                  <button
                    type="button"
                    onClick={() =>
                      setZoom({ images: zoomImagesFor(featured), index: 0 })
                    }
                    aria-label={`Enlarge ${featured.title} preview`}
                    className="group block w-full overflow-hidden rounded-lg border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <img
                      src={featuredCover}
                      alt=""
                      aria-hidden="true"
                      loading="eager"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
                    />
                  </button>
                )}
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  {featured.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-muted"
                    >
                      {t}
                    </span>
                  ))}
                  <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[11px] text-muted">
                    <StatusDot live={false} />
                    {featured.images?.length ?? 0} frames in the case study
                    <ArrowUpRight size={12} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </article>
          </ScrollReveal>

        {/* tech stack + search */}
        <section
          aria-label="Filter by tech stack"
          className="mt-8 overflow-hidden rounded-xl border border-primary/25 bg-surface shadow-[0_0_40px_-16px_rgba(220,38,38,0.45)]"
        >
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 bg-white/[0.02] px-5 py-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Tech stack</h2>
              <p className="mt-1 text-sm text-muted">
                Click an icon to filter the projects below.
              </p>
            </div>
            {filtering ? (
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-1 rounded-md border border-white/15 px-2.5 py-1.5 font-mono text-[11px] text-primary hover:border-primary/50 hover:text-accent"
              >
                <X size={12} /> clear
              </button>
            ) : (
              <span className="rounded-md border border-white/10 px-2.5 py-1.5 font-mono text-[11px] text-muted">
                {TECH_FILTERS.length} stacks
              </span>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2 p-4 sm:grid-cols-8">
            {TECH_FILTERS.map(({ label, icon: Icon, color }) => {
              const active = techs.includes(label)
              return (
                <button
                  key={label}
                  type="button"
                  aria-pressed={active}
                  title={`${label} — click to filter`}
                  onClick={() => toggleTech(label)}
                  style={active ? { borderColor: `${color}88`, backgroundColor: `${color}1A` } : undefined}
                  className={`group flex flex-col items-center gap-1.5 rounded-lg border px-2 py-3 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    active
                      ? 'text-foreground shadow-[0_0_18px_-8px_rgba(0,0,0,0.8)]'
                      : 'border-white/10 bg-background text-muted hover:-translate-y-0.5 hover:border-white/30 hover:text-foreground'
                  }`}
                >
                  <Icon
                    size={24}
                    aria-hidden="true"
                    style={{ color, filter: `drop-shadow(0 0 6px ${color}55)` }}
                  />
                  <span className="font-mono text-[10px] leading-tight">{label}</span>
                  <span
                    aria-hidden="true"
                    className="h-1 w-6 rounded-full transition-opacity"
                    style={{ backgroundColor: color, opacity: active ? 1 : 0.35 }}
                  />
                </button>
              )
            })}
          </div>
          <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-background px-3.5 py-2.5 transition-colors focus-within:border-primary/60">
            <Search size={16} className="shrink-0 text-muted" aria-hidden="true" />
            <label htmlFor="project-search" className="sr-only">
              Search projects by name, description, or technology
            </label>
            <input
              id="project-search"
              ref={searchRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, stack — try “electron” or “forecasting”…"
              autoComplete="off"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted/60 focus:outline-none"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="rounded p-0.5 text-muted transition-colors hover:text-foreground"
              >
                <X size={15} />
              </button>
            ) : (
              <kbd className="hidden rounded border border-white/15 px-1.5 py-0.5 font-mono text-[11px] text-muted sm:block">
                /
              </kbd>
            )}
          </div>
          </div>
        </section>

        <p role="status" className="mt-6 font-mono text-xs text-muted">
          {filtering ? (
            <>
              {indexList.length} matching {indexList.length === 1 ? 'project' : 'projects'} below
              {query.trim() && (
                <>
                  {' '}for “<span className="text-foreground">{query.trim()}</span>”
                </>
              )}
            </>
          ) : (
            <>{indexList.length} recent projects</>
          )}
        </p>

        {/* recent projects */}
        <section aria-label={filtering ? 'Search results' : 'Recent projects'} className="mt-2">
          <h2 className="pt-4 font-mono text-xs uppercase tracking-[0.14em] text-muted">
            {filtering ? 'Matching projects' : 'Recent projects'}
          </h2>
          {indexList.length === 0 ? (
            <div className="border-b border-white/10 py-16 text-center">
              <p className="font-mono text-sm text-primary">~/projects: no matches</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                None of these {PROJECTS.length} systems matches that combination.
                Names, descriptions, stack, modules, and architecture are all searchable.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent"
              >
                <X size={14} /> Clear search and filters
              </button>
            </div>
          ) : (
            <div className="border-t border-white/10 first:border-t-0">
              {indexList.map((p) => (
                <ScrollReveal key={p.slug} distance={24}>
                  <IndexRow
                    project={p}
                    query={query}
                    activeTechs={techs}
                    onZoom={() =>
                      setZoom({ images: zoomImagesFor(p), index: 0 })
                    }
                  />
                </ScrollReveal>
              ))}
            </div>
          )}
        </section>

        {/* closing */}
        <nav
          aria-label="Keep exploring"
          className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6"
        >
          <a
            href="#top"
            className="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-primary"
          >
            <ArrowUpRight size={13} className="rotate-[-45deg]" /> Back to the top
          </a>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            More about me <ArrowRight size={14} />
          </Link>
        </nav>
      </div>

      {zoom && zoom.images.length > 0 && (
        <ImageModal
          images={zoom.images}
          currentIndex={zoom.index}
          onClose={() => setZoom(null)}
          onNavigate={(i) => setZoom((z) => ({ ...z, index: i }))}
        />
      )}
    </main>
  )
}
