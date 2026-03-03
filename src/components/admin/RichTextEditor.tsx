"use client";

import { useRef, useEffect } from "react";

// One editor per page: prevent double init from Strict Mode / double-mount
let editorInitLock = false;

// Quill types - editor instance
type QuillInstance = {
  root: HTMLElement;
  on: (event: string, handler: () => void) => void;
  off: (event: string, handler: () => void) => void;
};

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: number;
  disabled?: boolean;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your content here...",
  minHeight = 280,
  disabled = false,
}: RichTextEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<QuillInstance | null>(null);
  const onChangeRef = useRef(onChange);
  const isInternalChange = useRef(false);
  const lastEmittedHtmlRef = useRef<string>("");

  onChangeRef.current = onChange;

  useEffect(() => {
    if (editorInitLock) return;
    const el = containerRef.current;
    if (!el) return;

    editorInitLock = true;
    let quill: QuillInstance | null = null;

    const init = async () => {
      try {
        const QuillModule = await import("quill");
        await import("quill/dist/quill.snow.css");
        const Quill = QuillModule.default;

        el.innerHTML = "";

        const toolbarOptions = [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          ["blockquote", "link", "image"],
          [{ align: [] }],
          [{ color: [] }, { background: [] }],
          [{ size: ["small", false, "large", "huge"] }],
          ["clean"],
        ];

      quill = new Quill(el, {
        theme: "snow",
        placeholder,
        modules: {
          toolbar: toolbarOptions,
          clipboard: { matchVisual: false },
        },
      }) as unknown as QuillInstance;

      quillRef.current = quill;
      quill.root.innerHTML = value || "";

      const handleChange = () => {
        if (isInternalChange.current) return;
        const html = quill?.root?.innerHTML ?? "";
        lastEmittedHtmlRef.current = html;
        onChangeRef.current(html);
      };

      quill.on("text-change", handleChange);
      } finally {
        editorInitLock = false;
      }
    };

    init();
    return () => {
      editorInitLock = false;
      quillRef.current = null;
    };
  }, []);

  // Sync external value only when it didn't come from our own onChange (avoids cursor jump on Enter)
  useEffect(() => {
    const q = quillRef.current;
    if (!q) return;
    const normalized = (value ?? "").trim();
    if (normalized === lastEmittedHtmlRef.current.trim()) return;
    if (q.root.innerHTML === value) return;
    isInternalChange.current = true;
    lastEmittedHtmlRef.current = value ?? "";
    q.root.innerHTML = value || "";
    requestAnimationFrame(() => {
      isInternalChange.current = false;
    });
  }, [value]);

  // Read-only when disabled
  useEffect(() => {
    const q = quillRef.current;
    if (!q) return;
    (q.root as HTMLElement & { setAttribute?: (a: string, b: string) => void }).setAttribute?.(
      "contenteditable",
      disabled ? "false" : "true"
    );
  }, [disabled]);

  return (
    <div className="admin-rich-editor" style={{ minHeight: minHeight + 80 }}>
      <div ref={containerRef} style={{ minHeight }} />
      <style jsx global>{`
        .admin-rich-editor .ql-toolbar {
          border: none;
          border-bottom: 1px solid #e2e8f0;
          background: #f8fafc;
          border-radius: 4px 4px 0 0;
        }
        .admin-rich-editor .ql-container {
          border: none;
          font-size: 15px;
        }
        .admin-rich-editor .ql-editor {
          min-height: 280px;
        }
        .admin-rich-editor .ql-editor.ql-blank::before {
          color: #94a3b8;
          font-style: normal;
        }
        /* When two toolbars exist, show only the second (working) one */
        .admin-rich-editor:has(.ql-toolbar:nth-of-type(2)) .ql-toolbar:first-of-type {
          display: none !important;
        }
        .admin-rich-editor:has(.ql-container:nth-of-type(2)) .ql-container:first-of-type {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
