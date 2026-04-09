import { getPageImage, source } from "@/lib/source";
import { notFound } from "next/navigation";
import { ImageResponse } from "@takumi-rs/image-response";

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<"/og/docs/[...slug]">,
) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

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
        <div style={{ fontSize: 22, color: "#848bbd", lineHeight: 1.4 }}>
          {page.data.description}
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
