"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, useResizeVersion, useScrollFrame } from "@/lib/motion";
import { FIGURES } from "@/lib/figures";
import styles from "./Spine.module.css";

/*
 * THE STAIR (desktop only): a switchback stair tower in the gutter, drawn in
 * 2:1 dimetric with FIXED, honest step proportions — 15px tread run,
 * 12px riser, 14px breadth. Section height is absorbed by MORE steps and
 * turns, never by stretching a step. The whole descent pre-exists as a
 * dashed ochre PROPOSAL; scroll sweeps a survey front down the sheet
 * converting it to inked RECORD via one growing clip rect. A vermilion
 * tread-mark walks the nosings. Landings sit at each figure datum.
 * Identity pixel mapping: dimetric geometry never goes near
 * preserveAspectRatio="none".
 *
 * On the field edition (<=760px) the gutter carries no instrument at all —
 * the component renders nothing and the content takes the full width.
 */

const GUT = 92;
// nosing x range; the tread's breadth extends BX *behind* the direction of
// travel (flips with dir), so both bounds reserve BX of margin
const XMIN = 22;
const XMAX = 70;
const DX = 15; // tread run, projected dx (2:1 → dy = 7.5)
const S = 7.5;
const RISE = 12;
const BX = 14; // breadth projection
const BY = 7;
const PITCH = S + RISE;

type Numeral = { x: number; y: number; no: string; yAt: number };

type Built = {
  H: number;
  stairD: string;
  landingsD: string;
  nosings: number[][]; // [ax, ay, bx, by]
  numerals: Numeral[];
};

function buildStair(marks: { y: number; no: string }[], H: number): Built {
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
      // breadth flips with travel so the tread always sits behind the nosing
      const cx = bx - BX * dir;
      const cy = by + BY;
      const dx2 = ax - BX * dir;
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

  return { H, stairD, landingsD, nosings, numerals };
}

export default function Spine() {
  const svgRef = useRef<SVGSVGElement>(null);
  const clipRectRef = useRef<SVGRectElement>(null);
  const markRef = useRef<SVGPathElement>(null);
  const numGroupRef = useRef<SVGGElement>(null);
  const stepIdxRef = useRef(-1);
  const builtRef = useRef<Built | null>(null);
  const [built, setBuilt] = useState<Built | null>(null);
  const version = useResizeVersion();

  useEffect(() => {
    if (window.innerWidth <= 760) {
      builtRef.current = null;
      setBuilt(null);
      return;
    }
    const svg = svgRef.current;
    const H =
      svg?.parentElement?.scrollHeight ?? document.body.scrollHeight;
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[data-fig]")
    );
    const next = buildStair(
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

  useScrollFrame(({ y, vh, gp }) => {
    const b = builtRef.current;
    if (!b) return;
    const rm = prefersReducedMotion();

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
