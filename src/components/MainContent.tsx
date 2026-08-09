import { css } from "hono/css";
import type { Badge } from "../badges/types.js";
import BadgePreview from "./BadgePreview.js";
import CodeBlock from "./CodeBlock.js";

const contentClass = css`
  grid-area: content;
  min-height: 0;
  position: relative;
  padding: 24px 32px;
  overflow-y: auto;
  section {
    margin-bottom: 48px;
    &:last-child { margin-bottom: 0; }
  }
  h3 {
    margin-top: 32px;
  }
  h4 {
    margin: 20px 0 8px 0;
    color: var(--text-muted);
  }
  p {
    margin: 8px 0;
    color: var(--text-muted);
  }
  @media (max-width: 900px) {
    padding: 24px;
    max-width: none;
  }
`;

const mobileFooterClass = css`
  display: none;
  margin-top: 48px;
  padding: 24px 0;
  border-top: 1px solid var(--border-primary);
  text-align: center;
  p {
    margin: 0 0 10px 0;
    font-size: 13px;
    color: var(--text-dim);
    line-height: 1.5;
  }
  a {
    display: inline-block;
    padding: 5px 12px;
    font-size: 13px;
    color: var(--accent);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius);
    text-decoration: none;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
    &:hover {
      background: var(--bg-tertiary);
      border-color: var(--accent);
    }
  }
  @media (max-width: 900px) {
    display: block;
  }
`;

const badgeCardClass = css`
  border: 1px solid var(--border-primary);
  border-radius: var(--radius);
  padding: 20px;
  margin-bottom: 24px;
  &:last-child { margin-bottom: 0; }
  .badge-card-header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 8px;
  }
  .badge-card-header h3 {
    margin: 0;
    font-size: 15px;
  }
  .badge-card-header img {
    margin: 0;
  }
  .badge-card-header > div {
    margin: 0;
  }
  p {
    margin: 8px 0;
    color: var(--text-dim);
    font-size: 14px;
  }
  pre {
    margin: 4px 0 0 0;
    padding: 10px 14px;
  }
`;

