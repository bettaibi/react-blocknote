"use client";
import { EditorContent } from "@tiptap/react";

import { BlockNoteToolbar } from "./BlockNoteToolbar";

import { BlockNoteBubbleMenu } from "./BlockNoteBubbleMenu";
import { useBlockNoteContext } from "../providers/blockNoteProvider";

export interface BlockNoteProps {
  className?: string;
  showToolbar?: boolean;
  showBubbleMenu?: boolean;
}

export function BlockNote({
  className = "",
  showToolbar = true,
  showBubbleMenu = true,
}: BlockNoteProps) {
  const editor = useBlockNoteContext();

  return (
    <div className={`blocknote-editor ${className}`}>
      <EditorContent editor={editor} />
      {showToolbar && <BlockNoteToolbar editor={editor} />}
      {showBubbleMenu && <BlockNoteBubbleMenu editor={editor} />}
    </div>
  );
}
