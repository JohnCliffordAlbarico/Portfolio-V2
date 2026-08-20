import { Code, Briefcase, Target } from 'lucide-react'
import ScrollReveal from '../ScrollReveal'
import SectionHeading from '../SectionHeading'
import ChromeBar from '../ChromeBar'

const highlights = [
  {
    icon: Code,
    title: 'Full-Stack Development',
    description:
      'BSIT graduate with hands-on experience building responsive web apps using React, Node.js, Express, and Supabase.',
  },
  {
    icon: Briefcase,
    title: 'Real-World Experience',
    description:
      'Internship at Open Space Technology building inventory and admin systems. Capstone project on clinic management with disease forecasting.',
  },
  {
    icon: Target,
    title: 'Growth-Oriented',
    description:
      'Constantly improving through real-world projects and problem-solving. Seeking opportunities to contribute to impactful dev teams.',
  },
]

export default function About() {
  return (
    <section id="about" className="min-h-[80vh] flex items-center px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="developer"
          title="About Me"
          description="A software developer passionate about building modern web, mobile, and desktop applications. Focused on creating scalable, efficient, and user-centered systems while continuously improving my development skills."
        />

        <ScrollReveal distance={44}>
          <div className="mb-8 overflow-hidden rounded-xl border border-white/10 bg-surface">
            <ChromeBar filename="src/profile.ts" />
            <div className="overflow-x-auto px-5 py-4 font-mono text-sm leading-relaxed">
              <pre className="text-muted">
                <span className="text-foreground">const</span>{' '}
                <span className="text-primary">developer</span>{' '}
                <span className="text-foreground">=</span> {'{'}
                {'\n  '}name:{' '}
                <span className="text-accent">&apos;John Clifford M. Albarico&apos;</span>
                ,{'\n  '}role:{' '}
                <span className="text-accent">&apos;Software Developer&apos;</span>
                ,{'\n  '}stack:{' '}
                <span className="text-muted">[</span>
                <span className="text-accent">&apos;React&apos;</span>,{' '}
                <span className="text-accent">&apos;React Native&apos;</span>,{' '}
                <span className="text-accent">&apos;Electron&apos;</span>,{' '}
                <span className="text-accent">&apos;Express&apos;</span>,{' '}
                <span className="text-accent">&apos;Node.js&apos;</span>
                <span className="text-muted">]</span>
                ,{'\n  '}focus:{' '}
                <span className="text-accent">
                  &apos;scalable, efficient, user-centered systems&apos;
                </span>
                ,{'\n'}
                {'}'}
              </pre>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map(({ icon: Icon, title, description }, i) => (
            <ScrollReveal key={title} delay={i * 150} distance={44}>
              <article className="rounded-xl border border-white/5 border-t-2 border-t-primary bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_8px_30px_-8px_rgba(220,38,38,0.2)]">
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