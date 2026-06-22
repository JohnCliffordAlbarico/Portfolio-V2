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
      <Hero />
      <About />
      <FeaturedProjects />
      <Timeline />
      <Skills />
      <Education />
      <Awards />
      <ContactSection />
    </>
  )
}
