// Tactic symbols share a 24 × 24 grid and an unfilled, rounded stroke.
// Keep details legible at the 24px display size.
import type { ReactNode } from "react";

export const TACTIC_GLYPHS: Record<number, ReactNode> = {
  // T1 — Token Genesis: mint a token.
  1: (<>
    <circle cx="10" cy="14" r="7" />
    <path d="M10 11v6m-3-3h6M18 2v6m-3-3h6" />
  </>),
  // T2 — Liquidity Establishment: a pool with an exchange pair.
  2: (<>
    <path d="M4 7h15m-3-3 3 3-3 3M20 17H5m3-3-3 3 3 3M3 12h18" />
  </>),
  // T3 — Holder Capture: a holder in the crosshairs.
  3: (<>
    <path d="M7 3H3v4m14-4h4v4M3 17v4h4m14-4v4h-4" />
    <circle cx="12" cy="9" r="3" />
    <path d="M7 18v-1a5 5 0 0 1 10 0v1" />
  </>),
  // T4 — Access Acquisition: an access key.
  4: (<>
    <circle cx="8" cy="8" r="5" />
    <path d="m11.5 11.5 9 9M16 16l3-3m-1 5 3-3" />
  </>),
  // T5 — Value Extraction: value leaving a vault.
  5: (<>
    <path d="M12 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7M13 12h8m-4-4 4 4-4 4M6 9v6" />
    <circle cx="9" cy="12" r="1" />
  </>),
  // T6 — Defense Evasion: hidden from view.
  6: (<>
    <path d="m3 3 18 18M10.6 5.1 12 5c5 0 9 7 9 7a19 19 0 0 1-2.6 3.5M6.2 6.2A23 23 0 0 0 3 12s4 7 9 7a9 9 0 0 0 4.2-1.2" />
    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
  </>),
  // T7 — Laundering: funds routed through a mixer.
  7: (<>
    <path d="M3 6h3c5 0 7 12 12 12h3m-3-3 3 3-3 3M3 18h3c1.8 0 3.2-1.5 4.5-3.5M13.5 9.5C14.8 7.5 16.2 6 18 6h3m-3-3 3 3-3 3" />
  </>),
  // T8 — Operational Reuse: shared infrastructure.
  8: (<>
    <rect x="9" y="3" width="6" height="6" rx="1.5" />
    <rect x="3" y="15" width="6" height="6" rx="1.5" />
    <rect x="15" y="15" width="6" height="6" rx="1.5" />
    <path d="M12 9v3m-6 3v-3h12v3" />
  </>),
  // T9 — Smart-Contract Exploit: a fault inside code brackets.
  9: (<>
    <path d="m6 7-4 5 4 5m12-10 4 5-4 5M13 3l-4 10h6l-4 8" />
  </>),
  // T10 — Bridge / Cross-Chain: a bridge between two endpoints.
  10: (<>
    <path d="M5 4v16M19 4v16M2 16h20M5 6c4 8 10 8 14 0M9 11v5m6-5v5" />
  </>),
  // T11 — Custody / Signing: protected signing authority.
  11: (<>
    <path d="m12 3 8 3v6c0 4-3 7-8 9-5-2-8-5-8-9V6Z" />
    <circle cx="12" cy="10" r="2" />
    <path d="M12 12v4" />
  </>),
  // T12 — NFT: a unique image asset.
  12: (<>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8" cy="8" r="1.5" />
    <path d="m3 17 5-5 4 4 4-6 5 7" />
  </>),
  // T13 — Account Abstraction: a programmable account.
  13: (<>
    <rect x="5" y="5" width="14" height="14" rx="2" />
    <path d="M9 2v3m6-3v3M9 19v3m6-3v3M2 9h3m-3 6h3m14-6h3m-3 6h3M9 16a3 3 0 0 1 6 0" />
    <circle cx="12" cy="10" r="2" />
  </>),
  // T14 — Validator / Staking: validated blocks.
  14: (<>
    <path d="m3 7 9-4 9 4-9 4Zm0 5 9 4 9-4M3 17l9 4 4-1.8m1-2.2 2 2 3-4" />
  </>),
  // T15 — Off-chain Entry-Vector: entry through an endpoint.
  15: (<>
    <path d="M12 5H5a1 1 0 0 0-1 1v10m16-3v3M2 16h20l-2 4H4ZM14 9h8m-3-3 3 3-3 3" />
  </>),
  // T16 — Governance / Voting: a ballot entering the box.
  16: (<>
    <rect x="7" y="3" width="10" height="10" rx="1.5" />
    <path d="m10 8 1.5 1.5L14 7M5 11l-2 5v5h18v-5l-2-5M3 16h18" />
  </>),
  // T17 — Market Manipulation: three price candles.
  17: (<>
    <rect x="3" y="8" width="4" height="8" rx="1" />
    <rect x="10" y="5" width="4" height="7" rx="1" />
    <rect x="17" y="12" width="4" height="6" rx="1" />
    <path d="M5 5v3m0 8v4m7-18v3m0 7v5m7-9v4m0 6v3" />
  </>),
};
