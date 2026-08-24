"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion, useResizeVersion, useScrollFrame } from "@/lib/motion";

/*
 * THE LIFT: when a sheet has been read and the next one has taken the board,
 * the finished sheet is taken off. Crossing the departure line plays a
 * composed exit (fade, upward drift, bottom-up erase — the arrival wipe run
 * in reverse), timed in CSS so it reads at any scroll speed. Scrolling back
 * up across the return line files the sheet back onto the board with the
 * same motion reversed. The two lines are offset (hysteresis) so the state
 * never chatters at the boundary. Styles live on `.lifted` in globals.css.
 *
 * Positions come from the offset chain, not bounding rects: the lift's own
 * translate must never move the thresholds it is measured against.
 */

const DOWN = 0.32; // lift when the sheet's bottom rises past this vh line
const UP = 0.44; // file it back when the bottom drops below this one

type Sheet = { el: HTMLElement; bottom: number };

function docTop(el: HTMLElement): number {
  let y = 0;
  for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) {
    y += n.offsetTop;
  }
  return y;
}

export default function Recede() {
  const sheetsRef = useRef<Sheet[]>([]);
  const version = useResizeVersion();

  useEffect(() => {
    sheetsRef.current = prefersReducedMotion()
      ? []
      : Array.from(
          document.querySelectorAll<HTMLElement>("section[data-fig]")
        ).map((el) => ({ el, bottom: docTop(el) + el.offsetHeight }));
  }, [version]);

  useScrollFrame(({ y, vh }) => {
    for (const s of sheetsRef.current) {
      const b = s.bottom - y; // layout position in the viewport
      const lifted = s.el.classList.contains("lifted");
      if (!lifted && b < vh * DOWN) s.el.classList.add("lifted");
      else if (lifted && b > vh * UP) s.el.classList.remove("lifted");
    }
  });

  return null;
}
