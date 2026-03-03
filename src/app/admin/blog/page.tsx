"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { Blog } from "@/services/blogApi";
import {
  fetchBlogs,
  fetchBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} from "@/services/blogApi";
import { uploadFile } from "@/services/uploadApi";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { showConfirmToast } from "@/utils/confirmToast";
import styles from "../admin.module.css";
import AdminBackButton from "../AdminBackButton";

const DEFAULT_CATEGORIES = [
  "Travel",
  "Adventure",
  "Tips",
  "Destinations",
  "Culture",
  "Food",
  "News",
];

export default function AdminBlogPage() {
  const [publishedBlogs, setPublishedBlogs] = useState<Blog[]>([]);
  const [draftBlogs, setDraftBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    author: "",
    excerpt: "",
    coverImage: "",
    published: false,
    status: "draft" as "draft" | "published",
    categories: [] as string[],
  });
  const [categoryInput, setCategoryInput] = useState("");
  const [coverImageUploading, setCoverImageUploading] = useState(false);

  const handleBackClick = () => {
    if (formOpen) {
      setFormOpen(false);
      setEditingId(null);
    } else {
      window.history.back();
    }
  };

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const [publishedRes, draftRes] = await Promise.all([
        fetchBlogs({ limit: 100, status: "published" }),
        fetchBlogs({ limit: 100, status: "draft" }),
      ]);
      setPublishedBlogs(publishedRes.data);
      setDraftBlogs(draftRes.data);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  useEffect(() => {
    const onRefresh = () => {
      setFormOpen(false);
      setEditingId(null);
      loadBlogs();
    };
    window.addEventListener("admin-refresh-blog", onRefresh);
    return () => window.removeEventListener("admin-refresh-blog", onRefresh);
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm({
      title: "",
      slug: "",
      content: "",
      author: "",
      excerpt: "",
      coverImage: "",
      published: false,
      status: "draft",
      categories: [],
    });
    setFormOpen(true);
  };

  const openEdit = async (id: string) => {
    try {
      const blog = await fetchBlog(id);
      setEditingId(id);
      setForm({
        title: blog.title,
        slug: blog.slug || "",
        content: blog.content || "",
        author: blog.author || "",
        excerpt: blog.excerpt || "",
        coverImage: blog.coverImage || "",
        published: !!blog.published,
        status: (blog.status as "draft" | "published") || "draft",
        categories: blog.categories || [],
      });
      setFormOpen(true);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load blog");
    }
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
  };

  const toggleCategory = (cat: string) => {
    setForm((f) => ({
      ...f,
      categories: f.categories.includes(cat)
        ? f.categories.filter((c) => c !== cat)
        : [...f.categories, cat],
    }));
  };

  const addCategory = () => {
    const c = categoryInput.trim();
    if (c && !form.categories.includes(c)) {
      setForm((f) => ({ ...f, categories: [...f.categories, c] }));
      setCategoryInput("");
    }
  };

  const handleSaveDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitBlog("draft");
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    showConfirmToast("Do you want to publish this blog post?", () =>
      submitBlog("published")
    );
  };

  const submitBlog = async (status: "draft" | "published") => {
    setSaving(true);
    try {
      const normalizedSlug = (form.slug || "").trim();
      const payload = {
        ...form,
        slug: normalizedSlug || undefined,
        status,
        published: status === "published",
      };
      if (editingId) {
        await updateBlog(editingId, payload);
        toast.success(status === "published" ? "Blog published" : "Draft saved");
      } else {
        await createBlog(payload);
        toast.success(status === "published" ? "Blog published" : "Draft saved");
      }
      closeForm();
      loadBlogs();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    showConfirmToast("Delete this blog?", async () => {
      setDeletingId(id);
      try {
        await deleteBlog(id);
        toast.success("Blog deleted");
        loadBlogs();
        if (editingId === id) closeForm();
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Failed to delete");
      } finally {
        setDeletingId(null);
      }
    });
  };

  const wordCount = form.content.replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <AdminBackButton onClick={handleBackClick} />
          <div>
            <h1 className={styles.pageTitle}>Blog</h1>
            <p className={styles.pageSubtitle}>
              Write and manage travel stories and tips
            </p>
          </div>
        </div>
        <button type="button" onClick={openCreate} className={styles.btnPrimary}>
          Add New Post
        </button>
      </div>

      {formOpen && (
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{
            display: "flex",
            gap: 24,
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {/* Main content - like WordPress left column */}
          <div
            style={{
              flex: "1 1 60%",
              minWidth: 320,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div className={styles.card} style={{ overflow: "hidden" }}>
              <input
                type="text"
                required
                placeholder="Enter title here"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  fontSize: 18,
                  border: "none",
                  borderBottom: "1px solid #e2e8f0",
                  outline: "none",
                }}
              />

              {/* Slug */}
              <div
                style={{
                  padding: "12px 20px",
                  borderBottom: "1px solid #e2e8f0",
                  background: "#fafafa",
                }}
              >
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    marginBottom: 6,
                    color: "#64748b",
                  }}
                >
                  Slug (URL-friendly, optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. my-blog-post"
                  value={form.slug}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, slug: e.target.value }))
                  }
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #e2e8f0",
                    borderRadius: 6,
                    fontSize: 14,
                  }}
                />
              </div>

              {/* Add Media / Cover Image */}
              <div
                style={{
                  padding: 16,
                  borderBottom: "1px solid #e2e8f0",
                  background: "#f8fafc",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    marginBottom: 8,
                    color: "#475569",
                  }}
                >
                  Cover Image
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                  <input
                    type="url"
                    placeholder="Image URL or upload below"
                    value={form.coverImage}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, coverImage: e.target.value }))
                    }
                    style={{
                      flex: "1 1 200px",
                      minWidth: 0,
                      padding: "10px 12px",
                      border: "1px solid #e2e8f0",
                      borderRadius: 6,
                      fontSize: 14,
                    }}
                  />
                  <label
                    style={{
                      padding: "10px 16px",
                      background: coverImageUploading ? "#cbd5e1" : "#7c3aed",
                      color: "#fff",
                      borderRadius: 6,
                      fontSize: 14,
                      fontWeight: 500,
                      cursor: coverImageUploading ? "not-allowed" : "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      disabled={coverImageUploading}
                      style={{ display: "none" }}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setCoverImageUploading(true);
                        try {
                          const { url } = await uploadFile(file);
                          setForm((f) => ({ ...f, coverImage: url }));
                          toast.success("Image uploaded");
                        } catch (err) {
                          toast.error(err instanceof Error ? err.message : "Upload failed");
                        } finally {
                          setCoverImageUploading(false);
                          e.target.value = "";
                        }
                      }}
                    />
                    {coverImageUploading ? "Uploading…" : "Upload image"}
                  </label>
                  {form.coverImage && (
                    <img
                      src={form.coverImage}
                      alt="Cover preview"
                      style={{
                        width: 80,
                        height: 50,
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Rich text editor */}
              <div style={{ padding: 16 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    marginBottom: 8,
                    color: "#475569",
                  }}
                >
                  Content
                </div>
                <RichTextEditor
                  value={form.content}
                  onChange={(v) => setForm((f) => ({ ...f, content: v }))}
                  placeholder="Write your post content... Use the toolbar for headings (H1–H6), lists, bold, italic, links, and more."
                  minHeight={280}
                  disabled={saving}
                />
                <div
                  style={{
                    marginTop: 8,
                    fontSize: 12,
                    color: "#94a3b8",
                  }}
                >
                  Word count: {wordCount}
                </div>
              </div>

              {/* Excerpt */}
              <div style={{ padding: 16, borderTop: "1px solid #e2e8f0" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 600,
                    marginBottom: 8,
                    color: "#475569",
                  }}
                >
                  Excerpt
                </label>
                <textarea
                  rows={3}
                  placeholder="Brief summary of the post (optional)"
                  value={form.excerpt}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, excerpt: e.target.value }))
                  }
                  style={{
                    width: "100%",
                    padding: 10,
                    border: "1px solid #e2e8f0",
                    borderRadius: 6,
                    fontSize: 14,
                    resize: "vertical",
                  }}
                />
              </div>

              {/* Author */}
              <div
                style={{
                  padding: 16,
                  borderTop: "1px solid #e2e8f0",
                  background: "#f8fafc",
                }}
              >
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 600,
                    marginBottom: 8,
                    color: "#475569",
                  }}
                >
                  Author
                </label>
                <input
                  type="text"
                  placeholder="Author name"
                  value={form.author}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, author: e.target.value }))
                  }
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #e2e8f0",
                    borderRadius: 6,
                    fontSize: 14,
                  }}
                />
              </div>
            </div>
          </div>

            {/* Sidebar - Publish, Categories */}
          <div
            style={{
              width: 280,
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {/* Publish box */}
            <div
              style={{
                background: "#fff",
                borderRadius: 8,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                padding: 16,
              }}
            >
              <h3
                style={{
                  margin: "0 0 12px",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#1e293b",
                }}
              >
                Publish
              </h3>
              <div
                style={{
                  fontSize: 12,
                  color: "#64748b",
                  marginBottom: 8,
                }}
              >
                Status: <strong>{form.status}</strong>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <button type="button" onClick={handleSaveDraft} disabled={saving} className={styles.btnSecondary}>
                  Save Draft
                </button>
                <button type="button" onClick={handlePublish} disabled={saving} className={styles.btnPrimary}>
                  {saving ? "Saving..." : "Publish"}
                </button>
                <button type="button" onClick={closeForm} className={styles.btnSecondary}>
                  Cancel
                </button>
              </div>
            </div>

            {/* Categories */}
            <div
              style={{
                background: "#fff",
                borderRadius: 8,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                padding: 16,
              }}
            >
              <h3
                style={{
                  margin: "0 0 12px",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#1e293b",
                }}
              >
                Categories
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {DEFAULT_CATEGORIES.map((cat) => (
                  <label
                    key={cat}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      cursor: "pointer",
                      fontSize: 12,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={form.categories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                    />
                    {cat}
                  </label>
                ))}
              </div>
              <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                <input
                  type="text"
                  placeholder="Add category"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addCategory())
                  }
                  style={{
                    flex: 1,
                    padding: "8px 10px",
                    border: "1px solid #e2e8f0",
                    borderRadius: 6,
                    fontSize: 13,
                  }}
                />
                <button
                  type="button"
                  onClick={addCategory}
                  style={{
                    padding: "8px 12px",
                    background: "#f1f5f9",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontSize: 12,
                  }}
                >
                  Add
                </button>
              </div>
              {form.categories.length > 0 && (
                <div
                  style={{
                    marginTop: 8,
                    fontSize: 12,
                    color: "#64748b",
                  }}
                >
                  Selected: {form.categories.join(", ")}
                </div>
              )}
            </div>
          </div>
        </form>
      )}

      {/* Lists: Published and Draft */}
      {!formOpen && (
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {loading ? (
            <div className={styles.loadingState}>Loading posts…</div>
          ) : (
            <>
              <section id="admin-published">
                <h2 className={styles.cardTitle} style={{ marginBottom: 12 }}>
                  Published
                </h2>
                <div className={styles.tableWrap}>
                  {publishedBlogs.length === 0 ? (
                    <div className={styles.emptyState}>No published posts.</div>
                  ) : (
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Author</th>
                          <th style={{ width: 140 }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {publishedBlogs.map((b) => (
                          <tr key={b._id}>
                            <td>{b.title}</td>
                            <td>{b.author || "—"}</td>
                            <td>
                              <button type="button" onClick={() => openEdit(b._id)} className={styles.btnSecondary} style={{ marginRight: 8 }}>
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(b._id)}
                                disabled={deletingId === b._id}
                                className={styles.btnDanger}
                              >
                                {deletingId === b._id ? "Deleting..." : "Delete"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </section>
              <section>
                <h2 className={styles.cardTitle} style={{ marginBottom: 12 }}>
                  Drafts
                </h2>
                <div className={styles.tableWrap}>
                  {draftBlogs.length === 0 ? (
                    <div className={styles.emptyState}>No drafts.</div>
                  ) : (
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Author</th>
                          <th style={{ width: 140 }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {draftBlogs.map((b) => (
                          <tr key={b._id}>
                            <td>{b.title}</td>
                            <td>{b.author || "—"}</td>
                            <td>
                              <button type="button" onClick={() => openEdit(b._id)} className={styles.btnSecondary} style={{ marginRight: 8 }}>
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(b._id)}
                                disabled={deletingId === b._id}
                                className={styles.btnDanger}
                              >
                                {deletingId === b._id ? "Deleting..." : "Delete"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </section>
            </>
          )}
        </div>
      )}
    </div>
  );
}
