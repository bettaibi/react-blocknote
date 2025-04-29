import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Typography from "@tiptap/extension-typography";
import { BlockNoteToolbar } from "./BlockNoteToolbar";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

export interface BlockNoteProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
  showToolbar?: boolean;
  outputFormat?: "html" | "markdown";
}

export const BlockNote: React.FC<BlockNoteProps> = ({
  value = "",
  onChange,
  placeholder = "Start typing...",
  className = "",
  readOnly = false,
  showToolbar = true,
  outputFormat = "html",
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Image,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      Subscript,
      Superscript,
      TextStyle,
      Color,
      Typography,
    ],
    content: outputFormat === "markdown" ? md.render(value) : value,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (outputFormat === "markdown") {
        // Convert HTML to Markdown-like format
        const markdown = html
          .replace(/<h1>(.*?)<\/h1>/g, "# $1\n")
          .replace(/<h2>(.*?)<\/h2>/g, "## $1\n")
          .replace(/<h3>(.*?)<\/h3>/g, "### $1\n")
          .replace(/<p>(.*?)<\/p>/g, "$1\n")
          .replace(/<strong>(.*?)<\/strong>/g, "**$1**")
          .replace(/<em>(.*?)<\/em>/g, "*$1*")
          .replace(/<u>(.*?)<\/u>/g, "_$1_")
          .replace(/<code>(.*?)<\/code>/g, "`$1`")
          .replace(/<pre>(.*?)<\/pre>/g, "```\n$1\n```")
          .replace(/<ul>(.*?)<\/ul>/g, "$1")
          .replace(/<ol>(.*?)<\/ol>/g, "$1")
          .replace(/<li>(.*?)<\/li>/g, "- $1\n")
          .replace(/<blockquote>(.*?)<\/blockquote>/g, "> $1\n")
          .replace(/<a href="(.*?)">(.*?)<\/a>/g, "[$2]($1)")
          .replace(/<img src="(.*?)".*?>/g, "![]($1)")
          .replace(/\n\n+/g, "\n\n")
          .trim();
        onChange?.(markdown);
      } else {
        onChange?.(html);
      }
    },
  });

  return (
    <div className={`blocknote-editor ${className}`}>
      {showToolbar && <BlockNoteToolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};
