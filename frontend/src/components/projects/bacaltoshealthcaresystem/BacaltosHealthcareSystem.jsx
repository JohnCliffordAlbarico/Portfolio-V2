import { useState } from 'react'
import { Maximize2 } from 'lucide-react'
import ImageModal from '../printingmanagementsystem/ImageModal'

const images = [
  {
    src: '/bacaltosproject/consoleui.png',
    title: 'Desktop Controller',
    description:
      'Electron-based system tray application for managing backend services. Displays real-time server and database status with auto-launch settings.',
  },
  {
    src: '/bacaltosproject/login_page.png',
    title: 'Login Page',
    description:
      'Clean login interface for clinic staff with username and password authentication.',
  },
  {
    src: '/bacaltosproject/MAIN UI.png',
    title: 'Dashboard',
    description:
      'Main dashboard with patient stats, prescriptions, medical records, inventory, and quick actions for daily clinic operations.',
  },
  {
    src: '/bacaltosproject/consoleui.png',
    title: 'Desktop Controller',
    description:
      'Electron-based system tray application for managing backend services. Displays real-time server and database status with auto-launch settings.',
  },
  {
    src: '/bacaltosproject/Cloudsync.png',
    title: 'Cloud Sync',
    description:
      'Turso Cloud integration for offsite database backup with manual sync, auto-sync, and full sync history logging.',
  },
]

export default function BacaltosHealthcareSystem() {
  const [modalIndex, setModalIndex] = useState(null)

  return (
    <>
      <div className="flex w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_24px_-4px_rgba(220,38,38,0.25)]">
        <div className="grid grid-cols-2 gap-1 p-1">
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
          <h3 className="font-medium leading-snug">Bacaltos Healthcare System</h3>
          <p className="mt-2 flex-1 text-sm text-muted leading-relaxed">
            A desktop-first clinic management system with an Electron controller,
            React dashboard for patient care, and cloud database backup via Turso.
          </p>

          <ul className="mt-3 space-y-1">
            <li className="flex items-center gap-2 text-xs text-muted">
              <span className="size-1 shrink-0 rounded-full bg-primary" />
              Electron desktop controller with system tray
            </li>
            <li className="flex items-center gap-2 text-xs text-muted">
              <span className="size-1 shrink-0 rounded-full bg-primary" />
              Multi-branch clinic management
            </li>
            <li className="flex items-center gap-2 text-xs text-muted">
              <span className="size-1 shrink-0 rounded-full bg-primary" />
              Cloud sync with Turso for offsite backup
            </li>
          </ul>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {['React', 'Express', 'Electron', 'SQLite', 'Turso', 'Cloudflare R2'].map((t) => (
              <span key={t} className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-muted">
                {t}
              </span>
            ))}
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
