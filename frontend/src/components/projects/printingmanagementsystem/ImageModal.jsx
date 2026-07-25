import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export default function ImageModal({ images, currentIndex, onClose, onNavigate }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onNavigate(currentIndex - 1)
      if (e.key === 'ArrowRight') onNavigate(currentIndex + 1)
    },
    [currentIndex, onClose, onNavigate]
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

  return createPortal(
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-3 top-3 z-20 flex size-9 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 sm:right-5 sm:top-5 sm:size-10"
        aria-label="Close"
      >
        <X size={20} />
      </button>

      <div
        className="flex w-full max-w-5xl flex-col items-center px-4 sm:px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full items-center gap-2 sm:gap-4">
          {hasPrev && (
            <button
              type="button"
              onClick={() => onNavigate(currentIndex - 1)}
              className="z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 sm:size-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          <div className="flex min-h-0 flex-1 items-center justify-center">
            <img
              src={image.src}
              alt={image.title}
              className="max-h-[80vh] w-full rounded-lg object-contain"
            />
          </div>

          {hasNext && (
            <button
              type="button"
              onClick={() => onNavigate(currentIndex + 1)}
              className="z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 sm:size-10"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        <div className="mt-4 text-center">
          <h3 className="text-base font-medium text-white sm:text-lg">{image.title}</h3>
          <p className="mt-1 text-xs text-white/60 sm:text-sm">{image.description}</p>
          <p className="mt-1.5 text-xs text-white/40">
            {currentIndex + 1} / {images.length}
          </p>
        </div>

        <div className="mt-3 flex gap-2">
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
