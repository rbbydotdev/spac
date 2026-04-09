#!/usr/bin/env bash
set -euo pipefail

# Publish @spec-spac packages to npm.
#
# Usage:
#   ./scripts/publish.sh <package> <bump>
#   ./scripts/publish.sh all patch
#
# Examples:
#   ./scripts/publish.sh spac patch          # @spec-spac/spac 0.0.2 → 0.0.3
#   ./scripts/publish.sh spac minor          # @spec-spac/spac 0.0.3 → 0.1.0
#   ./scripts/publish.sh from-openapi patch  # @spec-spac/from-openapi
#   ./scripts/publish.sh biome patch         # @spec-spac/from-openapi-biome
#   ./scripts/publish.sh prettier patch      # @spec-spac/from-openapi-prettier
#   ./scripts/publish.sh all patch           # all four packages
#
# Set NPM_TOKEN env var to skip interactive login.

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

declare -A PKG_DIRS=(
  [spac]="packages/spac"
  [from-openapi]="packages/from-openapi"
  [biome]="packages/from-openapi/plugins/biome"
  [prettier]="packages/from-openapi/plugins/prettier"
)

# Publish order matters — dependencies first
PUBLISH_ORDER=(spac from-openapi biome prettier)

usage() {
  echo "Usage: $0 <package|all> <patch|minor|major>"
  echo ""
  echo "Packages: spac, from-openapi, biome, prettier, all"
  exit 1
}

publish_one() {
  local name="$1"
  local bump="$2"
  local dir="${PKG_DIRS[$name]}"
  local full_dir="$REPO_ROOT/$dir"

  echo ""
  echo "═══ $name ═══"

  # Bump version
  cd "$full_dir"
  npm version "$bump" --no-git-tag-version
  local version
  version=$(node -p "require('./package.json').version")
  local pkg_name
  pkg_name=$(node -p "require('./package.json').name")
  echo "  Version: $pkg_name@$version"

  # Build
  echo "  Building..."
  cd "$REPO_ROOT"
  pnpm --filter "$pkg_name" build

  # Publish
  echo "  Publishing..."
  cd "$full_dir"
  npm publish --access public
  echo "  ✓ Published $pkg_name@$version"
  cd "$REPO_ROOT"
}

# --- Args ---
[[ $# -lt 2 ]] && usage

PKG="$1"
BUMP="$2"

if [[ "$BUMP" != "patch" && "$BUMP" != "minor" && "$BUMP" != "major" ]]; then
  echo "Error: bump must be patch, minor, or major"
  usage
fi

# --- Auth ---
if [[ -n "${NPM_TOKEN:-}" ]]; then
  echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > "$REPO_ROOT/.npmrc"
  trap 'rm -f "$REPO_ROOT/.npmrc"' EXIT
  echo "Using NPM_TOKEN for auth"
fi

# --- Publish ---
if [[ "$PKG" == "all" ]]; then
  for name in "${PUBLISH_ORDER[@]}"; do
    publish_one "$name" "$BUMP"
  done
else
  if [[ -z "${PKG_DIRS[$PKG]:-}" ]]; then
    echo "Error: unknown package '$PKG'"
    usage
  fi
  publish_one "$PKG" "$BUMP"
fi

echo ""
echo "Done. Don't forget to commit the version bumps and push."
