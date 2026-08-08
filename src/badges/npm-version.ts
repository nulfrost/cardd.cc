import type { Context } from "hono";
import { Badge } from "./types.js";

export class NpmVersionBadge extends Badge {
  id = "npm-v";
  title = "npm version";
  description = "Latest version from the npm registry";
  path = "/npm/v/:pkg";
  examplePath = "/npm/v/react";

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
    const resp = await fetch(`https://registry.npmjs.org/${encodeURIComponent(pkg)}/latest`);
    if (!resp.ok) throw new Error("not found");
    const data = (await resp.json()) as { version: string };
    return { label: pkg, value: `v${data.version}` };
  }

  onError(err: Error, c: Context) {
    return { label: c.req.param("pkg") ?? "", value: err.message };
  }
}
