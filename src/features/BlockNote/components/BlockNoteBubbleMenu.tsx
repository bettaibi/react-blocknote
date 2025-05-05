import { BubbleMenu, Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Underline,
  Subscript,
  Superscript,
  Heading1,
  Heading2,
} from "lucide-react";

interface BlockNoteBubbleMenuProps {
  editor: Editor | null;
}

export const BlockNoteBubbleMenu: React.FC<BlockNoteBubbleMenuProps> = ({
  editor,
}) => {
  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="blocknote-bubble-menu"
    >
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
        title="Bold"
      >
        <Bold size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
        title="Italic"
      >
        <Italic size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
        title="Strikethrough"
      >
        <Strikethrough size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
        title="Code"
      >
        <Code size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is-active" : ""}
        title="Underline"
      >
        <Underline size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        className={editor.isActive("subscript") ? "is-active" : ""}
        title="Subscript"
      >
        <Subscript size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        className={editor.isActive("superscript") ? "is-active" : ""}
        title="Superscript"
      >
        <Superscript size={16} />
      </button>

      <div className="bubble-menu-separator" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
        title="Heading 1"
      >
        <Heading1 size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
        title="Heading 2"
      >
        <Heading2 size={16} />
      </button>
    </BubbleMenu>
  );
};
