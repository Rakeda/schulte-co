"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, useResizeVersion, useScrollFrame } from "@/lib/motion";
import { FIGURES } from "@/lib/figures";
import styles from "./Spine.module.css";

/** Deterministic pseudo-random for the mobile edge datum's gentle wander. */
function pr(i: number): number {
  return Math.abs((((Math.sin(i * 12.9898) * 43758.5453) % 1) + 1) % 1);
}

/*
 * THE STAIR (desktop): a 2:1 dimetric switchback down the gutter.
 * The whole descent exists from first paint as a dashed stone PROPOSAL;
 * scroll sweeps a survey front down the sheet converting it to solid ink
 * RECORD via one growing clip rect. A vermilion tread-mark walks the
 * nosings. Landings sit at each figure datum; flights alternate direction.
 * Identity pixel mapping — dimetric geometry cannot survive non-uniform
 * scaling, so the stair never uses preserveAspectRatio="none".
 *
 * Mobile keeps the simple edge datum line (out of the stair's scope).
 */

const BAND = { l: 6, r: 70 };
const RUN_DX = 46; // total nosing travel per flight
const BR_DX = 18; // breadth projection dx
const BR_DY = 9; // breadth projection dy

type Step = { d: string; yTop: number; ax: number; ay: number; bx: number; by: number };
type Numeral = { x: number; y: number; no: string; yAt: number };

type Built =
  | {
      mode: "stair";
      H: number;
      steps: Step[];
      landings: string[];
      numerals: Numeral[];
    }
  | {
      mode: "line";
      H: number;
      pathD: string;
      ticks: { y: number; frac: number }[];
    };

function buildStair(
  marks: { y: number; no: string }[],
  H: number
): Extract<Built, { mode: "stair" }> {
  const steps: Step[] = [];
  const landings: string[] = [];
  const numerals: Numeral[] = [];
  let y = 24;
  let dir = 1;

  const flight = (toY: number) => {
    const fh = toY - y;
    if (fh < 60) {
      y = toY;
      return;
    }
    const N = Math.max(3, Math.min(Math.round(fh / 44), 34));
    const s = RUN_DX / 2 / N; // per-step travel dy (and dx = 2s)
    const r = Math.max(3, fh / N - s);
    const startX = dir > 0 ? 24 : 52;
    for (let i = 0; i < N; i++) {
      const ax = startX + i * 2 * s * dir;
      const ay = y + i * (s + r);
      const bx = ax + 2 * s * dir;
      const by = ay + s;
      const cx = bx - BR_DX * dir;
      const cy = by + BR_DY;
      const dx = ax - BR_DX * dir;
      const dy = ay + BR_DY;
      const d =
        `M${ax},${ay} L${bx},${by} L${cx},${cy} L${dx},${dy} Z ` +
        `M${bx},${by} L${bx},${by + r} ` +
        `M${bx},${by + r} L${cx},${cy + r} L${cx},${cy}`;
      steps.push({ d, yTop: ay, ax, ay, bx, by });
    }
    y = toY;
  };

  for (const m of marks) {
    flight(m.y);
    const ly = m.y;
    landings.push(
      `M24,${ly} L70,${ly} L52,${ly + BR_DY} L6,${ly + BR_DY} Z ` +
        `M70,${ly} L70,${ly + 6} L52,${ly + 15} L52,${ly + BR_DY}`
    );
    if (m.no) {
      numerals.push({ x: dir > 0 ? 8 : 58, y: ly + 27, no: m.no, yAt: ly });
    }
    y = ly + 20;
    dir = -dir;
  }
  // tail flight: the descent continues to the sheet's foot
  flight(H - 40);
  return { mode: "stair", H, steps, landings, numerals };
}

function buildLine(H: number, sections: HTMLElement[], span: number): Extract<Built, { mode: "line" }> {
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
  return {
    mode: "line",
    H,
    pathD: d,
    ticks: sections.map((sec) => ({
      y: sec.offsetTop,
      frac: span > 0 ? Math.min(sec.offsetTop / span, 1) : 0,
    })),
  };
}

