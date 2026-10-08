import Reveal from "@/components/Reveal";
import { crew } from "@/lib/aetherion";
import type { AssetKey, ResolvedAsset } from "@/lib/aetherion-assets";
import AssetImage from "./AssetImage";
import SectionHeading from "./SectionHeading";

export default function CrewSection({ images }: { images: Record<AssetKey, ResolvedAsset> }) {
  return (
    <section id="crew" aria-labelledby="crew-title" className="aeth-section scroll-mt-20">
      <div className="aeth-shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="crew-title"
            eyebrow="Crew"
            title="The people at the window with you"
            intro="Flight crew and hospitality crew, working as one team. They are the reason the extraordinary feels calm."
          />
          <Reveal>
            <p className="max-w-xs rounded-2xl border border-aeth-gold/25 bg-aeth-gold/[0.04] p-5 text-[13px] leading-relaxed text-aeth-silver/75">
              <span className="font-semibold text-aeth-gold">Illustrative crew.</span> These are fictional characters created for the Aetherion concept, not real people.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {crew.map((c, i) => (
            <Reveal as="li" key={c.name} delay={i * 0.08}>
              <figure className="aeth-card group h-full overflow-hidden">
                <AssetImage asset={images[c.image]} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="aspect-[4/5]" imgClassName="object-cover grayscale-[20%] transition duration-700 group-hover:grayscale-0" />
                <figcaption className="p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-aeth-teal">{c.role}</p>
                  <h3 className="mt-2 font-display text-xl uppercase tracking-[0.06em] text-white">{c.name}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-aeth-silver/70">{c.bio}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
