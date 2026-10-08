import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

/** Chrome shared by every HODINKEE page. Aetherion (app/aetherion) brings its own. */
export default function HodinkeeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="content">{children}</main>
      <SiteFooter />
    </>
  );
}
