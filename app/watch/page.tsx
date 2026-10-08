import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import WatchGallery from "@/components/WatchGallery";
import { watch } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "The Watch",
  description: `${watch.name} ${watch.subtitle}: blackened titanium, three-register dial, sapphire caseback.`,
};

export default function WatchPage() {
  return (
    <>
      {/* Product intro */}
      <section className="shell pb-20 pt-24 md:pb-28 md:pt-32">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <Reveal className="min-w-0">
            <WatchGallery images={watch.gallery} />
          </Reveal>

          <Reveal delay={0.1} className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow mb-4">{watch.subtitle}</p>
            <h1 className="text-5xl font-semibold leading-[0.98] tracking-tightest text-white/90 md:text-6xl">{watch.name}</h1>
            <p className="mt-6 text-base leading-relaxed text-white/60 md:text-lg">{watch.intro}</p>

            <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-white/10 py-6 text-center">
              {[
                ["42 mm", "Case"],
                ["42 h", "Reserve"],
                ["100 m", "Water"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dd className="text-xl font-semibold tracking-tight text-white/90">{v}</dd>
                  <dt className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/40">{l}</dt>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-col gap-3">
              <Link href="/contact" className="btn-primary w-full">
                Enquire about {watch.name}
              </Link>
              <Link href="/movement" className="btn-ghost w-full">
                Explore the movement
              </Link>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-white/40">
              Reference 01 is a design concept. Specifications are illustrative.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-y border-white/5 bg-white/[0.015]">
        <div className="shell grid gap-12 py-20 md:grid-cols-3 md:gap-10 md:py-28">
          {watch.highlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.08}>
              <p className="text-xs tabular-nums text-white/30">0{i + 1}</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white/90">{h.title}</h2>
              <p className="copy mt-3">{h.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Feature image */}
      <section className="section shell">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative aspect-square overflow-hidden rounded-sm">
              <Image src={images.dial.src} alt={images.dial.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow mb-5">The Dial</p>
            <h2 className="heading">Read in a glance.</h2>
            <p className="copy mt-6">
              Matte black, so nothing reflects. White indices and hands for the time; red for anything the chronograph is
              measuring. The date sits in a framed window between one and two o&apos;clock, out of the way of the counters.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Specifications */}
      <section className="section shell border-t border-white/5" id="specifications">
        <Reveal>
          <p className="eyebrow mb-5">Specifications</p>
          <h2 className="heading">The details.</h2>
        </Reveal>
        <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-3 md:gap-10">
          {watch.specs.map((group, i) => (
            <Reveal key={group.group} delay={i * 0.08}>
              <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-white/90">{group.group}</h3>
              <dl className="mt-5 divide-y divide-white/10 border-y border-white/10">
                {group.items.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 py-3.5 text-[15px]">
                    <dt className="text-white/40">{k}</dt>
                    <dd className="text-right text-white/80">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
