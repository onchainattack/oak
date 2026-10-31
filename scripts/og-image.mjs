// Social preview cards (1200×630 PNG) for incident and Technique pages, so a
// link shared on X / Telegram / Slack shows what happened instead of the
// generic OAK banner. SVG → PNG with resvg; fonts are Geist (OFL) from the
// `geist` package, loaded explicitly so CI and local builds render the same.
import { Resvg } from "@resvg/resvg-js";
import path from "node:path";

const fontDir = (root) => path.join(root, "node_modules/geist/dist/fonts");
const fontFiles = (root) => [
  path.join(fontDir(root), "geist-sans/Geist-Regular.ttf"),
  path.join(fontDir(root), "geist-sans/Geist-Medium.ttf"),
  path.join(fontDir(root), "geist-sans/Geist-SemiBold.ttf"),
  path.join(fontDir(root), "geist-sans/Geist-Bold.ttf"),
  path.join(fontDir(root), "geist-mono/GeistMono-Regular.ttf"),
  path.join(fontDir(root), "geist-mono/GeistMono-Medium.ttf"),
];

const C = {
  bg: "#0A0A0C",
  bg2: "#0E1718",
  line: "#1F2326",
  text: "#E8E9EC",
  muted: "#8B8E96",
  accent: "#00FFD1",
};

const xml = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Greedy word wrap by estimated advance width (Geist averages ~0.53em per
// character, ~0.57em bold; Geist Mono is 0.6em). Long hyphenated words may
// break after a hyphen. The last line gets an ellipsis when text overflows.
const wrap = (text, fontSize, maxWidth, maxLines, style = "sans") => {
  const perChar = fontSize * ({ sans: 0.53, bold: 0.57, mono: 0.61 }[style] ?? 0.53);
  const maxChars = Math.floor(maxWidth / perChar);
  const words = String(text)
    .split(/\s+/)
    .filter(Boolean)
    .flatMap((word) => (word.length > maxChars ? word.split(/(?<=-)/) : [word]));
  const lines = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    const joined = current.endsWith("-") ? `${current}${word}` : next;
    if (joined.length <= maxChars) current = joined;
    else {
      if (current) lines.push(current);
      current = word.length > maxChars ? `${word.slice(0, maxChars - 1)}…` : word;
    }
  }
  if (current) lines.push(current);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = `${kept[maxLines - 1].replace(/[\s,;:—–-]+\S*$/, "")}…`;
    return kept;
  }
  return lines;
};

const textLines = (lines, { x, y, size, lineHeight, weight = 400, fill = C.text, family = "Geist" }) =>
  lines
    .map(
      (line, i) =>
        `<text x="${x}" y="${y + i * lineHeight}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}">${xml(line)}</text>`,
    )
    .join("");

const frame = (inner) => `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop stop-color="${C.bg}"/><stop offset="0.62" stop-color="${C.bg2}"/><stop offset="1" stop-color="${C.bg}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1010 120) rotate(90) scale(360 520)">
      <stop stop-color="${C.accent}" stop-opacity="0.12"/><stop offset="1" stop-color="${C.accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="0" y="0" width="8" height="630" fill="${C.accent}"/>
  ${inner}
  <line x1="64" y1="548" x2="1136" y2="548" stroke="${C.line}" stroke-width="2"/>
  <text x="64" y="592" font-family="Geist Mono" font-size="24" font-weight="500" fill="${C.accent}">OAK</text>
  <text x="130" y="592" font-family="Geist Mono" font-size="24" fill="${C.muted}">// OnChain Attack Knowledge</text>
  <text x="1136" y="592" text-anchor="end" font-family="Geist Mono" font-size="24" fill="${C.muted}">onchainattack.org</text>
</svg>`;

const render = (root, svg) =>
  new Resvg(svg, {
    font: { fontFiles: fontFiles(root), loadSystemFonts: false, defaultFontFamily: "Geist" },
    fitTo: { mode: "width", value: 1200 },
  })
    .render()
    .asPng();

// headline: "Binance hack"; loss: "$6.3B"; date: "October 29, 2026";
// mechanism: one-sentence what-happened; technique: "OAK-T15.003 Operator-Endpoint Compromise";
// chains: "Ethereum, Bitcoin, Tron, …".
export const incidentCard = (root, { kicker = "INCIDENT", headline, loss, date, mechanism, technique, chains }) => {
  // Shrink a long name before cutting it.
  const headWidth = loss ? 760 : 1060;
  let headSize = 68;
  let head = wrap(headline, headSize, headWidth, 2, "bold");
  if (head.at(-1).endsWith("…")) {
    headSize = 52;
    head = wrap(headline, headSize, headWidth, 3, "bold");
  }
  const headLine = Math.round(headSize * 1.15);
  const headBottom = 150 + (head.length - 1) * headLine;
  const mech = wrap(mechanism, 30, 1060, Math.max(1, Math.floor((420 - headBottom - 64) / 42) + 1));
  const inner = [
    `<text x="64" y="76" font-family="Geist Mono" font-size="22" font-weight="500" fill="${C.accent}" letter-spacing="2">${xml(kicker)}</text>`,
    date ? `<text x="1136" y="76" text-anchor="end" font-family="Geist Mono" font-size="22" fill="${C.muted}">${xml(date)}</text>` : "",
    textLines(head, { x: 64, y: 150, size: headSize, lineHeight: headLine, weight: 700 }),
    loss
      ? `<text x="1136" y="150" text-anchor="end" font-family="Geist" font-size="72" font-weight="700" fill="${C.accent}">${xml(loss)}</text>` +
        `<text x="1136" y="186" text-anchor="end" font-family="Geist Mono" font-size="20" fill="${C.muted}">LOSS</text>`
      : "",
    textLines(mech, { x: 64, y: headBottom + 64, size: 30, lineHeight: 42, fill: C.muted }),
    technique
      ? `<text x="64" y="${chains ? 468 : 500}" font-family="Geist Mono" font-size="24" font-weight="500" fill="${C.text}">${xml(wrap(technique, 24, 1060, 1, "mono")[0])}</text>`
      : "",
    chains
      ? `<text x="64" y="${technique ? 506 : 500}" font-family="Geist Mono" font-size="22" fill="${C.muted}">${xml(wrap(chains, 22, 1060, 1, "mono")[0])}</text>`
      : "",
  ].join("");
  return render(root, frame(inner));
};

// Technique card: ID, name, Tactic, and how many incidents demonstrate it.
export const techniqueCard = (root, { id, name, tactic, incidents }) => {
  const head = wrap(name, 72, 1060, 3, "bold");
  const inner = [
    `<text x="64" y="76" font-family="Geist Mono" font-size="22" font-weight="500" fill="${C.accent}" letter-spacing="2">TECHNIQUE</text>`,
    `<text x="64" y="150" font-family="Geist Mono" font-size="40" font-weight="500" fill="${C.accent}">${xml(id)}</text>`,
    textLines(head, { x: 64, y: 240, size: 72, lineHeight: 82, weight: 700 }),
    tactic ? `<text x="64" y="${240 + head.length * 82 + 20}" font-family="Geist Mono" font-size="24" fill="${C.muted}">${xml(wrap(tactic, 24, 1060, 1, "mono")[0])}</text>` : "",
    incidents
      ? `<text x="1136" y="150" text-anchor="end" font-family="Geist Mono" font-size="24" fill="${C.muted}">${incidents} incident${incidents === 1 ? "" : "s"}</text>`
      : "",
  ].join("");
  return render(root, frame(inner));
};
