import { describe, it, expect } from 'vitest'
import { toPascalCase, toSlug, toRegisterFn, toSafeKey, schemaVarName } from '../names'

describe('toPascalCase', () => {
  it('converts snake_case', () => expect(toPascalCase('account_id')).toBe('AccountId'))
  it('converts kebab-case', () => expect(toPascalCase('dns-records')).toBe('DnsRecords'))
  it('converts space-separated', () => expect(toPascalCase('DNS Records')).toBe('DnsRecords'))
  it('handles prefixed keys', () => expect(toPascalCase('aaa_api-response-common')).toBe('AaaApiResponseCommon'))
  it('handles already PascalCase', () => expect(toPascalCase('Pet')).toBe('Pet'))
})

describe('toSlug', () => {
  it('converts tag names', () => expect(toSlug('DNS Records')).toBe('dns-records'))
  it('converts multi-word', () => expect(toSlug('User API Tokens')).toBe('user-api-tokens'))
  it('handles camelCase', () => expect(toSlug('accessPolicies')).toBe('access-policies'))
  it('lowercases', () => expect(toSlug('Accounts')).toBe('accounts'))
})

describe('toRegisterFn', () => {
  it('creates register function name', () => expect(toRegisterFn('DNS Records')).toBe('registerDnsRecords'))
  it('simple tag', () => expect(toRegisterFn('Accounts')).toBe('registerAccounts'))
})

describe('toSafeKey', () => {
  it('keeps valid identifiers', () => expect(toSafeKey('name')).toBe('name'))
  it('quotes keys with hyphens', () => expect(toSafeKey('content-type')).toBe('"content-type"'))
  it('quotes keys with dots', () => expect(toSafeKey('name.contains')).toBe('"name.contains"'))
})

describe('schemaVarName', () => {
  it('keeps PascalCase', () => expect(schemaVarName('Pet')).toBe('Pet'))
  it('converts non-PascalCase', () => expect(schemaVarName('aaa_account-id')).toBe('AaaAccountId'))
})
