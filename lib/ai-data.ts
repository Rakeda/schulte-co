/**
 * Schedule B: The AI Practice. All content for /ai.
 * The argument: alignment before automation. A functional roadmap with
 * ownership, drawn from the organization itself, not a pile of tools.
 */

export type AiFigure = {
  id: string;
  figNo: string;
  title: string;
  keyDatum: string;
};

export const AI_FIGURES: AiFigure[] = [
  { id: "b1", figNo: "B1", title: "A ROADMAP, NOT A TOOLBOX", keyDatum: "ALIGNMENT BEFORE AUTOMATION" },
  { id: "b2", figNo: "B2", title: "THE TOOL PILE", keyDatum: "78¢ ON THE DOLLAR, SHELVED" },
  { id: "b3", figNo: "B3", title: "THE FUNCTION SURVEY", keyDatum: "EVERY SOP, WALKED" },
  { id: "b4", figNo: "B4", title: "ONE CANDIDATE, DISSECTED", keyDatum: "WHY · SYSTEMS · VALUE" },
  { id: "b5", figNo: "B5", title: "THE ROADMAP", keyDatum: "SEQUENCED · PHASED · OWNED" },
  { id: "b6", figNo: "B6", title: "THE OWNERSHIP REGISTER", keyDatum: "EVERY LINE HAS A NAME" },
];

/* ---------------- B1 · HERO ---------------- */

export const B1_EYEBROW =
  "SCHULTE & CO. · SCHEDULE B · THE AI PRACTICE · SUPPLEMENT TO THE STRUCTURAL SURVEY";

export const B1_LEDE_A =
  "Most companies are adopting AI the way a junk drawer adopts chargers: one purchase at a time, in the hope that it adds up to a system. It never does.";

export const B1_LEDE_B =
  "Alignment is not something you buy. It is something you draw. We survey the organization function by function, find the work where agents genuinely belong, and hand leadership a sequenced roadmap in which every line has an owner, a measure, and a date.";

export const B1_STRIP = [
  "EVERY FUNCTION SURVEYED",
  "CANDIDATES COSTED BEFORE BUILT",
  "ONE SEQUENCED ROADMAP",
  "EVERY LINE OWNED",
];

/* ---------------- B2 · THE TOOL PILE ---------------- */

export const B2_LEDE =
  "Ask a company what its AI strategy is and you will usually hear an inventory: which copilots were bought, which pilots are running, which chatbot sits in the help desk. An inventory is not a strategy. Nobody can say which workflow changed, whose number moved, or who owns the outcome.";

export const PILE_ROWS: Array<{ name: string; tag: string }> = [
  { name: "A license for every team", tag: "SPEND" },
  { name: "A pilot that demos well, then stalls", tag: "STALL" },
  { name: "A chatbot no process asked for", tag: "NOISE" },
  { name: "Two tools doing the same job", tag: "OVERLAP" },
  { name: "Data the tools cannot share", tag: "SILO" },
  { name: "Outcomes nobody owns", tag: "DRIFT" },
];

export const B2_CHART_CAP =
  "FIG. B2 · A DOLLAR OF TOOL SPEND, AUDITED. ONLY THE OXIDE SLICE IS DOING OWNED WORK.";

/** The spend audit: five slices, one of them earning its keep. */
export const SPEND_SLICES: Array<{ label: string; pct: number; kind: "captured" | "unused" | "overlap" | "stalled" | "shelf" }> = [
  { label: "CAPTURED IN OWNED WORKFLOWS", pct: 22, kind: "captured" },
  { label: "UNUSED SEATS", pct: 24, kind: "unused" },
  { label: "OVERLAPPING LICENSES", pct: 18, kind: "overlap" },
  { label: "STALLED PILOTS", pct: 21, kind: "stalled" },
  { label: "SHELFWARE, NO OWNER", pct: 15, kind: "shelf" },
];

export const B2_CROSSREF =
  "THE STANDING RULE FROM THE STRUCTURAL SURVEY STILL GOVERNS HERE:";

/* ---------------- B3 · THE FUNCTION SURVEY ---------------- */

export const B3_LEDE =
  "The roadmap starts in the field, not in a catalog. With your function leaders we map the organization as it actually runs. With the people doing the work we walk every standing procedure step by step, because the point of each step, for the customer, the business, and the employee, has to survive the redesign. Automate work you do not understand and you have only made the mess faster.";

export type SopMark = "agent" | "assist" | "human";

export type SurveyColumn = {
  fn: string;
  sops: Array<{ name: string; mark: SopMark }>;
};

