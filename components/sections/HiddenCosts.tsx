import SurveySection from "@/components/SurveySection";
import FigureHeader from "@/components/FigureHeader";
import { COSTS_HIDDEN, COSTS_VISIBLE } from "@/lib/data";
import styles from "./HiddenCosts.module.css";

/**
 * FIG. 03 — BELOW THE SURFACE. The iceberg, actually drawn and sounded:
 * a small peak above the waterline, the mass hatched cobalt beneath it,
 * and a ledger where every hidden cost is tagged by what it drains.
 */
export default function HiddenCosts() {
  return (
    <SurveySection id="f3">
      <div className="inwrap">
        <FigureHeader
          no="FIG. 03"
          title="Below the Surface"
          refText="FIVE SYMPTOMS ABOVE · NINE COSTS BENEATH"
        />
        <p className={`${styles.lede} wipe`}>
          The biggest costs are often the ones leadership cannot see. What looks
          like a revenue or cost problem is usually an operating-model problem.
        </p>

        <div className={styles.grid}>
          <div>
            <div className={`${styles.gh} mono`}>ABOVE THE SURFACE · WHAT THE P&amp;L SEES</div>
            {COSTS_VISIBLE.map((c, i) => (
              <div
                key={c}
                className={`${styles.row} rowin`}
                style={{ "--d": `${i * 0.06}s` } as React.CSSProperties}
              >
                <span className={`${styles.code} mono`}>
                  V-{String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.rname}>{c}</span>
              </div>
            ))}

            <div className={styles.waterline}>
              <svg viewBox="0 0 560 22" preserveAspectRatio="none" aria-hidden="true">
                <path
                  className="scrub"
                  d="M0,11 C50,7 100,15 160,11 C220,7 270,15 330,11 C390,7 440,15 500,11 C530,9 545,13 560,11"
                  fill="none"
                  stroke="var(--cobalt)"
                  strokeWidth="1.6"
                />
              </svg>
              <span className={`${styles.wlab} mono`}>THE WATERLINE</span>
            </div>

            <div className={`${styles.gh} ${styles.ghHidden} mono`}>
              BELOW THE SURFACE · WHERE THE COST LIVES
            </div>
            {COSTS_HIDDEN.map((c, i) => (
              <div
                key={c.name}
                className={`${styles.row} ${styles.hrow} rowin`}
                style={
                  {
                    "--d": `${0.15 + i * 0.06}s`,
                    "--depth": `${Math.min(i * 3, 24)}px`,
                  } as React.CSSProperties
                }
              >
                <span className={`${styles.code} ${styles.hcode} mono`}>
                  H-{String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.rname}>{c.name}</span>
                <span className={`${styles.tags} mono`}>{c.tags}</span>
              </div>
            ))}
            <p className={`${styles.tagkey} mono`}>
              TAGGED BY WHAT IT DRAINS: TIME · LABOR · REVENUE · MARGIN · CX ·
              RISK · SPEND (THE QUANTIFY DIMENSIONS,{" "}
              <a href="#f4" data-snap>STEP 04</a>)
            </p>
          </div>

          <div className={styles.bergwrap}>
            <div className="desk-only">
            <svg
              viewBox="0 0 380 340"
              aria-label="Sounding chart of the iceberg: small visible peak, large hatched mass below the waterline"
            >
              <defs>
                <pattern id="bergHatch" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="7" stroke="var(--cobalt)" strokeWidth="1" opacity=".38" />
                </pattern>
              </defs>
              {/* depth scale */}
              <line x1="34" y1="96" x2="34" y2="320" stroke="var(--hair)" strokeWidth="1" strokeDasharray="3 4" />
              {[
                [96, "0"],
                [170, "−10"],
                [244, "−20"],
                [318, "−30"],
              ].map(([y, l]) => (
                <g key={l}>
                  <line x1="28" y1={y} x2="40" y2={y} stroke="var(--stone)" strokeWidth="1" />
                  <text x="4" y={Number(y) + 3} fontSize="8.5" fill="var(--stone)">{l}</text>
                </g>
              ))}
              {/* the peak above */}
              <path className="scrub" d="M120,96 L168,40 L196,68 L232,96" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
              <text x="240" y="52" fontSize="8.5" fill="var(--stone)">VISIBLE: MISSED TARGETS,</text>
              <text x="240" y="64" fontSize="8.5" fill="var(--stone)">MARGIN PRESSURE, LAYOFFS</text>
              <line x1="204" y1="60" x2="236" y2="56" stroke="var(--stone)" strokeWidth=".8" />
              {/* waterline */}
              <path className="scrub" data-delay=".15" d="M14,96 C64,92 114,100 174,96 C234,92 284,100 344,96 366,95 372,97 378,96" fill="none" stroke="var(--cobalt)" strokeWidth="1.6" />
              {/* the mass below */}
              <path
                className="scrub"
                data-delay=".3"
                data-flash="bergFill"
                d="M96,96 L74,150 L92,220 L150,296 L226,268 L268,190 L282,120 L256,96"
                fill="none"
                stroke="var(--ink)"
                strokeWidth="1.2"
              />
              <g id="bergFill" className="hatchin">
                <path d="M96,96 L74,150 L92,220 L150,296 L226,268 L268,190 L282,120 L256,96 Z" fill="url(#bergHatch)" />
                <text x="128" y="180" fontSize="9.5" fill="var(--cobalt)" fontWeight="600">HIDDEN: 9 COSTS</text>
                <text x="112" y="196" fontSize="8.5" fill="var(--cobalt)">TRIBAL KNOWLEDGE · REWORK ·</text>
                <text x="112" y="209" fontSize="8.5" fill="var(--cobalt)">KEY-PERSON DEPENDENCY…</text>
              </g>
              <text x="46" y="334" fontSize="8.5" fill="var(--stone)">SOUNDING: MOST OF THE MASS IS UNDER THE WATERLINE</text>
            </svg>
            </div>

            {/* field plate: same sounding, redrawn at pocket scale */}
            <div className="mob-only">
              <svg
                viewBox="0 0 360 400"
                aria-label="Sounding chart of the iceberg at field scale"
              >
                <defs>
                  <pattern id="bergHatchM" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="0" y2="7" stroke="var(--cobalt)" strokeWidth="1" opacity=".38" />
                  </pattern>
                </defs>
                <line x1="26" y1="112" x2="26" y2="372" stroke="var(--hair)" strokeWidth="1" strokeDasharray="3 4" />
                {[
                  [112, "0"],
                  [198, "−10"],
                  [284, "−20"],
                  [370, "−30"],
                ].map(([y, l]) => (
                  <g key={l}>
                    <line x1="20" y1={y} x2="32" y2={y} stroke="var(--stone)" strokeWidth="1" />
                    <text x="0" y={Number(y) + 4} fontSize="11" fill="var(--stone)">{l}</text>
                  </g>
                ))}
                <text x="46" y="24" fontSize="11" fill="var(--stone)">VISIBLE: MISSED TARGETS,</text>
                <text x="46" y="40" fontSize="11" fill="var(--stone)">MARGIN PRESSURE, LAYOFFS</text>
                <path className="scrub" d="M120,112 L172,52 L204,84 L240,112" fill="none" stroke="var(--ink)" strokeWidth="1.3" />
                <path className="scrub" data-delay=".15" d="M8,112 C60,108 112,116 172,112 C232,108 284,116 352,112" fill="none" stroke="var(--cobalt)" strokeWidth="1.7" />
                <path
                  className="scrub"
                  data-delay=".3"
                  data-flash="bergFillM"
                  d="M96,112 L70,186 L90,266 L152,358 L232,326 L276,228 L290,144 L262,112"
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth="1.3"
                />
                <g id="bergFillM" className="hatchin">
                  <path d="M96,112 L70,186 L90,266 L152,358 L232,326 L276,228 L290,144 L262,112 Z" fill="url(#bergHatchM)" />
                  <text x="116" y="212" fontSize="13" fill="var(--cobalt)" fontWeight="600">HIDDEN: 9 COSTS</text>
                  <text x="104" y="232" fontSize="11" fill="var(--cobalt)">TRIBAL KNOWLEDGE · REWORK ·</text>
                  <text x="104" y="248" fontSize="11" fill="var(--cobalt)">KEY-PERSON DEPENDENCY…</text>
                </g>
                <text x="20" y="394" fontSize="11" fill="var(--stone)">SOUNDING: MOST OF THE MASS IS UNDER THE WATERLINE</text>
              </svg>
            </div>
          </div>
        </div>
        <p className={`figcap ${styles.cap}`}>
          FIG. 03 · THE SYMPTOMS SURFACE IN THE P&amp;L. THE CAUSES LIVE IN THE
          OPERATING MODEL. WE SOUND THE WHOLE BERG BEFORE TOUCHING ANYTHING.
        </p>
      </div>
    </SurveySection>
  );
}
