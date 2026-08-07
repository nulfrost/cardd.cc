import type { FontWeight, FontStyle } from "satori";
import type { Env } from "./cache.js";
import DATATYPE_REGULAR from "../../fonts/Datatype-Regular.ttf";

export const BUNDLED_FONT_DATA: ArrayBuffer = DATATYPE_REGULAR;

export interface FontData {
  name: string;
  data: ArrayBuffer;
  weight: FontWeight;
  style: FontStyle;
}

const FONT_WEIGHT: FontWeight = 400;

const BUNDLED_FONTS: Record<string, ArrayBuffer> = {
  Datatype: BUNDLED_FONT_DATA,
};

async function tryGoogleFonts(fontFamily: string): Promise<string | null> {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}:wght@${FONT_WEIGHT}`;
  const resp = await fetch(cssUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    },
  });
  if (!resp.ok) return null;

  const css = await resp.text();
  if (!css.trim()) return null;

  const match = css.match(/url\((https:\/\/[^)]+)\)/);
  return match ? match[1] : null;
}

async function fetchAndCache(
  url: string,
  kvKey: string,
  env: Env,
): Promise<ArrayBuffer | null> {
  const resp = await fetch(url);
  if (!resp.ok) return null;

  const data = await resp.arrayBuffer();
  await env.TILES_KV.put(kvKey, data, { expirationTtl: 86400 * 30 });
  return data;
}

export async function loadFont(
  fontFamily: string,
  env: Env,
): Promise<FontData[]> {
  if (BUNDLED_FONTS[fontFamily]) {
    return [
      { name: fontFamily, data: BUNDLED_FONTS[fontFamily], weight: FONT_WEIGHT, style: "normal" },
    ];
  }

  const kvKey = `font:${fontFamily}:${FONT_WEIGHT}`;

  const cached = await env.TILES_KV.get(kvKey, "arrayBuffer");
  if (cached) {
    return [
      { name: fontFamily, data: cached as ArrayBuffer, weight: FONT_WEIGHT, style: "normal" },
    ];
  }

  const fontUrl = await tryGoogleFonts(fontFamily);
  if (!fontUrl) return [];

  const data = await fetchAndCache(fontUrl, kvKey, env);
  if (!data) return [];

  return [
    { name: fontFamily, data, weight: FONT_WEIGHT, style: "normal" },
  ];
}
