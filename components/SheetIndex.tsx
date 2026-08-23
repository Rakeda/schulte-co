"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { prefersReducedMotion } from "@/lib/motion";
import { CONTACT } from "@/lib/data";
import { FIGURES } from "@/lib/figures";
import styles from "./SheetIndex.module.css";

type Props = {
  open: boolean;
  activeIndex: number;
  onClose: () => void;
};

/**
 * The Sheet Index: the field edition's navigation plate. A full-screen
 * chalk sheet listing all seven figures with their key measured value —
 * the sixty-second read of the whole survey. The current figure carries
 * the plate's only vermilion mark.
 */
export default function SheetIndex({ open, activeIndex, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const goTo = (id: string) => {
    onClose();
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    });
  };

  /* portaled to body: the header's own stacking context must not trap the plate */
  return createPortal(
    <div className={styles.plate} role="dialog" aria-modal="true" aria-label="Sheet index">
      <div className={styles.head}>
        <span className={`${styles.ht} mono`}>SHEET INDEX · SEVEN FIGURES</span>
        <button
          ref={closeRef}
          type="button"
          className={`${styles.close} mono`}
          onClick={onClose}
        >
          [ CLOSE ]
        </button>
      </div>
      <div className={styles.rows}>
        {FIGURES.map((f, i) => (
          <button
            key={f.id}
            type="button"
            className={styles.row}
            style={{ "--d": `${i * 0.06}s` } as React.CSSProperties}
            onClick={() => goTo(f.id)}
            aria-current={i === activeIndex ? "true" : undefined}
          >
            <span
              className={`${styles.no} mono ${i === activeIndex ? styles.noOn : ""}`}
            >
              {f.figNo}
            </span>
            <span className={styles.title}>{f.title}</span>
            <span className={`${styles.datum} mono`}>{f.keyDatum}</span>
          </button>
        ))}
      </div>
      <div className={styles.foot}>
        <a
          className={`${styles.coords} mono`}
          href="https://en.wikipedia.org/wiki/Tampa,_Florida"
          target="_blank"
          rel="noopener noreferrer"
        >
          TAMPA, FLORIDA · 27°57′N 82°27′W
        </a>
        <a className={`${styles.cta} mono`} href={CONTACT.workHref}>
          [ WORK WITH US ]
        </a>
      </div>
    </div>,
    document.body
  );
}
