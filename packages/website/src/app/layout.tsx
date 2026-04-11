import type { Metadata } from "next";
import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import { Outfit, Orbitron, Fira_Code } from "next/font/google";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const siteTitle = "spac — TypeScript DSL for authoring OpenAPI 3.1+ specs";
const siteDescription =
  "Write OpenAPI 3.1+ specs in TypeScript, not YAML. Type-safe schemas, named $refs, source maps — same toolbox you already use for code.";

export const metadata: Metadata = {
  metadataBase: new URL("https://rbbydotdev.github.io"),
  title: siteTitle,
  description: siteDescription,
  icons: { icon: `${basePath}/favicon.png` },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    images: `${basePath}/og-image.png`,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: `${basePath}/og-image.png`,
  },
};

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${orbitron.variable} ${firaCode.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <RootProvider
          search={{
            options: {
              type: "static",
              api: `${basePath}/api/search`,
            },
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
