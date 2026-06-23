import { GraduationCap, School } from 'lucide-react'
import ScrollReveal from '../ScrollReveal'

const education = [
  {
    icon: GraduationCap,
    title: 'Bachelor of Science in Information Technology — Cum Laude',
    description:
      'Graduated with Cum Laude honors from Cebu Technological University - Naga Extension Campus (2022–2026) in City of Naga, Cebu, Philippines. The degree program provided comprehensive foundation in software development, system design, and technology management with consistent academic excellence throughout the program.',
  },
  {
    icon: School,
    title: 'Senior High School (STEM Track)',
    description:
      'Completed Senior High School with STEM specialization at Don Andres Soriano National High School (2020–2022) in DAS Lutopan, Toledo City, Cebu, Philippines. The STEM track provided strong foundation in mathematics, science, and analytical thinking essential for technology careers.',
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
          Academic foundation built through comprehensive technology education, culminating in a Bachelor's degree with honors and specialized preparation for software development careers.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {education.map(({ icon: Icon, title, description }, i) => (
            <ScrollReveal key={title} delay={i * 150} distance={44}>
              <article className="rounded-xl border border-white/5 bg-background p-6 transition-colors hover:border-primary/20">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <h3 className="font-medium leading-snug">{title}</h3>
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