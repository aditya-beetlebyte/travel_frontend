import { fetchPublicPackages } from "@/services/packagePublicApi";
import type { TravelPackage } from "@/services/packageApi";

const CACHE_KEY = "travel_home_listing_packages_v1";
const CACHE_TTL_MS = 5 * 60 * 1000;

let inflight: Promise<TravelPackage[]> | null = null;

function readCache(): TravelPackage[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { ts, data } = JSON.parse(raw) as { ts: number; data: TravelPackage[] };
    if (Date.now() - ts > CACHE_TTL_MS || !Array.isArray(data)) return null;
    return data;
  } catch {
    return null;
  }
}

function writeCache(data: TravelPackage[]): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
  } catch {
    /* quota / private mode */
  }
}

/** Cached packages for home featured section (max ~30 from API). */
export function getCachedHomeListingPackages(): TravelPackage[] | null {
  return readCache();
}

export function fetchHomeListingPackages(): Promise<TravelPackage[]> {
  if (!inflight) {
    inflight = fetchPublicPackages({ limit: 30, isFeatured: true })
      .then(async (featuredRes) => {
        let data = featuredRes.data || [];
        if (data.length < 6) {
          const allRes = await fetchPublicPackages({ limit: 30 });
          data = allRes.data || [];
        }
        writeCache(data);
        return data;
      })
      .catch(async () => {
        const res = await fetchPublicPackages({ limit: 30 });
        const data = res.data || [];
        writeCache(data);
        return data;
      })
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

export function pickFeaturedPackages(packages: TravelPackage[]): TravelPackage[] {
  const categoryKey = (p: TravelPackage): "meghalaya" | "bhutan" | "northEast" | null => {
    const dest = (p.destination || "").toLowerCase();
    const name = (p.packageName || "").toLowerCase();
    if (dest.includes("bhutan") || name.includes("bhutan")) return "bhutan";
    if (dest.includes("meghalaya") || name.includes("meghalaya")) return "meghalaya";
    if (dest.includes("arunachal") || name.includes("north east") || name.includes("north-east"))
      return "northEast";
    return null;
  };

  const pickTwo = (key: "meghalaya" | "bhutan" | "northEast") =>
    packages.filter((p) => categoryKey(p) === key).slice(0, 2);

  const picked = [...pickTwo("meghalaya"), ...pickTwo("bhutan"), ...pickTwo("northEast")];
  const seen = new Set<string>();
  return picked.filter((p) => {
    if (!p._id || seen.has(p._id)) return false;
    seen.add(p._id);
    return true;
  });
}
