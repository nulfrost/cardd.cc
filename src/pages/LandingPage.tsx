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
      box-sizing: border-box;
    }
    *, *::before, *::after {
      box-sizing: inherit;
    }
    body {
      font-family: var(--font-mono);
      background: var(--bg-primary);
      color: var(--text-body);
      line-height: 1.6;
      display: flex;
      flex-direction: column;
    }
    h1 { 
      color: var(--text-primary);
      margin-top: 0;
    }
    h2 { 
      color: var(--text-secondary); 
      margin-top: 0;
    }
    a { color: var(--accent); }
    pre {
      background: var(--bg-secondary);
      padding: 16px;
      border-radius: var(--radius);
      overflow-x: auto;
    }
    code { color: var(--text-code); }
    table { border-collapse: collapse; }
    td {
      padding: 6px 16px 6px 0;
      vertical-align: top;
    }
  }
`;

const layoutClass = css`
  flex: 1 1 0;
  display: grid;
  grid-template-columns: 180px 1fr 350px;
  grid-template-rows: 1fr;
  grid-template-areas: "sidebar content panel";
  overflow: hidden;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-template-areas:
      "content";
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
        color: var(--text-dim);
      }
    }
  }
`;

export default function LandingPage({ badges }: { badges: import("../badges/types.js").Badge[] }) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>cardd.cc — customizable badges for the web</title>
        <link rel="icon" href="https://fav.farm/🃏" />
        <script src="https://unpkg.com/htmx.org@2.0.5/dist/htmx.min.js"></script>
        <style>{`
          :root {
            --bg-primary: #111;
            --bg-secondary: #1a1a1a;
            --bg-tertiary: #222;
            --text-primary: #fff;
            --text-secondary: #ddd;
            --text-body: #ccc;
            --text-muted: #aaa;
            --text-dim: #888;
            --text-code: #e6edf3;
            --accent: #58a6ff;
            --border-primary: #333;
            --border-secondary: #2a2a2a;
            --border-input: #444;
            --radius: 4px;
            --font-mono: Datatype, monospace;
            --header-height: 57px;
          }
          @media (prefers-color-scheme: light) {
            :root {
              --bg-primary: #fff;
              --bg-secondary: #f6f8fa;
              --bg-tertiary: #eaeef2;
              --text-primary: #111;
              --text-secondary: #333;
              --text-body: #444;
              --text-muted: #666;
              --text-dim: #777;
              --text-code: #24292f;
              --accent: #0969da;
              --border-primary: #d0d7de;
              --border-secondary: #d8dee4;
              --border-input: #d0d7de;
            }
          }
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
          <MainContent badges={badges} />
          <DemoPanel badges={badges} />
        </div>
        <script>{`
          document.querySelectorAll('nav a[href^="#"]').forEach(link => {
            link.addEventListener('click', e => {
              e.preventDefault();
              const target = document.getElementById(link.getAttribute('href').slice(1));
              if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            });
          });
        `}</script>
      </body>
    </html>
  );
}
