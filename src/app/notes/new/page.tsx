"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { addNote } from "@/lib/note-storage";
import type { Note } from "@/types/note";

export default function NewNotePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanTitle = title.trim();
    const cleanContent = content.trim();
    const cleanTag = tag.trim();

    if (!cleanTitle || !cleanContent) {
      setError("请填写标题和内容。");
      return;
    }

    const note: Note = {
      id: crypto.randomUUID(),
      title: cleanTitle,
      content: cleanContent,
      tag: cleanTag || "未分类",
      createdAt: new Date().toISOString(),
    };

    addNote(note);
    router.push("/");
  }

  return (
    <main className="editor-page">
      <div className="editor-heading">
        <div>
          <p className="eyebrow">NEW NOTE</p>
          <h1>新建笔记</h1>
          <p className="intro">把刚学到的知识或突然出现的想法记录下来。</p>
        </div>
        <Link className="text-link" href="/">
          ← 返回首页
        </Link>
      </div>

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
          <Link className="secondary-button" href="/">
            取消
          </Link>
          <button type="submit">保存笔记</button>
        </div>
      </form>
    </main>
  );
}
