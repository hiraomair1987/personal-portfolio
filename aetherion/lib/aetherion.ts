/**
 * Aetherion site content. Layout lives in components/aetherion; everything a
 * writer might change lives here. Imagery is referenced by asset key — see
 * lib/aetherion-assets.ts for files and the OpenArt prompts behind them.
 */
import type { AssetKey } from "./aetherion-assets";

export const brand = {
  name: "Aetherion",
  tagline: "Journeys beyond the horizon",
  description:
    "Aetherion is a concept for luxury space travel: serene orbital stays, lunar retreats and long-range expeditions, designed with the care of a great hotel.",
  url: process.env.NEXT_PUBLIC_AETHERION_URL ?? "",
  /** Set NEXT_PUBLIC_AETHERION_CONTACT to show a real contact address in the footer. */
  contactEmail: process.env.NEXT_PUBLIC_AETHERION_CONTACT ?? "",
  appStoreUrl: process.env.NEXT_PUBLIC_AETHERION_APP_STORE_URL ?? "",
  playStoreUrl: process.env.NEXT_PUBLIC_AETHERION_PLAY_STORE_URL ?? "",
};

export const navLinks = [
  { href: "#destinations", label: "Destinations" },
  { href: "#life-aboard", label: "Life Aboard" },
  { href: "#crew", label: "Crew" },
  { href: "#app", label: "App" },
] as const;

/** "Planned" = on the concept roadmap; "Concept" = exploratory, no timeline. */
export type Status = "Planned" | "Concept";

/** Drawn in CSS when no generated image is present, and as the orbit planets. */
export type PlanetLook = {
  light: string;
  base: string;
  shadow: string;
  glow: string;
  texture?: "bands" | "craters" | "ice" | "earth" | "haze" | "dust";
  ring?: boolean;
};

export type Destination = {
  slug: string;
  name: string;
  /** Short label used on orbit neighbours, e.g. "Mars". */
  short: string;
  place: string;
  status: Status;
  summary: string;
  description: string;
  duration: string;
  highlights: string[];
  image: AssetKey;
  planet: PlanetLook;
};

export const destinations: Destination[] = [
  {
    slug: "aurora-ring",
    name: "Aurora Ring",
    short: "Earth Orbit",
    place: "Low Earth orbit",
    status: "Planned",
    summary: "A slow-turning orbital residence with the whole of Earth beneath your window.",
    description: "Sixteen sunrises a day, seen from a quiet suite on a slow-turning ring. Aetherion's first planned itinerary, and the gentlest way to leave the planet.",
    duration: "5 nights in orbit",
    highlights: ["Private Earth-facing suites", "Guided cupola sessions", "Zero-g lounge with crew hosts"],
    image: "destAuroraRing",
    planet: { light: "#9fd3ff", base: "#1f5fa8", shadow: "#071a35", glow: "#4aa8ff", texture: "earth" },
  },
  {
    slug: "shackleton-rim",
    name: "Shackleton Rim",
    short: "The Moon",
    place: "Lunar south pole",
    status: "Planned",
    summary: "A pressurised lodge on the rim of a crater where the sun never quite sets.",
    description: "A pressurised lodge on the rim of Shackleton crater, where the sun skims the horizon and Earth hangs low in a black sky.",
    duration: "12 days, including transit",
    highlights: ["Guided surface walks", "Earthrise observatory", "Low-gravity spa"],
    image: "destShackleton",
    planet: { light: "#f1f1ee", base: "#9a9a9a", shadow: "#1d1f24", glow: "#d7dfe8", texture: "craters" },
  },
  {
    slug: "valles-marineris",
    name: "Valles Marineris",
    short: "Mars",
    place: "Mars · equatorial canyon",
    status: "Concept",
    summary: "A canyon-edge outpost above the largest valley in the solar system.",
    description: "A concept outpost on the edge of a canyon four times deeper than the Grand Canyon. Dust-pink skies, blue sunsets, and nobody else for millions of kilometres.",
    duration: "Multi-year expedition (concept)",
    highlights: ["Canyon-view habitat", "Pressurised rover traverses", "Blue Martian sunsets"],
    image: "destValles",
    planet: { light: "#f3a979", base: "#b4532c", shadow: "#2a0e08", glow: "#ff8a5c", texture: "dust" },
  },
  {
    slug: "europa-shelf",
    name: "Europa Ice Shelf",
    short: "Europa",
    place: "Jupiter system · Europa",
    status: "Concept",
    summary: "An observatory on the ice, beneath a Jupiter twenty-four times wider than our full Moon.",
    description: "A concept observatory set into Europa's cracked ice, with Jupiter hanging overhead, twenty-four times wider than the full Moon looks from Earth. A study in silence and scale.",
    duration: "Long-range expedition (concept)",
    highlights: ["Jupiter-rise viewing gallery", "Ice-shelf research tours", "Radiation-shielded suites"],
    image: "destEuropa",
    planet: { light: "#fbf3e4", base: "#c9b79a", shadow: "#2c2418", glow: "#e7dcc8", texture: "ice" },
  },
  {
    slug: "saturn-ring-plane",
    name: "Ring Plane Voyage",
    short: "Saturn",
    place: "Saturn system",
    status: "Concept",
    summary: "A grand-tour vessel gliding alongside the rings of Saturn.",
    description: "A concept grand tour that glides alongside Saturn's rings — a sheet of ice and light that would stretch most of the way from Earth to the Moon.",
    duration: "Long-range expedition (concept)",
    highlights: ["Ring-plane observation deck", "Moon flybys", "Concert hall at the edge of the rings"],
    image: "destSaturn",
    planet: { light: "#f6e2b0", base: "#c39a5c", shadow: "#2a1c0c", glow: "#d6b46a", texture: "bands", ring: true },
  },
  {
    slug: "titan-retreat",
    name: "Kraken Mare",
    short: "Titan",
    place: "Saturn system · Titan",
    status: "Concept",
    summary: "A lakeside retreat beneath an amber sky on Saturn's largest moon.",
    description: "A concept retreat on the shore of Titan's largest methane sea, under a thick amber sky where you could, in theory, fly with strapped-on wings.",
    duration: "Long-range expedition (concept)",
    highlights: ["Lakeside pavilion", "Amber-sky glider dome", "Saturn-shine evenings"],
    image: "destTitan",
    planet: { light: "#f7c46a", base: "#c27b2a", shadow: "#2b1504", glow: "#f0a640", texture: "haze" },
  },
];

