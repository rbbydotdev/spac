import Link from "next/link";
import { InstallBar } from "@/components/install-bar";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1 gap-6 px-6">
      <h1
        className="text-5xl font-bold tracking-wider"
        style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
      >
        spac
      </h1>
      <p className="text-lg text-fd-muted-foreground max-w-xl mx-auto leading-relaxed">
        TypeScript DSL for authoring OpenAPI 3.1+ specs. You write TypeScript,
        OpenAPI is the output.
      </p>

      <InstallBar />

      <div className="flex flex-row gap-3 justify-center mt-2">
        <Link
          href="/docs"
          className="inline-flex items-center rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-semibold text-fd-primary-foreground transition-all hover:brightness-110"
        >
          Documentation
        </Link>
        <Link
          href="/docs/tutorials/getting-started"
          className="inline-flex items-center rounded-lg border border-fd-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-fd-accent"
        >
          Get Started
        </Link>
      </div>

      {/* Quick feature highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-8 text-left">
        <div className="rounded-lg border border-fd-border bg-fd-card p-4">
          <h3 className="text-sm font-semibold mb-1 text-fd-primary">
            TypeBox schemas
          </h3>
          <p className="text-xs text-fd-muted-foreground leading-relaxed">
            Full JSON Schema type inference with zero wrappers
          </p>
        </div>
        <div className="rounded-lg border border-fd-border bg-fd-card p-4">
          <h3 className="text-sm font-semibold mb-1 text-fd-primary">
            Source maps
          </h3>
          <p className="text-xs text-fd-muted-foreground leading-relaxed">
            Map every YAML line back to the TypeScript that produced it
          </p>
        </div>
        <div className="rounded-lg border border-fd-border bg-fd-card p-4">
          <h3 className="text-sm font-semibold mb-1 text-fd-primary">
            Named $refs
          </h3>
          <p className="text-xs text-fd-muted-foreground leading-relaxed">
            Schemas auto-hoist to components.schemas as $ref pointers
          </p>
        </div>
      </div>
    </div>
  );
}
