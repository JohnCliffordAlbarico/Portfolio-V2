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

      <ScrollReveal distance={56}>
        <About />
      </ScrollReveal>

      <ScrollReveal distance={56}>
        <Skills />
      </ScrollReveal>

      <ScrollReveal distance={56}>
        <FeaturedProjects />
      </ScrollReveal>

      <ScrollReveal distance={56}>
        <Timeline />
      </ScrollReveal>

      <ScrollReveal distance={56}>
        <Education />
      </ScrollReveal>

      <ScrollReveal distance={56}>
        <Awards />
      </ScrollReveal>

      <ScrollReveal distance={56}>
        <ContactSection />
      </ScrollReveal>
    </>
  )
}
