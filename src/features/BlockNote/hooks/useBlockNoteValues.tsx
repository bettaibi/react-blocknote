/**
 * This hook is created to provide some values you can use to enable/disable UI Controls
 * based on the current state of the editor.
 */

import { useBlockNoteContext } from "../providers/blockNoteProvider";

enum BlockNoteMark {
  // Text formatting marks
  BOLD = "bold",
  ITALIC = "italic",
  UNDERLINE = "underline",
  STRIKE = "strike",
  CODE = "code",

  // Heading nodes
  HEADING = "heading",

  // List nodes
  BULLET_LIST = "bulletList",
  ORDERED_LIST = "orderedList",
  TASK_LIST = "taskList",
  LIST_ITEM = "listItem",

  // Block nodes
  PARAGRAPH = "paragraph",
  CODE_BLOCK = "codeBlock",
  BLOCKQUOTE = "blockquote",

  // Table nodes
  TABLE = "table",
  TABLE_ROW = "tableRow",
  TABLE_CELL = "tableCell",
  TABLE_HEADER = "tableHeader",

  // Media nodes
  IMAGE = "image",

  // Link mark
  LINK = "link",
}

export const TextAlign = {
  LEFT: { textAlign: "left" },
  CENTER: { textAlign: "center" },
  RIGHT: { textAlign: "right" },
} as const;

export function useBlockNoteValues() {
  const editor = useBlockNoteContext();

  function getActiveMark(mark: BlockNoteMark) {
    return !!editor?.isActive(mark);
  }

  function getTextAlignState(
    alignment: (typeof TextAlign)[keyof typeof TextAlign]
  ) {
    return !!editor?.isActive(alignment);
  }

  // History can values
  const canUndo = editor?.can().undo();
  const canRedo = editor?.can().redo();

  // Text formatting can values
  const canBold = editor?.can().chain().focus().toggleBold().run();
  const canItalic = editor?.can().chain().focus().toggleItalic().run();
  const canUnderline = editor?.can().chain().focus().toggleUnderline().run();
  const canStrike = editor?.can().chain().focus().toggleStrike().run();
  const canCode = editor?.can().chain().focus().toggleCode().run();

  // Heading can values
  const canHeading1 = editor
    ?.can()
    .chain()
    .focus()
    .toggleHeading({ level: 1 })
    .run();
  const canHeading2 = editor
    ?.can()
    .chain()
    .focus()
    .toggleHeading({ level: 2 })
    .run();
  const canHeading3 = editor
    ?.can()
    .chain()
    .focus()
    .toggleHeading({ level: 3 })
    .run();
  const canHeading4 = editor
    ?.can()
    .chain()
    .focus()
    .toggleHeading({ level: 4 })
    .run();
  const canHeading5 = editor
    ?.can()
    .chain()
    .focus()
    .toggleHeading({ level: 5 })
    .run();
  const canHeading6 = editor
    ?.can()
    .chain()
    .focus()
    .toggleHeading({ level: 6 })
    .run();
  const canNormalText = editor?.can().chain().focus().setParagraph().run();

  // List can values
  const canBulletList = editor?.can().chain().focus().toggleBulletList().run();
  const canOrderedList = editor
    ?.can()
    .chain()
    .focus()
    .toggleOrderedList()
    .run();
  const canTaskList = editor?.can().chain().focus().toggleTaskList().run();

  // Block can values
  const canCodeBlock = editor?.can().chain().focus().toggleCodeBlock().run();
  const canBlockquote = editor?.can().chain().focus().toggleBlockquote().run();

  // Table can values
  const canInsertTable = editor
    ?.can()
    .chain()
    .focus()
    .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
    .run();
  const canDeleteTable = editor?.can().chain().focus().deleteTable().run();
  const canAddColumnBefore = editor
    ?.can()
    .chain()
    .focus()
    .addColumnBefore()
    .run();
  const canAddColumnAfter = editor
    ?.can()
    .chain()
    .focus()
    .addColumnAfter()
    .run();
  const canDeleteColumn = editor?.can().chain().focus().deleteColumn().run();
  const canAddRowBefore = editor?.can().chain().focus().addRowBefore().run();
  const canAddRowAfter = editor?.can().chain().focus().addRowAfter().run();
  const canDeleteRow = editor?.can().chain().focus().deleteRow().run();

  return {
    getActiveMark,
    getTextAlignState,
    TextAlign,
    // History
    canUndo,
    canRedo,
    // Text formatting
    canBold,
    canItalic,
    canUnderline,
    canStrike,
    canCode,
    // Headings
    canHeading1,
    canHeading2,
    canHeading3,
    canHeading4,
    canHeading5,
    canHeading6,
    canNormalText,
    // Lists
    canBulletList,
    canOrderedList,
    canTaskList,
    // Blocks
    canCodeBlock,
    canBlockquote,
    // Tables
    canInsertTable,
    canDeleteTable,
    canAddColumnBefore,
    canAddColumnAfter,
    canDeleteColumn,
    canAddRowBefore,
    canAddRowAfter,
    canDeleteRow,
  };
}
