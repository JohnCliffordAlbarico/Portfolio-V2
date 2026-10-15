import { Code, Briefcase, Target } from 'lucide-react'

const highlights = [
  {
    icon: Code,
    title: 'Web, desktop, and mobile development',
    description:
      'I use React for interfaces, Node.js and Express for APIs, and Electron for desktop applications. I have also worked with React Native for mobile apps.',
  },
  {
    icon: Briefcase,
    title: 'Internship and capstone',
    description:
      'During my internship at Open Space Technology, I worked on inventory and admin systems. My capstone was a clinic management web app with disease forecasting.',
  },
  {
    icon: Target,
    title: 'Looking for a developer role',
    description:
      'I am looking for a software development role where I can work with a team and keep building web, mobile, or desktop applications.',
  },
]

export default function About() {
  return (
    <section id="about" className="about-section" aria-labelledby="about-heading">
      <h2 id="about-heading">My background</h2>
      <p>I'm John Clifford M. Albarico, a BSIT graduate from Cebu Technological University – Naga Extension Campus. I've worked on client websites, clinic software, and personal projects, including a task tracker I use to review my work.</p>
      <div className="metadata mb-6">Client work: 1 active client · 2 total clients</div>
      <div className="detail-list">{highlights.map(({ icon: Icon, title, description }) => <article key={title}><Icon size={20} aria-hidden="true" /><h3>{title}</h3><p>{description}</p></article>)}</div>
      <a className="text-link mt-6" href="https://www.facebook.com/albarico.clifford" target="_blank" rel="noopener noreferrer">Find me on Facebook</a>
    </section>
  )
}
