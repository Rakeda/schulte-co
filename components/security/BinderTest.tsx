import SurveySection from "@/components/SurveySection";
import FigureHeader from "@/components/FigureHeader";
import {
  BINDER_DOCUMENTED,
  BINDER_OBSERVED,
  C2_CONTRAST,
  C2_GAP_LINE,
  C2_LEDE,
  C2_PULL,
} from "@/lib/security-data";
import styles from "./Sec.module.css";

/**
 * FIG. C2 — THE BINDER TEST. Documented capability against observed
 * behavior: the plan on the left checks out; the right column is all
 * open questions. The gap between the columns is the assessment.
 */
export default function BinderTest() {
  return (
    <SurveySection
      id="c2"
      figNo="C2"
      title="THE BINDER TEST"
      datum="POLICY IS NOT PERFORMANCE"
    >
      <div className="inwrap">
        <FigureHeader
          no="FIG. C2"
          title="The Binder Test"
          refText="POLICY IS NOT PERFORMANCE"
        />
        <p className={`${styles.lede} wipe`}>{C2_LEDE}</p>

        <div className={styles.contrast}>
          {C2_CONTRAST.map((c, i) => (
            <div
              key={c.what}
              className={`${styles.cRow} rowin`}
              style={{ "--d": `${i * 0.08}s` } as React.CSSProperties}
            >
              <span
                className={`${styles.cWhat} mono ${i === C2_CONTRAST.length - 1 ? styles.cUs : ""}`}
              >
                {c.what}
              </span>
              <span>measures {c.measures}</span>
            </div>
          ))}
        </div>

        <div className={styles.binder}>
          <div>
            <div className={`${styles.lh} mono`}>DOCUMENTED</div>
            {BINDER_DOCUMENTED.map((d, i) => (
              <div
                key={d}
                className={`${styles.bRow} mono rowin`}
                style={{ "--d": `${i * 0.06}s` } as React.CSSProperties}
              >
                <span className={styles.bDoc}>✓</span>
                <span>{d}</span>
              </div>
            ))}
          </div>
          <div>
            <div className={`${styles.lh} ${styles.lhRed} mono`}>OBSERVED</div>
            {BINDER_OBSERVED.map((o, i) => (
              <div
                key={o}
                className={`${styles.bRow} mono rowin`}
                style={{ "--d": `${0.1 + i * 0.06}s` } as React.CSSProperties}
              >
                <span className={styles.bObs}>?</span>
                <span>{o}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={`${styles.gapline} mono wipe`}>{C2_GAP_LINE}</div>

        <div className={`${styles.pull} wipe`}>{C2_PULL}</div>
      </div>
    </SurveySection>
  );
}
