import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { craftSteps } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Craft",
  description: "Six steps from first sketch to the wrist: design, machining, finishing, assembly, regulation and quality control.",
};

export default function CraftPage() {
  return (
    <>
      <PageHeader eyebrow="The Craft" title="Precision, in every detail.">
        A mechanical chronograph passes through many hands before it reaches yours. These are the six stages it goes
        through.
      </PageHeader>

      <section className="shell pb-8">
        <Reveal>
          <div className="relative aspect-[16/9] overflow-hidden rounded-sm">
            <Image src={images.separating.src} alt={images.separating.alt} fill priority sizes="100vw" className="object-cover" />
          </div>
        </Reveal>
      </section>

      <section className="shell section">
        <ol className="relative space-y-20 md:space-y-28">
          {craftSteps.map((s, i) => (
            <li key={s.step} className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
              <Reveal className={`md:col-span-5 ${i % 2 ? "md:order-2 md:col-start-8" : ""}`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-white/[0.03]">
                  <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
                </div>
              </Reveal>
              <Reveal delay={0.1} className={`md:col-span-6 ${i % 2 ? "md:col-start-1 md:row-start-1" : "md:col-start-7"}`}>
                <p className="text-6xl font-semibold tabular-nums tracking-tightest text-white/10 md:text-8xl">{s.step}</p>
                <h2 className="-mt-3 text-3xl font-semibold tracking-tightest text-white/90 md:-mt-5 md:text-5xl">{s.title}</h2>
                <p className="copy mt-5 max-w-md">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="section shell border-t border-white/5 text-center">
        <Reveal>
          <p className="eyebrow mb-5">Keep reading</p>
          <h2 className="heading mx-auto max-w-2xl">Stories from the bench.</h2>
          <Link href="/journal" className="btn-primary mt-9">
            Visit the Journal
          </Link>
        </Reveal>
      </section>
    </>
  );
}
