import { useEffect, useState } from "react";
import { siteData } from "./data/generated";
import type {
  DocumentHtmlState,
  DocumentMetaRow,
  Technique,
} from "./types";

export const techniqueById = new Map<string, Technique>(
  siteData.techniques.map((technique) => [technique.id, technique]),
);
export const chainOptions = ["all", "EVM", "Solana", "cross-chain", "chain-agnostic"];
// Rendered document HTML by repo path (e.g. "examples/x.md"), fetched one file
// at a time from /doc-html/ (written by scripts/build-site-data.mjs).
type DocumentPayload = { html: string; meta: DocumentMetaRow[] };
const documentHtmlCache = new Map<string, Promise<DocumentPayload | null>>();

export const includes = (value: string, query: string) => value.toLowerCase().includes(query.toLowerCase());

const loadDocumentHtml = (path: string) => {
  let pending = documentHtmlCache.get(path);
  if (!pending) {
    const url = `/doc-html/${path.replace(/\.md$/, "").split("/").map(encodeURIComponent).join("/")}.json`;
    pending = fetch(url)
      .then((response) => (response.ok ? (response.json() as Promise<DocumentPayload>) : null))
      .catch(() => null);
    documentHtmlCache.set(path, pending);
  }
  return pending;
};

export function useDocumentHtml(path: string): DocumentHtmlState {
  const [state, setState] = useState<DocumentHtmlState>({ status: "loading", html: "" });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading", html: "" });
    loadDocumentHtml(path).then((doc) => {
      if (!cancelled) setState(doc ? { status: "loaded", html: doc.html, meta: doc.meta } : { status: "missing", html: "" });
    });
    return () => {
      cancelled = true;
    };
  }, [path]);

  return state;
}

export const cleanInlineText = (value: string) =>
  value
    .replace(/\\([\\`*_{}\[\]()#+\-.!|>~$])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

export const tacticVariant = (id: string) => Number(id.match(/OAK-T(\d+)/)?.[1] ?? 0);

export const techniqueMatches = (
  technique: Technique,
  query: string,
  chainFilter: string,
  maturityFilter: string,
) => {
  const haystack = [
    technique.id,
    technique.name,
    technique.firstDocumented,
    technique.maturity,
    ...technique.chains,
    ...technique.aliases,
  ].join(" ");

  const queryOk = !query.trim() || includes(haystack, query.trim());
  const chainOk =
    chainFilter === "all" ||
    technique.chains.some((chain: string) => includes(chain, chainFilter)) ||
    includes(technique.name, chainFilter);
  const maturityOk = maturityFilter === "all" || technique.maturity === maturityFilter;

  return queryOk && chainOk && maturityOk;
};

export const TACTIC_NAMES_SHORT: Record<string, string> = {
  T1: "Token Genesis",
  T2: "Liquidity Establishment",
  T3: "Holder Capture",
  T4: "Access Acquisition",
  T5: "Value Extraction",
  T6: "Defense Evasion",
  T7: "Laundering",
  T8: "Operator Continuity / Attribution",
  T9: "Smart-Contract Exploit",
  T10: "Bridge / Cross-Chain",
  T11: "Custody / Signing",
  T12: "NFT-Specific",
  T13: "Account Abstraction",
  T14: "Validator / Staking",
  T15: "Off-chain Entry-Vector",
  T16: "Governance / Voting",
  T17: "Market Manipulation",
};

export const TACTIC_ORDER = ["T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12","T13","T14","T15","T16","T17"];
export const ATTRIBUTION_ORDER = ["confirmed","inferred-strong","inferred-weak","pseudonymous","unattributed","(missing)"];
// Attribution colors derive from OAK's single accent (electric teal) with
// decreasing opacity for decreasing rigor; lower-rigor categories fall onto
// muted gray so the visual emphasis stays on the strong-attribution share.
export const ATTRIBUTION_COLORS: Record<string, string> = {
  "confirmed": "rgba(0, 255, 209, 1)",
  "inferred-strong": "rgba(0, 255, 209, 0.7)",
  "inferred-weak": "rgba(0, 255, 209, 0.4)",
  "pseudonymous": "rgba(184, 186, 192, 0.55)",
  "unattributed": "rgba(139, 142, 150, 0.4)",
  "(missing)": "rgba(139, 142, 150, 0.25)",
};


export {};
