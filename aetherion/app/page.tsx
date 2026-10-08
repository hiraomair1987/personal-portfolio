import AetherionFooter from "@/components/AetherionFooter";
import AetherionHeader from "@/components/AetherionHeader";
import AetherionHero from "@/components/AetherionHero";
import AppSection from "@/components/AppSection";
import BookingSection from "@/components/BookingSection";
import CrewSection from "@/components/CrewSection";
import DestinationsSection from "@/components/DestinationsSection";
import LifeAboardSection from "@/components/LifeAboardSection";
import { appPromo, destinations } from "@/lib/aetherion";
import { resolveAssets } from "@/lib/aetherion-assets.server";

export default function AetherionPage() {
  const images = resolveAssets();
  const destImages = destinations.map((d) => images[d.image]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[400] focus:rounded-full focus:bg-aeth-silver focus:px-4 focus:py-2 focus:text-sm focus:text-aeth-void"
      >
        Skip to content
      </a>
      <AetherionHeader />
      <main id="main">
        <AetherionHero destinations={destinations} photos={destImages.map((a) => a.src)} />
        <DestinationsSection destinations={destinations} images={destImages} />
        <LifeAboardSection images={images} />
        <CrewSection images={images} />
        <BookingSection destinations={destinations} />
        <AppSection image={images[appPromo.image]} />
      </main>
      <AetherionFooter />
    </>
  );
}
