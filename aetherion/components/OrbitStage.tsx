"use client";

import { type MotionValue, useMotionValueEvent } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import type { Destination } from "@/lib/aetherion";
import Planet from "./Planet";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Desktop stage. Every destination is a planet on one tilted circular orbit
 * around the headline. `position` is the unwrapped index the orbit is turned
 * to (it springs between integers): the planet at the front of the orbit is
 * drawn out of it toward the viewer until it fills the bottom half, its two
 * neighbours wait at the edges, and the far side of the orbit recedes behind
 * the copy.
 *
 * Positions are written straight to the DOM on each animation frame, so the
 * orbit stays smooth without re-rendering React.
 */
export default function OrbitStage({
  destinations,
  photos,
  position,
  active,
  onSelect,
}: {
  destinations: Destination[];
  photos: (string | null)[];
  position: MotionValue<number>;
  active: number;
  onSelect: (index: number) => void;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGEllipseElement>(null);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const n = destinations.length;

  const layout = useCallback(
    (p: number) => {
      const stage = stageRef.current;
      if (!stage) return;
      const vw = stage.clientWidth;
      const vh = stage.clientHeight;

      // The orbit: centred under the headline, wide enough that the two
      // neighbours of the front planet sit half off-screen.
      const side = Math.min(Math.max(vh * 0.21, 120), 200);
      const cx = vw / 2;
      const cy = vh * 0.5;
      const rx = (vw / 2 - side * 0.3) / Math.sin((Math.PI * 2) / n);
      const ry = vh * 0.13;

      // Where the front planet ends up: its cap fills the bottom half.
      const heroD = Math.max(vw * 0.92, vh * 1.3);
      const heroTop = vh * 0.56;
      const heroY = heroTop + heroD / 2;
      const capShare = (vh - heroTop) / heroD;

      const path = pathRef.current;
      if (path) {
        path.setAttribute("cx", String(cx));
        path.setAttribute("cy", String(cy));
        path.setAttribute("rx", String(rx));
        path.setAttribute("ry", String(ry));
      }

      orbRefs.current.forEach((el, i) => {
        if (!el) return;
        // Signed distance from the front, wrapped into [-n/2, n/2).
        const delta = ((((i - p) % n) + n * 1.5) % n) - n / 2;
        const theta = (delta / n) * Math.PI * 2;
        const depth = Math.cos(theta); // 1 front … -1 back
        const near = clamp01((depth + 1) / 1.5); // 1 for the front three
        const front = smooth(clamp01(1 - Math.abs(delta)));

        const ox = cx + Math.sin(theta) * rx;
        const oy = cy + depth * ry;
        const od = side * lerp(0.3, 1, near);

        const x = lerp(ox, cx, front);
        const y = lerp(oy, heroY, front);
        const d = lerp(od, heroD, front);

        el.style.width = el.style.height = `${d}px`;
        el.style.transform = `translate3d(${x - d / 2}px, ${y - d / 2}px, 0)`;
        el.style.zIndex = String(Math.round(50 + depth * 40 + front * 10));
        el.style.opacity = String(lerp(0.14, 1, near));
        el.style.setProperty("--front", front.toFixed(3));
        el.style.setProperty("--img-h", `${lerp(100, capShare * 100, front) * 1.04}%`);

        // Neighbour labels sit on the inner side of the planets either side.
        const label = labelRefs.current[i];
        if (label) {
          const show = clamp01(1 - Math.abs(Math.abs(delta) - 1) * 2.5) * (vw >= 1100 ? 1 : 0);
          const left = Math.sin(theta) < 0;
          const lx = left ? x + d / 2 + 28 : x - d / 2 - 28;
          label.style.transform = `translate3d(${lx}px, ${y}px, 0) translate(${left ? "0" : "-100%"}, -50%)`;
          label.style.textAlign = left ? "left" : "right";
          label.style.opacity = String(show);
          label.style.visibility = show > 0.02 ? "visible" : "hidden";
        }
      });
    },
    [n],
  );

  useMotionValueEvent(position, "change", layout);

  useEffect(() => {
    layout(position.get());
    const ro = new ResizeObserver(() => layout(position.get()));
    if (stageRef.current) ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, [layout, position]);

  return (
    <div ref={stageRef} className="absolute inset-0 overflow-hidden">
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full">
        <ellipse ref={pathRef} fill="none" stroke="rgba(215,223,232,0.16)" strokeWidth="1" strokeDasharray="1 7" strokeLinecap="round" />
      </svg>

      {destinations.map((d, i) => {
        const isActive = i === active;
        return (
          <div
            key={d.slug}
            ref={(el) => {
              orbRefs.current[i] = el;
            }}
            className="absolute left-0 top-0 will-change-transform"
            style={{ ["--front" as string]: isActive ? 1 : 0 }}
          >
            <Planet look={d.planet} photo={photos[i]} alt={isActive ? d.name : ""} priority={isActive} className="h-full w-full" />
            {!isActive && (
              // Mouse shortcut only; the arrow buttons are the accessible controls.
              <button
                type="button"
                tabIndex={-1}
                aria-hidden
                onClick={() => onSelect(i)}
                className="absolute inset-0 cursor-pointer rounded-full"
              />
            )}
          </div>
        );
      })}

      {destinations.map((d, i) => (
        <button
          key={d.slug}
          ref={(el) => {
            labelRefs.current[i] = el;
          }}
          type="button"
          tabIndex={-1}
          aria-hidden
          onClick={() => onSelect(i)}
          style={{ visibility: "hidden" }}
          className="absolute left-0 top-0 z-[120] text-left transition-colors duration-300 [&:hover_span]:text-white"
        >
          <span className="block font-display text-[15px] uppercase tracking-[0.28em] text-aeth-silver/85 transition-colors">{d.short}</span>
          <span className="mt-1 block text-[10px] uppercase tracking-[0.3em] text-aeth-teal/80">{d.status}</span>
        </button>
      ))}
    </div>
  );
}
