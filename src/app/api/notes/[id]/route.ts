import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const note = await prisma.note.findUnique({ where: { id } });

    if (!note) {
      return NextResponse.json({ message: "没有找到这篇笔记。" }, { status: 404 });
    }

    return NextResponse.json(note);
  } catch {
    return NextResponse.json(
      { message: "读取笔记失败，请稍后重试。" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
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

    const note = await prisma.note.update({
      where: { id },
      data: { title, content, tag: tag || "未分类" },
    });

    return NextResponse.json(note);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ message: "没有找到这篇笔记。" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "修改笔记失败，请稍后重试。" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    await prisma.note.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ message: "没有找到这篇笔记。" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "删除笔记失败，请稍后重试。" },
      { status: 500 },
    );
  }
}
