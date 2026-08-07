import { css } from "hono/css";

const sidebarClass = css`
  width: 180px;
  min-height: 100vh;
  flex: 0 0 auto;
  padding: 24px 16px;
  border-right: 1px solid #333;
  position: sticky;
  top: 0;
  align-self: flex-start;
  max-height: 100vh;
  overflow-y: auto;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li { margin-bottom: 4px; }
  a {
    display: block;
    padding: 6px 10px;
    color: #888;
    text-decoration: none;
    border-radius: 4px;
    font-size: 16px;
    transition: color 0.15s, background 0.15s;
    &:hover {
      color: #fff;
      background: #222;
    }
  }
  @media (max-width: 900px) {
    width: 100%;
    min-height: auto;
    flex: 0 0 auto;
    position: static;
    padding: 8px 24px;
    border-right: none;
    border-bottom: 1px solid #333;
    max-height: none;
    overflow-y: visible;
    order: 0;
    ul {
      display: flex;
      gap: 4px;
    }
    li { margin-bottom: 0; }
    a {
      padding: 4px 10px;
      font-size: 14px;
    }
  }
`;

export default function Sidebar() {
  return (
    <nav class={sidebarClass}>
      <ul>
        <li><a href="#overview">Overview</a></li>
        <li><a href="#usage">Usage</a></li>
        <li><a href="#customization">Customization</a></li>
        <li><a href="#examples">Examples</a></li>
      </ul>
    </nav>
  );
}
