#!/usr/bin/env python3
"""
export_stix.py — emit OAK content as a STIX 2.1 bundle for interop with
TIPs, SIEMs, and other ATT&CK-aware tooling.

Reads:
- tools/oak.json (Tactics, Techniques, Mitigations, Software, Relationships)
- actors/OAK-G*.md (Threat Actors / intrusion-sets)
- data-sources/OAK-DS-*.md (Data Sources)

Writes:
- tools/oak-stix.json (STIX 2.1 bundle)

Schema mapping:
- OAK-Tn        → x-mitre-tactic (custom; phase identifier for kill chain)
- OAK-Tn.NNN    → attack-pattern (with kill_chain_phases pointing to parent Tactic)
- OAK-MNN       → course-of-action
- OAK-SNN       → malware (if type in ransomware|malware|infostealer)
                  OR tool (if type in tool|drainer-kit|mev-bot|vanity-gen)
- OAK-Gnn       → intrusion-set
- OAK-DS-NN     → x-mitre-data-source (custom)
- relationships → relationship SROs

UUIDs are derived deterministically from the OAK ID via uuid5(oak_namespace, oak_id),
so re-running this script produces stable STIX IDs across regenerations.

Usage:
    python tools/export_stix.py [--out tools/oak-stix.json]
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import re
import sys
import uuid
from pathlib import Path

# Stable namespace for OAK STIX IDs. Generated once and pinned here.
OAK_NS = uuid.UUID("8b1d4f0a-3c2e-5d6f-9a8b-7c6d5e4f3a2b")

NOW = dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.000Z")

# OAK Software type → STIX SDO type
SOFTWARE_TYPE_MAP = {
    "ransomware": "malware",
    "malware": "malware",
    "infostealer": "malware",
    "tool": "tool",
    "drainer-kit": "tool",
    "mev-bot": "tool",
    "vanity-gen": "tool",
    "extortion-only": "tool",
}

# OAK Software type → malware_types or tool_types (STIX vocabulary, partial mapping)
MALWARE_SUBTYPE_MAP = {
    "ransomware": ["ransomware"],
    "malware": ["backdoor", "rat"],
    "infostealer": ["spyware", "credential-exploitation"],
}
TOOL_SUBTYPE_MAP = {
    "tool": ["exploitation"],
    "drainer-kit": ["exploitation"],
    "mev-bot": ["exploitation"],
    "vanity-gen": ["credential-exploitation"],
    "extortion-only": ["exploitation"],
}


def stix_id(prefix: str, oak_id: str) -> str:
    """Return a STIX-style ID derived from an OAK identifier deterministically."""
    return f"{prefix}--{uuid.uuid5(OAK_NS, oak_id)}"


def shortname(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def tactic_to_sdo(tac: dict) -> dict:
    return {
        "type": "x-mitre-tactic",
        "spec_version": "2.1",
        "id": stix_id("x-mitre-tactic", tac["id"]),
        "created": NOW,
        "modified": NOW,
        "name": tac["name"],
        "description": tac.get("phase", ""),
        "x_mitre_shortname": shortname(tac["name"]),
        "external_references": [
            {
                "source_name": "oak",
                "external_id": tac["id"],
                "url": f"https://onchainattack.org/#/tactic/{tac['id']}",
            }
        ],
    }


def technique_to_sdo(tech: dict, tactic_shortnames: dict[str, str]) -> dict:
    phases = []
    for parent in tech.get("parent_tactics", []):
        sn = tactic_shortnames.get(parent)
        if sn:
            phases.append({"kill_chain_name": "oak", "phase_name": sn})
    return {
        "type": "attack-pattern",
        "spec_version": "2.1",
        "id": stix_id("attack-pattern", tech["id"]),
        "created": NOW,
        "modified": NOW,
        "name": tech["name"],
        "kill_chain_phases": phases,
        "x_mitre_platforms": tech.get("chains", []),
        "external_references": [
            {
                "source_name": "oak",
                "external_id": tech["id"],
                "url": f"https://onchainattack.org/#/technique/{tech['id']}",
            }
        ],
    }


def mitigation_to_sdo(mit: dict) -> dict:
    return {
        "type": "course-of-action",
        "spec_version": "2.1",
        "id": stix_id("course-of-action", mit["id"]),
        "created": NOW,
        "modified": NOW,
        "name": mit["name"],
        "description": f"OAK {mit['id']} — class: {mit.get('class', '')}; audience: {', '.join(mit.get('audience', []))}",
        "external_references": [
            {
                "source_name": "oak",
                "external_id": mit["id"],
                "url": f"https://onchainattack.org/#/mitigation/{mit['id']}",
            }
        ],
    }


def software_to_sdo(sw: dict) -> dict:
    sw_type = sw.get("type", "tool").split()[0].lower()  # first word; "tool / vanity-gen" → "tool"
    sw_type = re.sub(r"[^a-z-]", "", sw_type)
    stix_type = SOFTWARE_TYPE_MAP.get(sw_type, "tool")
    obj = {
        "type": stix_type,
        "spec_version": "2.1",
        "id": stix_id(stix_type, sw["id"]),
        "created": NOW,
        "modified": NOW,
        "name": sw["name"],
        "is_family": True if stix_type == "malware" else None,
        "aliases": [a for a in sw.get("aliases", []) if a and len(a) < 200] or None,
        "x_mitre_platforms": sw.get("host_platforms", []) or None,
        "external_references": [
            {
                "source_name": "oak",
                "external_id": sw["id"],
                "url": f"https://onchainattack.org/#/software/{sw['id']}",
            }
        ],
    }
    if stix_type == "malware":
        obj["malware_types"] = MALWARE_SUBTYPE_MAP.get(sw_type, ["backdoor"])
    if stix_type == "tool":
        obj["tool_types"] = TOOL_SUBTYPE_MAP.get(sw_type, ["exploitation"])
    return {k: v for k, v in obj.items() if v is not None}


def group_to_sdo(group_id: str, group_name: str, status: str) -> dict:
    return {
        "type": "intrusion-set",
        "spec_version": "2.1",
        "id": stix_id("intrusion-set", group_id),
        "created": NOW,
        "modified": NOW,
        "name": group_name,
        "description": f"OAK {group_id} — attribution status: {status}",
        "external_references": [
            {
                "source_name": "oak",
                "external_id": group_id,
                "url": f"https://onchainattack.org/#/group/{group_id}",
            }
        ],
    }


def datasource_to_sdo(ds_id: str, name: str, description: str) -> dict:
    return {
        "type": "x-mitre-data-source",
        "spec_version": "2.1",
        "id": stix_id("x-mitre-data-source", ds_id),
        "created": NOW,
        "modified": NOW,
        "name": name,
        "description": description,
        "external_references": [
            {
                "source_name": "oak",
                "external_id": ds_id,
                "url": f"https://onchainattack.org/#/datasource/{ds_id}",
            }
        ],
    }


def relationship_sro(rel_type: str, source_oak_id: str, target_oak_id: str,
                     source_stix: str, target_stix: str) -> dict:
    return {
        "type": "relationship",
        "spec_version": "2.1",
        "id": stix_id("relationship", f"{rel_type}:{source_oak_id}:{target_oak_id}"),
        "created": NOW,
        "modified": NOW,
        "relationship_type": rel_type,
        "source_ref": source_stix,
        "target_ref": target_stix,
    }


# Lightweight markdown header parsers for actors/ and data-sources/

def parse_actor_md(path: Path) -> dict | None:
    text = path.read_text(encoding="utf-8")
    title_m = re.search(r"^# (OAK-G\d+)\s+—\s+(.+?)$", text, re.MULTILINE)
    if not title_m:
        return None
    status_m = re.search(r"^\*\*Attribution status:\*\*\s*(.+?)$", text, re.MULTILINE)
    return {
        "id": title_m.group(1),
        "name": title_m.group(2).strip(),
        "status": status_m.group(1).strip() if status_m else "",
    }


def parse_datasource_md(path: Path) -> dict | None:
    text = path.read_text(encoding="utf-8")
    title_m = re.search(r"^# (OAK-DS-\d+)\s+—\s+(.+?)$", text, re.MULTILINE)
    if not title_m:
        return None
    desc_m = re.search(r"^## Description\s*\n(.+?)(?:\n##|$)", text, re.MULTILINE | re.DOTALL)
    return {
        "id": title_m.group(1),
        "name": title_m.group(2).strip(),
        "description": (desc_m.group(1).strip()[:500] if desc_m else "")[:500],
    }


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", default="tools/oak-stix.json", type=Path)
    parser.add_argument("--root", default=".", type=Path)
    args = parser.parse_args(argv)

    root = args.root.resolve()
    oak_path = root / "tools/oak.json"
    if not oak_path.exists():
        print("ERROR: tools/oak.json not found — run tools/export_json.py first", file=sys.stderr)
        return 1

    oak = json.loads(oak_path.read_text(encoding="utf-8"))
    objects: list[dict] = []
    oak_to_stix: dict[str, str] = {}

    # Tactics
    tactic_shortnames: dict[str, str] = {}
    for tac in oak.get("tactics", []):
        sdo = tactic_to_sdo(tac)
        objects.append(sdo)
        oak_to_stix[tac["id"]] = sdo["id"]
        tactic_shortnames[tac["id"]] = sdo["x_mitre_shortname"]

    # Techniques
    for tech in oak.get("techniques", []):
        sdo = technique_to_sdo(tech, tactic_shortnames)
        objects.append(sdo)
        oak_to_stix[tech["id"]] = sdo["id"]

    # Mitigations
    for mit in oak.get("mitigations", []):
        sdo = mitigation_to_sdo(mit)
        objects.append(sdo)
        oak_to_stix[mit["id"]] = sdo["id"]

    # Software
    for sw in oak.get("software", []):
        sdo = software_to_sdo(sw)
        objects.append(sdo)
        oak_to_stix[sw["id"]] = sdo["id"]

    # Threat Actors / Groups (read directly from actors/)
    actors_dir = root / "actors"
    if actors_dir.is_dir():
        for actor_md in sorted(actors_dir.glob("OAK-G*.md")):
            actor = parse_actor_md(actor_md)
            if actor:
                sdo = group_to_sdo(actor["id"], actor["name"], actor["status"])
                objects.append(sdo)
                oak_to_stix[actor["id"]] = sdo["id"]

    # Data Sources
    ds_dir = root / "data-sources"
    if ds_dir.is_dir():
        for ds_md in sorted(ds_dir.glob("OAK-DS-*.md")):
            ds = parse_datasource_md(ds_md)
            if ds:
                sdo = datasource_to_sdo(ds["id"], ds["name"], ds["description"])
                objects.append(sdo)
                oak_to_stix[ds["id"]] = sdo["id"]

    # Relationships
    skipped_rels = 0
    for rel in oak.get("relationships", []):
        s_oak = rel["source"]
        t_oak = rel["target"]
        if s_oak not in oak_to_stix or t_oak not in oak_to_stix:
            skipped_rels += 1
            continue
        objects.append(
            relationship_sro(rel["type"], s_oak, t_oak,
                             oak_to_stix[s_oak], oak_to_stix[t_oak])
        )

    # Bundle
    bundle = {
        "type": "bundle",
        "id": f"bundle--{uuid.uuid5(OAK_NS, 'oak-bundle')}",
        "objects": objects,
    }

    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(json.dumps(bundle, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    counts: dict[str, int] = {}
    for obj in objects:
        counts[obj["type"]] = counts.get(obj["type"], 0) + 1
    print(f"OK: wrote {args.out} — {len(objects)} STIX objects total.")
    for t, c in sorted(counts.items()):
        print(f"  {c:4d}  {t}")
    if skipped_rels:
        print(f"  ({skipped_rels} relationships skipped — source/target outside OAK axes)")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
