import { Code, Briefcase, Target } from 'lucide-react'
import ScrollReveal from '../ScrollReveal'

const highlights = [
  {
    icon: Code,
    title: 'Full-Stack Development Experience',
    description:
      'Bachelor of Science in Information Technology graduate with hands-on experience in full-stack web development, specializing in building responsive and functional web applications using React.js, Node.js, and Express.js.',
  },
  {
    icon: Briefcase,
    title: 'Professional & Academic Projects',
    description:
      'Practical experience from internship at Open Space Technology, developing inventory and admin management systems with document generation features. Completed capstone project focused on clinic management with disease forecasting, combining system development with data-driven features to support healthcare operations.',
  },
  {
    icon: Target,
    title: 'Passion for Development',
    description:
      'Passionate about building efficient, user-focused systems and continuously improving technical skills through real-world projects and problem-solving. Currently seeking opportunities to further grow as a software developer and contribute to impactful development teams.',
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
          {highlights.map(({ icon: Icon, title, description }, i) => (
            <ScrollReveal key={title} delay={i * 150} distance={44}>
              <article className="rounded-xl border border-white/5 bg-background p-6 transition-colors hover:border-primary/20">
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