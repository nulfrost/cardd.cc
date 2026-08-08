import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";
import type { Env } from "./utils/cache.js";
import { BUNDLED_FONT_DATA } from "./utils/fonts.js";
import { handleBadge, handleError } from "./utils/badge.js";
import { BADGES } from "./badges/index.js";
import LandingPage from "./pages/LandingPage.js";

const app = new Hono<{ Bindings: Env }>();

for (const badge of BADGES) {
  app[badge.method.toLowerCase() as "get"](badge.path, async (c) => {
    try {
      const { label, value } = await badge.fetch(c);
      return handleBadge(c, label, value);
    } catch (err) {
      const { label, value } = badge.onError(err as Error, c);
      return handleError(c, label, value);
    }
  });

  app.get(`/partial/${badge.id}`, (c) => {
    const preset = c.req.query("preset") ?? "";
    const src = badge.buildDemoPath(preset);
    return c.html(fragment(src));
  });
}

app.get("/fonts/Datatype-Regular.ttf", (c) => {
  return c.body(BUNDLED_FONT_DATA, 200, {
    "Content-Type": "font/ttf",
    "Cache-Control": "public, max-age=31536000, immutable",
  });
});

function fragment(src: string) {
  return `<div class="badge-preview"><img class="badge-img" src="${src}" /></div><div class="demo-url"><code class="badge-code">cardd.cc${src}</code></div>`;
}

app.get("/", jsxRenderer(), (c) => {
  return c.render(<LandingPage badges={BADGES} />);
});

export default app;
