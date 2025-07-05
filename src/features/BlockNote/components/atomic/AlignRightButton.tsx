import { AlignRight } from "lucide-react";
import { useBlockNoteContext } from "../../providers/blockNoteProvider";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  iconSize?: number;
  children?: React.ReactNode;
}

export function AlignRightButton({
  className = "",
  children,
  iconSize = 16,
  ...props
}: Props) {
  const editor = useBlockNoteContext();

  if (!editor) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => editor.chain().focus().setTextAlign("right").run()}
      className={className}
      title="Align Right"
      {...props}
    >
      {children ?? <AlignRight size={iconSize} />}
    </button>
  );
}
