import SurveySection from "@/components/SurveySection";
import FigureHeader from "@/components/FigureHeader";
import Counter from "@/components/Counter";
import {
  C7_LEDE,
  IMPLICATION_ROWS,
  OBSERVED_ROWS,
  SCORE_DIMS,
  SCORE_TOTAL,
} from "@/lib/security-data";
import styles from "./Sec.module.css";

/**
 * FIG. C7 — THE READINESS SCORE. Leadership gets a measure, not an
 * anecdote: seven weighted dimensions, each tied to a leadership question,
 * each scored from the investigation itself.
 */
export default function ReadinessScore() {
  return (
    <SurveySection
      id="c7"
      figNo="C7"
      title="THE READINESS SCORE"
      datum="A MEASURE, NOT AN ANECDOTE"
    >
      <div className="inwrap">
        <FigureHeader
          no="FIG. C7"
          title="The Readiness Score"
          refText="LEADERSHIP GETS A MEASURE, NOT AN ANECDOTE"
        />
        <p className={`${styles.lede} wipe`}>{C7_LEDE}</p>

        <div className={styles.scoreGrid}>
          <div>
            <div className={`${styles.lh} mono`}>
              SEVEN DIMENSIONS · WEIGHTED TO WHAT LEADERSHIP NEEDS
            </div>
            {SCORE_DIMS.map((d, i) => (
              <div
                key={d.name}
                className={`${styles.dimRow} rowin`}
                style={{ "--d": `${i * 0.06}s` } as React.CSSProperties}
              >
                <span className={`${styles.dimName} mono`}>{d.name}</span>
                <span className={styles.dimQ}>{d.q}</span>
                <span className={`${styles.dimW} mono`}>/{d.w}</span>
              </div>
            ))}
          </div>
          <div>
            <div className={styles.scoreHead}>
              <span className={`${styles.scoreTitle} mono`}>
                SECURITY RESPONSE READINESS · WORKED EXAMPLE
              </span>
              <span className={styles.scoreBig}>
                <Counter value={SCORE_TOTAL} /> / 100
              </span>
            </div>
            <svg
              viewBox="0 0 420 236"
              aria-label="Worked example scorecard: seven dimension bars against their weights"
            >
              <line
                className="scrub"
                data-flash="scoreBars"
                x1="168"
                y1="10"
                x2="168"
                y2="226"
                stroke="var(--ink)"
                strokeWidth="1.2"
              />
              <g id="scoreBars" className="hatchin">
                {SCORE_DIMS.map((d, i) => {
                  const y = 22 + i * 30;
                  const w = 170 * (d.s / d.w);
                  return (
                    <g key={d.name}>
                      <text x="0" y={y + 7} fontSize="7.6" fill="var(--ink)" letterSpacing=".5">
                        {d.name}
                      </text>
                      <rect x="168" y={y} width="170" height="9" fill="none" stroke="var(--hair)" strokeWidth="1" />
                      <rect x="168" y={y} width={w} height="9" fill="var(--ink)" />
                      <text x="418" y={y + 8} textAnchor="end" fontSize="8" fontWeight="600" fill="var(--ochre)">
                        {String(d.s).padStart(2, "0")} / {d.w}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>
        </div>

        <div className={styles.obsGrid}>
          <div>
            <div className={`${styles.lh} mono`}>OBSERVED</div>
            {OBSERVED_ROWS.map((o, i) => (
              <div
                key={o.code}
                className={`${styles.li} rowin`}
                style={{ "--d": `${i * 0.06}s` } as React.CSSProperties}
              >
                <span className={`${styles.code} mono`}>{o.code}</span>
                <span className={styles.liname}>{o.text}</span>
              </div>
            ))}
          </div>
          <div>
            <div className={`${styles.lh} ${styles.lhBlue} mono`}>IMPLICATION</div>
            {IMPLICATION_ROWS.map((r, i) => (
              <div
                key={r.code}
                className={`${styles.li} rowin`}
                style={{ "--d": `${0.1 + i * 0.07}s` } as React.CSSProperties}
              >
                <span className={`${styles.code} mono`}>{r.code}</span>
                <span className={`${r.good ? styles.impGood : styles.impBad} mono`} style={{ fontSize: "11px", letterSpacing: ".07em" }}>
                  {r.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SurveySection>
  );
}
