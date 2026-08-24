import SurveySection from "@/components/SurveySection";
import FigureHeader from "@/components/FigureHeader";
import {
  C6_LEDE_A,
  C6_LEDE_B,
  C6_PLATE_CAP,
  TIMELINE,
} from "@/lib/security-data";
import styles from "./Sec.module.css";

/* station x positions: roughly proportional, opened out at the crowded start */
const XS = [58, 158, 284, 482, 692, 900];

/**
 * FIG. C6 — FOUR HOURS. The investigation timeline above; the ground-truth
 * incident timeline below, running since before the exercise began. The
 * cobalt line is the team's understanding descending to meet it.
 */
export default function FourHours() {
  return (
    <SurveySection
      id="c6"
      figNo="C6"
      title="FOUR HOURS"
      datum="240 MINUTES OBSERVED"
    >
      <div className="inwrap">
        <FigureHeader
          no="FIG. C6"
          title="Four Hours"
          refText="240 MINUTES · ONE TEAM · THEIR PROCESS · THEIR DECISIONS"
        />
        <p className={`${styles.lede} wipe`}>{C6_LEDE_A}</p>
        <p className={`${styles.lede} wipe`} style={{ "--d": ".08s" } as React.CSSProperties}>
          {C6_LEDE_B}
        </p>

        <div className={`${styles.wideplate} desk-only`}>
          <svg
            viewBox="0 0 940 260"
            aria-label="The four-hour investigation timeline with six stations; beneath it, the ground-truth timeline the team's understanding must descend to meet"
          >
            <line className="scrub" x1="40" y1="60" x2="920" y2="60" stroke="var(--ink)" strokeWidth="1.2" />
            {TIMELINE.map((s, i) => (
              <g key={s.t}>
                <circle cx={XS[i]} cy="60" r="5" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.2" />
                <text x={XS[i]} y="40" textAnchor="middle" fontSize="8" fontWeight="600" fill="var(--ochre)" letterSpacing=".8">
                  {s.t}
                </text>
                <text x={XS[i]} y="82" textAnchor="middle" fontSize="8" fontWeight="600" fill="var(--ink)" letterSpacing=".8">
                  {s.name}
                </text>
                {s.sub.map((line, j) => (
                  <text
                    key={line}
                    x={XS[i]}
                    y={96 + j * 11}
                    textAnchor="middle"
                    fontSize="6.6"
                    fill="var(--stone)"
                    letterSpacing=".4"
                  >
                    {line}
                  </text>
                ))}
              </g>
            ))}

            <path className="scrub" data-delay=".12" d="M8,196 H920" fill="none" stroke="var(--verm)" strokeWidth="1.1" strokeDasharray="5 4" />
            <text x="8" y="188" fontSize="7" fill="var(--verm)" letterSpacing=".8">
              GROUND TRUTH · BEGAN BEFORE THE EXERCISE
            </text>

            <path
              className="scrub"
              data-delay=".3"
              data-flash="meetMark"
              d="M152,68 C300,150 460,180 620,196"
              fill="none"
              stroke="var(--cobalt)"
              strokeWidth="1.3"
            />
            <text x="236" y="168" fontSize="7" fill="var(--cobalt)" letterSpacing=".6">
              THE TEAM&apos;S UNDERSTANDING
            </text>
            <g id="meetMark" className="hatchin">
              <circle cx="620" cy="196" r="6" fill="none" stroke="var(--cobalt)" strokeWidth="1.4" />
              <line x1="620" y1="204" x2="620" y2="222" stroke="var(--cobalt)" strokeWidth="0.9" strokeDasharray="2 3" />
              <text x="620" y="236" textAnchor="middle" fontSize="7.5" fontWeight="600" fill="var(--cobalt)" letterSpacing=".8">
                TIMELINES MEET · 02:40
              </text>
              <text x="760" y="222" fontSize="6.8" fill="var(--stone)" letterSpacing=".4">
                SOMETIMES THEY DO NOT MEET.
              </text>
              <text x="760" y="234" fontSize="6.8" fill="var(--stone)" letterSpacing=".4">
                THAT IS ALSO A FINDING.
              </text>
            </g>
          </svg>
          <p className={styles.platecap}>{C6_PLATE_CAP}</p>
        </div>

        <div className="mob-only">
          {TIMELINE.map((s) => (
            <div key={s.t} className={styles.tstep}>
              <div className={`${styles.tstepHead} mono`}>
                <span className={styles.tstepT}>{s.t}</span>
                {s.name}
              </div>
              <div className={`${styles.tstepSub} mono`}>{s.sub.join(" · ")}</div>
            </div>
          ))}
          <p className={`${styles.lnote} mono`}>{C6_PLATE_CAP}</p>
        </div>
      </div>
    </SurveySection>
  );
}
