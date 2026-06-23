import { Award, GraduationCap } from 'lucide-react'
import awardImage from '../../assets/award.jpg'
import diplomaImage from '../../assets/diploma.jpg'
import ScrollReveal from '../ScrollReveal'

const items = [
  {
    image: awardImage,
    icon: Award,
    title: 'Codathon Champion — Technolympics 2025',
    description:
      'Named champion of the Codathon at Technolympics 2025, a flagship event of TechnoWeek at Cebu Technological University (CTU) Naga Extension Campus. Competed individually against fellow students, using programming to solve tasks set by faculty within a limited timeframe — testing problem-solving, logic, and coding proficiency under pressure.',
  },
  {
    image: diplomaImage,
    icon: GraduationCap,
    title: 'Bachelor of Science in Information Technology — Cum Laude',
    description:
      'Graduated with Cum Laude honors from the Bachelor of Science in Information Technology program for School Year 2025–2026. The distinction reflects consistent academic excellence and a strong foundation in software development throughout the degree.',
  },
]

export default function Awards() {
  return (
    <section id="awards" className="bg-surface min-h-[80vh] flex items-center px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          Awards & Certifications
        </h2>
        <p className="mb-12 max-w-2xl text-muted leading-relaxed">
          Highlights from academic honors and competitive achievements — recognition
          earned through consistent effort in the classroom and strong performance
          when it mattered most.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {items.map(({ image, icon: Icon, title, description }, i) => (
            <ScrollReveal key={title} delay={i * 150} distance={44}>
              <article className="overflow-hidden rounded-xl border border-white/5 bg-background transition-colors hover:border-primary/20">
                <div className="aspect-[4/3] overflow-hidden bg-surface">
                  <img
                    src={image}
                    alt={title}
                    className="size-full object-cover object-center"
                  />
                </div>
                <div className="space-y-3 p-6">
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
