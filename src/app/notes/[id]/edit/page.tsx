import Link from "next/link";
import { notFound } from "next/navigation";
import NoteForm from "@/components/note-form";
import prisma from "@/lib/prisma";

export default async function EditNotePage({ params }: PageProps<"/notes/[id]/edit">) {
  const { id } = await params;
  const note = await prisma.note.findUnique({ where: { id } });

  if (!note) notFound();

  const formNote = {
    ...note,
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString(),
  };

  return (
    <main className="editor-page">
      <div className="editor-heading">
        <div>
          <p className="eyebrow">EDIT NOTE</p>
          <h1>编辑笔记</h1>
          <p className="intro">修改内容后保存，数据库会记录新的更新时间。</p>
        </div>
        <Link className="text-link" href={`/notes/${note.id}`}>
          ← 返回详情
        </Link>
      </div>

      <NoteForm note={formNote} />
    </main>
  );
}
