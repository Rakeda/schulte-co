# Schulte & Co. — Growth by Design

A fully componentized Next.js (App Router, TypeScript, CSS Modules) landing
page for Schulte & Co., a Business Architecture & Transformation consultancy:
a structural survey of a growing business, drawn as an architectural document
whose continuous traverse line draws 1:1 with scroll. Content sourced from
`docs-given/` (summary.docx + design-by-powerpoint.pptx). Accent inks are
systematic: cobalt = annotations/connections, ochre = measured values,
vermilion = signal (figures, flashes, active nav, the nib, CTAs).

Sections: 01 Growth by Design · 02 The Problem · 03 Below the Surface ·
04 The Method (Schedule A: 8 steps + gate) · 05 The Financial Case ·
06 AI Philosophy (dark plate) · 07 The Partners & the Close.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm run start
```

## Architecture

```
app/
  layout.tsx            fonts (next/font: Gloock, Schibsted Grotesk, Spline Sans Mono), metadata
  page.tsx              composition: Header → Spine + 9 sections → Baseline + BracketCursor
  globals.css           design tokens, base type, arrival/flash keyframes
lib/
  data.ts               ALL content (stations, gazetteer, landmarks, quadrangles,
                        observations, triangulation net) — components stay presentational
  motion.tsx            the motion system: one rAF scroll-frame bus feeding
                        useScrollFrame / useScrub / useReveal / useResizeVersion
components/
  Header.tsx            sticky drawing strip; coordinate readout drifts with scroll
  Spine.tsx             the gutter traverse — one wandering line, document-height,
                        drawn by total scroll progress (deterministic pseudo-random path)
  Baseline.tsx          the signature strip map: per-figure ticks, vermilion nib at 1:1
  BracketCursor.tsx     vermilion corner brackets snap to [data-snap] targets (fine pointers)
  SurveySection.tsx     section scaffold arming useScrub + useReveal
  FigureHeader.tsx      ruled FIG. № header (light + night variants)
  FooterLegend.tsx      title block: legend-as-sitemap, particulars, status stamp
  components/sections/  Hero, Problem, HiddenCosts, Method,
                        FinancialCase, AiPhilosophy, PartnersClose
```

## Motion contract

- One scroll/resize-driven rAF bus (`lib/motion.tsx`); every animated system
  subscribes to it — no IntersectionObserver, no per-component listeners.
- `.scrub` SVG geometry draws via stroke-dashoffset from its viewport position
  (`data-delay` staggers, `data-flash` fires a vermilion flash at completion).
- `RouteMap` measures station anchors from the live DOM and rebuilds the
  traverse path on resize/font-load; scroll back and the route un-draws.
- `prefers-reduced-motion`: everything renders fully drawn, no scrub, no flashes.
