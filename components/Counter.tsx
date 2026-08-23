"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion, useScrollFrame } from "@/lib/motion";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
};

/**
 * A measured value that counts up (ease-out cubic) the first time it enters
 * the viewport. Server-renders the final figure, so no-JS and reduced-motion
 * readers always see the true number.
 */
export default function Counter({
  value,
  prefix = "",
  suffix = "",
  duration = 900,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const st = useRef({ started: false, raf: 0 });

  useScrollFrame(({ vh, gp }) => {
    const el = ref.current;
    if (!el || st.current.started) return;
    const r = el.getBoundingClientRect();
    const atEnd = gp > 0.985;
    if (!atEnd && (r.top >= vh * 1.25 || r.bottom <= 0)) return;
    st.current.started = true;
    if (prefersReducedMotion()) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - t0) / duration, 1);
      const e = 1 - Math.pow(1 - t, 3);
      el.textContent =
        prefix + Math.round(value * e).toLocaleString("en-US") + suffix;
      if (t < 1) st.current.raf = requestAnimationFrame(tick);
    };
    st.current.raf = requestAnimationFrame(tick);
  });

  useEffect(() => {
    const s = st.current;
    return () => cancelAnimationFrame(s.raf);
  }, []);

  return (
    <span ref={ref} className="counter">
      {prefix + value.toLocaleString("en-US") + suffix}
    </span>
  );
}
