import ScrollReveal from '../components/ScrollReveal'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import FeaturedProjects from '../components/sections/FeaturedProjects'
import Timeline from '../components/sections/Timeline'
import Skills from '../components/sections/Skills'
import Education from '../components/sections/Education'
import Awards from '../components/sections/Awards'
import ContactSection from '../components/sections/ContactSection'

export default function Home() {
  return (
    <>
      <ScrollReveal immediate>
        <Hero />
      </ScrollReveal>

      <div className="section-divider">
        <ScrollReveal distance={56}>
          <About />
        </ScrollReveal>
      </div>

      <ScrollReveal distance={56}>
        <Skills />
      </ScrollReveal>

      <div className="section-divider">
        <ScrollReveal distance={56}>
          <FeaturedProjects />
        </ScrollReveal>
      </div>

      <ScrollReveal distance={56}>
        <Timeline />
      </ScrollReveal>

      <div className="section-divider">
        <ScrollReveal distance={56}>
          <Education />
        </ScrollReveal>
      </div>

      <ScrollReveal distance={56}>
        <Awards />
      </ScrollReveal>

      <div className="section-divider">
        <ScrollReveal distance={56}>
          <ContactSection />
        </ScrollReveal>
      </div>
    </>
  )
}
