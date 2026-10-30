#!/usr/bin/env bash
# PostToolUse hook (Edit|Write): validate an edited examples/*.md file at once,
# so Claude (or a subagent) fixes problems in the same turn instead of at
# `npm run check`. Exit 2 feeds stderr back to Claude; the edit itself stays.
set -u
input=$(cat)
file=$(printf '%s' "$input" | python3 -c 'import json,sys
try:
    d=json.load(sys.stdin); print((d.get("tool_input") or {}).get("file_path",""))
except Exception:
    print("")')
case "$file" in
  */examples/*.md) ;;
  *) exit 0 ;;
esac
[ -f "$file" ] || exit 0
cd "${CLAUDE_PROJECT_DIR:-$(git -C "$(dirname "$file")" rev-parse --show-toplevel)}" || exit 0
out=""
for check in check_timeline check_root_cause check_flow; do
  res=$(python3 "tools/$check.py" --file "$file" 2>&1) || out="$out$res"$'\n'
done
if [ -n "$out" ]; then
  {
    echo "OAK validation failed for $(basename "$file") — fix before moving on:"
    printf '%s' "$out" | grep -v '^OAK \|^FAIL\|^OK$'
  } >&2
  exit 2
fi
exit 0
