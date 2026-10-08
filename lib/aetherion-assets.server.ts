import fs from "node:fs";
import path from "node:path";
import { type AssetKey, type ResolvedAsset, assets } from "./aetherion-assets";

/**
 * Checks public/aetherion for each generated image at build time, so a missing
 * file renders as a labelled slot instead of a broken image.
 */
export function resolveAssets(): Record<AssetKey, ResolvedAsset> {
  const dir = path.join(process.cwd(), "public", "aetherion");
  return Object.fromEntries(
    (Object.keys(assets) as AssetKey[]).map((key) => {
      const a = assets[key];
      const exists = fs.existsSync(path.join(dir, a.file));
      return [key, { ...a, key, src: exists ? `/aetherion/${a.file}` : null }];
    }),
  ) as Record<AssetKey, ResolvedAsset>;
}
