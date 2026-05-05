import { useEffect, useState } from "react";

// Matrix filter state, synced both ways with the URL search params:
//   ?tactic=OAK-T11&chain=EVM&maturity=stable&rel=OAK-G01
// On mount / popstate the URL hydrates the state. On state change the
// URL gets a replaceState so we don't pollute history with every filter
// click. Sharing a filtered view = share the URL.

const PARAM_KEYS = {
  activeTactic: "tactic",
  chainFilter: "chain",
  maturityFilter: "maturity",
  relationshipFilter: "rel",
} as const;

const readFromUrl = (): {
  activeTactic: string;
  chainFilter: string;
  maturityFilter: string;
  relationshipFilter: string;
} => {
  const sp = new URLSearchParams(
    typeof window === "undefined" ? "" : window.location.search,
  );
  return {
    activeTactic: sp.get(PARAM_KEYS.activeTactic) ?? "all",
    chainFilter: sp.get(PARAM_KEYS.chainFilter) ?? "all",
    maturityFilter: sp.get(PARAM_KEYS.maturityFilter) ?? "all",
    relationshipFilter: sp.get(PARAM_KEYS.relationshipFilter) ?? "all",
  };
};

export function useMatrixFilters() {
  const initial = readFromUrl();
  const [activeTactic, setActiveTactic] = useState(initial.activeTactic);
  const [chainFilter, setChainFilter] = useState(initial.chainFilter);
  const [maturityFilter, setMaturityFilter] = useState(initial.maturityFilter);
  const [relationshipFilter, setRelationshipFilter] = useState<string>(initial.relationshipFilter);

  // State → URL (replaceState — no history entry per filter click)
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const setOrDelete = (key: string, value: string) => {
      if (value === "all" || !value) sp.delete(key);
      else sp.set(key, value);
    };
    setOrDelete(PARAM_KEYS.activeTactic, activeTactic);
    setOrDelete(PARAM_KEYS.chainFilter, chainFilter);
    setOrDelete(PARAM_KEYS.maturityFilter, maturityFilter);
    setOrDelete(PARAM_KEYS.relationshipFilter, relationshipFilter);
    const next = sp.toString();
    const target = next ? `${window.location.pathname}?${next}` : window.location.pathname;
    if (target !== window.location.pathname + window.location.search) {
      window.history.replaceState(null, "", target);
    }
  }, [activeTactic, chainFilter, maturityFilter, relationshipFilter]);

  // URL → State (popstate — back/forward + external nav)
  useEffect(() => {
    const onPopState = () => {
      const fresh = readFromUrl();
      setActiveTactic(fresh.activeTactic);
      setChainFilter(fresh.chainFilter);
      setMaturityFilter(fresh.maturityFilter);
      setRelationshipFilter(fresh.relationshipFilter);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return {
    activeTactic, setActiveTactic,
    chainFilter, setChainFilter,
    maturityFilter, setMaturityFilter,
    relationshipFilter, setRelationshipFilter,
  };
}
