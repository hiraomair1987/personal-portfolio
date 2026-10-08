import Reveal from "@/components/Reveal";
import { appPromo, brand } from "@/lib/aetherion";
import type { ResolvedAsset } from "@/lib/aetherion-assets";
import AssetImage from "./AssetImage";
import SectionHeading from "./SectionHeading";

function StoreButton({ store, href }: { store: string; href: string }) {
  const body = (
    <>
      <span className="block text-[10px] uppercase tracking-[0.24em] text-aeth-silver/55">{href ? "Download on" : "Coming soon to"}</span>
      <span className="mt-0.5 block font-display text-base tracking-[0.06em] text-white">{store}</span>
    </>
  );
  return href ? (
    <a href={href} className="aeth-store" rel="noopener noreferrer" target="_blank">
      {body}
    </a>
  ) : (
    <span className="aeth-store cursor-default opacity-80" aria-label={`${store}: coming soon`}>
      {body}
    </span>
  );
}

export default function AppSection({ image }: { image: ResolvedAsset }) {
  return (
    <section id="app" aria-labelledby="app-title" className="aeth-section scroll-mt-20">
      <div className="aeth-shell grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
        <Reveal className="relative order-last lg:order-first">
          <div aria-hidden className="absolute inset-[12%] rounded-full bg-aeth-teal/20 blur-[90px]" />
          <AssetImage asset={image} sizes="(min-width: 1024px) 45vw, 100vw" className="relative mx-auto aspect-[4/5] max-w-md rounded-[32px] border border-white/10" />
        </Reveal>
        <div>
          <SectionHeading
            id="app-title"
            eyebrow="The Aetherion app"
            title="Your journey, in your pocket"
            intro="A companion app, in development, for everything between your first enquiry and the morning of departure."
          />
          <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {appPromo.features.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 0.06}>
                <h3 className="flex items-center gap-3 text-[14px] font-semibold text-white">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-aeth-gold" />
                  {f.title}
                </h3>
                <p className="mt-2 pl-[18px] text-[14px] leading-relaxed text-aeth-silver/70">{f.body}</p>
              </Reveal>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <StoreButton store="App Store" href={brand.appStoreUrl} />
            <StoreButton store="Google Play" href={brand.playStoreUrl} />
          </div>
        </div>
      </div>
    </section>
  );
}
