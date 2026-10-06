import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const notes = await prisma.note.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(notes);
  } catch {
    return NextResponse.json(
      { message: "读取笔记失败，请稍后重试。" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json({ message: "提交的数据格式不正确。" }, { status: 400 });
    }

    const values = body as Record<string, unknown>;
    const title = typeof values.title === "string" ? values.title.trim() : "";
    const content = typeof values.content === "string" ? values.content.trim() : "";
    const tag = typeof values.tag === "string" ? values.tag.trim() : "";

    if (!title || !content) {
      return NextResponse.json(
        { message: "请填写标题和内容。" },
        { status: 400 },
      );
    }

    const note = await prisma.note.create({
      data: {
        title,
        content,
        tag: tag || "未分类",
      },
    });

    return NextResponse.json(note, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "保存笔记失败，请稍后重试。" },
      { status: 500 },
    );
  }
}
