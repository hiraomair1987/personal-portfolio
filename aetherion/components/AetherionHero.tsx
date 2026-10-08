"use client";

import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Destination } from "@/lib/aetherion";
import { ArrowIcon } from "./icons";
import OrbitStage from "./OrbitStage";
import SimpleStage from "./SimpleStage";

const EASE = [0.22, 1, 0.36, 1] as const;
const SWIPE_PX = 48;

/** The 3D orbit needs room; smaller screens get the simplified stage. */
const ORBIT_QUERY = "(min-width: 900px) and (min-height: 600px)";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}

export default function AetherionHero({ destinations, photos }: { destinations: Destination[]; photos: (string | null)[] }) {
  const n = destinations.length;
  const reduceMotion = useReducedMotion() ?? false;
  const roomy = useMediaQuery(ORBIT_QUERY);
  const orbit = roomy && !reduceMotion;

  // `target` is unwrapped (it can run past n or below 0) so the orbit always
  // turns the short way round; `active` is that wrapped back into range.
  const [target, setTarget] = useState(0);
  const active = ((target % n) + n) % n;
  const position = useMotionValue(0);

  useEffect(() => {
    if (!orbit) {
      position.set(target);
      return;
    }
    const controls = animate(position, target, { type: "spring", stiffness: 60, damping: 18, mass: 1 });
    return () => controls.stop();
  }, [target, orbit, position]);

  const step = useCallback((dir: 1 | -1) => setTarget((t) => t + dir), []);

  const select = useCallback(
    (index: number) =>
      setTarget((t) => {
        const current = ((t % n) + n) % n;
        let delta = index - current;
        if (delta > n / 2) delta -= n;
        if (delta < -n / 2) delta += n;
        return t + delta;
      }),
    [n],
  );

  // Arrow keys while the hero is in view, unless the visitor is typing.
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useRef(true);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (inView.current = e.intersectionRatio > 0.4), { threshold: [0, 0.4, 1] });
    io.observe(el);
    const onKey = (e: KeyboardEvent) => {
      if (!inView.current || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      const t = e.target as HTMLElement | null;
      if (t?.closest("input, textarea, select, [contenteditable='true'], [role='dialog']")) return;
      if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      io.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, [step]);

  // Horizontal swipes (touch, pen or mouse drag). Vertical gestures scroll the page as normal.
  const swipe = useRef<{ x: number; y: number; id: number } | null>(null);
  const suppressClick = useRef(false);
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    swipe.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
    suppressClick.current = false;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start || start.id !== e.pointerId) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) < SWIPE_PX || Math.abs(dx) < Math.abs(dy) * 1.2) return;
    suppressClick.current = true;
    step(dx < 0 ? 1 : -1);
  };
  // A drag that turned the orbit shouldn't also click whatever it ended on.
  const onClickCapture = (e: React.MouseEvent) => {
    if (!suppressClick.current) return;
    suppressClick.current = false;
    e.preventDefault();
    e.stopPropagation();
  };

  const d = destinations[active];
  const prev = destinations[(active - 1 + n) % n];
  const next = destinations[(active + 1) % n];

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-roledescription="carousel"
      aria-label="Aetherion destinations"
      className="relative h-[100svh] min-h-[640px] w-full touch-pan-y select-none overflow-hidden bg-aeth-void"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => (swipe.current = null)}
      onClickCapture={onClickCapture}
    >
      <div aria-hidden className="aeth-sky absolute inset-0" />
      {/* A faint wash of the selected planet's light along the horizon. */}
      <AnimatePresence initial={false}>
        <motion.div
          key={d.slug}
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-2/3"
          style={{ background: `radial-gradient(60% 55% at 50% 100%, ${d.planet.glow}2e, transparent 70%)` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.2 : 1.2 }}
        />
      </AnimatePresence>

      {orbit ? (
        <OrbitStage destinations={destinations} photos={photos} position={position} active={active} onSelect={select} />
      ) : (
        <SimpleStage destinations={destinations} photos={photos} active={active} reduceMotion={reduceMotion} onSelect={select} />
      )}

      {/* Headline block, centred above the orbit. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[200] flex justify-center px-6 pt-[calc(4.5rem+4svh)] sm:pt-[calc(5rem+5svh)]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={d.slug}
            className="pointer-events-auto flex max-w-2xl flex-col items-center text-center"
            initial="hidden"
            animate="shown"
            exit="gone"
            variants={{
              hidden: {},
              shown: { transition: { staggerChildren: reduceMotion ? 0 : 0.07, delayChildren: reduceMotion ? 0 : orbit ? 0.3 : 0.1 } },
              gone: { opacity: 0, transition: { duration: reduceMotion ? 0.1 : 0.22 } },
            }}
          >
            <motion.p variants={rise(reduceMotion)} className="text-[11px] font-semibold uppercase tracking-[0.34em] text-aeth-silver/80">
              <span className="text-aeth-teal">{d.status}</span>
              <span className="mx-2 text-aeth-silver/40">·</span>
              {d.place}
            </motion.p>
            <div className="overflow-hidden px-2 pb-1 pt-3">
              <motion.h1
                variants={reduceMotion ? fade : { hidden: { y: "105%" }, shown: { y: 0, transition: { duration: 0.9, ease: EASE } } }}
                className="font-display text-[clamp(2.4rem,min(7.4vw,10.5svh),6.25rem)] font-normal uppercase leading-[1] tracking-[0.04em] text-white"
              >
                {d.name}
              </motion.h1>
            </div>
            <motion.span variants={rise(reduceMotion)} aria-hidden className="mt-4 block h-[2px] w-14 rounded-full bg-aeth-teal sm:mt-5" />
            <motion.p
              variants={rise(reduceMotion)}
              className="mt-4 max-w-xl text-pretty text-[14px] leading-relaxed text-aeth-silver/85 sm:mt-5 sm:text-[15px]"
            >
              {d.summary}
            </motion.p>
            <motion.div variants={rise(reduceMotion)} className="mt-6 sm:mt-7">
              <a href={`#${d.slug}`} className="aeth-btn-light">
                Explore destination
              </a>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls: always visible, independent of scroll. */}
      <div className="absolute inset-x-0 bottom-5 z-[210] flex flex-col items-center gap-3 px-4 sm:bottom-8">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-aeth-void/55 p-1.5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-md">
          <button type="button" onClick={() => step(-1)} aria-label={`Previous destination: ${prev.name}`} className="aeth-icon-btn">
            <ArrowIcon className="h-4 w-4 rotate-180" />
          </button>
          <div className="flex items-center gap-3 px-2 sm:px-3">
            <p className="font-display text-sm tabular-nums tracking-[0.12em] text-white" aria-hidden>
              {String(active + 1).padStart(2, "0")}
              <span className="mx-1 text-aeth-silver/40">/</span>
              <span className="text-aeth-silver/55">{String(n).padStart(2, "0")}</span>
            </p>
            <div className="hidden items-center gap-1.5 sm:flex">
              {destinations.map((item, i) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => select(i)}
                  aria-label={`Go to ${item.name}`}
                  aria-current={i === active ? "true" : undefined}
                  className="group grid h-6 w-4 place-items-center"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-500 ${
                      i === active ? "w-4 bg-aeth-gold" : "w-1.5 bg-aeth-silver/35 group-hover:bg-aeth-silver/70"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <button type="button" onClick={() => step(1)} aria-label={`Next destination: ${next.name}`} className="aeth-icon-btn">
            <ArrowIcon className="h-4 w-4" />
          </button>
        </div>
        <p className="rounded-full bg-aeth-void/60 px-3 py-1 text-[10px] uppercase tracking-[0.26em] text-aeth-silver/80 backdrop-blur-md">
          <span className="hidden md:inline">Use ← → keys, drag or click a planet</span>
          <span className="md:hidden">Swipe to explore the orbit</span>
        </p>
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {`${d.name}, ${d.place}. ${d.status}. Destination ${active + 1} of ${n}.`}
      </p>
    </section>
  );
}

const fade = { hidden: { opacity: 0 }, shown: { opacity: 1, transition: { duration: 0.2 } } };

function rise(reduce: boolean) {
  if (reduce) return fade;
  return {
    hidden: { opacity: 0, y: 16 },
    shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };
}
