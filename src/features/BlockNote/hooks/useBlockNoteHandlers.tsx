import { useBlockNoteContext } from "../providers/BlockNoteProvider";

export function useBlockNoteHandlers() {
  const editor = useBlockNoteContext();

  // Text formatting handlers
  function handleBold() {
    editor?.chain().focus().toggleBold().run();
  }

  function handleItalic() {
    editor?.chain().focus().toggleItalic().run();
  }

  function handleUnderline() {
    editor?.chain().focus().toggleUnderline().run();
  }

  function handleStrike() {
    editor?.chain().focus().toggleStrike().run();
  }

  function handleCode() {
    editor?.chain().focus().toggleCode().run();
  }

  // Heading handlers
  function handleHeading1() {
    editor?.chain().focus().toggleHeading({ level: 1 }).run();
  }

  function handleHeading2() {
    editor?.chain().focus().toggleHeading({ level: 2 }).run();
  }

  function handleHeading3() {
    editor?.chain().focus().toggleHeading({ level: 3 }).run();
  }

  function handleHeading4() {
    editor?.chain().focus().toggleHeading({ level: 4 }).run();
  }

  function handleHeading5() {
    editor?.chain().focus().toggleHeading({ level: 5 }).run();
  }

  function handleHeading6() {
    editor?.chain().focus().toggleHeading({ level: 6 }).run();
  }

  function handleNormalText() {
    editor?.chain().focus().setParagraph().run();
  }

  // List handlers
  function handleBulletList() {
    editor?.chain().focus().toggleBulletList().run();
  }

  function handleOrderedList() {
    editor?.chain().focus().toggleOrderedList().run();
  }

  function handleTaskList() {
    editor?.chain().focus().toggleTaskList().run();
  }

  // Block handlers
  function handleCodeBlock() {
    editor?.chain().focus().toggleCodeBlock().run();
  }

  function handleBlockquote() {
    editor?.chain().focus().toggleBlockquote().run();
  }

  // Alignment handlers
  function handleAlignLeft() {
    editor?.chain().focus().setTextAlign("left").run();
  }

  function handleAlignCenter() {
    editor?.chain().focus().setTextAlign("center").run();
  }

  function handleAlignRight() {
    editor?.chain().focus().setTextAlign("right").run();
  }

  function handleUndo() {
    editor?.chain().focus().undo().run();
  }

  function handleRedo() {
    editor?.chain().focus().redo().run();
  }

  // Media handlers
  function handleImage({ src, alt = "" }: { src: string; alt?: string }) {
    editor?.chain().focus().setImage({ src, alt }).run();
  }

  function handleLink(href: string) {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
  }

  // Table handlers
  function handleInsertTable() {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  }

  function handleDeleteTable() {
    editor?.chain().focus().deleteTable().run();
  }

  function handleAddColumnBefore() {
    editor?.chain().focus().addColumnBefore().run();
  }

  function handleAddColumnAfter() {
    editor?.chain().focus().addColumnAfter().run();
  }

  function handleDeleteColumn() {
    editor?.chain().focus().deleteColumn().run();
  }

  function handleAddRowBefore() {
    editor?.chain().focus().addRowBefore().run();
  }

  function handleAddRowAfter() {
    editor?.chain().focus().addRowAfter().run();
  }

  function handleDeleteRow() {
    editor?.chain().focus().deleteRow().run();
  }

  return {
    // Text formatting
    handleBold,
    handleItalic,
    handleUnderline,
    handleStrike,
    handleCode,
    // Headings
    handleHeading1,
    handleHeading2,
    handleHeading3,
    handleHeading4,
    handleHeading5,
    handleHeading6,
    handleNormalText,
    // Lists
    handleBulletList,
    handleOrderedList,
    handleTaskList,
    // Blocks
    handleCodeBlock,
    handleBlockquote,
    // Alignment
    handleAlignLeft,
    handleAlignCenter,
    handleAlignRight,
    // History
    handleUndo,
    handleRedo,
    // Media
    handleImage,
    handleLink,
    // Tables
    handleInsertTable,
    handleDeleteTable,
    handleAddColumnBefore,
    handleAddColumnAfter,
    handleDeleteColumn,
    handleAddRowBefore,
    handleAddRowAfter,
    handleDeleteRow,
  };
}
