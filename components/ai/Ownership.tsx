import SurveySection from "@/components/SurveySection";
import FigureHeader from "@/components/FigureHeader";
import DetailRef from "@/components/DetailRef";
import { CONTACT } from "@/lib/data";
import {
  B6_COLOPHON,
  B6_LEDE,
  B6_LIVING,
  B6_ROLES,
  B6_TEMPLATE_NOTE,
  B6_TEMPLATE_NOTE_HEAD,
  DELIVERABLES,
  REGISTER_ROWS,
} from "@/lib/ai-data";
import styles from "./Ai.module.css";

/**
 * FIG. B6 — THE OWNERSHIP REGISTER, and the close. Every line has a name,
 * a measure, and a cadence. Then the deliverable, the note on template
 * libraries, and the way in.
 */
export default function Ownership() {
  return (
    <SurveySection
      id="b6"
      figNo="B6"
      title="THE OWNERSHIP REGISTER"
      datum="EVERY LINE HAS A NAME"
    >
      <div className="inwrap">
        <FigureHeader
          no="FIG. B6"
          title="The Ownership Register"
          refText="TOOLS DO NOT OWN OUTCOMES · PEOPLE DO"
        />
        <p className={`${styles.lede} wipe`}>{B6_LEDE}</p>

        <div className={styles.register}>
          <div className={`${styles.regRow} ${styles.regHead} mono`}>
            <span>LINE</span>
            <span>INITIATIVE</span>
            <span>OWNER</span>
            <span className={styles.regHideM}>MEASURE</span>
            <span className={styles.regHideM}>REVIEW</span>
          </div>
          {REGISTER_ROWS.map((r, i) => (
            <div
              key={r.code}
              className={`${styles.regRow} rowin`}
              style={{ "--d": `${i * 0.07}s` } as React.CSSProperties}
            >
              <span className={`${styles.regCode} mono`}>{r.code}</span>
              <span className={styles.regInit}>{r.initiative}</span>
              <span className={`${styles.regOwner} mono`}>{r.owner}</span>
              <span className={`${styles.regMeasure} mono ${styles.regHideM}`}>
                {r.measure}
              </span>
              <span className={`${styles.regReview} mono ${styles.regHideM}`}>
                {r.review}
              </span>
            </div>
          ))}
        </div>
        <p className={`${styles.living} mono wipe`}>{B6_LIVING}</p>

        <div className={styles.roles}>
          {B6_ROLES.map((r, i) => (
            <div
              key={r.role}
              className={`${styles.role} wipe`}
              style={{ "--d": `${i * 0.08}s` } as React.CSSProperties}
            >
              <div className={`${styles.roleName} mono`}>{r.role}</div>
              <div className={styles.roleNote}>{r.note}</div>
            </div>
          ))}
        </div>

        <div className={styles.closeGrid}>
          <div>
            <div className={`${styles.lh} mono`}>WHAT YOU WALK AWAY WITH</div>
            {DELIVERABLES.map((d, i) => (
              <div
                key={d.code}
                className={`${styles.li} rowin`}
                style={{ "--d": `${i * 0.06}s` } as React.CSSProperties}
              >
                <span className={`${styles.code} mono`}>{d.code}</span>
                <span className={styles.liname}>{d.name}</span>
              </div>
            ))}
            <p className={`${styles.lnote} mono`}>
              WE DO NOT STOP AT PAPER. SCHEDULE A GOVERNS THE BUILD:{" "}
              <DetailRef to="f4" label="BUILD · PROVE · TEACH · HAND BACK" />
            </p>
          </div>
          <div className={`${styles.templateNote} wipe`}>
            <div className={`${styles.templateHead} mono`}>
              {B6_TEMPLATE_NOTE_HEAD}
            </div>
            <div className={styles.templateBody}>{B6_TEMPLATE_NOTE}</div>
          </div>
        </div>

        <div className={styles.ctaRow}>
          <a className={styles.cta} data-snap href={CONTACT.aiHref}>
            [ COMMISSION SCHEDULE B ]
          </a>
          <a className={`${styles.backlink} mono`} href="/#f1">
            RETURN TO THE STRUCTURAL SURVEY →
          </a>
        </div>

        <p className={`${styles.colophon} mono`}>{B6_COLOPHON}</p>
      </div>
    </SurveySection>
  );
}
