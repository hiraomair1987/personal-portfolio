"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

const topics = ["General enquiry", "Press", "Collaboration", "Servicing question"];

export default function ContactForm() {
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const topic = String(data.get("topic") ?? "");
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) return setError("Please fill in your name, email and message.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("That email address doesn't look right.");
    if (!site.contactEmail) return setError("The contact address hasn't been set up yet. Please try again later.");

    setError(null);
    const body = `${message}\n\n— ${name} (${email})`;
    window.location.href = `mailto:${site.contactEmail}?subject=${encodeURIComponent(`${topic} — ${name}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const field =
    "mt-2 w-full rounded-sm border border-white/10 bg-white/[0.03] px-4 py-3.5 text-[15px] text-white/90 placeholder:text-white/30 transition-colors focus:border-white/40 focus:outline-none";

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
      <label className="block text-xs uppercase tracking-[0.2em] text-white/50">
        Name
        <input name="name" autoComplete="name" required className={field} placeholder="Your name" />
      </label>
      <label className="block text-xs uppercase tracking-[0.2em] text-white/50">
        Email
        <input name="email" type="email" autoComplete="email" required className={field} placeholder="you@example.com" />
      </label>
      <label className="block text-xs uppercase tracking-[0.2em] text-white/50 sm:col-span-2">
        Topic
        <select name="topic" className={`${field} appearance-none`} defaultValue={topics[0]}>
          {topics.map((t) => (
            <option key={t} className="bg-ink">
              {t}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-xs uppercase tracking-[0.2em] text-white/50 sm:col-span-2">
        Message
        <textarea name="message" required rows={6} className={`${field} resize-y`} placeholder="How can we help?" />
      </label>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" className="btn-primary w-full sm:w-auto">
          Send message
        </button>
        <p className="text-sm text-white/50" role="status" aria-live="polite">
          {error ? <span className="text-red-300/90">{error}</span> : sent ? "Your mail app should open with the message ready to send." : null}
        </p>
      </div>
    </form>
  );
}
