import type { Note } from "@/types/note";

const STORAGE_KEY = "personal-knowledge-base-notes";

export const initialNotes: Note[] = [
  {
    id: "welcome",
    title: "欢迎使用我的知识库",
    content: "这是第一篇示例笔记。以后，你可以在这里保存自己的知识。",
    tag: "开始",
    createdAt: "2026-10-05T10:00:00.000Z",
    updatedAt: "2026-10-05T10:00:00.000Z",
  },
  {
    id: "nextjs-notes",
    title: "Next.js 学习笔记",
    content: "Next.js 可以帮助我们创建现代网站，同时处理页面和后台逻辑。",
    tag: "编程",
    createdAt: "2026-10-05T09:00:00.000Z",
    updatedAt: "2026-10-05T09:00:00.000Z",
  },
  {
    id: "reading-list",
    title: "我的阅读清单",
    content: "记录想读的书、读书进度，以及读完后的心得。",
    tag: "阅读",
    createdAt: "2026-10-04T09:00:00.000Z",
    updatedAt: "2026-10-04T09:00:00.000Z",
  },
];

function isNote(value: unknown): value is Note {
  if (!value || typeof value !== "object") return false;

  const note = value as Record<string, unknown>;
  return (
    typeof note.id === "string" &&
    typeof note.title === "string" &&
    typeof note.content === "string" &&
    typeof note.tag === "string" &&
    typeof note.createdAt === "string" &&
    typeof note.updatedAt === "string"
  );
}

export function getNotes(): Note[] {
  try {
    const savedNotes = window.localStorage.getItem(STORAGE_KEY);
    if (!savedNotes) return initialNotes;

    const parsedNotes: unknown = JSON.parse(savedNotes);
    return Array.isArray(parsedNotes) && parsedNotes.every(isNote)
      ? parsedNotes
      : initialNotes;
  } catch {
    return initialNotes;
  }
}

export function addNote(note: Note): void {
  const notes = getNotes();
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([note, ...notes]));
}
