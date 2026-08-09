import { describe, it, expect } from "vitest";
import { cacheKey } from "../cache.js";

describe("cacheKey", () => {
  it("prefixes a URL with svg:", () => {
    expect(cacheKey("/badge/license-MIT")).toBe("svg:/badge/license-MIT");
  });

  it("preserves query params", () => {
    expect(cacheKey("/badge/license-MIT?bg=555&color=fff")).toBe(
      "svg:/badge/license-MIT?bg=555&color=fff",
    );
  });
});
