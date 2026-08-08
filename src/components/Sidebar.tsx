import { css } from "hono/css";

const sidebarClass = css`
  grid-area: sidebar;
  min-height: 0;
  height: 100%;
  padding: 24px 16px;
  border-right: 1px solid var(--border-primary);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li { margin-bottom: 4px; }
  a {
    display: block;
    padding: 6px 10px;
    color: var(--text-dim);
    text-decoration: none;
    border-radius: var(--radius);
    font-size: 16px;
    transition: color 0.15s, background 0.15s;
    &:hover {
      color: var(--text-primary);
      background: var(--bg-tertiary);
    }
  }
     img {
     width: 75px;
   }

  @media (max-width: 900px) {
    display: none;
  }
`;

export default function Sidebar() {
  return (
    <nav class={sidebarClass}>
      <ul>
        <li><a href="#overview">Overview</a></li>
        <li><a href="#available-badges">Available Badges</a></li>
        <li><a href="#customization">Customization</a></li>
        <li><a href="#api-reference">API Reference</a></li>
      </ul>

      <img src="https://fav.farm/🃏" alt="" />
    </nav>
  );
}
