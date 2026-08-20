import { useState } from 'react'
import { Maximize2 } from 'lucide-react'
import ImageModal from '../../DevModal'

const images = [
  {
    src: '/bacaltosproject/consoleui.png',
    title: 'Desktop Controller',
    description:
      'Electron-based system tray application for managing backend services. Displays real-time server and database status with auto-launch settings.',
    tags: ['Electron', 'System Tray'],
    status: 'desktop-app · offline',
  },
  {
    src: '/bacaltosproject/login_page.png',
    title: 'Login Page',
    description:
      'Clean login interface for clinic staff with username and password authentication.',
    tags: ['React', 'Auth'],
    status: 'desktop-app · offline',
  },
  {
    src: '/bacaltosproject/MAIN UI.png',
    title: 'Dashboard',
    description:
      'Main dashboard with patient stats, prescriptions, medical records, inventory, and quick actions for daily clinic operations.',
    tags: ['React', 'Dashboard'],
    status: 'desktop-app · offline',
  },
  {
    src: '/bacaltosproject/Cloudsync.png',
    title: 'Cloud Sync',
    description:
      'Turso Cloud integration for offsite database backup with manual sync, auto-sync, and full sync history logging.',
    tags: ['Turso', 'Cloudflare R2'],
    status: 'desktop-app · offline',
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

          <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="flex items-center gap-2 text-xs font-medium text-amber-400">
              <span className="size-1.5 shrink-0 rounded-full bg-amber-400" />
              Desktop App
            </div>
            <p className="mt-2 text-xs text-muted leading-relaxed">
              Runs locally via Electron; no public URL — the live deployment belongs to the
              capstone project. Built for Bacaltos Medical Clinic to streamline patient records,
              prescriptions, inventory, and cloud backups across branches.
            </p>
            <div className="mt-2 space-y-1 text-xs text-muted">
              <p>
                Client Email:{' '}
                <a href="mailto:bacaltosjean@gmail.com" className="text-primary hover:underline">
                  bacaltosjean@gmail.com
                </a>
              </p>
              <p>
                Facebook:{' '}
                <a
                  href="https://www.facebook.com/bacaltosmc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Bacaltos Medical Clinic
                </a>
              </p>
            </div>
          </div>

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
