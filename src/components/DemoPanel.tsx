import { css } from "hono/css";
import type { Badge, BadgePreset } from "../badges/types.js";

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
  div:has(a.button) {
    display: flex;
    gap: 3px;
  }
  a.button {
    display: inline-block;
    padding: 4px 10px;
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

function DemoSection({ badge }: { badge: Badge }) {
  const firstPreset = badge.demoPresets[0];
  const firstValue = firstPreset?.value ?? "";
  const initialPath = badge.buildDemoPath(firstValue);

  return (
    <section class={demoSectionClass}>
      <h2>{badge.title}</h2>
      <form
        class="badge-form"
        hx-get={`/partial/${badge.id}`}
        hx-trigger="change"
        hx-target="next .demo-result"
        hx-swap="innerHTML"
      >
        <select class={demoSelectClass} name="preset">
          {badge.demoPresets.map((p: BadgePreset) => (
            <option value={p.value}>{p.label}</option>
          ))}
        </select>
      </form>
      <div class="demo-result">
        <div class="badge-preview">
          <img class="badge-img" src={initialPath} alt={badge.title} />
        </div>
        <div class="demo-url">
          <code class="badge-code">{`cardd.cc${initialPath}`}</code>
        </div>
      </div>
    </section>
  );
}

export default function DemoPanel({ badges }: { badges: Badge[] }) {
  return (
    <aside class={demoPanelClass}>
      <div class={demoSectionsClass}>
        {badges.map(badge => (
          <DemoSection badge={badge} />
        ))}
      </div>

      <div class={hireMeClass}>
        <p>Built with ❤︎ in Minneapolis by <a href="https://stordahl.dev">Jacob Stordahl.</a></p>
        <div>
          <a class="button" href="https://bsky.app/profile/stordahl.dev">follow me</a>
          <a class="button" href="#" data-copy="jacob@stordahl.dev">hit me up</a>
          <a class="button" href="https://stordahl.dev">hire me</a>
        </div>
      </div>
    </aside>
  );
}
