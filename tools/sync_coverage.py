#!/usr/bin/env python3
"""sync_coverage.py — bring coverage/manifest.yml in sync with prose-detected
vendor mentions in techniques/*.md.

For each vendor named in the manifest, this script:

  1. Re-runs the prose extractor.
  2. Adds any (vendor, technique) edges present in prose but missing from
     the manifest, defaulting to coverage: documented (the honest tier
     when no explicit marker is in prose).
  3. Preserves all curator overrides — explicit tier (full/partial/gap/na),
     detector_id, field, and note — for edges that are already in the
     manifest.

It does NOT add or remove vendors. To add a new vendor, add it to
manifest.yml first (with metadata + empty `techniques: []`); the next
sync pass will populate the edges.

Run after editing the prose:
    python3 tools/sync_coverage.py
    python3 tools/check_coverage.py   # should now pass
"""

from __future__ import annotations

import sys
from pathlib import Path

import yaml

sys.path.insert(0, str(Path(__file__).resolve().parent))
from extract_coverage import (  # noqa: E402
    TECH_DIR,
    extract_section,
    technique_id_from_path,
    find_vendor_lines,
    coverage_for_line,
    detector_id_for_line,
)

ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / "coverage" / "manifest.yml"


def main() -> int:
    text = MANIFEST.read_text(encoding="utf-8")
    manifest = yaml.safe_load(text)

    # Build prose index: vendor_key → { technique_id → (extracted_tier, detector_id_or_none) }
    prose: dict[str, dict[str, tuple[str, str | None]]] = {}
    for path in sorted(TECH_DIR.glob("T*.md")):
        section = extract_section(path)
        if not section:
            continue
        tid = technique_id_from_path(path)
        for vendor_key, line in find_vendor_lines(section):
            tier = coverage_for_line(line)
            det = detector_id_for_line(line)
            prose.setdefault(vendor_key, {})[tid] = (tier, det)

    added = 0
    upgraded_tier = 0
    for v in manifest.get("vendors", []):
        key = v["key"]
        if key not in prose:
            continue
        existing = {entry["id"]: entry for entry in (v.get("techniques") or [])}
        for tid, (extracted_tier, det) in sorted(prose[key].items(), key=lambda kv: _sort_key(kv[0])):
            if tid in existing:
                # Upgrade only if curator left it as "documented" but the prose
                # has an explicit marker. Curator-set tiers (full/partial/gap/
                # na) are sticky.
                cur = existing[tid]
                cur_tier = cur.get("coverage", "documented")
                if cur_tier == "documented" and extracted_tier in {"full", "partial", "gap", "na"}:
                    cur["coverage"] = extracted_tier
                    upgraded_tier += 1
                continue
            entry = {"id": tid, "coverage": extracted_tier}
            if det and "detector_id" not in entry:
                entry["detector_id"] = det
            existing[tid] = entry
            added += 1

        v["techniques"] = sorted(existing.values(), key=lambda e: _sort_key(e["id"]))

    # Write back as YAML, preserving the file header comments.
    header_lines = []
    for line in text.splitlines():
        if line.startswith("vendors:"):
            break
        header_lines.append(line)

    body = yaml.safe_dump(
        {"vendors": manifest["vendors"]},
        sort_keys=False,
        allow_unicode=True,
        width=200,
        default_flow_style=False,
    )

    out = "\n".join(header_lines).rstrip() + "\n\n" + body
    MANIFEST.write_text(out, encoding="utf-8")
    print(f"OK: synced {MANIFEST.relative_to(ROOT)} — added {added} edges, "
          f"upgraded {upgraded_tier} tiers from prose")
    return 0


def _sort_key(tech_id: str) -> tuple:
    body = tech_id.removeprefix("OAK-T")
    parts = []
    for chunk in body.split("."):
        try:
            parts.append(int(chunk))
        except ValueError:
            parts.append(0)
    return tuple(parts)


if __name__ == "__main__":
    sys.exit(main())
