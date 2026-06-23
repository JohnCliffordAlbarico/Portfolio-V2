import ScrollReveal from '../ScrollReveal'
import { 
  SiJavascript, 
  SiPython, 
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
import { Code, Database } from 'lucide-react'

export default function Skills() {
  const groups = [
    { 
      title: 'Programming Languages', 
      items: [
        { name: 'JavaScript', icon: SiJavascript },
        { name: 'Python', icon: SiPython },
        { name: 'Java', icon: Code },
        { name: 'C', icon: Code },
      ]
    },
    { 
      title: 'Frontend Development', 
      items: [
        { name: 'HTML & CSS', icon: SiHtml5 },
        { name: 'React.js', icon: SiReact },
        { name: 'React Native', icon: SiReact },
        { name: 'Next.js', icon: SiNextdotjs },
      ]
    },
    { 
      title: 'Backend Development', 
      items: [
        { name: 'Node.js', icon: SiNodedotjs },
        { name: 'Express.js', icon: SiExpress },
        { name: 'FastAPI', icon: SiFastapi },
      ]
    },
    { 
      title: 'Database', 
      items: [
        { name: 'Firebase', icon: SiFirebase },
        { name: 'Supabase', icon: SiSupabase },
      ]
    },
    { 
      title: 'Tools & Platforms', 
      items: [
        { name: 'Git & GitHub', icon: SiGit },
        { name: 'Render', icon: SiRender },
        { name: 'Vercel', icon: SiVercel },
        { name: 'Cloudflare', icon: SiCloudflare },
      ]
    },
  ]

  return (
    <section id="skills" className="bg-surface min-h-[80vh] flex items-center px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-2xl font-semibold tracking-tight sm:text-3xl">
          Technical Skills
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {groups.map(({ title, items }, i) => (
            <ScrollReveal key={title} delay={i * 100} distance={36}>
              <div>
                <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">
                  {title}
                </h3>
                <ul className="space-y-2">
                  {items.map(({ name, icon: Icon }) => (
                    <li
                      key={name}
                      className="flex items-center gap-2 rounded-md border border-white/5 bg-background px-3 py-2 text-sm text-muted transition-colors hover:border-primary/20 hover:text-foreground"
                    >
                      <Icon size={16} className="shrink-0" />
                      {name}
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