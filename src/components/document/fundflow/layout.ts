// Layout for oak-flow fund-flow graphs (tools/check_flow.py defines the data).
// Columns are stages of the money's path: longest-path layering from the
// sources, with pure sources pulled next to what they feed (so a victim hot
// wallet sits beside the other victim wallets, not at the far left). Rows are
// ordered by barycenter sweeps to cut crossings. Disconnected parts (e.g. the
// Bitcoin leg of a multi-chain theft) are stacked as separate bands.

export type FlowNode = {
  id: string;
  chain: string;
  role: string;
  label?: string;
  address?: string;
  explorer?: string;
};

export type FlowEdge = {
  from: string;
  to: string;
  asset: string;
  amount?: number | string;
  tx?: string;
  txUrl?: string;
  time?: string;
  time_last?: string;
  tx_count?: number;
  technique?: string;
  verified: "oak" | "source";
  source?: string;
};

export type Flow = { as_of?: string; nodes: FlowNode[]; edges: FlowEdge[] };

/** Several transfers between the same two nodes drawn as one link. */
export type Link = { id: string; from: string; to: string; items: FlowEdge[]; verified: boolean };

export type Placed = { node: FlowNode; x: number; y: number; layer: number };
export type Layout = { nodes: Map<string, Placed>; links: Link[]; width: number; height: number; bands: number[] };

export const NODE_W = 216;
export const NODE_H = 68;
export const GAP_X = 132;
export const GAP_Y = 22;
const BAND_GAP = 56;
const PAD = 24;

export function buildLinks(edges: FlowEdge[]): Link[] {
  const byPair = new Map<string, Link>();
  for (const e of edges) {
    const key = `${e.from}→${e.to}`;
    const link = byPair.get(key) ?? { id: key, from: e.from, to: e.to, items: [], verified: false };
    link.items.push(e);
    link.verified = link.verified || e.verified === "oak";
    byPair.set(key, link);
  }
  return [...byPair.values()];
}

function components(nodes: FlowNode[], links: Link[]): string[][] {
  const adj = new Map<string, Set<string>>(nodes.map((n) => [n.id, new Set()]));
  for (const l of links) {
    adj.get(l.from)?.add(l.to);
    adj.get(l.to)?.add(l.from);
  }
  const seen = new Set<string>();
  const out: string[][] = [];
  for (const n of nodes) {
    if (seen.has(n.id)) continue;
    const comp: string[] = [];
    const stack = [n.id];
    seen.add(n.id);
    while (stack.length) {
      const id = stack.pop()!;
      comp.push(id);
      for (const m of adj.get(id) ?? []) if (!seen.has(m)) { seen.add(m); stack.push(m); }
    }
    out.push(comp);
  }
  // biggest part first: it is the story; side legs go below
  return out.sort((a, b) => b.length - a.length);
}

function layers(ids: string[], links: Link[]): Map<string, number> {
  const inSet = new Set(ids);
  const outs = new Map<string, string[]>(ids.map((id) => [id, []]));
  const ins = new Map<string, string[]>(ids.map((id) => [id, []]));
  for (const l of links) {
    if (!inSet.has(l.from) || !inSet.has(l.to) || l.from === l.to) continue;
    outs.get(l.from)!.push(l.to);
    ins.get(l.to)!.push(l.from);
  }
  const layer = new Map<string, number>();
  const visiting = new Set<string>();
  const depth = (id: string): number => {
    if (layer.has(id)) return layer.get(id)!;
    if (visiting.has(id)) return 0; // cycle guard
    visiting.add(id);
    const preds = ins.get(id)!;
    const d = preds.length ? Math.max(...preds.map((p) => depth(p) + 1)) : 0;
    visiting.delete(id);
    layer.set(id, d);
    return d;
  };
  ids.forEach(depth);
  // pull pure sources right, next to the first node they feed
  for (const id of ids) {
    if (ins.get(id)!.length) continue;
    const targets = outs.get(id)!;
    if (targets.length) layer.set(id, Math.max(0, Math.min(...targets.map((t) => layer.get(t)!)) - 1));
  }
  // normalise so the first column is 0
  const min = Math.min(...ids.map((id) => layer.get(id)!));
  for (const id of ids) layer.set(id, layer.get(id)! - min);
  return layer;
}

function orderColumns(cols: string[][], links: Link[]): string[][] {
  const neighbours = new Map<string, string[]>();
  for (const l of links) {
    (neighbours.get(l.from) ?? neighbours.set(l.from, []).get(l.from)!).push(l.to);
    (neighbours.get(l.to) ?? neighbours.set(l.to, []).get(l.to)!).push(l.from);
  }
  const pos = new Map<string, number>();
  const index = () => cols.forEach((c) => c.forEach((id, i) => pos.set(id, i / Math.max(1, c.length - 1))));
  index();
  for (let sweep = 0; sweep < 6; sweep++) {
    const range = sweep % 2 === 0 ? cols.keys() : [...cols.keys()].reverse();
    for (const ci of range) {
      const bary = (id: string) => {
        const ns = (neighbours.get(id) ?? []).filter((n) => pos.has(n));
        return ns.length ? ns.reduce((s, n) => s + pos.get(n)!, 0) / ns.length : pos.get(id)!;
      };
      cols[ci] = [...cols[ci]].sort((a, b) => bary(a) - bary(b));
      index();
    }
  }
  return cols;
}


/** Place each node level with its neighbours (average of their centres),
 *  keeping column order and a minimum gap; a few relaxation passes. Starts
 *  from stacked columns so the first pass has something to average. */
