/**
 * The figures manifest: one source of truth for every instrument that needs
 * the sheet list (header station readout, sheet index, baseline, keyboard
 * rail, spine stations). Every string here already exists in page copy.
 */

export type Figure = {
  id: string;
  figNo: string;
  title: string;
  keyDatum: string;
};

export const FIGURES: Figure[] = [
  { id: "f1", figNo: "01", title: "GROWTH BY DESIGN", keyDatum: "BUILD · PROVE · TEACH · HAND BACK" },
  { id: "f2", figNo: "02", title: "THE PROBLEM", keyDatum: "GROWTH VS. THE OPERATING MODEL" },
  { id: "f3", figNo: "03", title: "BELOW THE SURFACE", keyDatum: "FIVE SYMPTOMS · NINE COSTS" },
  { id: "f4", figNo: "04", title: "THE METHOD", keyDatum: "EIGHT STEPS · ONE GATE" },
  { id: "f5", figNo: "05", title: "THE FINANCIAL CASE", keyDatum: "823 HRS · ≈$61,725 / YR" },
  { id: "f6", figNo: "06", title: "AI PHILOSOPHY", keyDatum: "DO NOT AUTOMATE A BAD PROCESS" },
  { id: "f7", figNo: "07", title: "THE PARTNERS", keyDatum: "BUSINESS ↔ TECHNOLOGY" },
];
