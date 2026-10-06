import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteNoteButton from "@/components/delete-note-button";
import prisma from "@/lib/prisma";

const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "Asia/Shanghai",
});

export default async function NoteDetailPage({ params }: PageProps<"/notes/[id]">) {
  const { id } = await params;
  const note = await prisma.note.findUnique({ where: { id } });

  if (!note) notFound();

  return (
    <main className="detail-page">
      <nav className="detail-nav">
        <Link className="text-link" href="/">
          ← 返回首页
        </Link>
        <Link className="secondary-button" href={`/notes/${note.id}/edit`}>
          编辑笔记
        </Link>
      </nav>

      <article className="note-detail">
        <div className="note-meta">
          <span className="tag">{note.tag}</span>
          <time dateTime={note.updatedAt.toISOString()}>
            更新于 {dateFormatter.format(note.updatedAt)}
          </time>
        </div>
        <h1>{note.title}</h1>
        <div className="note-content">{note.content}</div>
      </article>

      <div className="danger-zone">
        <div>
          <h2>删除笔记</h2>
          <p>删除后无法恢复，请谨慎操作。</p>
        </div>
        <DeleteNoteButton id={note.id} />
      </div>
    </main>
  );
}
