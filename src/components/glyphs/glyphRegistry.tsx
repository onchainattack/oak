// SVG path data for the per-Tactic glyphs (T1..T17). Kept separate from
// the TacticGlyph component so the rendering logic is a thin lookup and
// the SVG fragments live with the design data, not the control flow.
//
// Coordinates assume viewBox="0 0 48 48". Each entry is the inner SVG
// content (rect/path/circle) — the wrapping <svg> + <span> is in the
// component.

import type { ReactNode } from "react";

export const TACTIC_GLYPHS: Record<number, ReactNode> = {
  // T1 — Token Genesis: mint arrow into token contract
  1: (
    <>
      <rect x="12" y="20" width="24" height="20" rx="2" />
      <path d="M24 6v14M18 14l6 6 6-6" />
      <path d="M18 30h12" className="fill-accent" />
    </>
  ),
  // T2 — Liquidity Establishment: AMM curve x*y=k
  2: (
    <>
      <path d="M8 40h32M10 40v-30" />
      <path d="M14 36c0-14 8-22 22-22" />
      <circle cx="36" cy="14" r="2.5" className="fill-accent" />
    </>
  ),
  // T3 — Holder Capture: concentric voting power
  3: (
    <>
      <circle cx="24" cy="24" r="16" />
      <circle cx="24" cy="24" r="10" />
      <circle cx="24" cy="24" r="4" className="fill-accent" />
    </>
  ),
  // T4 — Access Acquisition: phishing hook + key
  4: (
    <>
      <path d="M30 8c0 8-12 8-12 18 0 6 4 10 10 10s10-4 10-10" />
      <circle cx="14" cy="34" r="5" />
      <path d="M18 34h14" />
      <path d="M30 32v4M34 32v4" className="fill-accent" />
    </>
  ),
  // T5 — Value Extraction: vault draining
  5: (
    <>
      <path d="M10 12h20v18H10z" />
      <circle cx="20" cy="21" r="3" className="fill-accent" />
      <path d="M30 21h12" />
      <path d="M38 17l4 4-4 4" />
    </>
  ),
  // T6 — Defense Evasion: split mask
  6: (
    <>
      <path d="M24 8L40 18v8c0 8-7 14-16 16-9-2-16-8-16-16v-8Z" />
      <path d="M24 8v32" />
      <circle cx="16" cy="22" r="2" className="fill-accent" />
      <circle cx="32" cy="22" r="2" />
    </>
  ),
  // T7 — Laundering: cyclic arrows / tumbler
  7: (
    <>
      <path d="M14 18a12 12 0 0 1 22 0" />
      <path d="M34 30a12 12 0 0 1-22 0" />
      <path d="M30 14l6 4-6 4" className="fill-accent" />
      <path d="M18 34l-6-4 6-4" className="fill-accent" />
    </>
  ),
  // T8 — Operational Reuse: cluster of nodes
  8: (
    <>
      <circle cx="14" cy="14" r="4" />
      <circle cx="34" cy="14" r="4" />
      <circle cx="14" cy="34" r="4" />
      <circle cx="34" cy="34" r="4" className="fill-accent" />
      <path d="M14 18v12M34 18v12M18 14h12M18 34h12" />
    </>
  ),
  // T9 — Smart-Contract Exploit: broken brackets
  9: (
    <>
      <path d="M16 10l-8 14 8 14M32 10l8 14-8 14" />
      <path d="M22 18l4 14" className="fill-accent" />
      <circle cx="24" cy="24" r="2.5" className="fill-accent" />
    </>
  ),
  // T10 — Bridge / Cross-Chain: two chains linked
  10: (
    <>
      <rect x="6" y="20" width="14" height="8" rx="4" />
      <rect x="28" y="20" width="14" height="8" rx="4" />
      <path d="M16 24h16" />
      <circle cx="24" cy="24" r="2.5" className="fill-accent" />
    </>
  ),
  // T11 — Custody / Signing: vault + key
  11: (
    <>
      <rect x="8" y="14" width="22" height="22" rx="2" />
      <circle cx="19" cy="25" r="3" className="fill-accent" />
      <path d="M19 28v4" className="fill-accent" />
      <path d="M34 18l4-4M34 22l4-4M34 26l4-4M34 30l4-4" />
    </>
  ),
  // T12 — NFT: picture frame with image
  12: (
    <>
      <rect x="8" y="8" width="32" height="32" rx="2" />
      <circle cx="18" cy="18" r="3" className="fill-accent" />
      <path d="M12 36l10-12 6 6 8-10 4 4v12Z" className="fill-accent" />
    </>
  ),
  // T13 — Account Abstraction: nested smart account
  13: (
    <>
      <rect x="6" y="6" width="36" height="36" rx="3" />
      <rect x="14" y="14" width="20" height="20" rx="2" />
      <rect x="20" y="20" width="8" height="8" className="fill-accent" />
    </>
  ),
  // T14 — Validator / Staking: staking pyramid
  14: (
    <>
      <path d="M24 6l16 28H8Z" />
      <path d="M14 26h20M18 18h12" />
      <circle cx="24" cy="34" r="3" className="fill-accent" />
      <path d="M8 40h32" />
    </>
  ),
  // T15 — Off-chain Entry-Vector: laptop with phishing hook entering screen
  15: (
    <>
      <rect x="10" y="14" width="28" height="18" rx="1" />
      <path d="M6 36h36l-2 4H8z" />
      <path d="M30 6c0 6-8 6-8 12 0 3 2 5 5 5" />
      <circle cx="27" cy="23" r="2.5" className="fill-accent" />
    </>
  ),
  // T16 — Governance / Voting: ballot box with ballot slot + checkmark
  16: (
    <>
      <rect x="8" y="22" width="32" height="20" rx="1" />
      <rect x="18" y="20" width="12" height="3" />
      <rect x="16" y="6" width="16" height="14" rx="1" />
      <path d="M20 13l3 3 5-6" className="fill-accent" />
    </>
  ),
  // T17 — Market Manipulation: candlestick cluster + cross-venue arrow
  17: (
    <>
      <rect x="10" y="18" width="4" height="14" />
      <path d="M12 14v4M12 32v4" />
      <rect x="20" y="12" width="4" height="20" className="fill-accent" />
      <path d="M22 8v4M22 32v4" />
      <rect x="30" y="22" width="4" height="10" />
      <path d="M32 18v4M32 32v4" />
      <path d="M6 40h36" />
      <path d="M40 12l-4-2 4-2" className="fill-accent" />
    </>
  ),
};
