/** Strip trailing slash so paths like `/api/...` join correctly. */
export function normalizeApiUrl(url: string): string {
  return url.trim().replace(/\/+$/, "");
}

declare global {
  interface Window {
    __NEXT_PUBLIC_API_URL__?: string;
  }
}

/**
 * Backend base URL from environment (server reads Cloud Run / .env at runtime).
 */
export function getServerApiUrl(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.API_URL ||
    process.env.BACKEND_URL;
  if (fromEnv?.trim()) return normalizeApiUrl(fromEnv);
  return "http://localhost:5000";
}

function getBrowserApiUrl(): string | null {
  if (typeof window === "undefined") return null;

  if (window.__NEXT_PUBLIC_API_URL__) {
    return normalizeApiUrl(window.__NEXT_PUBLIC_API_URL__);
  }

  const meta = document.querySelector('meta[name="api-base-url"]');
  const content = meta?.getAttribute("content");
  if (content?.trim()) return normalizeApiUrl(content);

  return null;
}

/**
 * All API calls use NEXT_PUBLIC_API_URL (direct to backend, not localhost:3000 proxy).
 */
export function getApiUrl(): string {
  const fromBrowser = getBrowserApiUrl();
  if (fromBrowser) return fromBrowser;

  const fromEnv = process.env.NEXT_PUBLIC_API_URL;
  if (fromEnv?.trim()) return normalizeApiUrl(fromEnv);

  return getServerApiUrl();
}
