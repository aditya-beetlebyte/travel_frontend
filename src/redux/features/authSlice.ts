import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";

export interface AuthUser {
  id: string;
  email: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
}

function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(AUTH_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

const initialState: AuthState = {
  user: getStoredUser(),
  token: getStoredToken(),
  isAuthenticated: !!(getStoredToken() && getStoredUser()),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      { payload }: PayloadAction<{ token: string; user: AuthUser }>
    ) => {
      state.token = payload.token;
      state.user = payload.user;
      state.isAuthenticated = true;
      if (typeof window !== "undefined") {
        localStorage.setItem(AUTH_TOKEN_KEY, payload.token);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(payload.user));
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
      }
    },
    hydrateAuth: (state) => {
      const token = getStoredToken();
      const user = getStoredUser();
      state.token = token;
      state.user = user;
      state.isAuthenticated = !!(token && user);
    },
  },
});

export const { setAuth, logout, hydrateAuth } = authSlice.actions;
export default authSlice.reducer;
