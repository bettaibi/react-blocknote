import { Heading5 } from "lucide-react";
import { useBlockNoteContext } from "../../providers/BlockNoteProvider";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  iconSize?: number;
  children?: React.ReactNode;
}

export function H5Button({
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
      onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
      className={className}
      title="Heading 5"
      {...props}
    >
      {children ?? <Heading5 size={iconSize} />}
    </button>
  );
}
