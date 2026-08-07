export interface BadgeCSS {
  bg: string;
  color: string;
  radius: number;
  borderWidth: number;
  borderStyle: string;
  borderColor: string;
  font: string;
}

const DEFAULTS: BadgeCSS = {
  bg: "#555",
  color: "#fff",
  radius: 4,
  borderWidth: 0,
  borderStyle: "solid",
  borderColor: "#555",
  font: "Datatype",
};

export function parseCSS(searchParams: URLSearchParams): BadgeCSS {
  const hex = (v: string | null, fallback: string) =>
    v ? `#${v.replace(/^#/, "")}` : fallback;

  const num = (v: string | null, fallback: number) => {
    if (v === null) return fallback;
    const n = parseInt(v, 10);
    return isNaN(n) ? fallback : n;
  };

  const parsed: BadgeCSS = {
    bg: hex(searchParams.get("bg"), DEFAULTS.bg),
    color: hex(searchParams.get("color"), DEFAULTS.color),
    radius: num(searchParams.get("radius"), DEFAULTS.radius),
    borderWidth: num(searchParams.get("border"), DEFAULTS.borderWidth),
    borderStyle: DEFAULTS.borderStyle,
    borderColor: hex(searchParams.get("borderColor"), DEFAULTS.borderColor),
    font: searchParams.get("font") ?? DEFAULTS.font,
  };

  const borderParam = searchParams.get("border");
  if (borderParam) {
    const parts = borderParam.split("+");
    if (parts.length >= 1) parsed.borderWidth = num(parts[0], 1);
    if (parts.length >= 2) parsed.borderStyle = parts[1] || DEFAULTS.borderStyle;
    if (parts.length >= 3) parsed.borderColor = hex(parts[2], DEFAULTS.borderColor);
  }

  return parsed;
}
