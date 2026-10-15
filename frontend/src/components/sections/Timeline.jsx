import { Code, Globe, Layers, Rocket } from 'lucide-react'

const events = [
  {
    year: '2022 – 2023',
    title: 'Foundations in Programming',
    description:
      'Started with C at CTU Naga, then learned Java and Data Structures and Algorithms under Mr. Anqui.',
    commit: 'init: foundations',
    branch: 'C',
    icon: Code,
    tags: ['C', 'Java', 'DSA'],
  },
  {
    year: '2023 – 2024',
    title: 'Web Development & OOP Fundamentals',
    description:
      'Learned HTML, CSS, JavaScript, PHP, and MySQL, and studied object-oriented programming in C#.',
    commit: 'feat: web basics',
    branch: 'web',
    icon: Globe,
    tags: ['HTML/CSS', 'JavaScript', 'PHP', 'C#'],
  },
  {
    year: '2024 – 2025',
    title: 'React, authentication, and databases',
    description:
      'Built React interfaces and started using Firebase and Supabase for authentication and databases.',
    commit: 'feat: modern stack',
    branch: 'react',
    icon: Layers,
    tags: ['React', 'Firebase', 'Supabase'],
  },
  {
    year: '2025 – 2026',
    title: 'Full-Stack Development & Deployment',
    description:
      'Built and deployed applications with React, Node.js, Express, and Supabase. Worked with React Native for mobile apps and used Render, NGINX, AWS, and NSSM during my internship.',
    commit: 'release: v1.0.0',
    branch: 'main',
    icon: Rocket,
    tags: ['Node.js', 'Express', 'React Native', 'Render'],
  },
]

export default function Timeline() {
  return (
    <section id="timeline" className="about-section" aria-labelledby="timeline-heading">
      <h2 id="timeline-heading">Technical timeline</h2>
      <p>What I studied and built from 2022 to 2026.</p>
      <div className="detail-list">{events.map(({ year, title, description, tags }) => <article key={title}><span className="metadata">{year}</span><h3>{title}</h3><p>{description}</p><div className="project-tags">{tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div></article>)}</div>
    </section>
  )
}
