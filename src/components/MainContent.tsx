import { css } from "hono/css";
import BadgePreview from "./BadgePreview.js";
import CodeBlock from "./CodeBlock.js";

const contentClass = css`
  flex: 1 1 auto;
  padding: 24px 32px;
  overflow-y: auto;
  max-width: 750px;
  section {
    margin-bottom: 48px;
    &:last-child { margin-bottom: 0; }
  }
  h3 {
    margin-top: 32px;
  }
  h4 {
    margin: 20px 0 8px 0;
    color: #aaa;
  }
  p {
    margin: 8px 0;
    color: #aaa;
  }
  @media (max-width: 900px) {
    padding: 24px;
    max-width: none;
    order: 1;
  }
`;

const badgesTableClass = css`
  width: 100%;
  tr:first-of-type td { padding-top: 0; }
  h3 {
    margin: 0;
    font-size: 15px;
    display: inline;
  }
  td:first-child {
    padding-right: 24px;
    white-space: nowrap;
  }
  td:nth-child(2) {
    color: #888;
    font-size: 14px;
  }
  pre {
    margin: 4px 0 20px 0;
    padding: 10px 14px;
  }
`;

export default function MainContent() {
  return (
    <main class={contentClass}>
      <section id="overview">
        <h2>Overview</h2>
        <p>
          cardd.cc generates clean, customizable SVG badges for your README,
          documentation, or any web page. built for the open web. free forever.
        </p>
      </section>

      <section id="available-badges">
        <h2>Available Badges</h2>
        <table class={badgesTableClass}>
          <tr>
            <td><h3>Static badge</h3></td>
            <td>Any label|value pair you define</td>
            <td><BadgePreview src="/badge/license-MIT" alt="" /></td>
          </tr>
          <tr>
            <td colspan={3}><CodeBlock>cardd.cc/badge/license-MIT</CodeBlock></td>
          </tr>
          <tr>
            <td><h3>npm version</h3></td>
            <td>Latest version from the npm registry</td>
            <td><BadgePreview src="/npm/v/express" alt="" /></td>
          </tr>
          <tr>
            <td colspan={3}><CodeBlock>cardd.cc/npm/v/express</CodeBlock></td>
          </tr>
          <tr>
            <td><h3>npm downloads</h3></td>
            <td>Weekly downloads from npm</td>
            <td><BadgePreview src="/npm/d/express" alt="" /></td>
          </tr>
          <tr>
            <td colspan={3}><CodeBlock>cardd.cc/npm/d/express</CodeBlock></td>
          </tr>
        </table>
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

        <h3>Reference table</h3>
        <table>
          <thead>
            <tr>
              <td>Param</td>
              <td>Format</td>
              <td>Default</td>
              <td>Example</td>
            </tr>
          </thead>
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
        </table>
      </section>

      <section id="api-reference">
        <h2>API Reference</h2>

        <h3 id="route-badge">GET /badge/:badge</h3>
        <p>
          Render a static badge from a label|value pair. The first <code>-</code> in
          the path segment separates the label from the value. Labels and values may
          contain additional hyphens. If the path contains no <code>-</code>, the
          badge renders with an empty value.
        </p>
        <CodeBlock>{`cardd.cc/badge/{label}-{value}`}</CodeBlock>
        <BadgePreview src="/badge/license-MIT" alt="license | MIT" />
        <BadgePreview src="/badge/build-passing?bg=2ea44f" alt="build | passing" />

        <h3 id="route-npm-v">GET /npm/v/:package</h3>
        <p>
          Look up the latest version of an npm package from <code>registry.npmjs.org</code>.
          Renders <code>package | vX.Y.Z</code> on success. Returns an error badge for
          unknown packages or upstream timeouts.
        </p>
        <CodeBlock>{"cardd.cc/npm/v/{package}"}</CodeBlock>
        <BadgePreview src="/npm/v/express" alt="express version badge" />

        <h3 id="route-npm-d">GET /npm/d/:package</h3>
        <p>
          Look up the last-week download count from <code>api.npmjs.org</code>.
          Large numbers are abbreviated (e.g. <code>1.2M</code>, <code>450k</code>).
          Renders an error badge for unknown packages or upstream timeouts.
        </p>
        <CodeBlock>{"cardd.cc/npm/d/{package}"}</CodeBlock>
        <BadgePreview src="/npm/d/express" alt="express downloads badge" />

        <h3 id="route-fonts">GET /fonts/Datatype-Regular.ttf</h3>
        <p>
          Serves the bundled Datatype typeface used as the default badge font.
          Cached for one year with immutable directive.
        </p>

        <h3 id="route-index">GET /</h3>
        <p>This documentation page.</p>

        <h3 id="response-codes">Response codes</h3>
        <table>
          <tr>
            <td><code>200</code></td>
            <td>Badge rendered successfully</td>
          </tr>
          <tr>
            <td><code>500</code></td>
            <td>Upstream fetch failed or render error — an error badge is served</td>
          </tr>
        </table>
      </section>
    </main>
  );
}
