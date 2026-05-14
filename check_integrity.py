#!/usr/bin/env python3
"""Integrity check for OAK taxonomy: reverse refs, orphans, broken refs, etc."""
import os, re, sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(SCRIPT_DIR)

tech_dir = 'techniques'
ex_dir = 'examples'

# Build tech_by_id from filenames (split on first dash)
tech_by_id = {}
for f in os.listdir(tech_dir):
    if f.endswith('.md'):
        parts = f.split('-', 1)
        if parts:
            tech_by_id[parts[0]] = f

# Find OAK-T tags in example files
TAG_RE = re.compile(r'OAK-T\d[\d.]*')
ex_tags = {}
for f in sorted(os.listdir(ex_dir)):
    if f.endswith('.md'):
        with open(os.path.join(ex_dir, f)) as fh:
            content = fh.read()
        tags = TAG_RE.findall(content)
        ex_tags[f] = tags

# Find example references in technique files (format: [`examples/file.md`](../examples/file.md))
EX_RE = re.compile(r'\[`(examples/[^`]+\.md)`\]')
tech_refs = {}
for tid, fname in tech_by_id.items():
    with open(os.path.join(tech_dir, fname)) as fh:
        content = fh.read()
    refs = set(EX_RE.findall(content))
    tech_refs[tid] = refs

# --- ORPHANS ---
orphans = []
for f in sorted(ex_tags):
    if not ex_tags[f]:
        orphans.append(f)

# --- BROKEN REFS (technique -> example that doesn't exist) ---
broken = {}
for tid, refs in tech_refs.items():
    bad = [r for r in refs if not os.path.exists(os.path.join(ex_dir, os.path.basename(r)))]
    if bad:
        broken[tid] = bad

# Also check: example -> technique matches exist
# For each tag in an example, find which technique it maps to, check if that technique references back

# Build the mapping: for each technique ID, find all example files that tag it
tag_to_examples = {}
for ex_fname, tags in ex_tags.items():
    for tag in tags:
        tag_id = tag[4:] if tag.startswith('OAK-') else tag  # strip OAK- prefix
        # Find best matching technique
        matched = None
        for tid in tech_by_id:
            if tag_id.startswith(tid):
                if matched is None or len(tid) > len(matched):
                    matched = tid
        if matched:
            tag_to_examples.setdefault(matched, set()).add(ex_fname)

# --- MISSING REVERSE REFS (example tags technique but technique doesn't reference example) ---
missing = {}
for tid, examples in sorted(tag_to_examples.items()):
    refs = tech_refs.get(tid, set())
    for ex in sorted(examples):
        # Check if ex appears in any ref (the ref might be examples/subdir/ex.md or just ex.md)
        if ex not in refs:
            # Check if any ref ends with ex
            found = any(r.endswith(ex) or r == f'examples/{ex}' for r in refs)
            if not found:
                # Also check if the example filename appears in the technique body text at all
                with open(os.path.join(tech_dir, tech_by_id[tid])) as fh:
                    full_content = fh.read()
                if ex not in full_content:
                    missing.setdefault(tid, []).append(ex)

# --- Print Report ---
print("=" * 70)
print("OAK TAXONOMY INTEGRITY REPORT")
print("=" * 70)

print(f"\nTechniques: {len(tech_by_id)}")
print(f"Examples: {len(ex_tags)}")

print(f"\n--- ORPHANS (examples with no OAK tags): {len(orphans)} ---")
for f in orphans:
    print(f"  {f}")

print(f"\n--- BROKEN REFS (tech->ex to missing file): {sum(len(v) for v in broken.values())} ---")
for tid in sorted(broken):
    print(f"  {tid} ({tech_by_id[tid]}):")
    for r in broken[tid]:
        print(f"    {r}")

# Count total missing
total_missing = sum(len(v) for v in missing.values())
n_tech_missing = len(missing)
print(f"\n--- MISSING REVERSE REFS (ex tagged but tech doesn't ref it): {total_missing} across {n_tech_missing} techniques ---")
for tid in sorted(missing):
    print(f"  {tid} ({tech_by_id[tid]}): {len(missing[tid])} missing")
    for ex in missing[tid]:
        print(f"    - {ex}")

# Year coverage
print("\n--- YEAR COVERAGE (examples per year) ---")
year_counts = {}
for f in ex_tags:
    try:
        y = int(f[:4])
    except:
        y = 'unknown'
    year_counts[y] = year_counts.get(y, 0) + 1
for y in sorted(year_counts, key=lambda x: (0 if isinstance(x, int) else 1, x)):
    print(f"  {y}: {year_counts[y]} examples")

# Techniques per example distribution
tech_per_ex = {f: len(tags) for f, tags in ex_tags.items()}
singletons = sum(1 for v in tech_per_ex.values() if v == 1)
print(f"\n--- TAGS PER EXAMPLE ---")
print(f"  Singletons (1 tag): {singletons}")
print(f"  2+ tags: {sum(1 for v in tech_per_ex.values() if v >= 2)}")

# Examples per technique
print(f"\n--- EXAMPLES PER TECHNIQUE ---")
ex_per_tech = {}
for tid in tech_by_id:
    count = len(tag_to_examples.get(tid, set()))
    ex_per_tech[tid] = count
below_3 = [(tid, ex_per_tech[tid]) for tid in sorted(ex_per_tech) if ex_per_tech[tid] < 3]
print(f"  Below 3 examples: {len(below_3)}")
for tid, count in below_3:
    print(f"    {tid}: {count}")

# Average
avg = sum(ex_per_tech.values()) / len(ex_per_tech)
print(f"  Average: {avg:.1f} examples per technique")

# Non-year-prefixed files
non_year = [f for f in ex_tags if not f[:4].isdigit()]
print(f"\n--- NON-YEAR-PREFIXED FILES: {len(non_year)} ---")
for f in non_year:
    print(f"  {f}")

# --- SECTION QUALITY ---
print("\n--- EXAMPLE SECTION QUALITY ---")
missing_loss = []
missing_kpt = []
missing_timeline = []
missing_refs = []
for f in sorted(ex_tags.keys()):
    path = os.path.join(ex_dir, f)
    with open(path) as fh:
        content = fh.read()
    if '**Loss:**' not in content:
        missing_loss.append(f)
    if '**Key teaching point:**' not in content:
        missing_kpt.append(f)
    if '## Timeline' not in content:
        missing_timeline.append(f)
    has_refs = ('## Public references' in content or
                '## Public References' in content or
                '## References' in content)
    if not has_refs:
        missing_refs.append(f)

print(f"  Missing Loss: {len(missing_loss)}")
print(f"  Missing Key Teaching Point: {len(missing_kpt)}")
print(f"  Missing Timeline: {len(missing_timeline)}")
print(f"  Missing References section: {len(missing_refs)}")

print("\nDone.")
