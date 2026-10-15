import { Code, Globe, Layers, Rocket } from 'lucide-react'

const events = [
  {
    year: '2022 – 2023',
    title: 'Foundations in Programming',
    description:
      'Started learning C programming at CTU Naga, building core logic and problem-solving skills. Later transitioned to Java, studying Data Structures and Algorithms under Mr. Anqui to strengthen algorithmic thinking.',
    commit: 'init: foundations',
    branch: 'C',
    icon: Code,
    tags: ['C', 'Java', 'DSA'],
  },
  {
    year: '2023 – 2024',
    title: 'Web Development & OOP Fundamentals',
    description:
      'Explored web development with HTML, CSS, and JavaScript. Learned PHP and MySQL for database-driven applications, while studying Object-Oriented Programming with C# covering encapsulation, inheritance, and polymorphism.',
    commit: 'feat: web basics',
    branch: 'web',
    icon: Globe,
    tags: ['HTML/CSS', 'JavaScript', 'PHP', 'C#'],
  },
  {
    year: '2024 – 2025',
    title: 'Modern Web Technologies & Cloud Tools',
    description:
      'Transitioned into component-based frontend development with React. Adopted Firebase and later Supabase for authentication and cloud databases, expanding into full-stack workflows and real-time application systems.',
    commit: 'feat: modern stack',
    branch: 'react',
    icon: Layers,
    tags: ['React', 'Firebase', 'Supabase'],
  },
  {
    year: '2025 – 2026',
    title: 'Full-Stack Development & Deployment',
    description:
      'Developed and deployed full-stack applications using React, Node.js, Express.js, and Supabase. Built cross-platform mobile apps with React Native. Gained real-world internship experience with deployment tools like Render, NGINX, AWS, and NSSM.',
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
      <p>The key milestones in my development journey, from programming foundations to full-stack deployment.</p>
      <div className="detail-list">{events.map(({ year, title, description, tags }) => <article key={title}><span className="metadata">{year}</span><h3>{title}</h3><p>{description}</p><div className="project-tags">{tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div></article>)}</div>
    </section>
  )
}
