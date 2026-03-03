import { getApiUrl } from "./api";

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  admin?: { id: string; email: string };
}

export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  let res: Response;
  try {
    res = await fetch(`${getApiUrl()}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  } catch {
    throw new Error(
      "Cannot reach server. Make sure the backend is running (e.g. on http://localhost:5000)."
    );
  }
  let data: AuthResponse;
  try {
    data = await res.json();
  } catch {
    throw new Error("Invalid response from server");
  }
  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }
  return data;
}

export async function signup(
  email: string,
  password: string
): Promise<AuthResponse> {
  let res: Response;
  try {
    res = await fetch(`${getApiUrl()}/api/admin/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  } catch {
    throw new Error(
      "Cannot reach server. Make sure the backend is running (e.g. on http://localhost:5000)."
    );
  }
  let data: AuthResponse;
  try {
    data = await res.json();
  } catch {
    throw new Error("Invalid response from server");
  }
  if (!res.ok) {
    throw new Error(data.message || "Signup failed");
  }
  return data;
}