export const SURVEY_COLUMNS: SurveyColumn[] = [
  {
    fn: "SALES & PIPELINE",
    sops: [
      { name: "LEAD TRIAGE", mark: "agent" },
      { name: "QUOTE ASSEMBLY", mark: "assist" },
      { name: "DISCOVERY CALLS", mark: "human" },
      { name: "DORMANT ACCOUNTS", mark: "agent" },
    ],
  },
  {
    fn: "MARKETING",
    sops: [
      { name: "CONTENT DRAFTS", mark: "assist" },
      { name: "CAMPAIGN QA", mark: "agent" },
      { name: "BRAND VOICE", mark: "human" },
      { name: "LIST HYGIENE", mark: "agent" },
    ],
  },
  {
    fn: "CLIENT RELATIONS",
    sops: [
      { name: "STATUS UPDATES", mark: "agent" },
      { name: "ESCALATIONS", mark: "human" },
      { name: "ONBOARDING PACKS", mark: "assist" },
      { name: "MEETING NOTES", mark: "agent" },
    ],
  },
  {
    fn: "OPERATIONS",
    sops: [
      { name: "JOB SCHEDULING", mark: "assist" },
      { name: "INVOICE MATCHING", mark: "agent" },
      { name: "VENDOR CHASE", mark: "agent" },
      { name: "SITE REVIEWS", mark: "human" },
    ],
  },
  {
    fn: "FINANCE & ADMIN",
    sops: [
      { name: "EXPENSE CODING", mark: "agent" },
      { name: "CLOSE CHECKLIST", mark: "assist" },
      { name: "FORECAST NOTES", mark: "human" },
      { name: "PAYROLL PREP", mark: "human" },
    ],
  },
  {
    fn: "DATA & SYSTEMS",
    sops: [
      { name: "CRM HYGIENE", mark: "agent" },
      { name: "REPORT BUILDS", mark: "assist" },
      { name: "ACCESS REVIEWS", mark: "human" },
      { name: "ARCHIVE SEARCH", mark: "agent" },
    ],
  },
];

export const B3_LEGEND =
  "24 SOPS WALKED · ◆ 11 AGENT CANDIDATES · ◐ 6 ASSISTED · ● 7 STAY HUMAN";

export const B3_CANDIDATE_STRIP =
  "FOR EVERY CANDIDATE: WHY THE WORK EXISTS · WHO TOUCHES IT · WHICH SYSTEMS CARRY IT · WHAT IT COSTS TODAY";

export const B3_CHAIRS = [
  {
    who: "WITH FUNCTION LEADERS",
    what: "The map. Functions, handoffs, priorities, and what growth is asking of each of them.",
  },
  {
    who: "WITH THE OPERATORS",
    what: "The truth. The steps as they are actually done, the workarounds, and the why behind every one.",
  },
];

/* ---------------- B4 · ONE CANDIDATE, DISSECTED ---------------- */

export const B4_LEDE =
  "Every candidate earns its place one dissection at a time. Here is the anatomy for a single procedure, a dormant-account re-engagement, written up from our field notes.";

export type AnatomyStep = {
  no: string;
  name: string;
  why: string;
  systems: string;
};

export const ANATOMY_TRIGGER = {
  title: "TRIGGER",
  desc: "AN ACCOUNT GOES QUIET. 45 DAYS, NO LOGGED ACTIVITY.",
};

export const ANATOMY_STEPS: AnatomyStep[] = [
  {
    no: "01",
    name: "PULL THE HISTORY",
    why: "THE TOUCH MUST KNOW THE ACCOUNT",
    systems: "CRM · MAIL ARCHIVE",
  },
  {
    no: "02",
    name: "SCORE THE ACCOUNT",
    why: "NOT EVERY QUIET ACCOUNT SHOULD BE CHASED",
    systems: "CRM · BILLING",
  },
  {
    no: "03",
    name: "DRAFT THE TOUCH",
    why: "IT MUST SOUND LIKE ITS OWNER WROTE IT",
    systems: "MAIL · TEMPLATES",
  },
  {
    no: "04",
    name: "REVIEW & SEND",
    why: "A PERSON STAYS ON THE SEND",
    systems: "MAIL · QUEUE",
  },
];

export const ANATOMY_GATE = {
  title: "THE STACK GATE",
  desc: "CAN THE SYSTEMS YOU ALREADY OWN CARRY IT? IF NOT, THE ROADMAP SAYS SO BEFORE A DOLLAR MOVES.",
};

export const ANATOMY_OUTCOME = {
  title: "OUTCOME",
  desc: "A SPECIFIC TOUCH IN 60 SECONDS, NOT 12 MINUTES. REVIEWED BY A PERSON, EVERY TIME.",
};

