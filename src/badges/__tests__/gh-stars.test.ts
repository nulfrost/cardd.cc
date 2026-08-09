import { describe, it, expect } from "vitest";
import { formatStars } from "../gh-stars.js";

describe("formatStars", () => {
  it("formats millions", () => {
    expect(formatStars(1_000_000)).toBe("1.0M");
    expect(formatStars(2_500_000)).toBe("2.5M");
  });

  it("formats thousands", () => {
    expect(formatStars(1_000)).toBe("1.0k");
    expect(formatStars(2_500)).toBe("2.5k");
  });

  it("returns raw number for small values", () => {
    expect(formatStars(0)).toBe("0");
    expect(formatStars(42)).toBe("42");
    expect(formatStars(999)).toBe("999");
  });
});
