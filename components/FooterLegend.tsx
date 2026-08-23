import { COLOPHON_LINE } from "@/lib/data";
import styles from "./FooterLegend.module.css";

const SITEMAP: Array<{ sym: string; href: string; label: string }> = [
  { sym: "▤", href: "#f2", label: "THE PROBLEM · FIG. 02" },
  { sym: "≈", href: "#f3", label: "BELOW THE SURFACE · FIG. 03" },
  { sym: "○", href: "#f4", label: "THE METHOD · FIG. 04" },
  { sym: "▦", href: "#f5", label: "THE FINANCIAL CASE · FIG. 05" },
  { sym: "△", href: "#f6", label: "AI PHILOSOPHY · FIG. 06" },
  { sym: "◆", href: "#f7", label: "THE PARTNERS & THE CLOSE · FIG. 07" },
];

const PARTICULARS = [
  "BUSINESS ARCHITECTURE & TRANSFORMATION",
  "PRINCIPLE: GROWTH BY DESIGN, NOT BRUTE FORCE",
  "METHOD: BUILD · PROVE · TEACH · HAND BACK",
  "ENGAGEMENTS START WITH ONE REAL PROBLEM",
];

const TRAVERSE_NOTES = [
  "ONE LINE, HERO TO BENCHMARK",
  "SCRUBBED 1:1 WITH SCROLL: LINEAR, NO EASING",
  "SCROLL BACK AND THE SURVEY UN-DRAWS",
  "THE NIB BELOW IS THE PAGE'S ONLY PERMANENT VERMILION",
];

/** The drawing's title block: symbol key as sitemap, particulars, colophon, status stamp. */
export default function FooterLegend() {
  return (
    <footer className={styles.footer}>
      <div className={styles.legend}>
        <div>
          <h4 className={styles.h4}>LEGEND · SYMBOLS AS SITEMAP</h4>
          <ul className={styles.list}>
            {SITEMAP.map((row) => (
              <li key={row.href + row.sym}>
                <span className={styles.sym}>{row.sym}</span>
                <a href={row.href}>{row.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className={styles.h4}>THE PRACTICE</h4>
          <ul className={styles.list}>
            {PARTICULARS.map((row) => (
              <li key={row}>
                <span className={styles.sym}>·</span>
                {row}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className={styles.h4}>THE TRAVERSE</h4>
          <ul className={styles.list}>
            {TRAVERSE_NOTES.map((row) => (
              <li key={row}>
                <span className={styles.sym}>/</span>
                {row}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className={styles.colo}>{COLOPHON_LINE}</p>
      <span className={styles.status}>
        DRAWING STATUS: DESIGN STUDY · NOT FOR CONSTRUCTION
      </span>
    </footer>
  );
}
