import type { siteData } from "./data/generated";

export type Tactic = (typeof siteData.tactics)[number];
export type Technique = (typeof siteData.techniques)[number];
export type WorkspaceView = "about" | "matrix" | "incidents" | "actors" | "mitigations" | "software" | "coverage" | "contribute";
export type IconName =
  | "matrix"
  | "technique"
  | "incident"
  | "actor"
  | "coverage"
  | "citation"
  | "why"
  | "who"
  | "how"
  | "contribute"
  | "market"
  | "evidence";
export type SearchResult = {
  kind: "Tactic" | "Technique" | "Incident" | "Actor" | "Mitigation" | "Software" | "Doc";
  title: string;
  subtitle: string;
  path: string;
};
export type DocumentBodies = Record<string, string>;
export type DocumentHtmlState =
  | { status: "loading"; html: "" }
  | { status: "loaded"; html: string }
  | { status: "missing"; html: "" };
