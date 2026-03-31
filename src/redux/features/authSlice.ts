import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { PermissionsMap } from "@/utils/permissions";

const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";
const AUTH_PERMISSIONS_KEY = "auth_permissions";

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  roleId: string;
  roleName?: string;
  isSuperAdmin: boolean;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  permissions: PermissionsMap | null;
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
    const u = JSON.parse(raw) as Partial<AuthUser> & { role?: string };
    if (!u?.id || !u?.email) return null;
    return {
      id: u.id,
      email: u.email,
      name: u.name,
      roleId: u.roleId ?? "",
      roleName: u.roleName,
      isSuperAdmin:
        typeof u.isSuperAdmin === "boolean"
          ? u.isSuperAdmin
          : u.role === "super_admin",
    };
  } catch {
    return null;
  }
}

function getStoredPermissions(): PermissionsMap | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(AUTH_PERMISSIONS_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PermissionsMap;
  } catch {
    return null;
  }
}

const initialState: AuthState = {
  user: getStoredUser(),
  token: getStoredToken(),
  permissions: getStoredPermissions(),
  isAuthenticated: !!(getStoredToken() && getStoredUser()),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      {
        payload,
      }: PayloadAction<{
        token: string;
        user: AuthUser;
        permissions: PermissionsMap;
      }>
    ) => {
      state.token = payload.token;
      state.user = payload.user;
      state.permissions = payload.permissions;
      state.isAuthenticated = true;
      if (typeof window !== "undefined") {
        localStorage.setItem(AUTH_TOKEN_KEY, payload.token);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(payload.user));
        localStorage.setItem(
          AUTH_PERMISSIONS_KEY,
          JSON.stringify(payload.permissions)
        );
      }
    },
    setPermissions: (
      state,
      { payload }: PayloadAction<{ user: AuthUser; permissions: PermissionsMap }>
    ) => {
      state.user = payload.user;
      state.permissions = payload.permissions;
      if (typeof window !== "undefined") {
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(payload.user));
        localStorage.setItem(
          AUTH_PERMISSIONS_KEY,
          JSON.stringify(payload.permissions)
        );
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.permissions = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
        localStorage.removeItem(AUTH_PERMISSIONS_KEY);
      }
    },
    hydrateAuth: (state) => {
      const token = getStoredToken();
      const user = getStoredUser();
      const permissions = getStoredPermissions();
      state.token = token;
      state.user = user;
      state.permissions = permissions;
      state.isAuthenticated = !!(token && user);
    },
  },
});

export const { setAuth, setPermissions, logout, hydrateAuth } = authSlice.actions;
export default authSlice.reducer;
