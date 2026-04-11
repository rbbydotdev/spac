import Link from "next/link";
import { GitMerge, Orbit, Package, ShieldCheck } from "lucide-react";
import { highlight } from "fumadocs-core/highlight";
import shikiDark from "@spac/theme/shiki-dark.json";
import shikiLight from "@spac/theme/shiki-light.json";
import { InstallBar } from "@/components/install-bar";

type Feature = {
  icon: typeof GitMerge;
  accent: string;
  title: string;
  body: React.ReactNode;
  hintCode: string;
};

const features: Feature[] = [
  {
    icon: GitMerge,
    accent: "var(--feat-accent-merge)",
    title: "Merge-friendly by design",
    body: (
      <>
        Each team owns a TypeScript module. Diffs are line-level — not
        indentation battles in a 10k-line YAML.
      </>
    ),
    hintCode: `api.group('/pets', g => g.get('/').response(Pet))`,
  },
  {
    icon: ShieldCheck,
    accent: "var(--feat-accent-version)",
    title: "Compile-time version safety",
    body: (
      <>
        <code className="text-fd-foreground">{`Api<'3.1'>`}</code> in function
        signatures. <code className="text-fd-foreground">assertVersion()</code>{" "}
        catches team drift before CI even runs.
      </>
    ),
    hintCode: `function registerPets(api: Api<'3.1'>) {}`,
  },
  {
    icon: Package,
    accent: "var(--feat-accent-macros)",
    title: "Share macros, not copy-paste",
    body: (
      <>
        Auth, audit headers, <code className="text-fd-foreground">x-</code>{" "}
        extensions — publish once, import everywhere.
      </>
    ),
    hintCode: `import { authenticated } from '@co/macros'`,
  },
];

const compositionCode = `// Each team owns its own module — monorepo or multi-repo.
import { Api } from '@spec-spac/spac'
import { registerPets } from '@co/api-pets'
import { registerOrders } from '@co/api-orders'
import { registerUsers } from '@co/api-users'

const api = new Api('3.1', 'Company API', { versionPolicy: 'strict' })

registerPets(api)    // @co/api-pets
registerOrders(api)  // @co/api-orders
registerUsers(api)   // @co/api-users

api.versionAudit().compatible  // ← fails CI on drift
api.emit()                     // ← plain OpenAPI 3.1
`;

// Shiki options — same dual-theme setup source.config.ts uses for MDX,
// so code here is rendered with the identical tokenizer + theme as the
// rest of the site. Runs at `next build` time (Server Component + static
// export), so there's no runtime JS cost.
// biome-ignore lint/suspicious/noExplicitAny: shiki theme JSONs are VSCode-format and not narrowed to ThemeRegistrationAny.
const highlightOptions = {
  lang: "ts",
  themes: { light: shikiLight as any, dark: shikiDark as any },
};

export default async function HomePage() {
  const compositionNode = await highlight(compositionCode, highlightOptions);

  const featuresWithHints = await Promise.all(
    features.map(async (f) => ({
      ...f,
      hintNode: await highlight(f.hintCode, highlightOptions),
    })),
  );

  return (
    <div className="flex flex-col items-center flex-1 gap-16 px-6 pt-20 pb-24 sm:pt-28">
      {/* Hero */}
      <div className="flex flex-col items-center text-center gap-6">
        <h1
          className="inline-flex items-center gap-3 text-5xl sm:text-6xl font-bold tracking-wider"
          style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
        >
          <Orbit className="size-12 sm:size-14" />
          spac
        </h1>
        <p className="text-lg text-fd-muted-foreground max-w-xl leading-relaxed">
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
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl w-full text-left">
        {featuresWithHints.map(
          ({ icon: Icon, accent, title, body, hintNode }) => (
            <div
              key={title}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-fd-border bg-fd-card p-5 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-fd-ring/50"
            >
              {/* Top accent rail */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px opacity-80"
                style={{ background: accent }}
              />
              {/* Glow under the rail on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-12 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `radial-gradient(60% 100% at 50% 0%, color-mix(in srgb, ${accent} 14%, transparent), transparent 70%)`,
                }}
              />

              <Icon
                className="size-5 mb-3"
                style={{ color: accent }}
                aria-hidden
              />
              <h3 className="text-sm font-semibold mb-1.5 text-fd-foreground tracking-tight">
                {title}
              </h3>
              <p className="text-xs text-fd-muted-foreground leading-relaxed">
                {body}
              </p>

              {/* Shiki-tokenized one-line code hint — pushed to the card
                 bottom via mt-auto so all three cards align regardless of
                 body text length. */}
              <div className="shiki-inline mt-auto pt-4 border-t border-dashed border-fd-border/60 text-[10.5px] leading-snug">
                {hintNode}
              </div>
            </div>
          ),
        )}
      </div>

      {/* Multi-team composition section */}
      <div className="max-w-3xl w-full text-left">
        <div
          className="text-[10px] uppercase tracking-[0.2em] text-fd-muted-foreground mb-3"
          style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
        >
          Multi-team composition
        </div>
        <div className="shiki-window relative rounded-lg border border-fd-border bg-fd-card overflow-hidden">
          {/* Window chrome */}
          <div className="flex items-center gap-1.5 px-4 py-2 border-b border-fd-border/60">
            <span
              className="size-2.5 rounded-full"
              style={{ background: "var(--feat-dot-red)" }}
            />
            <span
              className="size-2.5 rounded-full"
              style={{ background: "var(--feat-dot-yellow)" }}
            />
            <span
              className="size-2.5 rounded-full"
              style={{ background: "var(--feat-dot-green)" }}
            />
            <span className="ml-2 text-[10px] text-fd-muted-foreground">
              index.ts
            </span>
          </div>
          {/* Shiki-tokenized code block */}
          <div className="shiki-block text-xs leading-relaxed">
            {compositionNode}
          </div>
        </div>
        <p className="text-xs text-fd-muted-foreground mt-3 leading-relaxed">
          Each team declares the OpenAPI version they authored against with{" "}
          <code className="text-fd-foreground">assertVersion()</code>. Drift is
          caught at compile time, audit time, or CI — not after deploy.{" "}
          <Link
            href="/docs/explanation/why-spac"
            className="text-fd-primary hover:underline"
          >
            Why spac →
          </Link>
        </p>
      </div>
    </div>
  );
}
