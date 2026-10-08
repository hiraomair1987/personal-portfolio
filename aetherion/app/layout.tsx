import type { Metadata, Viewport } from "next";
import { Cinzel, Inter } from "next/font/google";
import { brand } from "@/lib/aetherion";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const display = Cinzel({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap", variable: "--font-display" });

const title = "Aetherion — Luxury space travel, imagined";
const siteUrl =
  brand.url ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: brand.description,
  openGraph: { title, description: brand.description, type: "website", siteName: "Aetherion" },
  // The preview image comes from ./opengraph-image.tsx.
  twitter: { card: "summary_large_image", title, description: brand.description },
};

export const viewport: Viewport = {
  themeColor: "#081322",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="aetherion">{children}</body>
    </html>
  );
}
