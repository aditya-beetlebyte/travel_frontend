/** Strip trailing slash so paths like `/api/...` join correctly. */
export function normalizeApiUrl(url: string): string {
  return url.trim().replace(/\/+$/, "");
}
