import SurveySection from "@/components/SurveySection";
import FigureHeader from "@/components/FigureHeader";
import {
  ANATOMY_GATE,
  ANATOMY_OUTCOME,
  ANATOMY_STEPS,
  ANATOMY_TRIGGER,
  B4_HOLDS,
  B4_HOLDS_NOTE,
  B4_LEDE,
  B4_STRUCK,
} from "@/lib/ai-data";
import styles from "./Ai.module.css";

/**
 * FIG. B4 — ONE CANDIDATE, DISSECTED. Trigger, steps with their WHY and
 * their systems, the stack-feasibility gate, and the outcome. Below it,
 * the three value holds, and one candidate struck through: retired, not
 * automated.
 */
export default function Anatomy() {
  const stepX = (i: number) => 156 + i * 152;
  return (
    <SurveySection
      id="b4"
      figNo="B4"
      title="ONE CANDIDATE, DISSECTED"
      datum="WHY · SYSTEMS · VALUE"
    >
      <div className="inwrap">
        <FigureHeader
          no="FIG. B4"
          title="One Candidate, Dissected"
          refText="WHY · SYSTEMS · FEASIBILITY · VALUE"
        />
        <p className={`${styles.lede} wipe`}>{B4_LEDE}</p>

        <div className={`${styles.wideplate} desk-only`}>
          <svg
            viewBox="0 0 940 235"
            aria-label="A workflow dissection: trigger, four steps each carrying its why and its systems, the stack gate, and the outcome"
          >
            <line
              className="scrub"
              data-flash="b4boxes"
              x1="16"
              y1="120"
              x2="924"
              y2="120"
              stroke="var(--ink)"
              strokeWidth="1.1"
            />
            <g id="b4boxes" className="hatchin">
              <rect x="16" y="82" width="118" height="76" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.2" />
              <text x="28" y="100" fontSize="8" fontWeight="600" fill="var(--ink)" letterSpacing="1">
                {ANATOMY_TRIGGER.title}
              </text>
              <text fontSize="6.8" fill="var(--stone)" letterSpacing=".4">
                <tspan x="28" y="116">AN ACCOUNT GOES QUIET.</tspan>
                <tspan x="28" y="128">45 DAYS, NO LOGGED</tspan>
                <tspan x="28" y="140">ACTIVITY.</tspan>
              </text>

              {ANATOMY_STEPS.map((s, i) => {
                const x = stepX(i);
                const whyWords = s.why.split(" ");
                const mid = Math.ceil(whyWords.length / 2);
                return (
                  <g key={s.no}>
                    <rect x={x} y="56" width="136" height="128" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.2" />
                    <text x={x + 11} y="74" fontSize="7" fill="var(--stone)">STEP {s.no}</text>
                    <text x={x + 11} y="88" fontSize="7.8" fontWeight="600" fill="var(--ink)" letterSpacing=".5">
                      {s.name}
                    </text>
                    <line x1={x + 11} y1="96" x2={x + 125} y2="96" stroke="var(--hair)" strokeWidth="1" />
                    <text x={x + 11} y="110" fontSize="6" fill="var(--oxide)" fontWeight="600" letterSpacing="1">WHY</text>
                    <text fontSize="6.6" fill="var(--oxide)" letterSpacing=".3">
                      <tspan x={x + 11} y="122">{whyWords.slice(0, mid).join(" ")}</tspan>
                      <tspan x={x + 11} y="133">{whyWords.slice(mid).join(" ")}</tspan>
                    </text>
                    <text x={x + 11} y="152" fontSize="6" fill="var(--stone)" fontWeight="600" letterSpacing="1">SYSTEMS</text>
                    <rect x={x + 11} y="158" width={s.systems.length * 4.4 + 10} height="13" fill="none" stroke="var(--hair)" strokeWidth="1" />
                    <text x={x + 16} y="167" fontSize="6.6" fill="var(--stone)" letterSpacing=".5">
                      {s.systems}
                    </text>
                  </g>
                );
              })}

              <rect
                x="758"
                y="103"
                width="34"
                height="34"
                transform="rotate(45 775 120)"
                fill="var(--paper)"
                stroke="var(--cobalt)"
                strokeWidth="1.4"
              />
              <text x="775" y="88" textAnchor="middle" fontSize="7.5" fontWeight="600" fill="var(--cobalt)" letterSpacing=".8">
                {ANATOMY_GATE.title}
              </text>
              <line x1="775" y1="140" x2="775" y2="196" stroke="var(--cobalt)" strokeWidth="0.8" strokeDasharray="2 3" />
              <text fontSize="6.6" fill="var(--cobalt)" letterSpacing=".3">
                <tspan x="775" y="208" textAnchor="middle">CAN THE SYSTEMS YOU ALREADY OWN CARRY IT?</tspan>
                <tspan x="775" y="220" textAnchor="middle">THE ROADMAP SAYS SO BEFORE A DOLLAR MOVES.</tspan>
              </text>

              <rect x="830" y="70" width="94" height="100" fill="var(--paper)" stroke="var(--verm)" strokeWidth="1.4" />
              <text x="841" y="88" fontSize="8" fontWeight="600" fill="var(--verm)" letterSpacing="1">
                {ANATOMY_OUTCOME.title}
              </text>
              <text fontSize="6.5" fill="var(--ink)" letterSpacing=".3">
                <tspan x="841" y="104">A SPECIFIC TOUCH</tspan>
                <tspan x="841" y="115">IN 60 SECONDS,</tspan>
                <tspan x="841" y="126">NOT 12 MINUTES.</tspan>
                <tspan x="841" y="141">REVIEWED BY A</tspan>
                <tspan x="841" y="152">PERSON, EVERY</tspan>
                <tspan x="841" y="163">TIME.</tspan>
              </text>
            </g>
          </svg>
          <p className={styles.platecap}>
            FIG. B4 · THE WHY RIDES WITH EVERY STEP. AUTOMATION THAT DROPS THE
            WHY DROPS THE VALUE WITH IT.
          </p>
        </div>

        <div className="mob-only">
          <div className={styles.mStep}>
            <div className={`${styles.mStepHead} mono`}>
              <span className={styles.mStepNo}>▸</span>
              {ANATOMY_TRIGGER.title}
            </div>
            <div className={styles.mWhy}>{ANATOMY_TRIGGER.desc}</div>
          </div>
          {ANATOMY_STEPS.map((s) => (
            <div key={s.no} className={styles.mStep}>
              <div className={`${styles.mStepHead} mono`}>
                <span className={styles.mStepNo}>{s.no}</span>
                {s.name}
              </div>
              <div className={`${styles.mWhy} mono`}>WHY: {s.why}</div>
              <div className={`${styles.mSys} mono`}>SYSTEMS: {s.systems}</div>
            </div>
          ))}
          <div className={`${styles.mStep} ${styles.mGate}`}>
            <div className={`${styles.mStepHead} mono`}>
              <span className={styles.mStepNo}>◇</span>
              {ANATOMY_GATE.title}
            </div>
            <div className={`${styles.mWhy} mono`}>{ANATOMY_GATE.desc}</div>
          </div>
          <div className={`${styles.mStep} ${styles.mOutcome}`}>
            <div className={`${styles.mStepHead} mono`}>
              <span className={styles.mStepNo}>■</span>
              {ANATOMY_OUTCOME.title}
            </div>
            <div className={`${styles.mWhy} mono`}>{ANATOMY_OUTCOME.desc}</div>
          </div>
        </div>

        <div className={styles.holds}>
          {B4_HOLDS.map((h, i) => (
            <div
              key={h.who}
              className={`${styles.hold} wipe`}
              style={{ "--d": `${i * 0.09}s` } as React.CSSProperties}
            >
              <div className={`${styles.holdWho} mono`}>{h.who}</div>
              <div className={styles.holdText}>{h.hold}</div>
            </div>
          ))}
        </div>
        <p className={`${styles.holdsNote} mono`}>{B4_HOLDS_NOTE}</p>

        <div className={`${styles.struck} wipe`}>
          <span className={`${styles.struckLabel} mono`}>{B4_STRUCK.label}</span>
          <span className={`${styles.struckVerdict} mono`}>{B4_STRUCK.verdict}</span>
          <div className={`${styles.struckNote} mono`}>{B4_STRUCK.note}</div>
        </div>
      </div>
    </SurveySection>
  );
}
