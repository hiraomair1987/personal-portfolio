# Aetherion

Landing page for Aetherion, a luxury space-travel concept. A standalone Next.js 14 (App Router) app with Tailwind CSS and Framer Motion.

## Run locally

```bash
cd aetherion
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Deploy (Vercel)

Import the repository as a project and set **Root Directory** to `aetherion`. The Next.js preset is detected automatically.

## What's here

- **Hero** — `components/AetherionHero.tsx`. A 3D orbital carousel (`OrbitStage.tsx`) on screens ≥ 900×600; a lighter stage (`SimpleStage.tsx`) on phones and for `prefers-reduced-motion`. Browse with the arrow buttons, ← → keys (only while the hero is in view), swipes or drags, the dots, or by clicking a planet.
- **Sections** — destinations, life aboard, crew, booking form, app promo and footer, one component each in `components/`.
- **Content** — `lib/aetherion.ts` (copy, destinations, crew).
- **Images** — `lib/aetherion-assets.ts` lists every image slot with its OpenArt prompt; see `docs/aetherion-assets.md`. Save each generated file into `public/aetherion/` and rebuild. Until then, each slot shows a labelled placeholder.
- **Booking form** — demo only. Wire `submitEnquiry` in `lib/aetherion-enquiry.ts` to a real endpoint to go live.

## Optional environment variables

| Variable | Effect |
| --- | --- |
| `NEXT_PUBLIC_AETHERION_URL` | Canonical site URL for social previews |
| `NEXT_PUBLIC_AETHERION_CONTACT` | Shows a contact email in the footer |
| `NEXT_PUBLIC_AETHERION_APP_STORE_URL` | Turns the App Store button into a link |
| `NEXT_PUBLIC_AETHERION_PLAY_STORE_URL` | Turns the Google Play button into a link |
