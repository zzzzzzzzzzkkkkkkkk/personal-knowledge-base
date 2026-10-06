"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteNoteButton({ id }: { id: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm("确定要删除这篇笔记吗？删除后无法恢复。");
    if (!confirmed) return;

    setError("");
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/notes/${id}`, { method: "DELETE" });
      if (!response.ok) {
        const result: { message?: string } = await response.json();
        throw new Error(result.message || "删除笔记失败。");
      }

      router.push("/");
      router.refresh();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "删除笔记失败。");
      setIsDeleting(false);
    }
  }

  return (
    <div className="delete-action">
      <button className="danger-button" type="button" onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? "正在删除……" : "删除笔记"}
      </button>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
