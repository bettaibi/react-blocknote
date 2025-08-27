import { EditorContent } from "@tiptap/react";
import { useBlockNoteContext } from "../../providers/BlockNoteProvider";

export function BlockNoteContent({ className = "" }: { className?: string }) {
  const editor = useBlockNoteContext();

  if (!editor) {
    return null;
  }

  return <EditorContent editor={editor} className={className} />;
}
