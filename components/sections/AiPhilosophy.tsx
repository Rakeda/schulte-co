"use client";

import { useRef } from "react";
import { prefersReducedMotion, useReveal, useScrollFrame, useScrub } from "@/lib/motion";
import { AI_QUESTIONS_LIST, CONTACT } from "@/lib/data";
import FigureHeader from "@/components/FigureHeader";
import styles from "./AiPhilosophy.module.css";

/**
 * FIG. 06 — AI PHILOSOPHY. The night plate. Two roads drawn under scroll:
 * the wrong one skips straight to "buy AI" and ends in a knot; the right
 * one passes through understanding, simplification, and the human/automated/AI
 * decision before it ships. The dashed frontier reveals beneath.
 */
export default function AiPhilosophy() {
  const ref = useRef<HTMLElement>(null);
  const rectRef = useRef<SVGRectElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  useScrub(ref);
  useReveal(ref);

  useScrollFrame(({ vh, gp }) => {
    const rect = rectRef.current;
    const svg = svgRef.current;
    if (!rect || !svg) return;
    const r = svg.getBoundingClientRect();
    let p = (vh * 1.28 - r.top) / (vh * 0.55);
    p = Math.min(Math.max(p, 0), 1);
    if (prefersReducedMotion() || gp > 0.985) p = 1;
    rect.setAttribute("width", (p * 900).toFixed(1));
  });

  return (
    <section ref={ref} id="f6" data-fig className={`fig ${styles.f8}`}>
      <div className="inwrap">
        <FigureHeader
          no="FIG. 06"
          title="AI Philosophy"
          refText="THE FRONTIER, APPROACHED DELIBERATELY"
          night
        />
        <p className={`${styles.kn} wipe`}>Do not automate a bad process.</p>
        <p className={`${styles.sub} wipe`} style={{ "--d": ".15s" } as React.CSSProperties}>
          We start with the business, not the technology. Technology should
          support the business, not complicate it. AI is added last, and
          only where it creates value.
        </p>

        <svg
          className={styles.roads}
          viewBox="0 0 900 210"
          aria-label="Two roads: the wrong way jumps to buying AI and ends in a knot; the right way passes through understanding and simplification before implementation"
        >
          {/* WRONG WAY */}
          <text x="0" y="34" fontSize="9" fill="var(--nverm)" letterSpacing="1.2" fontWeight="600">WRONG WAY</text>
          <circle className="scrub" cx="110" cy="56" r="7" fill="none" stroke="var(--nink)" strokeWidth="1.1" />
          <text x="86" y="80" fontSize="8.5" fill="var(--nink)">PROBLEM</text>
          <line className="scrub" data-delay=".08" x1="118" y1="56" x2="282" y2="56" stroke="var(--nink)" strokeWidth="1.2" />
          <circle className="scrub" data-delay=".16" cx="290" cy="56" r="7" fill="none" stroke="var(--nink)" strokeWidth="1.1" />
          <text x="272" y="80" fontSize="8.5" fill="var(--nink)">BUY AI</text>
          <line className="scrub" data-delay=".22" x1="298" y1="56" x2="420" y2="56" stroke="var(--nink)" strokeWidth="1.2" />
          <path
            className="scrub"
            data-delay=".3"
            data-flash="knotX"
            d="M420,56 C460,26 500,86 470,66 C440,46 520,36 500,66 C486,88 540,40 530,60 C524,72 556,52 566,58"
            fill="none"
            stroke="var(--nink)"
            strokeWidth="1.2"
          />
          <g id="knotX" className="hatchin">
            <path d="M586,44 L610,68 M610,44 L586,68" stroke="var(--nverm)" strokeWidth="2" fill="none" />
            <text x="628" y="60" fontSize="8.5" fill="var(--nverm)">THE MESS, AUTOMATED FASTER</text>
          </g>

          {/* RIGHT WAY */}
          <text x="0" y="128" fontSize="9" fill="var(--noxide)" letterSpacing="1.2" fontWeight="600">RIGHT WAY</text>
          {[
            [110, "PROBLEM"],
            [330, "UNDERSTAND & SIMPLIFY"],
            [570, "HUMAN · AUTOMATED · AI"],
            [800, "IMPLEMENT"],
          ].map(([x, label], i) => (
            <g key={label}>
              <circle className="scrub" data-delay={0.4 + i * 0.12} cx={x} cy="150" r="7" fill="none" stroke="var(--noxide)" strokeWidth="1.1" />
              <text x={Number(x) - String(label).length * 2.4} y="176" fontSize="8.5" fill="var(--nink)">{label}</text>
            </g>
          ))}
          {[
            [118, 322],
            [338, 562],
            [578, 792],
          ].map(([a, b], i) => (
            <line key={a} className="scrub" data-delay={0.46 + i * 0.12} x1={a} y1="150" x2={b} y2="150" stroke="var(--noxide)" strokeWidth="1.2" />
          ))}
          <path className="scrub" data-delay=".84" data-flash="valueFlag" d="M807,150 h50" stroke="var(--noxide)" strokeWidth="1.2" fill="none" />
          <g id="valueFlag" className="hatchin">
            <path d="M857,150 l14,-5 v10 Z" fill="var(--noxide)" />
            <text x="828" y="136" fontSize="8.5" fill="var(--noxide)">VALUE</text>
          </g>
        </svg>

        <div className={styles.qgrid}>
          {AI_QUESTIONS_LIST.map((q, i) => (
            <div
              key={q}
              className={`${styles.q} rowin`}
              style={{ "--d": `${i * 0.06}s` } as React.CSSProperties}
            >
              <span className={`${styles.qc} mono`}>
                Q-{String(i + 1).padStart(2, "0")}
              </span>
              <span className={styles.qt}>{q}</span>
            </div>
          ))}
        </div>
        <p className={`${styles.qcap} mono`}>
          THE TECHNOLOGY-STRATEGY AUDIT · ASKED BEFORE ANY TOOL IS BOUGHT.
          BETTER TECHNOLOGY DECISIONS COME FROM BETTER BUSINESS ARCHITECTURE.
        </p>

        <a className={`bkt ${styles.nbkt}`} data-snap href={CONTACT.aiHref}>
          [ ASK ABOUT AI, PROPERLY ]
        </a>

        <div className={styles.frontier}>
          <svg
            ref={svgRef}
            viewBox="0 0 900 90"
            aria-label="Dashed frontier line on the night plate"
          >
            <defs>
              <clipPath id="frontClip">
                <rect ref={rectRef} x="0" y="0" width="0" height="90" />
              </clipPath>
            </defs>
            <g clipPath="url(#frontClip)">
              <path
                d="M0,58 C140,44 260,70 400,52 C540,34 660,66 900,38"
                fill="none"
                stroke="var(--noxide)"
                strokeWidth="1.4"
                strokeDasharray="7 6"
              />
              <circle cx="400" cy="52" r="4" fill="none" stroke="var(--noxide)" strokeWidth="1" />
              <circle cx="820" cy="44" r="4" fill="none" stroke="var(--nverm)" strokeWidth="1.2" />
            </g>
            <text x="640" y="80" fontSize="9" fill="var(--noxide)">
              UNFIXED GROUND · SURVEYED BEFORE SETTLED
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
