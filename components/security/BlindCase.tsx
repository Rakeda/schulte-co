import SurveySection from "@/components/SurveySection";
import FigureHeader from "@/components/FigureHeader";
import {
  BLIND_CASES,
  C5_LEDE_A,
  C5_LEDE_B,
  C5_NOTE,
} from "@/lib/security-data";
import styles from "./Sec.module.css";

/**
 * FIG. C5 — THE BLIND CASE. Three sealed folders; the draw line traces
 * across them and rests. The team does not know which state it received —
 * and neither does the evidence give it away.
 */
export default function BlindCase() {
  const xs = [90, 370, 650];
  return (
    <SurveySection
      id="c5"
      figNo="C5"
      title="THE BLIND CASE"
      datum="THREE STATES · SEALED"
    >
      <div className="inwrap">
        <FigureHeader
          no="FIG. C5"
          title="The Blind Case"
          refText="ONE ENVIRONMENT · THREE STATES · SEALED UNTIL START"
        />
        <p className={`${styles.lede} wipe`}>{C5_LEDE_A}</p>
        <p className={`${styles.lede} wipe`} style={{ "--d": ".08s" } as React.CSSProperties}>
          <b>{C5_LEDE_B}</b>
        </p>

        <div className={`${styles.wideplate} desk-only`}>
          <svg
            viewBox="0 0 940 168"
            aria-label="Three sealed case folders; the selection line traces across and rests beneath one of them"
          >
            <defs>
              <pattern id="sealHatch" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="6" stroke="var(--ochre)" strokeWidth="1" opacity=".4" />
              </pattern>
            </defs>
            {BLIND_CASES.map((c, i) => (
              <g key={c.code}>
                <rect x={xs[i]} y="14" width="70" height="10" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.1" />
                <rect x={xs[i]} y="24" width="200" height="102" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.2" />
                <text x={xs[i] + 16} y="46" fontSize="9" fontWeight="600" fill="var(--ink)" letterSpacing="1.2">
                  {c.code}
                </text>
                <text x={xs[i] + 16} y="62" fontSize="7.5" fill="var(--stone)" letterSpacing="2">
                  SEALED
                </text>
                <rect x={xs[i] + 16} y="76" width="168" height="26" fill="url(#sealHatch)" stroke="var(--hair)" strokeWidth="1" />
                <text x={xs[i] + 100} y="92" textAnchor="middle" fontSize="8.5" fill="var(--stone)" letterSpacing="2">
                  ??????????
                </text>
                <text x={xs[i] + 16} y="118" fontSize="6.6" fill="var(--stone)" letterSpacing=".6">
                  STATE UNKNOWN TO RESPONDERS
                </text>
              </g>
            ))}
            <line
              className="scrub"
              data-flash="drawRest"
              x1="40"
              y1="146"
              x2="900"
              y2="146"
              stroke="var(--ink)"
              strokeWidth="1"
            />
            <g id="drawRest" className="hatchin">
              <line x1="456" y1="146" x2="484" y2="146" stroke="var(--verm)" strokeWidth="2.6" />
              <line x1="470" y1="146" x2="470" y2="130" stroke="var(--verm)" strokeWidth="1.2" />
              <text x="470" y="162" textAnchor="middle" fontSize="7" fill="var(--verm)" letterSpacing=".8">THE DRAW RESTS</text>
            </g>
            <text x="40" y="162" fontSize="6.6" fill="var(--stone)" letterSpacing=".6">
              BOUNDED DRAW · ELIGIBLE CASES ONLY
            </text>
          </svg>
        </div>

        <div className={styles.cases}>
          {BLIND_CASES.map((c, i) => (
            <div
              key={c.code}
              className={`${styles.case} wipe`}
              style={{ "--d": `${i * 0.1}s` } as React.CSSProperties}
            >
              <div className={`${styles.caseCode} mono`}>{c.code}</div>
              <div className={`${styles.caseTag} mono`}>{c.tag}</div>
              <div className={styles.caseLine}>{c.line}</div>
              <div className={styles.caseBody}>{c.body}</div>
              <div className={`${styles.caseQLabel} mono`}>THE QUESTION</div>
              <div className={`${styles.caseQ} mono`}>{c.question}</div>
            </div>
          ))}
        </div>

        <div className={`${styles.candStrip} mono wipe`}>{C5_NOTE}</div>
      </div>
    </SurveySection>
  );
}