function verticalPositions(cols: string[][], links: Link[]): Map<string, number> {
  const step = NODE_H + GAP_Y;
  const y = new Map<string, number>();
  cols.forEach((col) => col.forEach((id, i) => y.set(id, i * step)));
  const nb = new Map<string, string[]>();
  for (const l of links) {
    if (!y.has(l.from) || !y.has(l.to)) continue;
    (nb.get(l.from) ?? nb.set(l.from, []).get(l.from)!).push(l.to);
    (nb.get(l.to) ?? nb.set(l.to, []).get(l.to)!).push(l.from);
  }
  const resolve = (col: string[]) => {
    // keep order, push down to remove overlaps, then centre the block on its wish
    const wish = col.map((id) => y.get(id)!);
    const placed: number[] = [];
    col.forEach((_, i) => placed.push(i === 0 ? wish[0] : Math.max(wish[i], placed[i - 1] + step)));
    const shift = (wish.reduce((a, b) => a + b, 0) - placed.reduce((a, b) => a + b, 0)) / col.length;
    col.forEach((id, i) => y.set(id, placed[i] + Math.min(0, shift)));
    // second pass upward to keep gaps after the shift
    for (let i = col.length - 2; i >= 0; i--) {
      if (y.get(col[i])! > y.get(col[i + 1])! - step) y.set(col[i], y.get(col[i + 1])! - step);
    }
  };
  for (let pass = 0; pass < 8; pass++) {
    const order = pass % 2 === 0 ? cols : [...cols].reverse();
    for (const col of order) {
      for (const id of col) {
        const ns = nb.get(id) ?? [];
        if (ns.length) y.set(id, ns.reduce((s, n) => s + y.get(n)!, 0) / ns.length);
      }
      resolve(col);
    }
  }
  return y;
}

export function layoutFlow(flow: Flow): Layout {
  const links = buildLinks(flow.edges);
  const byId = new Map(flow.nodes.map((n) => [n.id, n]));
  const placed = new Map<string, Placed>();
  const bands: number[] = [];
  let top = PAD;
  let width = 0;
  for (const comp of components(flow.nodes, links)) {
    const layer = layers(comp, links);
    const ncols = Math.max(...comp.map((id) => layer.get(id)!)) + 1;
    const cols: string[][] = Array.from({ length: ncols }, () => []);
    comp.forEach((id) => cols[layer.get(id)!].push(id));
    orderColumns(cols, links);
    const y = verticalPositions(cols, links);
    let bandMin = Infinity;
    let bandMax = -Infinity;
    for (const id of comp) {
      bandMin = Math.min(bandMin, y.get(id)!);
      bandMax = Math.max(bandMax, y.get(id)! + NODE_H);
    }
    cols.forEach((col, ci) => {
      col.forEach((id) => {
        placed.set(id, {
          node: byId.get(id)!,
          layer: ci,
          x: PAD + ci * (NODE_W + GAP_X),
          y: top + y.get(id)! - bandMin,
        });
      });
    });
    width = Math.max(width, PAD * 2 + ncols * NODE_W + (ncols - 1) * GAP_X);
    bands.push(top);
    top += bandMax - bandMin + BAND_GAP;
  }
  return { nodes: placed, links, width, height: top - BAND_GAP + PAD, bands };
}

/** Role → visual family. Colours come from design tokens in CSS. */
export const ROLE_FAMILY: Record<string, string> = {
  "attacker-eoa": "attacker",
  "attack-contract": "attacker",
  "attacker-receiver": "attacker",
  "attacker-holding": "attacker",
  victim: "victim",
  "victim-hot-wallet": "victim",
  "vulnerable-contract": "victim",
  mixer: "mixer",
  bridge: "exit",
  "cex-deposit": "exit",
  dex: "exit",
  lending: "exit",
  "issuer-freeze": "frozen",
  returned: "frozen",
  burn: "neutral",
  intermediary: "hop",
  unknown: "neutral",
};

export const FAMILY_LABEL: Record<string, string> = {
  attacker: "Attacker-controlled",
  hop: "Hop wallet",
  victim: "Victim",
  mixer: "Mixer",
  exit: "Exit (DEX, bridge, exchange)",
  frozen: "Frozen / returned",
  neutral: "Other",
};

export const ROLE_TEXT: Record<string, string> = {
  "attacker-eoa": "attacker wallet",
  "attack-contract": "attack contract",
  "attacker-receiver": "receiver",
  "attacker-holding": "holding wallet",
  victim: "victim",
  "victim-hot-wallet": "victim hot wallet",
  "vulnerable-contract": "vulnerable contract",
  mixer: "mixer",
  bridge: "bridge",
  "cex-deposit": "exchange deposit",
  dex: "DEX",
  lending: "lending",
  "issuer-freeze": "issuer freeze",
  returned: "returned",
  burn: "burn",
  intermediary: "hop wallet",
  unknown: "unlabelled",
};

const compact = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2 });
const exact = new Intl.NumberFormat("en-US", { maximumFractionDigits: 8 });
const short = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });

export function fmtAmount(v: number | string | undefined, full = false): string {
  if (v === undefined || v === null || v === "") return "";
  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n)) return String(v);
  if (full) return exact.format(n);
  return Math.abs(n) < 10000 ? short.format(n) : compact.format(n);
}

export function shortAddr(a?: string): string {
  return a && a.length > 16 ? `${a.slice(0, 8)}…${a.slice(-6)}` : a ?? "";
}

export function linkLabel(link: Link): string[] {
  return link.items.map((e) => {
    const amt = fmtAmount(e.amount);
    const n = e.tx_count && e.tx_count > 1 ? ` ×${e.tx_count}` : "";
    return `${amt ? `${amt} ` : ""}${e.asset}${n}`;
  });
}
