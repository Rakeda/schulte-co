"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { prefersReducedMotion, useScrollFrame } from "@/lib/motion";
import { CONTACT, NAV_ITEMS } from "@/lib/data";
import { FIGURES, Figure } from "@/lib/figures";
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
 * Sticky drawing-strip header. The left side is a figure navigator — curated
 * FIG. links whose active entry burns vermilion under a drawn underline,
 * tracked from the same scroll bus as everything else. On load the strip
 * typesets itself (rule draws, items ink-settle in sequence) and the
 * coordinate readout calibrates from 00°00.00′ before joining the scroll drift.
 */
export default function Header() {
  const coordsRef = useRef<HTMLSpanElement>(null);
  const gpRef = useRef(0);
  const calibratingRef = useRef(true);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [indexOpen, setIndexOpen] = useState(false);
  const [rows, setRows] = useState<Figure[]>(FIGURES);
  const stationRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const onHome = pathname === "/";

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[data-fig]")
    );
    sectionsRef.current = sections;
    /* pages outside the home manifest carry their sheet data on the DOM */
    setRows(
      sections.map((sec, i) => ({
        id: sec.id,
        figNo: sec.dataset.figno ?? FIGURES[i]?.figNo ?? String(i + 1),
        title: sec.dataset.title ?? FIGURES[i]?.title ?? "",
        keyDatum: sec.dataset.datum ?? FIGURES[i]?.keyDatum ?? "",
      }))
    );
  }, [pathname]);

  useScrollFrame(({ y, vh, gp }) => {
    gpRef.current = gp;
    const sections = sectionsRef.current;
    let cur = 0;
    for (let j = 0; j < sections.length; j++) {
      if (sections[j].offsetTop - vh * 0.45 <= y) cur = j;
    }
    if (cur !== activeRef.current) {
      activeRef.current = cur;
      setActive(cur);
    }
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
        <button
          ref={stationRef}
          type="button"
          className={`${styles.station} mono`}
          aria-expanded={indexOpen}
          aria-label="Open the sheet index"
          onClick={() => setIndexOpen(true)}
        >
          FIG {rows[active]?.figNo ?? "01"} /{" "}
          {String(rows.length || 7).padStart(2, "0")}
        </button>
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
      </div>
      <span className={styles.rule} aria-hidden="true" />
      <SheetIndex
        open={indexOpen}
        rows={rows}
        activeIndex={active}
        onClose={() => {
          setIndexOpen(false);
          stationRef.current?.focus();
        }}
      />
    </header>
  );
}
