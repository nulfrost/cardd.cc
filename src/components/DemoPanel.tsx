import { css } from "hono/css";

const demoPanelClass = css`
  grid-area: panel;
  min-height: 0;
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--border-primary);
  @media (max-width: 900px) {
    display: none;
  }
`;

const demoSectionsClass = css`
  flex: 1 1 0;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const demoSectionClass = css`
  padding: 24px 32px;
  border-bottom: 1px solid var(--border-secondary);
  &:last-child { border-bottom: none; }
  h2 {
    margin: 0 0 12px 0;
    font-size: 14px;
    color: var(--text-secondary);
  }
  @media (max-width: 900px) {
    margin-bottom: 16px;
    padding-bottom: 16px;
  }
`;

const hireMeClass = css`
  flex-shrink: 0;
  padding: 24px 32px;
  border-top: 1px solid var(--border-secondary);
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
    display: none;
  }
`;

const demoSelectClass = css`
  font-family: var(--font-mono);
  font-size: 13px;
  background: var(--bg-tertiary);
  color: var(--text-body);
  border: 1px solid var(--border-input);
  padding: 5px 8px;
  border-radius: var(--radius);
  width: 100%;
  &:focus {
    outline: none;
    border-color: var(--accent);
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
      <div class={demoSectionsClass}>
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
      </div>

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
