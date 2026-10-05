"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import type { SiteImage } from "@/lib/images";

export default function WatchGallery({ images }: { images: SiteImage[] }) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-white/[0.03] sm:aspect-[16/10]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={current.src}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              priority={active === 0}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <span className="absolute bottom-4 right-4 rounded-full bg-ink/70 px-3 py-1 text-[11px] tabular-nums text-white/60 backdrop-blur">
          {active + 1} / {images.length}
        </span>
      </div>

      <div className="-mx-6 mt-3 flex gap-3 overflow-x-auto px-6 pb-2 sm:mx-0 sm:grid sm:grid-cols-6 sm:overflow-visible sm:px-0" role="tablist" aria-label="Watch photos">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Show photo ${i + 1}: ${img.alt}`}
            onClick={() => setActive(i)}
            className={`relative aspect-square w-20 shrink-0 overflow-hidden rounded-sm transition-opacity duration-300 sm:w-auto ${
              i === active ? "opacity-100 ring-1 ring-white/60" : "opacity-50 hover:opacity-80"
            }`}
          >
            <Image src={img.src} alt="" fill sizes="120px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
