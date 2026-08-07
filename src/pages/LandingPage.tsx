import { css, Style } from "hono/css";

const badgePreviewClass = css`
  margin: 8px 0;
`;

function BadgePreview({ src, alt }: { src: string; alt: string }) {
  return (
    <div class={badgePreviewClass}>
      <img src={src} alt={alt} />
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre>
      <code>{children}</code>
    </pre>
  );
}

type StaticPreset = { label: string; value: string };

const STATIC_PRESETS: StaticPreset[] = [
  { label: "license", value: "MIT" },
  { label: "node", value: "18" },
  { label: "docker", value: "ready" },
];

const NPM_PACKAGES = [
  "express", "react", "lodash", "typescript",
  "next", "vue", "axios", "tailwindcss",
  "vite", "esbuild", "zod", "hono",
];

export default function LandingPage() {
  const firstStatic = STATIC_PRESETS[0];
  const firstNpm = NPM_PACKAGES[0];

  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>cardd — SVG badges for npm</title>
        <script src="https://unpkg.com/htmx.org@2.0.5/dist/htmx.min.js"></script>
        <style>{`
          @font-face {
            font-family: Datatype;
            src: url(/fonts/Datatype-Regular.ttf);
          }
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
          }
          body {
            font-family: Datatype, monospace;
            background: #111;
            color: #ccc;
            line-height: 1.6;
            display: flex;
            flex-direction: column;
          }
          h1 { color: #fff; }
          h2 { color: #ddd; }
          a { color: #58a6ff; }
          pre {
            background: #1a1a1a;
            padding: 16px;
            border-radius: 4px;
            overflow-x: auto;
          }
          code { color: #e6edf3; }
          table { border-collapse: collapse; }
          td {
            padding: 6px 16px 6px 0;
            vertical-align: top;
          }

          .header {
            flex: 0 0 auto;
            padding: 12px 24px;
            border-bottom: 1px solid #333;
            background: #111;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .header h1 {
            margin: 0;
            font-size: 20px;
            letter-spacing: 1px;
          }
          .header-nav {
            display: flex;
            align-items: center;
            gap: 4px;
          }
          .header-nav a {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 4px 10px;
            color: #888;
            text-decoration: none;
            border-radius: 4px;
            font-size: 14px;
            transition: color 0.15s, background 0.15s;
          }
          .header-nav a:hover {
            color: #fff;
            background: #222;
          }
          .header-nav svg {
            width: 18px;
            height: 18px;
            fill: currentColor;
          }

          .layout {
            flex: 1 1 auto;
            display: flex;
            overflow: hidden;
          }

          .sidebar {
            width: 180px;
            min-height: 100vh;
            flex: 0 0 auto;
            padding: 24px 16px;
            border-right: 1px solid #333;
            position: sticky;
            top: 0;
            align-self: flex-start;
            max-height: 100vh;
            overflow-y: auto;
          }
          .sidebar ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }
          .sidebar li {
            margin-bottom: 4px;
          }
          .sidebar a {
            display: block;
            padding: 6px 10px;
            color: #888;
            text-decoration: none;
            border-radius: 4px;
            font-size: 16px;
            transition: color 0.15s, background 0.15s;
          }
          .sidebar a:hover {
            color: #fff;
            background: #222;
          }

          .content {
            flex: 1 1 auto;
            padding: 24px 32px;
            overflow-y: auto;
            max-width: 880px;
          }
          .content section {
            margin-bottom: 48px;
          }
          .content section:last-child {
            margin-bottom: 0;
          }

          .demo-panel {
            flex: 0 1 300px;
            position: sticky;
            top: 0;
            align-self: flex-start;
            min-height: 100vh;
            max-height: 100vh;
            overflow-y: auto;
            border-left: 1px solid #333;
          }
          .demo-section {
            padding: 24px 32px;
            border-bottom: 1px solid #2a2a2a;
          }
          .demo-section:last-child {
            border-bottom: none;
          }
          .hire-me {
            padding: 24px 32px;
            border-top: 1px solid #2a2a2a;
          }
          .hire-me p {
            margin: 0 0 10px 0;
            font-size: 13px;
            color: #888;
            line-height: 1.5;
          }
          .hire-me a {
            display: inline-block;
            padding: 5px 12px;
            font-size: 13px;
            color: #58a6ff;
            border: 1px solid #333;
            border-radius: 4px;
            text-decoration: none;
            cursor: pointer;
            transition: background 0.15s, border-color 0.15s;
          }
          .hire-me a:hover {
            background: #222;
            border-color: #58a6ff;
          }
          .demo-section h2 {
            margin: 0 0 12px 0;
            font-size: 14px;
            color: #ddd;
          }
          .badge-preview {
            margin: 12px 0 8px 0;
            min-height: 24px;
          }
          .badge-preview img {
            display: block;
          }
          .demo-select {
            font-family: Datatype, monospace;
            font-size: 13px;
            background: #222;
            color: #ccc;
            border: 1px solid #444;
            padding: 5px 8px;
            border-radius: 4px;
            width: 100%;
          }
          .demo-select:focus {
            outline: none;
            border-color: #58a6ff;
          }
          .demo-url {
            margin-top: 8px;
            min-height: 20px;
          }
          .demo-url code {
            word-break: break-all;
            font-size: 13px;
            color: #888;
          }

          @media (max-width: 900px) {
            .layout {
              flex-direction: column;
              overflow-y: auto;
            }

            .sidebar {
              width: 100%;
              min-height: auto;
              flex: 0 0 auto;
              position: static;
              padding: 8px 24px;
              border-right: none;
              border-bottom: 1px solid #333;
              max-height: none;
              overflow-y: visible;
              order: 0;
            }
            .sidebar ul {
              display: flex;
              gap: 4px;
            }
            .sidebar li {
              margin-bottom: 0;
            }
            .sidebar a {
              padding: 4px 10px;
              font-size: 14px;
            }

            .content {
              padding: 24px;
              max-width: none;
              order: 1;
            }

            .demo-panel {
              flex: 0 0 auto;
              min-height: auto;
              padding: 16px 24px;
              position: static;
              max-height: none;
              overflow-y: visible;
              border-left: none;
              order: -1;
            }
            .demo-section {
              margin-bottom: 16px;
              padding-bottom: 16px;
            }
            .demo-select {
              width: auto;
              min-width: 200px;
            }
          }
        `}</style>
        <Style />
      </head>
      <body>
        <header class="header">
          <h1>cardd</h1>
          <nav class="header-nav">
            <a href="https://github.com/stordahl/cardd.cc/issues">issues</a>
            <a href="https://github.com/stordahl/cardd.cc">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </nav>
        </header>

        <div class="layout">
          <nav class="sidebar">
            <ul>
              <li><a href="#overview">Overview</a></li>
              <li><a href="#usage">Usage</a></li>
              <li><a href="#customization">Customization</a></li>
              <li><a href="#examples">Examples</a></li>
            </ul>
          </nav>

          <main class="content">
            <section>
              <h2>Overview</h2>
              <p>customizable badges for the web</p>
            </section>

            <section id="usage">
              <h2>Usage</h2>

              <h3>Static Badge</h3>
              <CodeBlock>{"cardd.cc/badge/{label}-{value}?bg=555&color=fff&radius=4"}</CodeBlock>
              <BadgePreview src="/badge/license-MIT?bg=555&color=fff" alt="license | MIT" />

              <h3>npm Version</h3>
              <CodeBlock>{"cardd.cc/npm/v/{package}?bg=555&color=fff"}</CodeBlock>
              <BadgePreview src="/npm/v/express" alt="express version badge" />

              <h3>npm Downloads</h3>
              <CodeBlock>{"cardd.cc/npm/d/{package}?bg=555&color=fff"}</CodeBlock>
              <BadgePreview src="/npm/d/express" alt="express downloads badge" />
            </section>

            <section id="customization">
              <h2>Customization</h2>
              <table>
                <tr>
                  <td><code>bg</code></td>
                  <td>Background color (hex, no #)</td>
                </tr>
                <tr>
                  <td><code>color</code></td>
                  <td>Text color (hex, no #)</td>
                </tr>
                <tr>
                  <td><code>radius</code></td>
                  <td>Border radius in px</td>
                </tr>
                <tr>
                  <td><code>border</code></td>
                  <td>Border shorthand: width+style+color (e.g. 1+solid+fff)</td>
                </tr>
                <tr>
                  <td><code>borderColor</code></td>
                  <td>Border color (hex, no #)</td>
                </tr>
                <tr>
                  <td><code>font</code></td>
                  <td>Google Font name (defaults to Datatype)</td>
                </tr>
              </table>
            </section>

            <section id="examples">
              <h2>Examples</h2>
              <CodeBlock>{`cardd.cc/badge/build-passing?bg=2ea44f&color=fff&radius=0
cardd.cc/badge/build-failing?bg=d73a49&color=fff
cardd.cc/badge/coverage-80%25?bg=yellow&color=333
cardd.cc/badge/npm-v1.0.0?bg=cb0000&radius=8`}
              </CodeBlock>
            </section>
          </main>

          <aside class="demo-panel">
            <section class="demo-section">
              <h2>Static badge</h2>
              <form
                class="badge-form"
                hx-get="/partial/static"
                hx-trigger="change"
                hx-target="next .demo-result"
                hx-swap="innerHTML"
              >
                <select class="demo-select" name="preset">
                  {STATIC_PRESETS.map(p => (
                    <option value={`${p.label}|${p.value}`}>{p.label} | {p.value}</option>
                  ))}
                </select>
              </form>
              <div class="demo-result">
                <div class="badge-preview">
                  <img class="badge-img" src={`/badge/${firstStatic.label}-${firstStatic.value}`} alt="static badge" />
                </div>
                <div class="demo-url">
                  <code class="badge-code">{`cardd.cc/badge/${firstStatic.label}-${firstStatic.value}`}</code>
                </div>
              </div>
            </section>

            <section class="demo-section">
              <h2>npm version</h2>
              <form
                class="badge-form"
                hx-get="/partial/npm-v"
                hx-trigger="change"
                hx-target="next .demo-result"
                hx-swap="innerHTML"
              >
                <select class="demo-select" name="pkg">
                  {NPM_PACKAGES.map(pkg => (
                    <option value={pkg}>{pkg}</option>
                  ))}
                </select>
              </form>
              <div class="demo-result">
                <div class="badge-preview">
                  <img class="badge-img" src={`/npm/v/${firstNpm}`} alt="npm version badge" />
                </div>
                <div class="demo-url">
                  <code class="badge-code">{`cardd.cc/npm/v/${firstNpm}`}</code>
                </div>
              </div>
            </section>

            <section class="demo-section">
              <h2>npm downloads</h2>
              <form
                class="badge-form"
                hx-get="/partial/npm-d"
                hx-trigger="change"
                hx-target="next .demo-result"
                hx-swap="innerHTML"
              >
                <select class="demo-select" name="pkg">
                  {NPM_PACKAGES.map(pkg => (
                    <option value={pkg}>{pkg}</option>
                  ))}
                </select>
              </form>
              <div class="demo-result">
                <div class="badge-preview">
                  <img class="badge-img" src={`/npm/d/${firstNpm}`} alt="npm downloads badge" />
                </div>
                <div class="demo-url">
                  <code class="badge-code">{`cardd.cc/npm/d/${firstNpm}`}</code>
                </div>
              </div>
            </section>

            <div class="hire-me">
              <p>Built by Jacob Stordahl. Available for contract work.</p>
              <a
                href="#"
                onclick="navigator.clipboard.writeText('jacob@stordahl.dev').then(function(){var t=this;t.textContent='Copied!';setTimeout(function(){t.textContent='Hire me'},2000)}.bind(this));return false"
              >Hire me</a>
            </div>

          </aside>
        </div>
      </body>
    </html>
  );
}
