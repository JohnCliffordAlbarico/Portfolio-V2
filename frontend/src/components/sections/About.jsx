import { Code, Briefcase, Target } from 'lucide-react'

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
    <section id="about" className="about-section" aria-labelledby="about-heading">
      <h2 id="about-heading">Software, built to be useful.</h2>
      <p>I'm John Clifford M. Albarico, a software developer passionate about building modern web, mobile, and desktop applications. I focus on creating scalable, efficient, and user-centered systems while continuously improving my development skills.</p>
      <div className="metadata mb-6">Client work: 1 active client · 2 total clients</div>
      <div className="detail-list">{highlights.map(({ icon: Icon, title, description }) => <article key={title}><Icon size={20} aria-hidden="true" /><h3>{title}</h3><p>{description}</p></article>)}</div>
      <a className="text-link mt-6" href="https://www.facebook.com/albarico.clifford" target="_blank" rel="noopener noreferrer">Find me on Facebook</a>
    </section>
  )
}
