"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, useResizeVersion, useScrollFrame } from "@/lib/motion";
import { FIGURES } from "@/lib/figures";
import styles from "./Baseline.module.css";

type Tick = { id: string; left: number; index: number; figNo: string; title: string };

/* sheet metadata: the section's own data attributes win; the home manifest backs them */
function figOf(sec: HTMLElement, i: number): { figNo: string; title: string } {
  return {
    figNo: sec.dataset.figno ?? FIGURES[i]?.figNo ?? String(i + 1),
    title: sec.dataset.title ?? FIGURES[i]?.title ?? "",
  };
}

/**
 * The Baseline: the signature strip map. One tick per figure with a
 * chainage flag on hover (fine pointers), a vermilion nib at scroll
 * position 1:1, and 44px hit areas on every tick.
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
        ...figOf(sec, i),
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
      const sec = sections[cur];
      if (sec) {
        const f = figOf(sec, cur);
        labRef.current.textContent = `FIG. ${f.figNo} · ${f.title}`;
      }
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
          FIG. 01 · {FIGURES[0].title}
        </span>
        <div className={styles.track}>
          <div className={styles.line} />
          {ticks.map((t) => (
            <button
              key={t.id}
              type="button"
              className={styles.tick}
              style={{ left: `${t.left}%` }}
              aria-label={`Go to FIG. ${t.figNo} · ${t.title}`}
              onClick={() => goTo(t.index)}
            >
              <span className={styles.tt}>
                FIG {t.figNo} · {t.title}
              </span>
            </button>
          ))}
          <div ref={nibRef} className={styles.nib} />
        </div>
        <span className={styles.end}>END OF SURVEY →</span>
      </div>
    </nav>
  );
}
