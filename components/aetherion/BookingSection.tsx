"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import type { Destination } from "@/lib/aetherion";
import { type Enquiry, type EnquiryErrors, submitEnquiry, validateEnquiry } from "@/lib/aetherion-enquiry";
import { ENQUIRE_EVENT } from "./EnquireLink";
import { CheckIcon } from "./icons";
import SectionHeading from "./SectionHeading";

const empty: Enquiry = { name: "", email: "", partySize: "", destination: "", message: "" };

export default function BookingSection({ destinations }: { destinations: Destination[] }) {
  const [values, setValues] = useState<Enquiry>(empty);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Enquiry, boolean>>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  // "Register interest" links elsewhere on the page preselect a destination.
  useEffect(() => {
    const onEnquire = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      setValues((v) => ({ ...v, destination: slug }));
      setState((s) => (s === "sent" ? "idle" : s));
    };
    window.addEventListener(ENQUIRE_EVENT, onEnquire);
    return () => window.removeEventListener(ENQUIRE_EVENT, onEnquire);
  }, []);

  const set = (key: keyof Enquiry) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...values, [key]: e.target.value };
    setValues(next);
    if (touched[key]) setErrors(validateEnquiry(next));
  };
  const blur = (key: keyof Enquiry) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validateEnquiry(values));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validateEnquiry(values);
    setErrors(found);
    setTouched({ name: true, email: true, partySize: true, destination: true, message: true });
    if (Object.keys(found).length) {
      formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }
    setState("sending");
    try {
      await submitEnquiry(values);
      setState("sent");
    } catch {
      setState("failed");
    }
  };

  useEffect(() => {
    if (state === "sent" || state === "failed") statusRef.current?.focus();
  }, [state]);

  const field = (key: keyof Enquiry) => ({
    id: `${uid}-${key}`,
    name: key,
    value: values[key],
    onChange: set(key),
    onBlur: blur(key),
    "aria-invalid": touched[key] && errors[key] ? true : undefined,
    "aria-describedby": touched[key] && errors[key] ? `${uid}-${key}-error` : undefined,
    className: "aeth-input",
  });
  const error = (key: keyof Enquiry) =>
    touched[key] && errors[key] ? (
      <p id={`${uid}-${key}-error`} className="mt-2 text-[12px] text-[#f2a7a0]">
        {errors[key]}
      </p>
    ) : null;

  const chosen = destinations.find((d) => d.slug === values.destination);

  return (
    <section id="book" aria-labelledby="book-title" className="aeth-section scroll-mt-20 bg-gradient-to-b from-aeth-void via-aeth-navy/45 to-aeth-void">
      <div className="aeth-shell grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div>
          <SectionHeading
            id="book-title"
            eyebrow="Book a journey"
            title="Begin with a conversation"
            intro="Tell us where you'd like to go and who you'd like to bring. A journey designer would reply personally to talk through timing, preparation and what is possible."
          />
          <ol className="mt-10 space-y-5 text-[14px] text-aeth-silver/75">
            {["Share your interest — no commitment, no payment.", "A designer reaches out to talk it through.", "We keep you updated as each itinerary develops."].map((s, i) => (
              <li key={s} className="flex gap-4">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-aeth-gold/40 font-display text-[12px] text-aeth-gold">{i + 1}</span>
                <span className="pt-1">{s}</span>
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-md rounded-xl border border-white/10 bg-white/[0.02] p-4 text-[12px] leading-relaxed text-aeth-silver/55">
            Demo form: enquiries are not sent or stored yet. Aetherion is a concept and no journeys are currently on sale.
          </p>
        </div>

        <div className="aeth-card relative overflow-hidden p-6 sm:p-10">
          <AnimatePresence mode="wait" initial={false}>
            {state === "sent" ? (
              <motion.div
                key="sent"
                ref={statusRef}
                tabIndex={-1}
                role="status"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex min-h-[420px] flex-col items-center justify-center text-center outline-none"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full border border-aeth-teal/50 text-aeth-teal">
                  <CheckIcon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 font-display text-2xl uppercase tracking-[0.06em] text-white">Thank you, {values.name.trim().split(" ")[0]}</h3>
                <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-aeth-silver/75">
                  Your interest in {chosen?.name ?? "Aetherion"} has been noted in this demo. In the live service, a journey designer would reply to {values.email.trim()}.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setValues(empty);
                    setTouched({});
                    setErrors({});
                    setState("idle");
                  }}
                  className="aeth-btn-outline mt-8"
                >
                  Send another enquiry
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                ref={formRef}
                noValidate
                onSubmit={onSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-6 sm:grid-cols-2"
                aria-describedby={`${uid}-required`}
              >
                <p id={`${uid}-required`} className="text-[12px] text-aeth-silver/50 sm:col-span-2">
                  All fields are required unless marked optional.
                </p>
                <div className="sm:col-span-2">
                  <label htmlFor={`${uid}-name`} className="aeth-label">Full name</label>
                  <input type="text" autoComplete="name" {...field("name")} />
                  {error("name")}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor={`${uid}-email`} className="aeth-label">Email</label>
                  <input type="email" autoComplete="email" inputMode="email" {...field("email")} />
                  {error("email")}
                </div>
                <div>
                  <label htmlFor={`${uid}-partySize`} className="aeth-label">Party size</label>
                  <select {...field("partySize")}>
                    <option value="">Select</option>
                    {["1", "2", "3", "4", "5", "6"].map((p) => (
                      <option key={p} value={p}>
                        {p} {p === "1" ? "traveller" : "travellers"}
                      </option>
                    ))}
                  </select>
                  {error("partySize")}
                </div>
                <div>
                  <label htmlFor={`${uid}-destination`} className="aeth-label">Destination of interest</label>
                  <select {...field("destination")}>
                    <option value="">Select</option>
                    {destinations.map((d) => (
                      <option key={d.slug} value={d.slug}>
                        {d.name} ({d.status})
                      </option>
                    ))}
                    <option value="undecided">Not sure yet</option>
                  </select>
                  {error("destination")}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor={`${uid}-message`} className="aeth-label">
                    Message <span className="normal-case tracking-normal text-aeth-silver/45">(optional)</span>
                  </label>
                  <textarea rows={4} {...field("message")} placeholder="Anything we should know — an occasion, a question, a dream." />
                  {error("message")}
                </div>

                {state === "failed" && (
                  <div ref={statusRef} tabIndex={-1} role="alert" className="rounded-xl border border-[#f2a7a0]/40 bg-[#f2a7a0]/[0.06] p-4 text-[13px] text-[#f6c3bd] outline-none sm:col-span-2">
                    Something went wrong sending your enquiry. Please try again in a moment.
                  </div>
                )}

                <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <button type="submit" disabled={state === "sending"} className="aeth-btn-gold h-12 px-8 text-xs disabled:cursor-wait disabled:opacity-70">
                    {state === "sending" ? "Sending…" : "Send enquiry"}
                  </button>
                  <p className="text-[12px] text-aeth-silver/45">We&apos;ll only use your details to reply.</p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
