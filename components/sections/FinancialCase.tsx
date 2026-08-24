import SurveySection from "@/components/SurveySection";
import FigureHeader from "@/components/FigureHeader";
import Counter from "@/components/Counter";
import { FIN } from "@/lib/data";
import styles from "./FinancialCase.module.css";

/**
 * FIG. 05 — THE FINANCIAL CASE. A worksheet that computes itself as it
 * enters view: the workflow, the redesign, the scale, and the recovered
 * capacity counting up line by line — beside the bar the traverse draws,
 * strikes, and redraws at one minute.
 */
export default function FinancialCase() {
  return (
    <SurveySection id="f5">
      <div className="inwrap">
        <FigureHeader
          no="FIG. 05"
          title="The Financial Case"
          refText="ONE WORKFLOW, QUANTIFIED END TO END"
        />
        <p className={`${styles.lede} wipe`}>
          Better architecture creates measurable value. This is the arithmetic
          of a single redesigned workflow: the kind{" "}
          <a href="#f4" data-snap>Step 04</a> exists to find.
        </p>
        <div className={styles.grid}>
          <div className={`${styles.sheet} mono`}>
            <div className={`${styles.srow} rowin`}>
              <span className={styles.sc}>L-01</span>
              <span className={styles.sl}>CURRENT WORKFLOW</span>
              <span className={styles.sv}>
                <Counter value={FIN.currentMin} suffix=" MIN" /> / DAY / EMPLOYEE
              </span>
            </div>
            <div className={`${styles.srow} rowin`} style={{ "--d": ".08s" } as React.CSSProperties}>
              <span className={styles.sc}>L-02</span>
              <span className={styles.sl}>REDESIGNED</span>
              <span className={styles.sv}>
                <Counter value={FIN.futureMin} suffix=" MIN" /> / DAY
              </span>
            </div>
            <div className={`${styles.srow} rowin`} style={{ "--d": ".16s" } as React.CSSProperties}>
              <span className={styles.sc}>L-03</span>
              <span className={styles.sl}>TIME RETURNED</span>
              <span className={styles.sv}>
                <Counter value={FIN.savedMin} suffix=" MIN" /> / DAY
              </span>
            </div>
            <div className={`${styles.srow} rowin`} style={{ "--d": ".24s" } as React.CSSProperties}>
              <span className={styles.sc}>L-04</span>
              <span className={styles.sl}>AT SCALE</span>
              <span className={styles.sv}>
                × <Counter value={FIN.employees} /> EMPLOYEES × <Counter value={FIN.days} /> DAYS
              </span>
            </div>
            <div className={`${styles.srow} ${styles.sub1} rowin`} style={{ "--d": ".32s" } as React.CSSProperties}>
              <span className={styles.sc}>L-05</span>
              <span className={styles.sl}>RECOVERED</span>
              <span className={styles.sv}>
                <Counter value={FIN.minYr} suffix=" MIN" /> / YR
              </span>
            </div>
            <div className={`${styles.srow} rowin`} style={{ "--d": ".4s" } as React.CSSProperties}>
              <span className={styles.sc}>L-06</span>
              <span className={styles.sl}>IN HOURS</span>
              <span className={styles.sv}>
                <Counter value={FIN.hrsYr} suffix=" HRS" /> / YR
              </span>
            </div>
            <div className={`${styles.total} rowin`} style={{ "--d": ".5s" } as React.CSSProperties}>
              <span className={styles.tlab}>CAPACITY RECOVERED</span>
              <span className={styles.tval}>
                <Counter value={FIN.dollars} prefix="≈$" duration={1300} />
              </span>
              <span className={styles.tnote}>
                AT A ≈${FIN.rate}/HR LOADED RATE · FROM ONE WORKFLOW
              </span>
            </div>
            <p className={styles.rx}>REDUCTION: AND THAT IS ONLY ONE WORKFLOW.</p>
          </div>
          <div>
            <div className="desk-only">
            <svg
              viewBox="0 0 420 210"
              aria-label="Two bars on one axis: the current 20-minute workflow, the redesigned 1-minute workflow, and the reclaimed 19 minutes hatched as capacity returned"
            >
              <defs>
                <pattern id="reclaimHatch" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="6" stroke="var(--ochre)" strokeWidth="1" opacity=".55" />
                </pattern>
              </defs>
              <line x1="30" y1="180" x2="400" y2="180" stroke="var(--hair)" strokeWidth="1" />
              <line x1="30" y1="180" x2="30" y2="30" stroke="var(--hair)" strokeWidth="1" />
              <text x="24" y="196" fontSize="9" fill="var(--stone)">0</text>
              <text x="200" y="196" fontSize="9" fill="var(--stone)">10</text>
              <text x="376" y="196" fontSize="9" fill="var(--stone)">20 MIN</text>
              <text x="30" y="48" fontSize="9" fill="var(--stone)">CURRENT · 20 MIN / DAY / EMPLOYEE</text>
              <path className="scrub" d="M30,72 H390" stroke="var(--oxide)" strokeWidth="24" fill="none" />
              <text x="30" y="120" fontSize="9" fill="var(--stone)">REDESIGNED · 1 MIN / DAY</text>
              <path
                className="scrub"
                data-delay="0.45"
                data-flash="reclaim"
                d="M30,144 H48"
                stroke="var(--cobalt)"
                strokeWidth="24"
                fill="none"
              />
              <g id="reclaim" className="hatchin">
                <rect x="48" y="132" width="342" height="24" fill="url(#reclaimHatch)" />
                <rect x="48" y="132" width="342" height="24" fill="none" stroke="var(--ochre)" strokeWidth="0.8" opacity=".7" />
                <text x="219" y="148.5" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--ochre)">
                  19 MIN / DAY / EMPLOYEE · RETURNED TO REAL WORK
                </text>
              </g>
            </svg>
            <p className={styles.barcap}>
              FIG. 05 · ONE AXIS, TWICE. THE HATCHED SPAN IS THE CAPACITY THE
              REDESIGN HANDS BACK.
            </p>
            </div>

            {/* field plate: the same bars at legible scale */}
            <div className="mob-only">
              <svg
                viewBox="0 0 360 200"
                aria-label="Two bars on one axis: the current 20-minute workflow, the redesigned 1-minute workflow, and the reclaimed 19 minutes hatched as capacity returned"
              >
                <defs>
                  <pattern id="reclaimHatchM" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="0" y2="6" stroke="var(--ochre)" strokeWidth="1" opacity=".55" />
                  </pattern>
                </defs>
                <text x="8" y="20" fontSize="12" fill="var(--stone)">CURRENT · 20 MIN / DAY / EMPLOYEE</text>
                <path className="scrub" d="M8,44 H336" stroke="var(--oxide)" strokeWidth="22" fill="none" />
                <text x="8" y="96" fontSize="12" fill="var(--stone)">REDESIGNED · 1 MIN / DAY</text>
                <path
                  className="scrub"
                  data-delay="0.45"
                  data-flash="reclaimM"
                  d="M8,118 H24"
                  stroke="var(--cobalt)"
                  strokeWidth="22"
                  fill="none"
                />
                <g id="reclaimM" className="hatchin">
                  <rect x="24" y="107" width="312" height="22" fill="url(#reclaimHatchM)" />
                  <rect x="24" y="107" width="312" height="22" fill="none" stroke="var(--ochre)" strokeWidth="0.8" opacity=".7" />
                  <text x="180" y="122" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ochre)">
                    19 MIN RETURNED TO REAL WORK
                  </text>
                </g>
                <line x1="8" y1="162" x2="352" y2="162" stroke="var(--hair)" strokeWidth="1" />
                <text x="8" y="182" fontSize="11" fill="var(--stone)">0</text>
                <text x="168" y="182" fontSize="11" fill="var(--stone)">10</text>
                <text x="310" y="182" fontSize="11" fill="var(--stone)">20 MIN</text>
              </svg>
              <p className={styles.barcap}>
                FIG. 05 · THE HATCHED SPAN IS THE CAPACITY HANDED BACK.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SurveySection>
  );
}
