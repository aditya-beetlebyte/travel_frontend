/** Strip trailing slash so paths like `/api/...` join correctly. */
export function normalizeApiUrl(url: string): string {
  return url.trim().replace(/\/+$/, "");
}

/**
 * API base URL for server-side code (SSR, route handlers).
 * Reads process.env at request time — works with Cloud Run runtime env vars.
 */
export function getServerApiUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_API_URL;
  if (fromEnv?.trim()) return normalizeApiUrl(fromEnv);
  return "http://localhost:5000";
}

/** Value injected into the page for browser-side fetch (see RootLayout). */
export function getPublicApiUrlForInjection(): string {
  return getServerApiUrl();
}

declare global {
  interface Window {
    __NEXT_PUBLIC_API_URL__?: string;
  }
}

/**
 * API base URL for browser + server.
 * Browser: uses runtime injection from Cloud Run env (not only build-time).
 */
export function getApiUrl(): string {
  if (typeof window !== "undefined" && window.__NEXT_PUBLIC_API_URL__) {
    return normalizeApiUrl(window.__NEXT_PUBLIC_API_URL__);
  }
  return getServerApiUrl();
}
