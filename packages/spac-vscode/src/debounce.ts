export function debounce(fn: () => void, ms: number): { trigger: () => void; dispose: () => void } {
  let timer: ReturnType<typeof setTimeout> | null = null
  return {
    trigger() {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null
        fn()
      }, ms)
    },
    dispose() {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    },
  }
}
