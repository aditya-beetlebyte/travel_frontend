import { apiFetch } from "./api";

export interface TravelPackage {
  _id: string;
  packageName: string;
  packageCode?: string;
  destination: string;
  destinations?: string[];
  cities?: string[];
  startPoint?: string;
  endPoint?: string;
  duration: {
    nights: number;
    days: number;
  };
  vehicle?: string;
  images?: string[];
  itinerary?: {
    dayNumber: number;
    from: string;
    to: string;
    route?: string;
    title: string;
    description: string;
    placesToVisit?: string[];
    distanceKm?: number;
    travelHours?: number;
    nightStay: {
      city: string;
      hotelName: string;
      roomCategory?: string;
      mealPlan?: string;
    };
  }[];
  inclusions?: string[];
  exclusions?: string[];
  paymentTerms?: string;
  cancellationPolicy?: string;
  travelAdvisory?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PackageListResponse {
  success: boolean;
  data: TravelPackage[];
  pagination: { page: number; limit: number; total: number };
}

export interface PackageFilters {
  page?: number;
  limit?: number;
  destination?: string;
  isActive?: boolean;
  isFeatured?: boolean;
}

export async function fetchPackages(
  params?: PackageFilters
): Promise<PackageListResponse> {
  const sp = new URLSearchParams();
  if (params?.page != null) sp.set("page", String(params.page));
  if (params?.limit != null) sp.set("limit", String(params.limit));
  if (params?.destination) sp.set("destination", params.destination);
  if (params?.isActive != null) sp.set("isActive", String(params.isActive));
  if (params?.isFeatured != null) sp.set("isFeatured", String(params.isFeatured));

  const q = sp.toString();
  const res = await apiFetch(`/api/packages${q ? `?${q}` : ""}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch packages");
  return data;
}

export async function fetchPackageById(id: string): Promise<TravelPackage> {
  const res = await apiFetch(`/api/packages/${id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch package");
  return data.data;
}

export async function createPackage(
  body: Partial<TravelPackage>
): Promise<TravelPackage> {
  const res = await apiFetch("/api/packages", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create package");
  return data.data;
}

export async function createMultiplePackages(
  packages: Partial<TravelPackage>[]
): Promise<TravelPackage[]> {
  const res = await apiFetch("/api/packages/bulk", {
    method: "POST",
    body: JSON.stringify({ packages }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create packages");
  return data.data;
}

export async function updatePackage(
  id: string,
  body: Partial<TravelPackage>
): Promise<TravelPackage> {
  const res = await apiFetch(`/api/packages/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update package");
  return data.data;
}

export async function deletePackage(id: string): Promise<void> {
  const res = await apiFetch(`/api/packages/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete package");
}
