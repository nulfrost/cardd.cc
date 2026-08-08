import { css } from "hono/css";
import GithubIcon from "./icons/Github.js";

const headerClass = css`
  flex: 0 0 auto;
  padding: 12px 24px;
  border-bottom: 1px solid #333;
  background: #111;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    margin: 0;
    font-size: 20px;
    letter-spacing: 1px;
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
    color: #888;
    text-decoration: none;
    border-radius: 4px;
    font-size: 14px;
    transition: color 0.15s, background 0.15s;
    &:hover {
      color: #fff;
      background: #222;
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
      <h1>cardd.cc</h1>
      <nav class={headerNavClass}>
        <a href="https://github.com/stordahl/cardd.cc/issues">issues</a>
        <a href="https://github.com/stordahl/cardd.cc">
          <GithubIcon />
        </a>
      </nav>
    </header>
  );
}
