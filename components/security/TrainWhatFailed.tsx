import SurveySection from "@/components/SurveySection";
import FigureHeader from "@/components/FigureHeader";
import DetailRef from "@/components/DetailRef";
import Counter from "@/components/Counter";
import { CONTACT } from "@/lib/data";
import {
  C8_CLOSE_LINE,
  C8_LEDE_A,
  C8_LEDE_B,
  SEC_COLOPHON,
  SEC_DELIVERABLES,
  TRAINING_ROWS,
} from "@/lib/security-data";
import styles from "./Sec.module.css";

/**
 * FIG. C8 — TRAIN WHAT FAILED. The assessment becomes the curriculum, the
 * reassessment becomes the proof. Build, prove, teach, hand back.
 */
export default function TrainWhatFailed() {
  return (
    <SurveySection
      id="c8"
      figNo="C8"
      title="TRAIN WHAT FAILED"
      datum="74 → 88"
    >
      <div className="inwrap">
        <FigureHeader
          no="FIG. C8"
          title="Train What Failed"
          refText="OBSERVE · SCORE · TRAIN · REASSESS"
        />
        <p className={`${styles.lede} wipe`}>{C8_LEDE_A}</p>
        <p className={`${styles.lede} wipe`} style={{ "--d": ".08s" } as React.CSSProperties}>
          {C8_LEDE_B}
        </p>

        <div className={styles.trainGrid}>
          <div>
            <div className={`${styles.lh} mono`}>OBSERVED GAP → FOLLOW-ON SESSION</div>
            {TRAINING_ROWS.map((t, i) => (
              <div
                key={t.gap}
                className={`${styles.trow} rowin`}
                style={{ "--d": `${i * 0.05}s` } as React.CSSProperties}
              >
                <span className={styles.tgap}>{t.gap}</span>
                <span className={`${styles.tarrow} mono`}>→</span>
                <span className={`${styles.tsession} mono`}>{t.session}</span>
              </div>
            ))}
          </div>
          <div className={`${styles.reassess} wipe`}>
            <div className={styles.reassessRow}>
              <span className={`${styles.reassessLabel} mono`}>ASSESSMENT 01</span>
              <span className={styles.reassessScore}>
                <Counter value={74} />
              </span>
            </div>
            <div className={`${styles.reassessMid} mono`}>│ TRAIN THE GAPS ▼</div>
            <div className={styles.reassessRow}>
              <span className={`${styles.reassessLabel} mono`}>REASSESSMENT</span>
              <span className={styles.reassessScore}>
                <Counter value={88} />
              </span>
            </div>
            <p className={`${styles.dnote} mono`} style={{ marginTop: "10px" }}>
              MEASURABLE IMPROVEMENT, NOT A ONE-TIME REPORT. THE BASELINE
              CARRIES TO THE NEXT EXERCISE.
            </p>
          </div>
        </div>

        <div className={styles.delivWrap}>
          <div className={`${styles.lh} mono`}>WHAT YOU WALK AWAY WITH</div>
          {SEC_DELIVERABLES.map((d, i) => (
            <div
              key={d.code}
              className={`${styles.li} rowin`}
              style={{ "--d": `${i * 0.05}s` } as React.CSSProperties}
            >
              <span className={`${styles.code} mono`}>{d.code}</span>
              <span className={styles.liname}>{d.name}</span>
              <span className={`${styles.dnote} mono`}>{d.note}</span>
            </div>
          ))}
        </div>

        <div className={`${styles.closeLine} mono wipe`}>{C8_CLOSE_LINE}</div>

        <div className={styles.ctaRow}>
          <a className={styles.cta} data-snap href={CONTACT.secHref}>
            [ COMMISSION SCHEDULE C ]
          </a>
          <span className={`${styles.backlink} mono`}>
            <DetailRef to="c5" label="REVIEW THE ASSESSMENT METHOD" />
          </span>
          <span className={`${styles.backlink} mono`}>
            <DetailRef to="f1" label="RETURN TO THE STRUCTURAL SURVEY" />
          </span>
        </div>

        <p className={`${styles.colophon} mono`}>{SEC_COLOPHON}</p>
      </div>
    </SurveySection>
  );
}
