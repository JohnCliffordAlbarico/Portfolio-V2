import { GraduationCap, School, MapPin } from 'lucide-react'
import ScrollReveal from '../ScrollReveal'

const education = [
  {
    icon: GraduationCap,
    title: 'Bachelor of Science in Information Technology — Cum Laude',
    school: 'Cebu Technological University - Naga Extension Campus',
    location: 'City of Naga, Cebu, Philippines',
    year: '2022 – 2026',
    description:
      'Comprehensive foundation in software development, system design, and technology management with consistent academic excellence throughout the program.',
  },
  {
    icon: School,
    title: 'Senior High School (STEM Track)',
    school: 'Don Andres Soriano National High School',
    location: 'DAS Lutopan, Toledo City, Cebu, Philippines',
    year: '2020 – 2022',
    description:
      'Strong foundation in mathematics, science, and analytical thinking essential for technology careers.',
  },
]

export default function Education() {
  return (
    <section id="education" className="min-h-[80vh] flex items-center px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          Education
        </h2>
        <p className="mb-12 max-w-2xl text-muted leading-relaxed">
          Academic foundation built through comprehensive technology education, culminating in a Bachelor's degree with honors.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {education.map(({ icon: Icon, title, school, location, year, description }, i) => (
            <ScrollReveal key={title} delay={i * 150} distance={44}>
              <article className="flex gap-4 rounded-xl border border-white/5 bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_8px_30px_-8px_rgba(220,38,38,0.15)]">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-surface">
                  <Icon size={22} className="text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium leading-snug">{title}</h3>
                  <p className="text-sm font-medium text-foreground">{school}</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {location}
                    </span>
                    <span className="rounded-md bg-white/5 px-2 py-0.5">{year}</span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{description}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}