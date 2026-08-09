import type { Context } from "hono";
import type { Env } from "../utils/cache.js";
import { Badge } from "./types.js";

export class GhIssuesBadge extends Badge {
  id = "gh-issues";
  title = "GitHub issues";
  description = "Open issue count from the GitHub API";
  path = "/gh/issues/:owner/:repo";
  examplePath = "/gh/issues/sveltejs/svelte";

  pathParams = [
    { name: "owner", description: "GitHub user or organization" },
    { name: "repo", description: "GitHub repository name" },
  ];

  demoPresets = [
    { label: "sveltejs/svelte", value: "sveltejs/svelte" },
    { label: "facebook/react", value: "facebook/react" },
    { label: "fabian-hiller/valibot", value: "fabian-hiller/valibot" },
    { label: "vitejs/vite", value: "vitejs/vite" },
    { label: "honojs/hono", value: "honojs/hono" },
    { label: "jquery/jquery", value: "jquery/jquery" },
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
    const resp = await fetch(
      `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`,
      { headers },
    );
    if (resp.status === 404) throw new Error("not found");
    if (resp.status === 403) throw new Error("rate limited");
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = (await resp.json()) as { open_issues_count: number };
    return { label: `${owner}/${repo}`, value: `${data.open_issues_count} open` };
  }

  onError(err: Error, c: Context) {
    const owner = c.req.param("owner") ?? "";
    const repo = c.req.param("repo") ?? "";
    return { label: `${owner}/${repo}`, value: err.message };
  }
}
