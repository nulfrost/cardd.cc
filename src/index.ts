import { Hono } from "hono";
import type { Env } from "./utils/cache.js";
import { versionHandler, downloadsHandler, staticHandler } from "./routes/npm.js";
import { BUNDLED_FONT_DATA } from "./utils/fonts.js";

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

app.get("/", (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>tiles — SVG badges for npm</title>
  <style>
    @font-face {
      font-family: Datatype;
      src: url(/fonts/Datatype-Regular.ttf);
    }
    body { font-family: Datatype, monospace; max-width: 800px; margin: 40px auto; padding: 0 20px; background: #111; color: #ccc; line-height: 1.6; }
    h1 { color: #fff; }
    a { color: #58a6ff; }
    pre { background: #1a1a1a; padding: 16px; border-radius: 4px; overflow-x: auto; }
    code { color: #e6edf3; }
    .badge-preview { margin: 8px 0; }
  </style>
</head>
<body>
  <h1>tiles</h1>
  <p>SVG badges for npm package authors. Pass CSS values in the URL to customize.</p>

  <h2>Usage</h2>

  <h3>Static Badge</h3>
  <pre><code>/badge/{label}-{value}?bg=555&amp;color=fff&amp;radius=4</code></pre>
  <div class="badge-preview">
    <img src="/badge/license-MIT?bg=555&color=fff" alt="license | MIT" />
  </div>

  <h3>npm Version</h3>
  <pre><code>/npm/v/{package}?bg=555&amp;color=fff</code></pre>
  <div class="badge-preview">
    <img src="/npm/v/express" alt="express version badge" />
  </div>

  <h3>npm Downloads</h3>
  <pre><code>/npm/d/{package}?bg=555&amp;color=fff</code></pre>
  <div class="badge-preview">
    <img src="/npm/d/express" alt="express downloads badge" />
  </div>

  <h2>Customization</h2>
  <table>
    <tr><td><code>bg</code></td><td>Background color (hex, no #)</td></tr>
    <tr><td><code>color</code></td><td>Text color (hex, no #)</td></tr>
    <tr><td><code>radius</code></td><td>Border radius in px</td></tr>
    <tr><td><code>border</code></td><td>Border shorthand: width+style+color (e.g. 1+solid+fff)</td></tr>
    <tr><td><code>borderColor</code></td><td>Border color (hex, no #)</td></tr>
    <tr><td><code>font</code></td><td>Google Font name (defaults to Datatype)</td></tr>
  </table>

  <h2>Examples</h2>
  <pre><code>/badge/build-passing?bg=2ea44f&amp;color=fff&amp;radius=0
/badge/build-failing?bg=d73a49&amp;color=fff
/badge/coverage-80%25?bg=yellow&amp;color=333
/badge/npm-v1.0.0?bg=cb0000&amp;radius=8</code></pre>
</body>
</html>`);
});

export default app;
