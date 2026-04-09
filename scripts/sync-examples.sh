#!/usr/bin/env bash
set -euo pipefail

# Pulls large example fixtures from the `examples` orphan branch into the working tree.
# These files are gitignored on master, so this never creates a commit.
#
# Usage:
#   pnpm sync-examples          # from repo root
#   bash scripts/sync-examples.sh
#
# What it syncs:
#   packages/examples/cloudflare/   — 13 MB OpenAPI spec (used by codegen-from-specs.ts)

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

echo "Fetching examples branch..."
git fetch --depth 1 origin examples:refs/remotes/origin/examples

echo "Extracting example files..."
git archive origin/examples | tar -x

echo "Synced examples from origin/examples"
