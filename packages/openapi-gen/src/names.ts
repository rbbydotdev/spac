/**
 * Convert a string to PascalCase.
 * "aaa_account-id" → "AaaAccountId"
 * "DNS Records" → "DnsRecords"
 */
export function toPascalCase(s: string): string {
  return s
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('')
}

/**
 * Convert a string to a URL/directory slug.
 * "DNS Records" → "dns-records"
 * "User API Tokens" → "user-api-tokens"
 */
export function toSlug(s: string): string {
  return s
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
}

/**
 * Convert a tag name to a register function name.
 * "DNS Records" → "registerDnsRecords"
 * "User API Tokens" → "registerUserApiTokens"
 */
export function toRegisterFn(tag: string): string {
  const pascal = toPascalCase(tag)
  return `register${pascal}`
}

/**
 * Make an object property key safe for TypeScript.
 * Returns the key bare if it's a valid identifier, else quoted.
 */
export function toSafeKey(key: string): string {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : JSON.stringify(key)
}

/**
 * Convert a component schema key to a TypeScript variable name.
 * Preserves PascalCase if already PascalCase, otherwise converts.
 */
export function schemaVarName(schemaKey: string): string {
  // If it's already PascalCase-ish (starts with uppercase, no special chars), keep it
  if (/^[A-Z][a-zA-Z0-9]*$/.test(schemaKey)) return schemaKey
  return toPascalCase(schemaKey)
}
