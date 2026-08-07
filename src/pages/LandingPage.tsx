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

export default function LandingPage() {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>tiles — SVG badges for npm</title>
        <style>{`
          @font-face {
            font-family: Datatype;
            src: url(/fonts/Datatype-Regular.ttf);
          }
          body {
            font-family: Datatype, monospace;
            max-width: 800px;
            margin: 40px auto;
            padding: 0 20px;
            background: #111;
            color: #ccc;
            line-height: 1.6;
          }
          h1 { color: #fff; }
          a { color: #58a6ff; }
          pre {
            background: #1a1a1a;
            padding: 16px;
            border-radius: 4px;
            overflow-x: auto;
          }
          code { color: #e6edf3; }
        `}</style>
        <Style />
      </head>
      <body>
        <h1>tiles</h1>
        <p>SVG badges for npm package authors. Pass CSS values in the URL to customize.</p>

        <h2>Usage</h2>

        <h3>Static Badge</h3>
        <CodeBlock>{"/badge/{label}-{value}?bg=555&color=fff&radius=4"}</CodeBlock>
        <BadgePreview src="/badge/license-MIT?bg=555&color=fff" alt="license | MIT" />

        <h3>npm Version</h3>
        <CodeBlock>{"/npm/v/{package}?bg=555&color=fff"}</CodeBlock>
        <BadgePreview src="/npm/v/express" alt="express version badge" />

        <h3>npm Downloads</h3>
        <CodeBlock>{"/npm/d/{package}?bg=555&color=fff"}</CodeBlock>
        <BadgePreview src="/npm/d/express" alt="express downloads badge" />

        <h2>Customization</h2>
        <table>
          <tr>
            <td>
              <code>bg</code>
            </td>
            <td>Background color (hex, no #)</td>
          </tr>
          <tr>
            <td>
              <code>color</code>
            </td>
            <td>Text color (hex, no #)</td>
          </tr>
          <tr>
            <td>
              <code>radius</code>
            </td>
            <td>Border radius in px</td>
          </tr>
          <tr>
            <td>
              <code>border</code>
            </td>
            <td>Border shorthand: width+style+color (e.g. 1+solid+fff)</td>
          </tr>
          <tr>
            <td>
              <code>borderColor</code>
            </td>
            <td>Border color (hex, no #)</td>
          </tr>
          <tr>
            <td>
              <code>font</code>
            </td>
            <td>Google Font name (defaults to Datatype)</td>
          </tr>
        </table>

        <h2>Examples</h2>
        <CodeBlock>{`/badge/build-passing?bg=2ea44f&color=fff&radius=0
/badge/build-failing?bg=d73a49&color=fff
/badge/coverage-80%25?bg=yellow&color=333
/badge/npm-v1.0.0?bg=cb0000&radius=8`}
        </CodeBlock>
      </body>
    </html>
  );
}
