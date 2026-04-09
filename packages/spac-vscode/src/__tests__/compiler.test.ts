import { describe, it, expect } from 'vitest'
import type { WorkerResponse, CompileResult } from '../types.js'

describe('WorkerResponse protocol', () => {
  it('can represent a successful compile result', () => {
    const result: CompileResult = {
      yaml: 'openapi: "3.1.0"\ninfo:\n  title: Test\n  version: "1.0.0"',
      sourceMap: '{"version":3,"file":"openapi.yaml","sources":[],"mappings":""}',
      sourceTable: [],
    }
    const response: WorkerResponse = { ok: true, result }

    expect(response.ok).toBe(true)
    if (response.ok) {
      expect(response.result.yaml).toContain('openapi')
      expect(JSON.parse(response.result.sourceMap).version).toBe(3)
      expect(response.result.sourceTable).toEqual([])
    }
  })

  it('can represent a compile error', () => {
    const response: WorkerResponse = {
      ok: false,
      error: 'No Api instance found.',
    }

    expect(response.ok).toBe(false)
    if (!response.ok) {
      expect(response.error).toContain('No Api instance')
    }
  })

  it('discriminates via ok field', () => {
    const success: WorkerResponse = {
      ok: true,
      result: {
        yaml: '',
        sourceMap: '{}',
        sourceTable: [],
      },
    }
    const failure: WorkerResponse = {
      ok: false,
      error: 'fail',
    }

    // Type narrowing works
    if (success.ok) {
      expect(success.result).toBeDefined()
    }
    if (!failure.ok) {
      expect(failure.error).toBe('fail')
    }
  })
})
