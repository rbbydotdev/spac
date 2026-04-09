#!/usr/bin/env bash
set -euo pipefail

# Quick health check for the deployed spac playground.
# Usage: bash scripts/check-playground.sh [url]

URL="${1:-https://spac-playground.vercel.app}"
FAIL=0

check() {
  local path="$1"
  local label="$2"
  local status
  status=$(curl -s -o /dev/null -w '%{http_code}' "$URL$path")
  if [ "$status" = "200" ]; then
    echo "  OK  $label"
  else
    echo "  FAIL $label — got $status ($URL$path)"
    FAIL=1
  fi
}

check_no_redirect() {
  local path="$1"
  local label="$2"
  local effective_url
  effective_url=$(curl -s -o /dev/null -w '%{url_effective}' -L "$URL$path")
  if echo "$effective_url" | grep -q '%5B\|%5D\|object%20Object'; then
    echo "  FAIL $label — redirected to broken URL: $effective_url"
    FAIL=1
  else
    echo "  OK  $label"
  fi
}

check_json_shape() {
  local path="$1"
  local label="$2"
  local body
  body=$(curl -sf "$URL$path" 2>/dev/null || echo "FETCH_FAILED")
  if [ "$body" = "FETCH_FAILED" ]; then
    echo "  FAIL $label — could not fetch"
    FAIL=1
    return
  fi
  # Verify examples.json entries have .name string fields (not raw strings)
  local valid
  valid=$(echo "$body" | python3 -c "
import json, sys
data = json.load(sys.stdin)
assert isinstance(data, list), 'not a list'
for e in data:
    assert isinstance(e, dict), f'entry is not object: {e}'
    assert isinstance(e.get('name'), str), f'entry.name not string: {e}'
print('ok')
" 2>&1)
  if [ "$valid" = "ok" ]; then
    echo "  OK  $label"
  else
    echo "  FAIL $label — bad shape: $valid"
    FAIL=1
  fi
}

echo "Checking $URL ..."
echo ""
echo "Assets:"
check "/"                              "index.html"
check "/data/examples.json"            "examples index"
check "/data/petstore/manifest.json"   "petstore manifest"
check "/data/plantstore/manifest.json" "plantstore manifest"
check "/declarations.json"             "TS declarations"

echo ""
echo "Data contracts:"
check_json_shape "/data/examples.json" "examples.json shape"

echo ""
echo "App behavior:"
check_no_redirect "/"                  "no broken redirect"

echo ""
if [ "$FAIL" -eq 0 ]; then
  echo "All checks passed."
else
  echo "Some checks FAILED."
  exit 1
fi
