import { useState } from 'react'
import { Award, GraduationCap } from 'lucide-react'
import awardImage from '../../assets/award.jpg'
import diplomaImage from '../../assets/diploma.jpg'
import ImageModal from '../DevModal'

const items = [
  {
    image: awardImage,
    icon: Award,
    badge: 'codathon-champion',
    meta: 'technoweek/2025 · solo',
    title: 'Codathon Champion — Technolympics 2025',
    description:
      'Named champion of the Codathon at Technolympics 2025, a flagship event of TechnoWeek at CTU Naga Extension Campus. Competed individually against fellow students, testing problem-solving, logic, and coding proficiency under pressure.',
  },
  {
    image: diplomaImage,
    icon: GraduationCap,
    badge: 'bsit-cum-laude',
    meta: 'ctunaga/2022-2026',
    title: 'Bachelor of Science in Information Technology — Cum Laude',
    description:
      'Graduated with Cum Laude honors from the BSIT program for School Year 2025–2026, reflecting consistent academic excellence and a strong foundation in software development.',
  },
]

export default function Awards() {
  const [modalIndex, setModalIndex] = useState(null)

  const modalImages = items.map((item) => ({
    src: item.image,
    title: item.title,
    description: item.description,
    tags: item.badge.split('-'),
    status: 'earned',
  }))

  return (
    <section id="awards" className="about-section" aria-labelledby="awards-heading">
      <h2 id="awards-heading">Awards & certifications</h2>
      <p>Academic honors and competitive achievements, with the evidence behind them.</p>
      <div className="detail-list">{items.map(({ image, meta, title, description }, index) => <article className="evidence-item" key={title}><button type="button" onClick={() => setModalIndex(index)} aria-label={`Enlarge ${title}`}><img src={image} alt={title} loading="lazy" width="100" height="100" /></button><div><span className="metadata">{meta}</span><h3>{title}</h3><p>{description}</p></div></article>)}</div>

      {modalIndex !== null && (
        <ImageModal
          images={modalImages}
          currentIndex={modalIndex}
          onClose={() => setModalIndex(null)}
          onNavigate={setModalIndex}
        />
      )}
    </section>
  )
}
