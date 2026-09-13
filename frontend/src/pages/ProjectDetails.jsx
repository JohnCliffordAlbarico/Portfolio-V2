import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import ImageModal from '../components/DevModal'
import ScrollReveal from '../components/ScrollReveal'
import { getProject, PROJECTS } from '../constants/projects'
import bacaltosImg from '../assets/bacaltosproject.jpg'
import workspaceImg from '../assets/yuukoworkspace.jpg'

const assetMap = { bacaltos: bacaltosImg, workspace: workspaceImg }

const TECH_COLORS = {
  react: '#61DAFB',
  express: '#F5F5F5',
  node: '#5FA04E',
  electron: '#4DC6E8',
  supabase: '#3ECF8E',
  sqlite: '#4AA3DF',
  turso: '#4FF8D2',
  cloudflare: '#F6821F',
}

function techColor(label) {
  const key = label.toLowerCase().replace(/\.js$/, '')
  return (
    Object.entries(TECH_COLORS).find(([k]) => key.includes(k))?.[1] ?? null
  )
}

function resolveImages(project) {
  if (project.images?.length) return project.images
  const fallback = project.assetImage ? assetMap[project.assetImage] : null
  if (!fallback) return []
  return [
    {
      src: fallback,
      title: project.title,
      description: project.outcome,
      tags: project.tags.slice(0, 3),
      status: project.status,
    },
  ]
}

