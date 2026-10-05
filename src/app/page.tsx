const notes = [
  {
    title: "欢迎使用我的知识库",
    summary: "这是第一篇示例笔记。以后，你可以在这里保存自己的知识。",
    tag: "开始",
    date: "2026-10-05",
  },
  {
    title: "Next.js 学习笔记",
    summary: "Next.js 可以帮助我们创建现代网站，同时处理页面和后台逻辑。",
    tag: "编程",
    date: "2026-10-05",
  },
  {
    title: "我的阅读清单",
    summary: "记录想读的书、读书进度，以及读完后的心得。",
    tag: "阅读",
    date: "2026-10-04",
  },
];

export default function Home() {
  return (
    <main>
      <header className="hero">
        <div>
          <p className="eyebrow">PERSONAL KNOWLEDGE BASE</p>
          <h1>我的知识库</h1>
          <p className="intro">记录想法，整理知识，让需要的信息随时可以找到。</p>
        </div>
        <button type="button">＋ 新建笔记</button>
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
              <time>{note.date}</time>
            </div>
            <h2>{note.title}</h2>
            <p>{note.summary}</p>
            <a href="#">阅读笔记 →</a>
          </article>
        ))}
      </section>
    </main>
  );
}
