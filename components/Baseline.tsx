"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, useResizeVersion, useScrollFrame } from "@/lib/motion";
import { FIG_NAMES } from "@/lib/data";
import styles from "./Baseline.module.css";

type Tick = { id: string; left: number; index: number };

/**
 * The Baseline — the signature instrument. A fixed strip map of the whole
 * traverse: one tick per figure, a vermilion nib at scroll position 1:1.
 * The nib is the only permanently vermilion pixel on the page.
 */
export default function Baseline() {
  const [ticks, setTicks] = useState<Tick[]>([]);
  const nibRef = useRef<HTMLDivElement>(null);
  const labRef = useRef<HTMLSpanElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const version = useResizeVersion();

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[data-fig]")
    );
    sectionsRef.current = sections;
    const span = document.body.scrollHeight - window.innerHeight;
    setTicks(
      sections.map((sec, i) => ({
        id: sec.id,
        index: i,
        left: span > 0 ? Math.min((sec.offsetTop / span) * 100, 100) : 0,
      }))
    );
  }, [version]);

  useScrollFrame(({ y, vh, gp }) => {
    if (nibRef.current) nibRef.current.style.left = `${gp * 100}%`;
    const sections = sectionsRef.current;
    let cur = 0;
    for (let j = 0; j < sections.length; j++) {
      if (sections[j].offsetTop - vh * 0.45 <= y) cur = j;
    }
    if (labRef.current) {
      labRef.current.textContent = `FIG. 0${cur + 1} · ${FIG_NAMES[cur] ?? ""}`;
    }
  });

  const goTo = (index: number) => {
    sectionsRef.current[index]?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <nav className={styles.baseline} aria-label="Baseline strip map">
      <div className={styles.row}>
        <span ref={labRef} className={styles.lab}>
          FIG. 01 · {FIG_NAMES[0]}
        </span>
        <div className={styles.track}>
          <div className={styles.line} />
          {ticks.map((t) => (
            <button
              key={t.id}
              type="button"
              className={styles.tick}
              style={{ left: `${t.left}%` }}
              aria-label={`Go to FIG. 0${t.index + 1} · ${FIG_NAMES[t.index]}`}
              onClick={() => goTo(t.index)}
            >
              <span className={styles.tt}>FIG. 0{t.index + 1}</span>
            </button>
          ))}
          <div ref={nibRef} className={styles.nib} />
        </div>
        <span className={styles.end}>END OF SURVEY →</span>
      </div>
    </nav>
  );
}
