/**
 * Schedule C: The Security Practice. All content for /security.
 * The argument: an incident plan is a theory until the team has to use it.
 * Survey the estate, reconstruct the investigative conditions, seal a blind
 * case, observe four hours, score what the team can prove, train what failed.
 */

export type SecFigure = {
  id: string;
  figNo: string;
  title: string;
  keyDatum: string;
};

export const SEC_FIGURES: SecFigure[] = [
  { id: "c1", figNo: "C1", title: "PROVE THE RESPONSE", keyDatum: "ONE BLIND CASE · FOUR HOURS" },
  { id: "c2", figNo: "C2", title: "THE BINDER TEST", keyDatum: "POLICY IS NOT PERFORMANCE" },
  { id: "c3", figNo: "C3", title: "THE ENVIRONMENT SURVEY", keyDatum: "WHERE TRUTH COMES FROM" },
  { id: "c4", figNo: "C4", title: "THE RECONSTRUCTION", keyDatum: "FAITHFUL · ISOLATED · DISPOSABLE" },
  { id: "c5", figNo: "C5", title: "THE BLIND CASE", keyDatum: "THREE STATES · SEALED" },
  { id: "c6", figNo: "C6", title: "FOUR HOURS", keyDatum: "240 MINUTES OBSERVED" },
  { id: "c7", figNo: "C7", title: "THE READINESS SCORE", keyDatum: "A MEASURE, NOT AN ANECDOTE" },
  { id: "c8", figNo: "C8", title: "TRAIN WHAT FAILED", keyDatum: "74 → 88" },
];

/* ---------------- C1 · HERO ---------------- */

export const C1_EYEBROW =
  "SCHULTE & CO. · SCHEDULE C · THE SECURITY PRACTICE · INCIDENT READINESS & EVIDENCE";

export const C1_SUBHEAD = "An incident plan is a theory until the team has to use it.";

export const C1_LEDE_A =
  "Your security team has tools, procedures, logs, runbooks, escalation paths, and years of experience. The question leadership actually needs answered is simpler:";

export const C1_QUESTION = "When something happens, can the team determine what is true?";

export const C1_LEDE_B =
  "We survey the environment your organization actually operates, recreate the systems and evidence that matter inside an isolated assessment range, introduce an unknown security condition, and observe your team investigate it for four hours. No production attack. No rehearsed answer. No known outcome.";

export const C1_LEDE_C =
  "At the end, leadership receives an evidence-backed measure of how well the organization can identify an incident, determine its scope, preserve the record, make containment decisions, and explain what actually happened.";

export const C1_STRIP = [
  "ONE ENVIRONMENT MAPPED",
  "ONE RANGE BUILT",
  "ONE BLIND CASE",
  "FOUR HOURS OBSERVED",
  "ONE READINESS SCORE",
];

/* ---------------- C2 · THE BINDER TEST ---------------- */

export const C2_LEDE =
  "Most organizations can show you an incident response plan. The plan says who should respond, which systems should be checked, when leadership should be notified, and what should happen next. It does not tell you whether any of that will happen.";

export const C2_CONTRAST = [
  { what: "A PENETRATION TEST", measures: "whether a weakness can be exploited." },
  { what: "A TABLETOP", measures: "whether a team knows what it should do." },
  { what: "THIS ASSESSMENT", measures: "whether the team can actually investigate the environment it operates." },
];

export const BINDER_DOCUMENTED = [
  "IR PLAN",
  "SIEM",
  "EDR",
  "ESCALATION MATRIX",
  "FORENSIC PROCEDURE",
  "CONTAINMENT PLAN",
];

export const BINDER_OBSERVED = [
  "FIRST OWNER",
  "FIRST QUERY",
  "EVIDENCE FOUND",
  "ESCALATION TIME",
  "EVIDENCE PRESERVED",
  "SCOPE ESTABLISHED",
  "CORRECT DECISION",
];

export const C2_GAP_LINE = "THE GAP IS THE ASSESSMENT";

export const C2_PULL =
  "If someone was in your environment right now, how long would it take your team to prove how they got in, what they touched, whether they are still there, and when it started?";

