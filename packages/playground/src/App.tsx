import { useState, useEffect, useCallback, useRef } from 'react'
import { NuqsAdapter } from 'nuqs/adapters/react'
import { SpacViewer, type ExampleOption } from './components/SpacViewer'
import { Spinner } from './components/Spinner'
import type { Manifest, ExampleIndexEntry } from './types'
import { baseUrl } from './lib/base'

const EXAMPLE_OPTIONS: Record<string, ExampleOption> = {
  petstore: { value: 'petstore', label: 'petstore' },
  plantstore: { value: 'plantstore', label: 'plantstore' },
  serpapi: { value: 'serpapi', label: 'serpapi' },
  cloudflare: {
    value: 'cloudflare',
    label: <>cloudflare <span className="text-[10px] text-muted-foreground/60">(BIG ~18MB)</span></>,
  },
}

function getExampleFromPath(): string | null {
  // Check for SPA fallback redirect (GitHub Pages 404.html sets __route param)
  const params = new URLSearchParams(window.location.search)
  const route = params.get('__route')
  if (route) {
    // Clean up the __route param from the URL
    params.delete('__route')
    const clean = params.toString()
    const newUrl = `${baseUrl}${route}${clean ? '?' + clean : ''}${window.location.hash}`
    window.history.replaceState({}, '', newUrl)
    return route.split('/')[0] || null
  }

  // Strip the Vite base URL before parsing
  const path = window.location.pathname.replace(baseUrl.replace(/\/$/, ''), '')
  const seg = path.split('/').filter(Boolean)[0]
  return seg || null
}

function App() {
  const [examples, setExamples] = useState<ExampleOption[] | null>(null)
  const [activeExample, setActiveExample] = useState<string | null>(getExampleFromPath)
  const [manifest, setManifest] = useState<Manifest | null>(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fetchId = useRef(0)
  const activeExampleRef = useRef(activeExample)
  activeExampleRef.current = activeExample

  const loadManifest = useCallback((example: string) => {
    const id = ++fetchId.current
    setLoading(true)
    setProgress(null)
    setError(null)

    fetchWithProgress(`${baseUrl}data/${example}/manifest.json`, p => {
      if (id === fetchId.current) setProgress(p)
    })
      .then(text => {
        if (id !== fetchId.current) return
        setManifest(JSON.parse(text))
        setLoading(false)
        setProgress(null)
      })
      .catch(e => {
        if (id !== fetchId.current) return
        setError(e.message)
        setLoading(false)
        setProgress(null)
      })
  }, [])

  // Fetch examples index + initial manifest on mount
  useEffect(() => {
    const initial = getExampleFromPath()
    if (initial) {
      loadManifest(initial)
    }

    fetch(`${baseUrl}data/examples.json`)
      .then(res => {
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
        return res.json()
      })
      .then((entries: ExampleIndexEntry[]) => {
        setExamples(entries.map(e => EXAMPLE_OPTIONS[e.name] ?? { value: e.name, label: e.name }))
        if (!initial && entries.length > 0) {
          navigateTo(entries[0].name)
          setActiveExample(entries[0].name)
          loadManifest(entries[0].name)
        }
      })
      .catch(e => setError(e.message))
  }, [loadManifest])

  const switchExample = useCallback((name: string) => {
    if (name === activeExampleRef.current) return
    navigateTo(name)
    setManifest(null)
    setActiveExample(name)
    loadManifest(name)
  }, [loadManifest])

  if (error && !manifest) {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <p className="text-sm font-medium text-destructive">Failed to load</p>
          <p className="mt-1 text-xs text-muted-foreground">{error}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Run <code className="rounded bg-muted px-1 py-0.5">pnpm --filter spac-playground generate</code> first.
          </p>
        </div>
      </div>
    )
  }

  if (!manifest || !examples || !activeExample) {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-foreground">
        <Spinner progress={progress} />
      </div>
    )
  }

  return (
    <NuqsAdapter>
      <SpacViewer
        key={activeExample}
        manifest={manifest}
        example={activeExample}
        examples={examples}
        loading={loading}
        progress={progress}
        onSwitchExample={switchExample}
      />
    </NuqsAdapter>
  )
}

async function fetchWithProgress(
  url: string,
  onProgress: (ratio: number) => void,
): Promise<string> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)

  const contentLength = res.headers.get('Content-Length')
  if (!contentLength || !res.body) {
    // No Content-Length or no streaming — fall back to plain text
    return res.text()
  }

  const total = parseInt(contentLength, 10)
  const reader = res.body.getReader()
  const chunks: Uint8Array[] = []
  let received = 0

  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    chunks.push(value)
    received += value.length
    onProgress(received / total)
  }

  const buf = new Uint8Array(received)
  let offset = 0
  for (const chunk of chunks) {
    buf.set(chunk, offset)
    offset += chunk.length
  }
  return new TextDecoder().decode(buf)
}

function navigateTo(example: string) {
  const url = new URL(window.location.href)
  url.pathname = `${baseUrl}${example}`
  url.search = ''
  window.history.pushState({}, '', url)
}

export default App
