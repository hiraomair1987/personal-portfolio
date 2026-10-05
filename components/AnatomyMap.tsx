"use client";

import Image from "next/image";
import { useState } from "react";
import type { Part } from "@/lib/content";
import { images } from "@/lib/images";

/** The exploded view with numbered hotspots, linked to a list of parts. */
export default function AnatomyMap({ parts }: { parts: Part[] }) {
  const [active, setActive] = useState(parts[0].id);
  const part = parts.find((p) => p.id === active) ?? parts[0];

  return (
    <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
      <div className="relative aspect-[16/9] overflow-hidden rounded-sm">
        <Image src={images.exploded.src} alt={images.exploded.alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
        {parts.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActive(p.id)}
            onMouseEnter={() => setActive(p.id)}
            aria-label={p.name}
            aria-pressed={p.id === active}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            className="group absolute -translate-x-1/2 -translate-y-1/2 p-2"
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-medium tabular-nums backdrop-blur transition-all duration-300 sm:h-7 sm:w-7 sm:text-[11px] ${
                p.id === active
                  ? "scale-110 border-white bg-white text-ink"
                  : "border-white/50 bg-ink/60 text-white/90 group-hover:border-white"
              }`}
            >
              {i + 1}
            </span>
          </button>
        ))}
      </div>

      <div>
        <ol className="divide-y divide-white/10 border-y border-white/10">
          {parts.map((p, i) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => setActive(p.id)}
                aria-expanded={p.id === active}
                className="flex w-full items-baseline gap-4 py-4 text-left"
              >
                <span className="w-6 text-xs tabular-nums text-white/40">{String(i + 1).padStart(2, "0")}</span>
                <span className={`text-lg font-medium tracking-tight transition-colors ${p.id === active ? "text-white/90" : "text-white/50"}`}>
                  {p.name}
                </span>
              </button>
              {p.id === active && <p className="copy max-w-none pb-5 pl-10">{part.text}</p>}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
