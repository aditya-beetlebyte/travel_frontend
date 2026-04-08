const AUTH_TOKEN_KEY = "auth_token";

export function getApiUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function getAuthHeaders(): HeadersInit {
  const token = getAuthToken();
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

export async function apiFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const url = `${getApiUrl()}${path}`;
  return fetch(url, {
    ...options,
    headers: { ...getAuthHeaders(), ...options.headers },
  });
}
