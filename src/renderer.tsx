import satori from "satori";
import type { BadgeCSS } from "./utils/css.js";
import type { FontData } from "./utils/fonts.js";

interface BadgeProps {
  label: string;
  value: string;
  css: BadgeCSS;
  height: number;
  fontSize: number;
}

function badgeWidth(label: string, value: string, fontSize: number, paddingX: number, borderWidth: number): number {
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
