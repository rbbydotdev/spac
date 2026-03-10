import type { ParsedOperation, OperationGroup } from './types'
import { toSlug, toRegisterFn, toPascalCase } from './names'

/**
 * Group operations by first path segment (after applying prefix stripping).
 *
 * e.g. with stripPrefixes=['/accounts/{account_id}']:
 *   /accounts                          → group "accounts"
 *   /accounts/{account_id}             → group "accounts"
 *   /accounts/{account_id}/access/apps → group "access"
 *   /zones/{zone_id}/dns_records       → group "dns-records"  (no strip match)
 *   /user                              → group "user"
 */
export function groupByPath(
  operations: ParsedOperation[],
  stripPrefixes: string[] = [],
): OperationGroup[] {
  const groupMap = new Map<string, ParsedOperation[]>()

  for (const op of operations) {
    const stripped = applyStripPrefixes(op.path, stripPrefixes)
    const seg = firstSegment(stripped || op.path)
    const slug = toSlug(seg)
    if (!groupMap.has(slug)) groupMap.set(slug, [])
    groupMap.get(slug)!.push(op)
  }

  const groups: OperationGroup[] = []
  for (const [slug, ops] of groupMap) {
    groups.push({
      name: toPascalCase(slug),
      slug,
      registerFn: toRegisterFn(slug),
      operations: ops,
    })
  }

  groups.sort((a, b) => a.slug.localeCompare(b.slug))
  return groups
}

/**
 * Try each strip prefix against the path.
 * Returns the remainder after stripping, or the original path if no match.
 */
export function applyStripPrefixes(path: string, prefixes: string[]): string {
  for (const prefix of prefixes) {
    if (path.startsWith(prefix + '/')) {
      return path.slice(prefix.length)
    }
    if (path === prefix) {
      return '' // exact match → remainder is empty
    }
  }
  return path
}

/**
 * Extract the first path segment (without leading slash).
 * "/access/apps/{id}" → "access"
 * "/dns_records" → "dns_records"
 */
export function firstSegment(path: string): string {
  const segments = path.split('/').filter(Boolean)
  // Skip path param segments like {account_id}
  return segments[0] || 'other'
}

/**
 * Find the longest common path prefix among a set of paths.
 * Only returns complete segments. Returns '' if no common prefix beyond '/'.
 */
export function findCommonPrefix(paths: string[]): string {
  if (paths.length === 0) return ''
  if (paths.length === 1) return paths[0]

  const segmented = paths.map(p => p.split('/').filter(Boolean))
  const common: string[] = []

  for (let i = 0; ; i++) {
    const seg = segmented[0]?.[i]
    if (!seg) break
    if (segmented.every(s => s[i] === seg)) {
      common.push(seg)
    } else {
      break
    }
  }

  return common.length > 0 ? '/' + common.join('/') : ''
}

/**
 * Strip a prefix from a path, returning the relative path.
 */
export function stripPrefix(path: string, prefix: string): string {
  if (path === prefix) return '/'
  if (path.startsWith(prefix)) {
    const rest = path.slice(prefix.length)
    return rest.startsWith('/') ? rest : '/' + rest
  }
  return path
}

/**
 * Extract path parameter names from a path string.
 */
export function extractPathParams(path: string): string[] {
  const matches = path.matchAll(/\{([^}]+)\}/g)
  return Array.from(matches, m => m[1])
}
