import Link from "next/link";
import { nav } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/5">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div>
          <Link href="/" className="text-[13px] font-semibold uppercase tracking-[0.38em] text-white/90">
            Hodinkee
          </Link>
          <p className="copy mt-5">
            The Art of Watchmaking — one chronograph, taken apart piece by piece and put back together again.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-5">Explore</p>
          <ul className="space-y-3 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/60 transition-colors hover:text-white/90">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-5">Elsewhere</p>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="https://www.hodinkee.com" target="_blank" rel="noopener noreferrer" className="text-white/60 transition-colors hover:text-white/90">
                hodinkee.com ↗
              </a>
            </li>
            <li>
              <a href="https://shop.hodinkee.com" target="_blank" rel="noopener noreferrer" className="text-white/60 transition-colors hover:text-white/90">
                HODINKEE Shop ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="shell flex flex-col gap-2 border-t border-white/5 py-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} · A scrollytelling design study.</span>
        <span>Not an official HODINKEE property. Watch and specifications are a concept.</span>
      </div>
    </footer>
  );
}
