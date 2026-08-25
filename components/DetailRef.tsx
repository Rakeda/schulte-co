"use client";

import { usePathname } from "next/navigation";
import { announceTarget } from "@/lib/motion";
import { ATLAS } from "@/lib/atlas";
import styles from "./DetailRef.module.css";

/**
 * The cross-practice reference mark (C-2): a drafting detail bubble,
 * figure number over sheet letter, wrapping a plain link to the cited
 * figure. Hover or focus raises a flag naming the target; following it
 * hands the landing to the arrival mark (O-4), on this page or across
 * pages. Degrades to an ordinary anchor.
 */
export default function DetailRef({ to, label }: { to: string; label?: string }) {
  const f = ATLAS[to];
  const pathname = usePathname();
  if (!f) return null;
  const samePage = pathname === f.route;
  return (
    <a
      className={styles.ref}
      data-snap
      href={samePage ? `#${f.id}` : f.href}
      onClick={() => {
        if (samePage) {
          announceTarget(f.id);
        } else {
          try {
            sessionStorage.setItem("sc-ref", "1");
          } catch {}
        }
      }}
    >
      <svg className={styles.bub} viewBox="0 0 26 26" aria-hidden="true">
        <circle className="scrub" cx="13" cy="13" r="11.5" fill="none" />
        <line x1="3.5" y1="13" x2="22.5" y2="13" />
        <text x="13" y="10.8" textAnchor="middle">{f.figNo}</text>
        <text x="13" y="22.4" textAnchor="middle">{f.sheet}</text>
      </svg>
      <span className={styles.lab}>{label ?? f.title}</span>
      <span className={`${styles.tt} mono`} aria-hidden="true">
        FIG. {f.figNo} · {f.title} · {f.keyDatum}
      </span>
    </a>
  );
}
