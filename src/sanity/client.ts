import { createClient } from "@sanity/client";
import { sanityConfig } from "./config";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";

const CACHE_DIR = ".cache/sanity";
const DEV_CACHE_TTL = 60_000;

function cacheKey(query: string, params: unknown) {
  return createHash("md5").update(query + JSON.stringify(params)).digest("hex");
}

export const sanityClient = createClient({
  ...sanityConfig,
  token: import.meta.env.SANITY_TOKEN,
});

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  options: Record<string, unknown> = {},
): Promise<T> {
  if (import.meta.env.PROD) {
    return sanityClient.fetch<T>(query, params, options);
  }

  const key = cacheKey(query, params);
  const cachePath = join(CACHE_DIR, `${key}.json`);

  if (existsSync(cachePath)) {
    try {
      const { data, ts } = JSON.parse(readFileSync(cachePath, "utf-8"));
      if (Date.now() - ts < DEV_CACHE_TTL) return data as T;
    } catch {
    }
  }

  const data = await sanityClient.fetch<T>(query, params, options);
  mkdirSync(CACHE_DIR, { recursive: true });
  writeFileSync(cachePath, JSON.stringify({ data, ts: Date.now() }));
  return data;
}
