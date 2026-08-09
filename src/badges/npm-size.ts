import type { Context } from "hono";
import { Badge } from "./types.js";

export function formatSize(bytes: number): string {
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`;
  if (bytes >= 1_000) return `${(bytes / 1_000).toFixed(1)} kB`;
  return `${bytes} B`;
}

export class NpmSizeBadge extends Badge {
  id = "npm-size";
  title = "npm bundle size";
  description = "Minified + gzipped size from Bundlephobia";
  path = "/npm/size/:pkg";
  examplePath = "/npm/size/svelte";

  pathParams = [{ name: "pkg", description: "npm package name" }];

  demoPresets = [
    { label: "svelte", value: "svelte" },
    { label: "react", value: "react" },
    { label: "valibot", value: "valibot" },
    { label: "vite", value: "vite" },
    { label: "hono", value: "hono" },
    { label: "jquery", value: "jquery" },
  ];

  async fetch(c: Context) {
    const pkg = c.req.param("pkg") ?? "";
    const resp = await fetch(
      `https://bundlephobia.com/api/size?package=${encodeURIComponent(pkg)}`,
    );
    if (!resp.ok) throw new Error("not found");
    const data = (await resp.json()) as { gzip: number };
    return { label: pkg, value: formatSize(data.gzip) };
  }

  onError(err: Error, c: Context) {
    return { label: c.req.param("pkg") ?? "", value: err.message };
  }
}
