"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchBlog } from "@/services/blogApi";
import type { Blog } from "@/services/blogApi";
import BlogSidebar from "@/components/blogs/blog-sidebar";

function formatDate(createdAt?: string) {
  if (!createdAt) return "—";
  try {
    const d = new Date(createdAt);
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return "—";
  }
}

export default function BlogDetailsById({ id }: { id: string }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Blog not found.");
      setLoading(false);
      return;
    }
    let cancelled = false;
    fetchBlog(id)
      .then((data) => {
        if (!cancelled) setBlog(data);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [id]);

  if (!id || error) {
    return (
      <div className="tg-blog-grid-area pt-130 pb-80">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center py-5">
              <p className="mb-3">{error || "Blog not found."}</p>
              <Link href="/blog-grid" className="tg-btn tg-btn-switch-animation">Back to Blogs</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading || !blog) {
    return (
      <div className="tg-blog-grid-area pt-130 pb-80">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center py-5">Loading…</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tg-blog-grid-area pt-130 pb-80">
      <div className="container">
        <div className="row">
          <div className="col-xl-9 col-lg-8">
            <div className="tg-blog-details-wrap tg-blog-lg-spacing mr-50 mb-50">
              <div className="tg-blog-standard-item mb-35">
                {blog.coverImage && (
                  <div className="tg-blog-standard-thumb mb-15 d-flex justify-content-center">
                    <img
                      className="w-100"
                      src={blog.coverImage}
                      alt={blog.title}
                      style={{
                        width: "100%",
                        maxWidth: "900px",
                        height: "auto",
                        maxHeight: "420px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                )}
                <div className="tg-blog-standard-content">
                  <div className="tg-blog-standard-date mb-10">
                    <span>by {blog.author || "Admin"}</span>
                    <span>{formatDate(blog.createdAt)}</span>
                  </div>
                  <h2 className="tg-blog-standard-title">{blog.title}</h2>
                  {blog.excerpt && <p className="mb-20">{blog.excerpt}</p>}
                  <div
                    className="tg-blog-para lh-28"
                    dangerouslySetInnerHTML={{ __html: blog.content || "" }}
                  />
                </div>
              </div>
              <div className="mb-40">
                <Link href="/blog-grid" className="tg-btn tg-btn-switch-animation">← Back to Blogs</Link>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
