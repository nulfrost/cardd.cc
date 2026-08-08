import type { Context } from "hono";
import { Badge } from "./types.js";

export class StaticBadge extends Badge {
  id = "static";
  title = "Static badge";
  description = "Any label|value pair you define";
  path = "/badge/*";
  examplePath = "/badge/license-MIT";

  demoPresets = [
    { label: "license | MIT", value: "license|MIT" },
    { label: "node | 18", value: "node|18" },
    { label: "docker | ready", value: "docker|ready" },
  ];

  async fetch(c: Context) {
    const slug = c.req.path.replace(/^\/badge\//, "");
    const dashIdx = slug.indexOf("-");
    if (dashIdx === -1) return { label: slug, value: "" };
    return {
      label: slug.slice(0, dashIdx),
      value: slug.slice(dashIdx + 1),
    };
  }

  buildDemoPath(presetValue: string): string {
    const [label, value] = presetValue.split("|");
    return `/badge/${label}-${value}`;
  }
}
