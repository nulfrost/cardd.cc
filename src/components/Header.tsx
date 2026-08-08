import { css } from "hono/css";
import GithubIcon from "./icons/Github.js";

const headerClass = css`
  flex: 0 0 var(--header-height);
  box-sizing: border-box;
  padding: 12px 24px;
  border-bottom: 1px solid var(--border-primary);
  background: var(--bg-primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    margin: 0;
    font-size: 20px;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const mobileJokerClass = css`
  display: none;
  width: 28px;
  height: 28px;
  @media (max-width: 900px) {
    display: inline;
  }
`;

const headerNavClass = css`
  display: flex;
  align-items: center;
  gap: 4px;
  a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    color: var(--text-dim);
    text-decoration: none;
    border-radius: var(--radius);
    font-size: 14px;
    transition: color 0.15s, background 0.15s;
    &:hover {
      color: var(--text-primary);
      background: var(--bg-tertiary);
    }
  }
  svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
  }
`;

export default function Header() {
  return (
    <header class={headerClass}>
      <h1><img class={mobileJokerClass} src="https://fav.farm/🃏" alt="" />cardd.cc</h1>
      <nav class={headerNavClass}>
        <a href="https://github.com/stordahl/cardd.cc/issues">issues</a>
        <a href="https://github.com/stordahl/cardd.cc">
          <GithubIcon />
        </a>
      </nav>
    </header>
  );
}