export default function Spine() {
  const svgRef = useRef<SVGSVGElement>(null);
  const linePathRef = useRef<SVGPathElement>(null);
  const lineLenRef = useRef(0);
  const clipRectRef = useRef<SVGRectElement>(null);
  const markRef = useRef<SVGPathElement>(null);
  const numGroupRef = useRef<SVGGElement>(null);
  const tickGroupRef = useRef<SVGGElement>(null);
  const stepIdxRef = useRef(-1);
  const builtRef = useRef<Built | null>(null);
  const [built, setBuilt] = useState<Built | null>(null);
  const version = useResizeVersion();

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const H = svg.parentElement?.scrollHeight ?? document.body.scrollHeight;
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[data-fig]")
    );
    const span = H - window.innerHeight;
    const isMobile = window.innerWidth <= 760;
    const next: Built = isMobile
      ? buildLine(H, sections, span)
      : buildStair(
          sections.map((sec, i) => ({
            y: Math.max(sec.offsetTop, 60),
            no: FIGURES[i]?.figNo ?? "",
          })),
          H
        );
    builtRef.current = next;
    stepIdxRef.current = -1;
    setBuilt(next);
  }, [version]);

  // the mobile line needs its dash length measured after render
  useEffect(() => {
    if (!built || built.mode !== "line") return;
    const path = linePathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    lineLenRef.current = len;
    path.style.strokeDasharray = `${len} ${len}`;
    if (prefersReducedMotion()) path.style.strokeDashoffset = "0";
  }, [built]);

  useScrollFrame(({ y, vh, gp }) => {
    const b = builtRef.current;
    if (!b) return;
    const rm = prefersReducedMotion();

    if (b.mode === "line") {
      const path = linePathRef.current;
      const len = lineLenRef.current;
      if (path && len) {
        path.style.strokeDashoffset = rm ? "0" : String(len * (1 - gp));
      }
      const g = tickGroupRef.current;
      if (g) {
        for (let i = 0; i < g.children.length; i++) {
          const el = g.children[i] as SVGElement;
          const frac = parseFloat(el.dataset.frac ?? "0");
          el.style.opacity = gp + 0.002 >= frac ? "1" : "0.35";
        }
      }
      return;
    }

    // stair: the survey front
    let F = Math.min(Math.max(y + vh * 0.38, 0), b.H);
    if (rm || gp > 0.985) F = b.H;
    clipRectRef.current?.setAttribute("height", F.toFixed(1));

    // the tread underfoot
    let idx = -1;
    for (let i = 0; i < b.steps.length; i++) {
      if (b.steps[i].yTop <= F) idx = i;
      else break;
    }
    if (idx !== stepIdxRef.current) {
      stepIdxRef.current = idx;
      const mark = markRef.current;
      if (mark) {
        if (idx < 0) {
          mark.setAttribute("d", "");
        } else {
          const s = b.steps[idx];
          mark.setAttribute("d", `M${s.ax},${s.ay} L${s.bx},${s.by}`);
        }
      }
    }

    // numerals ink as their landing is passed
    const g = numGroupRef.current;
    if (g) {
      for (let i = 0; i < g.children.length; i++) {
        const el = g.children[i] as SVGElement;
        const at = parseFloat(el.dataset.yat ?? "0");
        el.style.opacity = F >= at ? "1" : "0.35";
      }
    }
  });

  if (!built) {
    return <svg ref={svgRef} className={styles.spine} aria-hidden="true" />;
  }

  if (built.mode === "line") {
    return (
      <svg
        ref={svgRef}
        className={styles.spine}
        viewBox={`0 0 76 ${built.H}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          ref={linePathRef}
          d={built.pathD}
          className={styles.path}
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        <g ref={tickGroupRef}>
          {built.ticks.map((t) => (
            <line
              key={t.y}
              data-frac={t.frac}
              style={{ opacity: 0.35 }}
              x1="44"
              y1={t.y}
              x2="60"
              y2={t.y}
              stroke="var(--ink)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>
      </svg>
    );
  }

  return (
    <svg
      ref={svgRef}
      className={styles.spine}
      viewBox={`0 0 76 ${built.H}`}
      preserveAspectRatio="xMinYMin meet"
      aria-hidden="true"
    >
      <defs>
        <g id="stairGeom">
          {built.steps.map((s) => (
            <path key={s.d} d={s.d} />
          ))}
          {built.landings.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <clipPath id="stairClip">
          <rect ref={clipRectRef} x="0" y="0" width="76" height="0" />
        </clipPath>
      </defs>
      <use href="#stairGeom" className={styles.proposed} />
      <use href="#stairGeom" className={styles.record} clipPath="url(#stairClip)" />
      <path ref={markRef} className={styles.tread} d="" />
      <g ref={numGroupRef}>
        {built.numerals.map((n) => (
          <text
            key={n.no}
            data-yat={n.yAt}
            style={{ opacity: 0.35 }}
            x={n.x}
            y={n.y}
            fontSize="8"
            fill="var(--stone)"
          >
            {n.no}
          </text>
        ))}
      </g>
    </svg>
  );
}
