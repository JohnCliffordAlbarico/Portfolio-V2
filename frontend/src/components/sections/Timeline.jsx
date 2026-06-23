import ScrollReveal from '../ScrollReveal'

const events = [
  {
    year: '2022 – 2023',
    title: 'Foundations in Programming',
    description:
      'Started learning C programming at CTU Naga, building core logic and problem-solving skills. Later transitioned to Java, studying Data Structures and Algorithms under Mr. Anqui to strengthen algorithmic thinking.',
  },
  {
    year: '2023 – 2024',
    title: 'Web Development & OOP Fundamentals',
    description:
      'Explored web development with HTML, CSS, and JavaScript. Learned PHP and MySQL for database-driven applications, while studying Object-Oriented Programming with C# covering encapsulation, inheritance, and polymorphism.',
  },
  {
    year: '2024 – 2025',
    title: 'Modern Web Technologies & Cloud Tools',
    description:
      'Transitioned into component-based frontend development with React. Adopted Firebase and later Supabase for authentication and cloud databases, expanding into full-stack workflows and real-time application systems.',
  },
  {
    year: '2025 – 2026',
    title: 'Full-Stack Development & Deployment',
    description:
      'Developed and deployed full-stack applications using React, Node.js, Express.js, and Supabase. Built cross-platform mobile apps with React Native. Gained real-world internship experience with deployment tools like Render, NGINX, AWS, and NSSM.',
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

        <div className="relative space-y-8 pl-8 before:absolute before:bottom-0 before:left-[7px] before:top-0 before:w-px before:bg-white/10">
          {events.map(({ year, title, description }, i) => (
            <ScrollReveal key={i} delay={i * 100} distance={36}>
              <div className="relative">
                <span className="absolute -left-8 top-1.5 flex size-[15px] items-center justify-center rounded-full border-2 border-primary bg-background">
                  <span className="size-[7px] rounded-full bg-primary" />
                </span>
                <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-primary">
                  {year}
                </span>
                <h3 className="mb-1 font-medium">{title}</h3>
                <p className="max-w-lg text-sm text-muted leading-relaxed">
                  {description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
