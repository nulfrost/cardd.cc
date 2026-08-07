import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";
import type { Env } from "./utils/cache.js";
import { versionHandler, downloadsHandler, staticHandler } from "./routes/npm.js";
import { BUNDLED_FONT_DATA } from "./utils/fonts.js";
import LandingPage from "./pages/LandingPage.js";

const app = new Hono<{ Bindings: Env }>();

app.get("/badge/*", staticHandler);
app.get("/npm/v/:pkg", versionHandler);
app.get("/npm/d/:pkg", downloadsHandler);

app.get("/fonts/Datatype-Regular.ttf", (c) => {
  return c.body(BUNDLED_FONT_DATA, 200, {
    "Content-Type": "font/ttf",
    "Cache-Control": "public, max-age=31536000, immutable",
  });
});

app.get("/", jsxRenderer(), (c) => {
  return c.render(<LandingPage />);
});

export default app;
