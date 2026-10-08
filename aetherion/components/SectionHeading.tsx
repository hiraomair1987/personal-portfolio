import Reveal from "@/components/Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  id,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  id?: string;
}) {
  const center = align === "center";
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-aeth-gold">{eyebrow}</p>
      <h2 id={id} className="mt-4 font-display text-[clamp(2rem,4.4vw,3.5rem)] font-normal uppercase leading-[1.05] tracking-[0.03em] text-white">
        {title}
      </h2>
      <span aria-hidden className={`mt-6 block h-[2px] w-12 rounded-full bg-aeth-teal ${center ? "mx-auto" : ""}`} />
      {intro && <p className="mt-6 text-pretty text-[15px] leading-relaxed text-aeth-silver/75 md:text-base">{intro}</p>}
    </Reveal>
  );
}
