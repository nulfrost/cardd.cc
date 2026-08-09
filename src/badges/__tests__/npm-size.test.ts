import { describe, it, expect } from "vitest";
import { formatSize } from "../npm-size.js";

describe("formatSize", () => {
  it("formats MB", () => {
    expect(formatSize(1_000_000)).toBe("1.0 MB");
    expect(formatSize(2_500_000)).toBe("2.5 MB");
  });

  it("formats kB", () => {
    expect(formatSize(1_000)).toBe("1.0 kB");
    expect(formatSize(2_500)).toBe("2.5 kB");
    expect(formatSize(999_999)).toBe("1000.0 kB");
  });

  it("formats bytes", () => {
    expect(formatSize(0)).toBe("0 B");
    expect(formatSize(42)).toBe("42 B");
    expect(formatSize(999)).toBe("999 B");
  });
});
