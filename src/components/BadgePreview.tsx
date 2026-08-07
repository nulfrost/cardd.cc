import { css } from "hono/css";

const badgePreviewClass = css`
  margin: 8px 0;
`;

export default function BadgePreview({ src, alt }: { src: string; alt: string }) {
  return (
    <div class={badgePreviewClass}>
      <img src={src} alt={alt} />
    </div>
  );
}
