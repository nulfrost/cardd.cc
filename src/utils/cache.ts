export interface Env {
  CARDD_KV: KVNamespace;
  BADGE_RATE_LIMITER: RateLimit;
  BADGE_ANALYTICS: AnalyticsEngineDataset;
  GITHUB_TOKEN?: string;
}

const TTL = 3600;

export async function getCachedSVG(
  env: Env,
  key: string
): Promise<string | null> {
  return env.CARDD_KV.get(key);
}

export async function setCachedSVG(
  env: Env,
  key: string,
  svg: string
): Promise<void> {
  await env.CARDD_KV.put(key, svg, { expirationTtl: TTL });
}

export function cacheKey(url: string): string {
  return `svg:${url}`;
}
