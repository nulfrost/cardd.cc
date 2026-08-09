import type { Context } from "hono";
import type { Env } from "../utils/cache.js";
import { Badge } from "./types.js";

export function relativeTime(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export class GhLastCommitBadge extends Badge {
  id = "gh-last-commit";
  title = "GitHub last commit";
  description = "Time since last commit from the GitHub API";
  path = "/gh/last-commit/:owner/:repo";
  examplePath = "/gh/last-commit/sveltejs/svelte";

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
      `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/commits?per_page=1`,
      { headers },
    );
    if (resp.status === 404) throw new Error("not found");
    if (resp.status === 403) throw new Error("rate limited");
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = (await resp.json()) as [
      { commit: { committer: { date: string } } },
    ];
    const date = data[0]?.commit?.committer?.date;
    if (!date) throw new Error("no commits");
    return { label: `${owner}/${repo}`, value: relativeTime(date) };
  }

  onError(err: Error, c: Context) {
    const owner = c.req.param("owner") ?? "";
    const repo = c.req.param("repo") ?? "";
    return { label: `${owner}/${repo}`, value: err.message };
  }
}
