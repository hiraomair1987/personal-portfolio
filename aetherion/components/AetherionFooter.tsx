import { brand, navLinks } from "@/lib/aetherion";
import Wordmark from "./Wordmark";

const socials = ["Instagram", "YouTube", "LinkedIn"];

export default function AetherionFooter() {
  return (
    <footer className="border-t border-white/[0.07] bg-aeth-void">
      <div className="aeth-shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Wordmark className="text-2xl" />
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-aeth-silver/60">{brand.tagline}. Luxury space travel, imagined with the care of a great hotel.</p>
          </div>
          <nav aria-label="Footer">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-aeth-gold">Explore</p>
            <ul className="mt-5 space-y-3 text-[14px]">
              {[...navLinks, { href: "#book", label: "Book a journey" }].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-aeth-silver/70 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-aeth-gold">Contact</p>
            <p className="mt-5 text-[14px] text-aeth-silver/70">
              {brand.contactEmail ? (
                <a href={`mailto:${brand.contactEmail}`} className="transition-colors hover:text-white">
                  {brand.contactEmail}
                </a>
              ) : (
                <>Contact details coming soon. Use the enquiry form above.</>
              )}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Social channels (coming soon)">
              {socials.map((s) => (
                <li key={s}>
                  <span className="inline-flex h-9 items-center rounded-full border border-white/10 px-4 text-[12px] text-aeth-silver/50" title="Coming soon">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-white/[0.07] pt-8 text-[12px] leading-relaxed text-aeth-silver/45">
          <p className="max-w-3xl">
            Aetherion is a design concept. Destinations, vessels, crew, durations and timelines are illustrative; nothing shown is currently offered for sale or scheduled. Human spaceflight carries real and significant risk, and any future journey would depend on regulatory approval, medical clearance and training.
          </p>
          <p className="mt-4">© {new Date().getFullYear()} Aetherion concept.</p>
        </div>
      </div>
    </footer>
  );
}
