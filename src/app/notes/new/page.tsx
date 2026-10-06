import Link from "next/link";
import NoteForm from "@/components/note-form";

export default function NewNotePage() {
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

      <NoteForm />
    </main>
  );
}
