import { SectionLink } from "@/lib/data";

/**
 * The index of figures: each sheet carries its own section links at the top
 * of the drawing, the way a plan set opens with its index. The header above
 * only switches between drawing sets (Schedule A, Schedule B).
 */
export default function FigIndex({ items }: { items: SectionLink[] }) {
  return (
    <nav
      className="figindex mono wipe"
      style={{ "--d": ".12s" } as React.CSSProperties}
      aria-label="Index of figures"
    >
      <span className="fxlabel">INDEX OF FIGURES</span>
      {items.map((it) => (
        <a key={it.href} className="fxlink" data-snap href={it.href}>
          <span className="fxno">{it.fig}</span> {it.label}
        </a>
      ))}
    </nav>
  );
}
