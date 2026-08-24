import SurveySection from "@/components/SurveySection";
import FigureHeader from "@/components/FigureHeader";
import {
  B3_CANDIDATE_STRIP,
  B3_CHAIRS,
  B3_LEDE,
  B3_LEGEND,
  SURVEY_COLUMNS,
  SopMark,
} from "@/lib/ai-data";
import styles from "./Ai.module.css";

const COL_X = [85, 240, 395, 550, 705, 860];
const ROW_Y = [60, 100, 140, 180];

function Mark({ mark, cx, cy }: { mark: SopMark; cx: number; cy: number }) {
  if (mark === "agent") {
    return (
      <rect
        x={cx - 4.5}
        y={cy - 4.5}
        width="9"
        height="9"
        transform={`rotate(45 ${cx} ${cy})`}
        fill="var(--verm)"
      />
    );
  }
  if (mark === "assist") {
    return (
      <g>
        <circle cx={cx} cy={cy} r="5" fill="none" stroke="var(--cobalt)" strokeWidth="1.1" />
        <path d={`M${cx},${cy - 5} A5,5 0 0 0 ${cx},${cy + 5} Z`} fill="var(--cobalt)" />
      </g>
    );
  }
  return <circle cx={cx} cy={cy} r="4.5" fill="var(--ink)" />;
}

const MARK_GLYPH: Record<SopMark, { g: string; cls: string; t: string }> = {
  agent: { g: "◆", cls: "markAgent", t: "AGENT" },
  assist: { g: "◐", cls: "markAssist", t: "ASSISTED" },
  human: { g: "●", cls: "markHuman", t: "HUMAN" },
};

/**
 * FIG. B3 — THE FUNCTION SURVEY. Six functions, every standing procedure
 * walked and marked: vermilion diamonds where an agent belongs, cobalt
 * half-moons where it assists, ink dots where the work stays human.
 */
export default function FunctionSurvey() {
  return (
    <SurveySection
      id="b3"
      figNo="B3"
      title="THE FUNCTION SURVEY"
      datum="EVERY SOP, WALKED"
    >
      <div className="inwrap">
        <FigureHeader
          no="FIG. B3"
          title="The Function Survey"
          refText="EVERY FUNCTION · EVERY SOP · EVERY SYSTEM"
        />
        <p className={`${styles.lede} wipe`}>{B3_LEDE}</p>

        <div className={`${styles.wideplate} desk-only`}>
          <svg
            viewBox="0 0 940 270"
            aria-label="Six function columns, each with four standing procedures marked as agent candidate, assisted, or stays human"
          >
            {SURVEY_COLUMNS.map((col, ci) => {
              const cx = COL_X[ci];
              return (
                <g key={col.fn}>
                  <rect
                    x={cx - 70}
                    y="10"
                    width="140"
                    height="26"
                    fill="var(--paper)"
                    stroke="var(--ink)"
                    strokeWidth="1.2"
                  />
                  <text x={cx} y="27" textAnchor="middle" fontSize="8" fill="var(--ink)" fontWeight="600" letterSpacing=".8">
                    {col.fn}
                  </text>
                  <line
                    className="scrub"
                    data-delay={`${ci * 0.08}`}
                    {...(ci === SURVEY_COLUMNS.length - 1 ? { "data-flash": "b3rows" } : {})}
                    x1={cx}
                    y1="36"
                    x2={cx}
                    y2="56"
                    stroke="var(--ink)"
                    strokeWidth="1"
                  />
                </g>
              );
            })}
            <g id="b3rows" className="hatchin">
              {SURVEY_COLUMNS.map((col, ci) => {
                const cx = COL_X[ci];
                return (
                  <g key={col.fn}>
                    {col.sops.map((s, ri) => {
                      const y = ROW_Y[ri];
                      return (
                        <g key={s.name}>
                          <rect
                            x={cx - 70}
                            y={y}
                            width="140"
                            height="32"
                            fill="none"
                            stroke="var(--hair)"
                            strokeWidth="1"
                          />
                          <Mark mark={s.mark} cx={cx - 56} cy={y + 16} />
                          <text x={cx - 44} y={y + 19} fontSize="7.5" fill="var(--ink)" letterSpacing=".4">
                            {s.name}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                );
              })}
              <g transform="translate(0, 246)">
                <rect x="18" y="-4.5" width="9" height="9" transform="rotate(45 22.5 0)" fill="var(--verm)" />
                <text x="34" y="3" fontSize="8.5" fill="var(--ink)">11 AGENT CANDIDATES</text>
                <circle cx="196" cy="0" r="5" fill="none" stroke="var(--cobalt)" strokeWidth="1.1" />
                <path d="M196,-5 A5,5 0 0 0 196,5 Z" fill="var(--cobalt)" />
                <text x="208" y="3" fontSize="8.5" fill="var(--ink)">6 ASSISTED</text>
                <circle cx="300" cy="0" r="4.5" fill="var(--ink)" />
                <text x="312" y="3" fontSize="8.5" fill="var(--ink)">7 STAY HUMAN</text>
                <text x="420" y="3" fontSize="8.5" fill="var(--ochre)" fontWeight="600">24 SOPS WALKED</text>
                <text x="590" y="3" fontSize="8.5" fill="var(--stone)">MARKS SETTLED WITH THE PEOPLE WHO DO THE WORK</text>
              </g>
            </g>
          </svg>
        </div>

        <div className="mob-only">
          {SURVEY_COLUMNS.map((col) => (
            <div key={col.fn} className={styles.mFn}>
              <div className={`${styles.mFnName} mono`}>{col.fn}</div>
              {col.sops.map((s) => {
                const m = MARK_GLYPH[s.mark];
                return (
                  <div key={s.name} className={styles.mSop}>
                    <span className={`${styles.mMark} ${styles[m.cls]}`}>{m.g}</span>
                    <span>{s.name}</span>
                    <span className={`${styles.mTag} mono`}>{m.t}</span>
                  </div>
                );
              })}
            </div>
          ))}
          <p className={`${styles.lnote} mono`}>{B3_LEGEND}</p>
        </div>

        <div className={`${styles.candStrip} mono wipe`}>{B3_CANDIDATE_STRIP}</div>

        <div className={styles.chairs}>
          {B3_CHAIRS.map((c, i) => (
            <div
              key={c.who}
              className={`${styles.chair} wipe`}
              style={{ "--d": `${0.08 + i * 0.1}s` } as React.CSSProperties}
            >
              <div className={`${styles.chairWho} mono`}>{c.who}</div>
              <div className={styles.chairWhat}>{c.what}</div>
            </div>
          ))}
        </div>
      </div>
    </SurveySection>
  );
}
