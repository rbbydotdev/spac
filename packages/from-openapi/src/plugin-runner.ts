import type { SpacPlugin, PluginContext } from "./types";

export async function runOnGenerate(
  plugins: SpacPlugin[],
  files: Map<string, string>,
  ctx: PluginContext,
): Promise<Map<string, string>> {
  let result = files;
  for (const p of plugins) {
    if (!p.onGenerate) continue;
    const out = await p.onGenerate(result, ctx);
    if (out instanceof Map) result = out;
  }
  return result;
}

export async function runFormatFile(
  plugins: SpacPlugin[],
  filePath: string,
  content: string,
  ctx: PluginContext,
): Promise<string | null> {
  for (const p of plugins) {
    if (!p.formatFile) continue;
    return await p.formatFile(filePath, content, ctx);
  }
  return null;
}

export async function runOnFile(
  plugins: SpacPlugin[],
  filePath: string,
  content: string,
  ctx: PluginContext,
): Promise<string> {
  let result = content;
  for (const p of plugins) {
    if (!p.onFile) continue;
    const out = await p.onFile(filePath, result, ctx);
    if (typeof out === "string") result = out;
  }
  return result;
}

export async function runOnComplete(
  plugins: SpacPlugin[],
  files: ReadonlyMap<string, string>,
  ctx: PluginContext,
): Promise<void> {
  for (const p of plugins) {
    if (!p.onComplete) continue;
    await p.onComplete(files, ctx);
  }
}
