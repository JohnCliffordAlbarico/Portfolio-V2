import { useEffect, useCallback } from 'react'
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

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-surface/80 p-2 text-muted transition-colors hover:text-foreground"
        aria-label="Close"
      >
        <X size={20} />
      </button>

      <div
        className="relative mx-4 flex max-h-[90vh] max-w-5xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex items-center justify-center">
          {hasPrev && (
            <button
              type="button"
              onClick={() => onNavigate(currentIndex - 1)}
              className="absolute -left-12 z-10 rounded-full bg-surface/80 p-2 text-muted transition-colors hover:text-foreground lg:-left-14"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <img
            src={image.src}
            alt={image.title}
            className="max-h-[70vh] rounded-lg object-contain"
          />

          {hasNext && (
            <button
              type="button"
              onClick={() => onNavigate(currentIndex + 1)}
              className="absolute -right-12 z-10 rounded-full bg-surface/80 p-2 text-muted transition-colors hover:text-foreground lg:-right-14"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        <div className="mt-4 w-full text-center">
          <h3 className="text-lg font-medium text-foreground">{image.title}</h3>
          <p className="mt-1 text-sm text-muted">{image.description}</p>
          <p className="mt-2 text-xs text-muted/60">
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
                i === currentIndex ? 'bg-primary' : 'bg-muted/30 hover:bg-muted/50'
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}