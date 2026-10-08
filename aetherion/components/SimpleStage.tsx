"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Destination } from "@/lib/aetherion";
import Planet from "./Planet";

/**
 * Phones, small windows and reduced-motion visitors get this: the same
 * composition without the 3D orbit. The selected planet cross-fades in the
 * bottom half and its neighbours sit, static, at the edges.
 */
export default function SimpleStage({
  destinations,
  photos,
  active,
  reduceMotion,
  onSelect,
}: {
  destinations: Destination[];
  photos: (string | null)[];
  active: number;
  reduceMotion: boolean;
  onSelect: (index: number) => void;
}) {
  const n = destinations.length;
  const d = destinations[active];
  const prev = (active - 1 + n) % n;
  const next = (active + 1) % n;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {[prev, next].map((i, k) => (
        <button
          key={k}
          type="button"
          tabIndex={-1}
          aria-hidden
          onClick={() => onSelect(i)}
          className={`absolute top-[47%] h-[clamp(64px,18vw,120px)] w-[clamp(64px,18vw,120px)] -translate-y-1/2 opacity-80 transition-opacity hover:opacity-100 ${
            k === 0 ? "left-0 -translate-x-[45%]" : "right-0 translate-x-[45%]"
          }`}
        >
          <Planet look={destinations[i].planet} className="h-full w-full" />
        </button>
      ))}

      <div className="absolute left-1/2 top-[60%] aspect-square w-[max(165vw,120svh)] -translate-x-1/2 sm:w-[max(120vw,130svh)]">
        <AnimatePresence initial={false}>
          <motion.div
            key={d.slug}
            className="absolute inset-0"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: "6%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.25 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Planet
              look={d.planet}
              photo={photos[active]}
              alt={d.name}
              priority
              className="h-full w-full"
              style={{ ["--front" as string]: 1, ["--img-h" as string]: "36%" }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
