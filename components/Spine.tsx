"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, useResizeVersion, useScrollFrame } from "@/lib/motion";
import { FIGURES } from "@/lib/figures";
import styles from "./Spine.module.css";

/** Deterministic pseudo-random, so the traverse wanders the same way every visit. */
function pr(i: number): number {
  return Math.abs((((Math.sin(i * 12.9898) * 43758.5453) % 1) + 1) % 1);
}

type Station = { y: number; frac: number; figNo: string };

/**
 * The traverse in the gutter: one wandering line down the whole survey,
 * drawn 1:1 with total scroll progress, with a station tick at each figure
 * datum. Passed stations ink to full strength. On the field edition
 * (<=760px) the same instrument renders as a narrow edge datum.
 */
export default function Spine() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const stnRef = useRef<SVGGElement>(null);
  const lenRef = useRef(0);
  const [stations, setStations] = useState<Station[]>([]);
  const version = useResizeVersion();

  useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    if (!svg || !path) return;
    const H = svg.parentElement?.scrollHeight ?? document.body.scrollHeight;
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

    const span = H - window.innerHeight;
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[data-fig]")
    );
    setStations(
      sections.map((sec, idx) => ({
        y: sec.offsetTop,
        frac: span > 0 ? Math.min(sec.offsetTop / span, 1) : 0,
        figNo: FIGURES[idx]?.figNo ?? "",
      }))
    );
  }, [version]);

  useScrollFrame(({ gp }) => {
    const path = pathRef.current;
    const len = lenRef.current;
    if (path && len) {
      path.style.strokeDashoffset = prefersReducedMotion()
        ? "0"
        : String(len * (1 - gp));
    }
    const g = stnRef.current;
    if (g) {
      const kids = g.children;
      for (let i = 0; i < kids.length; i++) {
        const frac = parseFloat((kids[i] as SVGGElement).dataset.frac ?? "0");
        (kids[i] as SVGGElement).style.opacity =
          gp + 0.002 >= frac ? "1" : "0.35";
      }
    }
  });

  return (
    <svg ref={svgRef} className={styles.spine} aria-hidden="true">
      <path
        ref={pathRef}
        className={styles.path}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
      <g ref={stnRef}>
        {stations.map((s) => (
          <g key={s.figNo + s.y} data-frac={s.frac} style={{ opacity: 0.35 }}>
            <line
              x1="44"
              y1={s.y}
              x2="60"
              y2={s.y}
              stroke="var(--ink)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <text
              className={styles.stnText}
              x="66"
              y={s.y}
              fontSize="8"
              fill="var(--stone)"
              textAnchor="middle"
              transform={`rotate(-90 66 ${s.y})`}
            >
              {s.figNo}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
