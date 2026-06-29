import ScrollReveal from '../ScrollReveal'
import { 
  SiJavascript, 
  SiPython, 
  SiOpenjdk,
  SiC,
  SiHtml5,
  SiCss3,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiFirebase,
  SiSupabase,
  SiGit,
  SiGithub,
  SiRender,
  SiVercel,
  SiCloudflare
} from 'react-icons/si'

const groups = [
  { 
    title: 'Programming Languages', 
    items: [
      { name: 'JavaScript', icon: SiJavascript, level: 4 },
      { name: 'Python', icon: SiPython, level: 3 },
      { name: 'Java', icon: SiOpenjdk, level: 3 },
      { name: 'C', icon: SiC, level: 3 },
    ]
  },
  { 
    title: 'Frontend', 
    items: [
      { name: 'HTML & CSS', icon: SiHtml5, level: 4 },
      { name: 'React.js', icon: SiReact, level: 4 },
      { name: 'React Native', icon: SiReact, level: 3 },
      { name: 'Next.js', icon: SiNextdotjs, level: 3 },
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
      { name: 'Firebase', icon: SiFirebase, level: 3 },
      { name: 'Supabase', icon: SiSupabase, level: 4 },
    ]
  },
  { 
    title: 'Tools & Platforms', 
    items: [
      { name: 'Git & GitHub', icon: SiGit, level: 4 },
      { name: 'Render', icon: SiRender, level: 3 },
      { name: 'Vercel', icon: SiVercel, level: 3 },
      { name: 'Cloudflare', icon: SiCloudflare, level: 3 },
    ]
  },
]

function ProficiencyBar({ level }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`h-1.5 w-5 rounded-full transition-colors ${
            i <= level ? 'bg-primary' : 'bg-white/10'
          }`}
        />
      ))}
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="bg-surface min-h-[80vh] flex items-center px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-2xl font-semibold tracking-tight sm:text-3xl">
          Technical Skills
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map(({ title, items }, i) => (
            <ScrollReveal key={title} delay={i * 100} distance={36}>
              <div>
                <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">
                  {title}
                </h3>
                <ul className="space-y-2">
                  {items.map(({ name, icon: Icon, level }) => (
                    <li
                      key={name}
                      className="flex items-center justify-between rounded-md border border-white/5 bg-background px-3 py-2 text-sm text-muted transition-colors hover:border-primary/20 hover:text-foreground"
                    >
                      <div className="flex items-center gap-2">
                        <Icon size={16} className="shrink-0" />
                        {name}
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