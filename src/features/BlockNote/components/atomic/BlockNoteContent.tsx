import { EditorContent } from "@tiptap/react";
import { useBlockNoteContext } from "../../providers/blockNoteProvider";

export function BlockNoteContent({ className = "" }: { className?: string }) {
  const editor = useBlockNoteContext();
  return <EditorContent editor={editor} className={className} />;
}
