export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-12">
      {eyebrow && (
        <p className="mb-2 font-mono text-sm text-primary">
          <span className="text-muted">//</span> {eyebrow}
        </p>
      )}
      <h2 className="mb-4 text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-muted leading-relaxed">{description}</p>
      )}
    </div>
  )
}