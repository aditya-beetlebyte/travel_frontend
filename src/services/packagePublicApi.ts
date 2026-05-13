import { getApiUrl } from "./api";
import type { TravelPackage } from "./packageApi";

interface PackageListResponse {
  success: boolean;
  data: TravelPackage[];
  pagination?: { page: number; limit: number; total: number };
  message?: string;
}

interface PackageSingleResponse {
  success: boolean;
  data: TravelPackage;
  message?: string;
}

export async function fetchPublicPackages(params?: {
  page?: number;
  limit?: number;
  destination?: string;
  isFeatured?: boolean;
}): Promise<PackageListResponse> {
  const query = new URLSearchParams();
  if (params?.page != null) query.set("page", String(params.page));
  if (params?.limit != null) query.set("limit", String(params.limit));
  if (params?.destination) query.set("destination", params.destination);
  if (params?.isFeatured != null) query.set("isFeatured", String(params.isFeatured));
  const q = query.toString();
  const res = await fetch(`${getApiUrl()}/api/packages/public${q ? `?${q}` : ""}`);
  const data = (await res.json()) as PackageListResponse;
  if (!res.ok) throw new Error(data.message || "Failed to fetch packages");
  return data;
}

export async function fetchPublicPackageById(id: string): Promise<TravelPackage> {
  const res = await fetch(`${getApiUrl()}/api/packages/public/${id}`);
  const data = (await res.json()) as PackageSingleResponse;
  if (!res.ok) throw new Error(data.message || "Failed to fetch package details");
  return data.data;
}
