import { BubbleMenu, Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Underline,
  Subscript,
  Superscript,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
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
      className="flex items-center gap-1 p-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive("bold") ? "bg-gray-100 dark:bg-gray-700" : ""
        }`}
        title="Bold"
      >
        <Bold size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive("italic") ? "bg-gray-100 dark:bg-gray-700" : ""
        }`}
        title="Italic"
      >
        <Italic size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive("strike") ? "bg-gray-100 dark:bg-gray-700" : ""
        }`}
        title="Strikethrough"
      >
        <Strikethrough size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive("code") ? "bg-gray-100 dark:bg-gray-700" : ""
        }`}
        title="Code"
      >
        <Code size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive("underline") ? "bg-gray-100 dark:bg-gray-700" : ""
        }`}
        title="Underline"
      >
        <Underline size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive("subscript") ? "bg-gray-100 dark:bg-gray-700" : ""
        }`}
        title="Subscript"
      >
        <Subscript size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive("superscript") ? "bg-gray-100 dark:bg-gray-700" : ""
        }`}
        title="Superscript"
      >
        <Superscript size={16} />
      </button>
      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive({ textAlign: "left" })
            ? "bg-gray-100 dark:bg-gray-700"
            : ""
        }`}
        title="Align Left"
      >
        <AlignLeft size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive({ textAlign: "center" })
            ? "bg-gray-100 dark:bg-gray-700"
            : ""
        }`}
        title="Align Center"
      >
        <AlignCenter size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive({ textAlign: "right" })
            ? "bg-gray-100 dark:bg-gray-700"
            : ""
        }`}
        title="Align Right"
      >
        <AlignRight size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive({ textAlign: "justify" })
            ? "bg-gray-100 dark:bg-gray-700"
            : ""
        }`}
        title="Justify"
      >
        <AlignJustify size={16} />
      </button>
    </BubbleMenu>
  );
};
