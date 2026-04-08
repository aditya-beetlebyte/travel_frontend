"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "@/redux/store";
import { can } from "@/utils/permissions";
import {
  createAdminUser,
  deleteAdminUser,
  listAdminUsers,
  listRoles,
  updateAdminUser,
  type AdminUserDto,
  type RoleDto,
} from "@/services/authApi";
import { showConfirmToast } from "@/utils/confirmToast";
import styles from "../../admin.module.css";
import AdminBackButton from "../../AdminBackButton";

export default function AdminUsersPage() {
  const user = useSelector((s: RootState) => s.auth.user);
  const permissions = useSelector((s: RootState) => s.auth.permissions);
  const isSuper = !!user?.isSuperAdmin;

  const canRead = can(permissions, isSuper, "users", "read");
  const canCreate = can(permissions, isSuper, "users", "create");
  const canUpdate = can(permissions, isSuper, "users", "update");
  const canDel = can(permissions, isSuper, "users", "delete");

  const [users, setUsers] = useState<AdminUserDto[]>([]);
  const [roles, setRoles] = useState<RoleDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdminUserDto | null>(null);

  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formRoleId, setFormRoleId] = useState("");
  const nonSuperRoles = roles.filter((r) => !r.isSuperAdmin);

  const load = useCallback(async () => {
    if (!canRead) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const [uRes, rRes] = await Promise.all([listAdminUsers(), listRoles()]);
      setUsers(uRes.data ?? []);
      setRoles(rRes.data ?? []);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [canRead]);

  useEffect(() => {
    load();
  }, [load]);

  const resetForm = () => {
    setFormName("");
    setFormEmail("");
    setFormPassword("");
    setFormRoleId(nonSuperRoles[0]?.id ?? "");
    setEditing(null);
    setFormOpen(false);
  };

  const openCreate = () => {
    setEditing(null);
    setFormName("");
    setFormEmail("");
    setFormPassword("");
    setFormRoleId(nonSuperRoles[0]?.id ?? "");
    setFormOpen(true);
  };

  const openEdit = (u: AdminUserDto) => {
    if (u.isSuperAdmin) {
      toast.error("Super admin user cannot be edited");
      return;
    }
    const fallbackRoleId = nonSuperRoles[0]?.id ?? "";
    const safeRoleId = nonSuperRoles.some((r) => r.id === u.roleId) ? u.roleId : fallbackRoleId;
    setEditing(u);
    setFormName(u.name ?? "");
    setFormEmail(u.email);
    setFormPassword("");
    setFormRoleId(safeRoleId);
    setFormOpen(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        if (!canUpdate) return;
        const body: Parameters<typeof updateAdminUser>[1] = {
          name: formName.trim(),
          email: formEmail.trim().toLowerCase(),
          roleId: formRoleId,
        };
        if (formPassword.length >= 6) body.password = formPassword;
        await updateAdminUser(editing.id, body);
        toast.success("User updated");
      } else {
        if (!canCreate) return;
        if (!formEmail.trim() || !formPassword || formPassword.length < 6) {
          toast.error("Email and password (min 6 chars) required");
          setSaving(false);
          return;
        }
        await createAdminUser({
          name: formName.trim() || undefined,
          email: formEmail.trim().toLowerCase(),
          password: formPassword,
          roleId: formRoleId,
        });
        toast.success("User created");
      }
      resetForm();
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (u: AdminUserDto) => {
    if (!canDel) return;
    showConfirmToast(`Remove ${u.email}?`, async () => {
      try {
        await deleteAdminUser(u.id);
        toast.success("User removed");
        if (editing?.id === u.id) resetForm();
        load();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Delete failed");
      }
    });
  };

  if (!canRead) {
    return (
      <div>
        <AdminBackButton onClick={() => window.history.back()} />
        <p className={styles.pageSubtitle} style={{ marginTop: 16 }}>
          You don&apos;t have permission to manage users.
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
            <h1 className={styles.pageTitle}>Users</h1>
            <p className={styles.pageSubtitle}>Create staff accounts and assign roles.</p>
          </div>
        </div>
        {canCreate && !formOpen && (
          <button type="button" onClick={openCreate} className={styles.btnPrimary}>
            New user
          </button>
        )}
      </div>

      {formOpen && (
        <div className={styles.formCard} style={{ marginBottom: 24 }}>
          <h2 className={styles.formTitle}>{editing ? "Edit user" : "Create user"}</h2>
          <form onSubmit={submit}>
            <div className={styles.formGrid} style={{ maxWidth: 480 }}>
              <label className={styles.label}>Name</label>
              <input
                className={styles.input}
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
              <label className={styles.label}>Email</label>
              <input
                className={styles.input}
                type="email"
                required
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                disabled={Boolean(editing) && !canUpdate}
              />
              <label className={styles.label}>
                {editing ? "New password (optional, min 6 chars)" : "Password"}
              </label>
              <input
                className={styles.input}
                type="password"
                autoComplete="new-password"
                value={formPassword}
                onChange={(e) => setFormPassword(e.target.value)}
                required={!editing}
              />
              <label className={styles.label}>Role</label>
              <select
                className={styles.input}
                value={formRoleId}
                onChange={(e) => setFormRoleId(e.target.value)}
                required
                disabled={Boolean(editing) && (!canUpdate || editing.isSuperAdmin)}
              >
                {nonSuperRoles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formActions}>
              <button type="submit" disabled={saving} className={styles.btnPrimary}>
                {saving ? "Saving…" : "Save"}
              </button>
              <button type="button" onClick={resetForm} className={styles.btnSecondary}>
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
                <th>Email</th>
                <th>Role</th>
                <th style={{ width: 180 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name || "—"}</td>
                  <td>{u.email}</td>
                  <td>{u.roleName || u.roleId}</td>
                  <td>
                    {canUpdate && !u.isSuperAdmin && (
                      <button
                        type="button"
                        onClick={() => openEdit(u)}
                        className={styles.btnSecondary}
                        style={{ marginRight: 8 }}
                      >
                        Edit
                      </button>
                    )}
                    {canDel && u.id !== user?.id && !u.isSuperAdmin && (
                      <button type="button" onClick={() => handleDelete(u)} className={styles.btnDanger}>
                        Delete
                      </button>
                    )}
                    {u.isSuperAdmin && <span>Locked</span>}
                    {!u.isSuperAdmin && !canUpdate && !canDel && "—"}
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
