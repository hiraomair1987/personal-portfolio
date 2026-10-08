"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/lib/aetherion";
import Wordmark from "./Wordmark";

/** Fixed header: wordmark and booking button stay on screen everywhere. */
export default function AetherionHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the menu is open: lock scroll, close on Escape, keep focus inside.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key !== "Tab" || !menuRef.current) return;
      const items = [toggleRef.current, ...menuRef.current.querySelectorAll<HTMLElement>("a")].filter(Boolean) as HTMLElement[];
      const i = items.indexOf(document.activeElement as HTMLElement);
      const nextIndex = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : (i + 1) % items.length;
      items[nextIndex].focus();
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[300] transition-[background-color,border-color] duration-500 ${
        solid ? "border-b border-white/[0.06] bg-aeth-void/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-4 sm:h-20 sm:px-8">
        <a href="#top" aria-label="Aetherion — back to top" className="shrink-0 text-[15px] sm:text-xl">
          <Wordmark />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-10 lg:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="aeth-nav-link">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a href="#book" className="aeth-btn-gold h-10 whitespace-nowrap px-4 text-[10px] tracking-[0.14em] sm:h-11 sm:px-6 sm:text-[11px] sm:tracking-[0.18em]">
            Book a journey
          </a>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="aeth-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 h-px w-4 bg-current transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1.5 h-px w-4 bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 h-px w-4 bg-current transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="aeth-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0, y: reduce ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-[calc(100svh-4rem)] overflow-y-auto border-t border-white/[0.06] bg-aeth-void/95 px-6 pb-10 pt-8 backdrop-blur-xl sm:h-[calc(100svh-5rem)] lg:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="space-y-1">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between border-b border-white/[0.08] py-5 font-display text-2xl uppercase tracking-[0.12em] text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a href="#book" onClick={() => setOpen(false)} className="aeth-btn-gold mt-10 h-12 w-full text-xs">
                Book a journey
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
