import Image from "next/image";
import type { ResolvedAsset } from "@/lib/aetherion-assets";

/**
 * A generated image, or — until its OpenArt file is added to public/aetherion —
 * a quiet, clearly labelled slot so nobody mistakes it for final artwork.
 */
export default function AssetImage({
  asset,
  sizes,
  priority = false,
  className = "",
  imgClassName = "object-cover",
}: {
  asset: ResolvedAsset;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-aeth-navy ${className}`}>
      {asset.src ? (
        <Image src={asset.src} alt={asset.alt} fill sizes={sizes} priority={priority} className={imgClassName} />
      ) : (
        <div role="img" aria-label={`${asset.alt} (image coming soon)`} className="aeth-slot absolute inset-0 flex items-end p-4">
          <p className="rounded-full border border-aeth-silver/15 bg-aeth-void/60 px-3 py-1.5 font-mono text-[10px] tracking-wide text-aeth-silver/60 backdrop-blur-sm">
            OpenArt asset pending · {asset.file}
          </p>
        </div>
      )}
    </div>
  );
}
