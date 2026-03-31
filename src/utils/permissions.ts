export type ActionKey = "read" | "create" | "update" | "delete";

/** Dynamic module keys from the backend registry (blogs, offers, users, …). */
export type PermissionsMap = Record<string, Record<ActionKey, boolean>>;

const ACTION_KEYS: ActionKey[] = ["read", "create", "update", "delete"];

/** Build an empty matrix from registry module keys (all false). */
export function emptyMatrixFromModules(moduleKeys: string[]): PermissionsMap {
  const out: PermissionsMap = {};
  for (const key of moduleKeys) {
    out[key] = {
      read: false,
      create: false,
      update: false,
      delete: false,
    };
  }
  return out;
}

/** Merge server permissions into registry shape (fills missing modules with false). */
export function mergePermissionsWithRegistry(
  moduleKeys: string[],
  fromServer: PermissionsMap | null | undefined
): PermissionsMap {
  const base = emptyMatrixFromModules(moduleKeys);
  if (!fromServer || typeof fromServer !== "object") return base;
  for (const key of moduleKeys) {
    const mod = fromServer[key];
    if (!mod || typeof mod !== "object") continue;
    for (const act of ACTION_KEYS) {
      if (typeof mod[act] === "boolean") {
        base[key][act] = mod[act];
      }
    }
  }
  return base;
}

/** Client-side check using Redux-stored permissions (matches backend `can`). */
export function can(
  permissions: PermissionsMap | null | undefined,
  isSuperAdmin: boolean | undefined | null,
  module: string,
  action: ActionKey
): boolean {
  if (isSuperAdmin) return true;
  if (!permissions) return false;
  return !!permissions[module]?.[action];
}