/* ---------------- C3 · THE ENVIRONMENT SURVEY ---------------- */

export const C3_LEDE_A =
  "A generic cyber range tests generic skills. We start with the environment your team is actually responsible for.";

export const C3_LEDE_B =
  "Working with technology and security leadership, we map the infrastructure, cloud providers, identity systems, critical applications, security controls, logging sources, network boundaries, and operational dependencies that determine how an investigation would actually unfold. Not every system needs to be copied. Every system that changes the investigation needs to be understood.";

export type EnvGroup = { group: string; rows: Array<{ code: string; name: string }> };

export const ENV_GROUPS: EnvGroup[] = [
  {
    group: "INFRASTRUCTURE",
    rows: [
      { code: "E-01", name: "On-premise networks" },
      { code: "E-02", name: "Cloud accounts & subscriptions" },
      { code: "E-03", name: "Containers & orchestration" },
      { code: "E-04", name: "Remote access" },
    ],
  },
  {
    group: "IDENTITY",
    rows: [
      { code: "E-05", name: "Active Directory" },
      { code: "E-06", name: "Cloud identity" },
      { code: "E-07", name: "SSO / MFA" },
      { code: "E-08", name: "Privileged access" },
    ],
  },
  {
    group: "APPLICATIONS",
    rows: [
      { code: "E-09", name: "Critical business services" },
      { code: "E-10", name: "Web applications" },
      { code: "E-11", name: "Databases" },
      { code: "E-12", name: "Third-party services" },
    ],
  },
  {
    group: "SECURITY & EVIDENCE",
    rows: [
      { code: "E-13", name: "SIEM" },
      { code: "E-14", name: "EDR" },
      { code: "E-15", name: "Cloud audit logs" },
      { code: "E-16", name: "Network telemetry" },
      { code: "E-17", name: "Retention & forensic sources" },
    ],
  },
];

export const C3_BOTTOM =
  "WE ARE NOT INVENTORYING TECHNOLOGY. WE ARE MAPPING WHERE TRUTH WOULD HAVE TO COME FROM DURING AN INCIDENT.";

export const C3_PLATE_CAP =
  "FIG. C3 · EVERY ASSET, TRACED TO ITS EVIDENCE. LINES THAT NEVER REACH THE PLANE ARE FINDINGS ALREADY.";

/* ---------------- C4 · THE RECONSTRUCTION ---------------- */

export const C4_LEDE_A =
  "We reproduce the portions of the environment required to make the investigation authentic: representative infrastructure, identities, applications, security tooling, logging relationships, network boundaries, and data flows. The assessment happens there. Production is not the target. Customer information does not need to become training data.";

export const C4_LEDE_B =
  "The objective is not pixel-perfect duplication. It is investigative fidelity: when an analyst follows the evidence, the environment behaves closely enough to the real organization that the decisions mean something.";

export const RECON_PAIRS: Array<{ real: string; range: string }> = [
  { real: "ENTRA ID", range: "DIRECTORY" },
  { real: "AKS", range: "CONTAINER CLUSTER" },
  { real: "M365", range: "MAIL / IDENTITY" },
  { real: "CROWDSTRIKE", range: "ENDPOINT TELEMETRY" },
  { real: "SENTINEL", range: "SIEM" },
  { real: "ERP", range: "REPRESENTATIVE APP" },
  { real: "SQL", range: "REPRESENTATIVE DATA" },
];

export const FIDELITY_MARKS = ["FUNCTIONAL", "TELEMETRY", "IDENTITY", "NETWORK", "INVESTIGATIVE"];

export const C4_PLATE_CAP =
  "FIG. C4 · A SECTION THROUGH BOTH ESTATES. THE RANGE ANSWERS TO THE SAME QUESTIONS; IT JUST CANNOT HURT ANYONE.";

/* ---------------- C5 · THE BLIND CASE ---------------- */

export const C5_LEDE_A =
  "Before the assessment begins, an eligible case is selected from scenarios designed for the reconstructed environment. The responders do not know which state they received. Neither does the evidence give them an immediate answer. That uncertainty is intentional.";

