import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "HODINKEE — The Art of Watchmaking",
  description: "A scroll-driven exploded view of a mechanical chronograph, from sapphire crystal to movement.",
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Warm the cache for the opening frames before hydration kicks off the full preload. */}
        <link rel="preload" as="image" href="/video-split/frame_0_delay-0.04s.webp" type="image/webp" />
      </head>
      <body>{children}</body>
    </html>
  );
}
