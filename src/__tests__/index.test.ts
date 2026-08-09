import { describe, it, expect } from "vitest";
import { fragment } from "../index.js";

describe("fragment", () => {
  it("returns an HTML snippet with img and code elements", () => {
    const result = fragment("/badge/license-MIT?bg=555");
    expect(result).toContain('<img class="badge-img" src="/badge/license-MIT?bg=555"');
    expect(result).toContain('<code class="badge-code">cardd.cc/badge/license-MIT?bg=555</code>');
  });

  it("wraps output in badge-preview and demo-url divs", () => {
    const result = fragment("/npm/v/svelte");
    expect(result).toContain('<div class="badge-preview">');
    expect(result).toContain('<div class="demo-url">');
  });
});
