import { normalizeApiUrl } from "./apiConfig.shared";

declare global {
  interface Window {
    __NEXT_PUBLIC_API_URL__?: string;
  }
}

/** Browser-only: never reads process.env (avoids Next/Turbopack compile-time inlining). */
export function getApiUrl(): string {
  if (typeof window !== "undefined" && window.__NEXT_PUBLIC_API_URL__) {
    return normalizeApiUrl(window.__NEXT_PUBLIC_API_URL__);
  }

  if (typeof document !== "undefined") {
    const meta = document.querySelector('meta[name="api-base-url"]');
    const content = meta?.getAttribute("content");
    if (content?.trim()) return normalizeApiUrl(content);
  }

  throw new Error(
    "API URL is not available in the browser. Ensure /runtime-config.js loads and layout sets meta api-base-url."
  );
}
