# Aetherion — OpenArt asset slots

OpenArt was not reachable from the build environment, so no images were generated. Every image on `/aetherion` reads from a slot below; until its file exists, the page shows a labelled "OpenArt asset pending" panel (destination cards and the hero fall back to CSS-drawn planets).

## How to fill a slot

1. In OpenArt, generate using the prompt below **followed by the shared style line**.
2. Export at (or above) the listed size, convert to WebP at ~80% quality (e.g. `cwebp -q 80 in.png -o out.webp`). Aim for under ~400 KB each.
3. Save it as `public/aetherion/<file>` and rebuild (`npm run build`). The slot switches to the image automatically; `next/image` serves responsive sizes.

Prompts and alt text live in `lib/aetherion-assets.ts` — edit them there and regenerate this file if they change.

**Shared style line (append to every prompt):**

> cinematic realism, photographic, 35mm anamorphic, soft volumetric light, deep midnight-navy shadows (#081322), restrained champagne-gold (#D6B46A) and aurora-teal (#72CFC5) accents, lunar-silver highlights, calm and serene mood, high dynamic range, subtle film grain, no text, no logos, no watermark

## Slots

### `dest-aurora-ring.webp` — 2400×1500

- Key: `destAuroraRing`
- Alt text: A luxury orbital ring residence turning slowly above Earth at sunrise.

```text
A slender luxury orbital ring residence in low Earth orbit, warm-lit panoramic windows, Earth's curved blue horizon below with a thin sunrise line, aurora shimmering over the polar cap, wide establishing shot, cinematic realism, photographic, 35mm anamorphic, soft volumetric light, deep midnight-navy shadows (#081322), restrained champagne-gold (#D6B46A) and aurora-teal (#72CFC5) accents, lunar-silver highlights, calm and serene mood, high dynamic range, subtle film grain, no text, no logos, no watermark
```

### `dest-shackleton.webp` — 2400×1500

- Key: `destShackleton`
- Alt text: A low pressurised lodge on a lunar crater rim with Earth low on the horizon.

```text
A low, elegant pressurised lunar lodge built into the rim of a crater at the Moon's south pole, long raking sunlight, deep black sky, Earth low on the horizon, softly glowing gold-lit windows, grey regolith with long shadows, wide landscape, cinematic realism, photographic, 35mm anamorphic, soft volumetric light, deep midnight-navy shadows (#081322), restrained champagne-gold (#D6B46A) and aurora-teal (#72CFC5) accents, lunar-silver highlights, calm and serene mood, high dynamic range, subtle film grain, no text, no logos, no watermark
```

### `dest-valles.webp` — 2400×1500

- Key: `destValles`
- Alt text: A glass-fronted habitat on the edge of a vast Martian canyon at a blue sunset.

```text
A glass-fronted luxury habitat perched on the edge of Valles Marineris on Mars, enormous layered canyon walls receding into haze, butterscotch sky turning to a small blue sunset, pressurised rover parked outside, wide landscape, cinematic realism, photographic, 35mm anamorphic, soft volumetric light, deep midnight-navy shadows (#081322), restrained champagne-gold (#D6B46A) and aurora-teal (#72CFC5) accents, lunar-silver highlights, calm and serene mood, high dynamic range, subtle film grain, no text, no logos, no watermark
```

### `dest-europa.webp` — 2400×1500

- Key: `destEuropa`
- Alt text: An observatory dome set into cracked ice with Jupiter large in the sky.

```text
A minimalist observatory dome set into the cracked reddish-streaked ice plains of Europa, giant banded Jupiter looming large in the black sky, faint starlight, warm gold interior glow, wide landscape, cinematic realism, photographic, 35mm anamorphic, soft volumetric light, deep midnight-navy shadows (#081322), restrained champagne-gold (#D6B46A) and aurora-teal (#72CFC5) accents, lunar-silver highlights, calm and serene mood, high dynamic range, subtle film grain, no text, no logos, no watermark
```

### `dest-saturn.webp` — 2400×1500

- Key: `destSaturn`
- Alt text: A sleek passenger vessel gliding beside the rings of Saturn.

```text
A sleek long-range passenger vessel gliding along the edge of Saturn's rings, rings stretching across the frame as a sheet of ice and light, Saturn's golden banded globe behind, tiny moon in the distance, wide shot, cinematic realism, photographic, 35mm anamorphic, soft volumetric light, deep midnight-navy shadows (#081322), restrained champagne-gold (#D6B46A) and aurora-teal (#72CFC5) accents, lunar-silver highlights, calm and serene mood, high dynamic range, subtle film grain, no text, no logos, no watermark
```

### `dest-titan.webp` — 2400×1500

- Key: `destTitan`
- Alt text: A lakeside pavilion beneath a hazy amber sky on Titan.

```text
A serene lakeside pavilion on the shore of a dark methane sea on Titan, thick hazy amber atmosphere, faint ghost of Saturn through the haze, soft warm lights reflecting on still liquid, wide landscape, cinematic realism, photographic, 35mm anamorphic, soft volumetric light, deep midnight-navy shadows (#081322), restrained champagne-gold (#D6B46A) and aurora-teal (#72CFC5) accents, lunar-silver highlights, calm and serene mood, high dynamic range, subtle film grain, no text, no logos, no watermark
```

### `ship-exterior.webp` — 2400×1350

- Key: `shipExterior`
- Alt text: The Aetherion passenger spacecraft in orbit, its windows lit, Earth below.

```text
Exterior of a believable luxury passenger spacecraft in Earth orbit, elegant elongated hull in pearl-white and brushed silver with fine champagne-gold detailing, rows of softly lit panoramic windows, solar arrays folded neatly, Earth's limb below, three-quarter view, cinematic realism, photographic, 35mm anamorphic, soft volumetric light, deep midnight-navy shadows (#081322), restrained champagne-gold (#D6B46A) and aurora-teal (#72CFC5) accents, lunar-silver highlights, calm and serene mood, high dynamic range, subtle film grain, no text, no logos, no watermark
```

### `cabin-lounge.webp` — 2400×1500

- Key: `cabinLounge`
- Alt text: The main lounge aboard the spacecraft, with curved seating facing a panoramic window onto Earth.

```text
Interior of a luxury spacecraft lounge, curved cream leather seating, warm indirect lighting, brushed metal and pale oak surfaces, a huge curved panoramic window showing Earth below, two guests relaxing with drinks, architectural interior photography, cinematic realism, photographic, 35mm anamorphic, soft volumetric light, deep midnight-navy shadows (#081322), restrained champagne-gold (#D6B46A) and aurora-teal (#72CFC5) accents, lunar-silver highlights, calm and serene mood, high dynamic range, subtle film grain, no text, no logos, no watermark
```

### `cabin-suite.webp` — 1600×2000

- Key: `cabinSuite`
- Alt text: A private suite with a soft-lit sleep pod and a round viewport onto space.

```text
A private luxury spacecraft suite, soft sculpted sleep pod with ivory linens, warm low lighting, round viewport showing stars and Earth's limb, refined minimalist hotel design, interior photography, portrait framing, cinematic realism, photographic, 35mm anamorphic, soft volumetric light, deep midnight-navy shadows (#081322), restrained champagne-gold (#D6B46A) and aurora-teal (#72CFC5) accents, lunar-silver highlights, calm and serene mood, high dynamic range, subtle film grain, no text, no logos, no watermark
```

### `cabin-dining.webp` — 1600×2000

- Key: `cabinDining`
- Alt text: A long dining table set for a tasting menu beneath a starfield ceiling window.

```text
A long elegant dining table aboard a spacecraft set for a tasting menu, crystal and brushed-gold tableware, a chef plating a dish, a curved ceiling window full of stars, warm candle-like lighting, diverse guests, interior photography, portrait framing, cinematic realism, photographic, 35mm anamorphic, soft volumetric light, deep midnight-navy shadows (#081322), restrained champagne-gold (#D6B46A) and aurora-teal (#72CFC5) accents, lunar-silver highlights, calm and serene mood, high dynamic range, subtle film grain, no text, no logos, no watermark
```

### `cabin-observation.webp` — 1600×2000

- Key: `cabinObservation`
- Alt text: A guest silhouetted against the panoramic window of an observation deck.

```text
A guest silhouetted against a floor-to-ceiling panoramic observation window aboard a spacecraft, the Moon and Earth visible, soft teal ambient light, calm contemplative mood, interior photography, portrait framing, cinematic realism, photographic, 35mm anamorphic, soft volumetric light, deep midnight-navy shadows (#081322), restrained champagne-gold (#D6B46A) and aurora-teal (#72CFC5) accents, lunar-silver highlights, calm and serene mood, high dynamic range, subtle film grain, no text, no logos, no watermark
```

### `crew-commander.webp` — 1200×1500

- Key: `crewCommander`
- Alt text: Portrait of Commander Amara Okafor in a tailored flight suit.

```text
Editorial portrait of a confident Nigerian woman in her forties, a spacecraft mission commander, tailored midnight-navy flight suit with subtle gold piping, standing in a softly lit spacecraft corridor, shallow depth of field, head and shoulders, cinematic realism, photographic, 35mm anamorphic, soft volumetric light, deep midnight-navy shadows (#081322), restrained champagne-gold (#D6B46A) and aurora-teal (#72CFC5) accents, lunar-silver highlights, calm and serene mood, high dynamic range, subtle film grain, no text, no logos, no watermark
```

### `crew-pilot.webp` — 1200×1500

- Key: `crewPilot`
- Alt text: Portrait of pilot Kenji Watanabe in the cockpit.

```text
Editorial portrait of a Japanese man in his thirties, a spacecraft pilot, tailored midnight-navy flight suit, seated in a refined cockpit with soft instrument glow, calm focused expression, shallow depth of field, head and shoulders, cinematic realism, photographic, 35mm anamorphic, soft volumetric light, deep midnight-navy shadows (#081322), restrained champagne-gold (#D6B46A) and aurora-teal (#72CFC5) accents, lunar-silver highlights, calm and serene mood, high dynamic range, subtle film grain, no text, no logos, no watermark
```

### `crew-surgeon.webp` — 1200×1500

- Key: `crewSurgeon`
- Alt text: Portrait of flight surgeon Sofía Ramírez in the ship's medical bay.

```text
Editorial portrait of a Latina woman in her late thirties, a spacecraft flight surgeon, lunar-silver crew jacket, in a clean softly lit medical bay aboard a spacecraft, warm reassuring expression, shallow depth of field, head and shoulders, cinematic realism, photographic, 35mm anamorphic, soft volumetric light, deep midnight-navy shadows (#081322), restrained champagne-gold (#D6B46A) and aurora-teal (#72CFC5) accents, lunar-silver highlights, calm and serene mood, high dynamic range, subtle film grain, no text, no logos, no watermark
```

### `crew-host.webp` — 1200×1500

- Key: `crewHost`
- Alt text: Portrait of Elias Lindqvist, guest experience lead, in the lounge.

```text
Editorial portrait of a Swedish man in his fifties with a grey beard, a spacecraft guest experience lead, tailored midnight-navy jacket with a small gold pin, in a warmly lit spacecraft lounge, gentle smile, shallow depth of field, head and shoulders, cinematic realism, photographic, 35mm anamorphic, soft volumetric light, deep midnight-navy shadows (#081322), restrained champagne-gold (#D6B46A) and aurora-teal (#72CFC5) accents, lunar-silver highlights, calm and serene mood, high dynamic range, subtle film grain, no text, no logos, no watermark
```

### `app-promo.webp` — 1600×2000

- Key: `appPromo`
- Alt text: The Aetherion app on a phone, showing an upcoming journey itinerary.

```text
A modern smartphone floating at a slight angle against a deep midnight-navy starfield, its screen showing an elegant dark travel app with a planet illustration, a journey itinerary card and a countdown, champagne-gold and teal accents, product photography, soft reflections, portrait framing, cinematic realism, photographic, 35mm anamorphic, soft volumetric light, deep midnight-navy shadows (#081322), restrained champagne-gold (#D6B46A) and aurora-teal (#72CFC5) accents, lunar-silver highlights, calm and serene mood, high dynamic range, subtle film grain, no text, no logos, no watermark
```

