import { apiFetch } from "./api";

export interface Offer {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  discount?: string;
  originalPrice?: number | null;
  offerPrice?: number | null;
  validUntil?: string | null;
  active?: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface OfferListResponse {
  success: boolean;
  data: Offer[];
  pagination: { page: number; limit: number; total: number };
}

export async function fetchOffers(params?: {
  page?: number;
  limit?: number;
  active?: boolean;
}): Promise<OfferListResponse> {
  const sp = new URLSearchParams();
  if (params?.page != null) sp.set("page", String(params.page));
  if (params?.limit != null) sp.set("limit", String(params.limit));
  if (params?.active != null) sp.set("active", String(params.active));
  const q = sp.toString();
  const res = await apiFetch(`/api/offers${q ? `?${q}` : ""}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch offers");
  return data;
}

export async function fetchOffer(id: string): Promise<Offer> {
  const res = await apiFetch(`/api/offers/${id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch offer");
  return data.data;
}

export async function createOffer(body: Partial<Offer>): Promise<Offer> {
  const res = await apiFetch("/api/offers", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create offer");
  return data.data;
}

export async function updateOffer(
  id: string,
  body: Partial<Offer>
): Promise<Offer> {
  const res = await apiFetch(`/api/offers/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update offer");
  return data.data;
}

export async function deleteOffer(id: string): Promise<void> {
  const res = await apiFetch(`/api/offers/${id}`, { method: "DELETE" });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete offer");
}