export const C5_LEDE_B =
  "A security team that knows there is a breach behaves differently from one that has to determine whether a breach exists at all.";

export type BlindCase = {
  code: string;
  tag: string;
  line: string;
  body: string;
  question: string;
};

export const BLIND_CASES: BlindCase[] = [
  {
    code: "CASE 01",
    tag: "SIGNAL WITHOUT COMPROMISE",
    line: "Something looks wrong. Nothing is compromised.",
    body: "The team must distinguish suspicious activity from a security incident and build enough evidence to defend that conclusion.",
    question: "Can you prove nothing happened?",
  },
  {
    code: "CASE 02",
    tag: "BOUNDED COMPROMISE",
    line: "Something happened. The first alert is not the full story.",
    body: "One or more systems or identities are affected. Evidence exists across multiple sources, and the team must find where it stops.",
    question: "Can you determine exactly where the incident stops?",
  },
  {
    code: "CASE 03",
    tag: "ESTABLISHED PRESENCE",
    line: "The incident began before the exercise did.",
    body: "Persistence, historical artifacts, and lateral movement may exist across systems and time.",
    question: "How far did the actor get, and how far back can you prove they were there?",
  },
];

export const C5_NOTE =
  "THE DRAW IS BOUNDED, NOT RANDOM: ONLY CASES YOUR ESTATE COULD ACTUALLY PRODUCE ARE ELIGIBLE. THE SEAL BREAKS AT START.";

/* ---------------- C6 · FOUR HOURS ---------------- */

export const C6_LEDE_A =
  "The security and evidence team receives the case exactly as they would receive a real security concern: incomplete information and an environment they must interrogate. For four hours, they investigate. We observe rather than steer.";

export const C6_LEDE_B =
  "We record where they look, what evidence they request, which hypotheses they form, how quickly they abandon bad ones, whether they preserve volatile evidence, how they establish scope, when they escalate, and what actions they would take next. The exercise is not scored by whether someone guesses the answer. It is scored by whether the team's conclusions are supported by evidence.";

export type TimelineStation = { t: string; name: string; sub: string[] };

export const TIMELINE: TimelineStation[] = [
  { t: "00:00", name: "CASE OPENED", sub: ["ALERT DELIVERED", "INITIAL EVIDENCE IN HAND"] },
  { t: "00:15", name: "TRIAGE", sub: ["WHO OWNS IT?", "WHAT IS KNOWN?", "WHAT IS ASSUMPTION?"] },
  { t: "01:00", name: "INVESTIGATION", sub: ["EVIDENCE REQUESTED", "HYPOTHESES FORMED", "SYSTEMS CORRELATED"] },
  { t: "02:00", name: "SCOPE", sub: ["AFFECTED IDENTITIES", "AFFECTED SYSTEMS", "PERSISTENCE?", "EARLIEST ACTIVITY"] },
  { t: "03:00", name: "DECISION", sub: ["CONTAIN?", "OBSERVE?", "ESCALATE?", "PRESERVE?"] },
  { t: "04:00", name: "FINDING", sub: ["WHAT HAPPENED?", "WHAT DID NOT?", "CONFIDENCE?", "SUPPORTING EVIDENCE?"] },
];

export const C6_PLATE_CAP =
  "FIG. C6 · THE INK LINE IS THE TEAM. THE VERMILION LINE IS WHAT ACTUALLY HAPPENED. THE ASSESSMENT MEASURES WHERE, AND WHETHER, THEY MEET.";

/* ---------------- C7 · THE READINESS SCORE ---------------- */

export const C7_LEDE =
  "Security assessments often end with a long list of findings. This one ends with an answer: how prepared is this organization to determine what happened when the answer is not obvious? Every significant observation is tied to the investigation itself.";

export type ScoreDim = { name: string; w: number; s: number; q: string };

export const SCORE_TOTAL = 74;