function Frame({ shot, slug, onZoom, wide }) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-black/40">
      <div className="flex h-9 items-center gap-1.5 border-b border-white/10 px-3">
        <span className="size-2 rounded-full bg-primary/80" aria-hidden="true" />
        <span className="size-2 rounded-full bg-white/20" aria-hidden="true" />
        <span className="size-2 rounded-full bg-white/20" aria-hidden="true" />
        <span className="ml-3 truncate font-mono text-xs text-muted">
          {shot.title} — {slug}
        </span>
      </div>
      <button
        type="button"
        onClick={onZoom}
        aria-label={`Enlarge screenshot: ${shot.title}`}
        className="group block w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <img
          src={shot.src}
          alt={shot.title}
          loading={wide ? 'eager' : 'lazy'}
          className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.015] ${
            wide ? 'aspect-[16/9]' : 'aspect-[16/10]'
          }`}
        />
      </button>
    </div>
  )
}

export default function ProjectDetails() {
  const { slug } = useParams()
  const project = getProject(slug)
  const [modalIndex, setModalIndex] = useState(null)
  const [activeShot, setActiveShot] = useState(0)

  if (!project) {
    return (
      <main className="px-6 py-24">
        <div className="mx-auto max-w-2xl">
          <p className="font-mono text-sm text-primary">
            <span className="text-muted">$</span> cat ~/projects/{slug}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight">No such project</h1>
          <p className="mt-2 text-muted">That slug does not match any case study.</p>
          <Link to="/projects" className="mt-6 inline-block text-sm text-primary hover:text-accent">
            &larr; Back to projects
          </Link>
        </div>
      </main>
    )
  }

  const images = resolveImages(project)
  const active = images[Math.min(activeShot, Math.max(images.length - 1, 0))]
  const idx = PROJECTS.findIndex((p) => p.slug === project.slug)
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length]
  const next = PROJECTS[(idx + 1) % PROJECTS.length]
  const isLive = Boolean(project.links?.live)
  const isDesktop = /desktop/i.test(project.platform ?? project.status ?? '')

  const facts = [
    ['Role', project.role],
    ['Type', project.type ?? project.timeline],
    ['Runs on', project.platform ?? project.status],
    ['Emphasis', project.focus ?? project.category],
    ['State', project.status],
  ].filter(([, v]) => Boolean(v))

  return (
    <main>
      {/* breadcrumb + status */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-6 py-4 font-mono text-xs text-muted">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 transition-colors hover:text-primary"
          >
            <ArrowLeft size={14} /> projects
          </Link>
          <span aria-hidden="true" className="text-white/20">/</span>
          <span className="truncate text-foreground">{project.slug}</span>
          <span className="ml-auto inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              className={`size-1.5 rounded-full ${isLive ? 'bg-green-400' : 'bg-amber-400'}`}
            />
            {isLive ? 'live deployment' : isDesktop ? 'local desktop build' : project.status}
          </span>
        </div>
      </div>

      {/* hero: summary left, product showcase right */}
      <section className="px-6 pb-14 pt-12 sm:pt-16">
        <div className="mx-auto grid w-full max-w-6xl items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.14em]">
              <span className="rounded-md bg-primary px-2.5 py-1 font-semibold text-white shadow-[0_0_20px_-6px_rgba(220,38,38,0.8)]">
                Case study
              </span>
              <span className="text-primary">
                {project.category} — {project.timeline}
              </span>
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {project.outcome}
            </p>

            <dl className="mt-8 border-t border-white/10">
              {facts.map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between gap-6 border-b border-white/10 py-2.5 text-sm"
                >
                  <dt className="shrink-0 font-mono text-xs uppercase tracking-wider text-muted">
                    {k}
                  </dt>
                  <dd className="text-right text-foreground/90">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {project.links?.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent"
                >
                  Open live build <ExternalLink size={14} />
                </a>
              )}
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-white/15 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  Repository <SiGithub size={14} />
                </a>
              )}
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-white/15 px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:border-primary/50 hover:text-foreground"
              >
                Ask about this build <ArrowRight size={14} />
              </Link>
            </div>

            {project.client && (
              <p className="mt-6 border-l-2 border-primary/60 pl-4 text-sm leading-relaxed text-muted">
                Built for {project.client.name}. {project.client.note}{' '}
                <a
                  href={`mailto:${project.client.email}`}
                  className="text-primary hover:underline"
                >
                  {project.client.email}
                </a>
                {project.client.facebook && (
                  <>
                    {' '}·{' '}
                    <a
                      href={project.client.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Facebook page
                    </a>
                  </>
                )}
              </p>
            )}
          </div>

          {/* layered product showcase */}
          <div className="min-w-0">
            {images.length >= 2 ? (
              <ScrollReveal distance={32}>
                <div className="relative pb-16 pr-2 sm:pb-20">
                  <Frame shot={images[0]} slug={project.slug} wide onZoom={() => setModalIndex(0)} />
                  <div className="absolute bottom-0 right-0 w-[62%] max-w-[420px] shadow-[0_24px_70px_rgba(0,0,0,0.5)]">
                    <Frame
                      shot={images[images.length - 1]}
                      slug={project.slug}
                      onZoom={() => setModalIndex(images.length - 1)}
                    />
                  </div>
                  <p className="mt-3 font-mono text-xs text-muted">
                    {images[0].title} + {images[images.length - 1].title} — click either to inspect
                  </p>
                </div>
              </ScrollReveal>
            ) : (
              active && (
                <ScrollReveal distance={32}>
                  <Frame shot={active} slug={project.slug} wide onZoom={() => setModalIndex(0)} />
                  <p className="mt-3 font-mono text-xs text-muted">
                    {active.title} — click to inspect
                  </p>
                </ScrollReveal>
              )
            )}
            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Primary technologies">
              {project.tags.map((t) => {
                const color = techColor(t)
                return (
                  <li
                    key={t}
                    className="inline-flex items-center gap-1.5 rounded border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-muted"
                  >
                    {color && (
                      <span
                        aria-hidden="true"
                        className="size-1.5 rounded-full"
                        style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}88` }}
                      />
                    )}
                    {t}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* operating context */}
      {project.brief && (
        <section className="border-t border-white/10 px-6 py-14">
          <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-2">
            <ScrollReveal distance={28}>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
                  Operating context
                </p>
                <h2 className="mt-2 max-w-md text-2xl font-bold tracking-tight sm:text-3xl">
                  The work it had to absorb
                </h2>
                <p className="mt-4 leading-relaxed text-muted">{project.brief.problem}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{project.description}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal distance={28} delay={120}>
              <div className="border-l-2 border-primary/60 pl-6 lg:mt-9">
                <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-foreground">
                  What I built instead
                </h3>
                <p className="mt-3 leading-relaxed text-foreground/90">
                  {project.brief.approach}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* capabilities ledger */}
      <section className="border-t border-white/10 px-6 py-14">
        <div className="mx-auto w-full max-w-6xl">
          <ScrollReveal distance={28}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
                  Capabilities
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                  What the system actually does
                </h2>
              </div>
              <p className="max-w-sm text-sm text-muted">
                Each row is a workflow the software owns end to end — not a menu label.
              </p>
            </div>
          </ScrollReveal>
          <ol className="mt-8 border-t border-white/10">
            {project.modules.map((m, i) => (
              <li key={m.title}>
                <ScrollReveal distance={24} delay={(i % 3) * 80}>
                  <div className="grid gap-2 border-b border-white/10 py-5 sm:grid-cols-[56px_240px_1fr] sm:gap-6">
                    <span className="font-mono text-sm text-primary">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-medium leading-snug">{m.title}</h3>
                    <p className="max-w-3xl text-sm leading-relaxed text-muted">{m.text}</p>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* system flow */}
      <section className="border-t border-white/10 px-6 py-14">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
              System flow
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              How it runs
            </h2>
            <ol
              aria-label="Data flow"
              className="mt-6 flex flex-col gap-0 font-mono text-sm"
            >
              {project.architecture.map((node, i) => (
                <li key={node} className="flex gap-4">
                  <span className="flex flex-col items-center" aria-hidden="true">
                    <span className="flex size-6 items-center justify-center rounded-full border border-primary/40 text-[11px] text-primary">
                      {i + 1}
                    </span>
                    {i < project.architecture.length - 1 && (
                      <span className="w-px flex-1 bg-white/15" />
                    )}
                  </span>
                  <span className="pb-6 text-foreground/90">{node}</span>
                </li>
              ))}
            </ol>
            {project.results?.length > 0 && (
              <dl className="mt-2 border-t border-white/10">
                {project.results.map((r) => (
                  <div
                    key={r.label}
                    className="flex items-baseline gap-6 border-b border-white/10 py-3"
                  >
                    <dt className="w-12 shrink-0 font-mono text-lg text-foreground">
                      {r.value}
                    </dt>
                    <dd className="text-sm text-muted">{r.label}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
              Stack
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Chosen for maintenance
            </h2>
            <div className="mt-6 space-y-7">
              {project.stackGroups.map((group) => (
                <div key={group.label}>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-muted">
                    {group.label}
                  </h3>
                  <ul className="mt-2 border-t border-white/10">
                    {group.chips.map((chip) => {
                      const color = techColor(chip.label)
                      const dotColor = color ?? (chip.hot ? '#DC2626' : null)
                      return (
                        <li
                          key={chip.label}
                          className="flex items-center gap-3 border-b border-white/10 py-2.5 text-sm"
                        >
                          <span
                            aria-hidden="true"
                            className={`size-1.5 shrink-0 rounded-full ${dotColor ? '' : 'bg-white/25'}`}
                            style={
                              dotColor
                                ? { backgroundColor: dotColor, boxShadow: `0 0 6px ${dotColor}88` }
                                : undefined
                            }
                          />
                          <span className={chip.hot ? 'text-foreground' : 'text-muted'}>
                            {chip.label}
                          </span>
                          {chip.hot && (
                            <span className="ml-auto font-mono text-[11px] text-muted">
                              core
                            </span>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* evidence viewer */}
      {images.length > 0 && (
        <section className="border-t border-white/10 px-6 py-14">
          <div className="mx-auto w-full max-w-6xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
                  Evidence
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                  The finished product
                </h2>
              </div>
              <p className="font-mono text-xs text-muted">
                {activeShot + 1} / {images.length} — select a frame, click it to enlarge
              </p>
            </div>

            <ScrollReveal distance={32}>
              <figure className="mt-6">
                <Frame
                  shot={active}
                  slug={project.slug}
                  wide
                  onZoom={() => setModalIndex(images.indexOf(active))}
                />
                <figcaption className="grid gap-3 py-4 sm:grid-cols-[1fr_auto] sm:items-start">
                  <div>
                    <p className="font-medium">{active.title}</p>
                    <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted">
                      {active.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {active.tags?.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </figcaption>
              </figure>
            </ScrollReveal>

            {images.length > 1 && (
              <div
                role="tablist"
                aria-label="Screenshot selector"
                className="grid grid-cols-2 gap-3 sm:grid-cols-4"
              >
                {images.map((img, i) => (
                  <button
                    key={img.src}
                    role="tab"
                    aria-selected={i === images.indexOf(active)}
                    aria-label={`Show ${img.title}`}
                    type="button"
                    onClick={() => setActiveShot(i)}
                    className={`overflow-hidden rounded-md border text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      i === images.indexOf(active)
                        ? 'border-primary/60'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <img
                      src={img.src}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="aspect-video w-full object-cover"
                    />
                    <span className="block truncate px-2.5 py-2 font-mono text-[11px] text-muted">
                      {String(i + 1).padStart(2, '0')} — {img.title}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* footer nav */}
      <nav
        aria-label="More projects"
        className="border-t border-white/10 px-6 py-10"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2">
          <Link
            to={`/projects/${prev.slug}`}
            className="group bg-background p-6 transition-colors hover:bg-surface"
          >
            <span className="font-mono text-xs text-muted">&larr; Previous</span>
            <span className="mt-1.5 block font-medium transition-colors group-hover:text-primary">
              {prev.title}
            </span>
            <span className="mt-1 block font-mono text-xs text-muted">{prev.category}</span>
          </Link>
          <Link
            to={`/projects/${next.slug}`}
            className="group bg-background p-6 text-right transition-colors hover:bg-surface"
          >
            <span className="font-mono text-xs text-muted">Next &rarr;</span>
            <span className="mt-1.5 block font-medium transition-colors group-hover:text-primary">
              {next.title}
            </span>
            <span className="mt-1 block font-mono text-xs text-muted">{next.category}</span>
          </Link>
        </div>
      </nav>

      {modalIndex !== null && images.length > 0 && (
        <ImageModal
          images={images}
          currentIndex={modalIndex}
          onClose={() => setModalIndex(null)}
          onNavigate={setModalIndex}
        />
      )}
    </main>
  )
}
