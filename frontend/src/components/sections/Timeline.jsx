import { Code, Globe, Layers, Rocket } from 'lucide-react'
import ScrollReveal from '../ScrollReveal'

const events = [
  {
    year: '2022 – 2023',
    title: 'Foundations in Programming',
    description:
      'Started learning C programming at CTU Naga, building core logic and problem-solving skills. Later transitioned to Java, studying Data Structures and Algorithms under Mr. Anqui to strengthen algorithmic thinking.',
    icon: Code,
    tags: ['C', 'Java', 'DSA'],
  },
  {
    year: '2023 – 2024',
    title: 'Web Development & OOP Fundamentals',
    description:
      'Explored web development with HTML, CSS, and JavaScript. Learned PHP and MySQL for database-driven applications, while studying Object-Oriented Programming with C# covering encapsulation, inheritance, and polymorphism.',
    icon: Globe,
    tags: ['HTML/CSS', 'JavaScript', 'PHP', 'C#'],
  },
  {
    year: '2024 – 2025',
    title: 'Modern Web Technologies & Cloud Tools',
    description:
      'Transitioned into component-based frontend development with React. Adopted Firebase and later Supabase for authentication and cloud databases, expanding into full-stack workflows and real-time application systems.',
    icon: Layers,
    tags: ['React', 'Firebase', 'Supabase'],
  },
  {
    year: '2025 – 2026',
    title: 'Full-Stack Development & Deployment',
    description:
      'Developed and deployed full-stack applications using React, Node.js, Express.js, and Supabase. Built cross-platform mobile apps with React Native. Gained real-world internship experience with deployment tools like Render, NGINX, AWS, and NSSM.',
    icon: Rocket,
    tags: ['Node.js', 'Express', 'React Native', 'Render'],
  },
]

export default function Timeline() {
  return (
    <section id="timeline" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          Technical Timeline
        </h2>
        <p className="mb-12 max-w-2xl text-muted leading-relaxed">
          A look back at the key milestones in my development journey.
        </p>

        <div className="relative space-y-10 pl-10 before:absolute before:bottom-0 before:left-[11px] before:top-0 before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-primary/50 before:to-transparent">
          {events.map(({ year, title, description, icon: Icon, tags }, i) => (
            <ScrollReveal key={i} delay={i * 100} distance={36}>
              <div className="relative">
                <span className="absolute -left-10 top-1.5 flex size-[23px] items-center justify-center rounded-full border-2 border-primary bg-background">
                  <Icon size={11} className="text-primary" />
                </span>
                <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-primary">
                  {year}
                </span>
                <h3 className="mb-1 font-medium">{title}</h3>
                <p className="max-w-lg text-sm text-muted leading-relaxed">
                  {description}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
