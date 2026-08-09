export function trackBadge(
  analytics: AnalyticsEngineDataset,
  badgeId: string,
  status: string,
  theme: string,
  durationMs: number,
) {
  analytics.writeDataPoint({
    indexes: [badgeId],
    blobs: [status, theme],
    doubles: [durationMs],
  });
}
