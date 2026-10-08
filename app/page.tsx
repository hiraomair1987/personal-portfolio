import Image from "next/image";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import Reveal from "@/components/Reveal";
import WatchScroll from "@/components/WatchScroll";
import { articles, watch } from "@/lib/content";
import { images } from "@/lib/images";

const chapters = [
  { href: "/watch", eyebrow: "01", title: "The Watch", text: "Reference 01, an automatic chronograph in blackened titanium.", image: images.dial },
  { href: "/movement", eyebrow: "02", title: "The Movement", text: "Seven groups of parts, and what each one does.", image: images.movement },
  { href: "/craft", eyebrow: "03", title: "The Craft", text: "Six steps from first sketch to the wrist.", image: images.gearTrain },
];

const stats = [
  ["28,800", "Vibrations per hour"],
  ["42 h", "Power reserve"],
  ["25", "Jewels"],
  ["100 m", "Water resistance"],
];

export default function Home() {
  return (
    <>
      <WatchScroll />

      {/* Statement */}
      <section className="section shell border-t border-white/5">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-5">{watch.subtitle}</p>
            <h2 className="heading">One watch. Hundreds of parts. A single heartbeat.</h2>
            <p className="copy mt-6 max-w-md">{watch.intro}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/watch" className="btn-primary">
                Discover {watch.name}
              </Link>
              <Link href="/contact" className="btn-ghost">
                Get in touch
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
              <Image src={images.assembled.src} alt={images.assembled.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Chapters */}
      <section className="section shell pt-0 md:pt-0">
        <Reveal>
          <p className="eyebrow mb-5">Chapters</p>
          <h2 className="heading max-w-3xl">Go deeper.</h2>
        </Reveal>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 lg:gap-8">
          {chapters.map((c, i) => (
            <Reveal key={c.href} delay={i * 0.08}>
              <Link href={c.href} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-white/[0.03]">
                  <Image
                    src={c.image.src}
                    alt={c.image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <p className="text-xs tabular-nums text-white/40">{c.eyebrow}</p>
                    <h3 className="mt-2 text-3xl font-semibold tracking-tightest text-white/90">{c.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-white/60">{c.text}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm text-white/80">
                      Read chapter <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Numbers */}
      <section className="border-y border-white/5 bg-white/[0.015]">
        <div className="shell grid grid-cols-2 gap-x-8 gap-y-12 py-16 md:grid-cols-4 md:py-24">
          {stats.map(([value, label], i) => (
            <Reveal key={label} delay={i * 0.06}>
              <dl className="border-t border-white/10 pt-5">
                <dt className="text-xs uppercase tracking-[0.22em] text-white/40">{label}</dt>
                <dd className="mt-3 text-4xl font-semibold tabular-nums tracking-tightest text-white/90 md:text-5xl">{value}</dd>
              </dl>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Journal */}
      <section className="section shell">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-5">Journal</p>
            <h2 className="heading">Stories from the bench.</h2>
          </div>
          <Link href="/journal" className="btn-ghost self-start sm:self-auto">
            All stories
          </Link>
        </Reveal>
        <div className="mt-12 grid gap-12 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 lg:gap-8">
          {articles.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.08}>
              <ArticleCard article={a} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="relative overflow-hidden border-t border-white/5">
        <Image src={images.exploded.src} alt="" fill sizes="100vw" className="object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/60 to-ink" />
        <div className="shell relative py-28 text-center md:py-44">
          <Reveal>
            <p className="eyebrow mb-5">Made to Last</p>
            <h2 className="heading mx-auto max-w-3xl">Built to be serviced, not replaced.</h2>
            <p className="copy mx-auto mt-6">Questions about the watch, the movement or this project? We would love to hear from you.</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="btn-primary">
                Contact us
              </Link>
              <Link href="/craft" className="btn-ghost">
                How it&apos;s made
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
