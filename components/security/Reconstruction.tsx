import SurveySection from "@/components/SurveySection";
import FigureHeader from "@/components/FigureHeader";
import {
  C4_LEDE_A,
  C4_LEDE_B,
  C4_PLATE_CAP,
  FIDELITY_MARKS,
  RECON_PAIRS,
} from "@/lib/security-data";
import styles from "./Sec.module.css";

/**
 * FIG. C4 — THE RECONSTRUCTION. An architectural section through both
 * estates: the real one above the cut, the assessment estate below it,
 * corresponded line by line. Investigative fidelity, not duplication.
 */
export default function Reconstruction() {
  const xs = RECON_PAIRS.map((_, i) => 30 + i * 130);
  return (
    <SurveySection
      id="c4"
      figNo="C4"
      title="THE RECONSTRUCTION"
      datum="FAITHFUL · ISOLATED · DISPOSABLE"
    >
      <div className="inwrap">
        <FigureHeader
          no="FIG. C4"
          title="The Reconstruction"
          refText="BEHAVIORALLY FAITHFUL · ISOLATED · DISPOSABLE"
        />
        <p className={`${styles.lede} wipe`}>{C4_LEDE_A}</p>
        <p className={`${styles.lede} wipe`} style={{ "--d": ".08s" } as React.CSSProperties}>
          {C4_LEDE_B}
        </p>

        <div className={`${styles.wideplate} desk-only`}>
          <svg
            viewBox="0 0 940 235"
            aria-label="A section drawing: the real estate above the cut line, the assessment estate below, joined by correspondence lines"
          >
            <text x="20" y="16" fontSize="8.5" fill="var(--stone)" letterSpacing="1">REAL ESTATE</text>
            {RECON_PAIRS.map((p, i) => (
              <g key={p.real}>
                <rect x={xs[i]} y="24" width="110" height="24" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.1" />
                <text x={xs[i] + 55} y="39" textAnchor="middle" fontSize="7.2" fill="var(--ink)" letterSpacing=".4">
                  {p.real}
                </text>
                <line
                  className="scrub"
                  data-delay={`${i * 0.07}`}
                  {...(i === RECON_PAIRS.length - 1 ? { "data-flash": "rangeBand" } : {})}
                  x1={xs[i] + 55}
                  y1="48"
                  x2={xs[i] + 55}
                  y2="160"
                  stroke="var(--stone)"
                  strokeWidth="0.9"
                  strokeDasharray="1.5 4"
                />
              </g>
            ))}

            <line x1="20" y1="112" x2="920" y2="112" stroke="var(--ink)" strokeWidth="2" />
            {Array.from({ length: 25 }, (_, i) => 30 + i * 37).map((x) => (
              <line key={x} x1={x} y1="120" x2={x + 10} y2="106" stroke="var(--stone)" strokeWidth="0.7" opacity=".7" />
            ))}
            <text x="920" y="104" textAnchor="end" fontSize="7" fill="var(--stone)" letterSpacing="1">
              SECTION A-A · THE CUT
            </text>

            <g id="rangeBand" className="hatchin">
              <text x="20" y="152" fontSize="8.5" fill="var(--cobalt)" letterSpacing="1">ASSESSMENT ESTATE</text>
              {RECON_PAIRS.map((p, i) => (
                <g key={p.range}>
                  <rect
                    x={xs[i]}
                    y="160"
                    width="110"
                    height="24"
                    fill="var(--paper)"
                    stroke="var(--cobalt)"
                    strokeWidth="0.9"
                    strokeDasharray="3 2.5"
                  />
                  <text x={xs[i] + 55} y="175" textAnchor="middle" fontSize="6.6" fill="var(--cobalt)" letterSpacing=".3">
                    {p.range}
                  </text>
                </g>
              ))}
              <text x="20" y="214" fontSize="7.5" fill="var(--ink)" fontWeight="600" letterSpacing="1">
                SAME QUESTIONS. SAME EVIDENCE SHAPES. NO BLAST RADIUS.
              </text>
            </g>
          </svg>
          <p className={styles.platecap}>{C4_PLATE_CAP}</p>
        </div>

        <div className="mob-only">
          <div className={styles.pairsM}>
            {RECON_PAIRS.map((p) => (
              <div key={p.real} className={`${styles.pairM} mono`}>
                <span className={styles.pairReal}>{p.real}</span>
                <span className={styles.pairTie}>┆</span>
                <span className={styles.pairRange}>{p.range}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.fidelity}>
          {FIDELITY_MARKS.map((m, i) => (
            <span
              key={m}
              className={`${styles.fmark} mono wipe`}
              style={{ "--d": `${i * 0.06}s` } as React.CSSProperties}
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </SurveySection>
  );
}
