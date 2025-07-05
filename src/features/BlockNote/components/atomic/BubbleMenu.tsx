import { BubbleMenuProps, BubbleMenu as TipTapBubbleMenu } from "@tiptap/react";
import { useBlockNoteContext } from "../../providers/blockNoteProvider";

export function BubbleMenu({
  children,
  className = "",
  ...props
}: Omit<BubbleMenuProps, "editor" | "tippyOptions">) {
  const editor = useBlockNoteContext();

  if (!editor) {
    return null;
  }

  return (
    <TipTapBubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className={className}
      {...props}
    >
      {children}
    </TipTapBubbleMenu>
  );
}
