import type { Context } from "hono";
import type { Env } from "../utils/cache.js";
import { Badge } from "./types.js";

function formatStars(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

export class GhStarsBadge extends Badge {
  id = "gh-stars";
  title = "GitHub stars";
  description = "Star count from the GitHub API";
  path = "/gh/stars/:owner/:repo";
  examplePath = "/gh/stars/expressjs/express";

  pathParams = [
    { name: "owner", description: "GitHub user or organization" },
    { name: "repo", description: "GitHub repository name" },
  ];

  demoPresets = [
    { label: "expressjs/express", value: "expressjs/express" },
    { label: "facebook/react", value: "facebook/react" },
    { label: "honojs/hono", value: "honojs/hono" },
    { label: "cloudflare/workers-sdk", value: "cloudflare/workers-sdk" },
    { label: "vuejs/core", value: "vuejs/core" },
    { label: "vercel/next.js", value: "vercel/next.js" },
    { label: "withastro/astro", value: "withastro/astro" },
    { label: "biomejs/biome", value: "biomejs/biome" },
  ];

  async fetch(c: Context) {
    const owner = c.req.param("owner") ?? "";
    const repo = c.req.param("repo") ?? "";
    const env = c.env as Env;
    const headers: Record<string, string> = {
      "User-Agent": "cardd.cc",
      Accept: "application/vnd.github.v3+json",
    };
    if (env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${env.GITHUB_TOKEN}`;
    }
    const resp = await fetch(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`, {
      headers,
    });
    if (resp.status === 404) throw new Error("not found");
    if (resp.status === 403) throw new Error("rate limited");
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = (await resp.json()) as { stargazers_count: number };
    return { label: `${owner}/${repo}`, value: formatStars(data.stargazers_count) };
  }

  onError(err: Error, c: Context) {
    const owner = c.req.param("owner") ?? "";
    const repo = c.req.param("repo") ?? "";
    return { label: `${owner}/${repo}`, value: err.message };
  }
}
