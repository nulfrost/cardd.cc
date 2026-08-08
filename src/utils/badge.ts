import type { Context } from "hono";
import type { Env } from "./cache.js";
import { getCachedSVG, setCachedSVG, cacheKey } from "./cache.js";
import { parseCSS } from "./css.js";
import { loadFont } from "./fonts.js";
import { renderBadge, renderErrorBadge, renderAutoBadge } from "../renderer.js";

export async function handleBadge(
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
    const render = css.theme === "auto" ? renderAutoBadge : renderBadge;
    const svg = await render(label, value, css, fonts);
    try {
      await setCachedSVG(c.env, cacheKey(url), svg);
    } catch {}
    return c.html(svg, 200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600",
    });
  } catch {
    try {
      const errorSvg = await renderErrorBadge("error", "render failed", css, fonts);
      return c.html(errorSvg, 500, { "Content-Type": "image/svg+xml" });
    } catch {
      return c.text("error", 500);
    }
  }
}

export async function handleError(
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

  try {
    const fonts = await loadFont(css.font, c.env);
    const svg = await renderErrorBadge(label, value, css, fonts);
    return c.html(svg, 500, { "Content-Type": "image/svg+xml" });
  } catch {
    return c.text("error", 500);
  }
}
