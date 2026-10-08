# HODINKEE — The Art of Watchmaking

A scroll-driven exploded view of a mechanical chronograph. Built with Next.js 14 (App Router), Tailwind CSS, Framer Motion and an HTML5 canvas image sequence.

## Pages

| Route | What's there |
| --- | --- |
| `/` | Scroll-driven exploded view, then overview, chapters, key numbers, journal teaser |
| `/watch` | Reference 01: photo gallery, highlights, dial feature, full specifications |
| `/movement` | Interactive exploded view with numbered hotspots, then each part explained |
| `/craft` | Six stages from design to quality control |
| `/journal` | Featured story + list; each story at `/journal/[slug]` |
| `/contact` | Contact form + FAQ |

Content (specs, parts, craft steps, articles) lives in `lib/content.ts`; nav and site settings in `lib/site.ts`.

### Contact form

The form opens the visitor's email app addressed to `NEXT_PUBLIC_CONTACT_EMAIL`. Set it in Vercel → Project → Settings → Environment Variables, then redeploy. Until it's set, the form shows a "not set up yet" message.

## Aetherion

The Aetherion space-travel landing page is a separate Next.js app in [`aetherion/`](aetherion/README.md), with its own dependencies and Vercel project (Root Directory: `aetherion`).

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## How it works

- `components/WatchScroll.tsx` — a `h-[400vh]` section with a sticky full-screen `<canvas>`. Framer Motion's `useScroll` (smoothed with `useSpring`) maps scroll progress to a frame index; frames cross-fade on the fractional part of the index so scrolling never steps.
- `public/video-split/frame_[0-79]_delay-0.04s.webp` — 80 frames (1600×900) taken from the source video.
- The footage only goes one way (assembled → exploded), so the timeline plays it forward to the 60% beat, holds, then plays it in reverse so the watch reassembles for "Made to Last." Tweak `FRAME_INPUT` / `FRAME_OUTPUT` to change the pacing.
- Images are drawn with `contain` fit and their edges are feathered into the `#050505` background, so nothing is cropped on mobile.

## Deploy: GitLab → Vercel

1. Push this repo to GitLab:
   ```bash
   git remote add gitlab git@gitlab.com:<you>/<repo>.git
   git push gitlab <branch>
   ```
2. In Vercel: **Add New → Project → Continue with GitLab**, pick the repo. The Next.js preset is detected automatically; no environment variables are needed.
3. Every push to GitLab then triggers a deploy (preview builds for branches, production for the default branch).

The frame sequence is served with a one-year immutable `Cache-Control` header (see `next.config.mjs`). If you replace frames, give them new file names so caches don't serve the old ones.