export const lifeAboard = {
  hero: "shipExterior" as AssetKey,
  interior: "cabinLounge" as AssetKey,
  features: [
    {
      title: "Suites",
      body: "Quiet, softly lit suites with a private viewport, a sleep pod that adjusts to gravity, and linens that stay put in zero g.",
      image: "cabinSuite" as AssetKey,
    },
    {
      title: "Dining",
      body: "Tasting menus composed for altered taste in microgravity, served at a single long table beneath the stars.",
      image: "cabinDining" as AssetKey,
    },
    {
      title: "Observation",
      body: "A panoramic observation deck where the windows do the talking, with an astronomer on hand to name what you're seeing.",
      image: "cabinObservation" as AssetKey,
    },
  ],
  details: [
    { label: "Wellness", value: "Daily movement sessions and a low-gravity spa" },
    { label: "Preparation", value: "Guided training before departure" },
    { label: "Hosts", value: "Hospitality crew alongside flight crew" },
  ],
};

export const crew = [
  {
    name: "Amara Okafor",
    role: "Mission Commander",
    bio: "Leads every voyage from launch to landing, and still keeps a paper logbook of each sunrise.",
    image: "crewCommander" as AssetKey,
  },
  {
    name: "Kenji Watanabe",
    role: "Flight Pilot",
    bio: "Flies the docking approach by hand when guests ask, and narrates every manoeuvre as it happens.",
    image: "crewPilot" as AssetKey,
  },
  {
    name: "Sofía Ramírez",
    role: "Flight Surgeon",
    bio: "Prepares each guest's body for space, and is the calm voice on board when the stomach disagrees.",
    image: "crewSurgeon" as AssetKey,
  },
  {
    name: "Elias Lindqvist",
    role: "Guest Experience Lead",
    bio: "Plans the moments between moments: the playlist for Earthrise, the tea at lights-down.",
    image: "crewHost" as AssetKey,
  },
];

export const appPromo = {
  image: "appPromo" as AssetKey,
  features: [
    { title: "Plan your journey", body: "Hold enquiries, compare itineraries and keep every document in one place." },
    { title: "Train at your pace", body: "Follow your pre-flight preparation schedule, with reminders that fit your week." },
    { title: "Shape your cabin", body: "Set lighting, sleep and dining preferences before you ever leave the ground." },
    { title: "Stay in the loop", body: "Get updates from your mission team as your departure approaches." },
  ],
};
