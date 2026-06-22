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
import { Button } from "@/components/ui/button";
import { CONTACT_INFO } from "@/lib/constants";

// Studio OS endpoint. Override at build time with NEXT_PUBLIC_STUDIO_OS_URL.
const STUDIO_OS_URL =
  process.env.NEXT_PUBLIC_STUDIO_OS_URL || "https://studio.cutecompanyphotography.com";

export function BookingForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
        body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.trim(), detail: detail.trim() }),
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

  const field =
    "w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-[#ededed] placeholder-white/30 transition-colors focus:border-white/40 focus:outline-none";

  if (status === "sent") {
    return (
      <div className="p-8 border border-white/10 rounded-lg bg-white/5 w-full text-center">
        <h2 className="font-serif text-3xl mb-4">Thank you!</h2>
        <p className="text-white/60 mb-6 font-light">
          Your inquiry is in — check your inbox for a note from us. Every session is tailored to you,
          so we&rsquo;ll follow up by call or email with pricing built around what you have in mind.
        </p>
        <Link
          href={CONTACT_INFO.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-md bg-white px-6 py-3 text-black transition-colors hover:bg-white/90"
        >
          Check availability now
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="p-8 border border-white/10 rounded-lg bg-white/5 w-full">
      <h2 className="font-serif text-3xl mb-2 text-center">Ready to Book?</h2>
      <p className="text-white/60 mb-6 font-light text-center">
        Send a quick note and we&rsquo;ll get right back to you.
      </p>
      <div className="space-y-3">
        <input
          className={field} value={name} onChange={(e) => setName(e.target.value)}
          placeholder="Your name" aria-label="Your name" required
        />
        <input
          className={field} type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="Email" aria-label="Email" required
        />
        <input
          className={field} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone (optional)" aria-label="Phone"
        />
        <textarea
          className={field} value={detail} onChange={(e) => setDetail(e.target.value)}
          placeholder="Date, venue, or what you have in mind (optional)" aria-label="Details" rows={3}
        />
      </div>
      {status === "error" && <p className="mt-3 text-sm text-red-400">{errorMsg}</p>}
      <Button
        type="submit"
        size="lg"
        disabled={!ready || status === "sending"}
        className="mt-5 w-full bg-white text-black hover:bg-white/90 disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Request A Booking"}
      </Button>
    </form>
  );
}
