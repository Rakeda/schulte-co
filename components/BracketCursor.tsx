"use client";

import { useEffect, useRef } from "react";
import styles from "./BracketCursor.module.css";

/**
 * One vermilion corner-bracket primitive, three triggers:
 * - fine pointers: brackets glide between hovered [data-snap] targets
 * - keyboard: :focus-visible elements get the same brackets (the default
 *   ring is suppressed when JS is present)
 * - touch: a ~240ms bracket stamp confirms every press
 */
export default function BracketCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const snap = ref.current;
    if (!snap) return;

    const place = (t: Element, instant: boolean) => {
      const r = t.getBoundingClientRect();
      if (instant) snap.style.transition = "none";
      snap.style.left = `${r.left}px`;
      snap.style.top = `${r.top}px`;
      snap.style.width = `${r.width}px`;
      snap.style.height = `${r.height}px`;
      if (instant) {
        void snap.offsetWidth;
        snap.style.transition = "";
      }
      snap.classList.add(styles.on);
    };
    const hide = () => snap.classList.remove(styles.on);

    const fine = window.matchMedia("(pointer: fine)").matches;
    const cleanups: Array<() => void> = [];

    if (fine) {
      const over = (e: MouseEvent) => {
        const t = (e.target as Element | null)?.closest?.("[data-snap]");
        if (!t) return;
        place(t, !snap.classList.contains(styles.on));
      };
      const out = (e: MouseEvent) => {
        const t = (e.target as Element | null)?.closest?.("[data-snap]");
        if (t) hide();
      };
      document.addEventListener("mouseover", over);
      document.addEventListener("mouseout", out);
      window.addEventListener("scroll", hide, { passive: true });
      cleanups.push(() => {
        document.removeEventListener("mouseover", over);
        document.removeEventListener("mouseout", out);
        window.removeEventListener("scroll", hide);
      });
    } else {
      // the bracket stamp: contact feedback in the field edition
      let t0: ReturnType<typeof setTimeout>;
      const onTouch = (e: TouchEvent) => {
        const t = (e.target as Element | null)?.closest?.(
          "a, button, [data-snap]"
        );
        if (!t) return;
        clearTimeout(t0);
        place(t, true);
        t0 = setTimeout(hide, 240);
      };
      document.addEventListener("touchstart", onTouch, { passive: true });
      cleanups.push(() => {
        clearTimeout(t0);
        document.removeEventListener("touchstart", onTouch);
      });
    }

    // keyboard focus holds the same instrument
    const onFocusIn = (e: FocusEvent) => {
      const t = e.target as Element | null;
      if (!t || !(t instanceof HTMLElement)) return;
      if (!t.matches(":focus-visible")) return;
      place(t, true);
    };
    const onFocusOut = () => hide();
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    cleanups.push(() => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    });

    return () => cleanups.forEach((fn) => fn());
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
