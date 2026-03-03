import { apiFetch } from "./api";
export type BlogStatus = "draft" | "published";

export interface Blog {
  _id: string;
  title: string;
  slug?: string;
  content: string;
  author?: string;
  excerpt?: string;
  coverImage?: string;
  published?: boolean;
  status?: BlogStatus;
  categories?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogListResponse {
  success: boolean;
  data: Blog[];
  pagination: { page: number; limit: number; total: number };
}

export interface BlogSingleResponse {
  success: boolean;
  data: Blog;
}

export async function fetchBlogs(params?: {
  page?: number;
  limit?: number;
  published?: boolean;
  status?: BlogStatus;
}): Promise<BlogListResponse> {
  const sp = new URLSearchParams();
  if (params?.page != null) sp.set("page", String(params.page));
  if (params?.limit != null) sp.set("limit", String(params.limit));
  if (params?.published != null) sp.set("published", String(params.published));
  if (params?.status != null) sp.set("status", params.status);
  const q = sp.toString();
  const res = await apiFetch(`/api/blogs${q ? `?${q}` : ""}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch blogs");
  return data;
}

export async function fetchBlog(id: string): Promise<Blog> {
  const res = await apiFetch(`/api/blogs/${id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch blog");
  return data.data;
}

export async function createBlog(body: Partial<Blog>): Promise<Blog> {
  const res = await apiFetch("/api/blogs", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create blog");
  return data.data;
}

export async function updateBlog(id: string, body: Partial<Blog>): Promise<Blog> {
  const res = await apiFetch(`/api/blogs/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update blog");
  return data.data;
}

export async function deleteBlog(id: string): Promise<void> {
  const res = await apiFetch(`/api/blogs/${id}`, { method: "DELETE" });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete blog");
}
