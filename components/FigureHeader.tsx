"use client";

import { useContext, useEffect, useRef } from "react";
import {
  announceTarget,
  consumeTarget,
  peekTarget,
  prefersReducedMotion,
  useScrollFrame,
} from "@/lib/motion";
import { SectionIdContext } from "@/components/SurveySection";
import styles from "./FigureHeader.module.css";

type Props = {
  no: string;
  title: string;
  refText: string;
  night?: boolean;
};

/**
 * The ruled figure header every section opens with: FIG. № · title ·
 * cross-reference. Carries the arrival mark (the checker's ellipse): when
 * commanded travel lands here, a hand-drawn double-stroke vermilion loop
 * circles the figure number, holds a beat, and fades. Ambient scrolling
 * never triggers it; scrolling during the hold dismisses it immediately.
 */
export default function FigureHeader({ no, title, refText, night }: Props) {
  const sid = useContext(SectionIdContext);
  const svgRef = useRef<SVGSVGElement>(null);
  const st = useRef({
    armed: false,
    holding: false,
    lastY: -1,
    settle: 0 as ReturnType<typeof setTimeout> | 0,
    hold: 0 as ReturnType<typeof setTimeout> | 0,
    clear: 0 as ReturnType<typeof setTimeout> | 0,
  });

  useEffect(() => {
    if (!sid) return;
    const s = st.current;

    const dismiss = () => {
      const svg = svgRef.current;
      s.holding = false;
      if (s.hold) clearTimeout(s.hold);
      if (svg) {
        svg.classList.add(styles.arrFade);
        s.clear = setTimeout(() => {
          svg.classList.remove(styles.arrOn, styles.arrFade, styles.arrInstant);
        }, 300);
      }
    };

    const play = () => {
      const svg = svgRef.current;
      if (!svg) return;
      if (s.clear) clearTimeout(s.clear);
      svg.classList.remove(styles.arrFade);
      if (prefersReducedMotion()) svg.classList.add(styles.arrInstant);
      svg.classList.add(styles.arrOn);
      s.holding = true;
      s.hold = setTimeout(dismiss, 1350);
    };

    const settle = () => {
      if (s.settle) clearTimeout(s.settle);
      s.settle = setTimeout(() => {
        s.armed = false;
        if (consumeTarget(sid)) play();
      }, 180);
    };

    const onAnnounce = () => {
      if (peekTarget() === sid) {
        s.armed = true;
        settle();
      } else {
        s.armed = false;
      }
    };

    window.addEventListener("sc-announce", onAnnounce);

    /* cross-page arrival: a reference on another sheet set the flag.
       Announce through the ordinary settle path so the mark waits out the
       browser's own smooth glide to the hash instead of racing it. */
    if (window.location.hash === `#${sid}`) {
      let flagged = false;
      try {
        flagged = sessionStorage.getItem("sc-ref") === "1";
        if (flagged) sessionStorage.removeItem("sc-ref");
      } catch {}
      if (flagged) announceTarget(sid);
    }

    return () => {
      window.removeEventListener("sc-announce", onAnnounce);
      if (s.settle) clearTimeout(s.settle);
      if (s.hold) clearTimeout(s.hold);
      if (s.clear) clearTimeout(s.clear);
    };
  }, [sid]);

  useScrollFrame(({ y }) => {
    const s = st.current;
    if (s.armed) {
      /* still gliding: push the settle window out */
      if (s.settle) clearTimeout(s.settle);
      s.settle = setTimeout(() => {
        s.armed = false;
        if (sid && consumeTarget(sid)) {
          const svg = svgRef.current;
          if (svg) {
            if (prefersReducedMotion()) svg.classList.add(styles.arrInstant);
            svg.classList.add(styles.arrOn);
            s.holding = true;
            s.hold = setTimeout(() => {
              svg.classList.add(styles.arrFade);
              s.holding = false;
              s.clear = setTimeout(() => {
                svg.classList.remove(styles.arrOn, styles.arrFade, styles.arrInstant);
              }, 300);
            }, 1350);
          }
        }
      }, 180);
    }
    if (s.holding && s.lastY >= 0 && Math.abs(y - s.lastY) > 2) {
      /* the reader moved on; acknowledgment yields immediately */
      const svg = svgRef.current;
      s.holding = false;
      if (s.hold) clearTimeout(s.hold);
      if (svg) {
        svg.classList.add(styles.arrFade);
        s.clear = setTimeout(() => {
          svg.classList.remove(styles.arrOn, styles.arrFade, styles.arrInstant);
        }, 300);
      }
    }
    s.lastY = y;
  });

  return (
    <header className={`${styles.figH} ${night ? styles.night : ""}`.trim()}>
      <span className={styles.noWrap}>
        <svg
          ref={svgRef}
          className={styles.arr}
          viewBox="0 0 120 44"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <ellipse className={styles.e1} cx="60" cy="22" rx="55" ry="16" transform="rotate(-3 60 22)" />
          <ellipse className={styles.e2} cx="61" cy="23.5" rx="51" ry="13.5" transform="rotate(2 61 23.5)" />
        </svg>
        <span className={styles.no}>{no}</span>
      </span>
      <h2 className={`${styles.title} wipe`}>{title}</h2>
      <span className={styles.ref}>{refText}</span>
    </header>
  );
}
