import type { Context } from "hono";
import { Badge } from "./types.js";

function formatDownloads(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

export class NpmDownloadsBadge extends Badge {
  id = "npm-d";
  title = "npm downloads";
  description = "Weekly downloads from npm";
  path = "/npm/d/:pkg";
  examplePath = "/npm/d/react";

  pathParams = [{ name: "pkg", description: "npm package name" }];

  demoPresets = [
    { label: "react", value: "react" },
    { label: "typescript", value: "typescript" },
    { label: "tailwindcss", value: "tailwindcss" },
    { label: "vite", value: "vite" },
    { label: "esbuild", value: "esbuild" },
    { label: "hono", value: "hono" },
    { label: "svelte", value: "svelte" },
    { label: "valibot", value: "valibot" },
    { label: "jquery", value: "jquery" },
  ];

  async fetch(c: Context) {
    const pkg = c.req.param("pkg") ?? "";
    const resp = await fetch(
      `https://api.npmjs.org/downloads/point/last-week/${encodeURIComponent(pkg)}`,
    );
    if (!resp.ok) throw new Error("not found");
    const data = (await resp.json()) as { downloads: number };
    return { label: pkg, value: formatDownloads(data.downloads) };
  }

  onError(err: Error, c: Context) {
    return { label: c.req.param("pkg") ?? "", value: err.message };
  }
}
