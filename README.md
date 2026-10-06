# 个人知识库

个人知识库的 1.2 开发版本，使用 Next.js、TypeScript、Tailwind CSS、Prisma 和 SQLite。

目前支持：

- 从 SQLite 数据库读取笔记
- 创建包含标题、内容和标签的新笔记
- 查看笔记详情
- 编辑和删除笔记
- 通过 Next.js API 将笔记保存到 SQLite

> 当前数据库保存在本机 `prisma/dev.db`，不会自动同步到 GitHub。

## 本地运行

```bash
npm install
npx prisma migrate dev
npm run dev
```

然后访问 http://localhost:3000。
