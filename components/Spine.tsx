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
 * THE STAIR (desktop): a switchback stair tower in the gutter, drawn in
 * 2:1 dimetric with FIXED, honest step proportions — 15px tread run,
 * 12px riser, 14px breadth. Section height is absorbed by MORE steps and
 * turns, never by stretching a step. The whole descent pre-exists as a
 * dashed stone PROPOSAL; scroll sweeps a survey front down the sheet
 * converting it to inked RECORD via one growing clip rect. A vermilion
 * tread-mark walks the nosings. Landings sit at each figure datum.
 * Identity pixel mapping: dimetric geometry never goes near
 * preserveAspectRatio="none".
 *
 * Mobile keeps the simple edge datum line.
 */

const GUT = 92;
const XMIN = 22; // nosing x range [XMIN, XMAX]; breadth extends 14 left of A/B
const XMAX = 82;
const DX = 15; // tread run, projected dx (2:1 → dy = 7.5)
const S = 7.5;
const RISE = 12;
const BX = 14; // breadth projection
const BY = 7;
const PITCH = S + RISE;

type Numeral = { x: number; y: number; no: string; yAt: number };

type Built =
  | {
      mode: "stair";
      H: number;
      stairD: string;
      landingsD: string;
      nosings: number[][]; // [ax, ay, bx, by]
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
  let stairD = "";
  let landingsD = "";
  const nosings: number[][] = [];
  const numerals: Numeral[] = [];
  let x = 52;
  let y = 24;
  let dir = 1;

  const descendTo = (target: number) => {
    while (y + PITCH <= target - 12) {
      let bx = x + DX * dir;
      if (bx > XMAX || bx < XMIN) {
        dir = -dir;
        bx = x + DX * dir;
      }
      const ax = x;
      const ay = y;
      const by = ay + S;
      const cx = bx - BX;
      const cy = by + BY;
      const dx2 = ax - BX;
      const dy2 = ay + BY;
      stairD +=
        `M${ax},${ay} L${bx},${by} L${cx},${cy} L${dx2},${dy2} Z ` +
        `M${bx},${by} L${bx},${by + RISE} ` +
        `M${bx},${by + RISE} L${cx},${cy + RISE} L${cx},${cy} `;
      nosings.push([ax, ay, bx, by]);
      x = bx;
      y = by + RISE;
    }
  };

  for (const m of marks) {
    descendTo(m.y);
    const ly = m.y;
    landingsD +=
      `M${XMIN},${ly} L${XMAX},${ly} L${XMAX - BX},${ly + BY} L${XMIN - BX},${ly + BY} Z ` +
      `M${XMAX},${ly} L${XMAX},${ly + 6} L${XMAX - BX},${ly + BY + 6} L${XMAX - BX},${ly + BY} `;
    numerals.push({
      x: dir > 0 ? XMIN - 14 : XMAX + 1,
      y: ly + 22,
      no: m.no,
      yAt: ly,
    });
    y = ly + BY + 14;
    dir = -dir;
    x = Math.min(Math.max(x, XMIN), XMAX);
  }
  descendTo(H - 36);

  return { mode: "stair", H, stairD, landingsD, nosings, numerals };
}

function buildLine(
  H: number,
  sections: HTMLElement[],
  span: number
): Extract<Built, { mode: "line" }> {
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
            y: Math.max(sec.offsetTop, 80),
            no: FIGURES[i]?.figNo ?? "",
          })),
          H
        );
    builtRef.current = next;
    stepIdxRef.current = -1;
    setBuilt(next);
  }, [version]);

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

    // the survey front
    let F = Math.min(Math.max(y + vh * 0.38, 0), b.H);
    if (rm || gp > 0.985) F = b.H;
    clipRectRef.current?.setAttribute("height", F.toFixed(1));

    // the tread underfoot: last nosing above the front
    const ns = b.nosings;
    let idx = stepIdxRef.current;
    if (idx < 0) idx = 0;
    while (idx < ns.length - 1 && ns[idx + 1][1] <= F) idx++;
    while (idx > 0 && ns[idx][1] > F) idx--;
    if (ns.length === 0 || ns[0][1] > F) idx = -1;
    if (idx !== stepIdxRef.current) {
      stepIdxRef.current = idx;
      const mark = markRef.current;
      if (mark) {
        if (idx < 0) {
          mark.setAttribute("d", "");
        } else {
          const [ax, ay, bx, by] = ns[idx];
          mark.setAttribute("d", `M${ax},${ay} L${bx},${by}`);
        }
      }
    }

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
      viewBox={`0 0 ${GUT} ${built.H}`}
      preserveAspectRatio="xMinYMin meet"
      aria-hidden="true"
    >
      <defs>
        <g id="stairGeom">
          <path d={built.stairD} />
          <path d={built.landingsD} />
        </g>
        <clipPath id="stairClip">
          <rect ref={clipRectRef} x="0" y="0" width={GUT} height="0" />
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
