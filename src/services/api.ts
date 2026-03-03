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
  const base = getApiUrl();
  const url = `${base}${path}`;
  // #region agent log
  try {
    fetch('http://127.0.0.1:7479/ingest/c43f454a-2b75-4e7e-8a3b-173fb7a44b86', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '4dcbac' }, body: JSON.stringify({ sessionId: '4dcbac', location: 'api.ts:apiFetch:before', message: 'fetch URL', data: { url, base }, timestamp: Date.now(), hypothesisId: 'H1-H3' }) }).catch(() => {});
  } catch {}
  // #endregion
  let res: Response;
  try {
    res = await fetch(url, {
      ...options,
      headers: { ...getAuthHeaders(), ...options.headers },
    });
  } catch (e) {
    // #region agent log
    fetch('http://127.0.0.1:7479/ingest/c43f454a-2b75-4e7e-8a3b-173fb7a44b86', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '4dcbac' }, body: JSON.stringify({ sessionId: '4dcbac', location: 'api.ts:apiFetch:catch', message: 'fetch threw', data: { err: String(e) }, timestamp: Date.now(), hypothesisId: 'H1-H4' }) }).catch(() => {});
    // #endregion
    throw e;
  }
  // #region agent log
  const acao = res.headers.get('Access-Control-Allow-Origin') ?? '(none)';
  fetch('http://127.0.0.1:7479/ingest/c43f454a-2b75-4e7e-8a3b-173fb7a44b86', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '4dcbac' }, body: JSON.stringify({ sessionId: '4dcbac', location: 'api.ts:apiFetch:after', message: 'response', data: { status: res.status, ok: res.ok, type: res.type, url: res.url, accessControlAllowOrigin: acao }, timestamp: Date.now(), hypothesisId: 'H2-H4-H5' }) }).catch(() => {});
  // #endregion
  return res;
}
