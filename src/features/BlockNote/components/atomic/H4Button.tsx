import { Heading4 } from "lucide-react";
import { useBlockNoteContext } from "../../providers/blockNoteProvider";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  iconSize?: number;
  children?: React.ReactNode;
}

export function H4Button({
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
      onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
      className={className}
      title="Heading 4"
      {...props}
    >
      {children ?? <Heading4 size={iconSize} />}
    </button>
  );
}
