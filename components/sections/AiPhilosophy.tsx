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

        <div className="desk-only">
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
        </div>

        {/* field edition: the sheet is cut at a match line and issued as two plates */}
        <div className={`mob-only ${styles.roadsMob}`}>
          <svg viewBox="0 0 360 262" aria-label="Wrong way: problem, buy AI, automate the mess, ending in a knot">
            <text x="2" y="18" fontSize="12" fill="var(--nverm)" letterSpacing="1.4" fontWeight="600">WRONG WAY</text>
            <circle className="scrub" cx="30" cy="58" r="8" fill="none" stroke="var(--nink)" strokeWidth="1.2" />
            <text x="50" y="63" fontSize="12.5" fill="var(--nink)">PROBLEM</text>
            <line className="scrub" data-delay=".1" x1="30" y1="67" x2="30" y2="116" stroke="var(--nink)" strokeWidth="1.2" />
            <circle className="scrub" data-delay=".2" cx="30" cy="125" r="8" fill="none" stroke="var(--nink)" strokeWidth="1.2" />
            <text x="50" y="130" fontSize="12.5" fill="var(--nink)">BUY AI</text>
            <path
              className="scrub"
              data-delay=".32"
              data-flash="knotXm"
              d="M30,134 C30,160 78,168 48,186 C18,204 88,204 58,222 C36,236 84,232 96,236"
              fill="none"
              stroke="var(--nink)"
              strokeWidth="1.2"
            />
            <g id="knotXm" className="hatchin">
              <path d="M110,224 L128,244 M128,224 L110,244" stroke="var(--nverm)" strokeWidth="2.4" fill="none" />
              <text x="140" y="238" fontSize="12" fill="var(--nverm)">THE MESS,</text>
              <text x="140" y="254" fontSize="12" fill="var(--nverm)">AUTOMATED FASTER</text>
            </g>
          </svg>
          <div className={`${styles.matchline} mono`}>
            <span>MATCH LINE · CONTINUED</span>
          </div>
          <svg viewBox="0 0 360 330" aria-label="Right way: problem, understand and simplify, decide human automated or AI, implement, reaching value">
            <text x="2" y="18" fontSize="12" fill="var(--noxide)" letterSpacing="1.4" fontWeight="600">RIGHT WAY</text>
            {[
              [56, "PROBLEM"],
              [126, "UNDERSTAND & SIMPLIFY"],
              [196, "HUMAN · AUTOMATED · AI"],
              [266, "IMPLEMENT"],
            ].map(([y, label], i) => (
              <g key={label}>
                <circle className="scrub" data-delay={0.1 + i * 0.14} cx="30" cy={y} r="8" fill="none" stroke="var(--noxide)" strokeWidth="1.2" />
                <text x="50" y={Number(y) + 5} fontSize="12.5" fill="var(--nink)">{label}</text>
              </g>
            ))}
            {[
              [65, 117],
              [135, 187],
              [205, 257],
            ].map(([a, b], i) => (
              <line key={a} className="scrub" data-delay={0.16 + i * 0.14} x1="30" y1={a} x2="30" y2={b} stroke="var(--noxide)" strokeWidth="1.2" />
            ))}
            <line className="scrub" data-delay=".6" data-flash="valueFlagM" x1="30" y1="275" x2="30" y2="308" stroke="var(--noxide)" strokeWidth="1.2" />
            <g id="valueFlagM" className="hatchin">
              <path d="M30,308 l6,14 h-12 Z" fill="var(--noxide)" />
              <text x="48" y="322" fontSize="12" fill="var(--noxide)">VALUE</text>
            </g>
          </svg>
        </div>

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
