"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { prefersReducedMotion, useScrollFrame } from "@/lib/motion";
import { CONTACT, NAV_ITEMS, SHEET_ROWS } from "@/lib/data";
import SheetIndex from "@/components/SheetIndex";
import styles from "./Header.module.css";

const CALIBRATION_MS = 1150;

/* Tampa, Florida: 27°57.04′N 82°27.43′W — the minutes drift a little with scroll */
function formatCoords(t: number, gp: number): string {
  const latDeg = String(Math.round(27 * t)).padStart(2, "0");
  const lonDeg = String(Math.round(82 * t)).padStart(2, "0");
  const latMin = ((57.04 - gp * 2.3) * t).toFixed(2).padStart(5, "0");
  const lonMin = ((27.43 + gp * 3.1) * t).toFixed(2).padStart(5, "0");
  return `${latDeg}°${latMin}′N · ${lonDeg}°${lonMin}′W`;
}

/**
 * Sticky drawing-strip header. The left side navigates the drawing sets
 * (A./B./C.); on the field edition the navigator folds into a hamburger at
 * the strip's right edge, opening the sheet plate. On load the strip
 * typesets itself and the coordinate readout calibrates from 00°00.00′
 * before joining the scroll drift.
 */
export default function Header() {
  const coordsRef = useRef<HTMLSpanElement>(null);
  const gpRef = useRef(0);
  const calibratingRef = useRef(true);
  const [indexOpen, setIndexOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const onHome = pathname === "/";
  const activeSheet = Math.max(
    0,
    SHEET_ROWS.findIndex((r) =>
      r.href === "/" ? onHome : pathname?.startsWith(r.href)
    )
  );

  useScrollFrame(({ gp }) => {
    gpRef.current = gp;
    if (calibratingRef.current) return;
    const el = coordsRef.current;
    if (el) el.textContent = formatCoords(1, gp);
  });

  useEffect(() => {
    if (prefersReducedMotion()) {
      calibratingRef.current = false;
      return;
    }
    document.documentElement.classList.add("js-anim");
    const el = coordsRef.current;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / CALIBRATION_MS, 1);
      if (el) el.textContent = formatCoords(t, gpRef.current);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        calibratingRef.current = false;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      calibratingRef.current = false;
    };
  }, []);

  return (
    <header className={styles.hdr}>
      <div className={styles.row}>
        <a className={styles.wm} href="/#f1">
          <svg className={styles.mark} viewBox="33 19 53 56" aria-hidden="true">
            <g fill="none" stroke="var(--ink)" strokeWidth="2.2">
              <path d="M52,24 L67,31.5 L53,38.5 L38,31 Z" />
              <path d="M67,31.5 L67,43.5 L53,50.5 L53,38.5" />
              <path d="M67,43.5 L52,51 L66,58 L81,50.5 Z" />
              <path d="M52,51 L52,63 L66,70 L66,58" />
            </g>
          </svg>
          Schulte &amp; Co.
        </a>
        <nav className={styles.nav} aria-label="Drawing sheets">
          {NAV_ITEMS.map((item, i) => {
            const current =
              item.href === "/"
                ? onHome
                : pathname?.startsWith(item.href) ?? false;
            return (
              <a
                key={item.href}
                href={item.href}
                data-snap
                aria-current={current ? "true" : undefined}
                className={[
                  styles.navlink,
                  styles[`n${i + 1}`],
                  current ? styles.on : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{ "--d": `${0.14 + i * 0.07}s` } as React.CSSProperties}
              >
                <span className={styles.fig}>{item.fig}</span>
                {item.label}
              </a>
            );
          })}
        </nav>
        <span className={styles.sp} />
        <a
          className={styles.coords}
          data-snap
          href="https://en.wikipedia.org/wiki/Tampa,_Florida"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Tampa, Florida on Wikipedia"
        >
          <span ref={coordsRef}>27°57.04′N · 82°27.43′W</span>
        </a>
        <a className={styles.cta} data-snap href={CONTACT.workHref}>
          [ WORK WITH US ]
        </a>
        <button
          ref={burgerRef}
          type="button"
          className={styles.burger}
          aria-expanded={indexOpen}
          aria-label="Open the sheet navigator"
          onClick={() => setIndexOpen(true)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
      <span className={styles.rule} aria-hidden="true" />
      <SheetIndex
        open={indexOpen}
        rows={SHEET_ROWS}
        heading="DRAWING SETS · 03 SHEETS"
        activeIndex={activeSheet}
        onClose={() => {
          setIndexOpen(false);
          burgerRef.current?.focus();
        }}
      />
    </header>
  );
}
