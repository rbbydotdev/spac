import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const basePath = process.env.GITHUB_PAGES ? "/spac" : "";

/** @type {import('next').NextConfig} */
const config = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  serverExternalPackages: ["@takumi-rs/image-response"],
  reactStrictMode: true,
};

export default withMDX(config);
