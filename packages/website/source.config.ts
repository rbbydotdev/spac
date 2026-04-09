import { createRequire } from "node:module";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { remarkAutoTypeTable } from "fumadocs-typescript";
import { remarkJSDocExample } from "./src/lib/remark-jsdoc-example";
import { remarkCLIUsage } from "./src/lib/remark-cli-usage";
import { remarkSpacExample } from "./src/lib/remark-spac-example";

const require = createRequire(import.meta.url);
const shikiDark = require("@spac/theme/shiki-dark.json");
const shikiLight = require("@spac/theme/shiki-light.json");

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [
      [remarkAutoTypeTable, { name: "AutoTypeTable" }],
      remarkJSDocExample,
      remarkCLIUsage,
      remarkSpacExample,
    ],
    rehypeCodeOptions: {
      themes: {
        light: shikiLight,
        dark: shikiDark,
      },
    },
  },
});
