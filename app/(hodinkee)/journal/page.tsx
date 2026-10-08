import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { articles, formatDate } from "@/lib/content";

export const metadata: Metadata = {
  title: "Journal",
  description: "Essays and guides on chronographs, movements and caring for a mechanical watch.",
};

export default function JournalPage() {
  const [featured, ...rest] = articles;

  return (
    <>
      <PageHeader eyebrow="Journal" title="Stories from the bench.">
        Essays, explainers and guides for anyone curious about how a mechanical watch works.
      </PageHeader>

      <section className="shell pb-20 md:pb-28">
        <Reveal>
          <Link href={`/journal/${featured.slug}`} className="group grid items-center gap-8 md:grid-cols-[1.3fr_1fr] md:gap-14">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-white/[0.03] md:aspect-[16/11]">
              <Image
                src={featured.image.src}
                alt={featured.image.alt}
                fill
                priority
                sizes="(min-width: 768px) 55vw, 100vw"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
              />
            </div>
            <div>
              <p className="eyebrow">Featured · {featured.category}</p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-tightest text-white/90 md:text-5xl">{featured.title}</h2>
              <p className="copy mt-5">{featured.dek}</p>
              <p className="mt-6 text-xs text-white/40">
                <time dateTime={featured.date}>{formatDate(featured.date)}</time> · {featured.readTime}
              </p>
            </div>
          </Link>
        </Reveal>
      </section>

      <section className="shell border-t border-white/5 py-20 md:py-28">
        <div className="grid gap-12 sm:grid-cols-2 lg:gap-8">
          {rest.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.08}>
              <ArticleCard article={a} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
