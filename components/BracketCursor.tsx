"use client";

import { useEffect, useRef } from "react";
import styles from "./BracketCursor.module.css";

/**
 * The crosshair's bracket snap: whenever the pointer enters anything marked
 * [data-snap], four vermilion corners frame the target. Event-delegated so
 * dynamically added targets (Baseline ticks) work too. Fine pointers only.
 */
export default function BracketCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const snap = ref.current;
    if (!snap) return;

    const over = (e: MouseEvent) => {
      const t = (e.target as Element | null)?.closest?.("[data-snap]");
      if (!t) return;
      const r = t.getBoundingClientRect();
      // glide between targets while visible; place instantly on fresh appearance
      const wasOn = snap.classList.contains(styles.on);
      if (!wasOn) snap.style.transition = "none";
      snap.style.left = `${r.left}px`;
      snap.style.top = `${r.top}px`;
      snap.style.width = `${r.width}px`;
      snap.style.height = `${r.height}px`;
      if (!wasOn) {
        void snap.offsetWidth;
        snap.style.transition = "";
      }
      snap.classList.add(styles.on);
    };
    const out = (e: MouseEvent) => {
      const t = (e.target as Element | null)?.closest?.("[data-snap]");
      if (t) snap.classList.remove(styles.on);
    };
    const hide = () => snap.classList.remove(styles.on);

    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    window.addEventListener("scroll", hide, { passive: true });
    return () => {
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      window.removeEventListener("scroll", hide);
    };
  }, []);

  return (
    <div ref={ref} className={styles.snap} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </div>
  );
}
