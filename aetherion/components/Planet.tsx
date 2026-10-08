import Image from "next/image";
import type { CSSProperties } from "react";
import type { PlanetLook } from "@/lib/aetherion";

/**
 * A destination sphere drawn in CSS. When a generated photo exists it fades in
 * as the planet reaches the front (driven by the `--front` custom property,
 * 0 in orbit → 1 at the front), cropped to `--img-h` of the sphere's height so
 * the visible cap shows the whole landscape.
 */
export default function Planet({
  look,
  photo,
  alt = "",
  priority = false,
  className = "",
  style,
}: {
  look: PlanetLook;
  photo?: string | null;
  alt?: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const vars = {
    "--p-light": look.light,
    "--p-base": look.base,
    "--p-shadow": look.shadow,
    "--p-glow": look.glow,
    ...style,
  } as CSSProperties;

  return (
    <div className={`planet ${className}`} style={vars}>
      {look.ring && <div aria-hidden className="planet__ring" />}
      <div className="planet__body">
        <div aria-hidden className={`planet__surface planet__surface--${look.texture ?? "plain"}`} />
        <div aria-hidden className="planet__shade" />
        {photo && (
          <div className="planet__photo">
            <Image src={photo} alt={alt} fill priority={priority} sizes="100vw" className="object-cover" />
            <div aria-hidden className="planet__photo-wash" />
          </div>
        )}
      </div>
      {look.ring && <div aria-hidden className="planet__ring planet__ring--front" />}
    </div>
  );
}
