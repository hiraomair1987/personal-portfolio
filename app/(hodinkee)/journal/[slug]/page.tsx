import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import Reveal from "@/components/Reveal";
import { articles, formatDate, getArticle } from "@/lib/content";

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getArticle(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.dek,
    openGraph: { title: article.title, description: article.dek, images: [article.image.src], type: "article" },
  };
}

export default function ArticlePage({ params }: Props) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const more = articles.filter((a) => a.slug !== article.slug);

  return (
    <article>
      <header className="shell pb-12 pt-32 md:pb-16 md:pt-44">
        <Reveal className="mx-auto max-w-3xl">
          <Link href="/journal" className="text-sm text-white/40 transition-colors hover:text-white/80">
            ← Journal
          </Link>
          <p className="eyebrow mt-8">{article.category}</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.02] tracking-tightest text-white/90 sm:text-5xl md:text-6xl">
            {article.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/60 md:text-xl">{article.dek}</p>
          <p className="mt-6 text-xs text-white/40">
            <time dateTime={article.date}>{formatDate(article.date)}</time> · {article.readTime}
          </p>
        </Reveal>
      </header>

      <div className="shell">
        <Reveal>
          <div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-sm bg-white/[0.03]">
            <Image src={article.image.src} alt={article.image.alt} fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
          </div>
        </Reveal>
      </div>

      <div className="shell py-16 md:py-24">
        <div className="mx-auto max-w-2xl space-y-6 text-[17px] leading-[1.75] text-white/70 md:text-lg">
          {article.body.map((block, i) => {
            if (block.type === "h2")
              return (
                <h2 key={i} className="pt-6 text-2xl font-semibold tracking-tight text-white/90 md:text-3xl">
                  {block.text}
                </h2>
              );
            if (block.type === "quote")
              return (
                <blockquote key={i} className="my-10 border-l border-white/30 pl-6 text-2xl font-medium leading-snug tracking-tight text-white/90 md:text-3xl">
                  {block.text}
                </blockquote>
              );
            return <p key={i}>{block.text}</p>;
          })}
        </div>
      </div>

      <section className="shell border-t border-white/5 py-20 md:py-28">
        <p className="eyebrow mb-10">More from the Journal</p>
        <div className="grid gap-12 sm:grid-cols-2 lg:gap-8">
          {more.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
    </article>
  );
}
