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
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import js from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import csharp from "highlight.js/lib/languages/csharp";
import "highlight.js/styles/github.css";
import { BlockNoteToolbar } from "./BlockNoteToolbar";
import MarkdownIt from "markdown-it";
import mk from "markdown-it-katex";
import "katex/dist/katex.min.css";
import { BlockNoteBubbleMenu } from "./BlockNoteBubbleMenu";

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
}).use(mk);

// Create lowlight instance and register languages
const lowlight = createLowlight(common);
lowlight.register("javascript", js);
lowlight.register("python", python);
lowlight.register("csharp", csharp);

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
  placeholder = "Start typing or paste a markdown file...",
  className = "",
  readOnly = false,
  showToolbar = true,
  outputFormat = "html",
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // Disable the default code block
      }),
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "javascript",
      }),
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
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
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
          .replace(/<table>(.*?)<\/table>/gs, (match, content) => {
            const rows = content.match(/<tr>(.*?)<\/tr>/gs) || [];
            return (
              rows
                .map((row: string) => {
                  const cells = row.match(/<t[dh]>(.*?)<\/t[dh]>/gs) || [];
                  return (
                    "| " +
                    cells
                      .map((cell: string) =>
                        cell.replace(/<t[dh]>(.*?)<\/t[dh]>/s, "$1").trim()
                      )
                      .join(" | ") +
                    " |"
                  );
                })
                .join("\n") + "\n"
            );
          })
          .replace(/<span class="math-inline">(.*?)<\/span>/g, "$$$1$$")
          .replace(/<div class="math-block">(.*?)<\/div>/g, "$$\n$1\n$$")
          .replace(/\n\n+/g, "\n\n")
          .trim();
        onChange?.(markdown);
      } else {
        onChange?.(html);
      }
    },
    editorProps: {
      handlePaste: (view, event) => {
        const clipboardData = event.clipboardData;
        if (!clipboardData) return false;

        const text = clipboardData.getData("text/plain");
        if (!text) return false;

        // Check if the pasted content looks like markdown or math
        const isMarkdown =
          /^[#*_`>-]/.test(text) ||
          /\n[#*_`>-]/.test(text) ||
          /\|.*\|/.test(text);
        const isMath = /\$\$.*\$\$/.test(text) || /\$.*\$/.test(text);

        if (isMarkdown || isMath) {
          event.preventDefault();
          const html = md.render(text);
          editor?.commands.setContent(html);
          return true;
        }

        return false;
      },
    },
  });

  return (
    <div className={`blocknote-editor ${className}`}>
      {showToolbar && <BlockNoteToolbar editor={editor} />}
      <EditorContent editor={editor} />
      <BlockNoteBubbleMenu editor={editor} />
    </div>
  );
};
