export default function Skills() {
  const groups = [
    { title: 'Frontend', items: ['React', 'React Native', 'Tailwind'] },
    { title: 'Backend', items: ['Express', 'Node.js', 'REST APIs'] },
    { title: 'Database', items: ['Supabase', 'PostgreSQL'] },
    { title: 'Tools', items: ['Git', 'GitHub', 'VS Code'] },
  ]

  return (
    <section id="skills" className="bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-2xl font-semibold tracking-tight sm:text-3xl">
          Skills & Technologies
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map(({ title, items }) => (
            <div key={title}>
              <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">
                {title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-white/5 bg-background px-3 py-1 text-sm text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
