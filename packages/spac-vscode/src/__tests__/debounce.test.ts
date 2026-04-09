import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { debounce } from '../debounce.js'

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('calls fn after the delay', () => {
    const fn = vi.fn()
    const d = debounce(fn, 300)

    d.trigger()
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(300)
    expect(fn).toHaveBeenCalledOnce()
  })

  it('coalesces rapid triggers into a single call', () => {
    const fn = vi.fn()
    const d = debounce(fn, 300)

    d.trigger()
    vi.advanceTimersByTime(100)
    d.trigger()
    vi.advanceTimersByTime(100)
    d.trigger()
    vi.advanceTimersByTime(100)

    // 300ms since last trigger hasn't elapsed yet
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(200)
    expect(fn).toHaveBeenCalledOnce()
  })

  it('allows multiple invocations after each delay completes', () => {
    const fn = vi.fn()
    const d = debounce(fn, 100)

    d.trigger()
    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(1)

    d.trigger()
    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('does not fire after dispose', () => {
    const fn = vi.fn()
    const d = debounce(fn, 300)

    d.trigger()
    d.dispose()
    vi.advanceTimersByTime(300)

    expect(fn).not.toHaveBeenCalled()
  })
})
