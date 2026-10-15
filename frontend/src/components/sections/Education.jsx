import { GraduationCap, School } from 'lucide-react'

const education = [
  {
    icon: GraduationCap,
    title: 'Bachelor of Science in Information Technology — Cum Laude',
    school: 'Cebu Technological University - Naga Extension Campus',
    location: 'City of Naga, Cebu, Philippines',
    path: 'CTU-Naga/BSIT/cum laude',
    year: '2022 – 2026',
    description:
      'Studied software development, system design, and technology management. Graduated Cum Laude.',
  },
  {
    icon: School,
    title: 'Senior High School (STEM Track)',
    school: 'Don Andres Soriano National High School',
    location: 'DAS Lutopan, Toledo City, Cebu, Philippines',
    path: 'DAS-NHS/stem',
    year: '2020 – 2022',
    description:
      'Studied mathematics and science in the STEM track before taking BSIT.',
  },
]

export default function Education() {
  return (
    <section id="education" className="about-section" aria-labelledby="education-heading">
      <h2 id="education-heading">Education</h2>
      <p>My college and senior high school education.</p>
      <div className="detail-list">{education.map(({ title, school, location, year, description }) => <article key={title}><span className="metadata">{year}</span><h3>{title}</h3><p className="font-medium text-foreground">{school}</p><p>{location}</p><p>{description}</p></article>)}</div>
    </section>
  )
}
