import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnatomyMap from "@/components/AnatomyMap";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { parts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Movement",
  description: "An exploded view of Reference 01: case, dial, gear train, crown, movement, rotor and caseback.",
};

export default function MovementPage() {
  return (
    <>
      <PageHeader eyebrow="Anatomy" title="A world within.">
        Take the watch apart and it falls into seven groups of parts. Tap a number to see what each one does.
      </PageHeader>

      <section className="shell pb-24 md:pb-36">
        <Reveal>
          <AnatomyMap parts={parts} />
        </Reveal>
      </section>

      <section className="border-t border-white/5">
        {parts.map((p, i) => (
          <div key={p.id} className="shell grid items-center gap-10 border-b border-white/5 py-16 md:grid-cols-2 md:gap-16 md:py-24">
            <Reveal className={i % 2 ? "md:order-2" : undefined}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-white/[0.03]">
                <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-xs tabular-nums text-white/30">{String(i + 1).padStart(2, "0")} / {String(parts.length).padStart(2, "0")}</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tightest text-white/90 md:text-5xl">{p.name}</h2>
              <p className="copy mt-5 max-w-md">{p.text}</p>
            </Reveal>
          </div>
        ))}
      </section>

      <section className="section shell text-center">
        <Reveal>
          <p className="eyebrow mb-5">Next chapter</p>
          <h2 className="heading mx-auto max-w-2xl">How it all comes together.</h2>
          <Link href="/craft" className="btn-primary mt-9">
            The Craft
          </Link>
        </Reveal>
      </section>
    </>
  );
}
