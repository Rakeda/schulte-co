import SurveySection from "@/components/SurveySection";
import FigIndex from "@/components/FigIndex";
import { SECTION_LINKS_AI } from "@/lib/data";
import {
  B1_EYEBROW,
  B1_LEDE_A,
  B1_LEDE_B,
  B1_STRIP,
} from "@/lib/ai-data";
import styles from "./Ai.module.css";

/**
 * FIG. B1 — the thesis plate. The drawer of disconnected tools above; the
 * surveyed, sequenced drawing below. The whole page in one figure.
 */
export default function AiHero() {
  return (
    <SurveySection
      id="b1"
      figNo="B1"
      title="A ROADMAP, NOT A TOOLBOX"
      datum="ALIGNMENT BEFORE AUTOMATION"
      className={styles.hero}
    >
      <div className="inwrap">
        <p className={`${styles.eyebrow} mono wipe`}>{B1_EYEBROW}</p>
        <FigIndex items={SECTION_LINKS_AI} />
        <h1 className={`${styles.h1} wipe`} style={{ "--d": ".08s" } as React.CSSProperties}>
          A roadmap,
          <br />
          not a toolbox.
        </h1>
        <div className={styles.heroGrid}>
          <div>
            <p className={`${styles.lede} wipe`} style={{ "--d": ".16s" } as React.CSSProperties}>
              {B1_LEDE_A}
            </p>
            <p className={`${styles.lede} wipe`} style={{ "--d": ".24s" } as React.CSSProperties}>
              {B1_LEDE_B}
            </p>
            <div className={`${styles.strip} mono wipe`} style={{ "--d": ".32s" } as React.CSSProperties}>
              {B1_STRIP.map((s, i) => (
                <span key={s}>
                  <span className={styles.stripItem}>{s}</span>
                  {i < B1_STRIP.length - 1 && <span className={styles.stripDot}>·</span>}
                </span>
              ))}
            </div>
          </div>
          <div className="desk-only">
            <svg
              viewBox="0 0 460 320"
              aria-label="Scattered disconnected AI tools above; the same capability surveyed and redrawn as ordered, owned roadmap lanes below"
            >
              <text x="8" y="14" fontSize="8" fill="var(--stone)" letterSpacing="1">THE DRAWER</text>

              <g fill="none" stroke="var(--stone)" strokeWidth="1" strokeDasharray="3 3">
                <g transform="rotate(-5 62 40)">
                  <rect x="22" y="28" width="80" height="24" />
                </g>
                <g transform="rotate(4 165 34)">
                  <rect x="131" y="22" width="68" height="24" />
                </g>
                <g transform="rotate(-3 262 42)">
                  <rect x="226" y="30" width="72" height="24" />
                </g>
                <g transform="rotate(6 372 34)">
                  <rect x="342" y="22" width="60" height="24" />
                </g>
                <g transform="rotate(3 116 84)">
                  <rect x="82" y="72" width="68" height="24" />
                </g>
                <g transform="rotate(-5 236 90)">
                  <rect x="200" y="78" width="72" height="24" />
                </g>
                <g transform="rotate(2 351 88)">
                  <rect x="314" y="76" width="74" height="24" />
                </g>
              </g>
              <g fontSize="7" fill="var(--stone)">
                <text x="34" y="43" transform="rotate(-5 62 40)">COPILOT ×40</text>
                <text x="142" y="37" transform="rotate(4 165 34)">CHATBOT</text>
                <text x="234" y="45" transform="rotate(-3 262 42)">“AI” ADD-ON</text>
                <text x="352" y="37" transform="rotate(6 372 34)">PILOT #3</text>
                <text x="90" y="87" transform="rotate(3 116 84)">NOTETAKER</text>
                <text x="208" y="93" transform="rotate(-5 236 90)">AGENT BETA</text>
                <text x="320" y="91" transform="rotate(2 351 88)">PROMPT PACK</text>
              </g>

              <g stroke="var(--stone)" strokeWidth="0.9" strokeDasharray="2 3" fill="none" opacity=".8">
                <path d="M104,54 C126,64 142,62 152,72" />
                <path d="M298,56 C314,64 324,68 332,74" />
                <path d="M238,104 C250,112 258,114 266,120" />
              </g>
              <g stroke="var(--verm)" strokeWidth="1.3">
                <path d="M152,68 l7,7 M159,68 l-7,7" />
                <path d="M332,70 l7,7 M339,70 l-7,7" />
                <path d="M266,116 l7,7 M273,116 l-7,7" />
              </g>
              <text x="120" y="132" fontSize="7.5" fill="var(--verm)" letterSpacing="1">
                NO SHARED DATA · NO OWNER · NO SEQUENCE
              </text>

              <line x1="230" y1="142" x2="230" y2="168" stroke="var(--ink)" strokeWidth="1.1" />
              <path d="M230,174 l-4,-7 h8 Z" fill="var(--ink)" />
              <text x="244" y="160" fontSize="7.5" fill="var(--cobalt)" letterSpacing="1">
                SURVEYED &amp; REDRAWN
              </text>

              <text x="8" y="192" fontSize="8" fill="var(--stone)" letterSpacing="1">THE DRAWING</text>
              <g fontSize="7" fill="var(--stone)">
                <text x="94" y="205">NOW</text>
                <text x="196" y="205">PHASE 1</text>
                <text x="296" y="205">PHASE 2</text>
                <text x="386" y="205">AI-NATIVE</text>
              </g>
              <g stroke="var(--hair)" strokeWidth="1" strokeDasharray="3 4">
                <line x1="170" y1="210" x2="170" y2="308" />
                <line x1="270" y1="210" x2="270" y2="308" />
                <line x1="370" y1="210" x2="370" y2="308" />
              </g>
              <path d="M104,210 l-4,-7 h8 Z" fill="var(--verm)" />

              <g fontSize="7" fill="var(--stone)">
                <text x="8" y="228">SALES</text>
                <text x="8" y="263">OPERATIONS</text>
                <text x="8" y="298">DATA SPINE</text>
              </g>
              <line className="scrub" x1="64" y1="225" x2="452" y2="225" stroke="var(--hair)" strokeWidth="1" />
              <line className="scrub" data-delay=".12" x1="64" y1="260" x2="452" y2="260" stroke="var(--hair)" strokeWidth="1" />
              <line
                className="scrub"
                data-delay=".24"
                data-flash="b1bars"
                x1="64"
                y1="295"
                x2="452"
                y2="295"
                stroke="var(--hair)"
                strokeWidth="1"
              />
              <g id="b1bars" className="hatchin">
                <rect x="70" y="288" width="180" height="14" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.2" />
                <circle cx="262" cy="295" r="7" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1" />
                <text x="257" y="297.5" fontSize="6.5" fill="var(--ink)">DS</text>
                <rect x="175" y="218" width="88" height="14" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.2" />
                <circle cx="275" cy="225" r="7" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1" />
                <text x="270" y="227.5" fontSize="6.5" fill="var(--ink)">HS</text>
                <rect x="175" y="253" width="185" height="14" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.2" />
                <circle cx="372" cy="260" r="7" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1" />
                <text x="367" y="262.5" fontSize="6.5" fill="var(--ink)">OL</text>
                <rect x="376" y="218" width="70" height="14" fill="none" stroke="var(--ochre)" strokeWidth="1" strokeDasharray="3 3" opacity=".8" />
              </g>
            </svg>
            <p className={styles.platecap}>
              FIG. B1 · THE SAME SPEND, TWICE. ABOVE: PURCHASED AND HOPED FOR.
              BELOW: SURVEYED, SEQUENCED, AND OWNED.
            </p>
          </div>
        </div>
      </div>
    </SurveySection>
  );
}
