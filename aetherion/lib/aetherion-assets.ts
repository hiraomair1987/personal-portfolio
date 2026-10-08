/**
 * Every Aetherion image slot. Generate each with OpenArt using its prompt
 * (append STYLE), export as WebP at the listed size, and save it to
 * public/aetherion/<file>. The site picks the file up on the next build; until
 * then the slot renders a labelled placeholder (see components/aetherion/AssetImage).
 */

/** Appended to every prompt so the set shares one look. */
export const STYLE =
  "cinematic realism, photographic, 35mm anamorphic, soft volumetric light, deep midnight-navy shadows (#081322), restrained champagne-gold (#D6B46A) and aurora-teal (#72CFC5) accents, lunar-silver highlights, calm and serene mood, high dynamic range, subtle film grain, no text, no logos, no watermark";

export type Asset = {
  file: string;
  width: number;
  height: number;
  alt: string;
  prompt: string;
};

export const assets = {
  destAuroraRing: {
    file: "dest-aurora-ring.webp",
    width: 2400,
    height: 1500,
    alt: "A luxury orbital ring residence turning slowly above Earth at sunrise.",
    prompt: "A slender luxury orbital ring residence in low Earth orbit, warm-lit panoramic windows, Earth's curved blue horizon below with a thin sunrise line, aurora shimmering over the polar cap, wide establishing shot",
  },
  destShackleton: {
    file: "dest-shackleton.webp",
    width: 2400,
    height: 1500,
    alt: "A low pressurised lodge on a lunar crater rim with Earth low on the horizon.",
    prompt: "A low, elegant pressurised lunar lodge built into the rim of a crater at the Moon's south pole, long raking sunlight, deep black sky, Earth low on the horizon, softly glowing gold-lit windows, grey regolith with long shadows, wide landscape",
  },
  destValles: {
    file: "dest-valles.webp",
    width: 2400,
    height: 1500,
    alt: "A glass-fronted habitat on the edge of a vast Martian canyon at a blue sunset.",
    prompt: "A glass-fronted luxury habitat perched on the edge of Valles Marineris on Mars, enormous layered canyon walls receding into haze, butterscotch sky turning to a small blue sunset, pressurised rover parked outside, wide landscape",
  },
  destEuropa: {
    file: "dest-europa.webp",
    width: 2400,
    height: 1500,
    alt: "An observatory dome set into cracked ice with Jupiter large in the sky.",
    prompt: "A minimalist observatory dome set into the cracked reddish-streaked ice plains of Europa, giant banded Jupiter looming large in the black sky, faint starlight, warm gold interior glow, wide landscape",
  },
  destSaturn: {
    file: "dest-saturn.webp",
    width: 2400,
    height: 1500,
    alt: "A sleek passenger vessel gliding beside the rings of Saturn.",
    prompt: "A sleek long-range passenger vessel gliding along the edge of Saturn's rings, rings stretching across the frame as a sheet of ice and light, Saturn's golden banded globe behind, tiny moon in the distance, wide shot",
  },
  destTitan: {
    file: "dest-titan.webp",
    width: 2400,
    height: 1500,
    alt: "A lakeside pavilion beneath a hazy amber sky on Titan.",
    prompt: "A serene lakeside pavilion on the shore of a dark methane sea on Titan, thick hazy amber atmosphere, faint ghost of Saturn through the haze, soft warm lights reflecting on still liquid, wide landscape",
  },
  shipExterior: {
    file: "ship-exterior.webp",
    width: 2400,
    height: 1350,
    alt: "The Aetherion passenger spacecraft in orbit, its windows lit, Earth below.",
    prompt: "Exterior of a believable luxury passenger spacecraft in Earth orbit, elegant elongated hull in pearl-white and brushed silver with fine champagne-gold detailing, rows of softly lit panoramic windows, solar arrays folded neatly, Earth's limb below, three-quarter view",
  },
  cabinLounge: {
    file: "cabin-lounge.webp",
    width: 2400,
    height: 1500,
    alt: "The main lounge aboard the spacecraft, with curved seating facing a panoramic window onto Earth.",
    prompt: "Interior of a luxury spacecraft lounge, curved cream leather seating, warm indirect lighting, brushed metal and pale oak surfaces, a huge curved panoramic window showing Earth below, two guests relaxing with drinks, architectural interior photography",
  },
  cabinSuite: {
    file: "cabin-suite.webp",
    width: 1600,
    height: 2000,
    alt: "A private suite with a soft-lit sleep pod and a round viewport onto space.",
    prompt: "A private luxury spacecraft suite, soft sculpted sleep pod with ivory linens, warm low lighting, round viewport showing stars and Earth's limb, refined minimalist hotel design, interior photography, portrait framing",
  },
  cabinDining: {
    file: "cabin-dining.webp",
    width: 1600,
    height: 2000,
    alt: "A long dining table set for a tasting menu beneath a starfield ceiling window.",
    prompt: "A long elegant dining table aboard a spacecraft set for a tasting menu, crystal and brushed-gold tableware, a chef plating a dish, a curved ceiling window full of stars, warm candle-like lighting, diverse guests, interior photography, portrait framing",
  },
  cabinObservation: {
    file: "cabin-observation.webp",
    width: 1600,
    height: 2000,
    alt: "A guest silhouetted against the panoramic window of an observation deck.",
    prompt: "A guest silhouetted against a floor-to-ceiling panoramic observation window aboard a spacecraft, the Moon and Earth visible, soft teal ambient light, calm contemplative mood, interior photography, portrait framing",
  },
  crewCommander: {
    file: "crew-commander.webp",
    width: 1200,
    height: 1500,
    alt: "Portrait of Commander Amara Okafor in a tailored flight suit.",
    prompt: "Editorial portrait of a confident Nigerian woman in her forties, a spacecraft mission commander, tailored midnight-navy flight suit with subtle gold piping, standing in a softly lit spacecraft corridor, shallow depth of field, head and shoulders",
  },
  crewPilot: {
    file: "crew-pilot.webp",
    width: 1200,
    height: 1500,
    alt: "Portrait of pilot Kenji Watanabe in the cockpit.",
    prompt: "Editorial portrait of a Japanese man in his thirties, a spacecraft pilot, tailored midnight-navy flight suit, seated in a refined cockpit with soft instrument glow, calm focused expression, shallow depth of field, head and shoulders",
  },
  crewSurgeon: {
    file: "crew-surgeon.webp",
    width: 1200,
    height: 1500,
    alt: "Portrait of flight surgeon Sofía Ramírez in the ship's medical bay.",
    prompt: "Editorial portrait of a Latina woman in her late thirties, a spacecraft flight surgeon, lunar-silver crew jacket, in a clean softly lit medical bay aboard a spacecraft, warm reassuring expression, shallow depth of field, head and shoulders",
  },
  crewHost: {
    file: "crew-host.webp",
    width: 1200,
    height: 1500,
    alt: "Portrait of Elias Lindqvist, guest experience lead, in the lounge.",
    prompt: "Editorial portrait of a Swedish man in his fifties with a grey beard, a spacecraft guest experience lead, tailored midnight-navy jacket with a small gold pin, in a warmly lit spacecraft lounge, gentle smile, shallow depth of field, head and shoulders",
  },
  appPromo: {
    file: "app-promo.webp",
    width: 1600,
    height: 2000,
    alt: "The Aetherion app on a phone, showing an upcoming journey itinerary.",
    prompt: "A modern smartphone floating at a slight angle against a deep midnight-navy starfield, its screen showing an elegant dark travel app with a planet illustration, a journey itinerary card and a countdown, champagne-gold and teal accents, product photography, soft reflections, portrait framing",
  },
} satisfies Record<string, Asset>;

export type AssetKey = keyof typeof assets;

/** What a component receives: the asset plus whether its file exists yet. */
export type ResolvedAsset = Asset & { key: AssetKey; src: string | null };
