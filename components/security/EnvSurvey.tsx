import SurveySection from "@/components/SurveySection";
import FigureHeader from "@/components/FigureHeader";
import {
  C3_BOTTOM,
  C3_LEDE_A,
  C3_LEDE_B,
  C3_PLATE_CAP,
  ENV_GROUPS,
} from "@/lib/security-data";
import styles from "./Sec.module.css";

/* the evidence plate: assets above, the evidence plane below,
   instrumentation lines between — two of them never arrive */
const ASSETS: Array<{ x: number; label: string; ev: string; gap?: string; stopY?: number }> = [
  { x: 40, label: "ON-PREM AD", ev: "AUTH LOG" },
  { x: 170, label: "ENTRA ID", ev: "CLOUD AUDIT" },
  { x: 300, label: "AKS", ev: "K8S AUDIT" },
  { x: 430, label: "ERP", ev: "APP LOG", gap: "NO APP LOG", stopY: 132 },
  { x: 560, label: "SQL", ev: "DB AUDIT" },
  { x: 690, label: "ENDPOINTS", ev: "EDR" },
  { x: 820, label: "M365 MAIL", ev: "MAIL LOG", gap: "30-DAY RETENTION", stopY: 160 },
];

/**
 * FIG. C3 — THE ENVIRONMENT SURVEY. Not an inventory: a map of where truth
 * would have to come from during an incident. Instrumentation lines drop
 * from every asset toward the evidence plane; the ones that stop short are
 * findings before the exercise even begins.
 */
export default function EnvSurvey() {
  return (
    <SurveySection
      id="c3"
      figNo="C3"
      title="THE ENVIRONMENT SURVEY"
      datum="WHERE TRUTH COMES FROM"
    >
      <div className="inwrap">
        <FigureHeader
          no="FIG. C3"
          title="The Environment Survey"
          refText="CLOUD · ON-PREM · IDENTITY · APPLICATIONS · SECURITY · EVIDENCE"
        />
        <p className={`${styles.lede} wipe`}>{C3_LEDE_A}</p>
        <p className={`${styles.lede} wipe`} style={{ "--d": ".08s" } as React.CSSProperties}>
          {C3_LEDE_B}
        </p>

        <div className={styles.envGrid}>
          {ENV_GROUPS.map((g, gi) => (
            <div key={g.group}>
              <div className={`${styles.lh} mono`}>{g.group}</div>
              {g.rows.map((r, i) => (
                <div
                  key={r.code}
                  className={`${styles.envRow} rowin`}
                  style={{ "--d": `${gi * 0.06 + i * 0.05}s` } as React.CSSProperties}
                >
                  <span className={`${styles.code} mono`}>{r.code}</span>
                  <span>{r.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className={`${styles.wideplate} desk-only`}>
          <svg
            viewBox="0 0 940 240"
            aria-label="Assets traced by instrumentation lines down to the evidence plane; two lines stop short and are marked as gaps"
          >
            {ASSETS.map((a, i) => (
              <g key={a.label}>
                <rect x={a.x} y="16" width="92" height="24" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.1" />
                <text x={a.x + 46} y="31" textAnchor="middle" fontSize="7.2" fill="var(--ink)" letterSpacing=".4">
                  {a.label}
                </text>
                <line
                  className="scrub"
                  data-delay={`${i * 0.08}`}
                  {...(i === ASSETS.length - 1 ? { "data-flash": "evGaps" } : {})}
                  x1={a.x + 46}
                  y1="40"
                  x2={a.x + 46}
                  y2={a.stopY ?? 196}
                  stroke="var(--ink)"
                  strokeWidth="0.9"
                  strokeDasharray={a.stopY ? "3 3" : undefined}
                />
                <text x={a.x + 46} y="216" textAnchor="middle" fontSize="6.6" fill="var(--stone)" letterSpacing=".4">
                  {a.ev}
                </text>
              </g>
            ))}
            <line x1="24" y1="196" x2="916" y2="196" stroke="var(--ink)" strokeWidth="1.6" />
            <line x1="24" y1="200" x2="916" y2="200" stroke="var(--hair)" strokeWidth="1" />
            <text x="916" y="232" textAnchor="end" fontSize="8" fill="var(--ink)" fontWeight="600" letterSpacing="1">
              THE EVIDENCE PLANE
            </text>
            <g id="evGaps" className="hatchin">
              {ASSETS.filter((a) => a.gap).map((a) => (
                <g key={a.label}>
                  <circle cx={a.x + 46} cy={a.stopY} r="3.2" fill="none" stroke="var(--verm)" strokeWidth="1.2" />
                  <path
                    d={`M${a.x + 40},${(a.stopY ?? 0) + 9} l12,12 M${a.x + 52},${(a.stopY ?? 0) + 9} l-12,12`}
                    stroke="var(--verm)"
                    strokeWidth="1.2"
                  />
                  <text x={a.x + 60} y={(a.stopY ?? 0) + 6} fontSize="6.6" fill="var(--verm)" letterSpacing=".4">
                    {a.gap}
                  </text>
                </g>
              ))}
            </g>
          </svg>
          <p className={styles.platecap}>{C3_PLATE_CAP}</p>
        </div>

        <div className="mob-only">
          <div className={styles.pairsM}>
            {ASSETS.map((a) => (
              <div key={a.label} className={`${styles.pairM} mono`}>
                <span className={styles.pairReal}>{a.label}</span>
                <span className={styles.pairTie}>┆</span>
                <span className={a.gap ? styles.bObs : styles.pairRange}>
                  {a.gap ? `${a.ev} · ${a.gap}` : a.ev}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.candStrip} mono wipe`}>{C3_BOTTOM}</div>
      </div>
    </SurveySection>
  );
}
