import type { Metadata, Viewport } from "next";
import { Cinzel } from "next/font/google";
import { brand } from "@/lib/aetherion";

const display = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-display",
});

const title = "Aetherion — Luxury space travel, imagined";

export const metadata: Metadata = {
  title: { absolute: title },
  description: brand.description,
  openGraph: {
    title,
    description: brand.description,
    type: "website",
    siteName: "Aetherion",
  },
  // The preview image comes from ./opengraph-image.tsx.
  twitter: { card: "summary_large_image", title, description: brand.description },
};

export const viewport: Viewport = {
  themeColor: "#081322",
};

export default function AetherionLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${display.variable} aetherion bg-aeth-void text-aeth-silver`}>{children}</div>;
}
