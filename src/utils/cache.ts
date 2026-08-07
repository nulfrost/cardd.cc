export interface Env {
  TILES_KV: KVNamespace;
}

const TTL = 3600;

export async function getCachedSVG(
  env: Env,
  key: string
): Promise<string | null> {
  return env.TILES_KV.get(key);
}

export async function setCachedSVG(
  env: Env,
  key: string,
  svg: string
): Promise<void> {
  await env.TILES_KV.put(key, svg, { expirationTtl: TTL });
}

export function cacheKey(url: string): string {
  return `svg:${url}`;
}
