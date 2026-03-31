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
import styles from "../../admin.module.css";
import AdminBackButton from "../../AdminBackButton";
import { toast } from "react-toastify";

const STATUS_OPTIONS: { value: EnquiryStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "proposal_sent", label: "Proposal sent" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
];

export default function EnquiriesBoardPage() {
  const permissions = useSelector((s: RootState) => s.auth.permissions);
  const user = useSelector((s: RootState) => s.auth.user);
  const isSuper = !!user?.isSuperAdmin;
  const canRead = can(permissions, isSuper, "enquiry", "read");
  const canUpdate = can(permissions, isSuper, "enquiry", "update");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [enquiries, setEnquiries] = useState<EnquiryDto[]>([]);
  const [admins, setAdmins] = useState<AdminUserDto[]>([]);
  const [selected, setSelected] = useState<EnquiryDto | null>(null);
  const [editStatus, setEditStatus] = useState<EnquiryStatus | "">("");
  const [editNotes, setEditNotes] = useState("");
  const [editAssigneeId, setEditAssigneeId] = useState<string>("__keep__");
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const load = useCallback(async () => {
    if (!canRead) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await listEnquiries({ page: 1, limit: 200 });
      setEnquiries(res.data ?? []);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  }, [canRead]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!isSuper) return;
    listAdminUsers()
      .then((res) => setAdmins(res.data ?? []))
      .catch((err) => console.error(err));
  }, [isSuper]);

  const statusLabel = useMemo(
    () =>
      Object.fromEntries(STATUS_OPTIONS.map((s) => [s.value, s.label])) as Record<
        EnquiryStatus,
        string
      >,
    []
  );

  const grouped = useMemo(() => {
    const buckets: Record<EnquiryStatus, EnquiryDto[]> = {
      new: [],
      contacted: [],
      proposal_sent: [],
      won: [],
      lost: [],
    };
    for (const e of enquiries) {
      buckets[e.status]?.push(e);
    }
    return buckets;
  }, [enquiries]);

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
        } else if (
          editAssigneeId !== "__keep__" &&
          editAssigneeId !== (selected.assignedToId || "")
        ) {
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
      closeDetail();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update enquiry");
    } finally {
      setSaving(false);
    }
  };

  const handleDropOnStatus = async (status: EnquiryStatus) => {
    if (!draggingId || !canUpdate) return;
    const enquiry = enquiries.find((e) => e.id === draggingId);
    if (!enquiry || enquiry.status === status) {
      setDraggingId(null);
      return;
    }
    setDraggingId(null);
    try {
      setEnquiries((prev) =>
        prev.map((e) => (e.id === enquiry.id ? { ...e, status } : e))
      );
      await updateEnquiry(enquiry.id, { status });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to move enquiry");
      load();
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
            <h1 className={styles.pageTitle}>Enquiries board</h1>
            <p className={styles.pageSubtitle}>
              Drag enquiries between columns to update their status.
            </p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/admin/enquiries" className={styles.btnSecondary}>
            List view
          </Link>
        </div>
      </div>

      {loading ? (
        <div className={styles.loadingState}>Loading…</div>
      ) : enquiries.length === 0 ? (
        <div className={styles.emptyState}>No enquiries found.</div>
      ) : (
        <div
          style={{
            display: "flex",
            gap: 16,
            alignItems: "flex-start",
            overflowX: "auto",
          }}
        >
          {STATUS_OPTIONS.map((col) => (
            <div
              key={col.value}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDropOnStatus(col.value)}
              style={{
                minWidth: 260,
                maxWidth: 320,
                flex: 1,
              }}
            >
              <div
                style={{
                  marginBottom: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    color: "#0f172a",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {col.label}
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#94a3b8",
                  }}
                >
                  {grouped[col.value].length}
                </span>
              </div>
              <div
                style={{
                  background: "#e2e8f0",
                  borderRadius: 12,
                  padding: 8,
                  minHeight: 80,
                }}
              >
                {grouped[col.value].map((e) => (
                  <div
                    key={e.id}
                    draggable={canUpdate}
                    onDragStart={() => setDraggingId(e.id)}
                    onClick={() => openDetail(e)}
                    style={{
                      background: "#ffffff",
                      borderRadius: 10,
                      padding: 10,
                      marginBottom: 8,
                      boxShadow: "0 1px 3px rgba(15, 23, 42, 0.12)",
                      cursor: "pointer",
                      border:
                        selected?.id === e.id ? "1px solid #0d9488" : "1px solid transparent",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 4,
                      }}
                    >
                      <strong style={{ fontSize: "0.9rem" }}>
                        {e.companyName || e.contactPersonName}
                      </strong>
                      <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                        {e.assignedToName || "Unassigned"}
                      </span>
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                      <div className={styles.enquiryPrimaryInfo} style={{ marginBottom: 8 }}>
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
                      <div>{e.preferredDestination || "—"}</div>
                      <div>{e.travelDate || "—"}</div>
                      <div>
                        Travellers: {e.travellersCount || "—"} · Budget:{" "}
                        {e.budgetRange || "—"}
                      </div>
                      {isSuper && (
                        <div style={{ marginTop: 4, fontSize: "0.72rem", color: "#0f766e" }}>
                          {latestHistoryText(e)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
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

