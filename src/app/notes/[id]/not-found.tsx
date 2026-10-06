import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <p className="eyebrow">404</p>
      <h1>没有找到这篇笔记</h1>
      <p className="intro">它可能已被删除，或者链接地址不正确。</p>
      <Link className="primary-button" href="/">
        返回知识库
      </Link>
    </main>
  );
}
