"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion, useResizeVersion, useScrollFrame } from "@/lib/motion";
import styles from "./Spine.module.css";

/** Deterministic pseudo-random, so the traverse wanders the same way every visit. */
function pr(i: number): number {
  return Math.abs(((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1);
}

/**
 * The traverse in the gutter: one wandering line down the whole survey,
 * drawn 1:1 with total scroll progress. Scroll back and it un-draws.
 */
export default function Spine() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const lenRef = useRef(0);
  const version = useResizeVersion();

  useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    if (!svg || !path) return;
    if (getComputedStyle(svg).display === "none") {
      lenRef.current = 0;
      return;
    }
    const H = document.body.scrollHeight;
    svg.setAttribute("viewBox", `0 0 76 ${H}`);
    svg.setAttribute("preserveAspectRatio", "none");
    let d = "M 38,0";
    let y = 0;
    let i = 0;
    while (y < H) {
      const step = 340 + pr(i) * 260;
      const y2 = Math.min(y + step, H);
      const x2 = 20 + pr(i + 7) * 36;
      d += ` C 38,${y + step * 0.4} ${x2},${y + step * 0.6} ${x2},${y2}`;
      y = y2;
      i++;
    }
    path.setAttribute("d", d);
    const len = path.getTotalLength();
    lenRef.current = len;
    path.style.strokeDasharray = `${len} ${len}`;
    if (prefersReducedMotion()) path.style.strokeDashoffset = "0";
  }, [version]);

  useScrollFrame(({ gp }) => {
    const path = pathRef.current;
    const len = lenRef.current;
    if (!path || !len) return;
    path.style.strokeDashoffset = prefersReducedMotion()
      ? "0"
      : String(len * (1 - gp));
  });

  return (
    <svg ref={svgRef} className={styles.spine} aria-hidden="true">
      <path ref={pathRef} className={styles.path} fill="none" />
    </svg>
  );
}
