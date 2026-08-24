"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion, useResizeVersion, useScrollFrame } from "@/lib/motion";

/*
 * THE LIFT: when a sheet has been read and the next one has taken the board,
 * the finished sheet is lifted off. Departure is scrubbed 1:1 with scroll,
 * exactly like every other instrument on the page: as a section's bottom
 * edge rises through the band between 38% and 8% of the viewport it drifts
 * up and fades out; scrolling back down through the same band replays the
 * motion in reverse and files the sheet back onto the board. No direction
 * flags, no timers — position is the whole state.
 */

const BAND_START = 0.38; // departure begins when the bottom crosses this vh line
const BAND_END = 0.08; // fully lifted here

export default function Recede() {
  const secsRef = useRef<HTMLElement[]>([]);
  const lastRef = useRef<number[]>([]);
  const version = useResizeVersion();

  useEffect(() => {
    if (prefersReducedMotion()) {
      secsRef.current = [];
      return;
    }
    secsRef.current = Array.from(
      document.querySelectorAll<HTMLElement>("section[data-fig]")
    );
    lastRef.current = secsRef.current.map(() => -1);
  }, [version]);

  useScrollFrame(({ vh }) => {
    const secs = secsRef.current;
    const last = lastRef.current;
    for (let i = 0; i < secs.length; i++) {
      const r = secs[i].getBoundingClientRect();
      let p = (vh * BAND_START - r.bottom) / (vh * (BAND_START - BAND_END));
      p = Math.min(Math.max(p, 0), 1);
      if (p === last[i]) continue;
      last[i] = p;
      const st = secs[i].style;
      if (p === 0) {
        st.opacity = "";
        st.transform = "";
      } else {
        st.opacity = (1 - p).toFixed(3);
        st.transform = `translateY(${(-30 * p).toFixed(1)}px)`;
      }
    }
  });

  return null;
}
