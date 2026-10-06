"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import type { Note } from "@/types/note";

type NoteFormProps = {
  note?: Note;
};

export default function NoteForm({ note }: NoteFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");
  const [tag, setTag] = useState(note?.tag ?? "");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const isEditing = Boolean(note);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanTitle = title.trim();
    const cleanContent = content.trim();
    const cleanTag = tag.trim();

    if (!cleanTitle || !cleanContent) {
      setError("请填写标题和内容。");
      return;
    }

    setError("");
    setIsSaving(true);

    try {
      const endpoint = isEditing ? `/api/notes/${note?.id}` : "/api/notes";
      const response = await fetch(endpoint, {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: cleanTitle,
          content: cleanContent,
          tag: cleanTag,
        }),
      });

      const result: { id?: string; message?: string } = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "保存笔记失败。");
      }

      router.push(isEditing ? `/notes/${note?.id}` : "/");
      router.refresh();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "保存笔记失败。");
      setIsSaving(false);
    }
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <label htmlFor="title">标题</label>
      <input
        id="title"
        name="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="例如：React 学习笔记"
        autoFocus
      />

      <label htmlFor="tag">标签</label>
      <input
        id="tag"
        name="tag"
        value={tag}
        onChange={(event) => setTag(event.target.value)}
        placeholder="例如：编程（选填）"
      />

      <label htmlFor="content">内容</label>
      <textarea
        id="content"
        name="content"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="写下笔记内容……"
        rows={12}
      />

      {error && <p className="form-error">{error}</p>}

      <div className="form-actions">
        <Link className="secondary-button" href={isEditing ? `/notes/${note?.id}` : "/"}>
          取消
        </Link>
        <button type="submit" disabled={isSaving}>
          {isSaving ? "正在保存……" : isEditing ? "保存修改" : "保存笔记"}
        </button>
      </div>
    </form>
  );
}
