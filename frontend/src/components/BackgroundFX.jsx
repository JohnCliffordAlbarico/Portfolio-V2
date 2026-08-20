export default function BackgroundFX() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0" />
      <div className="bg-grid-lines absolute inset-0" />
      <div className="scanlines absolute inset-0" />
      <div className="glow-orb animate-drift left-1/2 top-[-8rem] h-[32rem] w-[42rem] -translate-x-1/2 bg-primary/13 motion-reduce:animate-none" />
      <div className="glow-orb animate-drift-reverse bottom-[-12rem] right-[-10rem] h-[28rem] w-[34rem] bg-primary/10 motion-reduce:animate-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-45" />
    </div>
  )
}