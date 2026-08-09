import { describe, it, expect, vi } from "vitest";
import { trackBadge } from "../analytics.js";

function mockAnalytics(): AnalyticsEngineDataset {
  const writeDataPoint = vi.fn();
  return { writeDataPoint } as unknown as AnalyticsEngineDataset;
}

describe("trackBadge", () => {
  it("calls writeDataPoint with index, blobs, and duration", () => {
    const analytics = mockAnalytics();
    trackBadge(analytics, "npm-v", "success", "dark", 42);

    expect(analytics.writeDataPoint).toHaveBeenCalledWith({
      indexes: ["npm-v"],
      blobs: ["success", "dark"],
      doubles: [42],
    });
  });

  it("tracks errors with the corresponding status", () => {
    const analytics = mockAnalytics();
    trackBadge(analytics, "gh-stars", "error", "light", 150);

    expect(analytics.writeDataPoint).toHaveBeenCalledWith({
      indexes: ["gh-stars"],
      blobs: ["error", "light"],
      doubles: [150],
    });
  });

  it("tracks auto theme", () => {
    const analytics = mockAnalytics();
    trackBadge(analytics, "static", "success", "auto", 10);

    expect(analytics.writeDataPoint).toHaveBeenCalledWith({
      indexes: ["static"],
      blobs: ["success", "auto"],
      doubles: [10],
    });
  });
});
