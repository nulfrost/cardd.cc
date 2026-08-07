import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";
import type { Env } from "./utils/cache.js";
import { versionHandler, downloadsHandler, staticHandler } from "./routes/npm.js";
import { BUNDLED_FONT_DATA } from "./utils/fonts.js";
import LandingPage from "./pages/LandingPage.js";

const app = new Hono<{ Bindings: Env }>();

app.get("/badge/*", staticHandler);
app.get("/npm/v/*", versionHandler);
app.get("/npm/d/*", downloadsHandler);

app.get("/fonts/Datatype-Regular.ttf", (c) => {
  return c.body(BUNDLED_FONT_DATA, 200, {
    "Content-Type": "font/ttf",
    "Cache-Control": "public, max-age=31536000, immutable",
  });
});

app.get("/partial/static", (c) => {
  const preset = c.req.query("preset") ?? "";
  const [label, value] = preset.split("|");
  if (!label || !value) return c.text("invalid", 400);
  const src = `/badge/${label}-${value}`;
  return c.html(fragment(src));
});

app.get("/partial/npm-v", (c) => {
  const pkg = c.req.query("pkg");
  if (!pkg) return c.text("invalid", 400);
  const src = `/npm/v/${pkg}`;
  return c.html(fragment(src));
});

app.get("/partial/npm-d", (c) => {
  const pkg = c.req.query("pkg");
  if (!pkg) return c.text("invalid", 400);
  const src = `/npm/d/${pkg}`;
  return c.html(fragment(src));
});

function fragment(src: string) {
  return `<div class="badge-preview"><img class="badge-img" src="${src}" /></div><div class="demo-url"><code class="badge-code">cardd.cc${src}</code></div>`;
}

app.get("/", jsxRenderer(), (c) => {
  return c.render(<LandingPage />);
});

export default app;
