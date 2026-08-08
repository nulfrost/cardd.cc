import { css, Style } from "hono/css";
import Header from "../components/Header.js";
import Sidebar from "../components/Sidebar.js";
import MainContent from "../components/MainContent.js";
import DemoPanel from "../components/DemoPanel.js";

const htmlBodyClass = css`
  :-hono-global {
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
    h1 { 
      color: #fff;
      margin-top: 0;
    }
    h2 { 
      color: #ddd; 
      margin-top: 0;
    }
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
  }
`;

const layoutClass = css`
  flex: 1 1 auto;
  display: flex;
  overflow: hidden;
  @media (max-width: 900px) {
    flex-direction: column;
    overflow-y: auto;
  }
`;

const fragmentGlobalClass = css`
  :-hono-global {
    .badge-preview {
      margin: 12px 0 8px 0;
      min-height: 24px;
      img {
        display: block;
      }
    }
    .demo-url {
      margin-top: 8px;
      min-height: 20px;
      code {
        word-break: break-all;
        font-size: 13px;
        color: #888;
      }
    }
  }
`;

export default function LandingPage() {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>cardd.cc — customizable badges for the web</title>
        <link rel="icon" href="https://fav.farm/🃏" />
        <script src="https://unpkg.com/htmx.org@2.0.5/dist/htmx.min.js"></script>
        <style>{`
          @font-face {
            font-family: Datatype;
            src: url(/fonts/Datatype-Regular.ttf);
          }
        `}</style>
        <div class={htmlBodyClass} />
        <div class={fragmentGlobalClass} />
        <Style />
      </head>
      <body>
        <Header />
        <div class={layoutClass}>
          <Sidebar />
          <MainContent />
          <DemoPanel />
        </div>
      </body>
    </html>
  );
}
