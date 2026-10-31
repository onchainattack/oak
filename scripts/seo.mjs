// Search-facing facts shared by build-route-pages.mjs (titles, JSON-LD, hub
// pages, feed) and build-sitemap.mjs (hub URLs, lastmod), so the pages and the
// sitemap cannot drift.
import { execFileSync } from "node:child_process";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// First and last commit date (YYYY-MM-DD) per repo path. Needs full history
// (deploy checks out with fetch-depth: 0); without git every lookup misses.
export const gitDates = (root) => {
  const first = new Map();
  const last = new Map();
  try {
    const log = execFileSync("git", ["log", "--format=@%cs", "--name-only", "--no-renames"], {
      cwd: root, encoding: "utf8", maxBuffer: 256 * 1024 * 1024,
    });
    let date = null;
    for (const line of log.split("\n")) {
      if (line.startsWith("@")) date = line.slice(1);
      else if (line && date) {
        if (!last.has(line)) last.set(line, date);
        first.set(line, date); // log is newest first, so the final write is the oldest
      }
    }
  } catch {
    // no git: callers fall back to the build date
  }
  return { first, last };
};

const strip = (value) =>
  String(value ?? "")
    .replace(/\\([\\`*_{}\[\]()#+\-.!|>~$])/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();

// Aggregate files (cohorts, waves, campaigns, multi-year ranges) are not one
// incident, so they keep their descriptive title and stay off the month hubs.
const AGGREGATE_RE = /cohort|wave|class|campaign|ecosystem|series|pattern|advisory|research|landscape|program|playbook/;
export const isSingleIncident = (file) =>
  /^\d{4}-\d{2}-[a-z]/.test(file) && !AGGREGATE_RE.test(file);

// Search wording by the primary Technique's Tactic: a contract or protocol bug
// is an "exploit", a stolen key / compromised operator is a "hack". Other
// Tactics (laundering, attribution, market structure) get no verb at all.
const EXPLOIT_TACTICS = new Set(["T1", "T9", "T10", "T13", "T14", "T16", "T17"]);
const HACK_TACTICS = new Set(["T3", "T4", "T5", "T6", "T11", "T15"]);

const primaryTechnique = (example) =>
  example.root_cause_evidence?.[0]?.technique_id ?? example.techniques?.[0] ?? "";

export const exampleFacts = (example, markdown) => {
  const h1 = strip(markdown.match(/^#\s+(.+)$/m)?.[1] ?? example.title ?? example.id);
  const victim = strip(h1.split(" — ")[0].replace(/\s*\([^)]*\)\s*/g, " "));
  const iso = h1.match(/(\d{4}-\d{2}-\d{2})(?!.*\d{4}-\d{2}-\d{2})/)?.[1] ?? "";
  const ym = iso.slice(0, 7) || String(example.date_prefix ?? "").slice(0, 7);
  // Multi-year files ("2011-2025-…") have no month: m is out of range there.
  const [y, mRaw] = ym.split("-").map(Number);
  const m = mRaw >= 1 && mRaw <= 12 ? mRaw : 0;
  const span = String(example.file ?? "").match(/^(\d{4})-(\d{4})-/);
  const lossLine = strip(markdown.match(/^\*\*Loss:\*\*\s*(.+)$/m)?.[1] ?? "").slice(0, 90);
  // "$6.3B", "$821,920", or a range "$2.5–2.7M" (kept as a range).
  const lossMatch = lossLine.match(
    /\$\s?(\d[\d,.]*)(?:\s*[–-]\s*\$?(\d[\d,.]*))?\s*(K|M|B|k|million|billion)?\b/,
  );
  const unit = { k: "K", million: "M", billion: "B" }[lossMatch?.[3]] ?? lossMatch?.[3] ?? "";
  const trim = (n) => n.replace(/[.,]$/, "");
  const loss = lossMatch
    ? `$${trim(lossMatch[1])}${lossMatch[2] ? `–${trim(lossMatch[2])}` : ""}${unit}`
    : "";
  const tactic = primaryTechnique(example).match(/OAK-(T\d+)\./)?.[1] ?? "";
  const verb = !isSingleIncident(example.file ?? "") || /\b(hack|exploit|attack|breach|drain|theft|compromise|scam)/i.test(victim)
    ? ""
    : EXPLOIT_TACTICS.has(tactic) ? "exploit" : HACK_TACTICS.has(tactic) ? "hack" : "";
  return {
    h1,
    victim,
    iso,
    ym,
    monthLabel: y && m ? `${MONTHS[m - 1]} ${y}` : "",
    dateLabel:
      iso && m ? `${MONTHS_LONG[m - 1]} ${Number(iso.slice(8, 10))}, ${y}`
      : y && m ? `${MONTHS_LONG[m - 1]} ${y}`
      : span ? `${span[1]}–${span[2]}`
      : y ? String(y) : "",
    loss,
    verb,
    single: isSingleIncident(example.file ?? ""),
  };
};

// "Binance hack (Oct 2026): $6.3B". Only for single incidents with a short,
// recognisable victim name; everything else keeps its own H1 as the title.
export const exampleSearchTitle = (facts) => {
  if (!facts.single || !facts.monthLabel || facts.victim.length > 40) return "";
  const head = `${facts.victim}${facts.verb ? ` ${facts.verb}` : ""} (${facts.monthLabel})`;
  return facts.loss ? `${head}: ${facts.loss}` : head;
};

export const monthHubPath = (ym) => `/incidents/${ym.slice(0, 4)}/${ym.slice(5, 7)}`;
export const yearHubPath = (year) => `/incidents/${year}`;
export const monthHubTitle = (ym) =>
  `Crypto hacks and exploits in ${MONTHS_LONG[Number(ym.slice(5, 7)) - 1]} ${ym.slice(0, 4)}`;
export const yearHubTitle = (year) => `Crypto hacks and exploits in ${year}`;

// Month → examples (single incidents only), newest month first.
export const monthHubs = (examples) => {
  const byMonth = new Map();
  for (const example of examples ?? []) {
    if (!example.file || !isSingleIncident(example.file)) continue;
    const ym = String(example.date_prefix ?? example.file).slice(0, 7);
    if (!/^\d{4}-\d{2}$/.test(ym)) continue;
    if (!byMonth.has(ym)) byMonth.set(ym, []);
    byMonth.get(ym).push(example);
  }
  return new Map([...byMonth.entries()].sort((a, b) => b[0].localeCompare(a[0])));
};
