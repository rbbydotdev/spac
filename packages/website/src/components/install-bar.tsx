"use client"

import { useState, useCallback } from "react"
import { Check, Copy } from "lucide-react"

const managers = [
  { name: "npm", cmd: "npm install @spec-spac/spac @sinclair/typebox" },
  { name: "pnpm", cmd: "pnpm add @spec-spac/spac @sinclair/typebox" },
  { name: "bun", cmd: "bun add @spec-spac/spac @sinclair/typebox" },
] as const

export function InstallBar() {
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)

  const copy = useCallback(() => {
    navigator.clipboard.writeText(managers[active].cmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [active])

  return (
    <div className="mx-auto flex flex-col items-center gap-0">
      <div className="flex gap-1 text-xs">
        {managers.map((m, i) => (
          <button
            key={m.name}
            onClick={() => setActive(i)}
            className={`px-2.5 py-1 rounded-t-md transition-colors ${
              i === active
                ? "bg-fd-card border border-b-0 border-fd-border text-fd-foreground font-medium"
                : "text-fd-muted-foreground hover:text-fd-foreground"
            }`}
          >
            {m.name}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3 rounded-lg border border-fd-border bg-fd-card px-4 py-2.5 text-sm font-mono text-fd-foreground">
        <span className="text-fd-primary">$</span>
        <code>{managers[active].cmd}</code>
        <button
          onClick={copy}
          className="ml-1 rounded p-1 text-fd-muted-foreground transition-colors hover:text-fd-foreground hover:bg-fd-accent"
          aria-label="Copy to clipboard"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        </button>
      </div>
    </div>
  )
}
