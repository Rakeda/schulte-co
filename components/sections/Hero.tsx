"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, useReveal } from "@/lib/motion";
import { CONTACT, DATA_STRIP, ENTRY_POINTS } from "@/lib/data";
import Counter from "@/components/Counter";
import styles from "./Hero.module.css";

/**
 * FIG. 01 — GROWTH BY DESIGN. The first viewport powers on: key map, mini
 * elevation, and compass rose draw themselves; the benchmark stamps the rose;
 * the measured values count up; and one real pain point cycles beneath the
 * CTAs — the door an engagement usually enters through.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [entry, setEntry] = useState(0);
  useReveal(ref);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const rm = prefersReducedMotion();
    const els = root.querySelectorAll<SVGGeometryElement>(".autodraw");
    els.forEach((el, i) => {
      let len: number;
      try {
        len = el.getTotalLength();
      } catch {
        return;
      }
      el.style.strokeDasharray = `${len} ${len}`;
      if (rm) {
        el.style.strokeDashoffset = "0";
        return;
      }
      el.style.strokeDashoffset = String(len);
      el.style.transition = `stroke-dashoffset 1.2s linear ${0.15 + i * 0.09}s`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.strokeDashoffset = "0";
        });
      });
    });
    const bench = root.querySelector("#benchStamp");
    if (bench) {
      if (rm) bench.classList.add("flashed");
      else setTimeout(() => bench.classList.add("flashed"), 2100);
    }
    if (!rm) {
      const t = setInterval(
        () => setEntry((e) => (e + 1) % ENTRY_POINTS.length),
        3400
      );
      return () => clearInterval(t);
    }
  }, []);

  return (
    <section ref={ref} id="f1" data-fig className={`fig ${styles.f1}`}>
      <div className="inwrap">
        <p className={`${styles.kick} wipe`} style={{ "--d": ".05s" } as React.CSSProperties}>
          SCHULTE &amp; CO. · STRUCTURAL SURVEY OF A GROWING BUSINESS ·
          BUSINESS ARCHITECTURE &amp; TRANSFORMATION
        </p>
        <div className={styles.grid}>
          <div>
            <h1 className={`${styles.h1} wipe`} style={{ "--d": ".15s" } as React.CSSProperties}>
              Growth by design.
            </h1>
            <p className={`${styles.sub} wipe`} style={{ "--d": ".35s" } as React.CSSProperties}>
              We help companies find the operational gaps preventing growth and
              redesign how people, processes, technology, and data work together.
              Put simply: <b>we fix the gaps between the parts of the business.</b>
            </p>
            <div className={`${styles.ctas} wipe`} style={{ "--d": ".5s" } as React.CSSProperties}>
              <a className="bkt" data-snap href={CONTACT.gapsHref}>
                [ FIND THE GAPS ]
              </a>
              <a className="bkt" data-snap href="#f4">
                [ SEE THE METHOD ]
              </a>
            </div>
            <div className={`${styles.entry} wipe`} style={{ "--d": ".62s" } as React.CSSProperties}>
              <span className={`${styles.entrylab} mono`}>
                ENGAGEMENTS ENTER THROUGH ONE REAL PAIN POINT:
              </span>
              <span key={entry} className={`${styles.entrytext} mono`}>
                &ldquo;{ENTRY_POINTS[entry]}&rdquo;
              </span>
            </div>
            <div className={styles.rosebox}>
              <svg width="132" height="132" viewBox="0 0 150 150" aria-label="Compass rose">
                <circle className="autodraw" cx="75" cy="75" r="52" fill="none" stroke="var(--ink)" strokeWidth="1" />
                <circle className="autodraw" cx="75" cy="75" r="36" fill="none" stroke="var(--ochre)" strokeWidth="1" opacity=".55" />
                <path className="autodraw" d="M75,12 V138 M12,75 H138" stroke="var(--ink)" strokeWidth=".8" fill="none" />
                <path className="autodraw" d="M75,30 L83,75 L75,120 L67,75 Z" fill="none" stroke="var(--ink)" strokeWidth="1" />
                <circle id="benchStamp" className="flashkeep" cx="75" cy="75" r="4" />
                <text x="70" y="9" fontSize="8" fill="var(--stone)">N</text>
              </svg>
              <span className="figcap">
                TRUE NORTH:
                <br />
                THE OPERATING MODEL
              </span>
            </div>
          </div>

          <div className={`${styles.panel} wipe`} style={{ "--d": ".3s" } as React.CSSProperties}>
            <div className={styles.inset}>
              <div className={styles.ilab}>
                <span>KEY MAP · THE METHOD</span>
                <a href="#f4" data-snap>SEE FIG. 04</a>
              </div>
              <svg viewBox="0 0 300 92" aria-label="Key map: eight numbered steps with one gate between quantify and architect">
                <line className="autodraw" x1="20" y1="38" x2="138" y2="38" stroke="var(--ink)" strokeWidth="1.2" />
                <line className="autodraw" x1="158" y1="38" x2="275" y2="38" stroke="var(--ink)" strokeWidth="1.2" />
                {[
                  [20, "01"],
                  [53, "02"],
                  [86, "03"],
                  [119, "04"],
                  [176, "05"],
                  [209, "06"],
                  [242, "07"],
                  [275, "08"],
                ].map(([x, n]) => (
                  <g key={n}>
                    <circle className="autodraw" cx={x} cy="38" r="5" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.1" />
                    <text x={Number(x) - 5} y="58" fontSize="7.5" fill="var(--stone)">{n}</text>
                  </g>
                ))}
                <circle cx="20" cy="38" r="2.2" fill="var(--verm)" />
                <path className="autodraw" d="M148,29 l9,9 l-9,9 l-9,-9 Z" fill="var(--paper)" stroke="var(--cobalt)" strokeWidth="1.1" />
                <text x="138" y="16" fontSize="7.5" fill="var(--cobalt)">GATE</text>
                <text x="10" y="78" fontSize="8" fill="var(--cobalt)">YOU ARE HERE · STEP 01, UNDERSTAND</text>
                <text x="212" y="78" fontSize="8" fill="var(--stone)">08 · TRANSFER</text>
              </svg>
            </div>
            <div className={`${styles.partics} mono`}>
              <div><span>METHOD</span><b>BUILD · PROVE · TEACH · HAND BACK</b></div>
              <div><span>PRINCIPLE</span><b>GROWTH BY DESIGN, NOT BRUTE FORCE</b></div>
            </div>
          </div>
        </div>
        <div className={`${styles.datastrip} wipe`} style={{ "--d": ".6s" } as React.CSSProperties}>
          {DATA_STRIP.map((s, i) => (
            <span key={s.l}>
              <b className={styles.dsv}>
                {typeof s.v === "number" ? (
                  <Counter value={s.v} prefix={s.prefix} suffix={s.suffix} />
                ) : (
                  s.v
                )}
              </b>{" "}
              {s.l}
              {i < DATA_STRIP.length - 1 && " · "}
            </span>
          ))}
        </div>
        <div className={styles.capline}>
          <span className="figcap">
            FIG. 01 · WE CONNECT BUSINESS STRATEGY TO THE OPERATING AND
            TECHNICAL ARCHITECTURE REQUIRED TO EXECUTE IT
          </span>
          <span className="figcap">SCROLL: THE SURVEY DRAWS ITSELF ∨</span>
        </div>
      </div>
    </section>
  );
}
