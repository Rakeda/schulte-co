"use client";

import { useRef } from "react";
import { useReveal, useScrub } from "@/lib/motion";

type Props = {
  id: string;
  className?: string;
  children: React.ReactNode;
};

/**
 * Section scaffold: renders a numbered survey figure region and arms the two
 * motion systems inside it — scroll-scrubbed `.scrub` strokes and
 * `.wipe`/`.rowin` arrivals. `data-fig` registers it with the Baseline.
 */
export default function SurveySection({ id, className, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  useScrub(ref);
  useReveal(ref);
  return (
    <section
      ref={ref}
      id={id}
      data-fig
      className={`fig ${className ?? ""}`.trim()}
    >
      {children}
    </section>
  );
}
