export default function HeroBanner() {
  return (
    <section className="relative flex min-h-[280px] w-full items-center justify-center overflow-hidden bg-espresso-panel px-4 py-16 md:min-h-[360px] md:py-20">
      <div className="absolute inset-0 opacity-20" aria-hidden="true"><div className="absolute left-1/4 top-0 h-full border-l border-rose" /><div className="absolute left-1/2 top-0 h-full border-l border-rose" /><div className="absolute left-3/4 top-0 h-full border-l border-rose" /></div>
      <div className="relative z-10 text-center">
        <h1 className="font-display text-6xl font-light tracking-[-0.08em] text-rose md:text-8xl lg:text-9xl">ELBI <span className="font-black">BEAUTY</span></h1>
      </div>
    </section>
  )
}
