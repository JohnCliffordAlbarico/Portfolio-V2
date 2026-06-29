import { Code, Briefcase, Target } from 'lucide-react'
import ScrollReveal from '../ScrollReveal'

const highlights = [
  {
    icon: Code,
    title: 'Full-Stack Development',
    description:
      'BS IT graduate with hands-on experience building responsive web apps using React, Node.js, Express, and Supabase.',
    accent: 'border-t-primary',
  },
  {
    icon: Briefcase,
    title: 'Real-World Experience',
    description:
      'Internship at Open Space Technology building inventory and admin systems. Capstone project on clinic management with disease forecasting.',
    accent: 'border-t-accent',
  },
  {
    icon: Target,
    title: 'Growth-Oriented',
    description:
      'Constantly improving through real-world projects and problem-solving. Seeking opportunities to contribute to impactful dev teams.',
    accent: 'border-t-primary',
  },
]

export default function About() {
  return (
    <section id="about" className="min-h-[80vh] flex items-center px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          About Me
        </h2>
        <p className="mb-12 max-w-2xl text-muted leading-relaxed">
          A dedicated software developer with academic excellence and practical experience in full-stack development, ready to contribute to innovative technology solutions.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map(({ icon: Icon, title, description, accent }, i) => (
            <ScrollReveal key={title} delay={i * 150} distance={44}>
              <article className={`rounded-xl border border-white/5 border-t-2 ${accent} bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_8px_30px_-8px_rgba(220,38,38,0.2)]`}>
                <div className="space-y-4">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-surface">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-medium leading-snug">{title}</h3>
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