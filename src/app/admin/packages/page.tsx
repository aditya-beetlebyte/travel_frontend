"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "@/redux/store";
import { can } from "@/utils/permissions";
import {
  createMultiplePackages,
  createPackage,
  deletePackage,
  fetchPackageById,
  fetchPackages,
  type TravelPackage,
  updatePackage,
} from "@/services/packageApi";
import { uploadFile } from "@/services/uploadApi";
import { showConfirmToast } from "@/utils/confirmToast";
import styles from "../admin.module.css";
import AdminBackButton from "../AdminBackButton";

type ItineraryDay = NonNullable<TravelPackage["itinerary"]>[number];
type PackageInput = Omit<TravelPackage, "_id" | "createdAt" | "updatedAt">;

const DESTINATIONS = [
  "Meghalaya",
  "Arunachal Pradesh",
  "Bhutan",
  "Kaziranga",
  "Sikkim",
  "Assam",
];

const blankDay = (): ItineraryDay => ({
  dayNumber: 1,
  from: "",
  to: "",
  route: "",
  title: "",
  description: "",
  placesToVisit: [],
  nightStay: {
    city: "",
    hotelName: "",
    roomCategory: "",
    mealPlan: "",
  },
});

const blankPackage = (): PackageInput => ({
  packageName: "",
  packageCode: "",
  destination: "Meghalaya",
  destinations: [],
  cities: [],
  startPoint: "Guwahati",
  endPoint: "Guwahati",
  duration: { nights: 1, days: 2 },
  vehicle: "",
  images: [],
  itinerary: [blankDay()],
  inclusions: [],
  exclusions: [],
  paymentTerms: "",
  cancellationPolicy: "",
  travelAdvisory: "",
  isActive: true,
  isFeatured: false,
});

const csvToArray = (value: string): string[] =>
  value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);

const arrayToCsv = (value: string[] | undefined): string => (value || []).join(", ");

const previewList = (value: string[] | undefined, max = 8) => {
  const list = (value || []).filter(Boolean);
  if (list.length === 0) return "—";
  if (list.length <= max) return list.join(", ");
  return `${list.slice(0, max).join(", ")} +${list.length - max} more`;
};

const DAY_COLORS = [
  { bg: "#eff6ff", border: "#3b82f6", badge: "#2563eb" },
  { bg: "#ecfdf5", border: "#10b981", badge: "#059669" },
  { bg: "#fff7ed", border: "#f97316", badge: "#ea580c" },
  { bg: "#f5f3ff", border: "#8b5cf6", badge: "#7c3aed" },
  { bg: "#f0fdfa", border: "#14b8a6", badge: "#0f766e" },
  { bg: "#fff1f2", border: "#f43f5e", badge: "#e11d48" },
];

const getDayColors = (index: number) => DAY_COLORS[index % DAY_COLORS.length];

