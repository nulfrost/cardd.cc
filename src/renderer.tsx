import satori from "satori";
import type { BadgeCSS } from "./utils/css.js";
import { DARK, LIGHT } from "./utils/css.js";
import type { FontData } from "./utils/fonts.js";

interface BadgeProps {
  label: string;
  value: string;
  css: BadgeCSS;
  height: number;
  fontSize: number;
}

export function badgeWidth(label: string, value: string, fontSize: number, paddingX: number, borderWidth: number): number {
  const separatorWidth = 3;
  const charWidth = fontSize * 0.6;
  const textWidth = (label.length + value.length + separatorWidth) * charWidth;
  return Math.ceil(textWidth + paddingX * 2 + borderWidth * 2);
}

function Badge({ label, value, css, height, fontSize }: BadgeProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: `${height}px`,
        padding: `0 8px`,
        backgroundColor: css.bg,
        color: css.color,
        borderRadius: `${css.radius}px`,
        borderWidth: `${css.borderWidth}px`,
        borderStyle: css.borderStyle,
        borderColor: css.borderColor,
        fontFamily: css.font,
        fontSize: `${fontSize}px`,
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ display: "flex" }}>{label}</span>
      <span
        style={{
          display: "flex",
          margin: "0 3px",
          opacity: 0.4,
        }}
      >
        |
      </span>
      <span style={{ display: "flex" }}>{value}</span>
    </div>
  );
}

export async function renderBadge(
  label: string,
  value: string,
  css: BadgeCSS,
  fonts: FontData[],
): Promise<string> {
  const fontSize = 11;
  const height = 20;
  const paddingX = 8;
  const width = badgeWidth(label, value, fontSize, paddingX, css.borderWidth);

  const svg = await satori(
    <Badge label={label} value={value} css={css} height={height} fontSize={fontSize} />,
    {
      width,
      height,
      fonts,
    },
  );

  return svg;
}

export async function renderErrorBadge(
  label: string,
  value: string,
  css: BadgeCSS,
  fonts: FontData[],
): Promise<string> {
  return renderBadge(label, value, { ...css, bg: "#d73a49" }, fonts);
}

export function extractInner(svg: string): string {
  return svg
    .replace(/^[\s\S]*?<svg[^>]*>/, "")
    .replace(/<\/svg>[\s\S]*$/, "");
}

export function mergeAuto(darkSVG: string, lightSVG: string): string {
  const viewBox = darkSVG.match(/viewBox="([^"]+)"/)?.[1] ?? "0 0 200 20";
  const width = darkSVG.match(/width="([^"]+)"/)?.[1] ?? "200";
  const height = darkSVG.match(/height="([^"]+)"/)?.[1] ?? "20";

  return `<svg width="${width}" height="${height}" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">
<style>
  @media (prefers-color-scheme: light) { .mode-dark { display: none; } }
  @media (prefers-color-scheme: dark) { .mode-light { display: none; } }
</style>
<g class="mode-dark">${extractInner(darkSVG)}</g>
<g class="mode-light">${extractInner(lightSVG)}</g>
</svg>`;
}

export async function renderAutoBadge(
  label: string,
  value: string,
  css: BadgeCSS,
  fonts: FontData[],
): Promise<string> {
  const dark = await renderBadge(
    label,
    value,
    { ...css, bg: DARK.bg, color: DARK.color, borderColor: DARK.borderColor },
    fonts,
  );
  const light = await renderBadge(
    label,
    value,
    { ...css, bg: LIGHT.bg, color: LIGHT.color, borderColor: LIGHT.borderColor },
    fonts,
  );
  return mergeAuto(dark, light);
}
