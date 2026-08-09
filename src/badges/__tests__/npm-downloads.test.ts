import { describe, it, expect } from "vitest";
import { formatDownloads } from "../npm-downloads.js";

describe("formatDownloads", () => {
  it("formats millions", () => {
    expect(formatDownloads(1_000_000)).toBe("1.0M");
    expect(formatDownloads(2_500_000)).toBe("2.5M");
    expect(formatDownloads(9_999_999)).toBe("10.0M");
  });

  it("formats thousands", () => {
    expect(formatDownloads(1_000)).toBe("1.0k");
    expect(formatDownloads(2_500)).toBe("2.5k");
    expect(formatDownloads(999_999)).toBe("1000.0k");
  });

  it("returns raw number for small values", () => {
    expect(formatDownloads(0)).toBe("0");
    expect(formatDownloads(42)).toBe("42");
    expect(formatDownloads(999)).toBe("999");
  });
});
