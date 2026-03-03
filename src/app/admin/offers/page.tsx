"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { Offer } from "@/services/offerApi";
import {
  fetchOffers,
  fetchOffer,
  createOffer,
  updateOffer,
  deleteOffer,
} from "@/services/offerApi";
import { uploadFile } from "@/services/uploadApi";
import { showConfirmToast } from "@/utils/confirmToast";
import styles from "../admin.module.css";
import AdminBackButton from "../AdminBackButton";

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    discount: "",
    originalPrice: "" as string | number,
    offerPrice: "" as string | number,
    validUntil: "",
    active: true,
    order: 0,
  });

  const parseNumber = (value: string | number): number | null => {
    if (typeof value === "number") {
      return isNaN(value) ? null : value;
    }
    const cleaned = value.trim();
    if (!cleaned) return null;
    const num = parseFloat(cleaned);
    return isNaN(num) ? null : num;
  };

  const recalcDiscount = (
    originalVal: string | number,
    offerVal: string | number
  ): string => {
    const original = parseNumber(originalVal);
    const offer = parseNumber(offerVal);
    if (!original || !offer || original <= 0) return "";
    const pct = ((original - offer) / original) * 100;
    if (pct < 0) return "";
    return pct.toFixed(2);
  };

  const handleBackClick = () => {
    if (formOpen) {
      setFormOpen(false);
      setEditingId(null);
    } else {
      window.history.back();
    }
  };

  const loadOffers = async () => {
    setLoading(true);
    try {
      const res = await fetchOffers({ limit: 100 });
      setOffers(res.data);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load offers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOffers();
  }, []);

  useEffect(() => {
    const onRefresh = () => loadOffers();
    window.addEventListener("admin-refresh-offers", onRefresh);
    return () => window.removeEventListener("admin-refresh-offers", onRefresh);
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm({
      title: "",
      description: "",
      image: "",
      discount: "",
      originalPrice: "",
      offerPrice: "",
      validUntil: "",
      active: true,
      order: 0,
    });
    setFormOpen(true);
  };

  const openEdit = async (id: string) => {
    try {
      const offer = await fetchOffer(id);
      setEditingId(id);
      setForm({
        title: offer.title,
        description: offer.description || "",
        image: offer.image || "",
        discount: offer.discount || "",
        originalPrice: offer.originalPrice ?? "",
        offerPrice: offer.offerPrice ?? "",
        validUntil: offer.validUntil
          ? new Date(offer.validUntil).toISOString().slice(0, 10)
          : "",
        active: offer.active ?? true,
        order: offer.order ?? 0,
      });
      setFormOpen(true);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load offer");
    }
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const message = editingId
      ? "Do you want to update this offer?"
      : "Do you want to create this offer?";

    showConfirmToast(message, async () => {
      setSaving(true);
      try {
        const payload = {
          title: form.title,
          description: form.description || undefined,
          image: form.image || undefined,
          discount: form.discount || undefined,
          originalPrice:
            form.originalPrice === "" ? null : Number(form.originalPrice),
          offerPrice: form.offerPrice === "" ? null : Number(form.offerPrice),
          validUntil: form.validUntil ? new Date(form.validUntil).toISOString() : null,
          active: form.active,
          order: form.order,
        };
        if (editingId) {
          await updateOffer(editingId, payload);
          toast.success("Offer updated");
        } else {
          await createOffer(payload);
          toast.success("Offer created");
        }
        closeForm();
        loadOffers();
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Failed to save");
      } finally {
        setSaving(false);
      }
    });
  };

  const handleDelete = async (id: string) => {
    showConfirmToast("Delete this offer?", async () => {
      setDeletingId(id);
      try {
        await deleteOffer(id);
        toast.success("Offer deleted");
        loadOffers();
        if (editingId === id) closeForm();
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Failed to delete");
      } finally {
        setDeletingId(null);
      }
    });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <AdminBackButton onClick={handleBackClick} />
          <div>
            <h1 className={styles.pageTitle}>Offers</h1>
            <p className={styles.pageSubtitle}>Manage deals and special travel offers</p>
          </div>
        </div>
        <button type="button" onClick={openCreate} className={styles.btnPrimary}>
          Add Offer
        </button>
      </div>

      {formOpen && (
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>{editingId ? "Edit Offer" : "New Offer"}</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <label className={styles.label}>Title *</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className={styles.input}
              />
              <label className={styles.label}>Description</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className={styles.input}
                style={{ resize: "vertical", minHeight: 80 }}
              />
              <label className={styles.label}>Image URL</label>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <input
                  type="text"
                  placeholder="Paste URL or upload image"
                  value={form.image}
                  onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                  className={styles.input}
                  style={{ flex: "1 1 200px", minWidth: 0 }}
                />
                <label
                  style={{
                    padding: "10px 16px",
                    background: imageUploading ? "#cbd5e1" : "#0d9488",
                    color: "#fff",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: imageUploading ? "not-allowed" : "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    disabled={imageUploading}
                    style={{ display: "none" }}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setImageUploading(true);
                      try {
                        const { url } = await uploadFile(file);
                        setForm((f) => ({ ...f, image: url }));
                        toast.success("Image uploaded");
                      } catch (err) {
                        toast.error(err instanceof Error ? err.message : "Upload failed");
                      } finally {
                        setImageUploading(false);
                        e.target.value = "";
                      }
                    }}
                  />
                  {imageUploading ? "Uploading…" : "Upload"}
                </label>
              </div>
              {form.image && (
                <img
                  src={form.image}
                  alt="Offer preview"
                  style={{ marginTop: 4, maxWidth: 120, maxHeight: 80, objectFit: "cover", borderRadius: 8 }}
                />
              )}
              <label className={styles.label}>Discount (%)</label>
              <input
                type="number"
                step="0.01"
                value={form.discount}
                readOnly
                className={styles.input}
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <label className={styles.label}>Original Price</label>
                <label className={styles.label}>Offer Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.originalPrice}
                  onChange={(e) =>
                    setForm((f) => {
                      const rawOriginal = e.target.value;
                      const next = {
                        ...f,
                        originalPrice: rawOriginal === "" ? "" : rawOriginal,
                      };
                      next.discount = recalcDiscount(
                        next.originalPrice,
                        next.offerPrice
                      );
                      return next;
                    })
                  }
                  className={styles.input}
                />
                <input
                  type="number"
                  step="0.01"
                  value={form.offerPrice}
                  onChange={(e) =>
                    setForm((f) => {
                      const rawOffer = e.target.value;
                      const next = {
                        ...f,
                        offerPrice: rawOffer === "" ? "" : rawOffer,
                      };
                      next.discount = recalcDiscount(
                        next.originalPrice,
                        next.offerPrice
                      );
                      return next;
                    })
                  }
                  className={styles.input}
                />
              </div>
              <label className={styles.label}>Valid Until</label>
              <input
                type="date"
                value={form.validUntil}
                onChange={(e) => setForm((f) => ({ ...f, validUntil: e.target.value }))}
                className={styles.input}
              />
              <label className={styles.label}>Order</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) || 0 }))}
                className={styles.input}
              />
              <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
                />
                <span className={styles.label} style={{ marginBottom: 0 }}>Active</span>
              </label>
            </div>
            <div className={styles.formActions}>
              <button type="submit" disabled={saving} className={styles.btnPrimary}>
                {saving ? "Saving..." : "Save"}
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
          <div className={styles.loadingState}>Loading offers…</div>
        ) : offers.length === 0 ? (
          <div className={styles.emptyState}>
            No offers yet. Click &quot;Add Offer&quot; to create one.
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Discount</th>
                <th>Prices</th>
                <th>Active</th>
                <th style={{ width: 140 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((o) => (
                <tr key={o._id}>
                  <td>{o.title}</td>
                  <td>{o.discount || "—"}</td>
                  <td>
                    {o.originalPrice != null && <span style={{ textDecoration: "line-through", marginRight: 8 }}>{o.originalPrice}</span>}
                    {o.offerPrice != null && <span>{o.offerPrice}</span>}
                    {o.originalPrice == null && o.offerPrice == null && "—"}
                  </td>
                  <td>{o.active ? "Yes" : "No"}</td>
                  <td>
                    <button type="button" onClick={() => openEdit(o._id)} className={styles.btnSecondary} style={{ marginRight: 8 }}>
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(o._id)}
                      disabled={deletingId === o._id}
                      className={styles.btnDanger}
                    >
                      {deletingId === o._id ? "Deleting..." : "Delete"}
                    </button>
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
