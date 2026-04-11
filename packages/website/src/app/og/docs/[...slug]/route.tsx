import { getPageImage, source } from "@/lib/source";
import { notFound } from "next/navigation";
import { ImageResponse } from "@takumi-rs/image-response";
import type { ReactNode } from "react";

export const revalidate = false;

/**
 * TOC item titles can be ReactNodes (e.g. when a heading contains
 * inline code). Flatten to plain text so we can render them in the
 * OG image without needing full component support.
 */
function nodeToText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join("");
  if (typeof node === "object" && "props" in node) {
    // biome-ignore lint/suspicious/noExplicitAny: react children type
    return nodeToText((node as any).props?.children);
  }
  return "";
}

/**
 * Pick a short list of headings that best summarize the page.
 * - If there are enough H2 sections (>= 4), show H2 only — this keeps
 *   reference-style pages readable.
 * - Otherwise include H2 + H3 so narrative pages like "Why spac" still
 *   show their sub-points.
 * - Cap at 6 items, truncate each to 52 chars.
 */
function pickHighlights(
  toc: Array<{ title: ReactNode; depth: number }>,
): string[] {
  const flat = toc
    .filter((t) => t.depth >= 2 && t.depth <= 3)
    .map((t) => ({ depth: t.depth, text: nodeToText(t.title).trim() }))
    .filter((t) => t.text.length > 0);

  const h2Count = flat.filter((t) => t.depth === 2).length;
  const pool = h2Count >= 4 ? flat.filter((t) => t.depth === 2) : flat;

  return pool.slice(0, 6).map((t) => {
    const max = 52;
    return t.text.length > max ? `${t.text.slice(0, max - 1)}…` : t.text;
  });
}

export async function GET(
  _req: Request,
  { params }: RouteContext<"/og/docs/[...slug]">,
) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  const highlights = pickHighlights(page.data.toc ?? []);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "60px",
        background: "#262335",
        backgroundImage:
          "linear-gradient(rgba(54,249,246,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(54,249,246,0.025) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 24,
          color: "#ff7edb",
          marginBottom: 16,
          letterSpacing: "0.05em",
        }}
      >
        spac
      </div>
      <div
        style={{
          fontSize: 48,
          color: "#ffffff",
          fontWeight: 700,
          marginBottom: 12,
          lineHeight: 1.2,
        }}
      >
        {page.data.title}
      </div>
      {page.data.description && (
        <div
          style={{
            fontSize: 22,
            color: "#848bbd",
            lineHeight: 1.4,
            marginBottom: highlights.length > 0 ? 28 : 0,
          }}
        >
          {page.data.description}
        </div>
      )}
      {highlights.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            paddingTop: 24,
            borderTop: "1px solid rgba(132, 139, 189, 0.25)",
          }}
        >
          {highlights.map((text) => (
            <div
              key={text}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                fontSize: 20,
                color: "#c4b5d0",
                lineHeight: 1.3,
              }}
            >
              <span
                style={{
                  color: "#36f9f6",
                  marginRight: 14,
                  fontSize: 20,
                }}
              >
                ›
              </span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      )}
    </div>,
    {
      width: 1200,
      height: 630,
      format: "webp",
    },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImage(page).segments,
  }));
}
