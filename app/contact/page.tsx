import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about Reference 01, the movement, or this project? Get in touch.",
};

const faqs = [
  {
    q: "Is Reference 01 a real watch?",
    a: "Reference 01 is a design concept created for this site. The photography is a rendered study, and the specifications are illustrative.",
  },
  {
    q: "How often should a mechanical watch be serviced?",
    a: "Every five to eight years is typical. Sooner if it starts gaining or losing time noticeably. Our Journal has a full care guide.",
  },
  {
    q: "Can I use this site's design for my own project?",
    a: "Send us a message with a little about what you have in mind and we will get back to you.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Let's talk watches.">
        Questions about the watch, the movement, or how this site was made. Send a note and we will reply as soon as we
        can.
      </PageHeader>

      <section className="shell pb-24 md:pb-36">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-24">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="eyebrow mb-6">Good to know</p>
            <dl className="divide-y divide-white/10 border-y border-white/10">
              {faqs.map((f) => (
                <div key={f.q} className="py-6">
                  <dt className="text-lg font-medium tracking-tight text-white/90">{f.q}</dt>
                  <dd className="mt-2 text-[15px] leading-relaxed text-white/60">{f.a}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>
    </>
  );
}
