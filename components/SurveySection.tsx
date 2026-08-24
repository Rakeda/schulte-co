"use client";

import { useRef } from "react";
import { useReveal, useScrub } from "@/lib/motion";

type Props = {
  id: string;
  className?: string;
  children: React.ReactNode;
  /** sheet metadata for pages outside the home manifest (Schedule B, …):
      the chrome instruments read these off the DOM as a fallback */
  figNo?: string;
  title?: string;
  datum?: string;
};

/**
 * Section scaffold: renders a numbered survey figure region and arms the two
 * motion systems inside it — scroll-scrubbed `.scrub` strokes and
 * `.wipe`/`.rowin` arrivals. `data-fig` registers it with the Baseline.
 */
export default function SurveySection({
  id,
  className,
  children,
  figNo,
  title,
  datum,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  useScrub(ref);
  useReveal(ref);
  return (
    <section
      ref={ref}
      id={id}
      data-fig
      data-figno={figNo}
      data-title={title}
      data-datum={datum}
      className={`fig ${className ?? ""}`.trim()}
    >
      {children}
    </section>
  );
}
