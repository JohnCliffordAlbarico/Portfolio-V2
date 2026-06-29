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
      'Named champion of the Codathon at Technolympics 2025, a flagship event of TechnoWeek at CTU Naga Extension Campus. Competed individually against fellow students, testing problem-solving, logic, and coding proficiency under pressure.',
  },
  {
    image: diplomaImage,
    icon: GraduationCap,
    title: 'Bachelor of Science in Information Technology — Cum Laude',
    description:
      'Graduated with Cum Laude honors from the BS IT program for School Year 2025–2026, reflecting consistent academic excellence and a strong foundation in software development.',
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
          earned through consistent effort and strong performance.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {items.map(({ image, icon: Icon, title, description }, i) => (
            <ScrollReveal key={title} delay={i * 150} distance={44}>
              <article className="flex gap-4 overflow-hidden rounded-xl border border-white/5 bg-background transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_8px_30px_-8px_rgba(220,38,38,0.15)]">
                <div className="size-28 shrink-0 overflow-hidden bg-surface sm:size-32">
                  <img
                    src={image}
                    alt={title}
                    className="size-full object-cover object-center"
                  />
                </div>
                <div className="flex flex-col justify-center space-y-2 py-4 pr-4">
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-surface">
                      <Icon size={14} className="text-primary" />
                    </div>
                    <h3 className="text-sm font-medium leading-snug">{title}</h3>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">{description}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
