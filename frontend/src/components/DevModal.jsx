import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

function filenameFromSrc(src) {
  return src.split('/').pop()
}

export default function DevModal({ images, currentIndex, onClose, onNavigate }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1)
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1)
        onNavigate(currentIndex + 1)
    },
    [currentIndex, images.length, onClose, onNavigate]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  const image = images[currentIndex]
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < images.length - 1
  const file = image.file || filenameFromSrc(image.src)

  return createPortal(
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-white/10 bg-background shadow-[0_0_60px_-12px_rgba(220,38,38,0.35)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-primary/80" />
          <span className="size-2.5 rounded-full bg-primary/40" />
          <span className="size-2.5 rounded-full bg-primary/20" />
          <span className="ml-3 truncate font-mono text-xs text-muted">~/{file}</span>
          <span className="ml-auto font-mono text-xs text-muted">
            {currentIndex + 1} / {images.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 flex size-7 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex max-h-[80vh] flex-col overflow-y-auto md:flex-row md:overflow-hidden">
          <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black/40 md:min-w-0">
            <img
              src={image.src}
              alt={image.title}
              className="max-h-[50vh] w-full object-contain md:max-h-[72vh]"
            />
            {hasPrev && (
              <button
                type="button"
                onClick={() => onNavigate(currentIndex - 1)}
                className="absolute left-2 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 sm:size-10"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            {hasNext && (
              <button
                type="button"
                onClick={() => onNavigate(currentIndex + 1)}
                className="absolute right-2 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 sm:size-10"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>

          <div className="w-full shrink-0 border-t border-white/10 bg-white/[0.02] p-5 font-mono text-sm leading-relaxed md:w-[46%] md:border-l md:border-t-0 md:overflow-y-auto">
            <p className="w-full">
              <span className="text-primary">$</span>{' '}
              <span className="text-muted">cat ~/slides/{String(currentIndex + 1).padStart(2, '0')}</span>
            </p>
            <p className="mt-4 w-full text-primary"># {image.title}</p>
            <p className="mt-2 w-full break-words text-muted leading-relaxed">
              {image.description}
            </p>
            {image.tags && (
              <p className="mt-4 w-full">
                <span className="text-foreground">{'{ '}</span>
                <span className="text-muted">tags:</span>
                <span className="text-foreground"> {image.tags.join(', ')}{' }'}</span>
              </p>
            )}
            {image.status && (
              <p className="mt-1 w-full">
                <span className="text-foreground">{'{ '}</span>
                <span className="text-muted">status:</span>
                <span className="text-primary"> {image.status}</span>
                <span className="text-foreground">{' }'}</span>
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 border-t border-white/10 bg-white/[0.03] px-4 py-3">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onNavigate(i)}
              className={`size-2 rounded-full transition-colors ${
                i === currentIndex ? 'bg-primary' : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>,
    document.body
  )
}