import Reveal from "@/components/Reveal";
import { lifeAboard } from "@/lib/aetherion";
import type { AssetKey, ResolvedAsset } from "@/lib/aetherion-assets";
import AssetImage from "./AssetImage";
import SectionHeading from "./SectionHeading";

export default function LifeAboardSection({ images }: { images: Record<AssetKey, ResolvedAsset> }) {
  return (
    <section id="life-aboard" aria-labelledby="life-title" className="aeth-section scroll-mt-20 bg-gradient-to-b from-aeth-void via-aeth-navy/40 to-aeth-void">
      <div className="aeth-shell">
        <SectionHeading
          id="life-title"
          eyebrow="Life aboard"
          title="A grand hotel, quietly in orbit"
          intro="Every Aetherion vessel is imagined as a small hotel first: soft light, natural materials, and windows given pride of place."
          align="center"
        />

        <Reveal className="mt-16">
          <AssetImage asset={images[lifeAboard.hero]} sizes="(min-width: 1440px) 1360px, 100vw" className="aspect-[16/9] rounded-[28px] border border-white/10 md:aspect-[21/9]" />
        </Reveal>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <AssetImage asset={images[lifeAboard.interior]} sizes="(min-width: 1024px) 60vw, 100vw" className="aspect-[16/10] h-full rounded-[28px] border border-white/10" />
          </Reveal>
          <Reveal delay={0.1} className="aeth-card flex flex-col justify-between p-8 sm:p-10">
            <div>
              <h3 className="font-display text-2xl uppercase tracking-[0.06em] text-white">The lounge</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-aeth-silver/75">
                The heart of the ship. Curved seating faces a single great window, the bar stays open through every orbit, and conversation tends to stop whenever the sun comes up.
              </p>
            </div>
            <dl className="mt-10 divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {lifeAboard.details.map((d) => (
                <div key={d.label} className="flex flex-col gap-1 py-4 sm:flex-row sm:justify-between sm:gap-6">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.26em] text-aeth-gold">{d.label}</dt>
                  <dd className="text-[14px] text-aeth-silver/85 sm:text-right">{d.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <ul className="mt-6 grid gap-6 md:grid-cols-3">
          {lifeAboard.features.map((f, i) => (
            <Reveal as="li" key={f.title} delay={i * 0.08} className="aeth-card overflow-hidden">
              <AssetImage asset={images[f.image]} sizes="(min-width: 768px) 33vw, 100vw" className="aspect-[4/5]" />
              <div className="p-7">
                <h3 className="font-display text-xl uppercase tracking-[0.08em] text-white">{f.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-aeth-silver/75">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
