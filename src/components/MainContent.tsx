import { css } from "hono/css";
import BadgePreview from "./BadgePreview.js";
import CodeBlock from "./CodeBlock.js";

const contentClass = css`
  flex: 1 1 auto;
  padding: 24px 32px;
  overflow-y: auto;
  max-width: 880px;
  section {
    margin-bottom: 48px;
    &:last-child { margin-bottom: 0; }
  }
  @media (max-width: 900px) {
    padding: 24px;
    max-width: none;
    order: 1;
  }
`;

export default function MainContent() {
  return (
    <main class={contentClass}>
      <section>
        <h2>Overview</h2>
        <p>customizable badges for the web</p>
      </section>

      <section id="usage">
        <h2>Usage</h2>

        <h3>Static Badge</h3>
        <CodeBlock>{"cardd.cc/badge/{label}-{value}"}</CodeBlock>
        <BadgePreview src="/badge/license-MIT" alt="license | MIT" />

        <h3>npm Version</h3>
        <CodeBlock>{"cardd.cc/npm/v/{package}"}</CodeBlock>
        <BadgePreview src="/npm/v/express" alt="express version badge" />

        <h3>npm Downloads</h3>
        <CodeBlock>{"cardd.cc/npm/d/{package}"}</CodeBlock>
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
  );
}
