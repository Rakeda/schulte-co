/**
 * All site content for Schulte & Co., Business Architecture & Transformation.
 * Sourced from docs-given/summary.docx and design-by-powerpoint.pptx.
 * Components stay purely presentational; every fact and phrase lives here.
 */

export const COMPANY = "Schulte & Co.";

export const CONTACT = {
  email: "work@schulteand.co",
  workHref: "mailto:work@schulteand.co?subject=Working%20together",
  gapsHref: "mailto:work@schulteand.co?subject=Find%20the%20gaps",
  startHref: "mailto:work@schulteand.co?subject=Start%20with%20one%20problem",
  aiHref: "mailto:work@schulteand.co?subject=AI%2C%20properly",
  secHref: "mailto:work@schulteand.co?subject=Commission%20Schedule%20C",
};

/** Header navigator: curated figures, keyed by section index (0 = FIG. 01). */
export type NavItem = { fig: string; label: string; href: string; index: number };

/* The header navigates between drawing sets; each page carries its own
   index of figures at the top of the sheet (see SECTION_LINKS_*). */
export const NAV_ITEMS: NavItem[] = [
  { fig: "A.", label: "LANDING", href: "/", index: -2 },
  { fig: "B.", label: "AI PLANNING", href: "/ai", index: -1 },
  { fig: "C.", label: "SECURITY", href: "/security", index: -3 },
];

export type SectionLink = { fig: string; label: string; href: string };

export const SECTION_LINKS_HOME: SectionLink[] = [
  { fig: "02", label: "PROBLEM", href: "#f2" },
  { fig: "03", label: "COSTS", href: "#f3" },
  { fig: "04", label: "METHOD", href: "#f4" },
  { fig: "05", label: "VALUE", href: "#f5" },
  { fig: "06", label: "AI", href: "#f6" },
  { fig: "07", label: "PARTNERS", href: "#f7" },
];

export const SECTION_LINKS_AI: SectionLink[] = [
  { fig: "B2", label: "THE TOOL PILE", href: "#b2" },
  { fig: "B3", label: "FUNCTION SURVEY", href: "#b3" },
  { fig: "B4", label: "ANATOMY", href: "#b4" },
  { fig: "B5", label: "ROADMAP", href: "#b5" },
  { fig: "B6", label: "OWNERSHIP", href: "#b6" },
];

export const SECTION_LINKS_SEC: SectionLink[] = [
  { fig: "C2", label: "BINDER TEST", href: "#c2" },
  { fig: "C3", label: "ENVIRONMENT", href: "#c3" },
  { fig: "C4", label: "RECONSTRUCTION", href: "#c4" },
  { fig: "C5", label: "BLIND CASE", href: "#c5" },
  { fig: "C6", label: "FOUR HOURS", href: "#c6" },
  { fig: "C7", label: "READINESS", href: "#c7" },
  { fig: "C8", label: "TRAINING", href: "#c8" },
];

/** Hero data strip: measured values (ochre) with their labels. */
export const DATA_STRIP: Array<{ v: number | string; l: string; prefix?: string; suffix?: string }> = [
  { v: 8, l: "STEPS" },
  { v: "ONE", l: "GATE" },
  { v: 823, l: "HRS SAVED / YR" },
  { v: 61725, l: "RECOVERED", prefix: "≈$" },
  { v: "ONE", l: "WORKFLOW" },
];

/** The land-and-expand entry points — one real pain point opens the engagement. */
export const ENTRY_POINTS = [
  "Sales and delivery do not communicate well.",
  "Customer information is fragmented.",
  "Too much of the work is manual.",
  "Leadership is involved in everything.",
  "The company wants to implement AI.",
  "A newly acquired business needs integrating.",
  "Sales is not scaling.",
  "Software spend is too high.",
  "Employees cannot find prior work.",
  "Processes live in people's heads.",
];

export const ENTRY_CHIPS = [
  "A BROKEN HANDOFF",
  "FRAGMENTED CUSTOMER DATA",
  "MANUAL WORK EVERYWHERE",
  "LEADERSHIP IN EVERYTHING",
  "AN AI MANDATE",
  "AN ACQUISITION TO INTEGRATE",
];

/* ---------------- FIG. 02 — THE PROBLEM ---------------- */

export const GROWTH_ADDS = [
  "Employees",
  "Software",
  "Customers",
  "Vendors",
  "Sales activity",
  "Consultants",
  "Meetings",
  "AI on top",
];

export const MODEL_LAGS = [
  "Unclear ownership",
  "Broken handoffs",
  "Manual processes",
  "Tribal knowledge",
  "Disconnected systems",
];

/* ---------------- FIG. 03 — BELOW THE SURFACE ---------------- */

export const COSTS_VISIBLE = [
  "Missed targets",
  "Slower growth",
  "Margin pressure",
  "Customer frustration",
  "Layoffs",
];

/** Hidden costs, tagged by what they drain (the Quantify dimensions). */
export const COSTS_HIDDEN: Array<{ name: string; tags: string }> = [
  { name: "Wasted employee time", tags: "TIME · LABOR" },
  { name: "Duplicated work", tags: "LABOR" },
  { name: "Poor process design", tags: "MARGIN" },
  { name: "Unclear ownership", tags: "RISK" },
  { name: "Bad handoffs", tags: "CX" },
  { name: "Tribal knowledge", tags: "RISK" },
  { name: "Redundant software", tags: "SPEND" },
  { name: "Weak knowledge management", tags: "TIME" },
  { name: "Key-person dependency", tags: "RISK" },
];

/* ---------------- FIG. 04 — THE METHOD ---------------- */

