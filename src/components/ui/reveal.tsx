"use client";

import { useEffect } from "react";

/**
 * Scroll-reveal wiring. Renders nothing. Adds `js-reveal` to <html>, then fades
 * in any `.reveal` element as it enters the viewport via IntersectionObserver.
 * Respects prefers-reduced-motion and has a safety-net timeout so content can
 * never get stuck hidden.
 */
export function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js-reveal");

    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!els.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );
    els.forEach((el) => io.observe(el));

    // Safety net: never leave content hidden.
    const t = window.setTimeout(() => els.forEach((el) => el.classList.add("is-in")), 2600);

    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return null;
}
