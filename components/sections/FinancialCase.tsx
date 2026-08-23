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
            <svg
              viewBox="0 0 420 210"
              aria-label="The 20-minute workflow drawn, struck through, and redrawn at one minute"
            >
              <line x1="30" y1="180" x2="400" y2="180" stroke="var(--hair)" strokeWidth="1" />
              <line x1="30" y1="180" x2="30" y2="30" stroke="var(--hair)" strokeWidth="1" />
              <text x="24" y="196" fontSize="9" fill="var(--stone)">0</text>
              <text x="200" y="196" fontSize="9" fill="var(--stone)">10</text>
              <text x="376" y="196" fontSize="9" fill="var(--stone)">20 MIN</text>
              <text x="42" y="48" fontSize="9" fill="var(--stone)">CURRENT · 20 MIN / DAY / EMPLOYEE</text>
              <path className="scrub" d="M30,72 H390" stroke="var(--oxide)" strokeWidth="24" fill="none" />
              <path
                className="scrub"
                data-delay="0.5"
                data-flash="flStrike"
                d="M22,98 L398,46"
                stroke="var(--ink)"
                strokeWidth="2"
                fill="none"
              />
              <circle id="flStrike" className="flashfill" cx="398" cy="46" r="7" />
              <text x="42" y="126" fontSize="9" fill="var(--stone)">REDESIGNED · 1 MIN / DAY</text>
              <path className="scrub" data-delay="0.72" d="M30,148 H48" stroke="var(--cobalt)" strokeWidth="24" fill="none" />
              <text x="58" y="152" fontSize="9" fill="var(--ochre)">19 MIN / DAY / EMPLOYEE, RETURNED TO REAL WORK</text>
            </svg>
            <p className={styles.barcap}>
              FIG. 05 · DRAWN, STRUCK, AND REDRAWN BY THE TRAVERSE. WE TURN
              INEFFICIENCY INTO MEASURABLE BUSINESS VALUE.
            </p>
          </div>
        </div>
      </div>
    </SurveySection>
  );
}
