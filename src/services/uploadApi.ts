import { getApiUrl, getAuthToken } from "./api";

export interface UploadResponse {
  success: boolean;
  url: string;
  filename: string;
}

export async function uploadFile(file: File): Promise<UploadResponse> {
  const token = getAuthToken();
  if (!token) {
    throw new Error("You must be logged in to upload files.");
  }
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${getApiUrl()}/api/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // Do not set Content-Type; browser sets multipart/form-data with boundary
    },
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Upload failed");
  }
  if (!data.success || !data.url) {
    throw new Error(data.message || "Upload failed");
  }
  return data;
}
