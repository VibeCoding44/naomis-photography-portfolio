"use client";

/**
 * Contact / booking intake form for the public photography site.
 *
 * This site is a static export (no server, no secrets), so the form POSTs to the
 * Studio OS API (server-rendered, holds the Supabase + Resend secrets):
 *   POST {STUDIO_OS_API}/api/inquiry  { name, email, phone, detail }
 * which records the inquiry and sends the instant auto-reply with the booking
 * link. On success we also surface the direct Unscripted link so the couple can
 * book right away.
 */

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";

// Studio OS endpoint. Override at build time with NEXT_PUBLIC_STUDIO_OS_URL.
const STUDIO_OS_URL =
  process.env.NEXT_PUBLIC_STUDIO_OS_URL || "https://studio.cutecompanyphotography.com";

// "How did you hear about us?" — stored as inquiries.source in Studio OS.
const HEARD_OPTIONS = [
  "Google search",
  "Instagram",
  "Facebook",
  "Pinterest",
  "Referral from a friend",
  "Past client",
  "Venue or vendor",
  "The Knot / WeddingWire",
  "Other",
];

// "What service are you looking for?" — stored as inquiries.session_type.
const SERVICE_OPTIONS = [
  "Wedding",
  "Engagement",
  "Elopement",
  "Family",
  "Maternity / Newborn",
  "Portrait",
  "Senior",
  "Commercial / Branding",
  "Other",
];

export function BookingForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [source, setSource] = useState("");
  const [detail, setDetail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const ready = name.trim() && email.includes("@");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!ready || status === "sending") return;
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch(`${STUDIO_OS_URL}/api/inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.trim(), sessionType: service.trim(), source: source.trim(), detail: detail.trim() }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }
      setStatus("sent");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  // Shared control styling — inputs, selects, and textarea all share this so the
  // form reads as one cohesive, polished set of fields.
  const ctrl =
    "w-full rounded-lg border border-[#2a2a2a] bg-[#0d0d0d] px-4 py-3 text-[0.95rem] text-[#ededed] placeholder-[#6f6862] transition-colors duration-200 focus:border-[#b07a52] focus:outline-none focus:ring-1 focus:ring-[#b07a52]/40";
  const lbl = "mb-1.5 block text-[0.7rem] uppercase tracking-[0.14em] text-[#9a9189]";

  if (status === "sent") {
    return (
      <div className="w-full rounded-2xl border border-[#262626] bg-[#111111] p-9 text-center">
        <div className="mx-auto mb-4 grid size-12 place-items-center rounded-full border border-[#b07a52]/40 text-[#b07a52]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </div>
        <h2 className="font-serif text-3xl mb-3">Thank you!</h2>
        <p className="text-[#9a9189] mb-7 font-light leading-relaxed">
          Your inquiry is in. Check your inbox for a note from us. Every session is tailored to you,
          so we&rsquo;ll follow up by call or email with pricing built around what you have in mind.
        </p>
        <Link
          href={CONTACT_INFO.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-[#ededed] px-7 py-3 text-sm font-medium uppercase tracking-[0.1em] text-[#0a0a0a] transition-colors hover:bg-[#b07a52] hover:text-[#0a0a0a]"
        >
          Check availability now
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="w-full rounded-2xl border border-[#262626] bg-[#111111] p-8 sm:p-9">
      <h2 className="font-serif text-3xl text-center">Ready to Book?</h2>
      <p className="mt-2 mb-7 text-center font-light text-[#9a9189]">
        Tell us a little about your day and we&rsquo;ll be in touch.
      </p>

      <div className="space-y-5">
        <div>
          <label htmlFor="bf-name" className={lbl}>Name</label>
          <input
            id="bf-name" className={ctrl} value={name} onChange={(e) => setName(e.target.value)}
            placeholder="Your name" required
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="bf-email" className={lbl}>Email</label>
            <input
              id="bf-email" type="email" className={ctrl} value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com" required
            />
          </div>
          <div>
            <label htmlFor="bf-phone" className={lbl}>Phone <span className="text-[#6f6862] normal-case tracking-normal">(optional)</span></label>
            <input
              id="bf-phone" type="tel" className={ctrl} value={phone} onChange={(e) => setPhone(e.target.value)}
              placeholder="(813) 000-0000"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="bf-service" className={lbl}>Service</label>
            <div className="relative">
              <select
                id="bf-service"
                className={`${ctrl} appearance-none pr-10 ${service ? "text-[#ededed]" : "text-[#6f6862]"}`}
                value={service} onChange={(e) => setService(e.target.value)}
              >
                <option value="" disabled className="text-[#6f6862]">Select…</option>
                {SERVICE_OPTIONS.map((o) => (
                  <option key={o} value={o} className="bg-[#0d0d0d] text-[#ededed]">{o}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-[#9a9189]" strokeWidth={1.8} />
            </div>
          </div>
          <div>
            <label htmlFor="bf-source" className={lbl}>How did you hear about us?</label>
            <div className="relative">
              <select
                id="bf-source"
                className={`${ctrl} appearance-none pr-10 ${source ? "text-[#ededed]" : "text-[#6f6862]"}`}
                value={source} onChange={(e) => setSource(e.target.value)}
              >
                <option value="" disabled className="text-[#6f6862]">Select…</option>
                {HEARD_OPTIONS.map((o) => (
                  <option key={o} value={o} className="bg-[#0d0d0d] text-[#ededed]">{o}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-[#9a9189]" strokeWidth={1.8} />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="bf-detail" className={lbl}>Your day <span className="text-[#6f6862] normal-case tracking-normal">(optional)</span></label>
          <textarea
            id="bf-detail" className={ctrl} value={detail} onChange={(e) => setDetail(e.target.value)}
            placeholder="Date, venue, or what you have in mind…" rows={3}
          />
        </div>
      </div>

      {status === "error" && <p className="mt-4 text-sm text-red-400">{errorMsg}</p>}

      <button
        type="submit"
        disabled={!ready || status === "sending"}
        className="mt-7 w-full rounded-full bg-[#ededed] px-6 py-3.5 text-sm font-medium uppercase tracking-[0.12em] text-[#0a0a0a] transition-colors duration-200 hover:bg-[#b07a52] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {status === "sending" ? "Sending…" : "Request a booking"}
      </button>
      <p className="mt-3 text-center text-[0.72rem] text-[#6f6862]">
        We reply to every inquiry personally, usually within a day.
      </p>
    </form>
  );
}
