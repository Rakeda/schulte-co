import SurveySection from "@/components/SurveySection";
import FigIndex from "@/components/FigIndex";
import { SECTION_LINKS_SEC } from "@/lib/data";
import {
  C1_EYEBROW,
  C1_LEDE_A,
  C1_LEDE_B,
  C1_LEDE_C,
  C1_QUESTION,
  C1_STRIP,
  C1_SUBHEAD,
} from "@/lib/security-data";
import styles from "./Sec.module.css";

/* the estate schematic, drawn once for each layer of the section */
const BOXES: Array<[number, number, number, number, string]> = [
  [8, 26, 58, 18, "INTERNET"],
  [92, 26, 42, 18, "WAF"],
  [170, 26, 52, 18, "M365"],
  [170, 55, 52, 18, "AZURE"],
  [248, 44, 40, 16, "AKS"],
  [248, 66, 40, 16, "SQL"],
  [248, 88, 56, 16, "STORAGE"],
  [170, 101, 42, 18, "VPN"],
  [228, 101, 70, 18, "ON-PREM AD"],
  [316, 94, 40, 16, "FILE"],
  [316, 122, 40, 16, "ERP"],
  [170, 138, 54, 16, "IDENTITY"],
  [232, 138, 34, 16, "EDR"],
  [274, 138, 38, 16, "SIEM"],
];

const LINES: Array<[number, number, number, number]> = [
  [66, 35, 92, 35],
  [134, 35, 154, 35],
  [154, 35, 154, 146],
  [154, 64, 170, 64],
  [154, 110, 170, 110],
  [154, 146, 170, 146],
  [222, 64, 232, 64],
  [232, 52, 232, 96],
  [232, 52, 248, 52],
  [232, 74, 248, 74],
  [232, 96, 248, 96],
  [212, 110, 228, 110],
  [298, 110, 308, 110],
  [308, 102, 308, 130],
  [308, 102, 316, 102],
  [308, 130, 316, 130],
  [226, 146, 232, 146],
  [266, 146, 274, 146],
];

function Estate({ dy, dashed }: { dy: number; dashed?: boolean }) {
  const stroke = dashed ? "var(--cobalt)" : "var(--ink)";
  return (
    <g transform={`translate(0, ${dy})`}>
      {BOXES.map(([x, y, w, h, label]) => (
        <g key={label}>
          <rect
            x={x}
            y={y}
            width={w}
            height={h}
            fill="var(--paper)"
            stroke={stroke}
            strokeWidth={dashed ? 0.9 : 1.1}
            strokeDasharray={dashed ? "3 2.5" : undefined}
          />
          <text
            x={x + w / 2}
            y={y + h / 2 + 2.4}
            textAnchor="middle"
            fontSize="6.4"
            fill={stroke}
            letterSpacing=".3"
          >
            {label}
          </text>
        </g>
      ))}
      {LINES.map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={stroke}
          strokeWidth={dashed ? 0.8 : 1}
          strokeDasharray={dashed ? "3 2.5" : undefined}
        />
      ))}
    </g>
  );
}

/**
 * FIG. C1 — PROVE THE RESPONSE. The signature plate: the operating estate
 * above, survey lines tracing down into its isolated twin below. Behavior
 * recreated; production untouched.
 */
export default function SecHero() {
  return (
    <SurveySection
      id="c1"
      figNo="C1"
      title="PROVE THE RESPONSE"
      datum="ONE BLIND CASE · FOUR HOURS"
      className={styles.hero}
    >
      <div className="inwrap">
        <p className={`${styles.eyebrow} mono wipe`}>{C1_EYEBROW}</p>
        <FigIndex items={SECTION_LINKS_SEC} />
        <h1 className={`${styles.h1} wipe`} style={{ "--d": ".08s" } as React.CSSProperties}>
          Prove the response.
        </h1>
        <p className={`${styles.subhead} wipe`} style={{ "--d": ".14s" } as React.CSSProperties}>
          {C1_SUBHEAD}
        </p>
        <div className={styles.heroGrid}>
          <div>
            <p className={`${styles.lede} wipe`} style={{ "--d": ".2s" } as React.CSSProperties}>
              {C1_LEDE_A}
            </p>
            <p className={`${styles.bigq} wipe`} style={{ "--d": ".26s" } as React.CSSProperties}>
              {C1_QUESTION}
            </p>
            <p className={`${styles.lede} wipe`} style={{ "--d": ".32s" } as React.CSSProperties}>
              {C1_LEDE_B}
            </p>
            <p className={`${styles.lede} wipe`} style={{ "--d": ".38s" } as React.CSSProperties}>
              {C1_LEDE_C}
            </p>
          </div>
          <div className="desk-only">
            <svg
              viewBox="0 0 460 384"
              aria-label="The operating environment schematic above; dashed survey lines trace down into an isolated assessment range below"
            >
              <text x="8" y="14" fontSize="8" fill="var(--stone)" letterSpacing="1">
                OPERATING ENVIRONMENT
              </text>
              <Estate dy={0} />

              <line className="scrub" x1="100" y1="168" x2="100" y2="196" stroke="var(--cobalt)" strokeWidth="1" strokeDasharray="3 3" />
              <line className="scrub" data-delay=".12" x1="190" y1="168" x2="190" y2="196" stroke="var(--cobalt)" strokeWidth="1" strokeDasharray="3 3" />
              <line className="scrub" data-delay=".24" x1="260" y1="168" x2="260" y2="196" stroke="var(--cobalt)" strokeWidth="1" strokeDasharray="3 3" />
              <line
                className="scrub"
                data-delay=".36"
                data-flash="rangeTwin"
                x1="330"
                y1="168"
                x2="330"
                y2="196"
                stroke="var(--cobalt)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />

              <g id="rangeTwin" className="hatchin">
                <text x="8" y="208" fontSize="8" fill="var(--cobalt)" letterSpacing="1">
                  ASSESSMENT RANGE
                </text>
                <Estate dy={194} dashed />
              </g>
              <text x="8" y="378" fontSize="7.5" fill="var(--ink)" fontWeight="600" letterSpacing="1">
                BEHAVIOR RECREATED. PRODUCTION UNTOUCHED.
              </text>
            </svg>
          </div>
        </div>
        <div className={`${styles.strip} mono wipe`} style={{ "--d": ".44s" } as React.CSSProperties}>
          {C1_STRIP.map((s, i) => (
            <span key={s}>
              <span className={styles.stripItem}>{s}</span>
              {i < C1_STRIP.length - 1 && <span className={styles.stripDot}>·</span>}
            </span>
          ))}
        </div>
      </div>
    </SurveySection>
  );
}