export const B4_HOLDS = [
  {
    who: "THE CUSTOMER",
    hold: "A relevant touch that knows the account, not a generic drip.",
  },
  {
    who: "THE BUSINESS",
    hold: "Dormant pipeline reopened at close to zero marginal labor.",
  },
  {
    who: "THE EMPLOYEE",
    hold: "The guilt-work leaves the desk. The judgment stays on it.",
  },
];

export const B4_HOLDS_NOTE =
  "THREE HOLDS, CHECKED FOR EVERY CANDIDATE. IF ANY ONE FAILS, THE CANDIDATE IS STRUCK.";

export const B4_STRUCK = {
  label: "CANDIDATE No. 07 · WEEKLY STATUS RE-KEYING",
  verdict: "RETIRED, NOT AUTOMATED.",
  note: "THE STEP EXISTED ONLY BECAUSE TWO SYSTEMS DID NOT SPEAK. THE BEST AUTOMATION IS DELETION.",
};

/* ---------------- B5 · THE ROADMAP ---------------- */

export const B5_LEDE =
  "What survives costing is sequenced, not launched all at once. Data work precedes the agents that depend on it. The first build is chosen to pay for the second. Each phase ends at a measure, and the measure decides whether the next line starts.";

export const B5_FUNNEL: Array<{ v: number; l: string }> = [
  { v: 24, l: "SOPS WALKED" },
  { v: 11, l: "CANDIDATES MARKED" },
  { v: 6, l: "SURVIVE COSTING" },
  { v: 2, l: "IN THE FIRST BUILD" },
];

export const B5_LEGEND =
  "INK: COMMITTED AND COSTED · DASHED OCHRE: PROPOSED, AWAITING ITS GATE · EVERY BAR CARRIES AN OWNER";

export const B5_NOTE =
  "NO BIG BANG. THE ROADMAP IS A SEQUENCE OF PROOFS, EACH ONE FUNDING THE NEXT.";

export const B5_GATE_REF =
  "THE GATE FROM SCHEDULE A STILL HOLDS: NOTHING IS BUILT UNTIL IT IS COSTED.";

/* ---------------- B6 · THE OWNERSHIP REGISTER ---------------- */

export const B6_LEDE =
  "The reason tool piles fail is not the tools. It is that nothing in the pile has a name attached. On our roadmap, ownership is a column, not a hope: every line names the person who answers for the measure, and the cadence on which they answer.";

export const REGISTER_ROWS: Array<{
  code: string;
  initiative: string;
  owner: string;
  measure: string;
  review: string;
}> = [
  { code: "R-01", initiative: "Dormant-account re-engagement", owner: "HEAD OF SALES", measure: "REPLIES / WK", review: "WEEKLY" },
  { code: "R-02", initiative: "Invoice matching agent", owner: "CONTROLLER", measure: "DAYS TO CLOSE", review: "MONTHLY" },
  { code: "R-03", initiative: "Knowledge capture & archive search", owner: "OPS LEAD", measure: "TIME TO ANSWER", review: "MONTHLY" },
  { code: "R-04", initiative: "Data spine: CRM ↔ billing", owner: "DATA STEWARD", measure: "MATCH RATE", review: "WEEKLY" },
];

export const B6_ROLES = [
  { role: "EXECUTIVE SPONSOR", note: "Clears the path. Answers for the whole schedule." },
  { role: "FUNCTION OWNER", note: "Answers for the measure on every line in their lane." },
  { role: "PROCESS STEWARD", note: "Keeps the SOP true as the work changes." },
  { role: "DATA STEWARD", note: "Keeps the systems speaking to each other." },
];

export const B6_LIVING =
  "WHEN A MEASURE DRIFTS, THE ROADMAP IS REDRAWN. A ROADMAP THAT CANNOT CHANGE IS A POSTER.";

export const DELIVERABLES: Array<{ code: string; name: string }> = [
  { code: "D-01", name: "The function map, as the company actually runs" },
  { code: "D-02", name: "The costed candidate register, survivors and struck alike" },
  { code: "D-03", name: "The phased roadmap, sequenced by dependency and return" },
  { code: "D-04", name: "The ownership register, with measures and cadence" },
  { code: "D-05", name: "The first working build, proven, taught, and handed back" },
];

export const B6_TEMPLATE_NOTE_HEAD = "A NOTE ON TEMPLATE LIBRARIES";

export const B6_TEMPLATE_NOTE =
  "An industry template can tell you what companies like yours automate. It cannot tell you why your steps exist, which of them should not, or who will answer for the outcome. That takes a survey, and a surveyor.";

export const B6_COLOPHON =
  "SCHEDULE B · THE AI PRACTICE · A SUPPLEMENT TO THE STRUCTURAL SURVEY · DRAWING STATUS: DESIGN STUDY · NOT FOR CONSTRUCTION";
