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
import { BlockNoteToolbar } from "./BlockNoteToolbar";
import MarkdownIt from "markdown-it";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { BlockNoteBubbleMenu } from "./BlockNoteBubbleMenu";
import { htmlToMarkdown } from "../utils/htmlToMarkdown";
import "highlight.js/styles/github.css";
import "katex/dist/katex.min.css";

// Markdown parser with math support
const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
});

// Function to process math expressions with remark/rehype
const processMathInMarkdown = (content: string): string => {
  try {
    const result = unified()
      .use(remarkParse)
      .use(remarkMath)
      .use(remarkRehype)
      .use(rehypeKatex)
      .use(rehypeStringify)
      .processSync(content);
    return result.toString();
  } catch (error) {
    console.error("Error processing math in markdown:", error);
    return md.render(content); // Fallback to regular markdown-it
  }
};

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
  showBubbleMenu?: boolean;
  outputFormat?: "html" | "markdown";
}

export function BlockNote({
  value = "",
  onChange,
  placeholder = "Start typing or paste a markdown file...",
  className = "",
  readOnly = false,
  showToolbar = true,
  showBubbleMenu = true,
  outputFormat = "html",
}: BlockNoteProps) {
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
        emptyEditorClass: "is-editor-empty",
        emptyNodeClass: "is-empty",
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
    content:
      outputFormat === "markdown"
        ? value.includes("$")
          ? processMathInMarkdown(value)
          : md.render(value)
        : value,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (outputFormat === "markdown") {
        // Convert HTML to Markdown-like format
        const markdown = htmlToMarkdown(html);
        onChange?.(markdown);
      } else {
        onChange?.(html);
      }
    },
    editorProps: {
      handlePaste: (_, event) => {
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

          let html;
          if (isMath) {
            html = processMathInMarkdown(text);
          } else {
            html = md.render(text);
          }

          editor?.commands.setContent(html);

          if (outputFormat === "markdown") {
            const markdown = htmlToMarkdown(html);
            onChange?.(markdown);
          } else {
            onChange?.(html);
          }
          return true;
        }

        return false;
      },
    },
  });

  return (
    <div className={`blocknote-editor ${className}`}>
      <EditorContent editor={editor} />
      {showToolbar && <BlockNoteToolbar editor={editor} />}
      {showBubbleMenu && <BlockNoteBubbleMenu editor={editor} />}
    </div>
  );
}
