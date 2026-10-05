import WatchScroll from "@/components/WatchScroll";

export default function Home() {
  return (
    <main className="relative bg-ink">
      {/* Header */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-6 mix-blend-difference sm:px-10 md:px-16 lg:px-24">
        <a
          href="https://www.hodinkee.com"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto text-[13px] font-semibold uppercase tracking-[0.38em] text-white/90"
        >
          Hodinkee
        </a>
        <nav className="pointer-events-auto hidden items-center gap-8 text-[13px] tracking-tight text-white/60 sm:flex">
          <a href="https://www.hodinkee.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white/90">
            Editorial
          </a>
          <a href="https://shop.hodinkee.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white/90">
            Shop
          </a>
        </nav>
      </header>

      <WatchScroll />

      {/* Coda */}
      <section className="relative border-t border-white/5 px-6 py-28 sm:px-10 md:px-16 md:py-40 lg:px-24">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1.2fr_1fr] md:gap-24">
          <div>
            <p className="eyebrow mb-5">Inside a Typical Chronograph</p>
            <h2 className="text-balance text-4xl font-semibold leading-[1.02] tracking-tightest text-white/90 md:text-6xl">
              Small parts. Long lives.
            </h2>
            <p className="copy mt-6 max-w-md">
              A mechanical watch keeps time with nothing but a coiled spring and a balance swinging back and forth
              several times a second — for decades, with care.
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-x-8 gap-y-12 self-end">
            {[
              ["28,800", "Vibrations per hour"],
              ["4 Hz", "Balance frequency"],
              ["42 h", "Power reserve"],
              ["∞", "Generations of wear"],
            ].map(([value, label]) => (
              <div key={label} className="border-t border-white/10 pt-5">
                <dt className="text-xs uppercase tracking-[0.24em] text-white/40">{label}</dt>
                <dd className="mt-3 text-3xl font-semibold tabular-nums tracking-tightest text-white/90 md:text-4xl">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <footer className="flex flex-col gap-3 border-t border-white/5 px-6 py-10 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-10 md:px-16 lg:px-24">
        <span className="uppercase tracking-[0.32em] text-white/60">Hodinkee</span>
        <span>A scrollytelling design study. Not an official HODINKEE property.</span>
      </footer>
    </main>
  );
}
