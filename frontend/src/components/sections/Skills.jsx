import { Zap, ServerCog } from 'lucide-react'
import { 
  SiJavascript, 
  SiTypescript,
  SiPython, 
  SiOpenjdk,
  SiHtml5,
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

export default function Skills() {
  return (
    <section id="skills" className="about-section" aria-labelledby="skills-heading">
      <h2 id="skills-heading">Technical skills</h2>
      <p>Languages, frameworks, databases, and tools I've worked with.</p>
      <div className="skill-groups">{groups.map(({ title, items }) => <div key={title}><h3>{title}</h3><ul className="skill-list">{items.map(({ name, icon: Icon, level }) => <li key={name} title={`Self-assessed proficiency: ${level} / 5`}><Icon size={17} aria-hidden="true" />{name}</li>)}</ul></div>)}</div>
    </section>
  )
}
