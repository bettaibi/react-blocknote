import { Editor } from "@tiptap/react";
import { ImageButton } from "./lib/ImageButton";
import { LinkButton } from "./lib/LinkButton";
import { TableOptionsButton } from "./lib/TableOptionsButton";
import { HeadingDropdown } from "./lib/HeadingDropdown";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  CheckSquare,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
} from "lucide-react";

interface BlockNoteToolbarProps {
  editor: Editor | null;
}

export function BlockNoteToolbar({ editor }: BlockNoteToolbarProps) {
  if (!editor) {
    return null;
  }

  return (
    <div className="blocknote-toolbar">
      <div className="blocknote-toolbar-main">
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          title="Undo"
        >
          <Undo size={20} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          title="Redo"
        >
          <Redo size={20} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
          title="Bold"
        >
          <Bold size={20} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
          title="Italic"
        >
          <Italic size={20} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is-active" : ""}
          title="Underline"
        >
          <Underline size={20} />
        </button>
        <LinkButton editor={editor} />
        <ImageButton editor={editor} />
        <HeadingDropdown editor={editor} />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
          title="Bullet List"
        >
          <List size={20} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
          title="Ordered List"
        >
          <ListOrdered size={20} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={editor.isActive("taskList") ? "is-active" : ""}
          title="Task List"
        >
          <CheckSquare size={20} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
          title="Code Block"
        >
          <Code size={20} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
          title="Align Left"
        >
          <AlignLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" }) ? "is-active" : ""
          }
          title="Align Center"
        >
          <AlignCenter size={20} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
          title="Align Right"
        >
          <AlignRight size={20} />
        </button>

        <TableOptionsButton editor={editor} />
      </div>
    </div>
  );
}