export type Station = {
  id: string;
  stage: string;
  phase: string;
  product?: string;
  desc: string;
  output?: string;
  note?: string;
  checkpoint?: boolean;
};

export const STATIONS: Station[] = [
  {
    id: "s1",
    stage: "STEP 01",
    phase: "DIAGNOSE",
    product: "Understand",
    desc: "What is the company trying to accomplish? We start with leadership's intent, not a solution looking for a problem.",
    output: "OUTPUT: LEADERSHIP INTENT",
  },
  {
    id: "s2",
    stage: "STEP 02",
    phase: "DIAGNOSE",
    product: "Diagnose",
    desc: "How does the business actually operate today, not how the org chart says it does?",
    output: "OUTPUT: THE CURRENT STATE",
  },
  {
    id: "s3",
    stage: "STEP 03",
    phase: "DIAGNOSE",
    product: "Map",
    desc: "People, workflows, systems, ownership, information, handoffs, drawn until the business is visible.",
    output: "OUTPUT: THE OPERATING PICTURE",
  },
  {
    id: "s4",
    stage: "STEP 04",
    phase: "DIAGNOSE",
    product: "Quantify",
    desc: "What the gaps cost in time, labor, revenue, margin, customer experience, risk, and technology spend.",
    output: "OUTPUT: THE COST OF THE GAPS",
  },
  {
    id: "gate",
    stage: "GATE",
    phase: "GATE",
    desc: "Nothing is redesigned until it is costed.",
    note: "THE BUSINESS, MADE VISIBLE · SEE FIG. 03",
    checkpoint: true,
  },
  {
    id: "s5",
    stage: "STEP 05",
    phase: "ARCHITECT",
    product: "Architect",
    desc: "What should the future state look like? The operating model, redesigned on paper first.",
    output: "OUTPUT: THE FUTURE STATE",
  },
  {
    id: "s6",
    stage: "STEP 06",
    phase: "TRANSFORM",
    product: "Implement",
    desc: "Process, people, technology, automation, AI, specialist consultants: the solution follows the problem.",
    output: "OUTPUT: THE CHANGE, SHIPPED",
    note: "NEVER THE OTHER WAY AROUND",
  },
  {
    id: "s7",
    stage: "STEP 07",
    phase: "TRANSFER",
    product: "Institutionalize",
    desc: "Document it. Train the team. Create ownership.",
    output: "OUTPUT: OWNERSHIP",
  },
  {
    id: "s8",
    stage: "STEP 08",
    phase: "TRANSFER",
    product: "Transfer",
    desc: "Leave the company able to run it without us.",
    output: "OUTPUT: INDEPENDENCE",
  },
];

/* ---------------- FIG. 05 — THE FINANCIAL CASE ---------------- */

export const FIN = {
  currentMin: 20,
  futureMin: 1,
  savedMin: 19,
  employees: 10,
  days: 260,
  minYr: 49400,
  hrsYr: 823,
  dollars: 61725,
  rate: 75,
};

/* ---------------- FIG. 06 — AI PHILOSOPHY ---------------- */

export const AI_WRONG = ["BUSINESS PROBLEM", "BUY AI", "AUTOMATE THE MESS"];

export const AI_RIGHT = [
  "PROBLEM",
  "UNDERSTAND & SIMPLIFY",
  "HUMAN · AUTOMATED · AI",
  "IMPLEMENT",
];

export const AI_QUESTIONS_LIST = [
  "What do we already own?",
  "What overlaps?",
  "What is underused?",
  "What should be automated?",
  "Where does AI make sense?",
  "What will this cost as usage scales?",
];

/* ---------------- FIG. 07 — THE PARTNERS & THE CLOSE ---------------- */

export const PARTNERS = [
  {
    name: "Nathan Schulte",
    role: "BUSINESS ARCHITECTURE",
    question: "Why should the CEO care?",
    scope: [
      "Business problem & go-to-market",
      "Workflow gaps & organizational alignment",
      "Leadership priorities & discovery",
      "ROI & the executive story",
    ],
    fieldQuestions: [
      "Where is money being lost?",
      "Where is time being wasted?",
      "Where is growth being constrained?",
      "What makes the company harder to operate?",
      "What must change from a business standpoint?",
    ],
  },
  {
    name: "Brandon Massie",
    role: "TECHNICAL ARCHITECTURE",
    question: "How do we make it work?",
    scope: [
      "Systems, data & integrations",
      "Automation & AI feasibility",
      "Security & risk",
      "Implementation reality & cost at scale",
    ],
    fieldQuestions: [
      "What is technically broken?",
      "Can this be automated? Should AI be used?",
      "What data is required, and what must integrate?",
      "How difficult is implementation?",
      "What will it cost to operate at scale?",
    ],
  },
];

export const FLOW_CHAIN = [
  "BUSINESS PROBLEM",
  "BUSINESS ARCHITECTURE",
  "TECHNICAL ARCHITECTURE",
  "IMPLEMENTATION",
  "ROI",
];

export const WHO_WE_HELP = [
  "Leadership teams",
  "Growing companies",
  "PE-backed businesses",
  "Companies undergoing transformation",
  "Companies implementing AI",
  "Companies integrating acquisitions",
  "Companies that feel harder to run than they should",
];

export const PE_LINE =
  "You have the financial model. We build the operating model required to achieve it.";

export const COLOPHON_LINE =
  "Schulte & Co., Business Architecture & Transformation. Growth by design, not brute force. Worked examples drawn from internal analyses. Surveyed in Gloock, Schibsted Grotesk, and Spline Sans Mono.";
