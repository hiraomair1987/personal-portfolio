import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <header className="shell pb-14 pt-32 md:pb-20 md:pt-44">
      <Reveal>
        <p className="eyebrow mb-5">{eyebrow}</p>
        <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[0.98] tracking-tightest text-white/90 sm:text-6xl md:text-7xl lg:text-8xl">
          {title}
        </h1>
        {children && <div className="mt-6 max-w-xl text-base leading-relaxed text-white/60 md:mt-8 md:text-lg">{children}</div>}
      </Reveal>
    </header>
  );
}
