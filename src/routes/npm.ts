import type { Context } from "hono";
import type { Env } from "../utils/cache.js";
import { getCachedSVG, setCachedSVG, cacheKey } from "../utils/cache.js";
import { parseCSS } from "../utils/css.js";
import { loadFont } from "../utils/fonts.js";
import { renderBadge, renderErrorBadge } from "../renderer.js";

async function handleBadge(
  c: Context<{ Bindings: Env }>,
  label: string,
  value: string,
) {
  const url = c.req.url;
  const cacheEntry = await getCachedSVG(c.env, cacheKey(url));
  if (cacheEntry) {
    return c.html(cacheEntry, 200, { "Content-Type": "image/svg+xml" });
  }

  const css = parseCSS(new URL(url).searchParams);
  const fonts = await loadFont(css.font, c.env);

  try {
    const svg = await renderBadge(label, value, css, fonts);
    await setCachedSVG(c.env, cacheKey(url), svg);
    return c.html(svg, 200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600",
    });
  } catch {
    const errorSvg = await renderErrorBadge("error", "render failed", css, fonts);
    return c.html(errorSvg, 500, { "Content-Type": "image/svg+xml" });
  }
}

async function handleError(
  c: Context<{ Bindings: Env }>,
  label: string,
  value: string,
) {
  const url = c.req.url;
  const cacheEntry = await getCachedSVG(c.env, cacheKey(url));
  if (cacheEntry) {
    return c.html(cacheEntry, 200, { "Content-Type": "image/svg+xml" });
  }

  const css = parseCSS(new URL(url).searchParams);
  const fonts = await loadFont(css.font, c.env);

  try {
    const svg = await renderErrorBadge(label, value, css, fonts);
    return c.html(svg, 500, { "Content-Type": "image/svg+xml" });
  } catch {
    return c.text("error", 500);
  }
}

function param(c: Context, name: string): string {
  return c.req.param(name)!;
}

export async function versionHandler(c: Context<{ Bindings: Env }>) {
  const pkg = param(c, "pkg");

  try {
    const resp = await fetch(`https://registry.npmjs.org/${encodeURIComponent(pkg)}/latest`);
    if (!resp.ok) {
      return handleError(c, pkg, "not found");
    }
    const data = (await resp.json()) as { version: string };
    return handleBadge(c, pkg, `v${data.version}`);
  } catch {
    return handleError(c, "npm", "timeout");
  }
}

export async function downloadsHandler(c: Context<{ Bindings: Env }>) {
  const pkg = param(c, "pkg");

  try {
    const resp = await fetch(
      `https://api.npmjs.org/downloads/point/last-week/${encodeURIComponent(pkg)}`,
    );
    if (!resp.ok) {
      return handleError(c, pkg, "not found");
    }
    const data = (await resp.json()) as { downloads: number };
    const formatted = formatDownloads(data.downloads);
    return handleBadge(c, pkg, formatted);
  } catch {
    return handleError(c, "npm", "timeout");
  }
}

function formatDownloads(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

export async function staticHandler(c: Context<{ Bindings: Env }>) {
  const path = c.req.path;
  const slug = path.replace(/^\/badge\//, "");
  const dashIdx = slug.indexOf("-");
  if (dashIdx === -1) {
    return handleBadge(c, slug, "");
  }
  const label = slug.slice(0, dashIdx);
  const value = slug.slice(dashIdx + 1);
  return handleBadge(c, label, value);
}
