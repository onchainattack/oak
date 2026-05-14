import os
import re
from collections import Counter

examples_dir = "/Users/dmytro.chystiakov/Projects/oak/examples"
techniques_dir = "/Users/dmytro.chystiakov/Projects/oak/techniques"

# Get all technique IDs from technique filenames
technique_files = [f for f in os.listdir(techniques_dir) if f.endswith('.md')]
technique_ids = set()
for f in technique_files:
    m = re.match(r'(T\d+\.\d+(?:\.\d+)?)', f)
    if m:
        technique_ids.add(m.group(1))
print(f"Total technique files: {len(technique_ids)}")

# Count OAK-T references in example files
tech_counter = Counter()
example_files = [f for f in os.listdir(examples_dir) if f.endswith('.md')]
for f in example_files:
    path = os.path.join(examples_dir, f)
    with open(path) as fh:
        content = fh.read()
        # Find all OAK-T#.### references
        refs = re.findall(r'OAK-(T\d+\.\d+)', content)
        for ref in refs:
            tech_counter[ref] += 1

# Find singletons (<=1 example)
singletons = {}
for tid in sorted(technique_ids):
    count = tech_counter.get(tid, 0)
    if count <= 1:
        singletons[tid] = count

print(f"\nSingletons (<=1 example reference): {len(singletons)}")
for tid, count in singletons.items():
    print(f"  {tid}: {count} examples")

print("\n\nTechniques with 0 example references:")
for tid, count in singletons.items():
    if count == 0:
        print(f"  {tid}")

print("\n\nTechniques with exactly 1 example reference:")
for tid, count in singletons.items():
    if count == 1:
        print(f"  {tid}")

print(f"\n\nTotal techniques: {len(technique_ids)}")
print(f"Total with 2+ examples: {len(technique_ids) - len(singletons)}")
