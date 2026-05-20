/** Strip trailing slash so paths like `/api/...` join correctly. */
export function normalizeApiUrl(url: string): string {
  return url.trim().replace(/\/+$/, "");
}

declare global {
  interface Window {
    __NEXT_PUBLIC_API_URL__?: string;
  }
}

const LOCAL_DEV_DEFAULT = "http://localhost:5000";

function readEnvApiUrl(): string | null {
  const fromEnv =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.API_URL ||
    process.env.BACKEND_URL;
  if (fromEnv?.trim()) return normalizeApiUrl(fromEnv);
  return null;
}

/**
 * Server only (SSR, layout). Uses Cloud Run / .env at request time.
 */
export function getServerApiUrl(): string {
  return readEnvApiUrl() ?? LOCAL_DEV_DEFAULT;
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
 * Base URL for all API fetch() calls.
 * Browser: runtime-config.js + layout (from NEXT_PUBLIC_API_URL on server).
 * Never uses localhost:5000 in production unless env is actually missing.
 */
export function getApiUrl(): string {
  if (typeof window !== "undefined") {
    const fromBrowser = getBrowserApiUrl();
    if (fromBrowser) return fromBrowser;

    // Inlined at docker build if build-arg was set
    const builtIn = process.env.NEXT_PUBLIC_API_URL;
    if (builtIn?.trim()) return normalizeApiUrl(builtIn);

    if (process.env.NODE_ENV === "development") {
      return LOCAL_DEV_DEFAULT;
    }

    console.error(
      "[API] NEXT_PUBLIC_API_URL is missing in the browser. Set it on the FRONTEND Cloud Run service and redeploy."
    );
    return LOCAL_DEV_DEFAULT;
  }

  return getServerApiUrl();
}
