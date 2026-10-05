import Image from "next/image";
import Link from "next/link";
import { formatDate, type Article } from "@/lib/content";

export default function ArticleCard({ article, priority = false }: { article: Article; priority?: boolean }) {
  return (
    <Link href={`/journal/${article.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-white/[0.03]">
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-white/40">
        <span>{article.category}</span>
        <span className="h-px w-4 bg-white/20" />
        <span>{article.readTime}</span>
      </div>
      <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-white/90 transition-colors group-hover:text-white">
        {article.title}
      </h3>
      <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-white/60">{article.dek}</p>
      <p className="mt-4 text-xs text-white/40">
        <time dateTime={article.date}>{formatDate(article.date)}</time>
      </p>
    </Link>
  );
}