export const SCORE_DIMS: ScoreDim[] = [
  { name: "TRUTH & SCOPE", w: 25, s: 19, q: "Do we actually know what happened and where it stops?" },
  { name: "EVIDENCE & RIGOR", w: 20, s: 16, q: "Can our conclusions survive scrutiny?" },
  { name: "TIME TO UNDERSTANDING", w: 15, s: 9, q: "How quickly do we go from alert to defensible picture?" },
  { name: "CONTAINMENT JUDGMENT", w: 15, s: 12, q: "Will we act without making it worse or destroying evidence?" },
  { name: "VISIBILITY & COVERAGE", w: 10, s: 6, q: "Do our systems give responders what they need?" },
  { name: "COORDINATION & ESCALATION", w: 10, s: 8, q: "Does the right person know the right thing at the right time?" },
  { name: "DOCUMENTATION", w: 5, s: 4, q: "Can another responder reconstruct our reasoning?" },
];

export const OBSERVED_ROWS: Array<{ code: string; text: string }> = [
  { code: "O-01", text: "Affected identity found in 17 minutes" },
  { code: "O-02", text: "Endpoint telemetry checked before cloud authentication history" },
  { code: "O-03", text: "Earliest known activity missed by 31 hours" },
  { code: "O-04", text: "Proposed containment would have destroyed volatile evidence" },
  { code: "O-05", text: "Escalation occurred only after scope was established" },
];

export const IMPLICATION_ROWS: Array<{ code: string; text: string; good?: boolean }> = [
  { code: "I-01", text: "STRONG INITIAL TRIAGE", good: true },
  { code: "I-02", text: "CLOUD INVESTIGATION GAP" },
  { code: "I-03", text: "TIMELINE RECONSTRUCTION GAP" },
  { code: "I-04", text: "EVIDENCE PRESERVATION GAP" },
];

/* ---------------- C8 · TRAIN WHAT FAILED ---------------- */

export const C8_LEDE_A =
  "A score without improvement is just documentation. The investigation tells us exactly where capability breaks down: technical knowledge, evidence handling, tooling, escalation, process design, communication, or visibility.";

export const C8_LEDE_B =
  "Follow-on sessions are built from those findings. Not generic cybersecurity training. The team trains the decisions it actually struggled to make.";

export const TRAINING_ROWS: Array<{ gap: string; session: string }> = [
  { gap: "Cloud identity correlation", session: "Identity investigation lab" },
  { gap: "Timeline reconstruction", session: "Evidence & chronology lab" },
  { gap: "Weak scoping", session: "Lateral movement hunt" },
  { gap: "Evidence destroyed early", session: "Preservation & containment drill" },
  { gap: "Slow escalation", session: "IR command exercise" },
  { gap: "SIEM blind spot", session: "Telemetry & logging workshop" },
  { gap: "Unclear ownership", session: "Incident command redesign" },
];

export const SEC_DELIVERABLES: Array<{ code: string; name: string; note: string }> = [
  { code: "D-01", name: "The environment map", note: "Systems, identities, controls, telemetry, and evidence relationships" },
  { code: "D-02", name: "The assessment range", note: "A customer-specific, isolated investigative environment" },
  { code: "D-03", name: "The case record", note: "Scenario, ground truth, evidence trail, responder actions, timeline" },
  { code: "D-04", name: "The readiness scorecard", note: "Leadership-level scoring with supporting evidence" },
  { code: "D-05", name: "The capability gap register", note: "People, process, technology, and visibility gaps observed" },
  { code: "D-06", name: "The training plan", note: "Sessions targeted at the capabilities that need improvement" },
  { code: "D-07", name: "The reassessment baseline", note: "A measurable starting point for the next exercise" },
];

export const C8_CLOSE_LINE =
  "WE DO NOT LEAVE LEADERSHIP WITH A LIST OF CVEs. WE LEAVE THEM KNOWING WHAT THEIR TEAM CAN PROVE.";

export const SEC_COLOPHON =
  "SCHEDULE C · THE SECURITY PRACTICE · A SUPPLEMENT TO THE STRUCTURAL SURVEY · DRAWING STATUS: DESIGN STUDY · NOT FOR CONSTRUCTION";
