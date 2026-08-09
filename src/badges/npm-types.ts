import type { Context } from "hono";
import { Badge } from "./types.js";

export class NpmTypesBadge extends Badge {
  id = "npm-types";
  title = "npm type definitions";
  description = "Whether the package includes type definitions";
  path = "/npm/types/:pkg";
  examplePath = "/npm/types/svelte";

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
      `https://registry.npmjs.org/${encodeURIComponent(pkg)}/latest`,
    );
    if (!resp.ok) throw new Error("not found");
    const data = (await resp.json()) as {
      types?: string;
      typings?: string;
    };
    const hasTypes = !!(data.types || data.typings);
    return { label: pkg, value: hasTypes ? "included" : "none" };
  }

  onError(err: Error, c: Context) {
    return { label: c.req.param("pkg") ?? "", value: err.message };
  }
}
