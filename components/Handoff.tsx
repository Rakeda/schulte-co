"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { useReveal, useScrub } from "@/lib/motion";
import { NEXT_SHEET } from "@/lib/data";
import styles from "./Handoff.module.css";

/**
 * The handoff (C-1): every page ends by starting the next. A full-width
 * rule draws itself 1:1 with the reader's scroll; when it completes, the
 * destination and its thesis arrive. The whole band is one link; on the
 * final sheet it hands to contact instead.
 */
export default function Handoff() {
  const ref = useRef<HTMLDivElement>(null);
  useScrub(ref);
  useReveal(ref);
  const pathname = usePathname();
  const nx = NEXT_SHEET[pathname ?? "/"];
  if (!nx) return null;
  return (
    <div ref={ref} className={styles.band}>
      <div className="inwrap">
        <svg className={styles.rule} viewBox="0 0 1200 10" preserveAspectRatio="none" aria-hidden="true">
          <line className="scrub" x1="0" y1="5" x2="1200" y2="5" />
        </svg>
        <a className={styles.link} data-snap href={nx.href}>
          <span className={`${styles.kick} mono wipe`}>{nx.kicker}</span>
          <span
            className={`${styles.big} wipe`}
            style={{ "--d": ".08s" } as React.CSSProperties}
          >
            {nx.label}
          </span>
          <span
            className={`${styles.thesis} mono wipe`}
            style={{ "--d": ".16s" } as React.CSSProperties}
          >
            {nx.thesis}
          </span>
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </div>
  );
}
