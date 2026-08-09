import { describe, it, expect } from "vitest";
import { badgeWidth, extractInner, mergeAuto } from "../renderer.js";

describe("badgeWidth", () => {
  it("calculates width based on label and value length", () => {
    const width = badgeWidth("license", "MIT", 11, 8, 0);
    const expected = Math.ceil((7 + 3 + 3) * (11 * 0.6) + 8 * 2 + 0 * 2);
    expect(width).toBe(expected);
  });

  it("includes border width in calculation", () => {
    const noBorder = badgeWidth("x", "y", 11, 8, 0);
    const withBorder = badgeWidth("x", "y", 11, 8, 2);
    expect(withBorder).toBe(noBorder + 4);
  });

  it("scales with font size", () => {
    const small = badgeWidth("x", "y", 11, 8, 0);
    const large = badgeWidth("x", "y", 22, 8, 0);
    expect(large).toBeGreaterThan(small);
  });
});

describe("extractInner", () => {
  it("strips outer svg tags", () => {
    const result = extractInner(
      '<svg width="100" height="20" viewBox="0 0 100 20"><g>hello</g></svg>',
    );
    expect(result).toBe("<g>hello</g>");
  });

  it("handles svg with xml namespace", () => {
    const result = extractInner(
      '<svg width="100" height="20" xmlns="http://www.w3.org/2000/svg"><text>foo</text></svg>',
    );
    expect(result).toBe("<text>foo</text>");
  });
});

describe("mergeAuto", () => {
  const darkSVG =
    '<svg width="100" height="20" viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg"><rect fill="#000"/></svg>';
  const lightSVG =
    '<svg width="100" height="20" viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg"><rect fill="#fff"/></svg>';

  it("merges dark and light SVGs with media queries", () => {
    const result = mergeAuto(darkSVG, lightSVG);
    expect(result).toContain("prefers-color-scheme: light");
    expect(result).toContain("prefers-color-scheme: dark");
    expect(result).toContain('class="mode-dark"');
    expect(result).toContain('class="mode-light"');
    expect(result).toContain('<rect fill="#000"/>');
    expect(result).toContain('<rect fill="#fff"/>');
  });

  it("extracts viewBox from dark SVG", () => {
    const result = mergeAuto(darkSVG, lightSVG);
    expect(result).toContain('viewBox="0 0 100 20"');
  });

  it("falls back to default dimensions when viewBox is missing", () => {
    const noViewBox = "<svg><g>x</g></svg>";
    const result = mergeAuto(noViewBox, noViewBox);
    expect(result).toContain('viewBox="0 0 200 20"');
    expect(result).toContain('width="200"');
    expect(result).toContain('height="20"');
  });
});
