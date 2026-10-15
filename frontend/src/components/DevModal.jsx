import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export default function DevModal({ images, currentIndex, onClose, onNavigate }) {
  const dialogRef = useRef(null)
  const titleId = useId()
  const descriptionId = useId()
  const image = images[currentIndex]

  useEffect(() => {
    const dialog = dialogRef.current
    const previouslyFocused = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus({ preventScroll: true })
    }
  }, [])

  if (!image) return null

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft' && currentIndex > 0) { event.preventDefault(); onNavigate(currentIndex - 1) }
    if (event.key === 'ArrowRight' && currentIndex < images.length - 1) { event.preventDefault(); onNavigate(currentIndex + 1) }
  }

  return createPortal(
    <dialog ref={dialogRef} className="image-dialog" aria-labelledby={titleId} aria-describedby={descriptionId} onCancel={event => { event.preventDefault(); onClose() }} onKeyDown={onKeyDown} onClick={event => { if (event.target === event.currentTarget) onClose() }}>
      <header className="image-dialog-header"><h2 id={titleId}>{image.title}</h2><span className="metadata">{currentIndex + 1} / {images.length}</span><button className="icon-button" type="button" onClick={onClose} aria-label="Close image viewer" autoFocus><X size={20} /></button></header>
      <div className="image-dialog-body">
        <div className="image-dialog-view">
          <img src={image.src} alt={image.title} />
          {currentIndex > 0 && <button className="icon-button image-previous" type="button" aria-label="Previous image" onClick={() => onNavigate(currentIndex - 1)}><ChevronLeft size={20} /></button>}
          {currentIndex < images.length - 1 && <button className="icon-button image-next" type="button" aria-label="Next image" onClick={() => onNavigate(currentIndex + 1)}><ChevronRight size={20} /></button>}
        </div>
        <div className="image-dialog-info"><p id={descriptionId}>{image.description || image.title}</p>{image.status && <p className="metadata">{image.status}</p>}<div className="project-tags">{image.tags?.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div></div>
      </div>
      {images.length > 1 && <div className="image-dialog-footer" aria-label="Select image">{images.map((shot, index) => <button type="button" key={shot.src} aria-label={`Go to image ${index + 1}`} aria-current={index === currentIndex ? 'true' : undefined} onClick={() => onNavigate(index)}>{index + 1}</button>)}</div>}
    </dialog>, document.body,
  )
}
