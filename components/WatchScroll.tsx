"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Sequence config                                                     */
/* ------------------------------------------------------------------ */

const FRAME_COUNT = 80;
const LAST_FRAME = FRAME_COUNT - 1;
const framePath = (i: number) => `/video-split/frame_${i}_delay-0.04s.webp`;

/** Page background. Sampled from the sequence's edges so the canvas melts into the page. */
const BG = "#050505";
const BG_RGB = "5, 5, 5";

/**
 * Scroll progress (0–1) → frame (0–79).
 *
 * The source footage only plays one way (assembled → exploded), so the story
 * runs it forward to full explosion, holds while "A World Within." is on
 * screen, then plays it in reverse so the watch reassembles for the finale.
 *
 *   0.00 – 0.08   hold on the assembled watch (title)
 *   0.08 – 0.62   explode (begins expanding around 30%)
 *   0.62 – 0.74   hold fully exploded (60% beat)
 *   0.74 – 1.00   reassemble (90% beat)
 */
const FRAME_INPUT = [0, 0.08, 0.62, 0.74, 1];
const FRAME_OUTPUT = [0, 0, LAST_FRAME, LAST_FRAME, 0];

/** Soft edge, as a fraction of the drawn image, that fades into the background. */
const FEATHER_X = 0.08;
const FEATHER_Y = 0.06;

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function WatchScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number | null>(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [ready, setReady] = useState(false);

  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // A light spring takes the edge off wheel steps / trackpad jitter.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.35,
    restDelta: 0.0001,
  });
  const progress = reduceMotion ? scrollYProgress : smoothProgress;
  const frame = useTransform(progress, FRAME_INPUT, FRAME_OUTPUT, { clamp: true });

  /* ---------------------------- drawing ---------------------------- */

  const draw = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const images = imagesRef.current;
    if (!canvas || !ctx || images.length === 0) return;

    const isDrawable = (img?: HTMLImageElement) => !!img && img.complete && img.naturalWidth > 0;

    // Fall back to the nearest decoded frame if one failed to load.
    const nearest = (i: number) => {
      for (let d = 0; d < FRAME_COUNT; d++) {
        if (isDrawable(images[i - d])) return images[i - d];
        if (isDrawable(images[i + d])) return images[i + d];
      }
      return undefined;
    };

    const clamped = Math.min(Math.max(index, 0), LAST_FRAME);
    const i0 = Math.floor(clamped);
    const i1 = Math.min(i0 + 1, LAST_FRAME);
    const t = clamped - i0;

    const base = nearest(i0);
    if (!base) return;

    const cw = canvas.width;
    const ch = canvas.height;

    // "contain" fit, centred.
    const scale = Math.min(cw / base.naturalWidth, ch / base.naturalHeight);
    const dw = base.naturalWidth * scale;
    const dh = base.naturalHeight * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.globalAlpha = 1;
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, cw, ch);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(base, dx, dy, dw, dh);

    // Sub-frame interpolation: cross-fade toward the next frame by the
    // fractional part of the index, so slow scrolls glide instead of stepping.
    const next = images[i1];
    if (t > 0.01 && i1 !== i0 && isDrawable(next)) {
      ctx.globalAlpha = t;
      ctx.drawImage(next, dx, dy, dw, dh);
      ctx.globalAlpha = 1;
    }

    // Feather every edge of the image into the page background.
    const fx = dw * FEATHER_X;
    const fy = dh * FEATHER_Y;
    const solid = `rgba(${BG_RGB}, 1)`;
    const clear = `rgba(${BG_RGB}, 0)`;

    const edge = (x0: number, y0: number, x1: number, y1: number, rx: number, ry: number, rw: number, rh: number) => {
      const g = ctx.createLinearGradient(x0, y0, x1, y1);
      g.addColorStop(0, solid);
      g.addColorStop(1, clear);
      ctx.fillStyle = g;
      ctx.fillRect(rx, ry, rw, rh);
    };

    edge(dx, 0, dx + fx, 0, dx, dy, fx, dh); // left
    edge(dx + dw, 0, dx + dw - fx, 0, dx + dw - fx, dy, fx, dh); // right
    edge(0, dy, 0, dy + fy, dx, dy, dw, fy); // top
    edge(0, dy + dh, 0, dy + dh - fy, dx, dy + dh - fy, dw, fy); // bottom
  }, []);

  const scheduleDraw = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      draw(frame.get());
    });
  }, [draw, frame]);

  /* --------------------------- preloading -------------------------- */

  useEffect(() => {
    let cancelled = false;
    let done = 0;

    const images = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image();
      img.decoding = "async";
      img.src = framePath(i);
      return img;
    });
    imagesRef.current = images;

    const settle = () => {
      if (cancelled) return;
      done += 1;
      setLoadedCount(done);
    };

    Promise.all(
      images.map((img) =>
        img
          .decode()
          .catch(
            () =>
              new Promise<void>((resolve) => {
                // decode() can reject for reasons other than a bad file (e.g. Safari
                // dropping it off-screen); fall back to the load event.
                if (img.complete) return resolve();
                img.onload = () => resolve();
                img.onerror = () => resolve();
              }),
          )
          .finally(settle),
      ),
    ).then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  /* ----------------------- canvas sizing (DPR) --------------------- */

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      draw(frame.get());
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [draw, frame]);

  /* ------------------------- scroll → draw ------------------------- */

  useMotionValueEvent(frame, "change", () => {
    if (ready) scheduleDraw();
  });

  useEffect(() => {
    if (ready) draw(frame.get());
  }, [ready, draw, frame]);

  useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  /* ----------------------------- chrome ---------------------------- */

  const progressScale = useTransform(progress, [0, 1], [0, 1]);
  const hintOpacity = useTransform(progress, [0, 0.05], [1, 0]);
  const percent = Math.round((loadedCount / FRAME_COUNT) * 100);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-ink" aria-label="An exploded view of a mechanical watch">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label="A mechanical chronograph separating into its case, dial, movement and bracelet as you scroll."
        />

        {/* Vignette keeps overlay copy legible over bright components. */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(5,5,5,0.55)_100%)]" />

        {/* Bottom scrim so the centred beats read cleanly over the bracelet. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />

        {/* Story beats */}
        <div className={ready ? "contents" : "hidden"}>
          <Beat progress={progress} input={[0, 0.1, 0.17]} opacity={[1, 1, 0]} align="center">
            <h1 className="text-balance text-5xl font-semibold leading-[0.95] tracking-tightest text-white/90 sm:text-6xl md:text-7xl">
              <span className="sr-only">HODINKEE — </span>
              <span aria-hidden className="mb-4 block text-sm font-medium tracking-[0.42em] text-white/60 sm:text-base">
                HODINKEE
              </span>
              The Art of Watchmaking
            </h1>
            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/60 md:text-lg">
              One chronograph, taken apart piece by piece.
            </p>
          </Beat>

          <Beat progress={progress} input={[0.2, 0.26, 0.38, 0.44]} opacity={[0, 1, 1, 0]} align="left">
            <p className="eyebrow mb-4">01 — Precision</p>
            <h2 className="heading">Precision, in Every Detail.</h2>
            <p className="copy mt-5">
              Sapphire, bezel and case lift away. What remains is a dial finished by hand and hands set to the
              hundredth of a millimetre — the quiet discipline behind every second.
            </p>
          </Beat>

          <Beat progress={progress} input={[0.52, 0.58, 0.7, 0.76]} opacity={[0, 1, 1, 0]} align="right">
            <p className="eyebrow mb-4">02 — The Movement</p>
            <h2 className="heading">A World Within.</h2>
            <p className="copy mt-5">
              Wheels, bridges, springs and jewels — hundreds of parts suspended in the air, each one with a single
              job, together keeping a single heartbeat.
            </p>
          </Beat>

          <Beat progress={progress} input={[0.84, 0.9, 1]} opacity={[0, 1, 1]} align="center" interactive>
            <p className="eyebrow mb-4">03 — Heritage</p>
            <h2 className="heading">Made to Last.</h2>
            <p className="copy mx-auto mt-5">
              Built to be serviced, not replaced. Worn for a lifetime, then handed down.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/watch" className="btn-primary">
                Discover Reference 01
              </Link>
              <Link href="/movement" className="btn-ghost">
                Explore the Movement
              </Link>
            </div>
          </Beat>

          {/* Scroll hint */}
          <motion.div
            style={{ opacity: hintOpacity }}
            className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-3 md:inset-x-auto md:left-16 lg:left-24"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/40">Scroll</span>
            <span className="scroll-line" />
          </motion.div>

          {/* Progress rail */}
          <div className="pointer-events-none absolute right-5 top-1/2 hidden h-40 w-px -translate-y-1/2 bg-white/10 md:block">
            <motion.div style={{ scaleY: progressScale }} className="h-full w-full origin-top bg-white/60" />
          </div>
        </div>

        {/* Loader */}
        <AnimatePresence>
          {!ready && (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 bg-ink"
              role="status"
              aria-live="polite"
            >
              <div className="spinner" aria-hidden />
              <div className="flex flex-col items-center gap-2">
                <span className="text-[11px] font-medium uppercase tracking-[0.4em] text-white/60">HODINKEE</span>
                <span className="font-mono text-xs tabular-nums text-white/40">{percent}%</span>
              </div>
              <span className="sr-only">Loading image sequence, {percent} percent</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Story beat                                                          */
/* ------------------------------------------------------------------ */

type Align = "left" | "right" | "center";

const ALIGN: Record<Align, string> = {
  // On phones the watch sits in a band across the middle of the screen,
  // so side beats drop below it; from md up they sit beside it.
  left: "items-end justify-start pb-24 text-left md:items-center md:pb-0",
  right: "items-end justify-end pb-24 text-right md:items-center md:pb-0",
  center: "items-end justify-center pb-32 text-center md:pb-[12vh]",
};

const WIDTH: Record<Align, string> = {
  left: "max-w-md",
  right: "max-w-md",
  center: "max-w-3xl",
};

function Beat({
  progress,
  input,
  opacity,
  align,
  interactive = false,
  children,
}: {
  progress: MotionValue<number>;
  input: number[];
  opacity: number[];
  align: Align;
  interactive?: boolean;
  children: ReactNode;
}) {
  const o = useTransform(progress, input, opacity);
  // Drift up as it arrives, keep drifting up as it leaves.
  const y = useTransform(o, [0, 1], [28, 0]);
  const blur = useTransform(o, [0, 1], ["blur(8px)", "blur(0px)"]);
  const pointerEvents = useTransform(o, (v) => (interactive && v > 0.6 ? "auto" : "none"));

  return (
    <motion.div
      style={{ opacity: o, pointerEvents }}
      className={`absolute inset-0 z-10 flex px-6 sm:px-10 md:px-16 lg:px-24 ${ALIGN[align]}`}
    >
      <motion.div style={{ y, filter: blur }} className={WIDTH[align]}>
        {children}
      </motion.div>
    </motion.div>
  );
}
