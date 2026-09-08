import { useId } from "react";

type Relationship = { id: string; name: string };

export default function RelationshipGraph({
  centerId,
  centerLabel,
  mitigations,
  software,
  actors,
  onOpenMitigation,
  onOpenSoftware,
  onOpenActor,
}: {
  centerId: string;
  centerLabel: string;
  mitigations: Relationship[];
  software: Relationship[];
  actors: Relationship[];
  onOpenMitigation: (id: string) => void;
  onOpenSoftware: (id: string) => void;
  onOpenActor: (id: string) => void;
}) {
  const headingId = useId();
  const groups = [
    { kind: "mitigation", label: "Mitigations", relation: "Defend against", items: mitigations, open: onOpenMitigation },
    { kind: "software", label: "Software", relation: "Implements", items: software, open: onOpenSoftware },
    { kind: "actor", label: "Threat actors", relation: "Observed using", items: actors, open: onOpenActor },
  ].filter((group) => group.items.length > 0);

  return (
    <div className="relationship-graph" role="group" aria-labelledby={headingId}>
      <div className="rg-center" id={headingId}>
        <code>{centerId}</code>
        <strong>{centerLabel}</strong>
      </div>
      <div className="rg-groups">
        {groups.map((group) => (
          <section className={`rg-group rg-${group.kind}`} key={group.kind} aria-label={group.label}>
            <header className="rg-group-heading">
              <span className="rg-relation">{group.relation}</span>
              <h3>{group.label} <span className="rg-count">{group.items.length}</span></h3>
            </header>
            <ul className="rg-nodes">
              {group.items.map((node) => (
                <li key={node.id}>
                  <button type="button" className="rg-node" onClick={() => group.open(node.id)}>
                    <code>{node.id}</code>
                    <span>{node.name}</span>
                    <span className="rg-node-arrow" aria-hidden="true">↗</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
