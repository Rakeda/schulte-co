/**
 * The atlas: every figure on every sheet, one lookup. Feeds the
 * cross-practice reference marks (DetailRef) and anything else that needs
 * to point at a figure regardless of which page it lives on.
 */
import { FIGURES, Figure } from "./figures";
import { AI_FIGURES } from "./ai-data";
import { SEC_FIGURES } from "./security-data";

export type AtlasEntry = Figure & {
  sheet: "A" | "B" | "C";
  route: string;
  href: string;
};

function band(figs: Figure[], sheet: "A" | "B" | "C", route: string): AtlasEntry[] {
  return figs.map((f) => ({ ...f, sheet, route, href: `${route}#${f.id}` }));
}

export const ATLAS: Record<string, AtlasEntry> = Object.fromEntries(
  [
    ...band(FIGURES, "A", "/"),
    ...band(AI_FIGURES, "B", "/ai"),
    ...band(SEC_FIGURES, "C", "/security"),
  ].map((e) => [e.id, e])
);
