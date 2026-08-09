import { describe, it, expect, vi } from "vitest";
import { relativeTime } from "../gh-last-commit.js";

describe("relativeTime", () => {
  const now = new Date("2026-08-09T12:00:00Z").getTime();

  it('returns "just now" for < 60 seconds', () => {
    vi.setSystemTime(now);
    expect(relativeTime("2026-08-09T11:59:30Z")).toBe("just now");
  });

  it("formats minutes", () => {
    vi.setSystemTime(now);
    expect(relativeTime("2026-08-09T11:58:00Z")).toBe("2m ago");
    expect(relativeTime("2026-08-09T11:01:00Z")).toBe("59m ago");
  });

  it("formats hours", () => {
    vi.setSystemTime(now);
    expect(relativeTime("2026-08-09T10:00:00Z")).toBe("2h ago");
    expect(relativeTime("2026-08-08T13:00:00Z")).toBe("23h ago");
  });

  it("formats days", () => {
    vi.setSystemTime(now);
    expect(relativeTime("2026-08-08T00:00:00Z")).toBe("1d ago");
    expect(relativeTime("2026-07-11T12:00:00Z")).toBe("29d ago");
  });

  it("formats months", () => {
    vi.setSystemTime(now);
    expect(relativeTime("2026-07-09T12:00:00Z")).toBe("1mo ago");
    expect(relativeTime("2025-09-09T12:00:00Z")).toBe("11mo ago");
  });

  it("formats years", () => {
    vi.setSystemTime(now);
    expect(relativeTime("2025-08-08T12:00:00Z")).toBe("1y ago");
    expect(relativeTime("2024-08-09T12:00:00Z")).toBe("2y ago");
  });
});
