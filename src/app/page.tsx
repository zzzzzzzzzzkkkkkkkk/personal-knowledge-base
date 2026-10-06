"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Note } from "@/types/note";

const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  timeZone: "Asia/Shanghai",
});

function createSummary(content: string) {
  return content.length > 70 ? `${content.slice(0, 70)}……` : content;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await fetch("/api/notes");
        if (!response.ok) throw new Error("Failed to load notes");

        const data: Note[] = await response.json();
        setNotes(data);
      } catch {
        setError("读取笔记失败，请刷新页面重试。");
      } finally {
        setIsLoading(false);
      }
    }

    loadNotes();
  }, []);

  return (
    <main>
      <header className="hero">
        <div>
          <p className="eyebrow">PERSONAL KNOWLEDGE BASE</p>
          <h1>我的知识库</h1>
          <p className="intro">记录想法，整理知识，让需要的信息随时可以找到。</p>
        </div>
        <Link className="primary-button" href="/notes/new">
          ＋ 新建笔记
        </Link>
      </header>

      <section className="toolbar" aria-label="搜索笔记">
        <input type="search" placeholder="搜索标题或正文……" />
        <span>共 {notes.length} 篇笔记</span>
      </section>

      <section className="notes" aria-label="笔记列表">
        {isLoading && <p className="status-message">正在读取笔记……</p>}
        {!isLoading && error && <p className="status-message error-message">{error}</p>}
        {!isLoading && !error && notes.length === 0 && (
          <div className="empty-state">
            <h2>还没有笔记</h2>
            <p>创建第一篇笔记，开始积累自己的知识。</p>
            <Link className="text-link" href="/notes/new">
              新建第一篇笔记 →
            </Link>
          </div>
        )}
        {!isLoading && !error && notes.map((note) => (
          <article className="note-card" key={note.title}>
            <div className="note-meta">
              <span className="tag">{note.tag}</span>
              <time dateTime={note.createdAt}>
                {dateFormatter.format(new Date(note.createdAt))}
              </time>
            </div>
            <h2>{note.title}</h2>
            <p>{createSummary(note.content)}</p>
            <a href="#">阅读笔记 →</a>
          </article>
        ))}
      </section>
    </main>
  );
}
