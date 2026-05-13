"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { can } from "@/utils/permissions";
import {
  EnquiryDto,
  EnquiryStatus,
  listEnquiries,
  getEnquiry,
  updateEnquiry,
  listAdminUsers,
  type AdminUserDto,
} from "@/services/authApi";
import styles from "../admin.module.css";
import AdminBackButton from "../AdminBackButton";
import { toast } from "react-toastify";

const STATUS_OPTIONS: { value: EnquiryStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "proposal_sent", label: "Proposal sent" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
];

export default function AdminEnquiriesPage() {
  const permissions = useSelector((s: RootState) => s.auth.permissions);
  const user = useSelector((s: RootState) => s.auth.user);
  const isSuper = !!user?.isSuperAdmin;
  const canRead = can(permissions, isSuper, "enquiry", "read");
  const canUpdate = can(permissions, isSuper, "enquiry", "update");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [enquiries, setEnquiries] = useState<EnquiryDto[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<EnquiryStatus | "all">("all");
  const [selected, setSelected] = useState<EnquiryDto | null>(null);
  const [editStatus, setEditStatus] = useState<EnquiryStatus | "">("");
  const [editNotes, setEditNotes] = useState("");
  const [admins, setAdmins] = useState<AdminUserDto[]>([]);
  const [editAssigneeId, setEditAssigneeId] = useState<string>("__keep__");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [isEditing, setIsEditing] = useState(false);

  const load = useCallback(async () => {
    if (!canRead) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await listEnquiries({
        page,
        status: statusFilter === "all" ? undefined : statusFilter,
      });
      setEnquiries(res.data ?? []);
      setPages(res.pagination?.pages ?? 1);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  }, [canRead, page, statusFilter]);

  useEffect(() => {
    load();
  }, [load]);

  const openDetail = async (e: EnquiryDto) => {
    setSelected(e);
    setEditStatus(e.status);
    setEditNotes(e.notes ?? "");
    setEditAssigneeId(e.assignedToId || "__none__");
    setIsEditing(false);
    try {
      const fresh = await getEnquiry(e.id);
      const full = fresh.data;
      setSelected(full);
      setEditStatus(full.status);
      setEditNotes(full.notes ?? "");
      setEditAssigneeId(full.assignedToId || "__none__");
      setEnquiries((prev) => prev.map((x) => (x.id === full.id ? full : x)));
    } catch {
      // Keep fallback data already opened in modal if full fetch fails.
    }
  };

  const closeDetail = () => {
    setSelected(null);
    setEditStatus("");
    setEditNotes("");
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!selected || !canUpdate || !isEditing) return;
    const confirmed = window.confirm("Save changes to this enquiry?");
    if (!confirmed) return;
    setSaving(true);
    try {
      const body: Parameters<typeof updateEnquiry>[1] = {};
      if (editStatus && editStatus !== selected.status) {
        body.status = editStatus;
      }
      if (editNotes !== (selected.notes ?? "")) {
        body.notes = editNotes;
      }
      if (isSuper) {
        if (editAssigneeId === "__none__") {
          body.assignedTo = null;
        } else if (editAssigneeId !== "__keep__" && editAssigneeId !== (selected.assignedToId || "")) {
          body.assignedTo = editAssigneeId;
        }
      }
      if (Object.keys(body).length === 0) {
        toast.info("No changes to save");
        setSaving(false);
        return;
      }
      const res = await updateEnquiry(selected.id, body);
      const next = res.data;
      setEnquiries((prev) => prev.map((x) => (x.id === next.id ? next : x)));
      toast.success("Enquiry updated");
      // Close the detail drawer after successful save
      closeDetail();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update enquiry");
    } finally {
      setSaving(false);
    }
  };

  const statusLabel = useMemo(
    () =>
      Object.fromEntries(STATUS_OPTIONS.map((s) => [s.value, s.label])) as Record<
        EnquiryStatus,
        string
      >,
    []
  );

  const initialsFromName = (name: string | undefined | null) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  };

  const handleMarkContacted = async (e: EnquiryDto) => {
    if (!canUpdate || e.status === "contacted") {
      openDetail(e);
      return;
    }
    try {
      const res = await updateEnquiry(e.id, { status: "contacted" });
      const next = res.data;
      setEnquiries((prev) => prev.map((x) => (x.id === next.id ? next : x)));
      toast.success("Marked as contacted");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update status");
    }
  };

  const historyLabel = (field: string) => {
    if (field === "assignedTo") return "Assignee";
    if (field === "proposal_sent") return "Proposal sent";
    return field.charAt(0).toUpperCase() + field.slice(1);
  };

  const latestHistoryText = (e: EnquiryDto) => {
    const h = e.history?.[0];
    if (!h) return "No updates yet";
    const by = h.changedByName || h.changedByEmail || "System";
    const when = h.changedAt ? new Date(h.changedAt).toLocaleString() : "—";
    return `${by} • ${historyLabel(h.field)} • ${when}`;
  };

  useEffect(() => {
    if (!isSuper) return;
    // load admins once for assignment dropdown
    listAdminUsers()
      .then((res) => {
        setAdmins(res.data ?? []);
      })
      .catch((err) => {
        // non-fatal; just log
        console.error(err);
      });
  }, [isSuper]);

  if (!canRead) {
    return (
      <div>
        <AdminBackButton onClick={() => window.history.back()} />
        <p className={styles.pageSubtitle} style={{ marginTop: 16 }}>
          You don&apos;t have permission to view enquiries.
        </p>
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
            <h1 className={styles.pageTitle}>Enquiries</h1>
            <p className={styles.pageSubtitle}>
              View and manage customer enquiries coming from the contact page.
            </p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <select
            className={styles.input}
            value={statusFilter}
            onChange={(e) => {
              setPage(1);
              setStatusFilter(e.target.value as EnquiryStatus | "all");
            }}
          >
            <option value="all">All statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              className={styles.btnSecondary}
              style={{
                background: viewMode === "table" ? "#0f172a" : undefined,
                color: viewMode === "table" ? "#f9fafb" : undefined,
              }}
              onClick={() => setViewMode("table")}
            >
              Table
            </button>
            <button
              type="button"
              className={styles.btnSecondary}
              style={{
                background: viewMode === "cards" ? "#0f172a" : undefined,
                color: viewMode === "cards" ? "#f9fafb" : undefined,
              }}
              onClick={() => setViewMode("cards")}
            >
              Cards
            </button>
          </div>
          <Link href="/admin/enquiries/board" className={styles.btnSecondary}>
            Board view
          </Link>
        </div>
      </div>
      {loading ? (
        <div className={styles.loadingState}>Loading…</div>
      ) : enquiries.length === 0 ? (
        <div className={styles.emptyState}>No enquiries found.</div>
      ) : viewMode === "table" ? (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Created</th>
                <th>Company</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Destination</th>
                <th>Package</th>
                <th>Travel dates</th>
                <th>Travellers</th>
                <th>Budget</th>
                <th>Status</th>
                <th>Assigned to</th>
                {isSuper && <th>Last change</th>}
              </tr>
            </thead>
            <tbody>
              {enquiries.map((e) => (
                <tr
                  key={e.id}
                  onClick={() => openDetail(e)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{e.createdAt ? new Date(e.createdAt).toLocaleString() : "—"}</td>
                  <td>{e.companyName || "—"}</td>
                  <td>{e.contactPersonName}</td>
                  <td>{e.email}</td>
                  <td>{e.preferredDestination || "—"}</td>
                  <td>{e.packageName || "—"}</td>
                  <td>{e.travelDate || "—"}</td>
                  <td>{e.travellersCount || "—"}</td>
                  <td>{e.budgetRange || "—"}</td>
                  <td>{statusLabel[e.status]}</td>
                  <td>{e.assignedToName || "Unassigned"}</td>
                  {isSuper && <td>{latestHistoryText(e)}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={styles.cardGrid}>
          {enquiries.map((e) => {
            const statusClass =
              e.status === "new"
                ? `${styles.statusBadge} ${styles.statusNew}`
                : e.status === "contacted"
                ? `${styles.statusBadge} ${styles.statusContacted}`
                : e.status === "proposal_sent"
                ? `${styles.statusBadge} ${styles.statusProposal}`
                : e.status === "won"
                ? `${styles.statusBadge} ${styles.statusWon}`
                : `${styles.statusBadge} ${styles.statusLost}`;
            const assigneeLabel = e.assignedToName || "Unassigned";
            return (
              <div key={e.id} className={styles.enquiryCard}>
                <div className={styles.enquiryCardHeader}>
                  <span className={statusClass}>{statusLabel[e.status]}</span>
                  <div className={styles.assigneeAvatar}>
                    {initialsFromName(assigneeLabel)}
                  </div>
                </div>
                <div className={styles.enquiryCardBody}>
                  <div className={styles.enquiryPrimaryInfo}>
                    <div className={styles.enquiryPrimaryLine}>
                      <span className={styles.enquiryPrimaryLabel}>Company:</span>
                      {e.companyName || "—"}
                    </div>
                    <div className={styles.enquiryPrimaryLine}>
                      <span className={styles.enquiryPrimaryLabel}>Contact:</span>
                      {e.contactPersonName || "—"}
                    </div>
                    <div className={styles.enquiryPrimaryLine}>
                      <span className={styles.enquiryPrimaryLabel}>Email:</span>
                      {e.email || "—"}
                    </div>
                  </div>
                  <div>
                    {e.preferredDestination || "—"} · {e.travelDate || "—"}
                  </div>
                  <div>Package: {e.packageName || "—"}</div>
                  <div>
                    Travellers: {e.travellersCount || "—"} · Budget:{" "}
                    {e.budgetRange || "—"}
                  </div>
                  <div style={{ marginTop: 2 }}>
                    {(e.message || "").slice(0, 80)}
                    {(e.message || "").length > 80 ? "…" : ""}
                  </div>
                  {isSuper && (
                    <div style={{ marginTop: 4, fontSize: "0.74rem", color: "#0f766e" }}>
                      {latestHistoryText(e)}
                    </div>
                  )}
                </div>
                <div className={styles.enquiryCardFooter}>
                  <button
                    type="button"
                    className={styles.btnGhost}
                    onClick={() => openDetail(e)}
                  >
                    View
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {pages > 1 && (
        <div className={styles.pagination}>
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
          >
            Previous
          </button>
          <span>
            Page {page} of {pages}
          </span>
          <button
            type="button"
            disabled={page >= pages}
            onClick={() => setPage((p) => Math.min(p + 1, pages))}
          >
            Next
          </button>
        </div>
      )}

      {selected && (
        <div className={styles.drawerOverlay}>
          <div className={styles.drawer}>
            <div className={styles.drawerHeader}>
              <h2 className={styles.formTitle}>
                Enquiry – {selected.companyName || selected.contactPersonName}
              </h2>
              <button
                type="button"
                onClick={closeDetail}
                className={styles.btnSecondary}
                style={{ paddingInline: 12 }}
              >
                Close
              </button>
            </div>
            <div className={styles.modalGrid}>
              <div className={styles.modalField}>
                <span className={styles.modalLabel}>Company / Agency Name</span>
                <div className={styles.modalValue}>{selected.companyName || "—"}</div>
              </div>
              <div className={styles.modalField}>
                <span className={styles.modalLabel}>Contact Person</span>
                <div className={styles.modalValue}>{selected.contactPersonName}</div>
              </div>
              <div className={styles.modalField}>
                <span className={styles.modalLabel}>Email</span>
                <div className={styles.modalValue}>{selected.email}</div>
              </div>
              <div className={styles.modalField}>
                <span className={styles.modalLabel}>Phone</span>
                <div className={styles.modalValue}>{selected.phone || "—"}</div>
              </div>
              <div className={styles.modalField}>
                <span className={styles.modalLabel}>Preferred Destination</span>
                <div className={styles.modalValue}>{selected.preferredDestination || "—"}</div>
              </div>
              <div className={styles.modalField}>
                <span className={styles.modalLabel}>Package</span>
                <div className={styles.modalValue}>{selected.packageName || "—"}</div>
              </div>
              <div className={styles.modalField}>
                <span className={styles.modalLabel}>Travel Date / Month</span>
                <div className={styles.modalValue}>{selected.travelDate || "—"}</div>
              </div>
              <div className={styles.modalField}>
                <span className={styles.modalLabel}>Travellers / Group Size</span>
                <div className={styles.modalValue}>{selected.travellersCount || "—"}</div>
              </div>
              <div className={styles.modalField}>
                <span className={styles.modalLabel}>Trip Duration</span>
                <div className={styles.modalValue}>{selected.tripDuration || "—"}</div>
              </div>
              <div className={styles.modalField}>
                <span className={styles.modalLabel}>Budget Range</span>
                <div className={styles.modalValue}>{selected.budgetRange || "—"}</div>
              </div>
              <div className={styles.modalField}>
                <span className={styles.modalLabel}>Business Type</span>
                <div className={styles.modalValue}>{selected.businessType || "—"}</div>
              </div>
              <div className={`${styles.modalField} ${styles.modalFull}`}>
                <span className={styles.modalLabel}>Message</span>
                <div className={styles.modalValue} style={{ whiteSpace: "pre-wrap" }}>
                  {selected.message}
                </div>
              </div>
              <div className={styles.modalField}>
                <span className={styles.modalLabel}>Status</span>
                {isEditing ? (
                  <select
                    className={styles.input}
                    value={editStatus || selected.status}
                    onChange={(e) => setEditStatus(e.target.value as EnquiryStatus)}
                    disabled={!canUpdate}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className={styles.modalValue}>{statusLabel[selected.status]}</div>
                )}
              </div>
              {isSuper && (
                <div className={styles.modalField}>
                  <span className={styles.modalLabel}>Assigned to</span>
                  {isEditing ? (
                    <select
                      className={styles.input}
                      value={editAssigneeId}
                      onChange={(e) => setEditAssigneeId(e.target.value)}
                    >
                      <option value="__none__">Unassigned</option>
                      {admins.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.name || a.email}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className={styles.modalValue}>{selected.assignedToName || "Unassigned"}</div>
                  )}
                </div>
              )}
              <div className={`${styles.modalField} ${styles.modalFull}`}>
                <span className={styles.modalLabel}>Notes</span>
                {isEditing ? (
                  <textarea
                    className={styles.input}
                    rows={4}
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="Internal notes about this enquiry (not visible to customer)"
                    disabled={!canUpdate}
                  />
                ) : (
                  <div className={styles.modalValue} style={{ whiteSpace: "pre-wrap" }}>
                    {selected.notes || "—"}
                  </div>
                )}
              </div>
              {isSuper && (
                <div className={`${styles.modalField} ${styles.modalFull}`}>
                  <span className={styles.modalLabel}>Timeline</span>
                  {selected.history && selected.history.length > 0 ? (
                    <div className={styles.timelineList}>
                      {selected.history.map((h, idx) => (
                        <div key={`${h.changedAt || "x"}-${idx}`} className={styles.timelineItem}>
                          <div className={styles.timelineRow}>
                            <div className={styles.timelineText}>
                              <strong>{historyLabel(h.field)}</strong>:{" "}
                              <strong>{h.from || "—"}</strong> → <strong>{h.to || "—"}</strong>
                            </div>
                            <div className={styles.timelineMeta}>
                              {(h.changedByName || h.changedByEmail || "System") +
                                " · " +
                                (h.changedAt ? new Date(h.changedAt).toLocaleString() : "—")}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.modalValue}>No history yet.</div>
                  )}
                </div>
              )}
            </div>

            {canUpdate && (
              <div className={styles.formActions} style={{ marginTop: 16 }}>
                {!isEditing ? (
                  <button
                    type="button"
                    className={styles.btnPrimary}
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className={styles.btnPrimary}
                      onClick={handleSave}
                      disabled={saving}
                    >
                      {saving ? "Saving…" : "Save changes"}
                    </button>
                    <button
                      type="button"
                      className={styles.btnSecondary}
                      onClick={() => {
                        setEditStatus(selected.status);
                        setEditNotes(selected.notes ?? "");
                        setEditAssigneeId(selected.assignedToId || "__none__");
                        setIsEditing(false);
                      }}
                      disabled={saving}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

