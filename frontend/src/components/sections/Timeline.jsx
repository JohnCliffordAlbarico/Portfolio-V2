import ScrollReveal from '../ScrollReveal'

const events = [
  {
    year: '2024',
    title: 'Started Web Development',
    description:
      'Began learning modern web development with HTML, CSS, and JavaScript. Built foundational skills in frontend technologies and version control with Git.',
  },
  {
    year: '2025',
    title: 'Built Clinic Management System',
    description:
      'Developed a full-stack medical clinic management platform using React, Express, and Supabase as a capstone project. Integrated role-based access and disease forecasting.',
  },
  {
    year: '2025',
    title: 'Started Mobile Development',
    description:
      'Expanded into mobile development with React Native. Built a Pomodoro productivity app with Supabase authentication and Google login.',
  },
  {
    year: '2026',
    title: 'Built Workspace Productivity Platform',
    description:
      'Developed a comprehensive productivity system with task management, analytics, and team collaboration features using modern web technologies.',
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
