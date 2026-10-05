/** Every still on the site, with intrinsic sizes for next/image. */
export const images = {
  assembled: { src: "/images/watch-assembled.webp", width: 1600, height: 900, alt: "The black chronograph resting on dark fabric, fully assembled." },
  bezelLift: { src: "/images/watch-bezel-lift.webp", width: 1600, height: 900, alt: "The bezel and crystal lifting away from the watch case." },
  separating: { src: "/images/watch-separating.webp", width: 1600, height: 900, alt: "The watch separating into case, dial and movement." },
  exploded: { src: "/images/watch-exploded.webp", width: 1600, height: 900, alt: "Exploded view of the chronograph with every component suspended in air." },
  dial: { src: "/images/dial.webp", width: 760, height: 760, alt: "Close-up of the black dial with three sub-dials and red chronograph hands." },
  case: { src: "/images/case.webp", width: 760, height: 460, alt: "The case and domed sapphire crystal floating above the dial." },
  dialExploded: { src: "/images/dial-exploded.webp", width: 640, height: 360, alt: "The dial and hands separated from the movement." },
  gearTrain: { src: "/images/gear-train.webp", width: 420, height: 420, alt: "Gold and steel wheels of the gear train." },
  rotor: { src: "/images/rotor.webp", width: 420, height: 300, alt: "The semi-circular winding rotor." },
  movement: { src: "/images/movement.webp", width: 640, height: 420, alt: "The chronograph movement with bridges, wheels and ruby jewels." },
  caseback: { src: "/images/caseback.webp", width: 680, height: 360, alt: "The caseback with its exhibition window." },
  crown: { src: "/images/crown-pushers.webp", width: 440, height: 300, alt: "The crown, winding stem and chronograph pushers." },
} as const;

export type SiteImage = (typeof images)[keyof typeof images];
