import SurveySection from "@/components/SurveySection";
import FigureHeader from "@/components/FigureHeader";
import { GROWTH_ADDS, MODEL_LAGS } from "@/lib/data";
import styles from "./Problem.module.css";

/**
 * FIG. 02 — THE PROBLEM. Growth compounds; the operating model lags. The
 * chart draws both curves under scroll, then the gap between them hatches
 * itself vermilion — the section's whole argument in one drawing.
 */
export default function Problem() {
  return (
    <SurveySection id="f2">
      <div className="inwrap">
        <FigureHeader
          no="FIG. 02"
          title="The Problem"
          refText="GROWTH VS. THE OPERATING MODEL"
        />
        <p className={`${styles.lede} wipe`}>
          Companies often grow faster than the systems underneath them. They add
          more of everything, but rarely stop to design how the pieces
          should actually work together.
        </p>
        <div className={styles.grid}>
          <div className={styles.lists}>
            <div>
              <div className={`${styles.lh} mono`}>GROWTH ADDS</div>
              {GROWTH_ADDS.map((g, i) => (
                <div
                  key={g}
                  className={`${styles.li} rowin`}
                  style={{ "--d": `${i * 0.06}s` } as React.CSSProperties}
                >
                  <span className={`${styles.code} mono`}>
                    G-{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.liname}>{g}</span>
                  <span className={`${styles.gweight} mono`} aria-hidden="true">
                    {"▮".repeat(Math.min(i + 1, 6))}
                  </span>
                </div>
              ))}
              <p className={`${styles.lnote} mono`}>MORE OF EVERYTHING, COMPOUNDING</p>
            </div>
            <div>
              <div className={`${styles.lh} ${styles.lag} mono`}>
                THE OPERATING MODEL LAGS
              </div>
              {MODEL_LAGS.map((m, i) => (
                <div
                  key={m}
                  className={`${styles.li} rowin`}
                  style={{ "--d": `${0.1 + i * 0.08}s` } as React.CSSProperties}
                >
                  <span className={`${styles.code} ${styles.lagcode} mono`}>
                    L-{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.liname}>{m}</span>
                </div>
              ))}
              <p className={`${styles.lnote} mono`}>
                NOBODY DESIGNED HOW THE PIECES FIT
              </p>
            </div>
          </div>
          <div>
            <div className="desk-only">
            <svg
              viewBox="0 0 440 260"
              aria-label="Growth curve diverging from the operating-model line; the gap between them hatched vermilion"
            >
              <defs>
                <pattern id="gapHatch" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="6" stroke="var(--verm)" strokeWidth="1" opacity=".45" />
                </pattern>
              </defs>
              <line x1="28" y1="222" x2="420" y2="222" stroke="var(--hair)" strokeWidth="1" />
              <line x1="28" y1="222" x2="28" y2="20" stroke="var(--hair)" strokeWidth="1" />
              {[
                [122, "T+1"],
                [216, "T+2"],
                [310, "T+3"],
                [404, "T+4"],
              ].map(([x, t]) => (
                <g key={t}>
                  <line x1={x} y1="219" x2={x} y2="225" stroke="var(--stone)" strokeWidth="1" />
                  <text x={Number(x) - 10} y="238" fontSize="8.5" fill="var(--stone)">{t}</text>
                </g>
              ))}
              <g id="gapFill" className="hatchin">
                <polygon
                  points="239,148 319,101 361,73 404,42 404,178 371,183 337,188 262,197 239,199"
                  fill="url(#gapHatch)"
                />
                <line x1="412" y1="42" x2="412" y2="178" stroke="var(--verm)" strokeWidth="1.4" />
                <path d="M406,42 h12 M406,178 h12" stroke="var(--verm)" strokeWidth="1.2" fill="none" />
                <text x="332" y="102" fontSize="9.5" fill="var(--verm)" fontWeight="600">THE GAP</text>
                <text x="180" y="24" fontSize="8.5" fill="var(--stone)">GROWTH HIDES STRUCTURAL WEAKNESS UNTIL COMPLEXITY CATCHES UP</text>
              </g>
              <path className="scrub" d="M28,214 C130,208 260,150 404,42" fill="none" stroke="var(--oxide)" strokeWidth="1.7" />
              <path className="scrub" data-delay=".2" data-flash="gapFill" d="M28,214 C150,210 300,196 404,178" fill="none" stroke="var(--ink)" strokeWidth="1.4" />
              <text x="330" y="60" fontSize="9" fill="var(--oxide)">GROWTH</text>
              <text x="284" y="214" fontSize="9" fill="var(--ink)">OPERATING MODEL</text>
              <text x="356" y="252" fontSize="8.5" fill="var(--stone)">TIME →</text>
            </svg>
            <p className={styles.chartcap}>
              FIG. 02 · THE HATCHED AREA IS WHERE COMPANIES QUIETLY LEAK TIME,
              MARGIN, AND PATIENCE. IT IS ALSO WHERE WE WORK.
            </p>
            </div>

            {/* field plate: annotations become numbered callouts + a notes ledger */}
            <div className="mob-only">
              <svg
                viewBox="0 0 360 240"
                aria-label="Growth curve diverging from the operating-model line, with numbered callouts"
              >
                <defs>
                  <pattern id="gapHatchM" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="0" y2="6" stroke="var(--verm)" strokeWidth="1" opacity=".45" />
                  </pattern>
                </defs>
                <line x1="20" y1="208" x2="352" y2="208" stroke="var(--hair)" strokeWidth="1" />
                <line x1="20" y1="208" x2="20" y2="20" stroke="var(--hair)" strokeWidth="1" />
                <g id="gapFillM" className="hatchin">
                  <polygon points="196,152 252,120 300,88 336,52 336,168 300,174 252,182 196,190" fill="url(#gapHatchM)" />
                  <line x1="344" y1="52" x2="344" y2="168" stroke="var(--verm)" strokeWidth="1.4" />
                </g>
                <path className="scrub" d="M20,200 C110,192 220,148 336,52" fill="none" stroke="var(--oxide)" strokeWidth="1.8" />
                <path className="scrub" data-delay=".2" data-flash="gapFillM" d="M20,200 C130,196 250,184 336,168" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
                <g>
                  <circle cx="296" cy="76" r="9" fill="var(--paper)" stroke="var(--oxide)" strokeWidth="1.2" />
                  <text x="296" y="80" textAnchor="middle" fontSize="11" fill="var(--oxide)">1</text>
                  <circle cx="296" cy="182" r="9" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.2" />
                  <text x="296" y="186" textAnchor="middle" fontSize="11" fill="var(--ink)">2</text>
                  <circle cx="344" cy="36" r="9" fill="var(--paper)" stroke="var(--verm)" strokeWidth="1.2" />
                  <text x="344" y="40" textAnchor="middle" fontSize="11" fill="var(--verm)">3</text>
                </g>
                <text x="300" y="228" fontSize="11" fill="var(--stone)">TIME →</text>
              </svg>
              <div className={styles.notes}>
                <div className={`${styles.noterow} mono`}>
                  <span className={styles.ncode} style={{ color: "var(--oxide)" }}>1</span>
                  GROWTH: MORE OF EVERYTHING, COMPOUNDING
                </div>
                <div className={`${styles.noterow} mono`}>
                  <span className={styles.ncode}>2</span>
                  THE OPERATING MODEL: DESIGN LAGS BEHIND
                </div>
                <div className={`${styles.noterow} mono`}>
                  <span className={styles.ncode} style={{ color: "var(--verm)" }}>3</span>
                  THE GAP, HATCHED: WHERE TIME, MARGIN, AND PATIENCE LEAK
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SurveySection>
  );
}
