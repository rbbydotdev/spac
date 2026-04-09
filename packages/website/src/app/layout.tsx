import type { Metadata } from "next";
import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import { Outfit, Orbitron, Fira_Code } from "next/font/google";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  metadataBase: new URL("https://rbbydotdev.github.io"),
  title: "spac - TypeScript DSL for OpenAPI 3.1+",
  description:
    "TypeScript DSL for authoring OpenAPI 3.1+ specs. You write TypeScript, OpenAPI is the output.",
  icons: { icon: `${basePath}/favicon.png` },
  openGraph: {
    title: "spac",
    description: "TypeScript DSL for authoring OpenAPI 3.1+ specs",
    images: `${basePath}/og-image.png`,
  },
  twitter: {
    card: "summary_large_image",
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
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
