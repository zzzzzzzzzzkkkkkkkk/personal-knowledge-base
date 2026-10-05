"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getNotes, initialNotes } from "@/lib/note-storage";
import type { Note } from "@/types/note";

const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  timeZone: "Asia/Shanghai",
});

function createSummary(content: string) {
  return content.length > 70 ? `${content.slice(0, 70)}……` : content;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);

  useEffect(() => {
    setNotes(getNotes());
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
        {notes.map((note) => (
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
