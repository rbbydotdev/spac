import { describe, it, expect } from 'vitest'
import { Api } from './index'

describe('Api', () => {
  it('should create an instance with a name', () => {
    const api = new Api('my-api')
    expect(api.name).toBe('my-api')
  })
})
