"use client";

import type { ReactNode } from "react";

export const ENQUIRE_EVENT = "aetherion:enquire";

/** Jumps to the booking form with this destination pre-selected. */
export default function EnquireLink({ slug, className, children }: { slug: string; className?: string; children: ReactNode }) {
  return (
    <a
      href="#book"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(ENQUIRE_EVENT, { detail: slug }))}
    >
      {children}
    </a>
  );
}
