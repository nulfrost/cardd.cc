import { describe, it, expect } from "vitest";
import { Badge } from "../types.js";

class TestBadge extends Badge {
  id = "test";
  title = "Test";
  description = "Test badge";
  path = "/test/:owner/:repo";
  examplePath = "/test/foo/bar";
  pathParams = [
    { name: "owner", description: "Owner" },
    { name: "repo", description: "Repo" },
  ];

  async fetch() {
    return { label: "test", value: "test" };
  }
}

describe("Badge base class", () => {
  it("has a default onError", () => {
    const badge = new TestBadge();
    const result = badge.onError(new Error("fail"), {} as any);
    expect(result).toEqual({ label: "error", value: "fail" });
  });

  it("has a default method of GET", () => {
    const badge = new TestBadge();
    expect(badge.method).toBe("GET");
  });

  it("has empty pathParams by default", () => {
    class MinimalBadge extends Badge {
      id = "min";
      title = "Min";
      description = "min";
      path = "/min";
      examplePath = "/min";
      async fetch() {
        return { label: "min", value: "min" };
      }
    }
    const badge = new MinimalBadge();
    expect(badge.pathParams).toEqual([]);
  });

  it("has empty demoPresets by default", () => {
    class MinimalBadge extends Badge {
      id = "min";
      title = "Min";
      description = "min";
      path = "/min";
      examplePath = "/min";
      async fetch() {
        return { label: "min", value: "min" };
      }
    }
    const badge = new MinimalBadge();
    expect(badge.demoPresets).toEqual([]);
  });
});

describe("buildDemoPath", () => {
  it("replaces single path param", () => {
    class SingleParam extends Badge {
      id = "single";
      title = "single";
      description = "single";
      path = "/npm/v/:pkg";
      examplePath = "/npm/v/svelte";
      pathParams = [{ name: "pkg", description: "package" }];
      async fetch() {
        return { label: "test", value: "test" };
      }
    }
    const badge = new SingleParam();
    expect(badge.buildDemoPath("react")).toBe("/npm/v/react");
  });

  it("replaces multiple path params split by /", () => {
    const badge = new TestBadge();
    expect(badge.buildDemoPath("sveltejs/svelte")).toBe(
      "/test/sveltejs/svelte",
    );
  });

  it("handles fewer parts than params", () => {
    const badge = new TestBadge();
    expect(badge.buildDemoPath("sveltejs")).toBe("/test/sveltejs/");
  });

  it("returns path unchanged when no pathParams", () => {
    class NoParam extends Badge {
      id = "none";
      title = "none";
      description = "none";
      path = "/badge/license-MIT";
      examplePath = "/badge/license-MIT";
      async fetch() {
        return { label: "test", value: "test" };
      }
    }
    const badge = new NoParam();
    expect(badge.buildDemoPath("anything")).toBe("/badge/license-MIT");
  });
});
