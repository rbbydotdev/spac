interface SpinnerProps {
  progress?: number | null
}

export function Spinner({ progress }: SpinnerProps) {
  const pct = progress != null ? Math.round(progress * 100) : null

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="size-6 animate-spin rounded-full border-2 border-muted-foreground/20 border-t-foreground" />
      {pct != null ? (
        <div className="flex flex-col items-center gap-1.5">
          <div className="h-1 w-32 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-foreground transition-[width] duration-150 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-xs tabular-nums text-muted-foreground">{pct}%</p>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">Loading...</p>
      )}
    </div>
  )
}
