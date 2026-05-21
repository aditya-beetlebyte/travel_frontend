import { getApiUrl, getAuthHeaders } from "./api";
import type { AuthUser } from "@/redux/features/authSlice";
import type { PermissionsMap, ActionKey } from "@/utils/permissions";

export interface AuthAdmin {
  id: string;
  email: string;
  name?: string;
  roleId: string;
  roleName?: string;
  isSuperAdmin: boolean;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  admin?: AuthAdmin;
  permissions?: PermissionsMap;
}

export interface RbacModuleRow {
  key: string;
  label: string;
}

export interface RbacModulesResponse {
  success: boolean;
  actions?: ActionKey[];
  modules?: RbacModuleRow[];
  message?: string;
}

export interface RoleDto {
  id: string;
  name: string;
  type?: string;
  isSuperAdmin: boolean;
  permissions?: PermissionsMap;
  createdAt?: string;
  updatedAt?: string;
}

export type EnquiryStatus = "new" | "contacted" | "proposal_sent" | "won" | "lost";

export interface EnquiryHistoryItemDto {
  field: string;
  from: string;
  to: string;
  changedById?: string;
  changedByName?: string;
  changedByEmail?: string;
  changedAt?: string;
}

export interface EnquiryDto {
  id: string;
  companyName: string;
  contactPersonName: string;
  email: string;
  phone: string;
  preferredDestination: string;
  travelDate: string;
  travellersCount: string;
  tripDuration: string;
  budgetRange: string;
  businessType: string;
  subject: string;
  message: string;
  packageId?: string;
  packageName?: string;
  status: EnquiryStatus;
  assignedToId?: string;
  assignedToName?: string;
  notes?: string;
  history?: EnquiryHistoryItemDto[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminUserDto {
  id: string;
  email: string;
  name?: string;
  roleId: string;
  roleName?: string;
  isSuperAdmin: boolean;
  createdAt?: string;
  updatedAt?: string;
}

async function parseJson<T>(res: Response): Promise<T> {
  const data = await res.json();
  return data as T;
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
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
  const data = await parseJson<LoginResponse>(res);
  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }
  return data;
}

export async function bootstrapFirstAdmin(
  email: string,
  password: string,
  name?: string
): Promise<LoginResponse> {
  let res: Response;
  try {
    res = await fetch(`${getApiUrl()}/api/admin/bootstrap`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
  } catch {
    throw new Error(
      "Cannot reach server. Make sure the backend is running (e.g. on http://localhost:5000)."
    );
  }
  const data = await parseJson<LoginResponse>(res);
  if (!res.ok) {
    throw new Error(data.message || "Setup failed");
  }
  return data;
}

export interface MeResponse {
  success: boolean;
  message?: string;
  admin?: AuthAdmin;
  permissions?: PermissionsMap;
}

export async function getMe(): Promise<MeResponse> {
  let res: Response;
  try {
    res = await fetch(`${getApiUrl()}/api/admin/me`, {
      headers: getAuthHeaders(),
    });
  } catch {
    throw new Error("Cannot reach server.");
  }
  const data = await parseJson<MeResponse>(res);
  if (!res.ok) {
    throw new Error(data.message || "Session invalid");
  }
  return data;
}

export interface SetupStatusResponse {
  success: boolean;
  hasSuperAdmin: boolean;
  canRunFirstTimeSetup: boolean;
}

export async function getSetupStatus(): Promise<SetupStatusResponse> {
  let res: Response;
  try {
    res = await fetch(`${getApiUrl()}/api/admin/setup-status`);
  } catch {
    throw new Error(
      `Cannot reach API at ${getApiUrl()}. Check NEXT_PUBLIC_API_URL and that the backend is running.`
    );
  }
  let raw: SetupStatusResponse & { message?: string };
  try {
    raw = await parseJson<SetupStatusResponse & { message?: string }>(res);
  } catch {
    throw new Error("Setup status response was not valid JSON. Is NEXT_PUBLIC_API_URL correct?");
  }
  if (!res.ok) throw new Error(raw.message || "Failed to load setup status");
  const hasSuperAdmin = raw.hasSuperAdmin === true;
  return {
    success: raw.success !== false,
    hasSuperAdmin,
    canRunFirstTimeSetup: raw.canRunFirstTimeSetup !== undefined ? !!raw.canRunFirstTimeSetup : !hasSuperAdmin,
  };
}

export async function getRbacModules(): Promise<RbacModulesResponse> {
  const res = await fetch(`${getApiUrl()}/api/admin/rbac/modules`, {
    headers: getAuthHeaders(),
  });
  const data = await parseJson<RbacModulesResponse>(res);
  if (!res.ok) throw new Error(data.message || "Failed to load RBAC modules");
  return data;
}

export async function listRoles(): Promise<{ success: boolean; data: RoleDto[] }> {
  const res = await fetch(`${getApiUrl()}/api/admin/roles`, {
    headers: getAuthHeaders(),
  });
  const data = await parseJson<{ success: boolean; data: RoleDto[]; message?: string }>(res);
  if (!res.ok) throw new Error(data.message || "Failed to list roles");
  return data;
}

export async function createRole(body: {
  name: string;
  type?: string;
  isSuperAdmin?: boolean;
  permissions?: PermissionsMap;
}): Promise<{ success: boolean; data: RoleDto }> {
  const res = await fetch(`${getApiUrl()}/api/admin/roles`, {
    method: "POST",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await parseJson<{ success: boolean; data: RoleDto; message?: string }>(res);
  if (!res.ok) throw new Error(data.message || "Failed to create role");
  return data;
}

export async function updateRole(
  id: string,
  body: Partial<{ name: string; type: string; isSuperAdmin: boolean; permissions: PermissionsMap }>
): Promise<{ success: boolean; data: RoleDto }> {
  const res = await fetch(`${getApiUrl()}/api/admin/roles/${id}`, {
    method: "PATCH",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await parseJson<{ success: boolean; data: RoleDto; message?: string }>(res);
  if (!res.ok) throw new Error(data.message || "Failed to update role");
  return data;
}

export async function deleteRole(id: string): Promise<void> {
  const res = await fetch(`${getApiUrl()}/api/admin/roles/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  const data = await parseJson<{ success: boolean; message?: string }>(res);
  if (!res.ok) throw new Error(data.message || "Failed to delete role");
}

export async function listAdminUsers(): Promise<{ success: boolean; data: AdminUserDto[] }> {
  const res = await fetch(`${getApiUrl()}/api/admin/users`, {
    headers: getAuthHeaders(),
  });
  const data = await parseJson<{ success: boolean; data: AdminUserDto[]; message?: string }>(
    res
  );
  if (!res.ok) throw new Error(data.message || "Failed to list users");
  return data;
}

export async function createAdminUser(body: {
  name?: string;
  email: string;
  password: string;
  roleId: string;
}): Promise<{ success: boolean; data: AdminUserDto }> {
  const res = await fetch(`${getApiUrl()}/api/admin/users`, {
    method: "POST",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await parseJson<{ success: boolean; data: AdminUserDto; message?: string }>(res);
  if (!res.ok) throw new Error(data.message || "Failed to create user");
  return data;
}

export async function updateAdminUser(
  id: string,
  body: Partial<{ name: string; email: string; password: string; roleId: string }>
): Promise<{ success: boolean; data: AdminUserDto }> {
  const res = await fetch(`${getApiUrl()}/api/admin/users/${id}`, {
    method: "PATCH",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await parseJson<{ success: boolean; data: AdminUserDto; message?: string }>(res);
  if (!res.ok) throw new Error(data.message || "Failed to update user");
  return data;
}

export async function deleteAdminUser(id: string): Promise<void> {
  const res = await fetch(`${getApiUrl()}/api/admin/users/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  const data = await parseJson<{ success: boolean; message?: string }>(res);
  if (!res.ok) throw new Error(data.message || "Failed to delete user");
}

/** Map AuthAdmin from API to Redux AuthUser */
export function authAdminToUser(a: AuthAdmin): AuthUser {
  return {
    id: a.id,
    email: a.email,
    name: a.name,
    roleId: a.roleId,
    roleName: a.roleName,
    isSuperAdmin: a.isSuperAdmin,
  };
}

export async function listEnquiries(params?: {
  page?: number;
  limit?: number;
  status?: EnquiryStatus;
  assignedTo?: string;
}): Promise<{ success: boolean; data: EnquiryDto[]; pagination: { page: number; limit: number; total: number; pages: number } }> {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.status) query.set("status", params.status);
  if (params?.assignedTo) query.set("assignedTo", params.assignedTo);
  const qs = query.toString();
  const res = await fetch(`${getApiUrl()}/api/admin/enquiries${qs ? `?${qs}` : ""}`, {
    headers: getAuthHeaders(),
  });
  const data = await parseJson<{
    success: boolean;
    data: EnquiryDto[];
    pagination: { page: number; limit: number; total: number; pages: number };
    message?: string;
  }>(res);
  if (!res.ok) throw new Error(data.message || "Failed to list enquiries");
  return data;
}

export async function getEnquiry(id: string): Promise<{ success: boolean; data: EnquiryDto }> {
  const res = await fetch(`${getApiUrl()}/api/admin/enquiries/${id}`, {
    headers: getAuthHeaders(),
  });
  const data = await parseJson<{ success: boolean; data: EnquiryDto; message?: string }>(res);
  if (!res.ok) throw new Error(data.message || "Failed to load enquiry");
  return data;
}

export async function updateEnquiry(
  id: string,
  body: Partial<{ status: EnquiryStatus; notes: string; assignedTo: string | null }>
): Promise<{ success: boolean; data: EnquiryDto }> {
  const res = await fetch(`${getApiUrl()}/api/admin/enquiries/${id}`, {
    method: "PATCH",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await parseJson<{ success: boolean; data: EnquiryDto; message?: string }>(res);
  if (!res.ok) throw new Error(data.message || "Failed to update enquiry");
  return data;
}

export async function createEnquiryPublic(body: {
  companyName?: string;
  contactPersonName: string;
  email: string;
  phone?: string;
  preferredDestination?: string;
  travelDate?: string;
  travellersCount?: string;
  tripDuration?: string;
  budgetRange?: string;
  businessType?: string;
  message: string;
  packageId?: string;
  packageName?: string;
}): Promise<{ success: boolean; data: EnquiryDto }> {
  const res = await fetch(`${getApiUrl()}/api/enquiry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await parseJson<{ success: boolean; data: EnquiryDto; message?: string }>(res);
  if (!res.ok) throw new Error(data.message || "Failed to send enquiry");
  return data;
}
