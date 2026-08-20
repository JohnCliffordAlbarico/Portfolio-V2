import ScrollReveal from '../ScrollReveal'
import SectionHeading from '../SectionHeading'
import { Zap, ServerCog } from 'lucide-react'
import { 
  SiJavascript, 
  SiTypescript,
  SiPython, 
  SiOpenjdk,
  SiHtml5,
  SiCss3,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiSupabase,
  SiSqlite,
  SiPostgresql,
  SiTurso,
  SiElectron,
  SiDocker,
  SiPostman,
  SiGithub,
  SiRender,
  SiVercel,
  SiCloudflare
} from 'react-icons/si'

const groups = [
  { 
    title: 'Programming Languages', 
    items: [
      { name: 'JavaScript', icon: SiJavascript, level: 5 },
      { name: 'TypeScript', icon: SiTypescript, level: 4 },
      { name: 'Python', icon: SiPython, level: 3 },
      { name: 'Java', icon: SiOpenjdk, level: 3 },
    ]
  },
  { 
    title: 'Frontend', 
    items: [
      { name: 'HTML & CSS', icon: SiHtml5, level: 4 },
      { name: 'React.js', icon: SiReact, level: 4 },
      { name: 'React Native', icon: SiReact, level: 3 },
      { name: 'ElectronJS', icon: SiElectron, level: 3 },
    ]
  },
  { 
    title: 'Backend', 
    items: [
      { name: 'Node.js', icon: SiNodedotjs, level: 4 },
      { name: 'Express.js', icon: SiExpress, level: 4 },
      { name: 'FastAPI', icon: SiFastapi, level: 3 },
    ]
  },
  { 
    title: 'Database', 
    items: [
      { name: 'Neon', icon: Zap, level: 4 },
      { name: 'TursoDB', icon: SiTurso, level: 4 },
      { name: 'Supabase', icon: SiSupabase, level: 4 },
      { name: 'PostgreSQL', icon: SiPostgresql, level: 4 },
      { name: 'SQLite', icon: SiSqlite, level: 4 },
    ]
  },
  { 
    title: 'Tools & Platforms', 
    items: [
      { name: 'Git & GitHub', icon: SiGithub, level: 4 },
      { name: 'Docker', icon: SiDocker, level: 3 },
      { name: 'Postman', icon: SiPostman, level: 3 },
      { name: 'Render', icon: SiRender, level: 3 },
      { name: 'Cloudflare R2', icon: SiCloudflare, level: 3 },
      { name: 'Vercel', icon: SiVercel, level: 3 },
      { name: 'NSSM', icon: ServerCog, level: 3 },
    ]
  },
]

function ProficiencyBar({ level }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = i <= Math.floor(level)
        const half = !filled && i === Math.ceil(level) && level % 1 !== 0
        return (
          <div
            key={i}
            className="h-1.5 w-5 rounded-full bg-white/10"
          >
            {(filled || half) && (
              <div
                className={`h-full rounded-full bg-primary ${half ? 'w-[50%]' : 'w-full'}`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="min-h-[80vh] flex items-center px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          eyebrow="dependencies"
          title="Technical Skills"
          description="My core toolbox — the languages, frameworks, and platforms I use to build and ship applications."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map(({ title, items }, i) => (
            <ScrollReveal key={title} delay={i * 100} distance={36}>
              <div>
                <h3 className="mb-4 font-mono text-sm text-primary">
                  <span className="text-muted">&quot;</span>
                  {title.toLowerCase().replace(/ & /g, '/')}
                  <span className="text-muted">&quot;</span>
                </h3>
                <ul className="space-y-2">
                  {items.map(({ name, icon: Icon, level }) => (
                    <li
                      key={name}
                      className="flex items-center justify-between rounded-md border border-white/5 bg-background px-3 py-2 font-mono text-sm text-muted transition-colors hover:border-primary/20 hover:text-foreground"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-muted/50">&quot;</span>
                        <Icon size={16} className="shrink-0" />
                        {name}
                        <span className="text-muted/50">&quot;</span>
                      </div>
                      <ProficiencyBar level={level} />
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}