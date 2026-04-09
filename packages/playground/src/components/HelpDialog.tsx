import { Dialog } from "@base-ui/react/dialog"
import { CircleHelp, X, MousePointerClick, ArrowLeftRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HelpDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        render={
          <Button variant="default" size="xs" />
        }
      >
        <CircleHelp className="size-3" />
        <span>Help</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/40 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-background p-6 shadow-lg transition duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
          <Dialog.Title className="text-base font-semibold">
            How it works
          </Dialog.Title>

          <div className="mt-4 space-y-4 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <MousePointerClick className="mt-0.5 size-4 shrink-0 text-foreground" />
              <p>
                <span className="font-medium text-foreground">Click any line</span> in either pane to highlight the corresponding line in the other.
                SPAC source on the left, generated OpenAPI YAML on the right.
              </p>
            </div>

            <div className="flex gap-3">
              <ArrowLeftRight className="mt-0.5 size-4 shrink-0 text-foreground" />
              <p>
                <span className="font-medium text-foreground">Source mapping</span> connects every line of your SPAC TypeScript to the OpenAPI spec it produces.
                Click a YAML path to jump to the route that generated it, or click a route to find it in the spec.
              </p>
            </div>

            <div className="flex gap-3">
              <span className="mt-0.5 shrink-0 text-foreground font-mono text-xs leading-4">⌘</span>
              <p>
                <span className="font-medium text-foreground">Cmd/Ctrl + click</span> a symbol in the TypeScript pane to go to its definition.
              </p>
            </div>

            <p className="text-xs text-muted-foreground/70 pt-1">
              Switch between example specs using the dropdown in the toolbar. Use the sidebar to navigate files in multi-file specs.
            </p>
          </div>

          <Dialog.Close
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="absolute top-3 right-3"
              />
            }
          >
            <X className="size-4" />
          </Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
