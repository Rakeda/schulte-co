"use client";

import { useState } from "react";
import SurveySection from "@/components/SurveySection";
import FigureHeader from "@/components/FigureHeader";
import FooterLegend from "@/components/FooterLegend";
import { CONTACT, FLOW_CHAIN, PARTNERS, PE_LINE, WHO_WE_HELP } from "@/lib/data";
import styles from "./PartnersClose.module.css";

const FLOW_XS = [70, 240, 420, 590, 720];
/* legend cross-light: the two architecture nodes key to the partner columns */
const FLOW_KEYS = ["", "b", "t", "", ""];

/**
 * FIG. 07 — THE PARTNERS & THE CLOSE. Two architects, one translation layer:
 * each column carries its scope and its field questions, the chain from
 * business problem to ROI draws itself between them, and the survey closes
 * at the benchmark — built, proven, handed back.
 */
export default function PartnersClose() {
  const [hl, setHl] = useState<string | null>(null);
  return (
    <SurveySection id="f7">
      <div className="inwrap">
        <FigureHeader
          no="FIG. 07"
          title="The Partners"
          refText="BUSINESS ↔ TECHNOLOGY, ONE TRANSLATION LAYER"
        />
        <div className={styles.xwrap} data-active={hl ?? undefined}>
        <div className={styles.pgrid}>
          {PARTNERS.map((p, pi) => (
            <div
              key={p.name}
              className={styles.partner}
              onMouseEnter={() => setHl(pi === 0 ? "b" : "t")}
              onMouseLeave={() => setHl(null)}
            >
              <div className={`${styles.role} mono`}>{p.role}</div>
              <div className={styles.pname}>{p.name}</div>
              <p className={styles.pq}>&ldquo;{p.question}&rdquo;</p>
              <div className={`${styles.sh} mono`}>SCOPE</div>
              {p.scope.map((s, i) => (
                <div
                  key={s}
                  className={`${styles.prow} rowin`}
                  style={{ "--d": `${pi * 0.08 + i * 0.06}s` } as React.CSSProperties}
                >
                  <span className={`${styles.pcode} mono`}>
                    {pi === 0 ? "B" : "T"}-{String(i + 1).padStart(2, "0")}
                  </span>
                  {s}
                </div>
              ))}
              <div className={`${styles.sh} mono`}>FIELD QUESTIONS</div>
              {p.fieldQuestions.map((q, i) => (
                <div
                  key={q}
                  className={`${styles.qrow} rowin`}
                  style={{ "--d": `${0.2 + pi * 0.08 + i * 0.05}s` } as React.CSSProperties}
                >
                  <span className={`${styles.qmark} mono`}>?</span>
                  {q}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="desk-only">
        <svg
          className={styles.flow}
          viewBox="0 0 760 90"
          aria-label="The translation chain: business problem to business architecture to technical architecture to implementation to ROI"
        >
          {FLOW_XS.map((x, i) => (
            <g key={x} className={FLOW_KEYS[i] === "b" ? styles.nBiz : FLOW_KEYS[i] === "t" ? styles.nTech : undefined}>
              <circle className="scrub" data-delay={i * 0.1} cx={x} cy="34" r="6" fill="none" stroke="var(--cobalt)" strokeWidth="1.1" />
              <text x={x - FLOW_CHAIN[i].length * 2.5} y="60" fontSize="8.5" fill="var(--cobalt)">
                {FLOW_CHAIN[i]}
              </text>
            </g>
          ))}
          {FLOW_XS.slice(0, -1).map((x, i) => (
            <line
              key={`l-${x}`}
              className="scrub"
              data-delay={0.05 + i * 0.1}
              x1={x + 7}
              y1="34"
              x2={FLOW_XS[i + 1] - 7}
              y2="34"
              stroke="var(--cobalt)"
              strokeWidth="1"
            />
          ))}
          <text x="70" y="84" fontSize="8.5" fill="var(--stone)">
            WE TRANSLATE BETWEEN BUSINESS LEADERSHIP AND TECHNICAL TEAMS, BOTH DIRECTIONS, EVERY WEEK
          </text>
        </svg>
        </div>

        {/* field plate: the chain runs vertical, the way the method rail does */}
        <div className="mob-only">
          <svg
            className={styles.flowMob}
            viewBox="0 0 360 350"
            aria-label="The translation chain, vertical: business problem to ROI"
          >
            {FLOW_CHAIN.map((label, i) => (
              <g key={label} className={FLOW_KEYS[i] === "b" ? styles.nBiz : FLOW_KEYS[i] === "t" ? styles.nTech : undefined}>
                <circle className="scrub" data-delay={i * 0.1} cx="26" cy={30 + i * 70} r="7" fill="none" stroke="var(--cobalt)" strokeWidth="1.2" />
                <text x="46" y={35 + i * 70} fontSize="12.5" fill="var(--cobalt)">{label}</text>
              </g>
            ))}
            {FLOW_CHAIN.slice(0, -1).map((_, i) => (
              <line
                key={i}
                className="scrub"
                data-delay={0.05 + i * 0.1}
                x1="26"
                y1={38 + i * 70}
                x2="26"
                y2={92 + i * 70}
                stroke="var(--cobalt)"
                strokeWidth="1.1"
              />
            ))}
          </svg>
          <p className={`${styles.flowcapM} mono`}>
            WE TRANSLATE BETWEEN BUSINESS LEADERSHIP AND TECHNICAL TEAMS, BOTH
            DIRECTIONS, EVERY WEEK
          </p>
        </div>
        </div>

        <div className={styles.whowrap}>
          <div className={`${styles.gh} mono`}>WHO WE WORK WITH</div>
          <div className={styles.whogrid}>
            {WHO_WE_HELP.map((w, i) => (
              <div
                key={w}
                className={`${styles.wrow} rowin`}
                style={{ "--d": `${i * 0.05}s` } as React.CSSProperties}
              >
                <span className={`${styles.pcode} mono`}>
                  W-{String(i + 1).padStart(2, "0")}
                </span>
                {w}
              </div>
            ))}
          </div>
          <p className={`${styles.pe} mono`}>
            FOR INVESTORS &amp; BOARDS: &ldquo;{PE_LINE}&rdquo;
          </p>
        </div>

        <div className={styles.closegrid}>
          <svg
            width="150"
            height="210"
            viewBox="0 0 150 210"
            aria-label="Benchmark monument engraving"
          >
            <path className="scrub" d="M60,180 L66,60 L84,60 L90,180 Z" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
            <path className="scrub" data-delay="0.3" d="M66,60 L75,34 L84,60" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
            <path className="scrub" data-delay="0.5" d="M40,180 H110 M48,190 H102" stroke="var(--ink)" strokeWidth="1" fill="none" />
            <path
              className="scrub"
              data-delay="0.65"
              data-flash="flBench"
              d="M75,110 m-8,0 h16 M75,102 v16"
              stroke="var(--ink)"
              strokeWidth="1.1"
              fill="none"
            />
            <circle id="flBench" className="flashkeep" cx="75" cy="110" r="4" />
            <text x="42" y="205" fontSize="8.5" fill="var(--stone)">
              BM-01 · HANDED BACK
            </text>
          </svg>
          <div>
            <h2 className={`${styles.big} wipe`}>
              Build the system. Prove the value. Hand it back.
            </h2>
            <p className={`${styles.sub} wipe`} style={{ "--d": ".2s" } as React.CSSProperties}>
              We are not trying to become another permanent layer of complexity.
              We build a stronger operating model, implement it with your team,
              and leave the company better equipped to scale on its own.
            </p>
            <div className={styles.ctas}>
              <a className="bkt" data-snap href={CONTACT.startHref}>
                [ START WITH ONE PROBLEM ]
              </a>
              <a className="bkt" data-snap href={CONTACT.workHref}>
                [ WORK WITH US ]
              </a>
            </div>
            <p className={styles.contact}>
              CORRESPONDENCE:{" "}
              <a href={`mailto:${CONTACT.email}`}>WORK@SCHULTEAND.CO</a> ·
              LINKEDIN
            </p>
          </div>
        </div>

        <FooterLegend />
      </div>
    </SurveySection>
  );
}