export default function AdminPackagesPage() {
  const permissions = useSelector((s: RootState) => s.auth.permissions);
  const isSuperAdmin = useSelector((s: RootState) => !!s.auth.user?.isSuperAdmin);
  const canRead = can(permissions, isSuperAdmin, "packages", "read");
  const canCreate = can(permissions, isSuperAdmin, "packages", "create");
  const canUpdate = can(permissions, isSuperAdmin, "packages", "update");
  const canDelete = can(permissions, isSuperAdmin, "packages", "delete");

  const [items, setItems] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [bulkMode, setBulkMode] = useState(false);
  const [imageUploadingKey, setImageUploadingKey] = useState<string | null>(null);
  const [singlePkg, setSinglePkg] = useState<PackageInput>(blankPackage());
  const [bulkPackages, setBulkPackages] = useState<PackageInput[]>([blankPackage()]);

  const loadPackages = async () => {
    setLoading(true);
    try {
      const res = await fetchPackages({ limit: 100 });
      setItems(res.data || []);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load packages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setBulkMode(false);
    setSinglePkg(blankPackage());
    setBulkPackages([blankPackage()]);
  };

  const openCreate = () => {
    if (!canCreate) return;
    setFormOpen(true);
    setEditingId(null);
    setBulkMode(false);
    setSinglePkg(blankPackage());
    setBulkPackages([blankPackage()]);
  };

  const openEdit = async (id: string) => {
    if (!canUpdate) return;
    try {
      const pkg = await fetchPackageById(id);
      setEditingId(id);
      setFormOpen(true);
      setBulkMode(false);
      setSinglePkg({
        ...blankPackage(),
        ...pkg,
        packageCode: pkg.packageCode || "",
        images: pkg.images || [],
        itinerary: pkg.itinerary?.length ? pkg.itinerary : [blankDay()],
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load package");
    }
  };

  const updateDay = (
    pkgIndex: number,
    dayIndex: number,
    updater: (day: ItineraryDay) => ItineraryDay
  ) => {
    if (bulkMode) {
      setBulkPackages((prev) =>
        prev.map((pkg, i) => {
          if (i !== pkgIndex) return pkg;
          const nextItinerary = [...(pkg.itinerary || [])];
          nextItinerary[dayIndex] = updater(nextItinerary[dayIndex] || blankDay());
          return { ...pkg, itinerary: nextItinerary };
        })
      );
      return;
    }
    setSinglePkg((prev) => {
      const next = [...(prev.itinerary || [])];
      next[dayIndex] = updater(next[dayIndex] || blankDay());
      return { ...prev, itinerary: next };
    });
  };

  const addDay = (pkgIndex = 0) => {
    if (bulkMode) {
      setBulkPackages((prev) =>
        prev.map((pkg, i) =>
          i === pkgIndex
            ? { ...pkg, itinerary: [...(pkg.itinerary || []), { ...blankDay(), dayNumber: (pkg.itinerary?.length || 0) + 1 }] }
            : pkg
        )
      );
      return;
    }
    setSinglePkg((prev) => ({
      ...prev,
      itinerary: [...(prev.itinerary || []), { ...blankDay(), dayNumber: (prev.itinerary?.length || 0) + 1 }],
    }));
  };

  const removeDay = (dayIndex: number, pkgIndex = 0) => {
    if (bulkMode) {
      setBulkPackages((prev) =>
        prev.map((pkg, i) => {
          if (i !== pkgIndex) return pkg;
          const next = (pkg.itinerary || []).filter((_, idx) => idx !== dayIndex);
          return { ...pkg, itinerary: next.length ? next : [blankDay()] };
        })
      );
      return;
    }
    setSinglePkg((prev) => {
      const next = (prev.itinerary || []).filter((_, idx) => idx !== dayIndex);
      return { ...prev, itinerary: next.length ? next : [blankDay()] };
    });
  };

  const normalizePackage = (pkg: PackageInput): PackageInput => ({
    ...pkg,
    packageName: pkg.packageName.trim(),
    packageCode: pkg.packageCode?.trim() || undefined,
    startPoint: pkg.startPoint?.trim() || undefined,
    endPoint: pkg.endPoint?.trim() || undefined,
    vehicle: pkg.vehicle?.trim() || undefined,
    destinations: (pkg.destinations || []).filter(Boolean),
    cities: (pkg.cities || []).filter(Boolean),
    images: (pkg.images || []).filter(Boolean),
    inclusions: (pkg.inclusions || []).filter(Boolean),
    exclusions: (pkg.exclusions || []).filter(Boolean),
    paymentTerms: pkg.paymentTerms?.trim() || undefined,
    cancellationPolicy: pkg.cancellationPolicy?.trim() || undefined,
    travelAdvisory: pkg.travelAdvisory?.trim() || undefined,
    itinerary: (pkg.itinerary || []).map((day, idx) => ({
      ...day,
      dayNumber: Number(day.dayNumber) || idx + 1,
      placesToVisit: (day.placesToVisit || []).filter(Boolean),
      distanceKm: day.distanceKm == null ? undefined : Number(day.distanceKm),
      travelHours: day.travelHours == null ? undefined : Number(day.travelHours),
      nightStay: {
        city: day.nightStay?.city || "",
        hotelName: day.nightStay?.hotelName || "",
        roomCategory: day.nightStay?.roomCategory || "",
        mealPlan: day.nightStay?.mealPlan || "",
      },
    })),
  });

  const handleSingleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId && !canUpdate) return;
    if (!editingId && !canCreate) return;
    showConfirmToast(editingId ? "Update this package?" : "Create this package?", async () => {
      setSaving(true);
      try {
        const payload = normalizePackage(singlePkg);
        if (editingId) {
          await updatePackage(editingId, payload);
          toast.success("Package updated");
        } else {
          await createPackage(payload);
          toast.success("Package created");
        }
        await loadPackages();
        closeForm();
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Failed to save package");
      } finally {
        setSaving(false);
      }
    });
  };

  const handleBulkSubmit = async () => {
    if (!canCreate) return;
    showConfirmToast("Create all packages in bulk?", async () => {
      setSaving(true);
      try {
        const payload = bulkPackages.map(normalizePackage);
        await createMultiplePackages(payload);
        toast.success("Bulk packages created");
        await loadPackages();
        closeForm();
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Failed to bulk create packages");
      } finally {
        setSaving(false);
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (!canDelete) return;
    showConfirmToast("Delete this package?", async () => {
      setDeletingId(id);
      try {
        await deletePackage(id);
        setItems((prev) => prev.filter((p) => p._id !== id));
        await loadPackages();
        toast.success("Package deleted");
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Failed to delete package");
      } finally {
        setDeletingId(null);
      }
    });
  };

  const addBulkPackage = () => setBulkPackages((prev) => [...prev, blankPackage()]);
  const removeBulkPackage = (index: number) =>
    setBulkPackages((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));

  const renderPackageForm = (
    pkg: PackageInput,
    onChange: (next: PackageInput) => void,
    pkgIndex = 0,
    formKey = "single"
  ) => (
    <div className={styles.formCard} style={{ marginBottom: 16 }}>
      <div className={styles.formGrid}>
        <label className={styles.label}>Package Name *</label>
        <input className={styles.input} value={pkg.packageName} onChange={(e) => onChange({ ...pkg, packageName: e.target.value })} required />

        <label className={styles.label}>Package Code</label>
        <input className={styles.input} value={pkg.packageCode || ""} onChange={(e) => onChange({ ...pkg, packageCode: e.target.value })} />

        <label className={styles.label}>Destination *</label>
        <select className={styles.input} value={pkg.destination} onChange={(e) => onChange({ ...pkg, destination: e.target.value })}>
          {DESTINATIONS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <label className={styles.label}>Destinations (comma separated)</label>
        <input className={styles.input} value={arrayToCsv(pkg.destinations)} onChange={(e) => onChange({ ...pkg, destinations: csvToArray(e.target.value) })} />

        <label className={styles.label}>Cities (comma separated)</label>
        <input className={styles.input} value={arrayToCsv(pkg.cities)} onChange={(e) => onChange({ ...pkg, cities: csvToArray(e.target.value) })} />

        <label className={styles.label}>Start Point</label>
        <input className={styles.input} value={pkg.startPoint || ""} onChange={(e) => onChange({ ...pkg, startPoint: e.target.value })} />

        <label className={styles.label}>End Point</label>
        <input className={styles.input} value={pkg.endPoint || ""} onChange={(e) => onChange({ ...pkg, endPoint: e.target.value })} />

        <label className={styles.label}>Nights *</label>
        <input className={styles.input} type="number" min={1} value={pkg.duration.nights} onChange={(e) => onChange({ ...pkg, duration: { ...pkg.duration, nights: Number(e.target.value) || 1 } })} />

        <label className={styles.label}>Days *</label>
        <input className={styles.input} type="number" min={1} value={pkg.duration.days} onChange={(e) => onChange({ ...pkg, duration: { ...pkg.duration, days: Number(e.target.value) || 1 } })} />

        <label className={styles.label}>Vehicle</label>
        <input className={styles.input} value={pkg.vehicle || ""} onChange={(e) => onChange({ ...pkg, vehicle: e.target.value })} />

        <label className={styles.label}>Image URLs (comma separated)</label>
        <input
          className={styles.input}
          value={arrayToCsv(pkg.images)}
          onChange={(e) => onChange({ ...pkg, images: csvToArray(e.target.value) })}
        />
      </div>

      <div style={{ marginTop: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
          <label
            style={{
              padding: "8px 14px",
              background: imageUploadingKey === formKey ? "#cbd5e1" : "#0d9488",
              color: "#fff",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: imageUploadingKey === formKey ? "not-allowed" : "pointer",
            }}
          >
            <input
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              multiple
              disabled={imageUploadingKey === formKey}
              style={{ display: "none" }}
              onChange={async (e) => {
                const files = Array.from(e.target.files || []);
                if (!files.length) return;
                setImageUploadingKey(formKey);
                try {
                  const uploaded: string[] = [];
                  for (const file of files) {
                    const { url } = await uploadFile(file);
                    uploaded.push(url);
                  }
                  onChange({ ...pkg, images: [...(pkg.images || []), ...uploaded] });
                  toast.success(`${uploaded.length} image(s) uploaded`);
                } catch (err) {
                  toast.error(err instanceof Error ? err.message : "Image upload failed");
                } finally {
                  setImageUploadingKey(null);
                  e.target.value = "";
                }
              }}
            />
            {imageUploadingKey === formKey ? "Uploading..." : "Upload Images"}
          </label>
          <span style={{ color: "#64748b", fontSize: 12 }}>
            Upload goes to Google Cloud and saves URL in package images.
          </span>
        </div>
        {!!pkg.images?.length && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))", gap: 8 }}>
            {pkg.images.map((img, imgIndex) => (
              <div key={`${img}-${imgIndex}`} style={{ border: "1px solid #e2e8f0", borderRadius: 8, padding: 6, background: "#fff" }}>
                <img src={img} alt={`Package image ${imgIndex + 1}`} style={{ width: "100%", height: 80, objectFit: "cover", borderRadius: 6 }} />
                <button
                  type="button"
                  className={styles.btnDanger}
                  style={{ marginTop: 6, width: "100%", padding: "6px 8px", fontSize: 12 }}
                  onClick={() =>
                    onChange({
                      ...pkg,
                      images: (pkg.images || []).filter((_, i) => i !== imgIndex),
                    })
                  }
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <h3 className={styles.cardTitle} style={{ margin: 0 }}>Itinerary</h3>
          <button type="button" className={styles.btnSecondary} onClick={() => addDay(pkgIndex)}>Add Day</button>
        </div>

        <div className={styles.itineraryEditorGrid}>
          {(pkg.itinerary || []).map((day, dayIndex) => (
            <div
              key={`${pkgIndex}-${dayIndex}`}
              className={styles.formCard}
              style={{
                marginBottom: 0,
                padding: 10,
                background: getDayColors(dayIndex).bg,
                borderLeft: `5px solid ${getDayColors(dayIndex).border}`,
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  marginBottom: 8,
                  padding: "4px 10px",
                  borderRadius: 999,
                  background: getDayColors(dayIndex).badge,
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                Day {day.dayNumber || dayIndex + 1}
              </div>
              <div className={styles.formGrid}>
                <label className={styles.label}>Day Number *</label>
                <input
                  className={styles.input}
                  type="number"
                  min={1}
                  value={day.dayNumber}
                  onChange={(e) =>
                    updateDay(pkgIndex, dayIndex, (d) => ({ ...d, dayNumber: Number(e.target.value) || 1 }))
                  }
                />
                <label className={styles.label}>From *</label>
                <input className={styles.input} value={day.from} onChange={(e) => updateDay(pkgIndex, dayIndex, (d) => ({ ...d, from: e.target.value }))} />
                <label className={styles.label}>To *</label>
                <input className={styles.input} value={day.to} onChange={(e) => updateDay(pkgIndex, dayIndex, (d) => ({ ...d, to: e.target.value }))} />
                <label className={styles.label}>Route</label>
                <input className={styles.input} value={day.route || ""} onChange={(e) => updateDay(pkgIndex, dayIndex, (d) => ({ ...d, route: e.target.value }))} />
                <label className={styles.label}>Title *</label>
                <input className={styles.input} value={day.title} onChange={(e) => updateDay(pkgIndex, dayIndex, (d) => ({ ...d, title: e.target.value }))} />
                <label className={styles.label}>Description *</label>
                <textarea className={styles.input} rows={3} value={day.description} onChange={(e) => updateDay(pkgIndex, dayIndex, (d) => ({ ...d, description: e.target.value }))} />
                <label className={styles.label}>Places To Visit (comma separated)</label>
                <input className={styles.input} value={arrayToCsv(day.placesToVisit)} onChange={(e) => updateDay(pkgIndex, dayIndex, (d) => ({ ...d, placesToVisit: csvToArray(e.target.value) }))} />
                <label className={styles.label}>Distance KM</label>
                <input className={styles.input} type="number" value={day.distanceKm ?? ""} onChange={(e) => updateDay(pkgIndex, dayIndex, (d) => ({ ...d, distanceKm: e.target.value ? Number(e.target.value) : undefined }))} />
                <label className={styles.label}>Travel Hours</label>
                <input className={styles.input} type="number" value={day.travelHours ?? ""} onChange={(e) => updateDay(pkgIndex, dayIndex, (d) => ({ ...d, travelHours: e.target.value ? Number(e.target.value) : undefined }))} />
                <label className={styles.label}>Night Stay City *</label>
                <input className={styles.input} value={day.nightStay?.city || ""} onChange={(e) => updateDay(pkgIndex, dayIndex, (d) => ({ ...d, nightStay: { ...d.nightStay, city: e.target.value } }))} />
                <label className={styles.label}>Hotel Name *</label>
                <input className={styles.input} value={day.nightStay?.hotelName || ""} onChange={(e) => updateDay(pkgIndex, dayIndex, (d) => ({ ...d, nightStay: { ...d.nightStay, hotelName: e.target.value } }))} />
                <label className={styles.label}>Room Category</label>
                <input className={styles.input} value={day.nightStay?.roomCategory || ""} onChange={(e) => updateDay(pkgIndex, dayIndex, (d) => ({ ...d, nightStay: { ...d.nightStay, roomCategory: e.target.value } }))} />
                <label className={styles.label}>Meal Plan</label>
                <input className={styles.input} value={day.nightStay?.mealPlan || ""} onChange={(e) => updateDay(pkgIndex, dayIndex, (d) => ({ ...d, nightStay: { ...d.nightStay, mealPlan: e.target.value } }))} />
              </div>
              <div style={{ marginTop: 8 }}>
                <button type="button" className={styles.btnDanger} onClick={() => removeDay(dayIndex, pkgIndex)}>Remove Day</button>
              </div>
              <div
                style={{
                  marginTop: 8,
                  paddingTop: 8,
                  borderTop: `2px dashed ${getDayColors(dayIndex).border}`,
                  color: getDayColors(dayIndex).badge,
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                End of Day {day.dayNumber || dayIndex + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.formGrid}>
        <label className={styles.label}>Inclusions (comma separated)</label>
        <textarea className={styles.input} rows={2} value={arrayToCsv(pkg.inclusions)} onChange={(e) => onChange({ ...pkg, inclusions: csvToArray(e.target.value) })} />
        <label className={styles.label}>Exclusions (comma separated)</label>
        <textarea className={styles.input} rows={2} value={arrayToCsv(pkg.exclusions)} onChange={(e) => onChange({ ...pkg, exclusions: csvToArray(e.target.value) })} />
        <label className={styles.label}>Payment Terms</label>
        <textarea className={styles.input} rows={3} value={pkg.paymentTerms || ""} onChange={(e) => onChange({ ...pkg, paymentTerms: e.target.value })} />
        <label className={styles.label}>Cancellation Policy</label>
        <textarea className={styles.input} rows={3} value={pkg.cancellationPolicy || ""} onChange={(e) => onChange({ ...pkg, cancellationPolicy: e.target.value })} />
        <label className={styles.label}>Travel Advisory</label>
        <textarea className={styles.input} rows={3} value={pkg.travelAdvisory || ""} onChange={(e) => onChange({ ...pkg, travelAdvisory: e.target.value })} />
        <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
          <input type="checkbox" checked={pkg.isActive ?? true} onChange={(e) => onChange({ ...pkg, isActive: e.target.checked })} />
          <span className={styles.label} style={{ marginBottom: 0 }}>Active</span>
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
          <input type="checkbox" checked={pkg.isFeatured ?? false} onChange={(e) => onChange({ ...pkg, isFeatured: e.target.checked })} />
          <span className={styles.label} style={{ marginBottom: 0 }}>Featured</span>
        </label>
      </div>
    </div>
  );

  if (!canRead) {
    return (
      <div>
        <div style={{ marginBottom: 24 }}>
          <AdminBackButton onClick={() => window.history.back()} />
        </div>
        <p className={styles.pageSubtitle}>You don&apos;t have permission to view packages management.</p>
        <Link href="/admin" className={styles.btnPrimary} style={{ display: "inline-block", marginTop: 16 }}>
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <AdminBackButton onClick={() => (formOpen ? closeForm() : window.history.back())} />
          <div>
            <h1 className={styles.pageTitle}>Packages</h1>
            <p className={styles.pageSubtitle}>Manage full package details and itinerary</p>
          </div>
        </div>
        {canCreate && (
          <button type="button" onClick={openCreate} className={styles.btnPrimary}>
            Add Package
          </button>
        )}
      </div>

      {formOpen && !editingId && (
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <button type="button" className={bulkMode ? styles.btnSecondary : styles.btnPrimary} onClick={() => setBulkMode(false)}>
            Single Create
          </button>
          <button type="button" className={bulkMode ? styles.btnPrimary : styles.btnSecondary} onClick={() => setBulkMode(true)}>
            Bulk Create
          </button>
        </div>
      )}

      {formOpen && (
        <>
          {!bulkMode || !!editingId ? (
            <form onSubmit={handleSingleSubmit}>
              {renderPackageForm(singlePkg, setSinglePkg, 0, "single")}
              <div className={styles.formActions}>
                <button type="submit" disabled={saving} className={styles.btnPrimary}>
                  {saving ? "Saving..." : editingId ? "Update Package" : "Create Package"}
                </button>
                <button type="button" onClick={closeForm} className={styles.btnSecondary}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              {bulkPackages.map((pkg, idx) => (
                <div key={idx}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <h3 className={styles.cardTitle} style={{ margin: 0 }}>Package #{idx + 1}</h3>
                    <button type="button" className={styles.btnDanger} onClick={() => removeBulkPackage(idx)}>
                      Remove Package
                    </button>
                  </div>
                  {renderPackageForm(
                    pkg,
                    (next) => setBulkPackages((prev) => prev.map((p, i) => (i === idx ? next : p))),
                    idx,
                    `bulk-${idx}`
                  )}
                </div>
              ))}
              <div className={styles.formActions}>
                <button type="button" className={styles.btnSecondary} onClick={addBulkPackage}>
                  Add More Packages
                </button>
                <button type="button" disabled={saving} className={styles.btnPrimary} onClick={handleBulkSubmit}>
                  {saving ? "Saving..." : "Create Bulk Packages"}
                </button>
                <button type="button" onClick={closeForm} className={styles.btnSecondary}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <div className={styles.tableWrap}>
        {loading ? (
          <div className={styles.loadingState}>Loading packages...</div>
        ) : items.length === 0 ? (
          <div className={styles.emptyState}>No packages yet.</div>
        ) : (
          <div className={styles.packagesGrid}>
            {items.map((pkg) => (
              <div
                key={pkg._id}
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  padding: 16,
                  boxShadow: "0 10px 28px rgba(2, 6, 23, 0.06)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 14,
                    flexWrap: "wrap",
                    marginBottom: 20,
                  }}
                >
                  <div style={{ flex: "1 1 520px" }}>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
                      {(pkg.images || []).length > 0 ? (
                        (pkg.images || []).slice(0, 6).map((img, imgIndex) => (
                          <a
                            key={`${pkg._id}-img-${imgIndex}`}
                            href={img}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              display: "block",
                              border: "1px solid #e2e8f0",
                              borderRadius: 10,
                              overflow: "hidden",
                              background: "#fff",
                              width: 140,
                              height: 95,
                            }}
                          >
                            <img
                              src={img}
                              alt={`Package image ${imgIndex + 1}`}
                              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                              onError={(e) => {
                                const el = e.currentTarget;
                                el.onerror = null;
                                el.style.display = "none";
                              }}
                            />
                          </a>
                        ))
                      ) : (
                        <div style={{ color: "#64748b" }}>No images</div>
                      )}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                      <div>
                        <div style={{ color: "#0f172a", fontSize: 20, fontWeight: 800, marginBottom: 6 }}>
                          {pkg.packageName}
                        </div>
                        <div style={{ color: "#64748b", fontSize: 13, marginBottom: 4 }}>
                          Code: <strong style={{ color: "#334155" }}>{pkg.packageCode || "—"}</strong>
                        </div>
                        <div style={{ color: "#64748b", fontSize: 13, marginBottom: 6 }}>
                          Destination: <strong style={{ color: "#334155" }}>{pkg.destination}</strong> · Cities:{" "}
                          <strong style={{ color: "#334155" }}>{previewList(pkg.cities)}</strong>
                        </div>
                        <div style={{ color: "#334155", fontSize: 13 }}>
                          Duration:{" "}
                          <strong style={{ color: "#0f172a" }}>
                            {(pkg.duration?.nights ?? 0)}N/{(pkg.duration?.days ?? 0)}D
                          </strong>{" "}
                          · Days in itinerary:{" "}
                          <strong style={{ color: "#0f172a" }}>{pkg.itinerary?.length || 0}</strong>
                        </div>
                        <div style={{ color: "#64748b", fontSize: 13, marginTop: 6 }}>
                          From: <strong style={{ color: "#334155" }}>{pkg.startPoint || "—"}</strong> · To:{" "}
                          <strong style={{ color: "#334155" }}>{pkg.endPoint || "—"}</strong>
                        </div>
                        <div style={{ color: "#64748b", fontSize: 13, marginTop: 4 }}>
                          Vehicle: <strong style={{ color: "#334155" }}>{pkg.vehicle || "—"}</strong>
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                        {pkg.isFeatured && <span style={{ background: "#7c3aed1a", color: "#7c3aed", padding: "6px 10px", borderRadius: 999, fontWeight: 700, fontSize: 12 }}>Featured</span>}
                        <span style={{ background: pkg.isActive ? "#0f766e1a" : "#e11d481a", color: pkg.isActive ? "#0f766e" : "#e11d48", padding: "6px 10px", borderRadius: 999, fontWeight: 700, fontSize: 12 }}>
                          {pkg.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 200 }}>
                    {canUpdate && (
                      <button type="button" onClick={() => openEdit(pkg._id)} className={styles.btnSecondary}>
                        Edit
                      </button>
                    )}
                    {canDelete && (
                      <button type="button" onClick={() => handleDelete(pkg._id)} className={styles.btnDanger} disabled={deletingId === pkg._id}>
                        {deletingId === pkg._id ? "Deleting..." : "Delete"}
                      </button>
                    )}
                  </div>
                </div>

                <div style={{ marginTop: 24, display: "grid", gap: 18 }}>
                  <details
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: 10,
                      background: "#f8fafc",
                      padding: 12,
                    }}
                  >
                    <summary style={{ cursor: "pointer", fontWeight: 900, color: "#0f172a" }}>
                      Booking & Travel Details
                    </summary>
                    <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
                      <div>
                        <strong style={{ color: "#334155" }}>Payment Terms:</strong>{" "}
                        <span style={{ color: "#334155", whiteSpace: "pre-wrap" }}>{pkg.paymentTerms || "—"}</span>
                      </div>
                      <div>
                        <strong style={{ color: "#334155" }}>Cancellation Policy:</strong>{" "}
                        <span style={{ color: "#334155", whiteSpace: "pre-wrap" }}>{pkg.cancellationPolicy || "—"}</span>
                      </div>
                      <div>
                        <strong style={{ color: "#334155" }}>Travel Advisory:</strong>{" "}
                        <span style={{ color: "#334155", whiteSpace: "pre-wrap" }}>{pkg.travelAdvisory || "—"}</span>
                      </div>
                      <div>
                        <strong style={{ color: "#334155" }}>Destinations:</strong>{" "}
                        <span style={{ color: "#334155" }}>{(pkg.destinations ?? []).length ? (pkg.destinations ?? []).join(", ") : "—"}</span>
                      </div>
                      <div>
                        <strong style={{ color: "#334155" }}>Cities:</strong>{" "}
                        <span style={{ color: "#334155" }}>{(pkg.cities ?? []).length ? (pkg.cities ?? []).join(", ") : "—"}</span>
                      </div>
                    </div>
                  </details>

                  <details
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: 10,
                      background: "#f8fafc",
                      padding: 12,
                    }}
                  >
                    <summary style={{ cursor: "pointer", fontWeight: 900, color: "#0f172a" }}>
                      Included & Excluded
                    </summary>
                    <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
                      <div>
                        <strong style={{ color: "#334155" }}>Inclusions:</strong>
                        {pkg.inclusions && pkg.inclusions.length > 0 ? (
                          <ul style={{ margin: "8px 0 0", paddingLeft: 18, color: "#334155" }}>
                            {pkg.inclusions.slice(0, 10).map((v, i) => (
                              <li key={`${pkg._id}-inc-${i}`}>{v}</li>
                            ))}
                            {pkg.inclusions.length > 10 && (
                              <li style={{ listStyleType: "none", color: "#64748b" }}>+{pkg.inclusions.length - 10} more</li>
                            )}
                          </ul>
                        ) : (
                          <div style={{ color: "#64748b", marginTop: 8 }}>—</div>
                        )}
                      </div>
                      <div>
                        <strong style={{ color: "#334155" }}>Exclusions:</strong>
                        {pkg.exclusions && pkg.exclusions.length > 0 ? (
                          <ul style={{ margin: "8px 0 0", paddingLeft: 18, color: "#334155" }}>
                            {pkg.exclusions.slice(0, 10).map((v, i) => (
                              <li key={`${pkg._id}-exc-${i}`}>{v}</li>
                            ))}
                            {pkg.exclusions.length > 10 && (
                              <li style={{ listStyleType: "none", color: "#64748b" }}>+{pkg.exclusions.length - 10} more</li>
                            )}
                          </ul>
                        ) : (
                          <div style={{ color: "#64748b", marginTop: 8 }}>—</div>
                        )}
                      </div>
                    </div>
                  </details>
                </div>

                <div className={styles.itineraryDayGrid}>
                  {(pkg.itinerary || []).length === 0 ? (
                    <div style={{ color: "#64748b" }}>No itinerary days available.</div>
                  ) : (
                    (pkg.itinerary || []).map((day, index) => {
                      const dayNo = day.dayNumber || index + 1;
                      const colors = getDayColors(index);
                      const dayContent = (
                        <>
                          <div style={{ color: "#0f172a", fontSize: 14, marginBottom: 6 }}>
                            <strong>Route:</strong> {day.from || "—"} → {day.to || "—"}{" "}
                            {day.route ? `(${day.route})` : ""}
                          </div>
                          <div style={{ color: "#334155", fontSize: 14, marginBottom: 6 }}>
                            {day.description || "No description"}
                          </div>
                          {!!day.placesToVisit?.length && (
                            <div style={{ color: "#334155", fontSize: 13, marginBottom: 6 }}>
                              <strong>Places:</strong> {day.placesToVisit.join(", ")}
                            </div>
                          )}
                          {(day.distanceKm != null || day.travelHours != null) && (
                            <div style={{ color: "#334155", fontSize: 13, marginBottom: 6 }}>
                              {day.distanceKm != null && (
                                <>
                                  <strong>Distance:</strong> {day.distanceKm} km{" "}
                                </>
                              )}
                              {day.travelHours != null && (
                                <>
                                  <strong>Hours:</strong> {day.travelHours}
                                </>
                              )}
                            </div>
                          )}
                          <div style={{ color: "#334155", fontSize: 13 }}>
                            <strong>Night Stay:</strong> {day.nightStay?.city || "—"} | {day.nightStay?.hotelName || "—"}
                            {day.nightStay?.mealPlan ? ` (${day.nightStay.mealPlan})` : ""}
                          </div>
                          <div
                            style={{
                              marginTop: 8,
                              paddingTop: 6,
                              borderTop: `2px dashed ${colors.border}`,
                              color: colors.badge,
                              fontWeight: 800,
                              fontSize: 13,
                            }}
                          >
                            Day {dayNo} ends here
                          </div>
                        </>
                      );

                      return (
                        <div
                          key={`${pkg._id}-day-${index}`}
                          style={{
                            background: colors.bg,
                            border: "1px solid #e2e8f0",
                            borderLeft: `5px solid ${colors.border}`,
                            borderRadius: 12,
                            padding: 10,
                            boxShadow: "0 8px 22px rgba(2, 6, 23, 0.06)",
                          }}
                        >
                          <details>
                            <summary
                              style={{
                                cursor: "pointer",
                                fontWeight: 900,
                                color: "#0f172a",
                                padding: "8px 12px",
                                borderRadius: 8,
                                background: "#fff",
                                border: "1px solid #e2e8f0",
                              }}
                            >
                              Day {dayNo}: {day.title || "—"}
                            </summary>
                            <div style={{ marginTop: 6 }}>{dayContent}</div>
                          </details>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
