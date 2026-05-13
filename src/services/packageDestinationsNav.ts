import { fetchPublicPackages } from "@/services/packagePublicApi";

let cached: string[] | null = null;
let inflight: Promise<string[]> | null = null;

/** Unique destinations for navbar dropdown; cached after first fetch. */
export function loadPackageDestinationsForNav(): Promise<string[]> {
  if (cached) return Promise.resolve(cached);
  if (!inflight) {
    inflight = fetchPublicPackages({ limit: 300 })
      .then((res) => {
        const list = Array.from(
          new Set(
            (res.data || [])
              .map((p) => p.destination)
              .filter((d): d is string => Boolean(d && String(d).trim()))
          )
        ).sort((a, b) => a.localeCompare(b));
        cached = list;
        return list;
      })
      .catch(() => {
        inflight = null;
        return [];
      });
  }
  return inflight;
}
