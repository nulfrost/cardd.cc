import { css } from "hono/css";

const demoPanelClass = css`
  flex: 0 1 350px;
  position: sticky;
  top: 0;
  align-self: flex-start;
  min-height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
  border-left: 1px solid #333;
  @media (max-width: 900px) {
    flex: 0 0 auto;
    min-height: auto;
    padding: 16px 24px;
    position: static;
    max-height: none;
    overflow-y: visible;
    border-left: none;
    order: -1;
  }
`;

const demoSectionClass = css`
  padding: 24px 32px;
  border-bottom: 1px solid #2a2a2a;
  &:last-child { border-bottom: none; }
  h2 {
    margin: 0 0 12px 0;
    font-size: 14px;
    color: #ddd;
  }
  @media (max-width: 900px) {
    margin-bottom: 16px;
    padding-bottom: 16px;
  }
`;

const hireMeClass = css`
  padding: 24px 32px;
  border-top: 1px solid #2a2a2a;
  p {
    margin: 0 0 10px 0;
    font-size: 13px;
    color: #888;
    line-height: 1.5;
  }
  a {
    display: inline-block;
    padding: 5px 12px;
    font-size: 13px;
    color: #58a6ff;
    border: 1px solid #333;
    border-radius: 4px;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
    &:hover {
      background: #222;
      border-color: #58a6ff;
    }
  }
`;

const demoSelectClass = css`
  font-family: Datatype, monospace;
  font-size: 13px;
  background: #222;
  color: #ccc;
  border: 1px solid #444;
  padding: 5px 8px;
  border-radius: 4px;
  width: 100%;
  &:focus {
    outline: none;
    border-color: #58a6ff;
  }
  @media (max-width: 900px) {
    width: auto;
    min-width: 200px;
  }
`;

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

function DemoSection({
  title,
  endpoint,
  paramName,
  presets,
  staticPreset,
  firstValue,
  firstLabel,
  srcPrefix,
}: {
  title: string;
  endpoint: string;
  paramName: string;
  presets: string[];
  staticPreset?: StaticPreset[];
  firstValue: string;
  firstLabel?: string;
  srcPrefix: string;
}) {
  return (
    <section class={demoSectionClass}>
      <h2>{title}</h2>
      <form
        class="badge-form"
        hx-get={endpoint}
        hx-trigger="change"
        hx-target="next .demo-result"
        hx-swap="innerHTML"
      >
        <select class={demoSelectClass} name={paramName}>
          {staticPreset
            ? staticPreset.map(p => (
              <option value={`${p.label}|${p.value}`}>{p.label} | {p.value}</option>
            ))
            : presets.map(pkg => (
              <option value={pkg}>{pkg}</option>
            ))}
        </select>
      </form>
      <div class="demo-result">
        <div class="badge-preview">
          <img class="badge-img" src={srcPrefix} alt={title} />
        </div>
        <div class="demo-url">
          <code class="badge-code">{`cardd.cc${srcPrefix}`}</code>
        </div>
      </div>
    </section>
  );
}

export default function DemoPanel() {
  const firstStatic = STATIC_PRESETS[0];
  const firstNpm = NPM_PACKAGES[0];

  return (
    <aside class={demoPanelClass}>
      <DemoSection
        title="Static badge"
        endpoint="/partial/static"
        paramName="preset"
        staticPreset={STATIC_PRESETS}
        firstValue={firstStatic.value}
        firstLabel={firstStatic.label}
        presets={[]}
        srcPrefix={`/badge/${firstStatic.label}-${firstStatic.value}`}
      />

      <DemoSection
        title="npm version"
        endpoint="/partial/npm-v"
        paramName="pkg"
        presets={NPM_PACKAGES}
        firstValue={firstNpm}
        srcPrefix={`/npm/v/${firstNpm}`}
      />

      <DemoSection
        title="npm downloads"
        endpoint="/partial/npm-d"
        paramName="pkg"
        presets={NPM_PACKAGES}
        firstValue={firstNpm}
        srcPrefix={`/npm/d/${firstNpm}`}
      />

      <div class={hireMeClass}>
        <p>Built by Jacob Stordahl. Available for contract work.</p>
        <a
          href="#"
          onclick="navigator.clipboard.writeText('jacob@stordahl.dev').then(function(){var t=this;t.textContent='Copied!';setTimeout(function(){t.textContent='Hire me'},2000)}.bind(this));return false"
        >Hire me</a>
      </div>
    </aside>
  );
}
