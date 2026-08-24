"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * The instrument rail: keyboard travel between figure datums.
 * J/K step, 1–7 jump, Home/End reach the sheet's edges. The Baseline nib
 * and the navigator underline respond through the ordinary scroll bus, and
 * any wheel input interrupts the glide (native smooth scrolling yields).
 */
export default function InstrumentRail() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.tagName === "SELECT" ||
          t.isContentEditable)
      ) {
        return;
      }
      const secs = Array.from(
        document.querySelectorAll<HTMLElement>("section[data-fig]")
      );
      if (!secs.length) return;
      const behavior: ScrollBehavior = prefersReducedMotion()
        ? "auto"
        : "smooth";
      const y = window.scrollY;
      const cur = secs.reduce(
        (acc, s, i) => (s.offsetTop - window.innerHeight * 0.45 <= y ? i : acc),
        0
      );
      const go = (i: number) => {
        secs[Math.max(0, Math.min(secs.length - 1, i))].scrollIntoView({
          behavior,
        });
      };
      if (e.key === "j" || e.key === "J") {
        go(cur + 1);
        e.preventDefault();
      } else if (e.key === "k" || e.key === "K") {
        go(cur - 1);
        e.preventDefault();
      } else if (/^[1-9]$/.test(e.key)) {
        go(parseInt(e.key, 10) - 1);
        e.preventDefault();
      } else if (e.key === "Home") {
        window.scrollTo({ top: 0, behavior });
        e.preventDefault();
      } else if (e.key === "End") {
        window.scrollTo({ top: document.body.scrollHeight, behavior });
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return null;
}
