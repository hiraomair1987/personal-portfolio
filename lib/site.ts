export const site = {
  name: "HODINKEE",
  title: "HODINKEE — The Art of Watchmaking",
  description: "A scroll-driven study of a mechanical chronograph: the watch, its movement, how it is made, and the stories around it.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://the-art-of-watch-storytelling.vercel.app",
  /**
   * Where the contact form sends messages (opens the visitor's mail app).
   * Set NEXT_PUBLIC_CONTACT_EMAIL in Vercel → Project → Settings → Environment Variables.
   */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
};

export const nav = [
  { href: "/watch", label: "The Watch" },
  { href: "/movement", label: "Movement" },
  { href: "/craft", label: "Craft" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
] as const;