export default function MainContent({ badges }: { badges: Badge[] }) {
  return (
    <main id="main-content" class={contentClass}>
      <section id="overview">
        <h2>Overview</h2>
        <p>
          cardd.cc generates clean, customizable SVG badges for your README,
          documentation, or any web page. built for the open web. free forever.
        </p>
      </section>

      <section id="available-badges">
        <h2>Available Badges</h2>
        {badges.map(badge => (
          <div class={badgeCardClass}>
            <div class="badge-card-header">
              <h3>{badge.title}</h3>
              <BadgePreview src={badge.examplePath} alt="" />
            </div>
            <p>{badge.description}</p>
            <CodeBlock>{`cardd.cc${badge.path}`}</CodeBlock>
          </div>
        ))}
        <p>
          See the <a href="#api-reference">API Reference</a> for full details on
          each route, response codes, and error behavior.
        </p>
      </section>

      <section id="customization">
        <h2>Customization</h2>
        <p>
          All routes that return badges accept the following query parameters.
          Any combination of params can be used together.
        </p>

        <h3 id="customization-bg">Background color</h3>
        <p>
          <code>{`?bg={hex}`}</code> — Six- or three-character hex color without the <code>#</code>.
          Named CSS colors (e.g. <code>red</code>, <code>dodgerblue</code>) are also supported.
          Defaults to <code>2d2d2e</code>.
        </p>
        <CodeBlock>?bg=2ea44f</CodeBlock>
        <BadgePreview src="/badge/build-passing?bg=2ea44f" alt="green bg" />
        <CodeBlock>?bg=red</CodeBlock>
        <BadgePreview src="/badge/build-failing?bg=red" alt="red bg" />

        <h3 id="customization-color">Text color</h3>
        <p>
          <code>{`?color={hex}`}</code> — Six- or three-character hex without the <code>#</code>,
          or a named CSS color. Defaults to <code>fff</code>.
        </p>
        <CodeBlock>?color=000</CodeBlock>
        <BadgePreview src="/badge/build-passing?bg=2ea44f&color=000" alt="black text" />

        <h3 id="customization-radius">Border radius</h3>
        <p>
          <code>{`?radius={px}`}</code> — Integer pixel value for corner rounding.
          Use <code>0</code> for sharp corners. Defaults to <code>4</code>.
        </p>
        <CodeBlock>?radius=0</CodeBlock>
        <BadgePreview src="/badge/license-MIT?radius=0" alt="sharp corners" />
        <CodeBlock>?radius=12</CodeBlock>
        <BadgePreview src="/badge/license-MIT?radius=12" alt="rounded corners" />

        <h3 id="customization-border">Border</h3>
        <p>
          <code>{`?border={width}+{style}+{color}`}</code> — A plus-delimited border shorthand.
          Width is an integer in pixels, style is any valid CSS border-style
          (<code>solid</code>, <code>dashed</code>, <code>dotted</code>), and
          color is a hex value. Defaults to no border.
        </p>
        <CodeBlock>?border=2+solid+f00</CodeBlock>
        <BadgePreview src="/badge/license-MIT?border=2+solid+f00" alt="red border" />
        <CodeBlock>?border=1+dashed+888</CodeBlock>
        <BadgePreview src="/badge/license-MIT?border=1+dashed+888" alt="dashed border" />

        <h3 id="customization-borderColor">Border color (shortcut)</h3>
        <p>
          <code>{`?borderColor={hex}`}</code> — Sets only the border color without
          enabling a border. Combine with <code>?border=2</code> for quick
          width+color combinations. Defaults to <code>2d2d2e</code>.
        </p>
        <CodeBlock>?border=2&borderColor=f00</CodeBlock>
        <BadgePreview src="/badge/license-MIT?border=2&borderColor=f00" alt="border color shortcut" />

        <h3 id="customization-font">Font</h3>
        <p>
          <code>{`?font={name}`}</code> — Any font available on Google Fonts.
          Fonts are loaded on-demand and cached for 30 days. Defaults to
          <code> Datatype</code> (a bundled pixel-style monospace). Popular options
          include <code>Inter</code>, <code>Fira+Code</code>, <code>Roboto</code>,
          and <code>JetBrains+Mono</code>.
        </p>
        <CodeBlock>?font=Inter</CodeBlock>
        <BadgePreview src="/badge/license-MIT?font=Inter" alt="Inter font" />
        <CodeBlock>?font=JetBrains+Mono</CodeBlock>
        <BadgePreview src="/badge/license-MIT?font=JetBrains+Mono" alt="JetBrains Mono font" />

        <h3 id="customization-theme">Theme</h3>
        <p>
          <code>{`?theme=light|dark|auto`}</code> — Switch between dark and light presets.
          <code>auto</code> renders both themes and uses <code>prefers-color-scheme</code> CSS
          inside the SVG to toggle at runtime. Explicit <code>{`?bg`}</code> or
          <code>{`?color`}</code> are ignored with <code>auto</code>. Defaults to <code>dark</code>.
        </p>
        <CodeBlock>?theme=light</CodeBlock>
        <BadgePreview src="/badge/license-MIT?theme=light" alt="light theme" />
        <CodeBlock>?theme=auto</CodeBlock>
        <BadgePreview src="/badge/license-MIT?theme=auto" alt="auto theme" />

        <h3 id="customization-size">Size</h3>
        <p>
          <code>{`?size=base|large`}</code> — Render a larger version of the badge.
          <code>large</code> scales the badge 1.2x while preserving the aspect ratio.
          Defaults to <code>base</code>.
        </p>
        <CodeBlock>?size=large</CodeBlock>
        <BadgePreview src="/badge/license-MIT?size=large" alt="large badge" />

        <h3>Reference table</h3>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Param</th>
                <th>Format</th>
                <th>Default</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>bg</code></td>
                <td>hex | named color</td>
                <td><code>2d2d2e</code></td>
                <td><code>bg=2ea44f</code></td>
              </tr>
              <tr>
                <td><code>color</code></td>
                <td>hex | named color</td>
                <td><code>fff</code></td>
                <td><code>color=000</code></td>
              </tr>
              <tr>
                <td><code>radius</code></td>
                <td>integer (px)</td>
                <td><code>4</code></td>
                <td><code>radius=0</code></td>
              </tr>
              <tr>
                <td><code>border</code></td>
                <td><code>width+style+color</code></td>
                <td>none</td>
                <td><code>border=2+solid+f00</code></td>
              </tr>
              <tr>
                <td><code>borderColor</code></td>
                <td>hex</td>
                <td><code>2d2d2e</code></td>
                <td><code>borderColor=f00</code></td>
              </tr>
              <tr>
                <td><code>font</code></td>
                <td>Google Fonts name</td>
                <td><code>Datatype</code></td>
                <td><code>font=Inter</code></td>
              </tr>
              <tr>
                <td><code>theme</code></td>
                <td><code>light</code> | <code>dark</code> | <code>auto</code></td>
                <td><code>dark</code></td>
                <td><code>theme=light</code></td>
              </tr>
              <tr>
                <td><code>size</code></td>
                <td><code>base</code> | <code>large</code></td>
                <td><code>base</code></td>
                <td><code>size=large</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="api-reference">
        <h2>API Reference</h2>

        {badges.map(badge => (
          <>
            <h3 id={`route-${badge.id}`}>{badge.method} {badge.path}</h3>
            <p>{badge.description}.</p>
            <CodeBlock>{`cardd.cc${badge.path}`}</CodeBlock>
            <BadgePreview src={badge.examplePath} alt={badge.title} />
          </>
        ))}

        <h3 id="response-codes">Response codes</h3>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>200</code></td>
                <td>Badge rendered successfully</td>
              </tr>
              <tr>
                <td><code>500</code></td>
                <td>Upstream fetch failed or render error — an error badge is served</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <footer class={mobileFooterClass}>
        <p>Built by Jacob Stordahl. Available for contract work.</p>
        <a href="https://stordahl.dev">Hire me</a>
      </footer>
    </main>
  );
}
