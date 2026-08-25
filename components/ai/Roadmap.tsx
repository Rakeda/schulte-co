import SurveySection from "@/components/SurveySection";
import FigureHeader from "@/components/FigureHeader";
import DetailRef from "@/components/DetailRef";
import Counter from "@/components/Counter";
import {
  B5_FUNNEL,
  B5_GATE_REF,
  B5_LEDE,
  B5_LEGEND,
  B5_NOTE,
} from "@/lib/ai-data";
import styles from "./Ai.module.css";

const LANES = [
  { y: 70, name: "SALES" },
  { y: 120, name: "CLIENT RELATIONS" },
  { y: 170, name: "OPERATIONS" },
  { y: 220, name: "FINANCE" },
  { y: 270, name: "DATA SPINE" },
];

type Bar = {
  lane: number;
  x: number;
  w: number;
  label: string;
  owner?: string;
  proposed?: boolean;
};

/* committed bars in ink (surveyed record); proposed bars dashed ochre,
   the same convention the gutter stair uses for the descent ahead */
const BARS: Bar[] = [
  { lane: 4, x: 130, w: 360, label: "DATA SPINE: CRM ↔ BILLING · DATA STEWARD", owner: "DS" },
  { lane: 0, x: 330, w: 180, label: "DORMANT RE-ENGAGEMENT · HEAD OF SALES", owner: "HS" },
  { lane: 2, x: 340, w: 370, label: "VENDOR CHASE · OPS LEAD", owner: "OL" },
  { lane: 3, x: 540, w: 190, label: "INVOICE MATCHING · CONTROLLER", owner: "CT", proposed: true },
  { lane: 1, x: 550, w: 350, label: "STATUS & MEETING AGENTS · CR LEAD", owner: "CR", proposed: true },
  { lane: 0, x: 750, w: 160, label: "PIPELINE AGENT · PROPOSED", proposed: true },
];

/**
 * FIG. B5 — THE ROADMAP. Function swimlanes across four phases. Committed
 * work is inked; proposed work is dashed ochre until it clears its gate.
 * Every bar carries an owner chip.
 */
export default function Roadmap() {
  return (
    <SurveySection
      id="b5"
      figNo="B5"
      title="THE ROADMAP"
      datum="SEQUENCED · PHASED · OWNED"
    >
      <div className="inwrap">
        <FigureHeader
          no="FIG. B5"
          title="The Roadmap"
          refText="SEQUENCED · PHASED · FUNDED BY ITS OWN RETURNS"
        />
        <p className={`${styles.lede} wipe`}>{B5_LEDE}</p>

        <div className={`${styles.funnel} mono wipe`}>
          {B5_FUNNEL.map((f, i) => (
            <span key={f.l}>
              <span className={`${styles.funnelV} counter`}>
                <Counter value={f.v} />
              </span>{" "}
              <span className={styles.funnelL}>{f.l}</span>
              {i < B5_FUNNEL.length - 1 && (
                <span className={styles.funnelArrow}> → </span>
              )}
            </span>
          ))}
        </div>

        <div className={`${styles.wideplate} desk-only`}>
          <svg
            viewBox="0 0 940 320"
            aria-label="Roadmap swimlanes: five functions across four phases; committed bars inked, proposed bars dashed ochre, every bar with an owner chip"
          >
            <g fontSize="8.5" fill="var(--stone)" letterSpacing="1">
              <text x="203" y="24">NOW</text>
              <text x="404" y="24">PHASE 1</text>
              <text x="614" y="24">PHASE 2</text>
              <text x="812" y="24">AI-NATIVE</text>
            </g>
            <path d="M215,34 l-4,-7 h8 Z" fill="var(--verm)" transform="translate(0, 8)" />
            <g stroke="var(--hair)" strokeWidth="1" strokeDasharray="3 4">
              <line x1="320" y1="34" x2="320" y2="296" />
              <line x1="530" y1="34" x2="530" y2="296" />
              <line x1="740" y1="34" x2="740" y2="296" />
            </g>

            {LANES.map((l, i) => (
              <g key={l.name}>
                <text x="8" y={l.y + 3} fontSize="8" fill="var(--stone)" letterSpacing=".8">
                  {l.name}
                </text>
                <line
                  className="scrub"
                  data-delay={`${i * 0.07}`}
                  {...(i === LANES.length - 1 ? { "data-flash": "b5bars" } : {})}
                  x1="110"
                  y1={l.y}
                  x2="930"
                  y2={l.y}
                  stroke="var(--hair)"
                  strokeWidth="1"
                />
              </g>
            ))}

            <g id="b5bars" className="hatchin">
              {BARS.map((b) => {
                const y = LANES[b.lane].y;
                return (
                  <g key={b.label}>
                    <rect
                      x={b.x}
                      y={y - 9}
                      width={b.w}
                      height="18"
                      fill={b.proposed ? "none" : "var(--paper)"}
                      stroke={b.proposed ? "var(--ochre)" : "var(--ink)"}
                      strokeWidth={b.proposed ? 1 : 1.3}
                      strokeDasharray={b.proposed ? "3 3" : undefined}
                      opacity={b.proposed ? 0.85 : 1}
                    />
                    <text
                      x={b.x + 2}
                      y={y - 14}
                      fontSize="7"
                      fill={b.proposed ? "var(--ochre)" : "var(--ink)"}
                      letterSpacing=".4"
                    >
                      {b.label}
                    </text>
                    {b.owner && (
                      <g>
                        <circle
                          cx={b.x + b.w + 14}
                          cy={y}
                          r="9"
                          fill="var(--paper)"
                          stroke={b.proposed ? "var(--ochre)" : "var(--ink)"}
                          strokeWidth="1"
                          strokeDasharray={b.proposed ? "2 2" : undefined}
                        />
                        <text
                          x={b.x + b.w + 14}
                          y={y + 2.5}
                          textAnchor="middle"
                          fontSize="6.5"
                          fill={b.proposed ? "var(--ochre)" : "var(--ink)"}
                        >
                          {b.owner}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>
          <p className={styles.platecap}>{B5_LEGEND}</p>
        </div>

        <div className={`${styles.lanesM} mob-only`}>
          {LANES.map((l) => (
            <div key={l.name} className={styles.laneM}>
              <div className={`${styles.laneMName} mono`}>{l.name}</div>
              {BARS.filter((b) => LANES[b.lane].name === l.name).map((b) => (
                <span
                  key={b.label}
                  className={`${styles.laneMBar} mono ${b.proposed ? styles.laneMProposed : ""}`}
                >
                  {b.label}
                </span>
              ))}
            </div>
          ))}
          <p className={`${styles.lnote} mono`}>{B5_LEGEND}</p>
        </div>

        <p className={`${styles.crossref} mono`}>
          {B5_NOTE}
          <br />
          <DetailRef to="f4" label={B5_GATE_REF} />
        </p>
      </div>
    </SurveySection>
  );
}
