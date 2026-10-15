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
      'Comprehensive foundation in software development, system design, and technology management with consistent academic excellence throughout the program.',
  },
  {
    icon: School,
    title: 'Senior High School (STEM Track)',
    school: 'Don Andres Soriano National High School',
    location: 'DAS Lutopan, Toledo City, Cebu, Philippines',
    path: 'DAS-NHS/stem',
    year: '2020 – 2022',
    description:
      'Strong foundation in mathematics, science, and analytical thinking essential for technology careers.',
  },
]

export default function Education() {
  return (
    <section id="education" className="about-section" aria-labelledby="education-heading">
      <h2 id="education-heading">Education</h2>
      <p>Academic foundations built through technology education, culminating in a bachelor's degree with honors.</p>
      <div className="detail-list">{education.map(({ title, school, location, year, description }) => <article key={title}><span className="metadata">{year}</span><h3>{title}</h3><p className="font-medium text-foreground">{school}</p><p>{location}</p><p>{description}</p></article>)}</div>
    </section>
  )
}
