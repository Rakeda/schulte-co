import SurveySection from "@/components/SurveySection";
import FigureHeader from "@/components/FigureHeader";
import DetailRef from "@/components/DetailRef";
import { B2_CHART_CAP, B2_CROSSREF, B2_LEDE, PILE_ROWS } from "@/lib/ai-data";
import styles from "./Ai.module.css";

/**
 * FIG. B2 — THE TOOL PILE. Spend rises under scroll; captured value barely
 * moves; the distance between them hatches itself vermilion. The shelfware
 * gap is this page's version of FIG. 02's operating-model gap.
 */
export default function ToolPile() {
  return (
    <SurveySection
      id="b2"
      figNo="B2"
      title="THE TOOL PILE"
      datum="SPEND RISES · VALUE FLATLINES"
    >
      <div className="inwrap">
        <FigureHeader
          no="FIG. B2"
          title="The Tool Pile"
          refText="A DOLLAR OF TOOL SPEND, AUDITED"
        />
        <p className={`${styles.lede} wipe`}>{B2_LEDE}</p>
        <div className={styles.grid}>
          <div>
            <div className={`${styles.lh} ${styles.lhRed} mono`}>
              HOW THE PILE ACCUMULATES
            </div>
            {PILE_ROWS.map((r, i) => (
              <div
                key={r.name}
                className={`${styles.li} rowin`}
                style={{ "--d": `${i * 0.06}s` } as React.CSSProperties}
              >
                <span className={`${styles.code} ${styles.codeRed} mono`}>
                  P-{String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.liname}>{r.name}</span>
                <span className={`${styles.tag} mono`}>{r.tag}</span>
              </div>
            ))}
            <p className={`${styles.lnote} mono`}>
              EACH LINE DEFENSIBLE ALONE. TOGETHER, A DRAWER.
            </p>
            <p className={`${styles.crossref} mono`}>
              {B2_CROSSREF}{" "}
              <DetailRef to="f6" label="DO NOT AUTOMATE A BAD PROCESS" />
            </p>
          </div>
          <div>
            <div className="desk-only">
              <svg
                viewBox="0 0 440 260"
                aria-label="A pie audit of one dollar of AI tool spend: five slices, only the captured slice doing owned work; shelfware hatched vermilion"
              >
                <defs>
                  <pattern id="pieOchre" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="0" y2="6" stroke="var(--ochre)" strokeWidth="1" opacity=".55" />
                  </pattern>
                  <pattern id="pieVerm" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="0" y2="6" stroke="var(--verm)" strokeWidth="1" opacity=".5" />
                  </pattern>
                </defs>

                <g id="pieFills" className="hatchin">
                  <path d="M118,132 L118,40 A92,92 0 0 1 208.4,114.8 Z" fill="var(--oxide)" opacity=".8" />
                  <path d="M118,132 L208.4,114.8 A92,92 0 0 1 140.9,221.1 Z" fill="url(#pieOchre)" />
                  <path d="M118,132 L140.9,221.1 A92,92 0 0 1 47.1,190.6 Z" fill="var(--stone)" opacity=".35" />
                  <path d="M118,132 L47.1,190.6 A92,92 0 0 1 43.6,77.9 Z" fill="var(--hair)" />
                  <path d="M118,132 L43.6,77.9 A92,92 0 0 1 118,40 Z" fill="url(#pieVerm)" />

                  <text x="232" y="40" fontSize="8" fill="var(--stone)" letterSpacing="1">WHERE THE DOLLAR SITS</text>
                  <g>
                    <rect x="232" y="49" width="13" height="13" fill="var(--oxide)" opacity=".8" stroke="var(--ink)" strokeWidth=".8" />
                    <text x="253" y="59" fontSize="8" fill="var(--ink)">CAPTURED IN OWNED WORKFLOWS</text>
                    <text x="432" y="59" textAnchor="end" fontSize="9" fontWeight="600" fill="var(--ochre)">22¢</text>
                    <rect x="232" y="75" width="13" height="13" fill="url(#pieOchre)" stroke="var(--ink)" strokeWidth=".8" />
                    <text x="253" y="85" fontSize="8" fill="var(--ink)">UNUSED SEATS</text>
                    <text x="432" y="85" textAnchor="end" fontSize="9" fontWeight="600" fill="var(--ochre)">24¢</text>
                    <rect x="232" y="101" width="13" height="13" fill="var(--stone)" opacity=".35" stroke="var(--ink)" strokeWidth=".8" />
                    <text x="253" y="111" fontSize="8" fill="var(--ink)">OVERLAPPING LICENSES</text>
                    <text x="432" y="111" textAnchor="end" fontSize="9" fontWeight="600" fill="var(--ochre)">18¢</text>
                    <rect x="232" y="127" width="13" height="13" fill="var(--hair)" stroke="var(--ink)" strokeWidth=".8" />
                    <text x="253" y="137" fontSize="8" fill="var(--ink)">STALLED PILOTS</text>
                    <text x="432" y="137" textAnchor="end" fontSize="9" fontWeight="600" fill="var(--ochre)">21¢</text>
                    <rect x="232" y="153" width="13" height="13" fill="url(#pieVerm)" stroke="var(--ink)" strokeWidth=".8" />
                    <text x="253" y="163" fontSize="8" fill="var(--ink)">SHELFWARE, NO OWNER</text>
                    <text x="432" y="163" textAnchor="end" fontSize="9" fontWeight="600" fill="var(--ochre)">15¢</text>
                  </g>
                  <line x1="232" y1="180" x2="432" y2="180" stroke="var(--hair)" strokeWidth="1" />
                  <text x="232" y="196" fontSize="8.5" fontWeight="600" fill="var(--verm)" letterSpacing=".5">
                    78¢ OF EVERY DOLLAR NEVER REACHES
                  </text>
                  <text x="232" y="208" fontSize="8.5" fontWeight="600" fill="var(--verm)" letterSpacing=".5">
                    AN OWNED WORKFLOW.
                  </text>
                  <text x="232" y="228" fontSize="8" fill="var(--stone)">
                    THE SURVEY EXISTS TO INVERT THIS PIE.
                  </text>
                </g>

                <circle className="scrub" cx="118" cy="132" r="92" fill="none" stroke="var(--ink)" strokeWidth="1.4" />
                <line className="scrub" data-delay=".15" x1="118" y1="132" x2="118" y2="40" stroke="var(--ink)" strokeWidth="1" />
                <line className="scrub" data-delay=".25" x1="118" y1="132" x2="208.4" y2="114.8" stroke="var(--ink)" strokeWidth="1" />
                <line className="scrub" data-delay=".35" x1="118" y1="132" x2="140.9" y2="221.1" stroke="var(--ink)" strokeWidth="1" />
                <line className="scrub" data-delay=".45" x1="118" y1="132" x2="47.1" y2="190.6" stroke="var(--ink)" strokeWidth="1" />
                <line
                  className="scrub"
                  data-delay=".55"
                  data-flash="pieFills"
                  x1="118"
                  y1="132"
                  x2="43.6"
                  y2="77.9"
                  stroke="var(--ink)"
                  strokeWidth="1"
                />
              </svg>
              <p className={styles.platecap}>{B2_CHART_CAP}</p>
            </div>

            {/* field plate: the same audit with numbered callouts + a notes ledger */}
            <div className="mob-only">
              <svg
                viewBox="0 0 360 250"
                aria-label="A pie audit of one dollar of AI tool spend, with numbered callouts"
              >
                <defs>
                  <pattern id="pieOchreM" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="0" y2="6" stroke="var(--ochre)" strokeWidth="1" opacity=".55" />
                  </pattern>
                  <pattern id="pieVermM" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="0" y2="6" stroke="var(--verm)" strokeWidth="1" opacity=".5" />
                  </pattern>
                </defs>
                <g id="pieFillsM" className="hatchin">
                  <path d="M180,120 L180,30 A90,90 0 0 1 268.4,103.1 Z" fill="var(--oxide)" opacity=".8" />
                  <path d="M180,120 L268.4,103.1 A90,90 0 0 1 202.4,207.2 Z" fill="url(#pieOchreM)" />
                  <path d="M180,120 L202.4,207.2 A90,90 0 0 1 110.7,177.4 Z" fill="var(--stone)" opacity=".35" />
                  <path d="M180,120 L110.7,177.4 A90,90 0 0 1 107.2,67.1 Z" fill="var(--hair)" />
                  <path d="M180,120 L107.2,67.1 A90,90 0 0 1 180,30 Z" fill="url(#pieVermM)" />
                </g>
                <circle className="scrub" cx="180" cy="120" r="90" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
                <line className="scrub" data-delay=".15" x1="180" y1="120" x2="180" y2="30" stroke="var(--ink)" strokeWidth="1" />
                <line className="scrub" data-delay=".25" x1="180" y1="120" x2="268.4" y2="103.1" stroke="var(--ink)" strokeWidth="1" />
                <line className="scrub" data-delay=".35" x1="180" y1="120" x2="202.4" y2="207.2" stroke="var(--ink)" strokeWidth="1" />
                <line className="scrub" data-delay=".45" x1="180" y1="120" x2="110.7" y2="177.4" stroke="var(--ink)" strokeWidth="1" />
                <line
                  className="scrub"
                  data-delay=".55"
                  data-flash="pieFillsM"
                  x1="180"
                  y1="120"
                  x2="107.2"
                  y2="67.1"
                  stroke="var(--ink)"
                  strokeWidth="1"
                />
                <g>
                  <circle cx="218" cy="74" r="9" fill="var(--paper)" stroke="var(--oxide)" strokeWidth="1.2" />
                  <text x="218" y="78" textAnchor="middle" fontSize="11" fill="var(--oxide)">1</text>
                  <circle cx="230.6" cy="152.2" r="9" fill="var(--paper)" stroke="var(--ochre)" strokeWidth="1.2" />
                  <text x="230.6" y="156.2" textAnchor="middle" fontSize="11" fill="var(--ochre)">2</text>
                  <circle cx="161.5" cy="177.1" r="9" fill="var(--paper)" stroke="var(--stone)" strokeWidth="1.2" />
                  <text x="161.5" y="181.1" textAnchor="middle" fontSize="11" fill="var(--stone)">3</text>
                  <circle cx="120" cy="121.9" r="9" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.2" />
                  <text x="120" y="125.9" textAnchor="middle" fontSize="11" fill="var(--ink)">4</text>
                  <circle cx="152.8" cy="66.5" r="9" fill="var(--paper)" stroke="var(--verm)" strokeWidth="1.2" />
                  <text x="152.8" y="70.5" textAnchor="middle" fontSize="11" fill="var(--verm)">5</text>
                </g>
              </svg>
              <div className={styles.notes}>
                <div className={`${styles.noterow} mono`}>
                  <span className={styles.ncode} style={{ color: "var(--oxide)" }}>1</span>
                  CAPTURED IN OWNED WORKFLOWS · 22¢
                </div>
                <div className={`${styles.noterow} mono`}>
                  <span className={styles.ncode} style={{ color: "var(--ochre)" }}>2</span>
                  UNUSED SEATS · 24¢
                </div>
                <div className={`${styles.noterow} mono`}>
                  <span className={styles.ncode}>3</span>
                  OVERLAPPING LICENSES · 18¢
                </div>
                <div className={`${styles.noterow} mono`}>
                  <span className={styles.ncode}>4</span>
                  STALLED PILOTS · 21¢
                </div>
                <div className={`${styles.noterow} mono`}>
                  <span className={styles.ncode} style={{ color: "var(--verm)" }}>5</span>
                  SHELFWARE, NO OWNER · 15¢ · 78¢ NEVER REACHES OWNED WORK
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SurveySection>
  );
}
