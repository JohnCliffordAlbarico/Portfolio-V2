import { useState } from 'react'
import { ExternalLink, Maximize2 } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import ImageModal from '../../DevModal'

const images = [
  {
    src: '/printingmanagementpic/1.png',
    title: 'Desktop Controller',
    description:
      'Electron-based system tray application for managing backend services. Displays real-time status of the server and database, with auto-launch settings and live console output.',
    tags: ['Electron', 'System Tray'],
    status: 'shipped',
  },
  {
    src: '/printingmanagementpic/2.png',
    title: 'System Status Monitor',
    description:
      'System health dashboard showing backend server and database connectivity. Provides quick access to open the React dashboard, with options to stop, hide, or quit the application.',
    tags: ['Electron', 'Status Dashboard'],
    status: 'shipped',
  },
  {
    src: '/printingmanagementpic/3.png',
    title: 'Web Dashboard',
    description:
      'Admin dashboard with sidebar navigation for managing transactions, customers, payments, users, and audit logs. Features summary cards, revenue analytics, and recent activity overview.',
    tags: ['React', 'Express'],
    status: 'shipped',
  },
]

export default function PrintingManagementSystem() {
  const [modalIndex, setModalIndex] = useState(null)

  return (
    <>
      <div className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_24px_-4px_rgba(220,38,38,0.25)]">
        <div className="grid grid-cols-3 gap-1 p-1">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setModalIndex(i)}
              className="group relative aspect-video cursor-pointer overflow-hidden rounded-md"
            >
              <img
                src={img.src}
                alt={img.title}
                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/40">
                <Maximize2
                  size={18}
                  className="text-white opacity-0 transition-opacity group-hover:opacity-100"
                />
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-col p-5">
          <h3 className="font-medium leading-snug">Printing Management System</h3>
          <p className="mt-2 flex-1 text-sm text-muted leading-relaxed">
            A full-stack print shop management system with an Electron desktop controller,
            Express backend, and React admin dashboard for handling transactions, customers,
            and payments.
          </p>

          <ul className="mt-3 space-y-1">
            <li className="flex items-center gap-2 text-xs text-muted">
              <span className="size-1 shrink-0 rounded-full bg-primary" />
              Electron desktop controller with system tray
            </li>
            <li className="flex items-center gap-2 text-xs text-muted">
              <span className="size-1 shrink-0 rounded-full bg-primary" />
              Role-based admin dashboard
            </li>
            <li className="flex items-center gap-2 text-xs text-muted">
              <span className="size-1 shrink-0 rounded-full bg-primary" />
              Transaction and payment tracking
            </li>
          </ul>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {['Electron', 'React', 'Express', 'Node.js'].map((t) => (
              <span key={t} className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-muted">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3">
            <a
              href="https://github.com/JohnCliffordAlbarico/Printing-Management-System"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
            >
              Source <SiGithub size={12} />
            </a>
          </div>
        </div>
      </div>

      {modalIndex !== null && (
        <ImageModal
          images={images}
          currentIndex={modalIndex}
          onClose={() => setModalIndex(null)}
          onNavigate={setModalIndex}
        />
      )}
    </>
  )
}