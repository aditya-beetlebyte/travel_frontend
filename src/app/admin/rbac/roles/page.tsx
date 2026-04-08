"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "@/redux/store";
import type { ActionKey, PermissionsMap } from "@/utils/permissions";
import {
  emptyMatrixFromModules,
  mergePermissionsWithRegistry,
} from "@/utils/permissions";
import {
  createRole,
  deleteRole,
  getRbacModules,
  listRoles,
  updateRole,
  type RbacModuleRow,
  type RoleDto,
} from "@/services/authApi";
import { showConfirmToast } from "@/utils/confirmToast";
import styles from "../../admin.module.css";
import AdminBackButton from "../../AdminBackButton";

export default function AdminRolesPage() {
  const user = useSelector((s: RootState) => s.auth.user);
  const isSuper = !!user?.isSuperAdmin;

  const [modules, setModules] = useState<RbacModuleRow[]>([]);
  const [actions, setActions] = useState<ActionKey[]>([
    "read",
    "create",
    "update",
    "delete",
  ]);
  const [roles, setRoles] = useState<RoleDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formMode, setFormMode] = useState<"idle" | "create" | "edit">("idle");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [formPerms, setFormPerms] = useState<PermissionsMap>({});

  const moduleKeys = modules.map((m) => m.key);
  const hasSuperAdminRole = roles.some((r) => r.isSuperAdmin);

  const load = useCallback(async () => {
    if (!isSuper) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const [reg, roleList] = await Promise.all([getRbacModules(), listRoles()]);
      const mods = reg.modules ?? [];
      const acts = (reg.actions ?? ["read", "create", "update", "delete"]) as ActionKey[];
      setModules(mods);
      setActions(acts);
      setRoles(roleList.data ?? []);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load roles");
    } finally {
      setLoading(false);
    }
  }, [isSuper]);

  useEffect(() => {
    load();
  }, [load]);

  const resetCreateForm = () => {
    setName("");
    setType("");
    setFormPerms(emptyMatrixFromModules(moduleKeys));
    setEditingId(null);
    setFormMode("create");
  };

  const openEdit = (r: RoleDto) => {
    setFormMode("edit");
    setEditingId(r.id);
    setName(r.name);
    setType(r.type ?? (r.isSuperAdmin ? "Super admin" : "Admin"));
    setFormPerms(
      mergePermissionsWithRegistry(
        moduleKeys,
        r.isSuperAdmin ? undefined : r.permissions
      )
    );
  };

  const closeForm = () => {
    setFormMode("idle");
    setEditingId(null);
    setName("");
    setType("");
    setFormPerms({});
  };

  const togglePerm = (modKey: string, act: ActionKey) => {
    setFormPerms((prev) => ({
      ...prev,
      [modKey]: {
        ...prev[modKey],
        [act]: !prev[modKey]?.[act],
      },
    }));
  };

  const setRowAll = (modKey: string, value: boolean) => {
    const row = {} as Record<ActionKey, boolean>;
    for (const a of actions) {
      row[a] = value;
    }
    setFormPerms((prev) => ({
      ...prev,
      [modKey]: row,
    }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    const trimmedType = type.trim();
    if (!trimmed) {
      toast.error("Role name required");
      return;
    }
    setSaving(true);
    try {
      if (formMode === "create") {
        await createRole({
          name: trimmed,
          type: trimmedType || undefined,
          permissions: formPerms,
        });
        toast.success("Role created");
      } else if (formMode === "edit" && editingId) {
        await updateRole(editingId, {
          name: trimmed,
          type: trimmedType || undefined,
          permissions: formPerms,
        });
        toast.success("Role updated");
      }
      closeForm();
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (r: RoleDto) => {
    showConfirmToast(`Delete role "${r.name}"?`, async () => {
      try {
        await deleteRole(r.id);
        toast.success("Role deleted");
        if (editingId === r.id) closeForm();
        load();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Delete failed");
      }
    });
  };

  if (!isSuper) {
    return (
      <div>
        <AdminBackButton onClick={() => window.history.back()} />
        <p className={styles.pageSubtitle} style={{ marginTop: 16 }}>
          Only super administrators can manage roles.
        </p>
        <Link href="/admin" className={styles.btnPrimary} style={{ display: "inline-block", marginTop: 16 }}>
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <AdminBackButton onClick={() => window.history.back()} />
          <div>
            <h1 className={styles.pageTitle}>Roles & permissions</h1>
            <p className={styles.pageSubtitle}>
              Create roles with module access. New modules added on the server appear here automatically.
            </p>
          </div>
        </div>
        {formMode === "idle" && (
          <button
            type="button"
            onClick={resetCreateForm}
            className={styles.btnPrimary}
            disabled={loading || modules.length === 0}
          >
            New role
          </button>
        )}
      </div>

      {formMode !== "idle" && moduleKeys.length > 0 && (
        <div className={styles.formCard} style={{ marginBottom: 24 }}>
          <h2 className={styles.formTitle}>{formMode === "create" ? "Create role" : "Edit role"}</h2>
          <form onSubmit={submit}>
            <div className={styles.formGrid} style={{ maxWidth: 480 }}>
              <label className={styles.label}>Name</label>
              <input
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label className={styles.label}>Type</label>
              <input
                className={styles.input}
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="e.g. Sales manager"
              />
            </div>

            {true && (
              <div style={{ overflowX: "auto", marginTop: 16 }}>
                <table className={styles.table} style={{ minWidth: 520 }}>
                  <thead>
                    <tr>
                      <th>Module</th>
                      {actions.map((a) => (
                        <th key={a} style={{ textTransform: "capitalize" }}>
                          {a}
                        </th>
                      ))}
                      <th>All</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modules.map((m) => (
                      <tr key={m.key}>
                        <td>
                          <strong>{m.label}</strong>
                          <div style={{ fontSize: 11, color: "#94a3b8" }}>{m.key}</div>
                        </td>
                        {actions.map((a) => (
                          <td key={a}>
                            <input
                              type="checkbox"
                              style={{ width: 18, height: 18 }}
                              checked={!!formPerms[m.key]?.[a]}
                              onChange={() => togglePerm(m.key, a)}
                            />
                          </td>
                        ))}
                        <td>
                          <input
                            type="checkbox"
                            style={{ width: 18, height: 18 }}
                            checked={actions.every((a) => formPerms[m.key]?.[a])}
                            onChange={(e) => setRowAll(m.key, e.target.checked)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className={styles.formActions} style={{ marginTop: 16 }}>
              <button type="submit" disabled={saving} className={styles.btnPrimary}>
                {saving ? "Saving…" : "Save"}
              </button>
              <button type="button" onClick={closeForm} className={styles.btnSecondary}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.tableWrap}>
        {loading ? (
          <div className={styles.loadingState}>Loading…</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th style={{ width: 200 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((r) => (
                <tr key={r.id}>
                  <td>{r.name}</td>
                  <td>{r.type || (r.isSuperAdmin ? "Super admin" : "")}</td>
                  <td>
                    {!r.isSuperAdmin && (
                      <>
                        <button
                          type="button"
                          onClick={() => openEdit(r)}
                          className={styles.btnSecondary}
                          style={{ marginRight: 8 }}
                        >
                          Edit
                        </button>
                        <button type="button" onClick={() => handleDelete(r)} className={styles.btnDanger}>
                          Delete
                        </button>
                      </>
                    )}
                    {r.isSuperAdmin && <span>Locked</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
