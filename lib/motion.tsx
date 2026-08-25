"use client";

/**
 * The motion system for the Federal Survey.
 *
 * One rAF-gated scroll/resize bus feeds every animated system on the page:
 *  - useScrollFrame(cb)      per-frame callback with { y, vh, gp } (gp = global 0..1 progress)
 *  - useResizeVersion()      increments after debounced resize / font load, for geometry rebuilds
 *  - useScrub(ref)           draws every `.scrub` SVG stroke inside ref 1:1 with scroll,
 *                            honoring data-delay and firing data-flash targets on completion
 *  - useReveal(ref)          IntersectionObserver arming `.wipe` / `.rowin` arrivals
 *  - prefersReducedMotion()  read once at effect time; every system degrades to fully drawn
 */

import { useEffect, useRef, useState } from "react";

export type Frame = { y: number; vh: number; gp: number };

const subs = new Set<(f: Frame) => void>();
let busStarted = false;
let ticking = false;

function measure(): Frame {
  const y = window.scrollY;
  const vh = window.innerHeight;
  const span = document.body.scrollHeight - vh;
  const gp = span > 0 ? Math.min(Math.max(y / span, 0), 1) : 0;
  return { y, vh, gp };
}

function dispatch() {
  ticking = false;
  const f = measure();
  subs.forEach((cb) => cb(f));
}

function requestFrame() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(dispatch);
  }
}

function ensureBus() {
  if (busStarted || typeof window === "undefined") return;
  busStarted = true;
  window.addEventListener("scroll", requestFrame, { passive: true });
  window.addEventListener("resize", requestFrame);
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ---- the arrival register (ARR / O-4) ----
 * Commanded travel announces its destination; the landing FigureHeader
 * plays the checker's ellipse once the scroll settles. Ambient scrolling
 * never marks anything. Announcements expire after 8s. */
let pendingTarget: string | null = null;
let pendingAt = 0;

export function announceTarget(id: string) {
  pendingTarget = id;
  pendingAt = typeof performance !== "undefined" ? performance.now() : 0;
  window.dispatchEvent(new Event("sc-announce"));
}

export function peekTarget(): string | null {
  if (pendingTarget && performance.now() - pendingAt > 8000) pendingTarget = null;
  return pendingTarget;
}

export function consumeTarget(id: string): boolean {
  if (peekTarget() === id) {
    pendingTarget = null;
    return true;
  }
  return false;
}

export function useScrollFrame(cb: (f: Frame) => void) {
  const ref = useRef(cb);
  ref.current = cb;
  useEffect(() => {
    ensureBus();
    const handler = (f: Frame) => ref.current(f);
    subs.add(handler);
    handler(measure());
    return () => {
      subs.delete(handler);
    };
  }, []);
}

/** Bumps after debounced resizes and once fonts are ready — rebuild geometry on it. */
export function useResizeVersion(): number {
  const [v, setV] = useState(0);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const bump = () => setV((x) => x + 1);
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(bump, 180);
    };
    window.addEventListener("resize", onResize);
    if (document.fonts?.ready) document.fonts.ready.then(bump);
    window.addEventListener("load", bump);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", bump);
    };
  }, []);
  return v;
}

type ScrubItem = {
  el: SVGGeometryElement;
  len: number;
  delay: number;
  done: boolean;
};

/** Scroll-scrubbed stroke drawing for every `.scrub` geometry inside the container. */
export function useScrub(containerRef: React.RefObject<HTMLElement | null>) {
  const itemsRef = useRef<ScrubItem[]>([]);
  const rmRef = useRef(false);
  const version = useResizeVersion();

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    rmRef.current = prefersReducedMotion();
    const items: ScrubItem[] = [];
    root.querySelectorAll<SVGGeometryElement>(".scrub").forEach((el) => {
      let len: number;
      try {
        len = el.getTotalLength();
      } catch {
        return;
      }
      el.style.strokeDasharray = `${len} ${len}`;
      items.push({
        el,
        len,
        delay: parseFloat(el.dataset.delay ?? "0"),
        done: false,
      });
    });
    itemsRef.current = items;
    requestFrame();
  }, [containerRef, version]);

  useScrollFrame(({ vh, gp }) => {
    const rm = rmRef.current;
    for (const s of itemsRef.current) {
      const svg = s.el.ownerSVGElement ?? (s.el as unknown as SVGSVGElement);
      const r = svg.getBoundingClientRect();
      let p: number;
      if (r.height > vh * 0.85) {
        p = (vh * 1.18 - r.top) / r.height;
      } else {
        p = (vh * 1.28 - r.top) / (vh * 0.55);
      }
      p = Math.min(Math.max(p, 0), 1);
      if (s.delay) p = Math.min(Math.max((p - s.delay) / (1 - s.delay), 0), 1);
      // at the very end of the page nothing can rise to the trigger line,
      // so complete whatever is still pending
      if (rm || gp > 0.985) p = 1;
      s.el.style.strokeDashoffset = String(s.len * (1 - p));
      if (p >= 1 && !s.done) {
        s.done = true;
        const id = s.el.dataset.flash;
        if (id) {
          const f = document.getElementById(id);
          if (f && (!rm || f.classList.contains("flashkeep"))) {
            f.classList.add("flashed");
          }
        }
      }
    }
  });
}

/**
 * Arms `.wipe` / `.rowin` arrivals inside the container. Reveals ride the
 * same scroll-frame bus as every other system (no IntersectionObserver):
 * the bus fires once on mount and on every scroll, so above-the-fold
 * content arrives immediately and the rest as it enters the viewport.
 * No-ops under reduced motion — the hidden state is gated on `.js-anim`.
 */
export function useReveal(containerRef: React.RefObject<HTMLElement | null>) {
  const pendingRef = useRef<Element[]>([]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    if (prefersReducedMotion()) return;
    document.documentElement.classList.add("js-anim");
    pendingRef.current = Array.from(
      root.querySelectorAll(".wipe, .rowin")
    ).filter((el) => !el.classList.contains("in"));
    requestFrame();
  }, [containerRef]);

  useScrollFrame(({ vh, gp }) => {
    const pending = pendingRef.current;
    if (!pending.length) return;
    const still: Element[] = [];
    for (const el of pending) {
      const r = el.getBoundingClientRect();
      if ((r.top < vh * 1.25 && r.bottom > 0) || gp > 0.985) {
        el.classList.add("in");
      } else {
        still.push(el);
      }
    }
    pendingRef.current = still;
  });
}
