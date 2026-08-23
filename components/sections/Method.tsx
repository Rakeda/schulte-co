import SurveySection from "@/components/SurveySection";
import FigureHeader from "@/components/FigureHeader";
import { ENTRY_CHIPS, STATIONS, type Station } from "@/lib/data";
import styles from "./Method.module.css";

const PHASE_HEADERS: Record<string, string> = {
  s1: "PHASE I · DIAGNOSE · STEPS 01–04",
  s5: "PHASE II · ARCHITECT · STEP 05",
  s6: "PHASE III · TRANSFORM · STEP 06",
  s7: "PHASE IV · TRANSFER · STEPS 07–08",
};

function Node({ station, index, i }: { station: Station; index: number; i: number }) {
  if (station.checkpoint) {
    return (
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
        <path
          className="scrub"
          data-delay={i * 0.07}
          data-flash={`fl-${station.id}`}
          d="M13,3 L23,13 L13,23 L3,13 Z"
          fill="var(--paper)"
          stroke="var(--cobalt)"
          strokeWidth="1.2"
        />
        <circle id={`fl-${station.id}`} className="flashfill" cx="13" cy="13" r="8" />
      </svg>
    );
  }
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
      <circle
        className="scrub"
        data-delay={i * 0.07}
        data-flash={`fl-${station.id}`}
        cx="13"
        cy="13"
        r="9"
        fill="var(--paper)"
        stroke="var(--ink)"
        strokeWidth="1.2"
      />
      <circle id={`fl-${station.id}`} className="flashfill" cx="13" cy="13" r="9" />
      <text x="13" y="16.5" textAnchor="middle" fontSize="8.5" fill="var(--ink)" fontFamily="var(--font-mono)">
        {String(index).padStart(2, "0")}
      </text>
    </svg>
  );
}

/**
 * FIG. 04 — THE METHOD, set as SCHEDULE A: the way a real drawing lists its
 * work. Eight steps and one gate as dense ruled rows grouped by phase, with
 * a single rail drawing itself down the schedule as you scroll. Every row
 * carries the step, its governing question, and what it produces.
 */
export default function Method() {
  return (
    <SurveySection id="f4">
      <div className="inwrap">
        <FigureHeader
          no="FIG. 04"
          title="The Method"
          refText="SCHEDULE A · EIGHT STEPS · ONE GATE"
        />
        <p className={`${styles.intro} wipe`}>
          One methodology, entered through one real pain point. We diagnose
          that problem first, and usually uncover the connected gaps.
        </p>
        <div className={styles.chips}>
          <span className={`${styles.chiplab} mono`}>TYPICAL DOORS IN:</span>
          {ENTRY_CHIPS.map((c, i) => (
            <span
              key={c}
              className={`${styles.chip} mono rowin`}
              style={{ "--d": `${i * 0.07}s` } as React.CSSProperties}
            >
              {c}
            </span>
          ))}
        </div>

        <div className={styles.sched}>
          <svg className={styles.rail} viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden="true">
            <line
              className="scrub"
              x1="1"
              y1="0"
              x2="1"
              y2="100"
              stroke="var(--ink)"
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {STATIONS.map((s, i) => {
            const stepNo = s.checkpoint ? 0 : i < 4 ? i + 1 : i;
            return (
              <div key={s.id}>
                {PHASE_HEADERS[s.id] && (
                  <div className={`${styles.phead} mono rowin`}>
                    {PHASE_HEADERS[s.id]}
                  </div>
                )}
                <div
                  className={`${styles.row} ${s.checkpoint ? styles.gate : ""} rowin`}
                  style={{ "--d": `${0.05 + i * 0.05}s` } as React.CSSProperties}
                >
                  <div className={styles.nodecol}>
                    <Node station={s} index={stepNo} i={i} />
                  </div>
                  <div className={styles.name}>
                    {s.checkpoint ? (
                      <span className={`${styles.gatename} mono`}>THE GATE</span>
                    ) : (
                      s.product
                    )}
                  </div>
                  <div className={styles.desc}>
                    {s.desc}
                    {s.note && !s.checkpoint && (
                      <span className={`${styles.note} mono`}> {s.note}.</span>
                    )}
                  </div>
                  <div className={`${styles.out} mono`}>
                    {s.checkpoint ? (
                      <a href="#f3" data-snap>{s.note}</a>
                    ) : (
                      s.output
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className={`figcap ${styles.cap}`}>
          FIG. 04 · BUILD THE SYSTEM. PROVE THE VALUE. TEACH THE TEAM. HAND IT
          BACK.
        </p>
      </div>
    </SurveySection>
  );
}
