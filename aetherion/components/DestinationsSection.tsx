import Reveal from "@/components/Reveal";
import type { Destination } from "@/lib/aetherion";
import type { ResolvedAsset } from "@/lib/aetherion-assets";
import AssetImage from "./AssetImage";
import EnquireLink from "./EnquireLink";
import { ArrowIcon, CheckIcon } from "./icons";
import Planet from "./Planet";
import SectionHeading from "./SectionHeading";

export default function DestinationsSection({ destinations, images }: { destinations: Destination[]; images: ResolvedAsset[] }) {
  return (
    <section id="destinations" aria-labelledby="destinations-title" className="aeth-section scroll-mt-20">
      <div className="aeth-shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="destinations-title"
            eyebrow="Destinations"
            title="Six horizons, one standard of care"
            intro="From a residence in low Earth orbit to a lakeside retreat on Titan. Each itinerary is designed around stillness, wonder and the people you travel with."
          />
          <Reveal className="max-w-sm rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-[13px] leading-relaxed text-aeth-silver/70">
            <p>
              <span className="aeth-badge mr-2">Planned</span>on our concept roadmap.
            </p>
            <p className="mt-3">
              <span className="aeth-badge aeth-badge--concept mr-2">Concept</span>exploratory, with no timeline yet.
            </p>
            <p className="mt-3 text-aeth-silver/50">No journeys are currently on sale.</p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {destinations.map((d, i) => (
            <Reveal as="li" key={d.slug} delay={(i % 3) * 0.08}>
              <article id={d.slug} className="aeth-card group flex h-full scroll-mt-28 flex-col overflow-hidden">
                <div className="relative">
                  <AssetImage asset={images[i]} sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw" className="aspect-[16/10]" imgClassName="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]" />
                  {!images[i].src && (
                    <Planet look={d.planet} className="pointer-events-none absolute left-1/2 top-[44%] h-[52%] w-auto -translate-x-1/2 -translate-y-1/2 [aspect-ratio:1]" />
                  )}
                  <span className={`aeth-badge absolute left-4 top-4 ${d.status === "Concept" ? "aeth-badge--concept" : ""}`}>{d.status}</span>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-aeth-silver/55">{d.place}</p>
                  <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.06em] text-white">{d.name}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-aeth-silver/75">{d.description}</p>
                  <dl className="mt-6 border-t border-white/[0.08] pt-5 text-[13px]">
                    <div className="flex justify-between gap-4">
                      <dt className="text-aeth-silver/50">Duration</dt>
                      <dd className="text-right text-aeth-silver/90">{d.duration}</dd>
                    </div>
                  </dl>
                  <ul className="mt-4 space-y-2 text-[13px] text-aeth-silver/80">
                    {d.highlights.map((h) => (
                      <li key={h} className="flex gap-2.5">
                        <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-aeth-teal" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-7">
                    <EnquireLink slug={d.slug} className="aeth-link">
                      Register interest
                      <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </EnquireLink>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
